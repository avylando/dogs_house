(function () {
  let cbButton = document.querySelector('.hello__button');
  let cbButtonDouble = document.querySelector('.contacts__button');
  let callback = document.querySelector('.callback');
  let cbCloseButton = callback.querySelector('.callback__close');
  // let fbActivateButton = document.querySelector('.contacts__button');
  // let feedback = document.querySelector('.feedback');
  // let fbCloseButton = feedback.querySelector('.feedback__close');

  let sendSuccess = document.querySelector('.send-success');
  let ssCloseButton = sendSuccess.querySelector('.send-success__button');

  let blackout = document.querySelector('.blackout');

  // Blackout handler modal close

  let blackoutClickHandler = function () {
    if (callback.classList.contains('modal--show')) {
      callback.classList.remove('modal--show');
      callback.classList.add('modal--close');
      blackout.classList.remove('blackout--show');
    }
  }

  let modalShowClickHandler = function (modal, closeButton, handlerEsc, handlerEnter) {
    if (modal.classList.contains('modal--close')) {
      modal.classList.remove('modal--close');
      modal.classList.add('modal--show');
      blackout.classList.add('blackout--show');
    } else {
      modal.classList.add('modal--show');
      blackout.classList.add('blackout--show');
    }

    window.addEventListener('keydown', handlerEsc);
    closeButton.addEventListener('keydown', handlerEnter);
    blackout.addEventListener('click', blackoutClickHandler);
  }

  let modalCloseClickHandler = function (modal, closeButton, handlerEsc, handlerEnter) {
    if (modal.classList.contains('modal--show')) {
      modal.classList.remove('modal--show');
      modal.classList.add('modal--close');
      blackout.classList.remove('blackout--show');

      window.removeEventListener('keydown', handlerEsc);
      closeButton.removeEventListener('keydown', handlerEnter);
      blackout.removeEventListener('click', blackoutClickHandler);
    }
  }

  let callbackShowClickHandler = function () {
    modalShowClickHandler(callback, cbCloseButton, callbackCloseEscHandler, callbackCloseEnterHandler);
  }

  let callbackCloseClickHandler = function () {
    modalCloseClickHandler(callback, cbCloseButton, callbackCloseEscHandler, callbackCloseEnterHandler);
  }

  let callbackCloseEscHandler = function (evt) {
    if (evt.keyCode === 27) {
      callbackCloseClickHandler();
    }
  }

  let callbackCloseEnterHandler = function (evt) {
    if (evt.keyCode === 13) {
      callbackCloseClickHandler();
    }
  }

  cbButton.addEventListener('click', callbackShowClickHandler, true);
  cbButtonDouble.addEventListener('click', callbackShowClickHandler, true);
  cbCloseButton.addEventListener('click', callbackCloseClickHandler);

  let successCloseClickHandler = function () {
    modalCloseClickHandler(sendSuccess, ssCloseButton, successCloseEscHandler, successCloseEnterHandler);
  }

  let successCloseEscHandler = function (evt) {
    if (evt.keyCode === 27) {
      successCloseClickHandler();
    }
  }

  let successCloseEnterHandler = function (evt) {
    if (evt.keyCode === 13) {
      successCloseClickHandler();
    }
  }

  ssCloseButton.addEventListener('click', successCloseClickHandler);

})();
