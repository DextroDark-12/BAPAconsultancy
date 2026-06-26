# BAPA Consultancy — Project Context

## Overview

Premium consultancy website for BAPA Consultancy — warm, clean, trustworthy, and approachable. Modernized version of the client's existing brand identity. Not a dark luxury law-firm aesthetic.

## Tech Stack

- **HTML** — Semantic markup, ARIA-friendly
- **CSS** — Vanilla, mobile-first, CSS custom properties
- **JavaScript** — Vanilla ES6+, no frameworks

## Updated Design Direction (v0.5)

Brand direction is finalized.

This website is **NOT** following a dark luxury law-firm aesthetic anymore.

Final design direction:
- Warm premium consultancy
- Clean
- Trustworthy
- Professional
- Approachable
- Modernized version of client's existing brand identity

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
11. Global Header & Navigation — Transparent → Solid on Scroll
12. Global Footer

## Sections Built (v0.5.0)

### Hero (#hero)
- Light cream (`--bg-cream`) background
- CSS-only subtle diagonal blue pattern overlay
- "Trusted Counsel" tagline badge with blue border
- Playfair Display heading with orange accent
- Inter subheading, two CTA buttons (Explore Services, Get in Touch)

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

## Navbar Architecture

Desktop:
- Left: Logo
- Center: Navigation links (Home, Services, Who We Serve, Why Trust Us, Testimonials, Contact)
- Right: "Book Consultation" CTA button (filled orange, 48px height, 12px radius)

Behavior:
- Transparent over hero
- Solid primary-blue on scroll
- Subtle shadow
- Smooth 300ms transition

Mobile:
- Right-side sliding drawer (320px)
- Overlay backdrop
- Close on: overlay click, nav link click, close button, Escape key

## File Structure

```
/
├── index.html                         # Entry point — all sections
├── styles.css                         # All styles (12 sections)
├── script.js                          # Scroll header + mobile drawer logic
├── Screenshot 2026-06-25 182430.png   # Logo image (temporary — needs replacement)
├── PROJECT_CONTEXT.md                 # This file
├── CHANGELOG.md                       # Version history
└── NEXT_SESSION.md                    # Carry-over notes
```

## Future Automation

Book Consultation CTA will eventually connect to n8n workflow:
Website Form → Webhook → n8n → Google Sheets / CRM → WhatsApp Alert → Email Confirmation → Calendar Booking
