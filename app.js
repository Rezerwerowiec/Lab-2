'use strict';

const button = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (button && menu) {
    const mobile = window.matchMedia('(width < 600px)');

    function closeMenu() {
        menu.classList.remove('menu--open');
        button.setAttribute('aria-expanded', 'false');
    }

    button.addEventListener('click', function () {
        const isOpen = menu.classList.toggle('menu--open');
        button.setAttribute('aria-expanded', String(isOpen));
    });

    menu.addEventListener('click', function (event) {
        if (mobile.matches && event.target.closest('a')) {
            closeMenu();
            button.focus();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && mobile.matches && menu.classList.contains('menu--open')) {
            closeMenu();
            button.focus();
        }
    });

    mobile.addEventListener('change', function () {
        const focusWasInMenu = menu.contains(document.activeElement);
        closeMenu();
        if (mobile.matches && focusWasInMenu) {
            button.focus();
        }
    });
}
