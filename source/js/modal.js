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
  }

  let modalCloseClickHandler = function (modal, closeButton, handlerEsc, handlerEnter) {
    if (modal.classList.contains('modal--show')) {
      modal.classList.remove('modal--show');
      modal.classList.add('modal--close');
      blackout.classList.remove('blackout--show');

      window.removeEventListener('keydown', handlerEsc);
      closeButton.removeEventListener('keydown', handlerEnter);
    }
  }


  // let feedbackShowClickHandler = function () {
  //   modalShowClickHandler(feedback, fbCloseButton, feedbackCloseEscHandler, feedbackCloseEnterHandler);
  // }

  // let feedbackCloseClickHandler = function () {
  //   modalCloseClickHandler(feedback, fbCloseButton, feedbackCloseEscHandler, feedbackCloseEnterHandler);
  // }

  // let feedbackCloseEscHandler = function (evt) {
  //   if (evt.keyCode === 27) {
  //     feedbackCloseClickHandler();
  //   }
  // }

  // let feedbackCloseEnterHandler = function (evt) {
  //   if (evt.keyCode === 13) {
  //     feedbackCloseClickHandler();
  //   }
  // }

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

  // fbActivateButton.addEventListener('click', feedbackShowClickHandler, true);
  // fbCloseButton.addEventListener('click', feedbackCloseClickHandler);
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

  // Blackout handler modal close

})();
