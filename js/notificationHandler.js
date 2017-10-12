var notifications_module={
    notifcations_count:0
};

$(document).ready(function(){
    startWorker();
});
function addFriend(user_id){
    sendNotification(user_id,"request_connect","");
}
function acceptFriend(user_id){
    sendNotification(user_id,"accept_connect","");
}
function sendMessage(user_id,message){
    sendNotification(user_id,"message","");
}
function sendNotification(user_id,type,message){
    $.ajax({
        url:"newNotification.php",
        method:"POST",
        data:{
            to_user_id:user_id,
            notif_type:type,
            message:message
        },
        success: function (data, textStatus, jqXHR) {
            try {
                var result=JSON.parse(data);
                if(result.status==="ok"){
                    alertResult(type+" is Successful");
                }
                else{
                    c("Notification add failed");
                    c(data);
                }
            }
            catch(e){
                c(e);
            }

        }
    });
}

function readNotification(notificationId){
    $.ajax({
        url:"readNotification.php",
        method:"POST",
        data:{
            notif_id:notificationId
        },
        success: function (data, textStatus, jqXHR) {
            try {
                var result=JSON.parse(data);
                if(result.status==="ok"){
                    readNotifItem(notificationId);
                    c("read notif is Successful");
                }
                else{
                    c("Notification add failed");
                    c(data);
                }
            }
            catch(e){
                c(e);
            }

        }
    });
}
function checkNewNotifications(){
    $.ajax({
        url:"checkNotification.php",
        method:"GET",
        success: function (data, textStatus, jqXHR) {
            try {
                var result=JSON.parse(data);
                if(result.s==="ok"){
                    if(result.unread_count!==notifications_module.notifcations_count){
                        notifications_module.notifcations_count=result.unread_count;
                        updateNotificationCount();
                    }
                }
                else{
                    c("Notification fetch failed");
                    c(data);
                }
            }
            catch(e){
                c(e);
            }

        }
    });
}
function viewNotifications(targetId,itemClasses){
    $.ajax({
        url:"getNotifications.php",
        method:"GET",
        data:{
            type:"all"
        },
        success: function (data, textStatus, jqXHR) {
            try {
                var result=JSON.parse(data);
                if(result){
                    printNotifications(targetId,itemClasses,result);
                }
                else{
                    c("Notification fetch failed");
                    c(data);
                }
            }
            catch(e){
                c(e);
            }

        }
    });
}
function printNotifications(targetId,itemClass,notification_data){
    var htmlTemplate="";
    
    for(var item in notification_data){
        var readClass=(parseInt(notification_data[item].is_read))?"is_read":"new";
        htmlTemplate+='<div onclick="readNotification(\''+notification_data[item].notification_id+'\')" class="notif_id_'+notification_data[item].notification_id+' '+itemClass+" "+readClass+'"><div class="message">'+notification_data[item].message+'</div>\n\
                         <div class="time">'+notification_data[item].createdTime+'</div>\n\
                        </div>';
    }
    $(targetId).html(htmlTemplate);
}
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) === "undefined") {
            w = new Worker("notification_webworker.js");
            w.postMessage("checknow");
        }
        w.onmessage = function(event) {
            if(event.data.unread_count!==notifications_module.notifcations_count){
                notifications_module.notifcations_count=event.data.unread_count;
                updateNotificationCount();
            }
            setTimeout(function (){
                w.postMessage("checknow");
            },10000);
        };
    } else {
        setTimeout(checkNewNotifications,10000);
       console.log("Sorry! No Web Worker support.");
    }
}
function readNotifItem(id){
    checkNewNotifications();
    $('.notif_id_'+id).removeClass('new').addClass('is_read');
}
function alertResult(msg){
    $('.ResultArea').text(msg);
}
function updateNotificationCount(){
    $('.NotificationCount').text(notifications_module.notifcations_count).css({"background-color":"red"}).delay(3000).css({"background-color":"green"});
}
function c(txt){
    console.log(txt);
}