# Changelog

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
