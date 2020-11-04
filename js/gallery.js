'use strict';

(function () {
  const {photos} = window.data;
  const {isEnterEvent} = window.util;
  const {renderPreview, openPreview} = window.preview;

  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  /**
   * Отрисовывает фотографии, используя данные из массива объектов - фотографий
   * @param {Object} photoData - объект с данными о фотографии
   * @return {Object} - фрагмент кода HTML
   */
  const renderPhoto = function (photoData) {
    const photo = pictureTemplate.cloneNode(true);

    photo.querySelector(`.picture__img`).src = photoData.url;
    photo.querySelector(`.picture__comments`).textContent = photoData.comments.length;
    photo.querySelector(`.picture__likes`).textContent = photoData.likes;

    photo.addEventListener(`click`, function () {
      renderPreview(photoData);
      openPreview();
    });
    photo.addEventListener(`keydown`, function (evt) {
      isEnterEvent(evt, renderPreview, photoData);
      isEnterEvent(evt, openPreview);
    });

    return photo;
  };

  const renderPhotos = function (photosData) {
    const fragment = document.createDocumentFragment();
    photosData.forEach(function (photoData) {
      fragment.appendChild(renderPhoto(photoData));
    });

    const picturesContainer = document.querySelector(`.pictures`);
    picturesContainer.appendChild(fragment);
  };

  renderPhotos(photos);
})();
