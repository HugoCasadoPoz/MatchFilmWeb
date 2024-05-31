<?php
require_once('./conexion.php');

$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json = file_get_contents('php://input');
    $notificaciones  = json_decode($json);

    $nombre_usuario = $notificaciones->nombre_usuario;
    $nombre_amigo = $notificaciones->nombre_amigo;
    $notificacion = $notificaciones->notificacion;

    $sql = "INSERT INTO `notificaciones` (`nombre_usuario`, `nombre_amigo`, `notificacion`) VALUES ('$nombre_usuario', '$nombre_amigo', '$notificacion');";

    try {
        $con->query($sql);
        header("HTTP/1.1 201 Send It"); 
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}elseif($_SERVER['REQUEST_METHOD'] == 'GET'){
    if(isset($_GET['nombre_usuario'])) {
        $nombreUsuario = $_GET['nombre_usuario'];
        $sql = "SELECT * FROM notificaciones WHERE nombre_usuario = '$nombreUsuario' OR nombre_amigo = '$nombreUsuario'";
        $result = $con->query($sql);
        $data = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data);
        exit;
    }else{
        header("HTTP/1.1 400 Bad mal");
    }
}elseif($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $json = file_get_contents('php://input');
    $notificaciones  = json_decode($json);

    $nombre_usuario = $notificaciones->nombre_usuario;
    $nombre_amigo = $notificaciones->nombre_amigo;
    $notificacion = $notificaciones->notificacion;

    $sql = "DELETE FROM notificaciones WHERE nombre_usuario = $nombre_usuario AND nombre_amigo = $nombre_amigo AND notificacion = $notificacion";

    try {
        $con->query($sql);
        header("HTTP/1.1 201 Delete");
    } catch (mysqli_sql_exception $e) {
        header("HTTP/1.1 400 Bad Request");
    }
    exit;
}
header("HTTP/1.1 400 Bad mal");
?>