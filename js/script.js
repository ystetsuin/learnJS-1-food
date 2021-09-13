document.addEventListener('DOMContentLoaded', () => {

    //TABS

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item');

    hideTabs();
    showTab();

    function hideTabs() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('fade');

        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (e) => {

        if (e.target && e.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });

    //TIMER

    const deadline = '2022-01-01';

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

    setClock('.timer', deadline);

    // Modal

    const openModalBtns = document.querySelectorAll('button[data-modal]'),
        closeModalBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    openModalBtns.forEach(btn => btn.addEventListener('click', showModal));

    closeModalBtn.addEventListener('click', closeModal);

    function showModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
            console.log('dwsde');
        }
    });

    const modalTimerId = setTimeout(showModal, 50000);

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        const html = document.documentElement;
        if (window.pageYOffset + html.clientHeight >= html.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //CARDS MENU - use Classes

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
                this.classes.forEach( className => 
                    elem.classList.add(className) );
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

    new CardMenu(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
        9,
        '.menu .container'
    ).render();

    new CardMenu(
        'img/tabs/elite.jpg',
        'elite',
        'Меню "Премиум"',
        `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
        20,
        '.menu .container'  
    ).render();

    new CardMenu(
        'img/tabs/post.jpg',
        'post',
        'Меню "Постное"',
        `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
        16,
        '.menu .container'  
    ).render();

    // FORM - send to server

    const forms = document.querySelectorAll('form');

    forms.forEach( form => postData(form) );

    const message = {
        loading: 'Загрузка...',
        success: 'Данные успешно отправлены',
        failure: 'Что-то пошло не так'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const sendStat = document.createElement('div');
            
            sendStat.textContent = message.loading;
            form.append(sendStat);

            const formData = new FormData(form);

            //Для передачи в формате JSON
            const obj = {};
            formData.forEach( (item, i) => obj[i] = item );
            const json = JSON.stringify(obj);


            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'server.php');
            //вместо formData передаем json
            xhr.send(json);

            xhr.addEventListener('load', () => {

                if (xhr.status === 200) {
                    sendStat.textContent = message.success;
                    console.log(xhr.response);
                    form.reset();
                    setTimeout( () => sendStat.remove(), 2000);
                } else {
                    sendStat.textContent = message.failure;
                }
            });
        });
    }


});