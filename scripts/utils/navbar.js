
const mobileMenu = document.querySelector('.navbar__menu');
const menuLinks = document.querySelector('.navbar__items');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    menuLinks.classList.toggle('active')
})
