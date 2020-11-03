'use strict';

(function () {
  const {photos} = window.data;
  const {isEscEvent, isEnterEvent} = window.util;

  const body = document.querySelector(`body`);
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancelBtn = document.querySelector(`.big-picture__cancel`);

  /**
   * Отрисовывает превью, заполняет данные по кол-ву лайков и комментариям
   */
  const renderPreview = function () {
    const previewPhoto = photos.find((photo) => photo.url === document.activeElement.querySelector(`img`).getAttribute(`src`));
    bigPicture.querySelector(`.big-picture__img img`).src = previewPhoto.url;
    bigPicture.querySelector(`.comments-count`).textContent = previewPhoto.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = previewPhoto.description;
    bigPicture.querySelector(`.likes-count`).textContent = previewPhoto.likes;
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);

    const commentsLoader = bigPicture.querySelector(`.comments-loader`);
    commentsLoader.classList.add(`hidden`);

    const socialComments = bigPicture.querySelectorAll(`.social__comment`);
    for (let i = 0; i < Math.min(socialComments.length, previewPhoto.comments.length); i++) {
      socialComments[i].querySelector(`.social__picture`).src = previewPhoto.comments[i].avatar;
      socialComments[i].querySelector(`.social__picture`).alt = previewPhoto.comments[i].name;
      socialComments[i].querySelector(`.social__text`).textContent = previewPhoto.comments[i].message;
    }
  };

  /**
   * Открывает превью, добавляет слушитель события keydown и слушатель клика на кнопку закрытия
   * @param {event} evt - событие
   */
  const openPreview = function () {
    renderPreview();
    bigPicture.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onBigPictureEscPress);
    bigPictureCancelBtn.addEventListener(`click`, closePreview);
  };

  /**
   * Закрывает превью, удаляет слушитель события keydown и слушатель клика на кнопку закрытия
   * @param {event} evt - событие
   */
  const closePreview = function () {
    bigPicture.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onBigPictureEscPress);
    bigPictureCancelBtn.removeEventListener(`click`, closePreview);
  };

  /**
   * Закрывает превью при нажатии кнопки Esc
   * @param {event} evt - событие
   */
  const onBigPictureEscPress = function (evt) {
    isEscEvent(evt, closePreview);
  };

  /**
   * Открывает превью при нажатии кнопки Enter
   * @param {event} evt - событие
   */
  const onPictureEnterPress = function (evt) {
    isEnterEvent(evt, openPreview);
  };

  /**
   * Открывает превью при клике мыши
   * @param {event} evt - событие
   */
  const onPictureClick = function () {
    openPreview();
  };

  window.preview = {
    onPictureClick,
    onPictureEnterPress
  };
})();
