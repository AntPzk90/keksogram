"use strict";
(function(){
    // работа с масштабом картинки
    var controlResizeBtnDec = document.querySelector(".upload-resize-controls-button-dec");
    var controlResizeBtnInc = document.querySelector(".upload-resize-controls-button-inc");
    var controlResizeInput = document.querySelector(".upload-resize-controls-value");
    var workingFoto = document.querySelector(".effect-image-preview");
    // находим значение масштаба
    var rangeScale = Number(controlResizeInput.getAttribute("value").split('').slice(0, -1).join(''));
    // значение шага
    var rangeStep = Number(controlResizeInput.getAttribute("step"));
    //ф-ция уменьшения и увеличения размеров картинки
    var scaleFoto = function(){
        switch(rangeScale){
            case 25:
                workingFoto.style.transform = "scale(0.25)";
                break;
            case 50:
                workingFoto.style.transform = "scale(0.5)";
                break;
            case 75:
                workingFoto.style.transform = "scale(0.75)";
                break;
            case 100:
                workingFoto.style.transform = "scale(1)";
                break;
        }
    };
    // обработчи клика на "-"
    controlResizeBtnDec.addEventListener("click", function(){
        var rangeResult = rangeScale - rangeStep;
        rangeScale = rangeResult
        if(rangeScale < 25){
            rangeScale = 25;
        }
        controlResizeInput.value = rangeScale + "%"
        scaleFoto();
    });
    //обработчик клика на "+"
    controlResizeBtnInc.addEventListener("click", function(){
        var rangeResult = rangeScale + rangeStep;
        rangeScale = rangeResult
        if(rangeScale >= 100){
            rangeScale = 100;
        }
        controlResizeInput.value = rangeScale + "%"
        scaleFoto();
    });
    //работа с фильтром фотографий
    var effectControls = document.querySelector(".upload-form");
    var effectInputs = effectControls.querySelectorAll("input[name=effect]");
    //пин ренжа
    var uploadPin = document.querySelector(".upload-effect-level-pin");
    //линия ренжа
    var uploadLine = document.querySelector(".upload-effect-level-line");
    //уровень ренжа
    var uploadlevel = document.querySelector(".upload-effect-level-val");

    var inputClickHendler = function(clickedEl,index){
        effectInputs[index].addEventListener("click", function(evt){
            var filterValue = effectInputs[index].getAttribute("value");
            var effectValueNow = workingFoto.classList[1];
            workingFoto.classList.remove(effectValueNow);
            workingFoto.removeAttribute("style");
            uploadPin.style.left = uploadLine.offsetWidth + "px";
            uploadlevel.style.width = uploadLine.offsetWidth + "px";
            switch(filterValue){
                case "chrome":
                    workingFoto.classList.add("effect-chrome");
                    break;
                case "sepia":
                    workingFoto.classList.add("effect-sepia");
                    break;
                case "marvin":
                    workingFoto.classList.add("effect-marvin");
                    break;
                case "phobos":
                    workingFoto.classList.add("effect-phobos");
                    break;
                case "heat":
                    workingFoto.classList.add("effect-heat");
                    break;
            }
        });
    }
    for (var i = 0; i < effectInputs.length; i++){
        inputClickHendler(effectInputs[i],i);
    }
    //dragNdrop
    uploadPin.addEventListener("mousedown",function(evt){
        var startCoords = {
            x: evt.clientX,
        };
        var onMouseMove = function(moveEvt){
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
            }

            startCoords = {
                x: moveEvt.clientX,
            }
            uploadPin.style.left = (uploadPin.offsetLeft - shift.x) + "px";
            var dragedPinCoords = uploadPin.offsetLeft - shift.x;
            var uploadLineWidth = uploadLine.offsetWidth;
            uploadlevel.style.width = dragedPinCoords + "px";
            if(dragedPinCoords <=  0){
                uploadPin.style.left = 0 + "px"; 
            }else if(dragedPinCoords >= uploadLineWidth){
                uploadPin.style.left = uploadLineWidth + "px"; 
            }
            //приведение положения ползунка к процентам
            var procent = Math.floor(dragedPinCoords / (uploadLineWidth / 100));
            //поиск фильтра который в данный момент на фото
            var chrome = workingFoto.classList.contains("effect-chrome");
            var sepia = workingFoto.classList.contains("effect-sepia");
            var marvin = workingFoto.classList.contains("effect-marvin");
            var phobos = workingFoto.classList.contains("effect-phobos");
            var heat = workingFoto.classList.contains("effect-heat");
            //присвоение атрибута фильтра
            if(chrome){
                workingFoto.style.filter = "grayscale" + "(" + procent/100 + ")";
            }else if(sepia){
                workingFoto.style.filter = "sepia" + "(" + procent/100 + ")";
            }else if(marvin){
                workingFoto.style.filter = "invert" + "(" + procent + "%)";
            }else if(phobos){
                workingFoto.style.filter = "blur" + "(" + Math.floor(procent/33) + "px)";
            }else if(heat){
                workingFoto.style.filter = "brightness" + "(" + Math.floor(procent/33) + ")";
            }
            
        };
        var onMouseUp = function(upEvt){
            upEvt.preventDefault();
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
    })();