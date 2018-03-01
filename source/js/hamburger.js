'use strict';

(function () {

  var burger = document.querySelector('.hamburger');
  var menu = document.querySelector('.page-header__nav');

  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('page-header__nav--show');
  })
})();
