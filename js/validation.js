'use strict';

(function () {
  const HASHTAG_MAXLENGTH = 20;
  const HASHTAGS_MAXNUMBER = 5;

  const re = /^#[а-яА-Я\w]+$/;

  const textHashtagsInput = document.querySelector(`.text__hashtags`);
  /**
   * Выводит сообщение о превышении допустимого количества хэштегов
   * @param {Array} array - массив
   */
  const checkArrayLength = function (array) {
    if (array.length > HASHTAGS_MAXNUMBER) {
      textHashtagsInput.setCustomValidity(`Слишком много хэштегов!`);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };

  /**
   * Выводит сообщение при наличии дублирующихся хэштегов
   * @param {Array} array - массив
   */
  const checkDuplicates = function (array) {
    let yesDuplicates = false;
    const arrayUppercase = array.map(function (element) {
      return element.toUpperCase();
    });
    const arrayOfUniques = new Set(arrayUppercase);
    if (arrayOfUniques.size !== array.length) {
      yesDuplicates = true;
    }
    if (yesDuplicates) {
      textHashtagsInput.setCustomValidity(`Есть повторяющиеся хэштеги!`);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };

  /**
   * Выводит сообщение в случае использования хотя бы в одном хэштеге недопустимых символов
   * @param {Array} array - массив хэштегов
   */
  const checkHashtagsValidity = function (array) {
    const invalid = array.some((elem) => !re.test(elem));
    if (invalid) {
      textHashtagsInput.setCustomValidity(`Хэштег должен состоять только из букв, чисел и нижнего подчеркивания!`);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };

  /**
   * Выводит сообщение в случае превышения длины хотя бы одного хэштега
   * @param {Array} array - массив хэштегов
   */
  const checkHashtagsLength = function (array) {
    const tooLong = array.some((elem) => elem.length > HASHTAG_MAXLENGTH);
    if (tooLong) {
      textHashtagsInput.setCustomValidity(`Максимальная длина хэштега - ` + HASHTAG_MAXLENGTH);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };
  window.validation = {
    checkArrayLength,
    checkDuplicates,
    checkHashtagsValidity,
    checkHashtagsLength
  };
})();
