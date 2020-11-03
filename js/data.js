'use strict';

(function () {
  const {getRandomBoolean, getRandomElement, getRandomNumber} = window.util;

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
   * Генерирует массив объектов, каждый объект ‐ рандомное описание фотографии (url, описание, количество лайков, комментарии)
   * @param {number} photosNumber - количество фотографий
   * @param {array} photosSrcs - массив src фотографий
   * @return {Array} - массив объектов (фотографий)
   */
  const getPhotos = function (photosNumber, photosSrcs) {
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
  window.data = {
    NUMBER_PHOTOS,
    getPhotosSrcs,
    getPhotos
  };
})();
