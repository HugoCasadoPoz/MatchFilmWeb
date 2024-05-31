<?php
require_once('./conexion.php');

$con = new Conexion();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = file_get_contents('php://input');
    $usuarios  = json_decode($json);

    $usuario = $usuarios->usuario;
    $amigo = $usuarios->amigo;

    $query = "SELECT * FROM movie_likes WHERE movie_id NOT IN (SELECT movie_id FROM movie_likes WHERE username = '$usuario') AND movie_id IN (SELECT movie_id FROM movie_likes WHERE username = '$amigo')";
    $result = $con->query($query);

    if ($result && $result->num_rows > 0) {
        // Películas encontradas
        $peliculas = array();
        while ($row = $result->fetch_assoc()) {
            $peliculas[] = $row;
        }
        header("HTTP/1.1 200 Películas encontradas"); 
        echo json_encode($peliculas);
    } else {
        header("HTTP/1.1 401 Películas no encontradas"); 
        echo json_encode(array("message" => "$result"));
    }
}