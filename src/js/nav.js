import { selectAll } from './utils';

// header show/hide
(async () => {
  const doc = document.documentElement;

  let prevScroll = window.scrollY || window.scrollTop;
  let currScroll;
  let direction = 0;
  let prevDirection = 0;

  const header = document.querySelector('.page__header');

  const checkScroll = () => {
    currScroll = window.scrollY || doc.scrollTop;

    if (currScroll > prevScroll) direction = 2;
    else if (currScroll < prevScroll) direction = 1;

    if (direction !== prevDirection) {
      toggleHeader(direction, currScroll);
    }

    prevScroll = currScroll;
  };

  const toggleHeader = (direction, currScroll) => {
    if (direction === 2 && currScroll > 60) {
      header.classList.add('page__header--hidden');
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove('page__header--hidden');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll, false);
})();

const pNav = document.getElementById('Nav');
const buttons = selectAll('button[aria-controls]');
const subMenus = selectAll(
  'button[aria-controls] + ul, button[aria-controls] + div'
);
const navLinks = selectAll('.nav__link', pNav);

function openSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute('aria-expanded', 'true');
    buttonEl.setAttribute('aria-label', 'Hide');
    navEl.style.display = 'block';
  }
}

function closeSubNav(buttonEl) {
  let navId = buttonEl.getAttribute('aria-controls');
  let navEl = document.getElementById(navId);

  if (navEl) {
    buttonEl.setAttribute('aria-expanded', 'false');
    buttonEl.setAttribute('aria-label', 'Show');
    navEl.style.display = 'none';
  }
}

function closeAllSubNavs() {
  buttons.forEach(function (button) {
    closeSubNav(button);
  });
}

// event handlers
function handleButtonClick() {
  let button = this;
  let isOpen = button.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeSubNav(button);
  } else {
    closeAllSubNavs();
    openSubNav(button);
  }
}

function handleButtonKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    closeSubNav(this);
  }
}

function handleNavKeyDown(event) {
  if (event.key === 'Escape' || event.key === 'Esc') {
    let button = document.querySelector(
      `button[aria-controls=${this.id}]`
    );
    closeSubNav(button);
    button.focus();
  }
}

function handleNavFocusOut(event) {
  let navContainsFocus = this.contains(event.relatedTarget);
  if (!navContainsFocus) {
    let button = this.querySelector('button[aria-controls]');
    button && closeSubNav(button);
  }
}

// attach event listeners
buttons.forEach(function (button) {
  button.addEventListener('click', handleButtonClick);
  button.addEventListener('keydown', handleButtonKeyDown);
});

subMenus.forEach(function (subMenu) {
  subMenu.addEventListener('keydown', handleNavKeyDown);
});

// attach focusout listener to the parent of both
// the disclosure button and the menu
let subNavContainers = Array.prototype.slice.call(
  document.querySelectorAll('#Nav > ul > li')
);
subNavContainers.forEach(function (navContainer) {
  navContainer.addEventListener('focusout', handleNavFocusOut);
});

// handle aria-current
(() => {
  const parsedUrl = new URL(window.location.href);
  navLinks.forEach((navLink) => {
    let link = new URL(navLink.href);
    let isCurrent = parsedUrl.pathname.includes(link.pathname);
    if (isCurrent) navLink.setAttribute('aria-current', 'page');
  });
})();

// function handleAriaExpanded(e) {
//   let isExpanded = e.currentTarget.getAttribute('aria-expanded') === 'true';
//
//   ['aria-expanded', 'aria-pressed'].map((state) => {
//     e.currentTarget.setAttribute(state, !isExpanded);
//   });
//
//   pNav.dataset.open = !isExpanded;
// }


// Toggle Menu
const menuToggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__items');

menuToggle.innerHTML =
  '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M0 5.5h15m-15-4h15m-15 8h15m-15 4h15" stroke="currentColor"></path></svg>';

menuToggle.addEventListener('click', (e) => {
  e.preventDefault();

  if (menu.classList.contains('is-active')) {
    menuToggle.innerHTML =
      '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path d="M0 5.5h15m-15-4h15m-15 8h15m-15 4h15" stroke="currentColor"></path></svg>';
    menu.style.opacity = '0';
    menu.style.visibility = 'hidden';
    menu.style.transform = 'translateX(100%)';

    setTimeout(() => {
      menu.classList.remove('is-active');
      menu.style.opacity = '';
      menu.style.visibility = '';
      menu.style.transform = '';
    }, 300);
  } else {
    menu.classList.add('is-active');
    menuToggle.innerHTML =
      '<svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.793 7.5L1.146 1.854l.708-.708L7.5 6.793l5.646-5.647.708.708L8.207 7.5l5.647 5.646-.707.707L7.5 8.207l-5.646 5.646-.708-.707L6.793 7.5z" fill="currentColor"></path></svg>';
  }
});
