"use strict";
(function(){
var URL = "https://js.dump.academy/kekstagram/data";
window.load = function(onSuccess, onError){
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", URL);
    xhr.addEventListener("load", function(){
        if(xhr.status == 200){
            onSuccess(xhr.response)
            console.log(xhr.status)
        }else if(xhr.status == 400 || xhr.status == 404){
            onError();
        }
        console.log(xhr.status)
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
            if(xhr.status == 200){
                onSuccess(xhr.response)
            }else if(xhr.status == 400 || xhr.status == 404){
                onError();
            }
        });
        xhr.open("POST", URL);
        xhr.send(data);
    }
})();