<?php

include('database.php');

$id = $_POST['id'];
$name = $_POST['name'];
$description = $_POST['description'];

$query = "Update task set name='$name',description='$description' where id='$id'";

$result = mysqli_query($conexion,$query);
if(!$result){
    die('Query failed');
}
echo "Tarea actualizada";