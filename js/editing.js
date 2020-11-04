'use strict';

(function () {
  const effectToFilter = {
    chrome: `grayscale`,
    sepia: `sepia`,
    marvin: `invert`,
    phobos: `blur`,
    heat: `brightness`
  };

  const filterMinMax = {
    grayscale: {
      MIN: 0,
      MAX: 1
    },
    sepia: {
      MIN: 0,
      MAX: 1
    },
    invert: {
      MIN: 0,
      MAX: 100,
      UNIT: `%`
    },
    blur: {
      MIN: 0,
      MAX: 3,
      UNIT: `px`
    },
    brightness: {
      MIN: 1,
      MAX: 3
    }
  };

  const defaultSettings = {
    EFFECT: `none`,
    EFFECT_LEVEL: 100,
    FACTOR: 1
  };

  const Scale = {
    STEP: 25,
    MAX: 100,
    MIN: 25
  };

  const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  /**
   * Устанавливает интенсивность эффекта, примененного к фотографии, при перемещении ползунка
   * @param {number} level - интенсивность эффекта
   */
  const setEffectLevel = function (level) {
    const effectApplied = document.querySelector(`.effects__radio:checked`).value;
    const filterApplied = effectToFilter[effectApplied];
    const filterMin = filterMinMax[filterApplied].MIN;
    const filterMax = filterMinMax[filterApplied].MAX;
    let filterUnit = ``;
    if (filterMinMax[filterApplied].UNIT) {
      filterUnit = filterMinMax[filterApplied].UNIT;
    }
    imgUploadPreview.style.filter = filterApplied + `(${filterMin + (filterMax - filterMin) * level + filterUnit})`;
  };

  /**
   * Устанавливает стили ползунка и значение интенсивности эффекта
   * @param {number} factor - коэффициент интенсивности эффекта
   */
  const setPinStyles = function (factor) {
    effectLevelPin.style.left = defaultSettings.EFFECT_LEVEL * factor + `%`;
    effectLevelDepth.style.width = defaultSettings.EFFECT_LEVEL * factor + `%`;
    effectLevelValue.value = defaultSettings.EFFECT_LEVEL * factor;
  };

  /**
   * Cбрасывает фильтр фотографии
   */
  const resetEffect = function () {
    imgUploadPreview.style.filter = ``;
  };

  /**
   * Применяет эффект к фотографии
   * @param {string} effect - название эффекта
   */
  const applyEffect = function (effect) {
    effectLevel.classList.remove(`hidden`);
    imgUploadPreview.className = ``;
    imgUploadPreview.classList.add(`effects__preview--` + effect);
    if (effect === `none`) {
      effectLevel.classList.add(`hidden`);
    }
  };

  const resetScale = function () {
    imgUploadPreview.style.transform = ``;
    scaleControlValue.value = ``;
  };

  const changeScale = function (scaleMin, scaleMax, step) {
    let scale = parseFloat(scaleControlValue.value);
    if (scale < scaleMin - step) {
      scale = scaleMin;
    } else if (scale > scaleMax - step) {
      scale = scaleMax;
    } else {
      scale += step;
    }
    imgUploadPreview.style.transform = `scale(${scale / 100})`;
    scaleControlValue.value = scale + `%`;
  };

  window.editing = {
    defaultSettings,
    Scale,
    setEffectLevel,
    setPinStyles,
    resetEffect,
    applyEffect,
    resetScale,
    changeScale
  };
})();
