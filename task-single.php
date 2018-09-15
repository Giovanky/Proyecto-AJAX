<?php

include('database.php');
$id = $_POST['id'];
$query = "Select * from task where id=$id";
$result = mysqli_query($conexion, $query);
if(!$result){
    die('query failed');
}
$json = array();
while($row = mysqli_fetch_array($result)){
    $json[] = array(
        'name' => $row['name'],
        'description' => $row['description'],
        'id' => $row['id']
    );
}
$jsonstring = json_encode($json[0]);
echo $jsonstring;
