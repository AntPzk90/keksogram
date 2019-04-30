(function(){
"use strict";
var URL = "https://js.dump.academy/kekstagram/data";
window.load = function(onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", URL);
    xhr.addEventListener("load", function(){
        onSuccess(xhr.response)
    });
    xhr.send();
};
window.onLoadDoSuccess = function(pictures){
    console.log(pictures)
}
})();