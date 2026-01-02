const menu = document.querySelector('[data-menu]');
const menuOpenButton = document.querySelector('[data-drawer-open]');
const menuCloseButton = document.querySelector('[data-drawer-close]');
const backdrop = document.querySelector('[data-backdrop]');

const openMenu = () => {
  document.body.classList.add('menu-open');
  menuOpenButton?.setAttribute('aria-expanded', 'true');
  menuCloseButton?.focus();
};

const closeMenu = () => {
  document.body.classList.remove('menu-open');
  menuOpenButton?.setAttribute('aria-expanded', 'false');
};

menuOpenButton?.addEventListener('click', openMenu);
menuCloseButton?.addEventListener('click', closeMenu);
backdrop?.addEventListener('click', closeMenu);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) {
    closeMenu();
  }
});
