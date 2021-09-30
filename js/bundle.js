/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
     const result = document.querySelector('.calculating__result span');
     let sex, height, weight, age, activity;
 
     if (localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     } else {
         sex = 'female';
         localStorage.setItem('sex', 'female');
     }
 
     if (localStorage.getItem('activity')) {
         activity = localStorage.getItem('activity');
     } else {
         activity = 1.375;
         localStorage.setItem('activity', 1.375);
     }
 
     calcCalories();
 
     initLocalSettings('#gender div', 'calculating__choose-item_active');
     initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
     getSexAndActivity('#gender div', 'calculating__choose-item_active');
     getSexAndActivity('.calculating__choose_big div', 'calculating__choose-item_active');
     
     getBodyType('.calculating__choose_medium');
 
     function calcCalories() {
         if (!sex || !height || !weight || !age || !activity) {
             result.textContent = '____';
             return;
         }
 
         result.textContent = (sex === 'female') ? 
             Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity) :
             Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
     }
 
     function getSexAndActivity(selector, activeClass) {
         const btns = document.querySelectorAll(selector);
         
         btns.forEach( btn => btn.addEventListener('click', (e) => {
 
             btns.forEach(btn => btn.classList.remove(activeClass));
             e.target.classList.add(activeClass);
 
             if (e.target.getAttribute('data-activity')) {
                 activity = +e.target.getAttribute('data-activity');
                 localStorage.setItem('activity', +e.target.getAttribute('data-activity'));
             } else {
                 sex = e.target.getAttribute('id');
                 localStorage.setItem('sex', e.target.getAttribute('id'));
             }
 
             calcCalories();
         }));
     }
 
     function getBodyType(parentSelector) {
         const inputs = document.querySelectorAll(`${parentSelector} input`);
 
         inputs.forEach( input => addEventListener('input', (e) => {
 
             if (input.value.match(/\D/g)) {
                 input.style.border = '1px solid red';
                 input.style.color = 'red';
             } else {
                 input.style.border = '';
                 input.style.color = '';
             }
             
             switch(e.target.getAttribute('id')) {
                 case ('height'):
                     height = +e.target.value;
                     break;
                 case ('weight'):
                     weight = +e.target.value;
                     break;
                 case ('age'):
                     age = +e.target.value;
                     break;
             }
 
             calcCalories();
         }));
     }
 
     function initLocalSettings(selector, activeClass) {
         const btns = document.querySelectorAll(selector);
 
         btns.forEach( btn => {
             btn.classList.remove(activeClass);
 
             if (btn.getAttribute('id') === localStorage.getItem('sex')) {
                 btn.classList.add(activeClass);
             }
 
             if (btn.getAttribute('data-activity') === localStorage.getItem('activity')) {
                 btn.classList.add(activeClass);
             }
         });
     }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {

      class CardMenu {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        changeToUAH() {
            this.price *= 27;
        }

        render() {

            this.changeToUAH();

            const elem = document.createElement('div');

            if (this.classes.length === 0) {
                elem.classList.add('menu__item');
            } else {
                this.classes.forEach(className =>
                    elem.classList.add(className));
            }

            elem.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}!</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;

            this.parent.append(elem);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResorce)('http://localhost:3000/menu')
        .then( data => {
            data.forEach( ({img, altimg, title, descr, price}) => {
                new CardMenu(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function form(formSelector, modalTimerId) {

      const forms = document.querySelectorAll(formSelector);

      forms.forEach(form => bindPostData(form));
  
      const message = {
          loading: 'img/form/spinner.svg',
          success: 'Данные успешно отправлены',
          failure: 'Что-то пошло не так'
      };
    
      function bindPostData(form) {
          form.addEventListener('submit', (e) => {
              e.preventDefault();
  
              const statusMessage = document.createElement('img');
              statusMessage.src = message.loading;
              statusMessage.style.cssText = 'display: block; margin: 0 auto';
              form.insertAdjacentElement('afterend', statusMessage);
  
              const formData = new FormData(form),
                  obj = {};
  
              //Для передачи в формате JSON нужно formData преобразовать в объект
              formData.forEach((item, i) => obj[i] = item);
  
              const json = JSON.stringify(Object.fromEntries(formData.entries()));
  
              (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
                  .then(data => {
                      console.log(data);
                      showThanksModal(message.success);
                      statusMessage.remove();
                  })
                  .catch(() => showThanksModal(message.failure))
                  .finally(() => form.reset());
          });
      }
  
      function showThanksModal(message) {
  
          const prevModalDialog = document.querySelector('.modal__dialog');
          prevModalDialog.classList.add('hide');
  
          (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)('.modal', modalTimerId);
  
          const thanksModal = document.createElement('div');
          thanksModal.classList.add('modal__dialog');
          thanksModal.innerHTML = `
              <div class="modal__content">
                  <div data-close="" class="modal__close">×</div>
                  <div class="modal__title">${message}</div>
              </div>
              `;
  
          document.querySelector('.modal').append(thanksModal);
  
          setTimeout(() => {
              thanksModal.remove();
              (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
              prevModalDialog.classList.remove('hide');
          }, 2000);
  
      }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    if (modalTimerId) {
        clearTimeout(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

        const openModalBtns = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector);

    openModalBtns.forEach(btn => btn.addEventListener('click', () => showModal(modalSelector, modalTimerId)));

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }   
    });

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        const html = document.documentElement;
        if (window.pageYOffset + html.clientHeight >= html.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({slideS, sliderS, prevS, nextS, slidesWrapperS, slidesFieldS, totalS, currentS}) {

    const slides = document.querySelectorAll(slideS),
        slider = document.querySelector(sliderS),
        total = document.querySelector(totalS),
        prev = document.querySelector(prevS),
        next = document.querySelector(nextS),
        slidesWrapper = document.querySelector(slidesWrapperS),
        slidesField = document.querySelector(slidesFieldS),
        width = Number.parseInt(window.getComputedStyle(slidesWrapper).width);

    let current = document.querySelector(currentS),
        slideIndex = 1,
        offset = 0,
        dots = [];

    setCSS();
    showTotal(total);
    showCurrent(current);
    createDots();

    next.addEventListener('click', () => {

        if (offset == width * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += width;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = (slideIndex == slides.length) ? 1 : slideIndex + 1;
        
        showCurrent(current);
        setDotsOpacity();
    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = width * (slides.length - 1);
        } else {
            offset -= width;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        slideIndex = (slideIndex == 1) ? Number.parseInt(total.innerText) : slideIndex - 1;
        showCurrent(current);
        setDotsOpacity();
    });

    dots.forEach( dot => {

        dot.addEventListener('click', (e) => {

            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = +slideTo;
            offset = width * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            setDotsOpacity();
            showCurrent(current);
        });
    });

    function setCSS() {
        slidesField.style.width = slides.length * 100 + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
    
        slides.forEach(slide => slide.style.width = `${width}px`);
    
        slidesWrapper.style.width = `${width}px`;
        slidesWrapper.style.overflow = 'hidden';
    
        slider.style.position = 'relative';
    }

    function showTotal(el) {
        const length = slides.length;
        el.innerText = (length < 10) ? `0${length}` : length;
    }

    function showCurrent(el) {
        el.innerText = (slideIndex < 10) ? `0${slideIndex}` : slideIndex;
    }

    function createDots() {
        const indicators = document.createElement('ol');

        indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;

        slider.append(indicators);

        slides.forEach((slide, i) => {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.style.cssText = `
                box-sizing: content-box;
                flex: 0 1 auto;
                width: 30px;
                height: 6px;
                margin-right: 3px;
                margin-left: 3px;
                cursor: pointer;
                background-color: #fff;
                background-clip: padding-box;
                border-top: 10px solid transparent;
                border-bottom: 10px solid transparent;
                opacity: .5;
                transition: opacity .6s ease;
            `;

            if (i == 0) {
                dot.style.opacity = 1;
            }

            indicators.append(dot);
            dots.push(dot);
        });
    }

    function setDotsOpacity() {
        
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        });
        
        dots[slideIndex - 1].style.opacity = 1;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsContentSelector, tabsParentSelector, tabsSelector, activeClass) {

       const tabsContent = document.querySelectorAll(tabsContentSelector),
             tabsParent = document.querySelector(tabsParentSelector),
             tabs = tabsParent.querySelectorAll(tabsSelector);

   hideTabs();
   showTab();

   function hideTabs() {

       tabsContent.forEach(item => {
           item.classList.add('hide');
           item.classList.remove('fade');
       });

       tabs.forEach(item => {
           item.classList.remove(activeClass);
       });
   }

   function showTab(i = 0) {
       tabsContent[i].classList.remove('hide');
       tabsContent[i].classList.add('fade');

       tabs[i].classList.add(activeClass);
   }

   tabsParent.addEventListener('click', (e) => {

       if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
           tabs.forEach((item, i) => {
               if (e.target == item) {
                   hideTabs();
                   showTab(i);
               }
           });
       }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

     function getTimeDifference(endtime) {
         const total = Date.parse(endtime) - Date.parse(new Date()),
             days = Math.floor(total / (1000 * 60 * 60 * 24)),
             hours = Math.floor((total / (1000 * 60 * 60) % 24)),
             minutes = Math.floor((total / (1000 * 60)) % 60),
             seconds = Math.floor((total / 1000) % 60);
 
         return {
             total,
             days,
             hours,
             minutes,
             seconds
         };
     }
 
     function setZero(num) {
         if (num < 10) {
             return `0${num}`;
         } else {
             return num;
         }
     }
 
     function setClock(selector, endtime) {
         const timer = document.querySelector(selector),
             days = timer.querySelector('#days'),
             hours = timer.querySelector('#hours'),
             minutes = timer.querySelector('#minutes'),
             seconds = timer.querySelector('#seconds'),
 
             timerID = setInterval(updateClock, 1000);
 
         updateClock();
 
         function updateClock() {
 
             const obj = getTimeDifference(endtime);
 
             days.innerHTML = setZero(obj.days);
             hours.innerHTML = setZero(obj.hours);
             minutes.innerHTML = setZero(obj.minutes);
             seconds.innerHTML = setZero(obj.seconds);
 
             if (obj.total <= 0) {
                 clearInterval(timerID);
             }
         }
     }
 
     setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResorce": () => (/* binding */ getResorce)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        body: data,
        headers: {
            "Content-type": 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`Couldn't fetch to ${url}, status: ${res.status}`);
    }

    return await res.json();
};

const getResorce = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Couldn't fetch to ${url}, status: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









document.addEventListener('DOMContentLoaded', () => {


    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.showModal)('.modal', modalTimerId), 50000);

    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_form__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('button[data-modal]', '.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        slideS: '.offer__slide',
        sliderS: '.offer__slider',
        prevS: '.offer__slider-prev',
        nextS: '.offer__slider-next',
        slidesWrapperS: '.offer__slider-wrapper',
        slidesFieldS: '.offer__slider-inner',
        totalS: '#total',
        currentS: '#current',
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', '2022-01-01');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map