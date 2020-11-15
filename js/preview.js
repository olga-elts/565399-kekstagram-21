'use strict';

const {isEscEvent} = window.util;

const DEFAULT_COMMENTS_NUMBER = 5;
const re = /^\d+/;

const body = document.querySelector(`body`);
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureCancelBtn = bigPicture.querySelector(`.big-picture__cancel`);
const commentsLoader = bigPicture.querySelector(`.comments-loader`);
const socialCommentsList = bigPicture.querySelector(`.social__comments`);
const socialCommentTemplate = socialCommentsList.querySelector(`.social__comment`);

/**
 * Отрисовывает превью, заполняет данные по кол-ву лайков и комментариям
 * @param {object} previewData - данные фотографии для превью
 */
const renderPreview = (previewData) => {
  bigPicture.querySelector(`.big-picture__img img`).src = previewData.url;
  bigPicture.querySelector(`.comments-count`).textContent = previewData.comments.length;
  bigPicture.querySelector(`.social__caption`).textContent = previewData.description;
  bigPicture.querySelector(`.likes-count`).textContent = previewData.likes;
};

/**
 * Открывает превью, добавляет слушитель события keydown и слушатель клика на кнопку закрытия
 * @param {event} evt - событие
 */
const openPreview = () => {
  bigPicture.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  document.addEventListener(`keydown`, onBigPictureEscPress);
  bigPictureCancelBtn.addEventListener(`click`, closePreview);
};

/**
 * Отрисовывает комментарий, используя данные из объекта - комментария
 * @param {object} commentData - объект с данными о комментарии
 * @return {object} фрагмент кода HTML
 */
const renderComment = (commentData) => {
  const socialComment = socialCommentTemplate.cloneNode(true);
  socialComment.querySelector(`.social__picture`).src = commentData.avatar;
  socialComment.querySelector(`.social__picture`).alt = commentData.name;
  socialComment.querySelector(`.social__text`).textContent = commentData.message;

  return socialComment;
};

/**
 * Отрисовывает комментарии на страницу, используя данные из массива объектов - комментариев, удаляет существующие комментарии в контейнере
 * @param {array} commentsData - массива объектов - комментариев
 */
const renderComments = (commentsData) => {
  const existingComments = socialCommentsList.querySelectorAll(`.social__comment`);
  existingComments.forEach((existingComment) => {
    socialCommentsList.removeChild(existingComment);
  });

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsData.length; i++) {
    const socialComment = renderComment(commentsData[i]);
    fragment.appendChild(socialComment);
    socialComment.classList.add(`hidden`);
  }
  socialCommentsList.appendChild(fragment);
  showComments();
};

commentsLoader.addEventListener(`click`, () => {
  showComments();
});

/**
 * Показывает комментарии
 */
const showComments = () => {
  const comments = socialCommentsList.querySelectorAll(`.social__comment`);
  const commentsShown = bigPicture.querySelector(`.social__comment-count`);
  const numberOfComments = comments.length;
  const numberOfHidden = socialCommentsList.querySelectorAll(`.hidden`).length;
  const numberOfShown = numberOfComments - numberOfHidden;
  for (let i = numberOfShown; i < Math.min(numberOfComments, numberOfShown + DEFAULT_COMMENTS_NUMBER); i++) {
    comments[i].classList.remove(`hidden`);
    commentsShown.innerHTML = commentsShown.innerHTML.replace(commentsShown.innerHTML.match(re), i + 1);
  }
  if (numberOfComments <= numberOfShown + DEFAULT_COMMENTS_NUMBER) {
    commentsLoader.classList.add(`hidden`);
  } else {
    commentsLoader.classList.remove(`hidden`);
  }
};

/**
 * Показывает фото в полноэкранном режиме (отрисовка комментариев, фото, открытие превью)
 * @param {object} previewData - объекта с данными о фото
 */
const openBigPicture = (previewData) => {
  renderComments(previewData.comments);
  renderPreview(previewData);
  openPreview();
};

/**
 * Закрывает превью, удаляет слушитель события keydown и слушатель клика на кнопку закрытия
 * @param {event} evt - событие
 */
const closePreview = () => {
  bigPicture.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onBigPictureEscPress);
  bigPictureCancelBtn.removeEventListener(`click`, closePreview);
};

/**
 * Закрывает превью при нажатии кнопки Esc
 * @param {event} evt - событие
 */
const onBigPictureEscPress = (evt) => {
  isEscEvent(evt, closePreview);
};

window.preview = {
  openBigPicture
};
