'use strict';

const {isEnterEvent} = window.util;
const {openBigPicture} = window.preview;

const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

/**
 * Отрисовывает фотографию, используя данные из объекта - фотографии
 * @param {Object} photoData - объект с данными о фотографии
 * @return {Object} - фрагмент кода HTML
 */
const renderPhoto = (photoData) => {
  const photo = pictureTemplate.cloneNode(true);

  photo.querySelector(`.picture__img`).src = photoData.url;
  photo.querySelector(`.picture__comments`).textContent = photoData.comments.length;
  photo.querySelector(`.picture__likes`).textContent = photoData.likes;

  photo.addEventListener(`click`, () => {
    openBigPicture(photoData);
  });
  photo.addEventListener(`keydown`, (evt) => {
    isEnterEvent(evt, openBigPicture.bind(null, photoData));
  });

  return photo;
};

/**
 * Отрисовывает фото на страницу, используя данные из массива объектов - фотографий, удаляет существующие фото в контейнере
 * @param {array} photosData - массива объектов - фотографий
 */
const renderPhotos = (photosData) => {
  const fragment = document.createDocumentFragment();
  photosData.forEach((photoData) => {
    fragment.appendChild(renderPhoto(photoData));
  });

  const picturesContainer = document.querySelector(`.pictures`);
  const existingPhotos = document.querySelectorAll(`.picture`);

  existingPhotos.forEach((existingPhoto) => {
    picturesContainer.removeChild(existingPhoto);
  });

  picturesContainer.appendChild(fragment);
};

window.gallery = {
  renderPhotos
};
