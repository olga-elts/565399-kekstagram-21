'use strict';

(function () {
  const {isEscEvent} = window.util;

  const body = document.querySelector(`body`);
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancelBtn = document.querySelector(`.big-picture__cancel`);

  /**
   * Отрисовывает превью, заполняет данные по кол-ву лайков и комментариям
   * @param {object} previewData - данные фотографии для превью
   */
  const renderPreview = function (previewData) {
    bigPicture.querySelector(`.big-picture__img img`).src = previewData.url;
    bigPicture.querySelector(`.comments-count`).textContent = previewData.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = previewData.description;
    bigPicture.querySelector(`.likes-count`).textContent = previewData.likes;
    bigPicture.querySelector(`.social__comment-count`).classList.add(`hidden`);

    const commentsLoader = bigPicture.querySelector(`.comments-loader`);
    commentsLoader.classList.add(`hidden`);

    const socialComments = bigPicture.querySelectorAll(`.social__comment`);
    for (let i = 0; i < Math.min(socialComments.length, previewData.comments.length); i++) {
      socialComments[i].querySelector(`.social__picture`).src = previewData.comments[i].avatar;
      socialComments[i].querySelector(`.social__picture`).alt = previewData.comments[i].name;
      socialComments[i].querySelector(`.social__text`).textContent = previewData.comments[i].message;
    }
  };

  /**
   * Открывает превью, добавляет слушитель события keydown и слушатель клика на кнопку закрытия
   * @param {event} evt - событие
   */
  const openPreview = function () {
    bigPicture.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    document.addEventListener(`keydown`, onBigPictureEscPress);
    bigPictureCancelBtn.addEventListener(`click`, closePreview);
  };

  const openBigPicture = function (previewData) {
    renderPreview(previewData);
    openPreview();
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

  window.preview = {
    openBigPicture
  };
})();
