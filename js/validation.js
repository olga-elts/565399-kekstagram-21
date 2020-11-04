'use strict';

(function () {
  const HASHTAG_MAXLENGTH = 20;
  const HASHTAGS_MAXNUMBER = 5;

  const re = /^#[а-яА-Я\w]+$/;

  const textHashtagsInput = document.querySelector(`.text__hashtags`);
  /**
   * Выводит сообщение о превышении допустимого количества хэштегов
   * @param {Array} tags - массив хэштегов
   */
  const checkArrayLength = function (tags) {
    if (tags.length > HASHTAGS_MAXNUMBER) {
      textHashtagsInput.setCustomValidity(`Слишком много хэштегов!`);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };

  /**
   * Выводит сообщение при наличии дублирующихся хэштегов
   * @param {Array} tags - массив хэштегов
   */
  const checkDuplicates = function (tags) {
    let yesDuplicates = false;
    const tagsUppercase = tags.map(function (tag) {
      return tag.toUpperCase();
    });
    const tagsUnique = new Set(tagsUppercase);
    if (tagsUnique.size !== tags.length) {
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
   * @param {Array} tags - массив хэштегов
   */
  const checkHashtagsValidity = function (tags) {
    const invalid = tags.some((tag) => !re.test(tag));
    if (invalid) {
      textHashtagsInput.setCustomValidity(`Хэштег должен состоять только из букв, чисел и нижнего подчеркивания!`);
    } else {
      textHashtagsInput.setCustomValidity(``);
    }
  };

  /**
   * Выводит сообщение в случае превышения длины хотя бы одного хэштега
   * @param {Array} tags - массив хэштегов
   */
  const checkHashtagsLength = function (tags) {
    const tooLong = tags.some((tag) => tag.length > HASHTAG_MAXLENGTH);
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
