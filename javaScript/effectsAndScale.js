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
    
    var inputClickHendler = function(clickedEl,index){
        effectInputs[index].addEventListener("click", function(evt){
            var filterValue = effectInputs[index].getAttribute("value");
            var effectValueNow = workingFoto.classList[1];
            workingFoto.classList.remove(effectValueNow);
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
    })();