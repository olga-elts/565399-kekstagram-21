'use strict';

(function () {
  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  /**
   * "Подбрасывает монетку" - возвращает случайное булевое значение
   * @return {boolean} - случайное булевое значение
   */
  const getRandomBoolean = function () {
    return Math.random() >= 0.5;
  };

  /**
   * Перемешивает массив
   * @param {Array} array -  случайный массив
   */
  const shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[j], array[i]] = [array[i], array[j]];
    }
  };

  /**
   * Возвращает рандомное целое число между задаваемыми min и max
   * @param {number} min - минимальное число
   * @param {number} max - максимальное число
   * @return {number} - случайное число
   */
  const getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * Выбирает рандомный элемент из массива
   * @param {Array} array -  случайный массив
   * @return {*} - случайный элемент массива
   */
  const getRandomElement = function (array) {
    return array[Math.floor(Math.random() * Math.floor(array.length))];
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

  window.util = {
    isEscEvent,
    getRandomBoolean,
    shuffleArray,
    getRandomNumber,
    getRandomElement,
    getCoords
  };
})();
