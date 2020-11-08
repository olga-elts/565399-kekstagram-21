'use strict';
(function () {
  const {isEscEvent} = window.util;
  const load = {
    METHOD: `GET`,
    URL: `https://21.javascript.pages.academy/kekstagram/data`,
    FAILURE_MESSAGE: `Фото не загрузились: `,
    BUTTON_MESSAGE: `Понятно, попробую снова`
  };
  const upload = {
    METHOD: `POST`,
    URL: `https://21.javascript.pages.academy/kekstagram`,
    FAILURE_MESSAGE: `Фото не загрузилось: `,
    BUTTON_MESSAGE: `Загрузить другой файл`
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
    error: `Ошибка соединения`,
    timeout: `Истекло время ожидания`
  };

  const mainSection = document.querySelector(`main`);
  const errorBlock = document.querySelector(`#error`).content.querySelector(`.error`).cloneNode(true);
  const errorBlockInner = errorBlock.querySelector(`.error__inner`);
  const errorButton = errorBlockInner.querySelector(`.error__button`);
  const successBlock = document.querySelector(`#success`).content.querySelector(`.success`).cloneNode(true);
  const successBlockInner = successBlock.querySelector(`.success__inner`);
  const successButton = successBlockInner.querySelector(`.success__button`);

  const renderBlock = function (block) {
    mainSection.appendChild(block);
    block.classList.add(`hidden`);
    block.style.zIndex = `5`;
  };

  renderBlock(errorBlock);
  renderBlock(successBlock);

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

  const closeSuccessBlock = function (evt) {
    if (evt.type === `click` && evt.target === successBlockInner && evt.target !== successButton) {
      return;
    } else {
      successBlock.classList.add(`hidden`);
      successButton.removeEventListener(`click`, closeSuccessBlock);
      document.removeEventListener(`keydown`, onSuccessBlockEscPress);
      document.removeEventListener(`click`, closeSuccessBlock);
    }
  };

  const onErrorBlockEscPress = function (evt) {
    isEscEvent(evt, closeErrorBlock.bind(null, evt));
  };

  const onSuccessBlockEscPress = function (evt) {
    isEscEvent(evt, closeSuccessBlock.bind(null, evt));
  };

  const showError = function (requestType, message) {
    errorBlock.classList.remove(`hidden`);
    errorBlock.querySelector(`.error__title`).textContent = requestType.FAILURE_MESSAGE + message;
    errorButton.textContent = requestType.BUTTON_MESSAGE;
    errorButton.addEventListener(`click`, closeErrorBlock);
    document.addEventListener(`keydown`, onErrorBlockEscPress);
    document.addEventListener(`click`, closeErrorBlock);
  };

  const showSuccess = function () {
    successBlock.classList.remove(`hidden`);
    successButton.addEventListener(`click`, closeSuccessBlock);
    document.addEventListener(`keydown`, onSuccessBlockEscPress);
    document.addEventListener(`click`, closeSuccessBlock);
  };

  const ifLoadFunction = function (xhr, type, onSuccess) {
    let error;
    if (xhr.status === statusCodes.SUCCESSFUL) {

      if (type === upload) {
        showSuccess();
      }
      onSuccess(xhr.response);
    } else if (statusToMessage[xhr.status]) {
      error = statusToMessage[xhr.status];
    } else {
      error = `Cтатус ответа: ${xhr.status} ` + xhr.statusText;
    }
    if (error) {
      showError(type, error);
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
      ifLoadFunction(xhr, type, onSuccess);
    });

    xhr.addEventListener(`error`, function () {
      showError(type, eventToMessage.error);
    });

    xhr.addEventListener(`timeout`, function () {
      showError(type, eventToMessage.timeout);
    });

    xhr.send(data);
  };

  window.server = {
    load,
    upload,
    sendRequest
  };
})();
