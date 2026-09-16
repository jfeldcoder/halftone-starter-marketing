# EventPro Seating — website redesign

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
| `/` | Logo-reveal splash (once per session), animated hero with row-by-row bleacher build, stats counters, product lineup, "why" bento, scroll-drawn process timeline, gallery with lightbox, rotating testimonials, blog teaser, CTA |
| `/products/3-row-bleachers`, `/products/10-row-bleachers`, `/products/event-deck` | Product pages: hero, key numbers, features, use cases, spec table, gallery, related products |
| `/sales` | Rent vs. Buy toggle, interactive seating planner (capacity + setup time, sends config to the form), territory program, purchase process, FAQ |
| `/about` | Story, timeline, values, HQ, full FAQ accordion (`/about#faq`) |
| `/blog`, `/blog/[slug]` | Four articles ported from the current site's topics |
| `/contact` | Quote form (pre-fills from planner/product links) → `/api/quote` |

Plus `/sitemap.xml`, `/robots.txt`, schema.org LocalBusiness JSON-LD, OpenGraph tags, custom 404.

## Dropping in the real photos

Every photo on the site is a **slot**. If the file exists under `public/`, it renders; if not, a
labeled placeholder shows the exact path to drop the file into. No code changes needed.

```
public/
  logo-mark.svg                 EPS mark (vector rebuild of the client logo; swap if you have the source file)
  logo.svg                      full logo with wordmark
  images/
    og.jpg                      1200×630 social share image
    home/hero.jpg               hero photo (5:4). Until it exists, the animated SVG bleacher shows instead
    home/about.jpg              operator deploying a unit (4:3)
    home/gallery-1.jpg … gallery-6.jpg
    products/3-row/hero.jpg + gallery-1.jpg … gallery-4.jpg
    products/10-row/hero.jpg + gallery-1.jpg … gallery-4.jpg
    products/event-deck/hero.jpg + gallery-1.jpg … gallery-4.jpg
    about/team.jpg (4:5)  about/facility.jpg (4:3)
    sales/fleet.jpg (4:5)
    blog/territory.jpg  blog/safety.jpg  blog/experience.jpg  blog/why.jpg (16:10)
```

The manifest lives in `lib/assets.ts`. `components/Photo.tsx` does the exists-check on the server.

## Brand

- Colors: `app/globals.css` `:root` block. Accent orange `#f4a62a` and sand `#e9d3b0` are sampled from the logo.
- Fonts: `app/layout.tsx` (Manrope body, Inter Tight display).
- Copy, nav, contact, SEO: `lib/site.ts`. Products + specs: `lib/products.ts`. FAQ, testimonials,
  timeline, blog posts: `lib/content.ts`.

> Specs and testimonials are drafted from the current site and public listings. Confirm exact
> figures and get real quotes from the client before launch.

## Motion

- `components/Splash.tsx` — plays once per browser session (`sessionStorage`), click to skip,
  disabled for `prefers-reduced-motion`.
- `components/BleacherIllustration.tsx` — SVG bleacher that assembles row by row (used until photos land).
- `app/template.tsx` — page transitions. `components/ScrollProgress.tsx` — top progress bar.
- `Reveal`, `Counter`, `ProcessSteps`, `Gallery`, `Testimonials`, `FAQ`, `RentBuy`, `Configurator` are
  the interactive pieces.

## Deploy to Vercel

1. Push to GitHub, import the repo in Vercel (framework auto-detects Next.js).
2. Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://eventproseating.com` or the preview URL).
3. Optional: `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` so the quote form emails the
   client. Without them the form still succeeds and logs to the function console.
4. Add the domain when the client signs off.
