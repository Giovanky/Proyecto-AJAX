<?php

include ('database.php');

if(isset($_POST['name'])){
    $name = $_POST['name'];
    $description = $_POST['description'];
    $query = "Insert into task(name, description) values ('$name','$description')";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Query fallida');
    }
    echo "task agregada satisfactoriamente";


}