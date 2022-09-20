<?php

require_once '../config/conexion.php';

class Contacto extends Conexion
{
    public function __construct()
    {
        parent::__construct();
    }
    public function ListContact()
    {
        $sql = "SELECT * FROM contacto";
        $sent = $this->conectar->prepare($sql);
        $sent->execute([]);
        $res = $sent->fetchAll(PDO::FETCH_ASSOC);
        return json_encode($res);
    }
    public function DeleteContact($id)
    {
        $sql = "DELETE FROM contacto WHERE idcontacto = ?";
        $sent = $this->conectar->prepare($sql);
        $sent->execute([$id]);
        return 'ELIMINADO';
    }
    public function CreateContact($nombre, $apellido, $telefono)
    {
        $sql = "INSERT INTO contacto (nombre, apellido, telefono) VALUES (?,?,?)";
        $sent = $this->conectar->prepare($sql);
        $sent->execute(["$nombre", "$apellido", $telefono]);
        return 'CREADO';
    }
    public function UpdateContact($nombre, $apellido, $telefono, $id)
    {
        $sql = "UPDATE contacto SET nombre = ?, apellido = ?, telefono = ? WHERE idcontacto = ?";
        $sent = $this->conectar->prepare($sql);
        $sent->execute(["$nombre", "$apellido", $telefono, $id]);
        return 'ACTUALIZADO';
    }
}
