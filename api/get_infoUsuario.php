<?php
require_once('./conexion.php');
$json =  json_decode(file_get_contents("php://input"), true);
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $username = $_GET['nombre_usuario'];
    $sql = "SELECT * FROM usuarios WHERE `username` = '$username' ";
    try {
        $resultado = $con->query($sql);
        if ($resultado->num_rows>0){
            $fila = $resultado->fetch_assoc();
            $usuarioJSON=json_encode($fila);
            header ('HTTP/1.1 200 OK');
            echo $usuarioJSON;
        }else{
        header('HTTP/1.1 400 Usuario no encontrado');
        }
    } catch (mysqli_sql_exception $e) {
        header(`HTTP/1.1 400 $e`);
    }
    exit;
}elseif ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $json = file_get_contents('php://input');
    $usuario  = json_decode($json);
    
    $antiguo_username = $usuario->antiguo_username;
    $username = $usuario->username;
    $email = $usuario->email;
    $password = $usuario->password;

    if (empty($username) || empty($email) || empty($password)) {
        header('Content-Type: application/json');
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(["error" => "Todos los campos son requeridos"]);
        exit;
    }
    $password = password_hash($usuario->password, PASSWORD_BCRYPT);

    require_once('./conexion.php');
    $con = new Conexion();

    // Actualizar tabla usuarios
    $sql_usuarios = "UPDATE usuarios SET email = '$email', password = '$password',  username = '$username' WHERE username = '$antiguo_username'";

    // Actualizar tabla amigos
    $sql_amigos_nombre_usuario = "UPDATE amigos SET nombre_usuario = '$username' WHERE nombre_usuario = '$antiguo_username'";
    $sql_amigos_nombre_amigo = "UPDATE amigos SET nombre_amigo = '$username' WHERE nombre_amigo = '$antiguo_username'";

    // Actualizar tabla notificaciones
    $sql_notificaciones_nombre_usuario = "UPDATE notificaciones SET nombre_usuario = '$username' WHERE nombre_usuario = '$antiguo_username'";
    $sql_notificaciones_nombre_amigo = "UPDATE notificaciones SET nombre_amigo = '$username' WHERE nombre_amigo = '$antiguo_username'";

    // Actualizar tabla movie_likes
    $sql_movie_likes = "UPDATE movie_likes SET username = '$username' WHERE username = '$antiguo_username'";

    try {
        $con->query($sql_usuarios);
        $con->query($sql_amigos_nombre_usuario);
        $con->query($sql_amigos_nombre_amigo);
        $con->query($sql_notificaciones_nombre_usuario);
        $con->query($sql_notificaciones_nombre_amigo);
        $con->query($sql_movie_likes);

        header('HTTP/1.1 200 OK');
        echo json_encode(["message" => "Usuario actualizado correctamente", "username" => $usuario->username]);
    } catch (mysqli_sql_exception $e) {
        header('HTTP/1.1 500 Internal Server Error');
        echo json_encode(["error" => $e->getMessage()]);
    }
    exit;
}