let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

  btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
  menuMobile: document.querySelector(".menu-mobile--js"),
  menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

  modalCall() {
    const link = ".link-modal-js";

    Fancybox.bind(link, {
      arrows: false,
      infobar: false,
      touch: false,
      type: 'inline',
      autoFocus: false,
      keyboard: {
        CLOSE: "Закрыть",
        NEXT: "Вперед",
        PREV: "Назад",
        // PLAY_START: "Start slideshow",
        // PLAY_STOP: "Pause slideshow",
        // FULL_SCREEN: "Full screen",
        // THUMBS: "Thumbnails",
        // DOWNLOAD: "Download",
        // SHARE: "Share",
        // ZOOM: "Zoom"
      },
			// on: {
			// 	initCarousel: (fancybox, slide) => {
			// 		//-$('.header').addClass('has-pe');
			// 		$('body').addClass('remove-fancy-arrow');
			// 	},
			// 	destroy: (fancybox, slide) => {
			// 		//$('.header').removeClass('has-pe');
			// 		$('body').removeClass('remove-fancy-arrow');
			// 	},
			// },

    });

    // $(link).fancybox({
    // });

    $(".modal-close-js").click(function () {
      fancybox.close();
    })
    // fancybox.defaults.backFocus = false;
    const linkModal = document.querySelectorAll(link);

    function addData() {
      linkModal.forEach(element => {
        element.addEventListener('click', () => {
          let modal = document.querySelector(element.getAttribute("href"));
          const data = element.dataset;

          function setValue(val, elem) {
            if (elem && val) {
              const el = modal.querySelector(elem)
              el.tagName == "INPUT"
                ? el.value = val
                : el.innerHTML = val;
              // console.log(modal.querySelector(elem).tagName)
            }
          }

          setValue(data.title, '.ttu');
          setValue(data.text, '.after-headline');
          setValue(data.btn, '.btn');
          setValue(data.order, '.order');
        })
      })
    }


    if (linkModal) addData();
  },
  // /modalCall
  toggleMenu() {
    const toggle = this.btnToggleMenuMobile;
    const menu = this.menuMobile;
    document.addEventListener("click", function (event) {
      const toggleEv = event.target.closest(".toggle-menu-mobile--js");
      if (!toggleEv) return;
      toggle.forEach(el => el.classList.toggle("on"));
      menu.classList.toggle("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
    }, {passive: true});
  },
  closeMenu() {
    let menu = this.menuMobile;
    if (!menu) return;
    if (menu.classList.contains("active")) {
      this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
      this.menuMobile.classList.remove("active");
      [document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
    }

  },
  mobileMenu() {
    if (!this.menuMobileLink) return;
    this.toggleMenu();
    document.addEventListener('mouseup', (event) => {
      let container = event.target.closest(".menu-mobile--js.active"); // (1)
      let link = event.target.closest(".menu-mobile .menu a"); // (1)
      if (!container || link) this.closeMenu();
    }, {passive: true});

    window.addEventListener('resize', () => {
      if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
    }, {passive: true});
  },
  // /mobileMenu

  // tabs  .
  tabscostume(tab) {
    const tabs = document.querySelectorAll(tab);
    const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
    tabs.forEach(element => {
      let tabs = element;
      const tabsCaption = tabs.querySelector(".tabs__caption");
      const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
      const tabsWrap = tabs.querySelector(".tabs__wrap");
      const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
      const random = Math.trunc(Math.random() * 1000);
      tabsBtn.forEach((el, index) => {
        const data = `tab-content-${random}-${index}`;
        el.dataset.tabBtn = data;
        const content = tabsContent[index];
        content.dataset.tabContent = data;
        if (!content.dataset.tabContent == data) return;

        const active = content.classList.contains('active') ? 'active' : '';
        // console.log(el.innerHTML);
        content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
      })


      tabs.addEventListener('click', function (element) {
        const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
        if (!btn) return;
        const data = btn.dataset.tabBtn;
        const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
        const content = this.querySelectorAll(`[data-tab-content]`);
        tabsAllBtn.forEach(element => {
          element.dataset.tabBtn == data
            ? element.classList.add('active')
            : element.classList.remove('active')
        });
        content.forEach(element => {
          element.dataset.tabContent == data
            ? (element.classList.add('active'), element.previousSibling.classList.add('active'))
            : element.classList.remove('active')
        });
      })
    })

    // $('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
    // 	$(this)
    // 		.addClass('active').siblings().removeClass('active')
    // 		.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
    // 		.eq($(this).index()).fadeIn().addClass('active');

    // });

  },
  // /tabs

  inputMask() {
    // mask for input
    let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
    InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
    Inputmask("+9(999)999-99-99").mask(InputTel);
  },
  // /inputMask
  ifie() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
      document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
    }
  },
  heightwindow() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, {passive: true});
  },
  animateScroll() {
    $(document).on('click', " .menu li a, .scroll-link", function () {
      const elementClick = $(this).attr("href");
      if (!document.querySelector(elementClick)) {
        $(this).attr("href", '/' + elementClick)
      } else {
        let destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination - 80}, 0);
        return false;
      }
    });
  },
  getCurrentYear(el) {
    let now = new Date();
    let currentYear = document.querySelector(el);
    if (currentYear) currentYear.innerText = now.getFullYear();
  }
};
const $ = jQuery;

