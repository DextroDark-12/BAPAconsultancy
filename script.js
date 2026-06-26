/* ==========================================================================
   BAPA Consultancy — Scripts
   ========================================================================== */

'use strict';

const BAPA = (() => {
  // DOM refs
  const header  = document.querySelector('.site-header');
  const toggle  = document.querySelector('.nav-toggle');
  const drawer  = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-drawer-overlay');

  // -----------------------------------------------------------------------
  // 1. Header: transparent → solid on scroll
  // -----------------------------------------------------------------------

  const initScrollHeader = () => {
    if (!header) return;

    const checkScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll(); // check initial state
  };

  // -----------------------------------------------------------------------
  // 2. Mobile drawer
  // -----------------------------------------------------------------------

  const openDrawer = () => {
    if (!drawer || !overlay || !toggle) return;
    drawer.classList.add('nav-drawer--open');
    overlay.classList.add('nav-drawer-overlay--visible');
    toggle.classList.add('nav-toggle--active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!drawer || !overlay || !toggle) return;
    drawer.classList.remove('nav-drawer--open');
    overlay.classList.remove('nav-drawer-overlay--visible');
    toggle.classList.remove('nav-toggle--active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  };

  const initDrawer = () => {
    if (!toggle || !drawer || !overlay) return;

    // Hamburger click → open
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('nav-drawer--open');
      isOpen ? closeDrawer() : openDrawer();
    });

    // Overlay click → close
    overlay.addEventListener('click', closeDrawer);

    // Drawer close button click → close
    const closeBtn = drawer.querySelector('.nav-drawer__close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Nav link clicks → close
    const links = drawer.querySelectorAll('.nav-drawer__links a');
    links.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Escape key → close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('nav-drawer--open')) {
        closeDrawer();
      }
    });

    // Window resize → close if going to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && drawer.classList.contains('nav-drawer--open')) {
        closeDrawer();
      }
    });
  };

  // -----------------------------------------------------------------------
  // Initialisation
  // -----------------------------------------------------------------------

  const init = () => {
    initScrollHeader();
    initDrawer();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };
})();
