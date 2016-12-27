<?php
    require ( "config.php" );
    $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
    if (mysqli_connect_errno()){
      echo "Failed to connect to server: " . mysqli_connect_error();
    }
    $user_in = $_POST["user"];
    $issue_in = $_POST["issue"];
    $sql = "INSERT INTO issues (`from`, `issue`, `created`, `status`, `log` )
    VALUES ( '$user_in', '$issue_in', now(), '0', '0' )";
    if ($connect->query($sql) === TRUE){
        echo "success";
    }
    else{
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
    $connect->close();
?>
