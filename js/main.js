'use strict';

const NAMES = [
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

const QUOTES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const DESCRIPTIONS = [
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
  const photosSrcs = [];
  for (let i = 1; i <= numberUrls; i++) {
    photosSrcs.push(`photos/${i}.jpg`);
  }
  return photosSrcs;
};

/**
 * Перемешивает массив
 * @param {Array} array -  случайный массив
 */
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[j], array[i]] = [array[i], array[j]];
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

const photosSrcs = getPhotosSrcs(NUMBER_PHOTOS);
shuffleArray(photosSrcs);

/**
 * Генерирует массив объектов, каждый объект ‐ рандомное описание фотографии (url, описание, количество лайков, комментарии)
 * @param {number} photosNumber - количество фотографий
 * @return {Array} - массив объектов (фотографий)
 */
const getPhotos = function (photosNumber) {
  const photos = [];
  for (let i = 0; i < photosNumber; i++) {
    const photo = {
      url: photosSrcs[i],
      description: getRandomElement(DESCRIPTIONS),
      likes: getRandomNumber(NumberLikes.MIN, NumberLikes.MAX),
      comments: []
    };
    photos.push(photo);
    for (let j = 0; j < getRandomNumber(NumberComments.MIN, NumberComments.MAX); j++) {
      let message = getRandomElement(QUOTES);
      if (getRandomBoolean()) {
        message += ` ` + getRandomElement(QUOTES);
      }
      photo.comments.push({
        avatar: `img/avatar-${getRandomNumber(NumberAvatar.MIN, NumberAvatar.MAX)}.svg`,
        message,
        name: getRandomElement(NAMES)
      });
    }
  }
  return photos;
};

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

/**
 * Отрисовывает фотографии, используя данные из массива объектов - фотографий
 * @param {Object} photosElem - объект фотографии
 * @return {Object} - фрагмент кода HTML
 */
const renderPhoto = function (photosElem) {
  const photo = pictureTemplate.cloneNode(true);

  photo.querySelector(`.picture__img`).src = photosElem.url;
  photo.querySelector(`.picture__comments`).textContent = photosElem.comments.length;
  photo.querySelector(`.picture__likes`).textContent = photosElem.likes;

  return photo;
};

const photos = getPhotos(NUMBER_PHOTOS);

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
    effectsPreview.style.backgroundImage = `url("${URL.createObjectURL(uploadFileInput.files[0])}")`;
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

// module4-task1 Изменение интенсивности эффекта, примененного к фотографии

/**
 * Возвращает координаты элемента относительно документа
 * @param {Object} elem - DOM-элемент
 * @return {Object} - объект с координатами элемента по осям Y и X
 */
const getCoords = function (elem) {
  const box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

const effectToFilter = {
  chrome: `grayscale`,
  sepia: `sepia`,
  marvin: `invert`,
  phobos: `blur`,
  heat: `brightness`
};

const filterMinMax = {
  grayscale: {
    MIN: 0,
    MAX: 1
  },
  sepia: {
    MIN: 0,
    MAX: 1
  },
  invert: {
    MIN: 0,
    MAX: 100,
    UNIT: `%`
  },
  blur: {
    MIN: 0,
    MAX: 3,
    UNIT: `px`
  },
  brightness: {
    MIN: 1,
    MAX: 3
  }
};

/**
 * Устанавливает интенсивность эффекта, примененного к фотографии, при перемещении ползунка
 * @param {number} level - интенсивность эффекта
 */
const setEffectLevel = function (level) {
  const effectApplied = document.querySelector(`.effects__radio:checked`).value;
  const filterApplied = effectToFilter[effectApplied];
  const filterMin = filterMinMax[filterApplied].MIN;
  const filterMax = filterMinMax[filterApplied].MAX;
  let filterUnit = ``;
  if (filterMinMax[filterApplied].UNIT) {
    filterUnit = filterMinMax[filterApplied].UNIT;
  }
  imgUploadPreview.style.filter = filterApplied + `(${filterMin + (filterMax - filterMin) * level + filterUnit})`;
};

/**
 * Устанавливает стили ползунка и значение интенсивности эффекта
 * @param {number} factor - коэффициент интенсивности эффекта
 */
const setPinStyles = function (factor) {
  effectLevelPin.style.left = defaultSettings.EFFECT_LEVEL * factor + `%`;
  effectLevelDepth.style.width = defaultSettings.EFFECT_LEVEL * factor + `%`;
  effectLevelValue.value = defaultSettings.EFFECT_LEVEL * factor;
};

// Перемещение ползунка

const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);

