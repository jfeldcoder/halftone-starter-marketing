# EventPro Seating redesign — session handoff

Read this first if you are picking up work on this site in a new session.

## What this is

A redesign pitch site for **EventPro Seating** (eventproseating.com), a Brooksville, FL
maker of patented, USA-made mobile bleachers and event decks. The client is the user's
wife's mother's boyfriend. The current live site is Squarespace. This rebuild is a
Next.js site deployed on Vercel.

- **Repo:** `jfeldcoder/halftone-starter-marketing` (started from the Halftone marketing starter; package is now named `eventpro-seating`)
- **Working branch:** `claude/trusting-thompson-rzi9jy`
- **Production branch:** `main`. Vercel auto-deploys `main`.
- **Live preview:** https://eventpro-seating.vercel.app
- **Workflow used so far:** commit on the working branch, push, then `git checkout main && git merge --no-ff <branch> && git push origin main`. The user has approved pushing to `main`; every change so far has been merged there immediately so the preview stays current.

## Stack

Next.js 16 (App Router, Turbopack), React 19, Tailwind v4, framer-motion 12, TypeScript.
`npm run build` runs type-check; `npm run lint` is ESLint 9 with the Next config.
Node 22. Sharp is available in `node_modules` for image work.

## Design language (decided with the user, do not drift)

The user rejected the first "AI template" version (cards, chips, icon circles, stat pills,
gradient blobs). The redesign follows the visual language of the user's own
`jfeldcoder/fatboy-unisex` repo, adapted, not copied:

