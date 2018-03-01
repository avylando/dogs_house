'use strict';

(function () {

  const ServerStatus = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502
  }

  window.sendRequest = function (data, sendSuccess, sendError) {
    const URL = '/phpmailer/mail.php';
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ServerStatus.OK: sendSuccess();
          break;

        case ServerStatus.BAD_REQUEST: sendError('Ошибка в запроса. Проверьте введеные данные и повторите еще раз');
        break;

        case ServerStatus.INTERNAL_SERVER_ERROR: sendError('Internal Server Error');
        break;

        default: sendError('Unknown error');
      }
    })

    xhr.addEventListener('error', function () {
      sendError('Ошибка соединения с сервером');
    })

    xhr.addEventListener('timeout', function () {
      sendError('Истек таймаут соединения с сервером');
    })

    xhr.open('POST', URL);
    xhr.send(data);
  }

})();
