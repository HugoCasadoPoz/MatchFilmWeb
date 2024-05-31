<?php
require ("./../vendor/autoload.php");
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once('./conexion.php');

$con = new Conexion();
$json =  json_decode(file_get_contents("php://input"), true);

function generarJWT($id, $username){
    $key = 'MatchFilm';

    $payload = [
        'id' => $id,
        'username' => $username,
        'exp' => time()+3600,
    ];
    $jwt = JWT::encode($payload, $key, 'HS256');
    return $jwt;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $sql = "SELECT * FROM usuarios WHERE ";

    $username = $json['username'];
    $password = $json['password'];
    
    $sql .= "username='$username'";
    try {
        $resultado = $con->query($sql);
        if ($resultado->num_rows>0){
        $usuario = $resultado->fetch_assoc();    

        $stored_password = $usuario['password'];
        $verifyContra=password_verify($password,$stored_password);

        if ($verifyContra==true){            
            $jwt = generarJWT($usuario["id"], $username);
            header("HTTP/1.1 200 OKey");
            header("Content-Type: application/json");
            echo json_encode(['message'=>'Login correcto', 'token'=>$jwt, 'username'=>$username]);

        }else{
            header('HTTP/1.1 401 Contraseña incorrecta');
        }
        }else{
            header('HTTP/1.1 401 Credenciales no válidas');
        }
    } catch (mysqli_sql_exception $e) {
        header('HTTP/1.1 401 Not Found');
    }
    exit;
}