- **Palette from the live site:** white page ground (`--bg #ffffff`), **olive** for dark
  sections, nav, footer, splash (`--ink #344734`, the Squarespace theme's darkAccent),
  brand **orange** accent (`--accent #f1a638`, from the theme CSS), sand `#e7d1b5`.
  Near-black olive `--scrim #0f1a10` for photo overlays.
- **Type:** Barlow (uppercase display, `.type-display`), Space Mono for kickers, buttons,
  labels (`.kicker`, `.mono`), Manrope for body. Headlines end with an orange period via
  `<Dot />`.
- **Layout rules:** photos square-edged and edge-to-edge; hairline rules instead of cards;
  numbered rows (`01`, `02`) instead of icons; pill buttons in mono uppercase (`.btn`,
  `.btn-primary`, `.btn-ink`, `.btn-ghost`); no badges, chips, or circles.
- **Logo:** the real header logo pulled from the live site: `public/logo.png` (full, with
  wordmark) and `public/logo-mark@2x.png` (mark only). The nav uses the full logo at
  84px tall on desktop, centered above the link row, exactly like the live site. Never
  recreate or restyle the logo.

## Content and assets (all real, pulled from the live site)

- 58 photos from the Squarespace CDN, normalized to 1800px JPEG, under `public/images/`
  (home, products/{3-row,10-row,event-deck}, about, sales, blog, icons). Slots are
  mapped in `lib/assets.ts`; `components/Photo.tsx` renders a labeled placeholder for any
  missing file.
- Product specs, dimensions, bullets, and the 3×3 Row trailer variant: `lib/products.ts`
  (from the live product pages). 10 Row patent: US 12,084,881 B1.
- All 15 blog posts by Nick Pinto, verbatim with headings and 2025 dates: `lib/posts.ts`
  (auto-generated, safe to edit).
- Stats, "How to profit" (with the site's five icons), proof points, process, FAQ,
  timeline: `lib/content.ts`. FAQ/process/timeline copy is ours; the client should read it.
- Brand config, nav, phone (888) 404-3130, address, socials: `lib/site.ts`. The live site
  lists no public email, so `site.email` is empty.
- Share card `public/images/og.jpg` is the hero photo. Canonical URL resolves from
  `NEXT_PUBLIC_SITE_URL`, then Vercel's production domain (`lib/url.ts`).

## Pages

| Route | Notes |
| --- | --- |
| `/` | Splash → full-bleed hero (10 Row night crowd) → use-case ticker → lineup tiles → rotating photo banner (proof statements) → olive "Commitment to Excellence" (fades in/out of white) → Brooksville split → Rent-or-own split → horizontal photo reel with scrubber → "How to profit" rows → closing full-bleed CTA → latest blog |
| `/products/[slug]` | 3-row-bleachers, 10-row-bleachers, event-deck. Title, full-width photo, copy + bullets + dimensions, banner, features, (3×3 trailer section on 3 Row), specs, gallery, related, CTA |
| `/sales` | Rent/Buy tabs, interactive seating planner (`Configurator`), territory split, purchase steps, FAQ subset |
| `/about` | Story beats, HQ split, timeline, full FAQ (`#faq`) |
| `/blog`, `/blog/[slug]` | Featured + list; article with h2 blocks |
| `/contact` | Quote form → `app/api/quote/route.ts` (logs; emails via Resend if `RESEND_API_KEY` + `QUOTE_TO_EMAIL` set) |

## Key components

- `Splash.tsx` + `BleacherDrawing.tsx`: intro on **every hard load** (not on in-site
  navigation), ~3.4s hold then the olive sheet lifts. SVG bleacher draws itself stroke by
  stroke, orange planks last, then the logo wipes on, tagline, progress hairline. Click
  skips. No stick figure (user removed it). Reduced-motion skips it.
- `Nav.tsx`: transparent over the home hero, solid olive elsewhere and on scroll. Desktop:
  logo centered, links below, phone number and Get a quote button stacked far right.
- `Hero.tsx`: phones put the headline at the top and description/buttons/kicker at the
  bottom; desktop is all bottom-left.
- `SplitSection.tsx`: photo column bleeds to the edge. `heading` prop: on phones the
  kicker + title overlay the **top** of the photo and the lead overlays the **bottom**,
  details (children) go beneath; desktop keeps the copy column. `soft` prop fades the
  photo edges. Used on home (2), sales, about, product variant.
- `Banner.tsx` (rotating full-width photo statements, `soft` fades), `PhotoReel.tsx`
  (snap scroll + scrubber with arrows), `ClosingCTA.tsx`, `NumberedRows.tsx`,
  `SectionHeading.tsx` (+ `Dot`), `FAQ.tsx` (native details), `Gallery.tsx` (lightbox),
  `RentBuy.tsx`, `Configurator.tsx`, `QuoteForm.tsx`, `Reveal.tsx` (+ `Ticker`).
- `app/template.tsx`: olive route-transition curtain with the logo.

## Mobile-specific decisions (user-directed)

- Hero headline smaller on phones (3 lines).
- Every photo-with-copy block on phones: title at top of photo, description at bottom,
  details below on white. Applied to hero, split sections, product page hero, blog feature.

## How to verify changes

There is no test suite. Pattern used every time:
1. `npx tsc --noEmit && npm run lint && npm run build`
2. `npx next start -p 3100 &` then Playwright screenshots (global playwright at
   `/opt/node22/lib/node_modules`, Chromium preinstalled):
   `NODE_PATH=/opt/node22/lib/node_modules node script.js`. Use `devices['iPhone 14 Pro']`
   for phone renders. Wait ~4.4s after load for the splash to finish before capturing.
3. Commit, push branch, merge to `main`, push `main`.

## Environment notes

- The cloud environment's network policy was changed by the user so eventproseating.com
  and the Squarespace CDN are reachable; `vercel.com`/`api.vercel.com` are still blocked
  and there is no Vercel token, so deploys happen only through the GitHub → Vercel link.
- The Fatboy reference repos were cloned read-only to `/home/user/fatboy-*` in the old
  container; they are not part of this repo.

## Open items / things to confirm with the client

- FAQ, process, and timeline copy are written by us.
- No public email on the live site; add one to `lib/site.ts` if the client provides it.
- Resend env vars on Vercel if the quote form should email.
- `NEXT_PUBLIC_SITE_URL` on Vercel once a custom domain is chosen.
