# Changelog

## [0.3.0] — 2026-06-25

### Added

- **Services Section ("What We Do")** — 3 premium service cards: Accounting & Bookkeeping, Tax Consultancy, KPO Services
  - Each card includes inline SVG icon, Playfair Display heading, description, and animated "Learn More" arrow link
  - Mobile-first grid: 1 column → 3 columns at 768px
  - Off-white (`--off-white`) section background
  - Subtle hover elevation: `translateY(-4px)` + `--shadow-md`
  - Gold icon color, uppercase link with arrow slide animation

### Changed

- Section numbering in `styles.css` updated: Services → 6, Header → 7, Footer → 8

---

## [0.2.0] — 2026-06-25

### Added

- **Hero Section** — Full-viewport hero with premium law-firm aesthetic
  - `min-height: 70vh` with flexbox centering
  - Deep navy (`--navy`) background with CSS-only subtle diagonal pattern overlay (`repeating-linear-gradient` at 1.2% opacity)
  - "Trusted Counsel" tagline badge with gold border
  - Playfair Display heading with gold-accented second line
  - Inter subheading at 300 weight for refined readability
  - Two CTA buttons: "Explore Services" (gold primary) and "Get in Touch" (outline)
  - Hero-specific button hover overrides to prevent disappearing on navy background

### Fixed

- Undefined `--space-10` CSS variable → replaced with `--space-8`
- Section numbering drift in `styles.css` comments
- Primary button hover invisibility on navy hero background

---

## [0.1.0] — 2026-06-25

### Added

- Project scaffold with `index.html`, `styles.css`, `script.js`
- Mobile-first CSS reset and custom properties (`--navy`, `--gold`, `--white`, `--off-white`)
- Playfair Display + Inter font integration
- Base HTML skeleton with semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- Documentation files: `PROJECT_CONTEXT.md`, `CHANGELOG.md`, `NEXT_SESSION.md`
