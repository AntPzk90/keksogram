(function(){
    //все карточки на странице
    var picturesInDOM = pictureContainer.querySelectorAll(".picture");
    //обработчик нажатия на фото
    var fotoClickHendler = function(clickedEl,index){
        picturesInDOM[index].addEventListener("click", function(evt){
            evt.preventDefault();
            renderCardFoto(index);
        });
    };
    for (var i = 0; i < picturesInDOM.length; i++){
        fotoClickHendler(picturesInDOM[i],i);
    }
    //обработчик закрытия карточки
    var galleryOverlayClose =  galleryOverlay.querySelector(".gallery-overlay-close");
    var fotoCloseHendler = function(){
        galleryOverlay.classList.add("hidden");
    }
    //закрытие при клике на крестик
    galleryOverlayClose.addEventListener("click",function(evt){
        evt.preventDefault();
        fotoCloseHendler();
    });
    //закрытие при нажатии на ENTER когда крестик в фокусе
    galleryOverlayClose.addEventListener("keydown",function(evt){
        if(evt.keyCode === 13){
            fotoCloseHendler();
        }
    });
    //закрытие при нажатии ESC
    document.addEventListener("keydown", function(evt){
        if(evt.keyCode === 27){
            fotoCloseHendler();
            
        }
    });
    //открытие карточки когда её миниатюра в фокусе при нажатии на ENTER
    document.addEventListener("keydown", function(evt){
        if(evt.keyCode === 13){
            for (var i = 0; i < picturesInDOM.length; i++){
                fotoClickHendler(picturesInDOM[i],i);
            }
        }
    });
    //работа с формой
    var uploadInput = document.querySelector(".upload-input");
    var uploadOverlay = document.querySelector(".upload-overlay");
    //uploadInput.addEventListener("change", function(evt){
        uploadOverlay.classList.remove("hidden");
    //});
    
    var btnCloseForm = document.querySelector(".upload-form-cancel");
    //обработчик закрытия формы
    var formCloseHendler = function(){
        uploadOverlay.classList.add("hidden");
    }
    //закрытие формы при клике на крестик
    btnCloseForm.addEventListener("click", function(evt){
        formCloseHendler();
    });
    //обработчик закрытия формы при нажатии клавиши ESC
    document.addEventListener("keydown", function(evt){
        if(evt.keyCode === 27 && !formDscrFocusFlag){
            formCloseHendler();
        }
    });
    //закрытие при нажатии на ENTER когда крестик в фокусе
    btnCloseForm.addEventListener("keydown", function(evt){
        if(evt.keyCode === 13){
            formCloseHendler();
        }
    });
    //блок кода отвечающий за закрытие формы по нажатию на ESC
    //если поле комментария в фокусе йорма не закрывается по 
    //нажатию на ESC
    var formDscr = uploadOverlay.querySelector(".upload-form-description");
    var formDscrFocusFlag = false;
    formDscr.addEventListener("focus", function(evt){
        formDscrFocusFlag = true;
    });
    formDscr.addEventListener("blur", function(evt){
        formDscrFocusFlag = false;
    });
    })();