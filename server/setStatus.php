<?php
    require ( "config.php" );
    $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
    if (mysqli_connect_errno()){
    echo "Failed to connect to server: " . mysqli_connect_error();
    }
    $bugID_in = $_GET["id"];
    $statusIn = $_GET["status"];
    if( $statusIn == "3" ){
      $sql = "UPDATE issues SET status='" . $statusIn . ", log=1' WHERE id=" . $bugID_in;
    } // end close
    else{
      $sql = "UPDATE issues SET status='" . $statusIn . "' WHERE id=" . $bugID_in;
    } // end !close
    if ($connect->query($sql) === TRUE){
        echo "success";
    }
    else{
        echo "Error setting status";
    }
    $connect->close();
?>
