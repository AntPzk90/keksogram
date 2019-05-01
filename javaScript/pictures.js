"use strict";
(function(){
//создание и отгрузка фотографий на главную страницу ===========
var pictureTemplate = document.querySelector("#picture-template")
.content.querySelector(".picture");
window.pictureContainer = document.querySelector(".pictures");
var createPictureItem = function(picture){
	var pictureItem = pictureTemplate.cloneNode(true);

	pictureItem.querySelector("img").src = picture.url;
	pictureItem.querySelector(".picture-comments").textContent = picture.comments;
	pictureItem.querySelector(".picture-likes").textContent = picture.likes;

	return pictureItem
}
var appendPictures = function(createPicture,items){
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < items.length; i ++){
		fragment.appendChild(createPicture(items[i]));
	}
	pictureContainer.appendChild(fragment);
}
window.load(function (pictures){
	appendPictures(createPictureItem, pictures)
	var picturesInDOM = document.querySelectorAll(".picture");
	var fotoClickHendler = function(clickedEl,index){
        picturesInDOM[index].addEventListener("click", function(evt){
            evt.preventDefault();
            renderCardFoto(index);
        });
    };
    for (var i = 0; i < picturesInDOM.length; i++){
        fotoClickHendler(picturesInDOM[i],i);
	}
	//карточка фотографии
	window.galleryOverlay = document.querySelector(".gallery-overlay");
	//ф-ция отрисовки карточки
	window.renderCardFoto = function(index){
		galleryOverlay.classList.remove("hidden");
		// вставка фотографии
		galleryOverlay.querySelector(".gallery-overlay-image").src = pictures[index].url;
		//число лайков
		var likeCount = galleryOverlay.querySelector(".likes-count").textContent = pictures[index].likes;
		//число комментариев
		galleryOverlay.querySelector(".comments-count").textContent = pictures[index].comments.length;
	}
});
})();