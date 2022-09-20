<?php
require_once '../model/Contacto.model..php';
$instance = new Contacto();
if (isset($_POST['action'])) {
    if ($_POST['action'] == 'list') {
        echo $instance->ListContact();
    }
    if ($_POST['action'] == 'delete') {
        echo $instance->DeleteContact($_POST['id']);
    }
    if ($_POST['action'] == 'create') {
        echo $instance->CreateContact($_POST['nombre'], $_POST['apellido'], $_POST['telefono']);
    }
    if ($_POST['action'] == 'update') {
        echo $instance->UpdateContact($_POST['nombre'], $_POST['apellido'], $_POST['telefono'], $_POST['id']);
    }
} else {
    echo 'error';
}
