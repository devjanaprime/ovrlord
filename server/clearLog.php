<?php
    require ( "config.php" );
    $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
    if (mysqli_connect_errno()){
    echo "Failed to connect to server: " . mysqli_connect_error();
    }
    $sql = "UPDATE issues SET log='0' WHERE log='1'";
    if ($connect->query($sql) === TRUE){
        echo "success";
    }
    else{
        echo "Error clearing log";
    }
    $connect->close();
?>
