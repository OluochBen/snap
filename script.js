const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
const menu = document.querySelector('[data-menu]');
const menuOpenButton = document.querySelector('[data-drawer-open]');
const menuCloseButton = document.querySelector('[data-drawer-close]');
const backdrop = document.querySelector('[data-backdrop]');

const closeAllDropdowns = (exceptionId) => {
  dropdownToggles.forEach((button) => {
    const targetId = button.getAttribute('data-dropdown-toggle');
    if (exceptionId && targetId === exceptionId) return;

    const menuEl = document.getElementById(targetId);
    if (!menuEl) return;

    menuEl.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.parentElement?.classList.remove('open');
  });
};

dropdownToggles.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const targetId = button.getAttribute('data-dropdown-toggle');
    const menuEl = document.getElementById(targetId);
    if (!menuEl) return;

    const isOpen = button.getAttribute('aria-expanded') === 'true';
    closeAllDropdowns(targetId);
    menuEl.hidden = isOpen;
    button.setAttribute('aria-expanded', String(!isOpen));
    button.parentElement?.classList.toggle('open', !isOpen);
  });

  const menuEl = document.getElementById(button.getAttribute('data-dropdown-toggle'));
  menuEl?.addEventListener('click', () => closeAllDropdowns());
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.dropdown')) {
    closeAllDropdowns();
  }
});

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
    closeAllDropdowns();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 900) {
    closeMenu();
  }
});
