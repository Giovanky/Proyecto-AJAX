<?php

include ('database.php');

$search = $_POST['search'];

if(!empty($search)){
    $query = "Select * from task where name LIKE '$search%'";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Query error'. mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'name' => $row['name'],
            'description' => $row['description'],
            'id' => $row['id']
        );

    }
    $jsonstring = json_encode($json);
    echo $jsonstring;
}