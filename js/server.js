'use strict';
(function () {
  const {isEscEvent} = window.util;
  const load = {
    METHOD: `GET`,
    URL: `https://21.javascript.pages.academy/kekstagram/data`
  };
  const upload = {
    METHOD: `POST`,
    URL: `https://21.javascript.pages.academy/kekstagram`
  };
  const xhrDefault = {
    RESPONSE_TYPE: `json`,
    TIMEOUT: 3000
  };
  const statusCodes = {
    SUCCESSFUL: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  const statusToMessage = {
    400: `Неверный запрос`,
    401: `Пользователь не авторизован`,
    404: `Ничего не найдено`
  };

  const eventToMessage = {
    error: `Произошла ошибка соединения`,
    timeout: `Запрос не успел выполниться`
  };

  const mainSection = document.querySelector(`main`);
  const errorBlock = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorBlockInner = errorBlock.querySelector(`.error__inner`);
  const errorButton = errorBlockInner.querySelector(`.error__button`);

  const renderErrorBlock = function () {
    mainSection.appendChild(errorBlock);
    errorBlock.classList.add(`hidden`);
    errorBlock.style.zIndex = `5`;
  };

  renderErrorBlock();

  const closeErrorBlock = function (evt) {
    if (evt.type === `click` && evt.target === errorBlockInner && evt.target !== errorButton) {
      return;
    } else {
      errorBlock.classList.add(`hidden`);
      errorButton.removeEventListener(`click`, closeErrorBlock);
      document.removeEventListener(`keydown`, onErrorBlockEscPress);
      document.removeEventListener(`click`, closeErrorBlock);
    }
  };

  const onErrorBlockEscPress = function (evt) {
    isEscEvent(evt, closeErrorBlock.bind(null, evt));
  };

  const onError = function (message) {
    errorBlock.classList.remove(`hidden`);
    errorBlock.querySelector(`.error__title`).textContent = message;
    errorButton.addEventListener(`click`, closeErrorBlock);
    document.addEventListener(`keydown`, onErrorBlockEscPress);
    document.addEventListener(`click`, closeErrorBlock);
  };

  const ifLoadFunction = function (xhr, onSuccess) {
    let error;
    if (xhr.status === statusCodes.SUCCESSFUL) {
      onSuccess(xhr.response);
    } else if (statusToMessage[xhr.status]) {
      error = statusToMessage[xhr.status];
    } else {
      error = `Cтатус ответа: ${xhr.status} ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  };

  const makeXhr = function (method, url) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = xhrDefault.RESPONSE_TYPE;
    xhr.timeout = xhrDefault.TIMEOUT;

    xhr.open(method, url);

    return xhr;
  };

  const sendRequest = function (type, onSuccess, data) {
    const xhr = makeXhr(type.METHOD, type.URL);

    xhr.addEventListener(`load`, function () {
      ifLoadFunction(xhr, onSuccess, onError);
    });

    xhr.addEventListener(`error`, function () {
      onError(eventToMessage.error);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(eventToMessage.timeout);
    });

    xhr.send(data);
  };

  window.server = {
    load,
    upload,
    sendRequest
  };
})();
