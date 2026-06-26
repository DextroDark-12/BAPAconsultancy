# BAPA Consultancy — Project Context

## Version 0.6 — Homepage Architecture Locked

## Overview

Premium consultancy website for BAPA Consultancy — warm, clean, trustworthy, and approachable. Modernized version of the client's existing brand identity. Not a dark luxury law-firm aesthetic.

## Tech Stack

- **HTML** — Semantic markup, ARIA-friendly
- **CSS** — Vanilla, mobile-first, CSS custom properties
- **JavaScript** — Vanilla ES6+, no frameworks

## Final Design Direction

Brand direction is finalized.

This website is **NOT** following a dark luxury law-firm aesthetic.

Final design direction:
- Corporate professional
- Trustworthy
- Competent
- Clear
- Regulatory expertise
- Not luxury
- Not overly marketing-heavy

We are preserving BAPA's existing brand colors from live website.

### Final Brand Palette

```css
:root {
  --primary-blue: #223A8F;
  --deep-blue:    #162A68;
  --accent-orange:#E68A1F;
  --bg-cream:     #F4EBDD;
  --bg-soft:      #FFF8F0;
  --white:        #FFFFFF;
  --text-dark:    #1E1E1E;
  --muted-text:   #5C5C5C;
}
```

Usage ratio:
- 70% cream / white
- 25% blue
- 5% orange accents

**Important:** We use ONLY colors from BAPA's existing brand identity. Do not drift into dark navy + gold theme.

## Typography

- **Headings:** Playfair Display (serif) — weight 400–700
- **Body:** Inter (sans-serif) — weight 300–600
- **System fallback stack** included

## Design Principles

- Mobile-first responsive (breakpoints: 768px, 1024px, 1280px)
- No gradients anywhere
- Subtle shadows only (no heavy box-shadows)
- Spacing uses `rem` / `clamp()` for fluid scaling
- Orange used sparingly — no more than 5% of any viewport

## CSS Architecture

All styles live in `styles.css` in this order:
1. `:root` variables (colours, fonts, spacing scale)
2. CSS reset / base
3. Utility classes (`.container`, `.sr-only`, `.btn`, spacing helpers)
4. Base typography (`h1`–`h3` via `clamp()`)
5. Hero Section
6. Services Section ("What We Do" — 3 card grid)
7. Trust Section ("Why Businesses Trust BAPA" — 4 card grid)
8. Who We Serve Section ("Who We Serve" — split layout)
9. Social Proof / Testimonials Section
10. CTA Banner — Full-Width
11. Global Header & Navigation — Transparent → Cream Glass on Scroll
12. Global Footer

## Final Homepage Structure

1. Navbar
2. Hero
3. About BAPA _(pending)_
4. What We Do / Services Strip
5. Why Choose Us
6. Who We Serve
7. Testimonials
8. CTA Banner
9. Footer

### About Section (Locked)

**Position:** Immediately after Hero

**Layout:**
Desktop:
- Left column → company intro
- Right column → stats cards

Mobile:
- Stacked layout

**Stats:**
- 100+ Tax Filings
- 250+ Businesses Served
- 4+ Countries Served
- Advocate-Led Expertise

## Sections Built (v0.6.0)

### Hero (#hero)
- Light cream (`--bg-cream`) background
- CSS-only subtle diagonal blue pattern overlay
- **Badge:** "ACCOUNTING • TAX • KPO" — pill shape, uppercase, subtle corporate styling
- **Headline:** "Precision in Accounting." / "Confidence in Compliance." — intentional 2-line with `<br>` break
- **Subheadline:** Advocate-backed accounting, tax consultancy, and global KPO services helping businesses operate with financial clarity and regulatory confidence.
- **CTA:** Explore Services (primary orange) + Book Consultation (outline orange)
- **Style:** Corporate professional — NOT luxury, NOT marketing-heavy

### Services (#services)
- "What We Do" section on `--bg-soft` background
- 3 `<article>` cards: Accounting & Bookkeeping, Tax Consultancy, KPO Services
- Each card: inline SVG icon, heading, description, animated "Learn More" link
- Grid: 1 column → 3 columns at 768px
- Hover: `translateY(-4px)` + subtle shadow elevation

### Who We Serve (#who-we-serve)
- "Who We Serve" section on `--bg-cream` background
- Split layout: Indian Businesses + International Clients
- Blue-bordered premium cards with list items

### Trust (#trust)
- "Why Businesses Trust BAPA" with 4 trust cards
- Grid: 1 column → 2 columns (768px) → 4 columns (1024px)

### Social Proof / Testimonials (#testimonials)
- Stats row: 100+ Tax Filings, 250+ Businesses Served, 4+ Countries Served
- 3 testimonial cards with 5-star ratings and placeholders

### CTA Banner
- Full-width blue banner with heading and two CTA buttons

## Final Navbar Behavior

### Desktop
- Left: Logo
- Center: Navigation links (Home, Services, Who We Serve, Why Trust Us, Testimonials, Contact)
- Right: "Book Consultation" CTA button (filled orange, 48px height, 12px radius)

### Scroll Behavior
**Top of page:**
- Transparent background
- No shadow
- Overlays hero

**Scrolled (~60px):**
- `background: rgba(244, 235, 221, 0.92);`
- `backdrop-filter: blur(12px);`
- `box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);`
- Smooth 300ms transition
- No flicker, no layout shift

**Status:** Scroll behavior is working correctly.

### Mobile
- Right-side sliding drawer (320px)
- Overlay backdrop
- Close on: overlay click, nav link click, close button, Escape key

### Logo Decision
**Navbar:** Use ONLY `navbar-logo.png`.

**Important audit finding:** Current logo asset contained 95.3% transparent empty space. Root cause was asset export, not navbar CSS. The image was cropped from 1024×1536 → 462×362 px to remove excess padding. CSS height set to 48px mobile / 56px desktop.

**Do NOT redesign navbar for logo size.**

## Contact Page Decision

### Phase 1 (Current)
- Frontend only
- Form behavior: JS validation, fake submit, success toast
- No backend yet
- n8n integration later

### Future Automation

Book Consultation CTA will eventually connect to n8n workflow:
Website Form → Webhook → n8n → Google Sheets / CRM → WhatsApp Alert → Email Confirmation → Calendar Booking

## Services Page Architecture (Locked)

### Hero
- Title: Our Services
- Subtitle: Comprehensive accounting, taxation, and outsourcing solutions tailored for modern businesses.

### Categories

**1. Accounting & Bookkeeping**
- SOP-Based Accounting
- Financial Statement Preparation
- Payroll Processing
- Bank Reconciliation

**2. Tax Consultancy**
- GST Registration & Returns
- Income Tax Filing
- TDS Compliance
- Tax Planning & Advisory

**3. KPO Services**
- Outsourced Bookkeeping
- Management Accounts
- AP/AR Management
- Virtual CFO Services

**Extra section:** Why Outsource to BAPA? → YES

## File Structure

```
/
├── index.html                         # Entry point — all sections
├── styles.css                         # All styles (12 sections)
├── script.js                          # Scroll header + mobile drawer logic
├── navbar-logo.png                    # Navbar logo (cropped 462×362)
├── Screenshot 2026-06-25 182430.png   # Old logo (still used in footer)
├── PROJECT_CONTEXT.md                 # This file
├── CHANGELOG.md                       # Version history
└── NEXT_SESSION.md                    # Carry-over notes
```
