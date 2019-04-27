(function(){
    //валидация
    var formControls = document.querySelector(".upload-form");
    var hashTagInput = document.querySelector(".upload-form-hashtags");
    var errorParagraph = document.querySelector(".error-massege");
    var uploadSubmit = document.querySelector("#upload-submit");
    
    formControls.addEventListener("keyup", function(evt){
        var hashtagsArr = hashTagInput.value.split(' ');
        uploadSubmit.setAttribute("disabled", "disabled");
        //добавление красной рамки
        var addRedBorder = function(){
            hashTagInput.style.borderColor = "red";
            hashTagInput.style.outlineColor = "red";
        }
        //проверка на повторение
        var noRepeatHashTagsFunction = function(){
            var repeatFlag = true;
            if(hashtagsArr.length > 1){
                for(var i = 0; i < hashtagsArr.length; i++){
                    for(var j = 0; j < hashtagsArr.length; j++){
                        if(i !== j ){
                            if(hashtagsArr[i] == hashtagsArr[j]){
                                repeatFlag = false
                            }
                        }
                    }
                }
            }
            return repeatFlag
        }
        // проверка первого символа хештега
        var checkSymbolFunction = function(){
            var symbolFlag = true;
            for(var k = 0; k < hashtagsArr.length; k++){
                if(hashtagsArr[k][0] !== "#"){
                    symbolFlag = false;
                }
            }
            return symbolFlag
        }
        //проверка количества
        var hashTagsCountFunction = function(){
            if(hashtagsArr.length > 5){
                return false
            } else {
                return true
            }
        }
    
        var checkSymbol = checkSymbolFunction();
        var noRepeatHashTags = noRepeatHashTagsFunction();
        var hashTagsCount = hashTagsCountFunction();
    
        var errorMessageFunction = function(symbol, repeat, count){
            var errorArr = []
            if(!checkSymbol){
                var checkSymbolErrorMassege = "первый символ хештега должне быть #";
                errorArr.push(checkSymbolErrorMassege);
            }
            if(!noRepeatHashTags){
                var repeatErrorMassage = "Хештеги не должны повторяться";
                errorArr.push(repeatErrorMassage);
            }
            if(!hashTagsCount){
                var countErrorMassage = "допустимо 5 хештегов";
                errorArr.push(countErrorMassage);
            }
            return errorArr
        }
        //создание сообщения об ошибке с переносом строки 
        var errorMassege = errorMessageFunction(checkSymbol,noRepeatHashTags,hashTagsCount);
    
        var printErrorMassege = function(massege){
            var forPrint = "";
            for(var i = 0; i < massege.length;i++){
                forPrint += massege[i] + "<br>"
            }
            return forPrint
        }
        var errorMassegeForPrint = printErrorMassege(errorMassege);
        // работа с отображением сообщения и стилизацией рамки
        if(checkSymbol && noRepeatHashTags && hashTagsCount || hashTagInput.value === ""){
            hashTagInput.removeAttribute("style");
            errorParagraph.innerHTML = null;
            uploadSubmit.removeAttribute("disabled");
            errorParagraph.classList.remove("error-massege--active");
        }else{
            evt.preventDefault();
            addRedBorder();
            errorParagraph.classList.add("error-massege--active");
            errorParagraph.innerHTML = errorMassegeForPrint;
        } 
    });
    })();