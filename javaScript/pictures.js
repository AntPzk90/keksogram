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
//карточка фотографии ====================================
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
//открытие карточки когда её миниатюра в фокуси при нажатии на ENTER
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
uploadInput.addEventListener("change", function(evt){
	uploadOverlay.classList.remove("hidden");
});

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
//проверка инпута на наличие #
var hashTag = document.querySelector(".upload-form-hashtags");
console.log(hashTag.getAttribute("value"));