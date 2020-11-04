'use strict';

(function () {
  const {isEscEvent} = window.util;

  const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
  const uploadFileInput = document.querySelector(`#upload-file`);
  const effectsPreviews = document.querySelectorAll(`.effects__preview`);
  const body = document.querySelector(`body`);
  const imgUploadForm = document.querySelector(`.img-upload__overlay`);
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
    isEscEvent(evt, closeUploadForm);
  };

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

  window.form = {
    setUploadedPhoto,
    onUploadFormEscPress,
    openUploadForm,
    closeUploadForm
  };
})();
