# Changelog

## [0.10.0] — 2026-06-26

### Changed

- **Top contact bar behavior** — Now `position: fixed` on desktop; smoothly slides up (`translateY(-100%)` + `opacity: 0`) and navbar transitions to `top: 0` on scroll past 60px; reappears when scrolled back to top
- **Floating WhatsApp button** — Premium Cosmo-style: multi-layer shadow, glass edge (`inset` highlight), stronger hover scale (1.08), SVG drop-shadow, 8s subtle pulse cycle
- **Footer refinement** — Increased vertical padding (`space-20`), stronger heading weight (700), link hover with `translateX(4px)` shift, improved contrast values, increased column gap

### Added

- **`initTopBar()`** JS function — Scroll handler for top bar hide/show + navbar position + dynamic `scroll-padding-top`; resize handler for mobile/desktop transitions
- **`.top-bar--hidden`** and **`.site-header--top-hidden`** CSS classes — Smooth animations without layout shift

---

## [0.9.0] — 2026-06-26

### Added

- **Global Top Contact Bar** above navbar on all 4 pages — desktop-only utility bar with Phone (left), Email (center), Working Hours (right), orange icons, subtle separators, 38px height, primary blue background
- **Design system upgrades** — New CSS custom properties: `--radius-lg` (14px), `--radius-xl` (20px), `--shadow-lg`

### Changed

- **Consultation form redesigned** — Premium inputs (56px height, 14px radius, cream background, orange focus glow, larger padding), radio selection cards (pill-style, blue border on selected, cream bg), full-width submit button (56px height, bold, hover lift)
- **FAQ accordion upgraded** — White cards with borders, 14px radius, larger chevron icons, generous padding, hover states, smooth open animation
- **WhatsApp CTA buttons standardized** — All WhatsApp buttons use official #25D366 green background with white text/icons, hover lift effect
- **WhatsApp float icon replaced** — Official WhatsApp logo (white bubble on green circle, green phone icon on white background) on all 4 pages
- **CTA banner padding reduced** — More compact full-width blue banner
- **Page hero padding adjusted** — Accounts for 38px top bar on desktop
- **Section padding reduced ~10-15%** — Tighter, more premium vertical rhythm

### Fixed

- **Navbar overlap with top bar** — `site-header` now has `top: 38px` on desktop (responsive), `scroll-padding-top` updated to 118px
- **Top bar column order** — Corrected to Phone (left), Email (center), Hours (right)
- **CTA WhatsApp hover transition** — Added `transform` to transition list for smooth lift animation

---

## [0.8.0] — 2026-06-26

### Added

- **Consultation Page** (`consultation.html`) — Full conversion page for booking free consultations
  - Page hero: "Book Your Free Consultation" with FREE CONSULTATION badge and Schedule Now CTA
  - 3-Step Booking Process: Choose Service → Select Slot → Receive Confirmation
  - Comprehensive booking form with 3 groups: Personal Information, Consultation Details, Scheduling
  - Form fields: Full Name, Email, Phone (required), Company, Country (optional), Service dropdown, Consultation Mode (radio), Preferred Date, Time Slot dropdown, Notes textarea
  - Why Book With BAPA section: 4 cards (Advocate-Led Expertise, Practical Business Guidance, Global Experience, Personalized Consultation)
  - FAQ accordion with 4 questions (duration, free, international clients, meeting format)
  - Reassurance banner: WhatsApp Now + Call Us buttons
  - Reused navbar, footer, scroll behavior

- **Floating WhatsApp button** on all 4 pages — fixed bottom-right, 64px desktop / 56px mobile, subtle 10s pulse animation

### Changed

- **CTA routing updated** across all pages — all "Book Consultation" buttons now point to `consultation.html`
  - index.html: Desktop nav CTA, hero button, mobile drawer CTA
  - services.html: Desktop nav CTA, mobile drawer CTA, CTA banner
  - contact.html: Desktop nav CTA, mobile drawer CTA, CTA banner

### Added

- **CSS sections 20-25**: Booking steps, consultation form, why book cards, FAQ accordion, reassurance banner, WhatsApp float button
- **JS additions**: initConsultationForm (validates 6 required fields + radio, sets min date, success toast with auto-dismiss, n8n-ready structure), initFaqAccordion (single-open behavior)

