# EventPro Seating — website

Pitch build for [eventproseating.com](https://eventproseating.com): Next.js 16 + Tailwind v4 +
framer-motion, deploy-ready on Vercel.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (also runs type-check)
npm run lint
```

## Pages

| Route | What's there |
| --- | --- |
| `/` | Logo-reveal splash (once per session), animated hero, stats counters, product lineup, "How to profit" grid with the original icons, scroll-drawn process timeline, gallery with lightbox, proof band, blog teaser, CTA |
| `/products/3-row-bleachers`, `/products/10-row-bleachers`, `/products/event-deck` | Product pages: hero, key numbers, features, use cases, spec table, gallery, related products |
| `/sales` | Rent vs. Buy toggle, interactive seating planner (capacity + setup time, sends config to the form), territory program, purchase process, FAQ |
| `/about` | Story, timeline, values, HQ, full FAQ accordion (`/about#faq`) |
| `/blog`, `/blog/[slug]` | All 15 articles from the current blog, with headings, dates, categories, and author |
| `/contact` | Quote form (pre-fills from planner/product links) → `/api/quote` |

Plus `/sitemap.xml`, `/robots.txt`, schema.org LocalBusiness JSON-LD, OpenGraph tags, custom 404.

## Photos and logo

All photography and the logo were pulled from the current eventproseating.com (Squarespace) site,
normalized to 1800px JPEGs, and placed in `public/images`. Slots are mapped in `lib/assets.ts`;
`components/Photo.tsx` renders a labeled placeholder for any slot whose file is missing, so you can
swap or add photos by file name with no code changes.

```
public/
  logo.png                      full logo (mark + wordmark), used on dark backgrounds (splash, footer)
  logo-mark@2x.png              EPS mark only, used in the nav
  images/og.jpg                 1200×630 social share image
  images/home/                  hero, about, gallery-1…6
  images/products/3-row/        hero, gallery-1…4, trailer-1…4 (3×3 Row trailer variant)
  images/products/10-row/       hero, gallery-1…6
  images/products/event-deck/   hero, gallery-1…6
  images/about/                 team (manufacturing floor), facility (full lineup)
  images/sales/                 fleet, all-products
  images/blog/<slug>.jpg        one per post (15 posts ported from the live blog)
  images/icons/                 the five "How to profit" icons from the current homepage
```

## Brand

- Colors: `app/globals.css` `:root` block. Accent orange `#f1a638` and sand `#e7d1b5` are the exact values from the current site's theme CSS.
- Fonts: `app/layout.tsx` (Manrope body, Inter Tight display).
- Copy, nav, contact, SEO: `lib/site.ts`. Products + specs (from the live product pages): `lib/products.ts`.
  Stats, profit points, proof, FAQ, timeline: `lib/content.ts`. Blog posts (ported verbatim): `lib/posts.ts`.

> Product specs, dimensions, and blog copy come straight from the current site. The FAQ, process,
> and timeline copy are new and should be read over by the client before launch.

## Motion

- `components/Splash.tsx` — plays once per browser session (`sessionStorage`), click to skip,
  disabled for `prefers-reduced-motion`.
- `components/BleacherIllustration.tsx` — SVG bleacher / event deck that assembles row by row.
- `app/template.tsx` — page transitions. `components/ScrollProgress.tsx` — top progress bar.
- `Reveal`, `Counter`, `ProcessSteps`, `Gallery`, `FAQ`, `RentBuy`, `Configurator` are the interactive pieces.

## Deploy to Vercel

1. Push to GitHub, import the repo in Vercel (framework auto-detects Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://eventproseating.com` or the preview URL).
3. Optional: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` so the quote form emails the
   client. Without them the form still succeeds and logs to the function console.
4. Add the domain when the client signs off.
