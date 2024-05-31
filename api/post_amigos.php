<?php
require_once('./conexion.php');
$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if(isset($_GET['nombre_usuario'])) {
        $nombreUsuario = $_GET['nombre_usuario'];
        $sql = "SELECT * FROM amigos WHERE (nombre_usuario = '$nombreUsuario' OR nombre_amigo = '$nombreUsuario')";
        try {
            $resultado = $con->query($sql);
            if ($resultado->num_rows > 0) {  
                $amigos = $resultado->fetch_all(MYSQLI_ASSOC);
                header('HTTP/1.1 200 Tiene Amigo');
                echo json_encode($amigos);
            } else {
                header('HTTP/1.1 400 Amigos no encontrados');
            }
        } catch (mysqli_sql_exception $e) {
            header('HTTP/1.1 400 Error en la consulta: ' . $e->getMessage());
        }
    } else {
        header('HTTP/1.1 400 Parametro "nombre_usuario" faltante');
    }
    exit;
}
?>
