/* ============================================================
   ООО «СНК» — основной скрипт (чистый JS, без библиотек)
   Мобильное меню-бургер + аккордеон подменю каталога
   ============================================================ */
(function () {
    'use strict';

    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    var body = document.body;

    if (!burger || !nav) return;

    /* ---------- Открытие/закрытие мобильного меню ---------- */
    function toggleMenu(forceClose) {
        var isOpen = forceClose === true ? true : body.classList.contains('menu-open');

        if (isOpen) {
            body.classList.remove('menu-open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        } else {
            body.classList.add('menu-open');
            burger.classList.add('active');
            burger.setAttribute('aria-expanded', 'true');
        }
    }

    burger.addEventListener('click', function () {
        toggleMenu();
    });

    /* Закрытие по клику на затемнённый фон */
    document.addEventListener('click', function (e) {
        if (!body.classList.contains('menu-open')) return;
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            toggleMenu(true);
        }
    });

    /* Закрытие по клавише Esc */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') toggleMenu(true);
    });

    /* ---------- Аккордеон подменю «Каталог» (мобильная версия) ---------- */
    var subParents = document.querySelectorAll('.has-sub');

    subParents.forEach(function (item) {
        var link = item.querySelector(':scope > .nav__link');

        link.addEventListener('click', function (e) {
            // На мобильных раскрываем подменю вместо перехода по ссылке
            if (window.innerWidth <= 900) {
                e.preventDefault();
                item.classList.toggle('open');
            }
        });
    });

    /* При возврате на десктоп — сбрасываем состояние */
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            toggleMenu(true);
            subParents.forEach(function (item) {
                item.classList.remove('open');
            });
        }
    });
})();
