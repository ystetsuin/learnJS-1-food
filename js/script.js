import calc from './modules/calc';
import cards from './modules/cards';
import form from './modules/form';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {showModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {


    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);

    calc();
    cards();
    form('form', modalTimerId);
    modal('button[data-modal]', '.modal', modalTimerId);
    slider({
        slideS: '.offer__slide',
        sliderS: '.offer__slider',
        prevS: '.offer__slider-prev',
        nextS: '.offer__slider-next',
        slidesWrapperS: '.offer__slider-wrapper',
        slidesFieldS: '.offer__slider-inner',
        totalS: '#total',
        currentS: '#current',
    });
    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2022-01-01');
});