'use strict';

const DEBOUNCE_INTERVAL = 500;
const EVENT_AT_TARGET_PHASE = 2;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

const isEventAtTarget = (evt, action) => {
  if (evt.eventPhase === EVENT_AT_TARGET_PHASE) {
    action();
  }
};

const isEscEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

const isEnterEvent = (evt, action) => {
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
const getCoords = (elem) => {
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
const getShuffledArray = (array) => {
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
  getShuffledArray
};
