<?php

    require_once './mysql_cnct.php';
    
    //$user_id=$_SESSION['user_id'];
    $target_user_id=$_POST['to_user_id'];
    $notification_type=$_POST['notif_type'];
    
    $user_id=10;
    
    $notification_message="";
    
    switch ($notification_type){
        case "request_connect":
            $notification_message=" You have a new connection request from User ID : $user_id";
            break;
        case "accept_connect":
            $notification_message=" User ID : $user_id has accepted your connection request";
            break;
        case "message":
            $notification_message=" You have a new message from User ID : $user_id";
            break;
        default :
            $notification_message="";
    }
    
    $query="INSERT INTO `notifications` (`notification_id`, `sender_user_id`, `target_user_id`, `type`, `message`) VALUES (NULL, '$user_id', '$target_user_id', '$notification_type', '$notification_message')";
    $r= mysqli_query($dbc, $query);
    if($r){
        echo json_encode(array("status"=>"ok"));
    }
    else{
        echo json_encode(array("status"=>"fail","error"=>mysqli_error($dbc)));
    }

?>

