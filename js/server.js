'use strict';
(function () {
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

  const onError = function (/* message */) {
    // console.error(message);
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
