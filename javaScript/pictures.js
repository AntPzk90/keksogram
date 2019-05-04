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
	pictureItem.querySelector(".picture-comments").textContent = picture.comments.length;
	pictureItem.querySelector(".picture-likes").textContent = picture.likes;

	pictureItem.addEventListener("click",function(evt){
		evt.preventDefault();
		renderCardFoto(picture);
	})

	return pictureItem
}
/*
ф-ция которая вставляет карточку на страницу
@param createPicture {finction} фция которая клонирует и создаёт карточку
@param items {array} массив с карточками
*/
var appendPictures = function(items){
	var fragment = document.createDocumentFragment();
	for(var i = 0; i < items.length; i ++){
		fragment.appendChild(createPictureItem(items[i]));
	}
	pictureContainer.appendChild(fragment);
}
// сортировка по лайкам
var sortedLikesPictures = function(arr){
	arr.sort(function(left,right){
	if (left.likes > right.likes) {
		return -1;
		}
		if (left.likes < right.likes) {
		return 1;
		}
		// left должно быть равным right
		return 0;
	});
	return arr
};
// сортировка по коментариям
var sortedCommentsPictures = function(arr){
	arr.sort(function(left,right){
	if (left.comments.length > right.comments.length) {
		return -1;
		}
		if (left.comments.length < right.comments.length) {
		return 1;
		}
		// left должно быть равным right
		return 0;
	});
	return arr
};
//фильтр случайных фотографий
var randomPhoto = function(arr){
	var randomPhotoArr =[];
	for(var i = 0; i < 10; i++){
		randomPhotoArr.push(arr[i]);
	}
	return randomPhotoArr.sort(function(a, b) {
		return Math.random() - 0.5;
	  });
};
//удаление елементов
var deleteElements = function(arr){
	for(var i = 0; i < arr.length;i++){
		arr[i].remove();
	}
};
//функция загрузки данных с сервера описана в модуле beckend.js,
// работу с событиями выполняем внутри этой ф-ции
window.load(function (pictures){
	var picturesCopy = pictures.slice();
	appendPictures(pictures);
	// блок с фильтрами
	var picturesFilters = document.querySelector(".filters");
	picturesFilters.classList.remove("hidden");
	picturesFilters.addEventListener("change", function(){
		var filtersRadioChecked = picturesFilters.querySelector("input[type=radio]:checked");
		var filterValue = filtersRadioChecked.getAttribute("value");
		var pictureContainerItems = pictureContainer.querySelectorAll(".picture");
		deleteElements(pictureContainerItems);
		switch(filterValue){
			case "recommend":
				appendPictures(pictures);
				break;
			case "discussed":
				appendPictures(sortedCommentsPictures(picturesCopy));
				break;
			case "random":
				appendPictures(randomPhoto(picturesCopy));
				break;
			case "popular":
				appendPictures(sortedLikesPictures(picturesCopy));
				break;
		}
	});
	/*
	обработчик события клика по карточке
	@param clickedEl {DOMel} карточка на кторой был клик
	@param index {int} индекс элемента на котором произошел клик
	*/
	// var picturesInDOM = document.querySelectorAll(".picture");
	// var fotoClickHendler = function(clickedEl,index){
    //     picturesInDOM[index].addEventListener("click", function(evt){
    //         evt.preventDefault();
	// 		renderCardFoto(index);
    //     });
    // };
    // for (var i = 0; i < picturesInDOM.length; i++){
    //     fotoClickHendler(picturesInDOM[i],i);
	// }
	//карточка фотографии
	window.galleryOverlay = document.querySelector(".gallery-overlay");
	/*
	ф-ция отрисовки увеличиной карточки при клике
	@param index {int} индекс элемента массива с карточками фото который нужно отрисовать
	*/
	window.renderCardFoto = function(picture){
		galleryOverlay.classList.remove("hidden");
		// вставка фотографии
		galleryOverlay.querySelector(".gallery-overlay-image").src = picture.url;
		//число лайков
		var likeCount = galleryOverlay.querySelector(".likes-count").textContent = picture.likes;
		//число комментариев
		galleryOverlay.querySelector(".comments-count").textContent = picture.comments.length;
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