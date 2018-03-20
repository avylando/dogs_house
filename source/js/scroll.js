'use strict';

(function () {

  const mobileWidth = 320;
  const tabletWidth = 680;
  const desktopWidth = 1090;
  let currentWidth = document.body.clientWidth;

  let header = document.querySelector('.page-header');
  let upArrow = document.querySelector('.up-arrow');
  let advantagesSection = document.querySelector('.advantages__wrapper');
  let sliderSection = document.querySelector('.gallery');
  let reviewsSection = document.querySelector('.reviews');
  let priceSection = document.querySelector('.price');
  let contactsSection = document.querySelector('.contacts');
  let advBtn = document.querySelector('.menu__link--adv');
  let galleryBtn = document.querySelector('.menu__link--gallery');
  let priceBtn = document.querySelector('.menu__link--price');
  let reviewsBtn = document.querySelector('.menu__link--reviews');
  let contactsBtn = document.querySelector('.menu__link--contacts');
  let menuItems = document.querySelectorAll('.menu__link');
  let helloHead = document.querySelector('.hello__head');
  let poster = document.querySelector('.hello__poster');

  // Activate sections

  // advantagesSection.classList.remove('advantages__wrapper--nojs');
  // sliderSection.classList.remove('gallery__main-wrapper--nojs');
  // priceSection.classList.remove('price--nojs');
  // aboutMeSection.classList.remove('about-me__wrapper--nojs');
  // helloHead.classList.remove('hello__head--nojs');
  poster.classList.remove('hello__poster--nojs');

  let timeout;
  let checkActiveItems = function (element) {

    menuItems.forEach(function (item) {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (element) {
        if (item.classList.contains('menu__link--active') && item !== element) {
          item.classList.remove('menu__link--active');
        }
        timeout = setTimeout(function () { element.classList.add('menu__link--active') }, 300);
      } else {
        item.classList.remove('menu__link--active');
      }
    });

  }

  let scrollValueComparator = function (scrollValue, advBpoint, galBpoint, priceBpoint, reviewsBpoint, contBpoint) {
    if (scrollValue <= advBpoint) {
      checkActiveItems();
    }
    if (scrollValue > advBpoint && scrollValue <= galBpoint) {
      // advantagesSection.classList.add('advantages__wrapper--show');
      checkActiveItems(advBtn);
    }
    if (scrollValue > galBpoint && scrollValue <= priceBpoint) {
      // sliderSection.classList.add('gallery__main-wrapper--show');
      checkActiveItems(galleryBtn);
    }
    if (scrollValue > priceBpoint && scrollValue <= reviewsBpoint) {
      // priceSection.classList.add('price--show');
      checkActiveItems(priceBtn);
    }
    if (scrollValue > reviewsBpoint && scrollValue <= contBpoint) {
      // reviewsSection.classList.add('reviews__wrapper--show');
      checkActiveItems(reviewsBtn);
    }
    if (scrollValue > contBpoint) {

      checkActiveItems(contactsBtn);
    }
  }

  function showSectionHandler (evt, section, btn) {
    evt.preventDefault();
    window.animateScrollTo(section);
    checkActiveItems(btn);
  };

  // Hashchange event

  function hashchangeHandler (evt) {
    switch (window.location.hash) {
      case '#about':
        showSectionHandler(evt, advantagesSection, advBtn);
        break;
      case '#gallery':
        showSectionHandler(evt, sliderSection, galleryBtn);
        break;
      case '#price':
        showSectionHandler(evt, priceSection, priceBtn);
        break;
      case '#reviews':
        showSectionHandler(evt, reviewsSection, reviewsBtn);
        break;
      case '#contacts':
        showSectionHandler(evt, contactsSection, contactsBtn);
        break;
      default: window.animateScrollTo(0);
    }
  };

  window.addEventListener('hashchange', function (evt) {
      hashchangeHandler(evt);
  });

  window.addEventListener('load', function (evt) {
    hashchangeHandler(evt);
    poster.classList.add('hello__poster--show');
    // setTimeout(banner.classList.add('hello__head--show'), 1);
    window.addEventListener('scroll', function () {
      let scrollTop = window.scrollY;
      console.log(scrollTop);
      if (scrollTop > 100) {
        // header.classList.add('page-header__mini');
        upArrow.classList.add('up-arrow--show');

      } else {
        // header.classList.remove('page-header__mini');
        upArrow.classList.remove('up-arrow--show');
      }

      if (currentWidth < tabletWidth) {
        scrollValueComparator(scrollTop, 650, 1950, 2450, 3250, 4900);
      }

      if (currentWidth >= tabletWidth && currentWidth < desktopWidth) {
        scrollValueComparator(scrollTop, 970, 1800, 2500, 3300, 4400);
      }

      if (currentWidth >= desktopWidth) {
        scrollValueComparator(scrollTop, 1200, 1800, 2500, 3660, 4360);
      }
    })
  })

  // Up arrow scroll to top

  upArrow.addEventListener('click', function () {
    window.animateScrollTo(0);
  });

  // // Menu items scroll

  // advBtn.addEventListener('click', function (evt) {
  //   showSectionHandler(evt, advantagesSection, advBtn);
  // })

  // galleryBtn.addEventListener('click', function (evt) {
  //   showSectionHandler(evt, sliderSection, galleryBtn);
  // })

  // priceBtn.addEventListener('click', function (evt) {
  //   showSectionHandler(evt, priceSection, priceBtn);
  // })

  // reviewsBtn.addEventListener('click', function (evt) {
  //   showSectionHandler(evt, reviewsSection, reviewsBtn);
  // })

  // contactsBtn.addEventListener('click', function (evt) {
  //   showSectionHandler(evt, contactsSection, contactsBtn);
  // })

})();
