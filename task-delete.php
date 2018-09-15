<?php

include ('database.php');

if(isset($_POST['id'])){
    $id = $_POST['id'];
    $query = "Delete from task where id=$id";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Query failed');
    }
    echo "Tarea eliminada satisfactoriamente";
}


