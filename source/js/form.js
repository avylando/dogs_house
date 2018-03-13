'use strict';

(function () {

  let form = document.querySelector('.callback__form');
  let inputName = form.querySelector('#username');
  let inputPhone = form.querySelector('#phone');
  let callbackWindow = document.querySelector('.callback');
  let blackout = document.querySelector('.blackout');

  let successWindow = function () {
    let modalSuccess = document.querySelector('.send-success');
    modalSuccess.classList.add('modal--show');
  }

  let errorWindow = function (errorMessage) {
    console.log(errorMessage);
  }

  // let checkValidity = function () {
  //   if (inputName.validity.valueMissing) {
  //     inputName.setCustomValidity('Пожалуйста, заполните имя');
  //   } else {
  //     inputName.setCustomValidity('');
  //   }

  //   if (!inputPhone.validity.valid) {
  //     inputPhone.setCustomValidity('Введите номер телефона');
  //   } else {
  //     inputPhone.setCustomValidity('');
  //   }
  // }

  // form.addEventListener('invalid', function (evt) {
  //   checkValidity();
  // }, true);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    // checkValidity();

    let formData = new FormData(form);
    window.sendRequest(formData, successWindow, errorWindow);
    callbackWindow.classList.remove('modal--show');
    callbackWindow.classList.add('modal--close');
    blackout.classList.remove('blackout--show');
  })

  // let checkAgree = function () {
  //   let submit = document.querySelector('.feedback__button');
  //   let agreeCheck = document.querySelector('.feedback__agree-input');
  //   agreeCheck.addEventListener('click', function () {
  //     agreeCheck.checked ? submit.disabled = '' : submit.disabled = 'disabled';
  //   })
  // }

  // checkAgree();

})();
