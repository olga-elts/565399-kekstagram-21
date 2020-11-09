'use strict';

(function () {
  const {isEscEvent} = window.util;

  const DEFAULT_COMMENTS_NUMBER = 5;

  const body = document.querySelector(`body`);
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureCancelBtn = document.querySelector(`.big-picture__cancel`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const socialCommentsList = document.querySelector(`.social__comments`);
  const socialCommentTemplate = socialCommentsList.querySelector(`.social__comment`);

  /**
   * Отрисовывает превью, заполняет данные по кол-ву лайков и комментариям
   * @param {object} previewData - данные фотографии для превью
   */
  const renderPreview = function (previewData) {
    bigPicture.querySelector(`.big-picture__img img`).src = previewData.url;
    bigPicture.querySelector(`.comments-count`).textContent = previewData.comments.length;
    bigPicture.querySelector(`.social__caption`).textContent = previewData.description;
    bigPicture.querySelector(`.likes-count`).textContent = previewData.likes;
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

  const renderComment = function (commentData) {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector(`.social__picture`).src = commentData.avatar;
    socialComment.querySelector(`.social__picture`).alt = commentData.name;
    socialComment.querySelector(`.social__text`).textContent = commentData.message;

    return socialComment;
  };

  const renderComments = function (commentsData) {
    const existingComments = socialCommentsList.querySelectorAll(`.social__comment`);
    existingComments.forEach(function (existingComment) {
      socialCommentsList.removeChild(existingComment);
    });

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < commentsData.length; i++) {
      const socialComment = renderComment(commentsData[i]);
      fragment.appendChild(socialComment);
      if (i >= DEFAULT_COMMENTS_NUMBER) {
        socialComment.classList.add(`hidden`);
      }
      if (commentsData.length <= DEFAULT_COMMENTS_NUMBER) {
        commentsLoader.classList.add(`hidden`);
      } else {
        commentsLoader.classList.remove(`hidden`);
      }
    }
    socialCommentsList.appendChild(fragment);
  };

  commentsLoader.addEventListener(`click`, function () {
    showMoreComments();
  });

  const showMoreComments = function () {
    const socialComments = socialCommentsList.querySelectorAll(`.social__comment`);
    const commentsNumber = socialComments.length;
    const commentsHiddenNumber = socialCommentsList.querySelectorAll(`.hidden`).length;
    const commentsShownNumber = commentsNumber - commentsHiddenNumber;
    for (let i = commentsShownNumber; i < Math.min(commentsNumber, commentsShownNumber + DEFAULT_COMMENTS_NUMBER); i++) {
      socialComments[i].classList.remove(`hidden`);
    }
    if (commentsNumber < commentsShownNumber + DEFAULT_COMMENTS_NUMBER) {
      commentsLoader.classList.add(`hidden`);
    }
  };

  const openBigPicture = function (previewData) {
    renderComments(previewData.comments);
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
