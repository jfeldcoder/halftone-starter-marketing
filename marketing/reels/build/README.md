# Reel 01 render pipeline

Renders `01-rebrand-in-two-files.md` into an 18s 1080×1920 MP4 by driving the
**real site** in Chromium — the hero copy in the video is the text being typed
in the editor pane above it, and the recolor is the actual `--accent` token
changing on `:root`. Nothing is mocked or pre-rendered.

## Run

```bash
npm install                                   # repo deps
npm run build && npm run start                # site on :3000

npm i playwright ffmpeg-static                # render deps (not repo deps)
node marketing/reels/build/render.mjs         # → /tmp/reel/f0000.png …

ffmpeg -framerate 30 -i /tmp/reel/f%04d.png \
  -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -crf 18 \
  -preset slow -movflags +faststart reel-01.mp4
```

`node render.mjs --probe 0.9,4.6,10.6` captures single timestamps instead of the
full sequence — use it when tuning a beat.

## Layout

- `stage.html` owns the whole timeline: geometry, the editor document, overlay
  copy, and `REEL.siteState(t)`. Edit timings in the `EDITS` table.
- `render.mjs` walks 540 frames, pushes each `siteState` into the live site, and
  screenshots the composite.
- `fonts/` is vendored (Archivo + IBM Plex Mono, OFL) so a render never depends
  on the network. Regenerate by re-fetching the Google Fonts CSS and rewriting
  the `fonts.gstatic.com` URLs to `/fonts/`.

## Known liberty

The `description` line in the editor pane is shortened from the starter's real
placeholder so it fits one legible line at 25px. Everything else on screen is
the file as it ships.
