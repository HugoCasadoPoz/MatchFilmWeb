<?php
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once('./conexion.php');

$con = new Conexion();
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $headers = apache_request_headers();

    if (isset($headers['Authorization'])) {
        // Extrae el token del encabezado
        $authHeader = $headers['Authorization'];
        list($type, $token) = explode(" ", $authHeader, 2);

        if (strcasecmp($type, 'Bearer') == 0) {
            // Define tu clave secreta
            $secretKey = 'MatchFilm';

            try {
                // Decodifica el token
                $decoded = JWT::decode($token, new Key($secretKey, 'HS256'));
                // Usa los datos decodificados como necesites
                header("Content-Type: application/json");
                header("HTTP/1.1 200 OK");
                echo json_encode(['message' => 'Token válido', 'data' => $decoded]);
            } catch (Exception $e) {
                header("Content-Type: application/json");
                header("HTTP/1.1 401 Unauthorized");
                echo json_encode(['message' => 'Token inválido', 'error' => $e->getMessage()]);
            }
        } else {
            header("Content-Type: application/json");
            header("HTTP/1.1 401 Unauthorized");
            echo json_encode(['message' => 'Tipo de autorización no válido']);
        }
    } else {
        header("Content-Type: application/json");
        header("HTTP/1.1 401 Unauthorized");
        echo json_encode(['message' => 'No se encontró el encabezado de autorización']);
    }
} else {
    header("Content-Type: application/json");
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => 'Método no permitido']);
}
?>
