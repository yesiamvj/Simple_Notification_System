<?php

    require_once './mysql_cnct.php';
    
    //$user_id=$_SESSION['user_id'];
    $user_id=3;
    
    $query="SELECT COUNT(*) as unread_count FROM notifications WHERE (target_user_id='$user_id' AND is_read=0)";
    $r= mysqli_query($dbc, $query);
    if($r){
        while ($row= mysqli_fetch_array($r,MYSQLI_ASSOC)){
            $row["s"]="ok";
            echo json_encode($row);
        }
    }
    else{
        echo json_encode(array("s"=>"fail","error"=>mysqli_error($dbc)));
    }

?>

