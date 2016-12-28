<?php
    require ( "config.php" );
    $connect = mysqli_connect( DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE );
    if (mysqli_connect_errno()){
    echo "Failed to connect to server: " . mysqli_connect_error();
    }
    else{
      $sql = "SELECT * FROM issues";
      $result = $connect->query($sql);
      $echoText = '{';
      $rowCounter = 0;
      while($row = $result->fetch_assoc()){
        $rowCounter++;
        // scrub text
        $issue = ltrim( $row["issue"], '"' );
        $issue = ltrim( $issue, "'" );
        $issue = ltrim( $issue, "\n" );
        $echoText = $echoText . '"issue' . $row["id"] . '":{';
        $echoText = $echoText . '"' . id . '": ' . $row["id"] . ',';
        $echoText = $echoText . '"' . from . '": "' . $row["from"] . '",';
        $echoText = $echoText . '"' . created . '": "' . $row["created"] . '",';
        $echoText = $echoText . '"' . status . '": ' . $row["status"] . ',';
        $echoText = $echoText . '"' . log . '": ' . $row["log"] . ',';
        $echoText = $echoText . '"' . issue . '": "' . $issue . '"}';
        if( $rowCounter < $result->num_rows )
       {
          $echoText = $echoText . ',';
       }
      }
      $echoText = $echoText . '}';
      echo $echoText;
      $connect->close();
    }
?>
