'use strict';
(function () {
  const {isEventAtTarget, isEscEvent} = window.util;
  const load = {
    METHOD: `GET`,
    URL: `https://21.javascript.pages.academy/kekstagram/data`,
    BUTTON: `Понятно, попробую снова`
  };
  const upload = {
    METHOD: `POST`,
    URL: `https://21.javascript.pages.academy/kekstagram`,
    BUTTON: `Загрузить другой файл`
  };
  const xhrDefault = {
    RESPONSE_TYPE: `json`,
    TIMEOUT: 3000
  };
  const STATUS_CODE_SUCCESSFULL = 200;

  const eventToMessage = {
    error: `Ошибка соединения`,
    timeout: `Истекло время ожидания`
  };

  const mainSection = document.querySelector(`main`);
  const errorBlock = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorButton = errorBlock.querySelector(`.error__button`);
  const successBlock = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  const successButton = successBlock.querySelector(`.success__button`);

  const closeErrorBlock = function () {
    errorBlock.remove();
    document.removeEventListener(`keydown`, onErrorBlockEscPress);
    errorBlock.removeEventListener(`click`, onErrorBlockClick);
    errorButton.removeEventListener(`click`, onErrorBlockClick);
  };

  const closeSuccessBlock = function () {
    successBlock.remove();
    document.removeEventListener(`keydown`, onSuccessBlockEscPress);
    successButton.removeEventListener(`click`, onSuccessBlockClick);
    successBlock.removeEventListener(`click`, onSuccessBlockClick);
  };

  const onErrorBlockEscPress = function (evt) {
    isEscEvent(evt, closeErrorBlock);
  };

  const onSuccessBlockEscPress = function (evt) {
    isEscEvent(evt, closeSuccessBlock);
  };

  const onErrorBlockClick = function (evt) {
    isEventAtTarget(evt, closeErrorBlock);
  };

  const onSuccessBlockClick = function (evt) {
    isEventAtTarget(evt, closeSuccessBlock);
  };

  const showErrorBlock = function (requestType, message) {
    mainSection.appendChild(errorBlock);
    errorBlock.querySelector(`.error__title`).textContent = message;
    errorButton.textContent = requestType.BUTTON;
    document.addEventListener(`keydown`, onErrorBlockEscPress);
    errorBlock.addEventListener(`click`, onErrorBlockClick);
    errorButton.addEventListener(`click`, onErrorBlockClick);
  };

  const showSuccessBlock = function () {
    mainSection.appendChild(successBlock);
    successButton.addEventListener(`click`, onSuccessBlockClick);
    document.addEventListener(`keydown`, onSuccessBlockEscPress);
    successBlock.addEventListener(`click`, onSuccessBlockClick);
  };

  const makeXhr = function (method, url) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = xhrDefault.RESPONSE_TYPE;
    xhr.timeout = xhrDefault.TIMEOUT;

    xhr.open(method, url);

    return xhr;
  };

  const sendRequest = function (type, onSuccess, onError, data) {
    const xhr = makeXhr(type.METHOD, type.URL);

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_CODE_SUCCESSFULL) {
        onSuccess(xhr.response);
      } else {
        const error = `Ошибка ${xhr.status} ${xhr.statusText}`;
        onError(type, error);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(type, eventToMessage.error);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(type, eventToMessage.timeout);
    });

    xhr.send(data);
  };

  window.server = {
    load,
    upload,
    showErrorBlock,
    showSuccessBlock,
    sendRequest
  };
})();
