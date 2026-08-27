/**
 * Reel 01 — "Rebrand in two files"
 * Renders the reel by driving the REAL site in Chromium and capturing frames.
 *
 *   node render.mjs                 # full 540-frame render
 *   node render.mjs --probe 0.6,3.9 # capture just those timestamps (for review)
 *
 * Requires the site running at http://127.0.0.1:3000 (npm run build && npm run start).
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = process.env.REEL_OUT || "/tmp/reel";
const SITE = "http://127.0.0.1:3000/";
const STAGE_PORT = 3100;

const args = process.argv.slice(2);
const probeArg = args.indexOf("--probe");
const PROBE = probeArg >= 0 ? args[probeArg + 1].split(",").map(Number) : null;

/* ---------- tiny static server for the stage page ---------- */
function serveStage() {
  return new Promise((resolve) => {
    const types = { ".css": "text/css", ".woff2": "font/woff2", ".html": "text/html; charset=utf-8" };
    const srv = http.createServer((req, res) => {
      const url = req.url.split("?")[0];
      // Fonts are vendored under ./fonts so the render never depends on the network.
      const file = url === "/" ? path.join(HERE, "stage.html")
                               : path.join(HERE, path.normalize(url).replace(/^(\.\.[/\\])+/, ""));
      if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end("not found"); return;
      }
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
      res.end(fs.readFileSync(file));
    });
    srv.listen(STAGE_PORT, "127.0.0.1", () => resolve(srv));
  });
}

/* ---------- push a state into the real site ----------
   Nodes are tagged once by matching the starter's placeholder copy, so every
   place the brand renders (hero, nav, footer, copyright) updates together and
   nothing else on the page gets clobbered. */
const PLACEHOLDER = {
  name: "Client Name",
  tagline: "A one line promise about what this business does.",
  description:
    "One or two sentences describing the business, who it serves, and why it is different.",
  cta: "Get in touch",
};

const PREP_SITE = (ph) => {
  const st = document.createElement("style");
  st.textContent = `
    html { overflow: hidden !important; scroll-behavior: auto !important; }
    body { overflow: hidden !important; }
    .reveal { animation: none !important; opacity: 1 !important; transform: none !important; }
    *, *::before, *::after { transition: none !important; }
    ::-webkit-scrollbar { display: none; }
  `;
  document.head.appendChild(st);

  const byText = Object.entries(ph).reduce((m, [k, v]) => ((m[v] = k), m), {});
  document.querySelectorAll("body *").forEach((el) => {
    if (el.querySelector("*")) return; // leaves only
    const txt = el.textContent.trim();
    if (byText[txt]) el.dataset.reel = byText[txt];
    else if (txt.includes(ph.name)) {
      el.dataset.reel = "nameIn";
      el.dataset.reelTpl = el.textContent;
    }
  });
};

const APPLY_SITE = (s) => {
  const put = (key, text) =>
    document.querySelectorAll(`[data-reel="${key}"]`).forEach((el) => {
      if (el.textContent !== text) el.textContent = text;
    });
  put("name", s.name);
  put("tagline", s.tagline);
  put("description", s.description);
  put("cta", s.cta);
  document.querySelectorAll('[data-reel="nameIn"]').forEach((el) => {
    const next = el.dataset.reelTpl.replace("Client Name", s.name);
    if (el.textContent !== next) el.textContent = next;
  });

  const r = document.documentElement.style;
  if (s.accent) r.setProperty("--accent", s.accent);
  if (s.accentLight) r.setProperty("--accent-light", s.accentLight);
  if (s.accentDark) r.setProperty("--accent-dark", s.accentDark);
};

/* ---------- main ---------- */
const srv = await serveStage();
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// The container ships Chromium out-of-band from the npm package, so point at it
// directly rather than letting Playwright look for its own pinned build.
const localChrome = (() => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const root = process.env.PLAYWRIGHT_BROWSERS_PATH || "/opt/pw-browsers";
  if (!fs.existsSync(root)) return undefined;
  const dir = fs.readdirSync(root).filter((d) => /^chromium-\d+$/.test(d)).sort().pop();
  const bin = dir && path.join(root, dir, "chrome-linux", "chrome");
  return bin && fs.existsSync(bin) ? bin : undefined;
})();

const browser = await chromium.launch({
  executablePath: localChrome,
  args: ["--force-color-profile=srgb", "--font-render-hinting=none", "--disable-lcd-text"],
});
const page = await browser.newPage({
  viewport: { width: 1080, height: 1920 },
  deviceScaleFactor: 1,
  colorScheme: "light",
});

await page.goto(`http://127.0.0.1:${STAGE_PORT}/`, { waitUntil: "networkidle" });

const frame = page.frames().find((f) => f.url().startsWith(SITE));
if (!frame) throw new Error("site iframe not found — is the site running on :3000?");
await frame.evaluate(PREP_SITE, PLACEHOLDER);
await page.evaluate(() => document.fonts.ready);
await frame.evaluate(() => document.fonts.ready);

const { FPS, DURATION } = await page.evaluate(() => ({ FPS: REEL.FPS, DURATION: REEL.DURATION }));
const total = Math.round(FPS * DURATION);

const times = PROBE ? PROBE : Array.from({ length: total }, (_, i) => i / FPS);
let darkNow = false;
const t0 = Date.now();

for (let i = 0; i < times.length; i++) {
  const t = times[i];

  const state = await page.evaluate((tt) => REEL.siteState(tt), t);

  if (state.dark !== darkNow) {
    darkNow = state.dark;
    await page.emulateMedia({ colorScheme: darkNow ? "dark" : "light" });
  }

  await frame.evaluate(APPLY_SITE, state);
  await page.evaluate((tt) => applyStage(tt), t);

  const name = PROBE
    ? `probe-${String(t).replace(".", "_")}.png`
    : `f${String(i).padStart(4, "0")}.png`;
  await page.screenshot({ path: path.join(OUT, name), type: "png" });

  if (!PROBE && (i % 60 === 0 || i === times.length - 1)) {
    const pct = Math.round(((i + 1) / times.length) * 100);
    const el = ((Date.now() - t0) / 1000).toFixed(0);
    process.stdout.write(`  ${pct}%  frame ${i + 1}/${times.length}  ${el}s\n`);
  }
}

await browser.close();
srv.close();
console.log(`done → ${OUT}`);
