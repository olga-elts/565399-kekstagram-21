'use strict';

const {getCoords} = window.util;
const {
  onUploadFormEscPress,
  openUploadForm,
  closeUploadForm
} = window.form;
const {
  defaultSettings,
  Scale,
  setEffectLevel,
  setPinStyles,
  resetEffect,
  applyEffect,
  resetScale,
  changeScale
} = window.editing;
const {
  checkArrayLength,
  checkDuplicates,
  checkHashtagsValidity,
  checkHashtagsLength
} = window.validation;

// Перемещение ползунка
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);

effectLevelPin.addEventListener(`mousedown`, function () {
  const lineXCoord = getCoords(effectLevelLine).left;
  const deltaXMax = effectLevelLine.offsetWidth;

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const pinXCoord = moveEvt.clientX;
    const deltaX = pinXCoord - lineXCoord;

    if (deltaX >= 0 && deltaX <= deltaXMax) {
      const effectLevelFactor = (deltaX / deltaXMax).toFixed(2);
      setEffectLevel(effectLevelFactor);
      setPinStyles(effectLevelFactor);
    }
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

// module4-task1 Наложение фильтра на изображение

const effects = document.querySelector(`.effects`);

effects.addEventListener(`click`, function (evt) {
  const effect = evt.target.value;
  resetEffect();
  setPinStyles(defaultSettings.FACTOR);
  applyEffect(effect);
});

// module4-task1 Изменение масштаба preview фотографии

const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);

scaleControlSmaller.addEventListener(`click`, function () {
  changeScale(Scale.MIN, Scale.MAX, -Scale.STEP);
});

scaleControlBigger.addEventListener(`click`, function () {
  changeScale(Scale.MIN, Scale.MAX, Scale.STEP);
});

// module4-task1 Валидация хештегов

const textHashtagsInput = document.querySelector(`.text__hashtags`);

const checkFunctions = [checkDuplicates, checkArrayLength, checkHashtagsLength, checkHashtagsValidity];

textHashtagsInput.addEventListener(`input`, function () {
  const hashtags = textHashtagsInput.value.trim().split(` `);
  for (let i = 0; i < checkFunctions.length; i++) {
    checkFunctions[i](hashtags);
    if (textHashtagsInput.validationMessage) {
      break;
    }
  }
});

const uploadFileInput = document.querySelector(`#upload-file`);

uploadFileInput.addEventListener(`change`, function () {
  openUploadForm();
  setPinStyles(defaultSettings.FACTOR);
  applyEffect(defaultSettings.EFFECT);
});

const uploadCancelBtn = document.querySelector(`#upload-cancel`);

uploadCancelBtn.addEventListener(`click`, function () {
  closeUploadForm();
  resetScale();
  resetEffect();
});

const imgUploadText = document.querySelector(`.img-upload__text`);

imgUploadText.addEventListener(`focusin`, function () {
  document.removeEventListener(`keydown`, onUploadFormEscPress);
});

imgUploadText.addEventListener(`focusout`, function () {
  document.addEventListener(`keydown`, onUploadFormEscPress);
});
