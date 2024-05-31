<?php
Class Conexion extends mysqli{
    private $host = "localhost";
    private $db = "matchfilm";
    private $user = "matchfilm";
    private $pass = "matchfilm";

    public function __construct()
    {
        try{
            parent::__construct($this->host, $this->user, $this->pass, $this->db);
            $this->set_charset("utf8");
        }catch (mysqli_sql_exception $e){
            echo "ERROR: {$e->getMessage()}";
            header("HTTP/1.1 500 Internal Server Error");
            echo json_encode(["error" => "Connection failed: {$e->getMessage()}"]);
            
            exit;
        }
    }
}
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: *");
    header("Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"); // Añadir 'Authorization' a los encabezados permitidos
    header("Content-Length: 0");
    header("HTTP/1.1 200 OK");
    exit;
}

// Permitir solicitudes CORS para todas las solicitudes

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *"); // Agregar 'GET' a los métodos permitidos
header("Access-Control-Allow-Headers: Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token");
?>