---

## [0.7.0] — 2026-06-26

### Added

- **Contact Page** (`contact.html`) — Full conversion page with contact form, firm info, and map
  - Page hero: "Let's Talk — We're Ready to Help" with professional subtitle
  - 2-column layout: contact form (left) + firm information card (right)
  - Form fields: Full Name, Email, Phone (required), Country (optional), Service dropdown, Message (required)
  - Form validation: real-time blur validation, required field checks, success toast with auto-dismiss
  - Info card: address, email, phone, working hours, WhatsApp CTA button
  - Google Map embed with responsive wrapper (300px mobile → 450px desktop)
  - Reused navbar, footer, CTA banner, and scroll behavior
  - Active nav state (aria-current="page") on Contact link

### Changed

- **Nav links updated** across all pages: WhatsApp fallback links replaced with `contact.html`
  - index.html: nav Contact, CTA, drawer links, hero button → contact.html
  - services.html: nav Contact, CTA, drawer links, CTA banner → contact.html

### Added

- **CSS sections 17-19**: Contact form card, info card, Google Map wrapper, success toast
- **Form validation** in `script.js`: n8n-ready structure with commented webhook fetch pattern

---

## [0.6.2] — 2026-06-26

### Changed

- **Navbar synced** across homepage and services page — identical HTML structure, logo markup, nav links, and mobile drawer

---

## [0.6.1] — 2026-06-26

### Added

- **Services Page** (`services.html`) — Full page with 3 service categories + Why Outsource section
  - Page hero: "Our Services" with centered heading and subtitle
  - Accounting & Bookkeeping (4 cards): SOP-Based Accounting, Financial Statements, Payroll, Bank Reconciliation
  - Tax Consultancy (4 cards): GST, Income Tax, TDS, Tax Planning — with path-based SVG icons
  - KPO Services (4 cards): Outsourced Bookkeeping, Management Accounts, AP/AR, Virtual CFO
  - Why Outsource to BAPA (4 value cards): Cost Efficiency, Skilled Professionals, Faster Turnaround, Scalable Support
  - Reused existing navbar, footer, CTA banner, and scroll behavior

### Fixed

- **Heading hierarchy**: "Our Services" now proper `<h1>`, subtitle is `<p>` (was inverted)
- **CSS section numbering**: Footer renumbered 12→16 for sequential numbering (11→13→14→15→16)
- **Nav anchor hack**: Removed hidden `#contact` div, all Contact links now point to `contact.html`
- **SVG text dependency**: Replaced GST/ITR/TDS `<text>` elements with font-independent path icons

---

## [0.6.0] — 2026-06-26

### Added

- **Hero copy refactored** for corporate professional tone
  - Badge: "ACCOUNTING • TAX • KPO" with pill styling
  - Headline: "Precision in Accounting. / Confidence in Compliance." — intentional 2-line
  - Subheadline: Professional trust-focused copy
  - Secondary CTA: "Book Consultation"
  - Removed unused `.hero__title-accent` and `.hero__br` CSS

### Changed

- `navbar-logo.png` cropped from 1024×1536 → 462×362 to remove 95.3% empty transparent padding
- Logo CSS height: mobile 36px→48px, desktop 48px→56px

### Fixed

- Root cause of tiny navbar logo identified: source asset had massive transparent canvas, not CSS
- Logo image now tightly cropped with 10px balanced padding, preserving RGBA

### Documentation

- PROJECT_CONTEXT.md updated to v0.6 — homepage architecture locked, final hero copy, navbar behavior, logo decision, services page architecture, contact page decision
- NEXT_SESSION.md updated with current status and next priorities

---

## [0.5.0] — 2026-06-26

### Changed

- Finalized brand direction as warm premium consultancy
- Fully moved away from dark luxury theme
- Locked final color palette based on live BAPA website
- Added Book Consultation as navbar CTA direction

---

## [0.3.0] — 2026-06-25

### Added

- **Services Section ("What We Do")** — 3 premium service cards

### Changed

- Section numbering in `styles.css` updated

---

## [0.2.0] — 2026-06-25

### Added

- **Hero Section** — Full-viewport hero

### Fixed

- Undefined `--space-10` → `--space-8`

---

## [0.1.0] — 2026-06-25

### Added

- Project scaffold
- Documentation files
