<?php

    require_once './mysql_cnct.php';
    
    //$user_id=$_SESSION['user_id'];
    $type=$_REQUEST['type'];
    
    $user_id=3;
    
    $queryTypeFilter="";
    
    switch ($type){
        case "unread":
            $queryTypeFilter=" AND is_read=0";
            break;
        case "read":
            $queryTypeFilter=" AND is_read=1";
            break;
        default :
            $queryTypeFilter="";
    }
    
    $query="SELECT * FROM notifications WHERE (target_user_id='$user_id' $queryTypeFilter)";
    $r= mysqli_query($dbc, $query);
    
    $result_array=array();
    
    if($r){
        while ($row= mysqli_fetch_array($r,MYSQLI_ASSOC)){
            $result_array[]=$row;
        }
        echo json_encode($result_array);
    }
    else{
        echo json_encode(array("s"=>"fail","error"=>mysqli_error($dbc)));
    }

?>

