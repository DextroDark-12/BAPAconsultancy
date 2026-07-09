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
    if (dateInput) {
      const today = new Date();
      const todayStr = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
      dateInput.min = todayStr;

      dateInput.addEventListener('input', (e) => {
        if (!e.target.value) return;
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getUTCDay();
        if (day === 0 || day === 6) {
          alert('Weekend appointments are not available. Please select a date from Monday to Friday.');
          e.target.value = '';
        }
      });
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

    const showPopup = (title, message, isSuccess = true) => {
      const existing = document.querySelector('.contact-toast');
      if (existing) existing.remove();

      const popup = document.createElement('div');
      popup.className = 'contact-toast';
      popup.style.position = 'fixed';
      popup.style.top = '0';
      popup.style.left = '0';
      popup.style.width = '100vw';
      popup.style.height = '100vh';
      popup.style.backgroundColor = 'rgba(0,0,0,0.6)';
      popup.style.display = 'flex';
      popup.style.alignItems = 'center';
      popup.style.justifyContent = 'center';
      popup.style.zIndex = '9999';
      
      const iconHtml = isSuccess 
        ? `<div style="color: #10B981; margin-bottom: 1rem; display: flex; justify-content: center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>`
        : `<div style="color: #EF4444; margin-bottom: 1rem; display: flex; justify-content: center;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>`;
      
      popup.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          ${iconHtml}
          <h3 style="margin-top: 0; color: #111827; font-size: 1.25rem; font-weight: 600;">${title}</h3>
          <p style="color: #4B5563; margin-bottom: 1.5rem; line-height: 1.5; white-space: pre-line;">${message}</p>
          <button class="btn btn--primary" style="width: 100%;" id="popupOkBtn">OK</button>
        </div>
      `;
      document.body.appendChild(popup);
      document.body.style.overflow = 'hidden';

      return new Promise(resolve => {
        document.getElementById('popupOkBtn').addEventListener('click', () => {
          popup.remove();
          document.body.style.overflow = '';
          resolve();
        });
      });
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const isNameValid = validateField(fields.name);
      const isEmailValid = validateField(fields.email);
      const isPhoneValid = validateField(fields.phone);
      const isServiceValid = validateField(fields.service);
      const isDateValid = validateField(fields.date);
      const isTimeValid = validateField(fields.time);
      const isRadioValid = validateRadio();

      if (isNameValid && isEmailValid && isPhoneValid && isServiceValid && isDateValid && isTimeValid && isRadioValid) {
        const submitBtn = form.querySelector('.consultation-form__submit');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const payload = {
          fullName: formData.get('name') || '',
          email: formData.get('email') || '',
          phone: formData.get('phone') || '',
          company: formData.get('company') || '',
          country: formData.get('country') || '',
          service: formData.get('service') || '',
          consultationMode: formData.get('consultation_mode') || '',
          preferredDate: formData.get('date') || '',
          preferredTime: formData.get('time_slot') || '',
          message: formData.get('notes') || ''
        };

        // Note: For production, switch to: 'https://automation.bapaconsultancy.com/webhook/appointment'
        const webhookUrl = 'http://localhost:5678/webhook-test/appointment';

        try {
          console.log('Before fetch');
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          console.log('After fetch completes');

          const data = await response.json();
          console.log('After response.json()');

          if (data.success) {
            console.log('Before showing popup');
            showPopup('Appointment Request Submitted', 'Thank you for contacting BAPA Consultancy.\n\nYour consultation request has been submitted successfully.\nOur team will review your request and contact you shortly.')
              .then(() => {
                console.log('After popup closes');
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
              });
          } else {
            const errorMsg = data.errors ? (Array.isArray(data.errors) ? data.errors.join('\n') : JSON.stringify(data.errors, null, 2)) : 'Validation failed.';
            console.log('Before showing popup');
            showPopup('Submission Failed', errorMsg, false).then(() => {
              console.log('After popup closes');
            });
          }
        } catch (error) {
          console.log('Inside catch');
          console.log('Before showing popup');
          showPopup('Connection Error', 'Unable to connect to our booking system.\nPlease try again later.', false).then(() => {
            console.log('After popup closes');
          });
        } finally {
          console.log('Inside finally');
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }
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
  // 7. Welcome Popup — Production Logic
  // -----------------------------------------------------------------------

  // ── Development override ──
  // Set to false for production.
  // When true: ignores all storage — popup appears on every page refresh.
  // When false: session-based tracking (once per session) + 7-day localStorage for checkbox.
  const DEV_MODE = true;

  const POPUP_STORAGE_KEY = 'bapa_welcome_popup';
  const POPUP_SESSION_KEY = 'bapa_popup_shown';
  const POPUP_DELAY_MS = 900;
  const POPUP_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  let popupOpen = false;
  let previousActiveElement = null;

  // Scrollbar width cache (computed once)
  let scrollbarWidth = 0;

  const getScrollbarWidth = () => {
    if (scrollbarWidth > 0) return scrollbarWidth;
    scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    return scrollbarWidth;
  };

  const lockBodyScroll = () => {
    const sbw = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = sbw + 'px';
  };

  const unlockBodyScroll = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const shouldShowPopup = () => {
    if (DEV_MODE) {
      return true;
    }

    try {
      // Priority 1: 7-day localStorage suppression (checkbox checked)
      const stored = localStorage.getItem(POPUP_STORAGE_KEY);
      if (stored) {
        const timestamp = parseInt(stored, 10);
        if (!isNaN(timestamp) && Date.now() - timestamp <= POPUP_EXPIRY_MS) {
          return false;
        }
      }

      // Priority 2: Already shown this session (normal close)
      if (sessionStorage.getItem(POPUP_SESSION_KEY)) {
        return false;
      }

      // Priority 3: Show popup
      return true;
    } catch {
      // Storage unavailable (private browsing, etc.)
      return true;
    }
  };

  const setPopupDismissed = () => {
    try {
      localStorage.setItem(POPUP_STORAGE_KEY, String(Date.now()));
      sessionStorage.setItem(POPUP_SESSION_KEY, '1');
    } catch {
      // Silently fail
    }
  };

  const setPopupShownSession = () => {
    try {
      sessionStorage.setItem(POPUP_SESSION_KEY, '1');
    } catch {
      // Silently fail
    }
  };

  const resetPopupState = () => {
    try {
      localStorage.removeItem(POPUP_STORAGE_KEY);
      sessionStorage.removeItem(POPUP_SESSION_KEY);
      console.log('[BAPA Popup] State reset — popup will appear on next page load');
    } catch {
      // Silently fail
    }
  };

  const getFocusableElements = (container) => {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'textarea:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const elements = container.querySelectorAll(selectors.join(','));
    return Array.from(elements).filter(
      (el) => el.offsetParent !== null // visible
    );
  };

  const openPopup = (popup) => {
    if (!popup || popupOpen) return;
    popupOpen = true;

    // Store currently focused element
    previousActiveElement = document.activeElement;

    // Show popup
    popup.classList.add('welcome-popup--visible');
    popup.setAttribute('aria-hidden', 'false');

    // Lock background scroll
    lockBodyScroll();

    // Focus first focusable element inside popup
    requestAnimationFrame(() => {
      const focusable = getFocusableElements(popup);
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    });
  };

  const closePopup = (popup) => {
    if (!popup || !popupOpen) return;
    popupOpen = false;

    // Hide popup
    popup.classList.remove('welcome-popup--visible');
    popup.setAttribute('aria-hidden', 'true');

    // Unlock background scroll
    unlockBodyScroll();

    // Restore focus to previous element
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
    previousActiveElement = null;
  };

  const initWelcomePopup = () => {
    const popup = document.querySelector('.welcome-popup');
    if (!popup) return;

    // ── Expose dev helper globally ──
    if (DEV_MODE) {
      window.resetPopup = resetPopupState;
    }

    // ── Check display conditions ──
    if (!shouldShowPopup()) return;

    // ── Show popup after delay ──
    let showTimer = setTimeout(() => {
      openPopup(popup);
    }, POPUP_DELAY_MS);

    // ── Close button (session-only, not 7-day) ──
    const closeBtn = popup.querySelector('[data-welcome-close]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        setPopupShownSession();
        closePopup(popup);
      });
    }

    // ── ESC key (session-only, not 7-day) ──
    const handleKeydown = (e) => {
      if (e.key === 'Escape' && popupOpen) {
        setPopupShownSession();
        closePopup(popup);
        return;
      }

      // Focus trap: Tab and Shift+Tab
      if (e.key === 'Tab' && popupOpen) {
        const focusable = getFocusableElements(popup);
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    // ── Outside click (overlay, session-only) ──
    popup.addEventListener('click', (e) => {
      if (e.target === popup && popupOpen) {
        setPopupShownSession();
        closePopup(popup);
      }
    });

    // ── Dismiss checkbox ──
    const checkbox = popup.querySelector('[data-welcome-dismiss]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          setPopupDismissed();
        }
      });
    }

    // ── Pause/resume timer on tab visibility change ──
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && !popupOpen) {
        clearTimeout(showTimer);
        showTimer = null;
      } else if (!document.hidden && !popupOpen && !showTimer) {
        showTimer = setTimeout(() => {
          openPopup(popup);
        }, POPUP_DELAY_MS);
      }
    });

    // ── Cleanup on navigate ──
    window.addEventListener('beforeunload', () => {
      clearTimeout(showTimer);
      unlockBodyScroll();
    });
  };

  // -----------------------------------------------------------------------
  // 8. Client Success Page — Interactive Elements
  // -----------------------------------------------------------------------

  const initClientSuccessGallery = () => {
    const lightbox = document.getElementById('csLightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.cs-lightbox__img') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.cs-lightbox__close') : null;
    const galleryItems = document.querySelectorAll('.cs-gallery__item');

    if (!lightbox || !lightboxImg) return;

    // Open lightbox on image click
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('cs-lightbox--visible');
          lightbox.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    const closeLightbox = () => {
      lightbox.classList.remove('cs-lightbox--visible');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('cs-lightbox__overlay')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('cs-lightbox--visible')) {
        closeLightbox();
      }
    });
  };

  const initClientSuccessVideos = () => {
    const modal = document.getElementById('csVideoModal');
    const modalClose = modal ? modal.querySelector('.cs-video-modal__close') : null;
    const videoCards = document.querySelectorAll('.cs-video-card');

    if (!modal) return;

    // Open modal on video card click
    videoCards.forEach((card) => {
      card.addEventListener('click', () => {
        modal.classList.add('cs-video-modal--visible');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    const closeModal = () => {
      modal.classList.remove('cs-video-modal--visible');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('cs-video-modal__overlay')) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('cs-video-modal--visible')) {
        closeModal();
      }
    });
  };

  const initClientSuccessLoadMore = () => {
    // Load More Reviews
    const loadReviewsBtn = document.getElementById('csLoadMoreReviews');
    if (loadReviewsBtn) {
      loadReviewsBtn.addEventListener('click', () => {
        // Placeholder: Future integration with Google Reviews API
        loadReviewsBtn.textContent = 'No More Reviews';
        loadReviewsBtn.disabled = true;
        loadReviewsBtn.style.opacity = '0.5';
        loadReviewsBtn.style.cursor = 'not-allowed';
      });
    }

    // Load More Photos
    const loadPhotosBtn = document.getElementById('csLoadMorePhotos');
    if (loadPhotosBtn) {
      loadPhotosBtn.addEventListener('click', () => {
        // Placeholder: Future integration
        loadPhotosBtn.textContent = 'No More Photos';
        loadPhotosBtn.disabled = true;
        loadPhotosBtn.style.opacity = '0.5';
        loadPhotosBtn.style.cursor = 'not-allowed';
      });
    }

    // Load More Videos
    const loadVideosBtn = document.getElementById('csLoadMoreVideos');
    if (loadVideosBtn) {
      loadVideosBtn.addEventListener('click', () => {
        // Placeholder: Future integration
        loadVideosBtn.textContent = 'No More Videos';
        loadVideosBtn.disabled = true;
        loadVideosBtn.style.opacity = '0.5';
        loadVideosBtn.style.cursor = 'not-allowed';
      });
    }
  };

  const initClientSuccessCounters = () => {
    const counters = document.querySelectorAll('.cs-achievement-card__count');
    if (!counters.length) return;

    let animationStarted = false;

    const animateCounters = () => {
      if (animationStarted) return;
      animationStarted = true;

      counters.forEach((el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 1200;
        const startTime = performance.now();

        const update = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);

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

      const section = document.querySelector('.cs-achievements');
      if (section) {
        observer.observe(section);
      }
    } else {
      animateCounters();
    }
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
    initWelcomePopup();
    initClientSuccessGallery();
    initClientSuccessVideos();
    initClientSuccessLoadMore();
    initClientSuccessCounters();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { init };
})();
