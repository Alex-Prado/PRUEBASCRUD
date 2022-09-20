<?php
header('Access-Control-Allow-Origin: *');

require_once 'configuration.php';

class Conexion
{
    protected $conectar;
    public function __construct()
    {
        try {
            $this->conectar = new PDO(DB_CONN, DB_USER, DB_PASS);
            $this->conectar->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conectar->exec(DB_CHARS);
            return $this->conectar;
        } catch (Exception $e) {
            echo 'error en la linea ' . $e->getLine();
        }
    }
}
