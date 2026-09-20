# 22 Constanzaa — Restaurant Website MVP

A premium single-page-experience website for **22 Constanzaa**, a Mediterranean & Middle Eastern restaurant in Alwarpet / Abhiramapuram, Chennai.

Design concept: **“The Table of 22”** — a warm, architectural, claymorphic digital dining room in the restaurant's own visual language (ivory, terracotta, olive, brass).

The client-supplied **22 Constanzaa logo is the only script element** on the site; all UI typography is minimal modern sans-serif (Manrope).

---

## Tech stack

| Layer | Choice |
|---|---|
| Build | Vite 6 (React 19) |
| Styling | Tailwind CSS v4 (`@theme` tokens, custom clay utilities) |
| Motion | `motion` (Framer Motion) — respects `prefers-reduced-motion` |
| Routing | React Router 7 (SPA with `/menu`, `/book`, 404) |
| Fonts | Self-hosted Manrope Variable (no CDN calls) |
| Data | Plain JS datasets (`src/data`) — no backend |

No UI kit, no icon library, no CSS framework beyond Tailwind. Production bundle ≈ **109 kB gzip JS** total.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run assets     # regenerate brand assets from brand/logo-original.png
```

## Project structure

```
src/
  components/      # Dialog, DishCard, SavedDrawer, Icon, clay primitives
    art/           # Logo (official), illustrations, compass dial, stamps
  sections/        # Hero, TableOf22, SignatureDishes, TasteCompass,
                   # MenuExperience, TheSpace, SeenAt22C, BuildYourTable,
                   # VisitSection, Header, Footer, MobileActionBar
  pages/           # HomePage, MenuPage, BookPage, NotFoundPage
  data/            # menu.js (all dishes) · restaurant.js (config)
  hooks/           # useSavedDishes (localStorage), useToast, useMediaQuery
  utils/           # match.js (Taste Compass), share.js, links.js
scripts/
  prepare-logo.mjs # brand asset pipeline (run: npm run assets)
brand/
  logo-original.png# untouched client logo (source of truth)
public/
  favicon.png      # square “22” crop from the official logo
  apple-touch-icon.png
  og.png           # 1200×630 social share banner
```

## Features

- **Hero** with CTAs (Explore the Menu / Book a Table) and Call / Directions / Instagram utilities
- **The Table of 22** — interactive flavour-plate story section
- **Signature dishes** grid with save / share / quick view
- **Taste Compass** — deterministic 3-step discovery (craving → mood → preference) scored against menu tags in `src/utils/match.js`; no AI, no network calls
- **Full menu** — search, category tabs, Veg / Chicken / Lamb / Seafood / Spicy filters, sticky bars, empty state; deep links (`/menu?dish=id`)
- **Dish detail** dialog with related dishes and “Ask about it” WhatsApp
- **My Table** — localStorage dish passport (save / remove / share / clear / bulk WhatsApp)
- **Build Your Table** — validated reservation request → **editable prefilled WhatsApp message** (no fake booking engine)
- **The Space** ambience band, **Seen at 22C** social grid with native share + copy fallback
- **Visit** section, sticky mobile action bar (MENU · BOOK · CALL · DIRECTIONS), compact footer
- **SEO**: meta/OG/Twitter tags, canonical, Restaurant JSON-LD, semantic headings
- **A11y**: focus traps in dialogs, keyboard navigation, aria labels/pressed states, reduced-motion support

## Editing content

**All dishes** live in `src/data/menu.js`; **all restaurant details** (phone, address, links, booking template) in `src/data/restaurant.js`. Unconfirmed fields are `null` and the UI hides them automatically — never invent values. Set `available: false` to hide a dish without deleting it.

## Brand assets

The official logo is processed — never redrawn — by `npm run assets`:

1. `src/assets/logo-22constanzaa.png` — transparent full logo (border flood-fill background removal; interior cream preserved)
2. `public/favicon.png` + `apple-touch-icon.png` — square crop of the “22” oval only
3. `public/og.png` — social banner compositing the official logo

To re-run against a new client file: place it at `brand/logo-original.png` (or set `LOGO_SRC=path`) and run `npm run assets`. Requires the `sharp` dev dependency (already installed).

## Deployment

Static SPA — deploy `dist/` to any static host.

**Netlify** — `public/_redirects` is included (`/* /index.html 200`). Build command `npm run build`, publish directory `dist`.

**Vercel** — `vercel.json` is included (SPA rewrite). Import the repo and deploy.

**Other hosts** — serve `dist/` and add an SPA fallback (all routes → `index.html`).

## ⚠ Requires client verification before launch

| Item | Status |
|---|---|
| Prices for every dish | `price: null` — hidden until supplied |
| Opening hours | hidden (`restaurant.hours = null`) |
| Parking / Wi-Fi info | hidden until confirmed |
| Instagram URL + handle | placeholder `@22constanzaa` — confirm |
| Google Business Profile link | using address-based Maps link — confirm preferred link |
| Final domain | `22constanzaa.in` placeholder in canonical/OG/share links |
| Hero photography | currently an original illustration — swap when approved photos arrive |
| Dish photography | illustrated plate system until approved assets exist |
| Dish descriptions | editorial drafts — need client approval |
| Dietary labels | set only where evident from dish names — confirm each |
| Soups, Salads, Combos, Flat Breads, Burgers, Drinks, Extras | categories wired, awaiting client menu data |
| Social grid content | illustrated placeholders — replace with approved images only |
