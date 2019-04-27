//создание и отгрузка фотографий на главную страницу ===========
var pictureTemplate = document.querySelector("#picture-template")
.content.querySelector(".picture");
var pictureContainer = document.querySelector(".pictures");
var createPuctureItem = function(picture){
	var pictureItem = pictureTemplate.cloneNode(true);

	pictureItem.querySelector("img").src = picture.url;
	pictureItem.querySelector(".picture-comments").textContent = picture.comments;
	pictureItem.querySelector(".picture-likes").textContent = picture.likes;

	return pictureItem
}
var fragment = document.createDocumentFragment();
for(var i = 0; i < pictures.length; i ++){
	fragment.appendChild(createPuctureItem(pictures[i]));
}
pictureContainer.appendChild(fragment);
//карточка фотографии
var galleryOverlay = document.querySelector(".gallery-overlay");
//ф-ция отрисовки карточки
var renderCardFoto = function(index){
	galleryOverlay.classList.remove("hidden");
	// вставка фотографии
	galleryOverlay.querySelector(".gallery-overlay-image").src = pictures[index].url;
	//число лайков
	var likeCount = galleryOverlay.querySelector(".likes-count").textContent = pictures[index].likes;
	//число комментариев
	galleryOverlay.querySelector(".comments-count").textContent = pictures[index].comments.length;
}
//все карточки на странице
var picturesInDOM = pictureContainer.querySelectorAll(".picture");
//обработчик нажатия на фото
var fotoClickHendler = function(clickedEl,index){
	picturesInDOM[index].addEventListener("click", function(evt){
		evt.preventDefault();
		renderCardFoto(index);
	});
}
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
//===================================================================================
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
//====================================================================================
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

//===========================================================================================
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
//==================================================================================
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
//===================================================================================