effectLevelPin.addEventListener(`mousedown`, function () {
  const lineXCoord = getCoords(effectLevelLine).left;
  const deltaXMax = effectLevelLine.offsetWidth;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const pinXCoord = moveEvt.clientX;
    const deltaX = pinXCoord - lineXCoord;

    if (deltaX >= 0 && deltaX <= deltaXMax) {
      const effectLevelFactor = (deltaX / deltaXMax).toFixed(2);
      setEffectLevel(effectLevelFactor);
      setPinStyles(effectLevelFactor);
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

// module4-task1 Наложение фильтра на изображение

const defaultSettings = {
  EFFECT: `none`,
  EFFECT_LEVEL: 100,
  FACTOR: 1
};

const effects = document.querySelector(`.effects`);

/**
 * Cбрасывает фильтр фотографии
 */
const resetEffect = function () {
  imgUploadPreview.style.filter = ``;
};

/**
 * Применяет эффект к фотографии
 * @param {string} effect - название эффекта
 */
const applyEffect = function (effect) {
  effectLevel.classList.remove(`hidden`);
  imgUploadPreview.className = ``;
  imgUploadPreview.classList.add(`effects__preview--` + effect);
  if (effect === `none`) {
    effectLevel.classList.add(`hidden`);
  }
};

effects.addEventListener(`click`, function (evt) {
  const effect = evt.target.value;
  resetEffect();
  setPinStyles(defaultSettings.FACTOR);
  applyEffect(effect);
});

// module4-task1 Изменение масштаба preview фотографии

const Scale = {
  STEP: 25,
  MAX: 100,
  MIN: 25
};

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleControlValue = document.querySelector(`.scale__control--value`);

const resetScale = function () {
  imgUploadPreview.style.transform = ``;
  scaleControlValue.value = ``;
};

const changeScale = function (scaleMin, scaleMax, step) {
  let scale = parseFloat(scaleControlValue.value);
  if (scale < scaleMin - step) {
    scale = scaleMin;
  } else if (scale > scaleMax - step) {
    scale = scaleMax;
  } else {
    scale += step;
  }
  imgUploadPreview.style.transform = `scale(${scale / 100})`;
  scaleControlValue.value = scale + `%`;
};

scaleControlSmaller.addEventListener(`click`, function () {
  changeScale(Scale.MIN, Scale.MAX, -Scale.STEP);
});

scaleControlBigger.addEventListener(`click`, function () {
  changeScale(Scale.MIN, Scale.MAX, Scale.STEP);
});

// module4-task1 Валидация хештегов

const HASHTAG_MAXLENGTH = 20;
const HASHTAGS_MAXNUMBER = 5;

const re = /^#[а-яА-Я\w]+$/;

const textHashtagsInput = document.querySelector(`.text__hashtags`);

/**
 * Выводит сообщение о превышении допустимого количества хэштегов
 * @param {Array} array - массив
 */
const checkArrayLength = function (array) {
  if (array.length > HASHTAGS_MAXNUMBER) {
    textHashtagsInput.setCustomValidity(`Слишком много хэштегов!`);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }
};

/**
 * Выводит сообщение при наличии дублирующихся хэштегов
 * @param {Array} array - массив
 */
const checkDuplicates = function (array) {
  let yesDuplicates = false;
  const arrayUppercase = array.map(function (element) {
    return element.toUpperCase();
  });
  const arrayOfUniques = new Set(arrayUppercase);
  if (arrayOfUniques.size !== array.length) {
    yesDuplicates = true;
  }
  if (yesDuplicates) {
    textHashtagsInput.setCustomValidity(`Есть повторяющиеся хэштеги!`);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }
};

/**
 * Выводит сообщение в случае использования хотя бы в одном хэштеге недопустимых символов
 * @param {Array} array - массив хэштегов
 */
const checkHashtagsValidity = function (array) {
  const invalid = array.some((elem) => !re.test(elem));
  if (invalid) {
    textHashtagsInput.setCustomValidity(`Хэштег должен состоять только из букв, чисел и нижнего подчеркивания!`);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }
};

/**
 * Выводит сообщение в случае превышения длины хотя бы одного хэштега
 * @param {Array} array - массив хэштегов
 */
const checkHashtagsLength = function (array) {
  const tooLong = array.some((elem) => elem.length > HASHTAG_MAXLENGTH);
  if (tooLong) {
    textHashtagsInput.setCustomValidity(`Максимальная длина хэштега - ` + HASHTAG_MAXLENGTH);
  } else {
    textHashtagsInput.setCustomValidity(``);
  }
};

const checkFunctions = [checkDuplicates, checkArrayLength, checkHashtagsLength, checkHashtagsValidity];

textHashtagsInput.addEventListener(`input`, function () {
  const hashtags = textHashtagsInput.value.trim().split(` `);
  for (let i = 0; i < checkFunctions.length; i++) {
    checkFunctions[i](hashtags);
    if (textHashtagsInput.validationMessage) {
      return;
    }
  }
});

uploadFileInput.addEventListener(`change`, function () {
  openUploadForm();
  setPinStyles(defaultSettings.FACTOR);
  applyEffect(defaultSettings.EFFECT);
});

uploadCancelBtn.addEventListener(`click`, function () {
  closeUploadForm();
  resetScale();
  resetEffect();
});

const imgUploadText = document.querySelector(`.img-upload__text`);

imgUploadText.addEventListener(`focusin`, function () {
  document.removeEventListener(`keydown`, onUploadFormEscPress);
});

imgUploadText.addEventListener(`focusout`, function () {
  document.addEventListener(`keydown`, onUploadFormEscPress);
});
