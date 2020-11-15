'use strict';

(() => {
  const {getCoords} = window.util;
  const {renderPhotos} = window.gallery;
  const {Load, Upload, showErrorBlock, showSuccessBlock, sendRequest} = window.server;
  const {showImgFilters, filterPhotos} = window.filter;
  const {
    onUploadFormEscPress,
    openUploadForm,
    closeUploadForm
  } = window.form;
  const {
    DefaultSettings,
    Scale,
    setEffectLevel,
    setPinStyles,
    resetEffect,
    applyEffect,
    changeScale
  } = window.editing;
  const {
    checkArrayLength,
    checkDuplicates,
    checkHashtagsValidity,
    checkHashtagsLength
  } = window.validation;

  const uploadFileInput = document.querySelector(`#upload-file`);
  const form = document.querySelector(`.img-upload__form`);
  const uploadCancelBtn = document.querySelector(`#upload-cancel`);
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const effects = document.querySelector(`.effects`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelLine = effectLevel.querySelector(`.effect-level__line`);
  const imgUploadText = document.querySelector(`.img-upload__text`);
  const textHashtagsInput = document.querySelector(`.text__hashtags`);
  const imgFilters = document.querySelector(`.img-filters`);

  const checkFunctions = [checkDuplicates, checkArrayLength, checkHashtagsLength, checkHashtagsValidity];

  effectLevelPin.addEventListener(`mousedown`, () => {
    const lineXCoord = getCoords(effectLevelLine).left;
    const deltaXMax = effectLevelLine.offsetWidth;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const pinXCoord = moveEvt.clientX;
      const deltaX = pinXCoord - lineXCoord;

      if (deltaX >= 0 && deltaX <= deltaXMax) {
        const effectLevelFactor = (deltaX / deltaXMax).toFixed(2);
        setEffectLevel(effectLevelFactor);
        setPinStyles(effectLevelFactor);
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  effects.addEventListener(`click`, (evt) => {
    const effect = evt.target.value;
    resetEffect();
    setPinStyles(DefaultSettings.FACTOR);
    applyEffect(effect);
  });

  scaleControlSmaller.addEventListener(`click`, () => {
    changeScale(Scale.MIN, Scale.MAX, -Scale.STEP);
  });

  scaleControlBigger.addEventListener(`click`, () => {
    changeScale(Scale.MIN, Scale.MAX, Scale.STEP);
  });

  textHashtagsInput.addEventListener(`input`, () => {
    const hashtags = textHashtagsInput.value.trim().split(` `);
    for (let i = 0; i < checkFunctions.length; i++) {
      checkFunctions[i](hashtags);
      if (textHashtagsInput.validationMessage) {
        textHashtagsInput.style.outline = `1px auto red`;
        break;
      } else {
        textHashtagsInput.style.outline = ``;
      }
    }
  });

  uploadFileInput.addEventListener(`change`, () => {
    openUploadForm();
    resetEffect();
    setPinStyles(DefaultSettings.FACTOR);
    applyEffect(DefaultSettings.EFFECT);
  });

  uploadCancelBtn.addEventListener(`click`, () => {
    closeUploadForm();
  });

  imgUploadText.addEventListener(`focusin`, () => {
    document.removeEventListener(`keydown`, onUploadFormEscPress);
  });

  imgUploadText.addEventListener(`focusout`, () => {
    document.addEventListener(`keydown`, onUploadFormEscPress);
  });

  form.addEventListener(`submit`, (evt) => {
    sendRequest(Upload, showSuccessBlock, showErrorBlock, new FormData(form));
    closeUploadForm();
    evt.preventDefault();
  });

  let loadedPhotos;

  const successHandler = (data) => {
    loadedPhotos = data;
    renderPhotos(loadedPhotos);
    showImgFilters();
  };

  sendRequest(Load, successHandler, showErrorBlock);

  imgFilters.addEventListener(`click`, (evt) => {
    filterPhotos(evt, loadedPhotos);
  });
})();
