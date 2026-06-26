# Next Session — Carryover Notes

## Current Status

| Section       | Status      | Details                          |
|---------------|-------------|----------------------------------|
| Hero          | ✅ Built    | Navy bg, diagonal overlay, CTAs  |
| Services      | ✅ Built    | 3 premium cards, off-white bg    |
| Header/Nav    | 🟡 Partial  | Sticky, text logo, mobile toggle |
| Footer        | 🟡 Partial  | Grid layout, legal placeholders  |
| **About**     | ❌ Pending  | Empty placeholder                |
| **Expertise** | ❌ Pending  | Empty placeholder                |
| **Contact**   | ❌ Pending  | Empty placeholder                |

## Ready to Build (Next Priority)

- [ ] **About section** — Firm story, credibility markers, advocate credentials
- [ ] **Contact section** — Form fields or CTA block with contact details
- [ ] **Expertise / Stats strip** — Metrics or practice areas between services and about
- [ ] **Navigation refinements** — Right-side sliding drawer, backdrop overlay, transparent→solid on scroll
- [ ] **Footer polish** — Add social links, phone, email, address

## Design Details to Decide

- Contact form fields vs. "Get in Touch" button linking to email/WhatsApp
- Whether to include a testimonials / case-studies section
- Whether to add an FAQ accordion section

## Technical Reminders

- All new section styles go into `styles.css` under a matching section comment
- Use `clamp()` for fluid type sizes
- Gold (`--gold`) on no more than ~15% of any viewport
- No gradients — stick to solid colour blocks (hero diagonal pattern is the only exception)
- Test at 375px, 768px, 1024px, 1280px
- New sections should be mobile-first, single-column → multi-column at 768px
