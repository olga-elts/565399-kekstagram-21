'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const isEventAtTarget = function (evt, action) {
    if (evt.eventPhase === 2) {
      action();
    }
  };

  const isEscEvent = function (evt, action) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  const isEnterEvent = function (evt, action) {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action();
    }
  };

  /**
   * Возвращает координаты элемента относительно документа
   * @param {Object} elem - DOM-элемент
   * @return {Object} - объект с координатами элемента по осям Y и X
   */
  const getCoords = function (elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  /**
   * Перемешивает массив
   * @param {Array} array -  случайный массив
   * @return {Array} - перемешанный массив
   */
  const getshuffledArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[j], array[i]] = [array[i], array[j]];
    }
    return array;
  };

  window.util = {
    debounce,
    isEventAtTarget,
    isEscEvent,
    isEnterEvent,
    getCoords,
    getshuffledArray
  };
})();
