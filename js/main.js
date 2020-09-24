'use strict';

const names = [`Турецкий`, `Томми`, `Кузен Ави`, `Сол`, `Микки`, `Винни`, `Фрэнки «Четыре пальца»`, `Кирпич`, `Роскошный Джордж`, `Тони «Пуля в зубах»`, `Борис «Бритва»`, `Даг «Голова»`, `Кирпич`];

const quotes = [`Всё отлично!`, `В целом всё неплохо. Но не всё.`, `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`, `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`, `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`, `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`];

const descriptions = [`Вот так выглядит мой отпуск!`, `Все кайфы мои`, `Тестирую новую камеру`, `Воспоминания...`, `Теперь вы знаете, что подарить мне на др`, `Не знаю, почему, но очень нравится это фото...`];

let photosSrcs = [];

const renderPhotosSrcsArray = function (arrayLength) {
  for (let i = 1; i <= arrayLength; i++) {
    photosSrcs.push(`photos/` + i + `.jpg`);
  }
  return photosSrcs;
};
renderPhotosSrcsArray(25);

/* функция к варианту создания рандомного url для фото
const shuffleArray = function (array) {
  var j, swap;
  for(var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }
  return array;
}
shuffleArray(photosSrcsArray);
*/

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = function (array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
};

let photos = [];

const renderPhotosArray = function (photosNumber) {
  for (let i = 0; i < photosNumber; i++) {
    photos[i] = {};
    /*
    вариант создания рандомного url (только вместе с функцией shuffleArray выше):
    photos[i].url = photosSrcsArray[i];
    */
    let photoUrl = getRandomElement(photosSrcs);
    photos[i].url = photoUrl;
    let index = photosSrcs.indexOf(photoUrl);
    photosSrcs.splice(index, 1);
    photos[i].description = getRandomElement(descriptions);
    photos[i].likes = getRandomNumber(15, 200);
    photos[i].comments = [];
    for (let j = 0; j < getRandomNumber(1, 3); j++) {
      photos[i].comments[j] = {};
      photos[i].comments[j].avatar = `img/avatar-` + getRandomNumber(1, 6) + `.svg`;
      photos[i].comments[j].message = getRandomElement(quotes);
      if (Math.random() >= 0.5) {
        photos[i].comments[j].message += ` ` + getRandomElement(quotes);
      }
      photos[i].comments[j].name = getRandomElement(names);
    }
  }
  return photos;
};
renderPhotosArray(photosSrcs.length);

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

const renderPhoto = function (photoElem) {
  let photo = pictureTemplate.cloneNode(true);

  photo.querySelector(`.picture__img`).src = photoElem.url;
  photo.querySelector(`.picture__comments`).textContent = photoElem.comments.length;
  photo.querySelector(`.picture__likes`).textContent = photoElem.likes;

  return photo;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
}

const picturesContainer = document.querySelector(`.pictures`);
picturesContainer.appendChild(fragment);
