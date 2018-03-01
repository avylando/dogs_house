'use strict';

(function () {

  const mobileWidth = 320;
  const tabletWidth = 680;
  const desktopWidth = 1090;
  let currentWidth = document.body.clientWidth;

  let header = document.querySelector('.page-header');
  let upArrow = document.querySelector('.up-arrow');
  let advantagesSection = document.querySelector('.advantages__wrapper');
  let sliderSection = document.querySelector('.portfolio__main-wrapper');
  let aboutMeSection = document.querySelector('.about-me__wrapper');
  let cooperation = document.querySelector('.menu__link--cooperation');
  let portfolio = document.querySelector('.menu__link--portfolio');
  let aboutMe = document.querySelector('.menu__link--me');
  let contacts = document.querySelector('.menu__link--contacts');
  let menuItems = document.querySelectorAll('.menu__link');

  // Activate sections

  advantagesSection.classList.remove('advantages__wrapper--nojs');
  sliderSection.classList.remove('portfolio__main-wrapper--nojs');
  aboutMeSection.classList.remove('about-me__wrapper--nojs');

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

  let scrollValueComparator = function (scrollValue, advBpoint, portBpoint, aboutBpoint, contBpoint) {
    if (scrollValue <= advBpoint) {
      checkActiveItems();
    }
    if (scrollValue > advBpoint && scrollValue <= portBpoint) {
      advantagesSection.classList.add('advantages__wrapper--show');
      checkActiveItems(cooperation);
    }
    if (scrollValue > portBpoint && scrollValue <= aboutBpoint) {
      sliderSection.classList.add('portfolio__main-wrapper--show');
      checkActiveItems(portfolio);
    }
    if (scrollValue > aboutBpoint && scrollValue <= contBpoint) {
      aboutMeSection.classList.add('about-me__wrapper--show');
      checkActiveItems(aboutMe);
    }
    if (scrollValue > contBpoint) {

      checkActiveItems(contacts);
    }
  }

  window.addEventListener('load', function () {
    window.addEventListener('scroll', function () {
      let scrollTop = window.scrollY;
      console.log(scrollTop);
      if (scrollTop > 100) {
        header.classList.add('page-header__mini');
        upArrow.classList.add('up-arrow--show');
      } else if (header.classList.contains('page-header__mini')) {
        header.classList.remove('page-header__mini');
        upArrow.classList.remove('up-arrow--show');
      }

      if (currentWidth < tabletWidth) {
        scrollValueComparator(scrollTop, 50, 1200, 2700, 3200);
      }

      if (currentWidth >= tabletWidth && currentWidth < desktopWidth) {
        scrollValueComparator(scrollTop, 100, 1050, 2600, 3200);
      }

      if (currentWidth >= desktopWidth) {
        scrollValueComparator(scrollTop, 500, 1200, 2250, 2800);
      }
    })
  })

  // Up arrow scroll to top


  upArrow.addEventListener('click', function () {
    window.animateScrollTo(0);
  });

  // Menu items scroll

  cooperation.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.animateScrollTo(advantagesSection);
    // widthScrollComparator(400, 575, 680);
    checkActiveItems(cooperation);
  })

  portfolio.addEventListener('click', function (evt) {
    evt.preventDefault();
    // widthScrollComparator(2200, 1540, 1515);
    window.animateScrollTo(sliderSection);
    checkActiveItems(portfolio);
  })

  aboutMe.addEventListener('click', function (evt) {
    evt.preventDefault();
    // widthScrollComparator(3000, 2800, 2275);
    window.animateScrollTo(aboutMeSection);
    checkActiveItems(aboutMe);
  })

  contacts.addEventListener('click', function (evt) {
    evt.preventDefault();
    // scrollTo(document.documentElement, 3800, 300);
    // animatedScrollTo(document.body, 3800, 300, checkActiveItems(contacts));
    window.animateScrollTo(3800);

  })

})();
