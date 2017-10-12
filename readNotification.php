<?php

    require_once './mysql_cnct.php';
    
    //$user_id=$_SESSION['user_id'];
    $notification_id=$_POST['notif_id'];
    
    $user_id=3;
    
    
    $query="UPDATE `notifications` SET is_read=1 WHERE (notification_id='$notification_id' AND target_user_id=$user_id)";
    $r= mysqli_query($dbc, $query);
    if($r){
        echo json_encode(array("status"=>"ok"));
    }
    else{
        echo json_encode(array("status"=>"fail","error"=>mysqli_error($dbc)));
    }

?>

