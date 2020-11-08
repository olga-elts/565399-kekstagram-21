'use strict';

(function () {

  const isEventAtTarget = (evt, action) => {
    if (evt.eventPhase === 2) {
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
  const getCoords = function (elem) {
    const box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };

  window.util = {
    isEventAtTarget,
    isEscEvent,
    isEnterEvent,
    getCoords
  };
})();
