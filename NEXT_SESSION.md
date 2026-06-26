# Next Session — Carryover Notes

## Current Status (v0.6)

| Section         | Status      | Details                                    |
|-----------------|-------------|--------------------------------------------|
| Navbar          | ✅ Built    | Transparent→cream glass scroll, logo fixed  |
| Hero            | ✅ Built    | Corporate professional copy, locked        |
| Services        | ✅ Built    | 3 premium cards, soft bg                   |
| Who We Serve    | ✅ Built    | Split layout, cream bg                     |
| Trust           | ✅ Built    | 4 trust cards, grid layout                 |
| Testimonials    | ✅ Built    | Stats row + 3 testimonial placeholders     |
| CTA Banner      | ✅ Built    | Full-width blue, two CTAs                  |
| Footer          | ✅ Built    | Rich 4-col grid, contact, legal            |
| **About**       | ❌ Pending  | Goes after Hero — layout locked            |
| **Contact Page**| ❌ Pending  | Phase 1: frontend only, JS validation      |
| **Services Page**| ✅ Built    | 3 service categories + Why Outsource, hero, CTA  |

## Ready to Build (Next Priority)

### 1. About Section (Highest Priority)

- Goes immediately after Hero on homepage
- Desktop: left column (company intro) + right column (stats cards)
- Mobile: stacked layout
- Stats: 100+ Tax Filings, 250+ Businesses Served, 4+ Countries Served, Advocate-Led Expertise

### 2. Contact Page (Phase 1)

- Frontend only — no backend
- Form behavior: JS validation, fake submit, success toast
- n8n integration later

## Logo Reminder

- Navbar: `navbar-logo.png` (cropped 462×362)
- Footer: still uses `Screenshot 2026-06-25 182430.png` — should be updated to same asset

## Technical Reminders

- All new section styles go into `styles.css` under a matching section comment
- Use `clamp()` for fluid type sizes
- Orange on no more than ~5% of any viewport
- No gradients
- Test at 375px, 768px, 1024px, 1280px
- New sections should be mobile-first, single-column → multi-column at 768px
