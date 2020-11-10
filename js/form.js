'use strict';

(function () {
  const {isEscEvent} = window.util;
  const {resetEffect, resetScale} = window.editing;

  const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const effectsPreviews = document.querySelectorAll(`.effects__preview`);
  const body = document.querySelector(`body`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const effectsInputDefault = document.querySelector(`.effects__radio[value=none]`);
  const textHashtagsInput = document.querySelector(`.text__hashtags`);
  const textDescriptionInput = document.querySelector(`.text__description`);
  /**
   * Заменяет дефолтную картинку превью и эффектов на загруженную
   */
  const setUploadedPhoto = function () {
    imgUploadPreview.src = URL.createObjectURL(uploadFileInput.files[0]);
    effectsPreviews.forEach(function (effectsPreview) {
      effectsPreview.style.backgroundImage = `url("${URL.createObjectURL(uploadFileInput.files[0])}")`;
    });
  };

  const cleanInputs = function () {
    uploadFileInput.value = ``;
    textHashtagsInput.value = ``;
    textDescriptionInput.value = ``;
    effectsInputDefault.checked = true;
  };

  /**
   * Закрывает форму редактирования фото при нажатии кнопки Esc
   * @param {event} evt - событие
   */
  const onUploadFormEscPress = function (evt) {
    isEscEvent(evt, closeUploadForm);
  };

  /**
   * Открывает форму редактирования, добавляет слушитель события keydown
   * @param {event} evt - событие
   */
  const openUploadForm = function () {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    setUploadedPhoto();
    document.addEventListener(`keydown`, onUploadFormEscPress);
  };

  /**
   * Закрывает форму редактирования, удаляет слушитель события keydown
   * @param {event} evt - событие
   */
  const closeUploadForm = function () {
    resetEffect();
    resetScale();
    cleanInputs();
    imgUploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onUploadFormEscPress);
  };

  window.form = {
    setUploadedPhoto,
    onUploadFormEscPress,
    openUploadForm,
    closeUploadForm
  };
})();
