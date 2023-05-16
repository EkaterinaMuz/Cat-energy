// Open mobile menu
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.navbar-wrapper');
const menuItems = document.querySelectorAll('.navbar-list');
const overlay = document.querySelector('.layout');
const closeBtn = document.querySelector('.navbar__close');

hamburger.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

window.addEventListener('keydown', (e) => {
    if(e.code === 'Escape') {
        closeMenu();
    }
})

for(item of menuItems) {
    item.addEventListener('click', closeMenu);
}

function openMenu() {
    menu.classList.add('show');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

function closeMenu() {
    menu.classList.remove('show')
    overlay.style.display = 'none';
    document.body.style.overflow = '';
};
