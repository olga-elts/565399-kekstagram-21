'use strict';

(() => {
  const {isEventAtTarget, isEscEvent} = window.util;

  const STATUS_CODE_SUCCESS_FULL = 200;

  const Load = {
    METHOD: `GET`,
    URL: `https://21.javascript.pages.academy/kekstagram/data`,
    BUTTON: `Понятно, попробую снова`
  };
  const Upload = {
    METHOD: `POST`,
    URL: `https://21.javascript.pages.academy/kekstagram`,
    BUTTON: `Загрузить другой файл`
  };
  const XhrDefault = {
    RESPONSE_TYPE: `json`,
    TIMEOUT: 3000
  };

  const eventToMessage = {
    error: `Ошибка соединения`,
    timeout: `Истекло время ожидания`
  };

  const mainSection = document.querySelector(`main`);
  const errorBlock = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorButton = errorBlock.querySelector(`.error__button`);
  const successBlock = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  const successButton = successBlock.querySelector(`.success__button`);

  const closeErrorBlock = () => {
    errorBlock.remove();
    document.removeEventListener(`keydown`, onErrorBlockEscPress);
    errorBlock.removeEventListener(`click`, onErrorBlockClick);
    errorButton.removeEventListener(`click`, onErrorBlockClick);
  };

  const closeSuccessBlock = () => {
    successBlock.remove();
    document.removeEventListener(`keydown`, onSuccessBlockEscPress);
    successButton.removeEventListener(`click`, onSuccessBlockClick);
    successBlock.removeEventListener(`click`, onSuccessBlockClick);
  };

  const onErrorBlockEscPress = (evt) => {
    isEscEvent(evt, closeErrorBlock);
  };

  const onSuccessBlockEscPress = (evt) => {
    isEscEvent(evt, closeSuccessBlock);
  };

  const onErrorBlockClick = (evt) => {
    isEventAtTarget(evt, closeErrorBlock);
  };

  const onSuccessBlockClick = (evt) => {
    isEventAtTarget(evt, closeSuccessBlock);
  };

  const showErrorBlock = (requestType, message) => {
    mainSection.appendChild(errorBlock);
    errorBlock.querySelector(`.error__title`).textContent = message;
    errorButton.textContent = requestType.BUTTON;
    document.addEventListener(`keydown`, onErrorBlockEscPress);
    errorBlock.addEventListener(`click`, onErrorBlockClick);
    errorButton.addEventListener(`click`, onErrorBlockClick);
  };

  const showSuccessBlock = () => {
    mainSection.appendChild(successBlock);
    successButton.addEventListener(`click`, onSuccessBlockClick);
    document.addEventListener(`keydown`, onSuccessBlockEscPress);
    successBlock.addEventListener(`click`, onSuccessBlockClick);
  };

  const makeXhr = (method, url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = XhrDefault.RESPONSE_TYPE;
    xhr.timeout = XhrDefault.TIMEOUT;

    xhr.open(method, url);

    return xhr;
  };

  const sendRequest = (type, onSuccess, onError, data) => {
    const xhr = makeXhr(type.METHOD, type.URL);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE_SUCCESS_FULL) {
        onSuccess(xhr.response);
      } else {
        const error = `Ошибка ${xhr.status} ${xhr.statusText}`;
        onError(type, error);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(type, eventToMessage.error);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(type, eventToMessage.timeout);
    });

    xhr.send(data);
  };

  window.server = {
    Load,
    Upload,
    showErrorBlock,
    showSuccessBlock,
    sendRequest
  };
})();
