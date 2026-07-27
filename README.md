# Halftone client starter · Marketing / brochure tier

The **quick, low-effort** tier: a clean Next.js 16 + Tailwind v4 + TypeScript
brochure site for a business that needs a credible presence fast. Mostly static,
brandable from two files, deploy-ready on Vercel.

For local service businesses that need a service menu, booking/inquiry flow, gallery,
and reviews (med spas, salons, clinics), use the **local-service** starter instead.

## Start a new client (5 minutes)

1. **Create the project from this template.** On GitHub, click **Use this template**
   → name it `client-<name>` (e.g. `client-yumori`). Or locally:
   ```bash
   cp -R starter clients/<name> && cd clients/<name>
   rm -rf .git && git init
   ```
2. **Install & run:**
   ```bash
   npm install
   npm run dev
   ```
3. **Rebrand — edit two files:**
   - `lib/site.ts` — name, tagline, description, nav, contact, socials, URL.
   - `app/globals.css` — the `:root` tokens (colors) and the fonts in `app/layout.tsx`.
4. **Build the pages.** Replace the placeholder sections in `app/page.tsx`, add routes
   under `app/`, and drop shared UI in `components/`.
5. **Deploy.** Push to GitHub, import into Vercel, set `NEXT_PUBLIC_SITE_URL`, add the
   client's domain.

## What's inside

```
app/
  layout.tsx      root layout: fonts + SEO metadata (reads lib/site.ts)
  page.tsx        homepage: hero, proof, services, about, CTA (placeholder copy)
  globals.css     design tokens (REBRAND HERE) + base styles + helpers
  sitemap.ts      /sitemap.xml
  robots.ts       /robots.txt
  icon.svg        favicon (swap for the client's mark)
components/
  Nav.tsx         sticky nav with mobile menu
  Footer.tsx      footer with contact + socials + credit
  Reveal.tsx      on-load fade/rise wrapper (pure CSS, no-JS safe)
lib/
  site.ts         ← single source of truth for brand + copy
  cn.ts           className helper (clsx)
```

## Conventions

- **Colors come from tokens**, never hardcoded hex in components. Change a brand by
  editing `:root` in `globals.css`. Dark mode is wired via `prefers-color-scheme`.
- **Tailwind v4** reads those tokens through `@theme inline`, so classes like
  `bg-bg`, `text-fg-muted`, `bg-accent` map to the brand automatically.
- **One config file** (`lib/site.ts`) drives nav, footer, meta, and CTAs.
- Accessible by default: reduced-motion handling, focusable controls, semantic landmarks.

Built and maintained by Halftone.
