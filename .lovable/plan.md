# Mary's Hair Salon — Implementation Plan

## Approach

You asked for a 100% static site deployable to GitHub Pages (HTML/CSS/JS only, no backend). This project is currently a TanStack Start (SSR React) template, which is the opposite of what you need.

The cleanest path: build the site as a standalone static bundle inside `public/salon/` (plain `index.html`, `styles.css`, `script.js`, `images/`). That folder can be lifted directly into any GitHub Pages repo — just copy its contents to the repo root and push. I'll also point the app's root route at it so you can preview it live here.

If you'd rather I convert the whole project away from TanStack and ship only the static files at the repo root, say the word and I'll restructure instead.

## Sections (single-page, anchor nav)

1. Sticky nav + mobile hamburger
2. Hero — full-bleed image, headline, sub, Call + WhatsApp CTAs, hours strip, social proof
3. About
4. Services — 10 cards with icons + prices + "Call To Discuss Your Style" CTA
5. Hair Extensions — feature list, before/after pair, "Book A Consultation" CTA
6. Gallery — 12-image responsive grid with lightbox (prev/next, keyboard, swipe, ESC)
7. Why Choose Us — 4 feature cards
8. Reviews — 3 testimonials with 5-star ratings
9. Contact — hours table, phone, WhatsApp, address, socials, Google Maps embed (Shirley Road, Southampton)
10. Footer
11. Floating WhatsApp button (fixed bottom-right, all breakpoints)

## Design

- Palette: primary `#C89B6D`, secondary `#F8F2EC`, accent `#2B2B2B`, bg `#FFFFFF`
- Type: Cormorant Garamond (display) + Inter (body) via Google Fonts `<link>`
- Generous spacing, 16–24px radii, soft shadows, subtle fade/slide-in on scroll via IntersectionObserver
- Mobile-first CSS with `min-width` breakpoints at 640 / 900 / 1200
- Lazy-loaded images (`loading="lazy"`), `prefers-reduced-motion` respected

## Config block (top of `script.js`)

```js
const SALON = {
  phone: "+44 0000 000000",           // TODO replace
  whatsapp: "+447700900000",          // placeholder as requested
  address: "Shirley Road, Southampton, United Kingdom",
  instagram: "https://www.instagram.com/marys_hair_salon__/",
  facebook: "https://www.facebook.com/MandMsouthampton/",
  hours: { Mon: "9:00–19:00", ... }
};
```

Gallery images live in an array and each `<img>` has a `<!-- REPLACE: /images/gallery/01.jpg -->` comment above it.

## Images

Stock hero + gallery placeholders generated via the image tool and saved to `public/salon/images/`. Every replaceable image is commented in the HTML.

## SEO / metadata

- `<title>`, meta description, canonical, Open Graph + Twitter card
- JSON-LD `HairSalon` schema with hours, address, geo, telephone, sameAs (IG/FB)
- Semantic HTML (`<header> <main> <section> <footer>`), single `<h1>`

## Missing info (using placeholders — please provide when ready)

1. Real phone number (currently `+44 0000 000000` placeholder)
2. Confirmed WhatsApp number (using `+44 7700 900000` per your brief — this is Ofcom's reserved test range, safe as placeholder)
3. Full street address + postcode (only "Shirley Road" given — Maps embed uses that + Southampton)
4. Real salon photos (stock placeholders used, all clearly marked)
5. Real customer names/photos for reviews (using first-name initials)
6. Preferred email address, if any
7. Logo file (I'll set a wordmark; swap in a logo image later)

## Deployment note

To publish: copy everything inside `public/salon/` to the root of a new GitHub repo, enable Pages on `main` / root. Done — no build step.
