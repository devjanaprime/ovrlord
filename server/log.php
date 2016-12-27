<?php
    require ( "config.php" );
    $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
    if (mysqli_connect_errno()){
    echo "Failed to connect to server: " . mysqli_connect_error();
    }
    $bugID_in = $_GET["id"];
    $logIn = $_GET["log"];
    $sql = "UPDATE issues SET log='" . $logIn . "' WHERE id=" . $bugID_in;
    if ($connect->query($sql) === TRUE){
        echo "success";
    }
    else{
        echo "Error setting status";
    }
    $connect->close();
?>
