var pictures = [];

var radndomInt = function(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}
var generatePictureInt = function(){
	var intArr = [];
	for(var i = 1; i <= 25; i++){
		intArr.push(i);
	}
	var sortedArr = intArr.sort(function(){
	  return Math.random() - 0.5;
	});
	return sortedArr
}
srcInt = generatePictureInt();
var comments = [
	"Всё отлично!",
	"В целом всё неплохо. Но не всё.",
	"Когда вы делаете фотографию, хорошо бы убирать палец из" + 
	"кадра. В конце концов это просто непрофессионально.",
	"Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
	"Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
	"Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!"
];
var createComment = function(arr){
	arr.sort(function(){
	  return Math.random() - 0.5;
	});
	var stringArr = [];
	for(var i = 0; i < 2; i ++){
		stringArr.push(arr[i]);
	}
	return stringArr
};

for(var i = 0; i < 25; i++){
	var picture = {
		url : "photos/" + srcInt[i] + ".jpg",
		likes: radndomInt(15, 200),
		comments: createComment(comments)
	}
	pictures.push(picture)
}