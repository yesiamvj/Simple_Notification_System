var document = self.document = { parentNode: null, nodeType: 9, toString: function () { return "FakeDocument" } };
var window = self.window = self;
var fakeElement = Object.create(document);
fakeElement.nodeType = 1;
fakeElement.toString = function () { return "FakeElement" };
fakeElement.parentNode = fakeElement.firstChild = fakeElement.lastChild = fakeElement;
fakeElement.ownerDocument = document;

document.head = document.body = fakeElement;
document.ownerDocument = document.documentElement = document;
document.getElementById = document.createElement = function () { return fakeElement; };
document.createDocumentFragment = function () { return this; };
document.getElementsByTagName = document.getElementsByClassName = function () { return [fakeElement]; };
document.attributes=null;
document.getAttribute = document.setAttribute = document.removeChild =
    document.addEventListener = document.removeEventListener =
    function () { return null; };
document.cloneNode = document.appendChild = function () { return this; };
document.appendChild = function (child) { return child; };
document.childNodes = [];
document.implementation = {
    createHTMLDocument: function () { return document; }
};
importScripts("https://code.jquery.com/jquery-2.1.4.min.js");
function checkNotifications(){
    $.ajax({
        url: "checkNotification.php",
        method: "GET",
        success: function (data, textStatus, jqXHR) {
            try {
                var result = JSON.parse(data);
                if (result.s === "ok") {
                    console.log(result);
                    self.postMessage(result);
                } else {
                    console.log("Notification fetch failed");
                    console.log(data);
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}
self.addEventListener('message', function(e) {
    console.log("hiiii");
    checkNotifications();
}, false);
