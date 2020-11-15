'use strict';

const {isEscEvent} = window.util;
const {resetEffect, resetScale} = window.editing;

const body = document.querySelector(`body`);
const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
const uploadFileInput = document.querySelector(`#upload-file`);
const effectsPreviews = document.querySelectorAll(`.effects__preview`);
const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
const effectsInputDefault = document.querySelector(`.effects__radio[value=none]`);
const textHashtagsInput = document.querySelector(`.text__hashtags`);
const textDescriptionInput = document.querySelector(`.text__description`);

/**
 * Заменяет дефолтную картинку превью и эффектов на загруженную
 */
const setUploadedPhoto = () => {
  imgUploadPreview.src = URL.createObjectURL(uploadFileInput.files[0]);
  effectsPreviews.forEach((effectsPreview) => {
    effectsPreview.style.backgroundImage = `url("${URL.createObjectURL(uploadFileInput.files[0])}")`;
  });
};

/**
 * Очищает поля ввода в форме, "чекает" дефолтный эффект (`none`)
 */
const cleanInputs = () => {
  uploadFileInput.value = ``;
  textHashtagsInput.value = ``;
  textDescriptionInput.value = ``;
  effectsInputDefault.checked = true;
};

/**
 * Закрывает форму редактирования фото при нажатии кнопки Esc
 * @param {event} evt - событие
 */
const onUploadFormEscPress = (evt) => {
  isEscEvent(evt, closeUploadForm);
};

/**
 * Открывает форму редактирования, добавляет слушитель события keydown
 * @param {event} evt - событие
 */
const openUploadForm = () => {
  imgUploadOverlay.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  setUploadedPhoto();
  document.addEventListener(`keydown`, onUploadFormEscPress);
};

/**
 * Закрывает форму редактирования, сбрасывает эффект, масштаб, очищает поля ввода, удаляет слушитель события keydown
 * @param {event} evt - событие
 */
const closeUploadForm = () => {
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
