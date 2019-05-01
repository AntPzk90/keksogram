"use strict";
(function(){
//создание и отгрузка фотографий на главную страницу ===========
var pictureTemplate = document.querySelector("#picture-template")
.content.querySelector(".picture");
window.pictureContainer = document.querySelector(".pictures");
/*
ф-ция которая клонирует и создаёт карточку с фото наполняет контентом
@param picture {object} объект с информацией 
*/
var createPictureItem = function(picture){
	var pictureItem = pictureTemplate.cloneNode(true);

	pictureItem.querySelector("img").src = picture.url;
	pictureItem.querySelector(".picture-comments").textContent = picture.comments;
	pictureItem.querySelector(".picture-likes").textContent = picture.likes;

	return pictureItem
}
/*
ф-ция которая вставляет карточку на страницу
@param createPicture {finction} фция которая клонирует и создаёт карточку
@param items {array} массив с карточками
*/
var appendPictures = function(createPicture,items){
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < items.length; i ++){
		fragment.appendChild(createPicture(items[i]));
	}
	pictureContainer.appendChild(fragment);
}
var createError = function(){

}
//функция загрузки данных с сервера описана в модуле beckend.js,
// работу с событиями выполняем внутри этой ф-ции
window.load(function (pictures){
	appendPictures(createPictureItem, pictures)
	// находим отрисованые карточки в дом дереве
	var picturesInDOM = document.querySelectorAll(".picture");
	/*
	обработчик события клика по карточке
	@param clickedEl {DOMel} карточка на кторой был клик
	@param index {int} индекс элемента на котором произошел клик
	*/
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
	/*
	ф-ция отрисовки увеличиной карточки при клике
	@param index {int} индекс элемента массива с карточками фото который нужно отрисовать
	*/
	window.renderCardFoto = function(index){
		galleryOverlay.classList.remove("hidden");
		// вставка фотографии
		galleryOverlay.querySelector(".gallery-overlay-image").src = pictures[index].url;
		//число лайков
		var likeCount = galleryOverlay.querySelector(".likes-count").textContent = pictures[index].likes;
		//число комментариев
		galleryOverlay.querySelector(".comments-count").textContent = pictures[index].comments.length;
	}
},function(){
	var body = document.querySelector("body");
	var errorMassegeDiv = document.createElement("p");
	var filtersForm = document.querySelector(".filters");
	errorMassegeDiv.textContent = "Ошибка соединения =) Не растраивайтесь скоро всё поправится";
	body.insertBefore(errorMassegeDiv,filtersForm);
	errorMassegeDiv.classList.add("load-error-massege");
});
})();