"use strict";
(function(){
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
(function(){
    var URL = "https://js.dump.academy/kekstagram";
    window.upload = function(data,onSuccess,onError){
        var xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.addEventListener("load", function(){
            onSuccess(xhr.response)
        });
        xhr.open("POST", URL);
        xhr.send(data);
    }
})();