'use strict';

(function () {
  const {shuffleArray} = window.util;
  const {
    NUMBER_PHOTOS,
    getPhotosSrcs,
    getPhotos
  } = window.data;

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

  const photosSrcs = getPhotosSrcs(NUMBER_PHOTOS);
  shuffleArray(photosSrcs);

  const photos = getPhotos(NUMBER_PHOTOS, photosSrcs);

  const fragment = document.createDocumentFragment();
  photos.forEach(function (photo) {
    fragment.appendChild(renderPhoto(photo));
  });

  const picturesContainer = document.querySelector(`.pictures`);
  picturesContainer.appendChild(fragment);
})();
