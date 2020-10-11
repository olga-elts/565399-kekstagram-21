'use strict';

const names = [
  `Турецкий`,
  `Томми`,
  `Кузен Ави`,
  `Сол`,
  `Микки`,
  `Винни`,
  `Фрэнки «Четыре пальца»`,
  `Кирпич`,
  `Роскошный Джордж`,
  `Тони «Пуля в зубах»`,
  `Борис «Бритва»`,
  `Даг «Голова»`,
  `Кирпич`
];

const quotes = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const descriptions = [
  `Вот так выглядит мой отпуск!`,
  `Все кайфы мои`,
  `Тестирую новую камеру`,
  `Воспоминания...`,
  `Теперь вы знаете, что подарить мне на др`,
  `Не знаю, почему, но очень нравится это фото...`
];

const NUMBER_PHOTOS = 25;

const NumberLikes = {
  MIN: 15,
  MAX: 200
};

const NumberComments = {
  MIN: 1,
  MAX: 3
};

const NumberAvatar = {
  MIN: 1,
  MAX: 6
};

/**
 * "Подбрасывает монетку" - возвращает случайное булевое значение
 * @return {boolean} - случайное булевое значение
 */
const getRandomBoolean = function () {
  return Math.random() >= 0.5;
};

/**
 * Генерирует массив url фотографий
 * @param {number} numberUrls - количество url фотографий
 * @return {Array} - массив url фотографий
 */
const getPhotosSrcs = function (numberUrls) {
  let photosSrcs = [];
  for (let i = 1; i <= numberUrls; i++) {
    photosSrcs.push(`photos/` + i + `.jpg`);
  }
  return photosSrcs;
};

/**
 * Перемешивает массив
 * @param {Array} array -  случайный массив
 */
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = array[j];
    array[j] = array[i];
    array[i] = swap;
  }
};

/**
 * Возвращает рандомное целое число между задаваемыми min и max
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @return {number} - случайное число
 */
const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Выбирает рандомный элемент из массива
 * @param {Array} array -  случайный массив
 * @return {*} - случайный элемент массива
 */
const getRandomElement = function (array) {
  return array[Math.floor(Math.random() * Math.floor(array.length))];
};

let photosSrcs = getPhotosSrcs(NUMBER_PHOTOS);
shuffleArray(photosSrcs);

/**
 * Генерирует массив объектов, каждый объект ‐ рандомное описание фотографии (url, описание, количество лайков, комментарии)
 * @param {number} photosNumber - количество фотографий
 * @return {Array} - массив объектов (фотографий)
 */
const getPhotos = function (photosNumber) {
  let photos = [];
  for (let i = 0; i < photosNumber; i++) {
    photos[i] = {};
    photos[i].url = photosSrcs[i];
    photos[i].description = getRandomElement(descriptions);
    photos[i].likes = getRandomNumber(NumberLikes.MIN, NumberLikes.MAX);
    photos[i].comments = [];
    for (let j = 0; j < getRandomNumber(NumberComments.MIN, NumberComments.MAX); j++) {
      photos[i].comments[j] = {};
      photos[i].comments[j].avatar = `img/avatar-` + getRandomNumber(NumberAvatar.MIN, NumberAvatar.MAX) + `.svg`;
      photos[i].comments[j].message = getRandomElement(quotes);
      if (getRandomBoolean()) {
        photos[i].comments[j].message += ` ` + getRandomElement(quotes);
      }
      photos[i].comments[j].name = getRandomElement(names);
    }
  }
  return photos;
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

/**
 * Отрисовывает фотографии, используя данные из массива объектов - фотографий
 * @param {number} photosElem - элемент массива фотографий (объект с описанием)
 * @return {Object} - фрагмент кода HTML
 */
const renderPhoto = function (photosElem) {
  let photo = pictureTemplate.cloneNode(true);

  photo.querySelector(`.picture__img`).src = photosElem.url;
  photo.querySelector(`.picture__comments`).textContent = photosElem.comments.length;
  photo.querySelector(`.picture__likes`).textContent = photosElem.likes;

  return photo;
};

const photos = getPhotos(photosSrcs.length);

const fragment = document.createDocumentFragment();
photos.forEach(function (photo) {
  fragment.appendChild(renderPhoto(photo));
});

const picturesContainer = document.querySelector(`.pictures`);
picturesContainer.appendChild(fragment);

// module4-task1 Загрузка изображения и показ формы редактирования

const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
const effectsPreviews = document.querySelectorAll(`.effects__preview`);

/**
 * Заменяет дефолтную картинку превью и эффектов на загруженную
 */
const setUploadedPhoto = function () {
  imgUploadPreview.src = URL.createObjectURL(uploadFileInput.files[0]);
  effectsPreviews.forEach(function (effectsPreview) {
    effectsPreview.style.backgroundImage = `url("` + URL.createObjectURL(uploadFileInput.files[0]) + `")`;
  });
};

/**
 * Закрывает форму редактирования фото при нажатии кнопки Esc
 * @param {event} evt - событие
 */
const onUploadFormEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const body = document.querySelector(`body`);
const imgUploadForm = document.querySelector(`.img-upload__overlay`);
const uploadFileInput = document.querySelector(`#upload-file`);
const uploadCancelBtn = document.querySelector(`#upload-cancel`);

/**
 * Открывает форму редактирования, добавляет слушитель события keydown
 * @param {event} evt - событие
 */
const openUploadForm = function () {
  imgUploadForm.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  setUploadedPhoto();
  document.addEventListener(`keydown`, onUploadFormEscPress);
};

/**
 * Закрывает форму редактирования, удаляет слушитель события keydown
 * @param {event} evt - событие
 */
const closeUploadForm = function () {
  uploadFileInput.value = ``;
  imgUploadForm.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onUploadFormEscPress);
};

uploadFileInput.addEventListener(`change`, function () {
  openUploadForm();
});

uploadCancelBtn.addEventListener(`click`, function () {
  closeUploadForm();
});

// module4-task1 Перемещение ползунка

const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectLevelDepth = document.querySelector(`.effect-level__depth`);

const getCoords = function (elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

effectLevelPin.addEventListener(`mousedown`, function (evt) {
  let pinXCoord = evt.clientX;
  let lineXCoord = getCoords(effectLevelLine).left;
  let deltaX = pinXCoord - lineXCoord;
  let deltaXMax = effectLevelLine.offsetWidth;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    pinXCoord = moveEvt.clientX;
    deltaX = pinXCoord - lineXCoord;

    if (deltaX >= 0 && deltaX <= deltaXMax) {
      let effectLevel = deltaX / deltaXMax * 100 + `%`;
      effectLevelPin.style.left = effectLevel;
      effectLevelDepth.style.width = effectLevel;
    }
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});
