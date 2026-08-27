# Reel 01 — "Rebrand in two files"

**Format:** 9:16 vertical, 1080×1920 · **Runtime:** 18s · **Face:** none (screen recording)
**Goal:** profile visits + saves. The whole reel is one visible "wow" moment: a site
changes identity in front of you, twice, in under 20 seconds.

**Demo brand:** `Yumori` — a ramen bar. Placeholder indigo → burnt orange is a big,
legible color jump on a phone screen.

---

## Rendered version

This reel was built rather than filmed — `build/render.mjs` runs the production
site in Chromium and captures 540 frames, so the hero copy on screen is the text
being typed in the editor pane above it and the recolor is the real `--accent`
token changing. Output: `halftone-reel-01.mp4`, 18.00s, 1080×1920, H.264, silent
(add the audio in-app so the post gets trending-audio distribution).

Three things in the built cut differ from the shot list below:

- **Scenes 1 and 5 use a title band, not a dimmed site.** Overlaying copy on a
  dimmed page put the reel's headline on top of the site's own headline and both
  lost. The built version gives the copy a solid block with an accent hairline
  and leaves the site clean underneath.
- **The hook is up on frame one.** No fade on the first line — frame zero is the
  thumbnail, so it has to carry the hook. Only "Two files." animates in.
- **The `description` line in the editor is shortened** from the starter's real
  placeholder so it fits one legible line at 25px. Everything else on screen is
  the file as it ships.

The section below is still the reference if you ever want to shoot it live.

---

## Setup before you record

- Screen at **1920×1080**, editor and browser **side by side, 50/50**. You will crop
  to a vertical stack in the edit (editor top, browser bottom), so keep the browser's
  hero section in the upper half of its own window.
- Editor font size **18–20pt**, minimap off, sidebar collapsed, terminal hidden.
  Text has to survive a phone screen.
- `npm run dev` already running. Confirm hot reload is instant — do a throwaway edit first.
- Browser zoomed to ~110%, scrolled to the top of the hero, no bookmarks bar, no tabs strip.
- Type the edits ahead of time into a scratch file so you can paste, not type. You are
  going to speed-ramp anyway; clean paste + cursor beats a typo hunt.
- Record at 60fps. Record each of the two file edits as a separate take.

---

## Shot list

| Time | Shot | On-screen text | VO |
|---|---|---|---|
| 0.0–1.5 | Cold open on the finished **indigo** site, hero filling frame. Hold dead still for a beat, then a slow 5% push-in. | **"A whole brand change.\nTwo files."** (bold, centered, drops in on beat 1) | "Every Halftone client site rebrands from two files." |
| 1.5–5.0 | Cut to split: `lib/site.ts` top, live site bottom. Cursor selects `"Client Name"` → types `"Yumori"`. Hero eyebrow updates live. Then the `tagline` line → hero headline swaps. | small label, lower left: `lib/site.ts` | "File one. Name, tagline —" |
| 5.0–8.5 | Same file, keep moving: paste the `description`, change `cta.label` to `"Book a table"`, drop an Instagram handle into `socials`. Each one lands a visible change (subhead, button, footer). | tick marks appearing: `name ✓  tagline ✓  cta ✓  socials ✓` | "— buttons, nav, footer, and your SEO meta. All one file." |
| 8.5–13.0 | Cut to `app/globals.css`, `:root` block. Select `--accent: #4f46e5` → type `#c2410c`. **The entire site recolors on the frame it commits.** Buttons, links, accents, everything. Hold 1s on the new look. | label: `app/globals.css` → then big: **"one token"** | "File two. One accent token — the whole site follows." |
| 13.0–15.5 | Flip the OS to dark mode. Site re-themes itself, correctly, unprompted. | **"...and dark mode was already done."** | "Dark mode ships with it." |
| 15.5–18.0 | End card: Halftone mark on `--bg-elev`, accent underline animating in. | **"New client site.\nFive minutes."** / smaller: `@halftone` | "Five minutes to a new client site." |

---

## The exact edits

**`lib/site.ts`**
```ts
name: "Yumori",
tagline: "Small-batch ramen, made twice a day.",
description: "A ten-seat counter in the Arts District serving tonkotsu and shoyu from a broth we start at 5am. Walk-ins welcome, reservations recommended.",
cta: { label: "Book a table", href: "#contact" },
socials: { instagram: "https://instagram.com/yumori", x: "", linkedin: "" },
```

**`app/globals.css`** — the `:root` block only
```css
--accent: #c2410c;        /* was #4f46e5 */
--accent-light: #ea580c;  /* was #6d64f0 */
--accent-dark: #9a3412;   /* was #3b32c4 */
```
Change `--accent` **first and alone** so the hero button flips on camera, *then* the
other two in the same take. One edit, one visible consequence — that's the shot.

---

## Audio

- Fast, clicky, minimal-percussion track — something with a hard hit roughly every 2s.
  Cut every edit so the change lands **on** the hit, not after it.
- Big hits to reserve for: the tagline swap (~3s), the color flip (~11s), the end card (~16s).
- Keystroke sound design under the typing, low (-18dB). Optional but it sells the speed.
- VO is optional. Without it, the on-screen text carries the whole thing — bump text size
  ~20% and add "Text on screen 👆" nowhere, it's fine, people watch muted by default.

## Edit notes

- **Speed-ramp the typing** to 3–4×, but drop back to 1× for the last ~6 frames before
  each change commits. The eye needs the change at real speed to register it as real.
- Never cut away during a change. The point is that you never leave the file and the site
  updates anyway.
- No transitions. Hard cuts only.
- Captions burned in, positioned in the **top third** — Instagram's UI eats the bottom.

## Cover frame

The split at ~11.0s, mid-recolor: half the site still indigo, half already orange.
Overlay: **"2 files."**

---

## Caption

> Every site we build rebrands from two files.
>
> `lib/site.ts` — name, tagline, buttons, nav, footer, and all your SEO meta.
> `app/globals.css` — one accent token, and the whole site follows.
>
> No hunting hex codes through fourteen components. No "can we make the blue warmer"
> costing you a day. Dark mode, sitemap, structured data, social cards — already in there.
>
> That's the Halftone starter. New client, live site, same afternoon.
>
> Want one for your business? DM us. 🔗 in bio.

**Hashtags** (first comment, not the caption):
`#webdesign #webdeveloper #nextjs #tailwindcss #designsystem #frontend #smallbusinesswebsite #webdesignagency #buildinpublic #devlife #uidesign #brandidentity`

## CTA / follow-up

- Pin a comment: "Which tier fits you — brochure or booking site?" Replies feed reel 04.
- If it performs, the natural sequel is **#3 (SEO)**: same format, same voice, harder sell.
