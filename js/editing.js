'use strict';

(() => {
  const effectToFilter = {
    chrome: `grayscale`,
    sepia: `sepia`,
    marvin: `invert`,
    phobos: `blur`,
    heat: `brightness`
  };

  const filterMinMax = {
    Grayscale: {
      MIN: 0,
      MAX: 1
    },
    Sepia: {
      MIN: 0,
      MAX: 1
    },
    Invert: {
      MIN: 0,
      MAX: 100,
      UNIT: `%`
    },
    Blur: {
      MIN: 0,
      MAX: 3,
      UNIT: `px`
    },
    Brightness: {
      MIN: 1,
      MAX: 3
    }
  };

  const DefaultSettings = {
    EFFECT: `none`,
    EFFECT_LEVEL: 100,
    FACTOR: 1
  };

  const Scale = {
    STEP: 25,
    MAX: 100,
    MIN: 25,
    UNIT: `%`
  };

  const imgUploadPreview = document.querySelector(`.img-upload__preview img`);
  const effectLevel = document.querySelector(`.effect-level`);
  const effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  const effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);
  const effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);

  /**
   * Приводит ключи объекта filterMinMax к нижнему регистру для удобства последующего использования
   */
  for (let key in filterMinMax) {
    if (key) {
      const filter = key.toLowerCase();
      filterMinMax[filter] = filterMinMax[key];
      delete filterMinMax[key];
    }
  }

  /**
   * Устанавливает интенсивность эффекта, примененного к фотографии, при перемещении ползунка
   * @param {number} level - интенсивность эффекта
   */
  const setEffectLevel = (level) => {
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
  const setPinStyles = (factor) => {
    effectLevelPin.style.left = DefaultSettings.EFFECT_LEVEL * factor + `%`;
    effectLevelDepth.style.width = DefaultSettings.EFFECT_LEVEL * factor + `%`;
    effectLevelValue.value = DefaultSettings.EFFECT_LEVEL * factor;
  };

  /**
   * Cбрасывает фильтр фотографии
   */
  const resetEffect = () => {
    imgUploadPreview.style.filter = ``;
    imgUploadPreview.className = ``;
  };

  /**
   * Применяет эффект к фотографии
   * @param {string} effect - название эффекта
   */
  const applyEffect = (effect) => {
    effectLevel.classList.remove(`hidden`);
    imgUploadPreview.classList.add(`effects__preview--` + effect);
    if (effect === `none`) {
      effectLevel.classList.add(`hidden`);
    }
  };

  /**
   * Сбрасывает масштаб
   */
  const resetScale = () => {
    imgUploadPreview.style.transform = ``;
    scaleControlValue.value = Scale.MAX + Scale.UNIT;
  };

  /**
   * Сбрасывает масштаб
   * @param {number} scaleMin - минимальное значение масштаба
   * @param {number} scaleMax - максимальное значение масштаба
   * @param {number} step - шаг изменения масштаба
   */
  const changeScale = (scaleMin, scaleMax, step) => {
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
    DefaultSettings,
    Scale,
    setEffectLevel,
    setPinStyles,
    resetEffect,
    applyEffect,
    resetScale,
    changeScale
  };
})();