function eventHandler() {
  JSCCommon.ifie();
  JSCCommon.modalCall();
  JSCCommon.tabscostume('.tabs--js');
  //JSCCommon.mobileMenu();
  $('.toggle-menu-mobile--js').click(function (){
    document.body.removeEventListener('click', mobMenuMissClick);

    $('.toggle-menu-mobile--js').toggleClass('on');
    $('body').toggleClass('fixed');
    $('.menu-mobile--js').toggleClass('active');

    window.setTimeout(function (){
      document.body.addEventListener('click', mobMenuMissClick);
    }, 10);
  });
  function mobMenuMissClick(){
    if(!event.target.closest('.menu-mobile--js') && !event.target.closest('.bot-nav-dd--js')){
      $('.toggle-menu-mobile--js').removeClass('on');
      $('body').removeClass('fixed');
      $('.menu-mobile--js').removeClass('active');
    }
  }

  JSCCommon.inputMask();
  JSCCommon.heightwindow();

  var x = window.location.host;
  let screenName;
  screenName = document.body.dataset.bg;
  if (screenName && x.includes("localhost:30")) {
    document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
  }

  // modal window
  //luckyoneJs

  let sCertsSlider = new Swiper('.sCerts-slider-js', {
    slidesPerView: 'auto',
    spaceBetween: 24,
  });

  //sTags
  let sTagsSlider = new Swiper('.sTags-slider-js', {
    slidesPerView: 'auto',
    loop: true,
    spaceBetween: 24,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  $('.sTags-show-btn-js').click(function () {
    $(this).toggleClass('active');
    //
    $('.sTags-slider-wrap-js').toggleClass('active').find('.swiper-button-hand').fadeToggle(function () {
      $(this).toggleClass('hidden');
    })

    $('.sTags-close-btn-js').fadeToggle(function () {
      $(this).toggleClass('active');
    });
  })
  $('.sTags-close-btn-js').click(function () {
    $(this).fadeOut(function () {
      $(this).removeClass('active');
    });

    $('.sTags-show-btn-js').removeClass('active');
    $('.sTags-slider-wrap-js').removeClass('active').find('.swiper-button-hand').fadeIn(function () {
      $(this).removeClass('hidden');
    })
  })
  //
  //.sPrice-show-hide-js
  $('.sPrice-show-hide-js').click(function () {
    $('.sPrice-t-body-js, .sPrice-show-hide-js').toggleClass('active');
  })

  //
  let header = document.querySelector(".header--js");

  function calcHeaderHeight() {
    document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
  }

  window.addEventListener('resize', calcHeaderHeight, {passive: true});
  window.addEventListener('scroll', calcHeaderHeight, {passive: true});
  calcHeaderHeight();

  //
  $('.open-bot-nav-js').click(function () {
    $('.bot-nav-dd').fadeIn(function () {
      $(this).addClass('active');
    })
  });
  $('.close-bot-nav-js').click(function () {
    $('.bot-nav-dd').fadeOut(function () {
      $(this).removeClass('active');
    })
  });
  //sidebar
  $('.sidebar-toggle-js').click(function (){
    $(this).toggleClass('active');

    $('.sidebar-content-js').slideToggle(function (){
      $(this).toggleClass('active');
    })
  });

  //end luckyoneJs
};
if (document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}