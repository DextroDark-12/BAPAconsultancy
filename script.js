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
  // 1b. Top contact bar: hide on scroll, show at top
  // -----------------------------------------------------------------------

  const initTopBar = () => {
    const topBar = document.querySelector('.top-bar');
    if (!topBar) return;

    const checkScroll = () => {
      if (window.scrollY > 60) {
        topBar.classList.add('top-bar--hidden');
        if (header) header.classList.add('site-header--top-hidden');
        document.documentElement.style.setProperty('--scroll-padding', '80px');
      } else {
        topBar.classList.remove('top-bar--hidden');
        if (header) header.classList.remove('site-header--top-hidden');
        if (window.innerWidth >= 768) {
          document.documentElement.style.setProperty('--scroll-padding', '120px');
        } else {
          document.documentElement.style.setProperty('--scroll-padding', '80px');
        }
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) {
        document.documentElement.style.setProperty('--scroll-padding', '80px');
      } else {
        checkScroll();
      }
    });
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
  // 3. Contact form validation (Phase 1 — frontend only)
  // -----------------------------------------------------------------------
  // Future: Replace with n8n webhook → WhatsApp + CRM flow
  // Example: fetch('https://hook.n8n.example/webhook/contact', { method: 'POST', body: formData })

  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const fields = {
      name: { el: document.getElementById('contact-name'), error: form.querySelector('#contact-name + .contact-form__error') },
      email: { el: document.getElementById('contact-email'), error: form.querySelector('#contact-email + .contact-form__error') },
      phone: { el: document.getElementById('contact-phone'), error: form.querySelector('#contact-phone + .contact-form__error') },
      message: { el: document.getElementById('contact-message'), error: form.querySelector('#contact-message + .contact-form__error') },
    };

    const validateField = (field, test) => {
      const isValid = test(field.el.value.trim());
      field.el.classList.toggle('contact-form__input--error', !isValid);
      if (field.error) {
        field.error.classList.toggle('contact-form__error--visible', !isValid);
        field.error.textContent = isValid ? '' : 'This field is required';
      }
      return isValid;
    };

    const showToast = () => {
      // Remove existing toast if any
      const existing = document.querySelector('.contact-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.className = 'contact-toast';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div class="contact-toast__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="contact-toast__content">
          <strong class="contact-toast__title">Thank You!</strong>
          <p class="contact-toast__desc">Thank you for contacting BAPA Consultancy. Our team will reach out to you shortly.</p>
        </div>
      `;
      document.body.appendChild(toast);

      // Trigger animation
      requestAnimationFrame(() => {
        toast.classList.add('contact-toast--visible');
      });

      // Auto-dismiss after 5s
      setTimeout(() => {
        toast.classList.remove('contact-toast--visible');
        setTimeout(() => toast.remove(), 300);
      }, 5000);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(fields.name, (v) => v.length >= 2);
      const isEmailValid = validateField(fields.email, (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      const isPhoneValid = validateField(fields.phone, (v) => v.length >= 8);
      const isMessageValid = validateField(fields.message, (v) => v.length >= 10);

      if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        // Collect form data for future n8n integration
        // const formData = new FormData(form);
        // const payload = Object.fromEntries(formData.entries());
        // fetch('https://hook.n8n.example/webhook/contact', { method: 'POST', body: JSON.stringify(payload) })

        form.reset();
        // Clear any error states
        Object.values(fields).forEach((f) => {
          f.el.classList.remove('contact-form__input--error');
          if (f.error) {
            f.error.classList.remove('contact-form__error--visible');
            f.error.textContent = '';
          }
        });
        showToast();
      } else {
        // Focus first invalid field
        const firstInvalid = Object.values(fields).find((f) => f.el.classList.contains('contact-form__input--error'));
        if (firstInvalid) firstInvalid.el.focus();
      }
    });

    // Real-time validation on blur
    Object.entries(fields).forEach(([key, field]) => {
      field.el.addEventListener('blur', () => {
        if (field.el.value.trim()) {
          const validators = {
            name: (v) => v.length >= 2,
            email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
            phone: (v) => v.length >= 8,
            message: (v) => v.length >= 10,
          };
          if (validators[key]) {
            validateField(field, validators[key]);
          }
        }
      });
    });
  };

  // -----------------------------------------------------------------------
  // 4. Consultation form validation (Phase 1 — frontend only)
  // -----------------------------------------------------------------------
  // Future: Replace with n8n webhook → Google Calendar → WhatsApp Confirmation
  // Example payload shape:
  // {
  //   name: "", email: "", phone: "", company: "", country: "",
  //   service: "", consultation_mode: "", date: "", time_slot: "", notes: ""
  // }

  const initConsultationForm = () => {
    const form = document.getElementById('consultationForm');
    if (!form) return;

    // Set min date for date picker (no past dates)
    const dateInput = document.getElementById('cons-date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (dateInput) {
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }

    const fields = {
      name: {
        el: document.getElementById('cons-name'),
        error: document.querySelector('#cons-name + .consultation-form__error'),
        validate: (v) => v.length >= 2
      },
      email: {
        el: document.getElementById('cons-email'),
        error: document.querySelector('#cons-email + .consultation-form__error'),
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      phone: {
        el: document.getElementById('cons-phone'),
        error: document.querySelector('#cons-phone + .consultation-form__error'),
        validate: (v) => v.length >= 8
      },
      service: {
        el: document.getElementById('cons-service'),
        error: document.querySelector('#cons-service + .consultation-form__error'),
        validate: (v) => v !== ''
      },
      date: {
        el: document.getElementById('cons-date'),
        error: document.querySelector('#cons-date + .consultation-form__error'),
        validate: (v) => v !== ''
      },
      time: {
        el: document.getElementById('cons-time'),
        error: document.querySelector('#cons-time + .consultation-form__error'),
        validate: (v) => v !== ''
      }
    };

    // Radio validation
    const radioError = form.querySelector('.consultation-form__error--radio');
    const validateRadio = () => {
      const checked = form.querySelector('input[name="consultation_mode"]:checked');
      const isValid = !!checked;
      if (radioError) {
        radioError.classList.toggle('consultation-form__error--visible', !isValid);
        radioError.textContent = isValid ? '' : 'Please select a consultation mode';
      }
      return isValid;
    };

    const validateField = (field) => {
      const val = field.el.value ? field.el.value.trim() : '';
      const isValid = field.validate(val);
      field.el.classList.toggle('consultation-form__input--error', !isValid);
      if (field.error) {
        field.error.classList.toggle('consultation-form__error--visible', !isValid);
        field.error.textContent = isValid ? '' : 'This field is required';
      }
      return isValid;
    };

    const showToast = () => {
      const existing = document.querySelector('.contact-toast');
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.className = 'contact-toast';
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <div class="contact-toast__icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="contact-toast__content">
          <strong class="contact-toast__title">Request Received!</strong>
          <p class="contact-toast__desc">Consultation request received successfully. Our team will contact you shortly to confirm your appointment.</p>
        </div>
      `;
      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.add('contact-toast--visible');
      });

      setTimeout(() => {
        toast.classList.remove('contact-toast--visible');
        setTimeout(() => toast.remove(), 300);
      }, 6000);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(fields.name);
      const isEmailValid = validateField(fields.email);
      const isPhoneValid = validateField(fields.phone);
      const isServiceValid = validateField(fields.service);
      const isDateValid = validateField(fields.date);
      const isTimeValid = validateField(fields.time);
      const isRadioValid = validateRadio();

      if (isNameValid && isEmailValid && isPhoneValid && isServiceValid && isDateValid && isTimeValid && isRadioValid) {
        // Collect form data for future n8n integration
        // const formData = new FormData(form);
        // const payload = Object.fromEntries(formData.entries());
        // fetch('https://hook.n8n.example/webhook/consultation', { method: 'POST', body: JSON.stringify(payload) })

        form.reset();
        Object.values(fields).forEach((f) => {
          f.el.classList.remove('consultation-form__input--error');
          if (f.error) {
            f.error.classList.remove('consultation-form__error--visible');
            f.error.textContent = '';
          }
        });
        if (radioError) {
          radioError.classList.remove('consultation-form__error--visible');
          radioError.textContent = '';
        }
        showToast();
      } else {
        const firstInvalid = Object.values(fields).find((f) => f.el.classList.contains('consultation-form__input--error'));
        if (firstInvalid) firstInvalid.el.focus();
      }
    });

    // Real-time validation on blur
    Object.entries(fields).forEach(([key, field]) => {
      field.el.addEventListener('blur', () => {
        if (field.el.value && field.el.value.trim()) {
          validateField(field);
        }
      });
    });

    // Radio change handler
    const radios = form.querySelectorAll('input[name="consultation_mode"]');
    radios.forEach((r) => {
      r.addEventListener('change', () => {
        if (radioError) {
          radioError.classList.remove('consultation-form__error--visible');
          radioError.textContent = '';
        }
      });
    });
  };

  // -----------------------------------------------------------------------
  // 5. Counter Animation — Stats Section
  // -----------------------------------------------------------------------

  const initCounterAnimation = () => {
    const counters = document.querySelectorAll('.trusted-stat__count');
    if (!counters.length) return;

    let animationStarted = false;

    const animateCounters = () => {
      if (animationStarted) return;
      animationStarted = true;

      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1200; // ms
        const startTime = performance.now();

        const update = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const currentVal = Math.round(eased * target);
          el.textContent = currentVal;

          if (progress < 1) {
            requestAnimationFrame(update);
          }
        };

        requestAnimationFrame(update);
      });
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      // Observe the parent section
      const section = document.querySelector('.trusted');
      if (section) {
        observer.observe(section);
      }
    } else {
      // Fallback: start animation immediately
      animateCounters();
    }
  };

  // -----------------------------------------------------------------------
  // 6. FAQ Accordion — smooth arrow animation is handled by CSS
  //    (Native <details>/<summary> is progressively enhanced)
  // -----------------------------------------------------------------------

  const initFaqAccordion = () => {
    const items = document.querySelectorAll('.consultation-faq__item');
    if (!items.length) return;

    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          // Close other open items for single-open behavior
          items.forEach((other) => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  };

  // -----------------------------------------------------------------------
  // Initialisation
  // -----------------------------------------------------------------------

  const init = () => {
    initScrollHeader();
    initTopBar();
    initDrawer();
    initContactForm();
    initConsultationForm();
    initCounterAnimation();
    initFaqAccordion();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };
})();
