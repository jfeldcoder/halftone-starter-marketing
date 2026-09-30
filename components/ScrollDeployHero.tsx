"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-driven home hero: a 10 Row bleacher unfolds on its trailer as you
 * scroll. The section is several screens tall with a sticky stage inside;
 * scroll progress through it picks the frame of a pre-rendered sequence drawn
 * to a canvas, cross-blending neighbouring frames so there is never a step.
 *
 * This sits alongside the original photo hero (Hero.tsx), which is untouched.
 * To go back, swap the import in app/page.tsx.
 */

const SETS = {
  wide: { dir: "/hero-deploy/wide", frames: 106, anchorY: 0.5, zoom: 1 },
  // The phone cut's bleacher sits low, where the buttons go; a slight
  // push-in anchored near the bottom lifts it toward the middle.
  tall: { dir: "/hero-deploy/tall", frames: 69, anchorY: 0.85, zoom: 1.14 },
} as const;
type SetKey = keyof typeof SETS;
const frameSrc = (k: SetKey, i: number) => `${SETS[k].dir}/f_${String(i + 1).padStart(3, "0")}.webp`;

/** Captions keyed to scroll progress: what the viewer is watching happen. */
const STAGES = [
  { at: 0, n: "01", t: "Arrives on its own trailer" },
  { at: 0.3, n: "02", t: "One person unfolds it" },
  { at: 0.72, n: "03", t: "160 seats in 15 minutes" },
];

export default function ScrollDeployHero() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [setKey, setSetKey] = useState<SetKey | null>(null);
  const [stage, setStage] = useState(0);
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const pick = () => setSetKey(mq.matches ? "tall" : "wide");
    pick();
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const c = canvas.current;
    const w = wrap.current;
    if (!c || !w || !setKey) return;
    const { frames: FRAMES, anchorY, zoom } = SETS[setKey];
    const ctx = c.getContext("2d");
    if (!ctx) return;

    // First frame, then every eighth, then the rest: a coarse version of the
    // whole scrub is usable almost at once and fills in from there.
    const imgs: HTMLImageElement[] = new Array(FRAMES);
    const order: number[] = [0];
    for (let i = 8; i < FRAMES; i += 8) order.push(i);
    order.push(FRAMES - 1);
    for (let i = 1; i < FRAMES; i++) if (i % 8 !== 0 && i !== FRAMES - 1) order.push(i);
    for (const i of order) {
      const im = new window.Image();
      im.decoding = "async";
      im.src = frameSrc(setKey, i);
      imgs[i] = im;
    }
    const ready = (im?: HTMLImageElement) => !!im && im.complete && im.naturalWidth > 0;
    const nearest = (i: number, dir: 1 | -1) => {
      for (let k = i; k >= 0 && k < FRAMES; k += dir) if (ready(imgs[k])) return k;
      return -1;
    };

    let lastW = 0, lastH = 0, dirty = true;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = c.clientWidth, ch = c.clientHeight;
      // Ignore the mobile address bar showing and hiding.
      if (cw === lastW && Math.abs(ch - lastH) < 140) return;
      lastW = cw; lastH = ch;
      c.width = Math.round(cw * dpr);
      c.height = Math.round(ch * dpr);
      dirty = true;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (im: HTMLImageElement, alpha: number) => {
      const cw = c.width, ch = c.height;
      const s = Math.max(cw / im.naturalWidth, ch / im.naturalHeight) * zoom;
      const iw = im.naturalWidth * s, ih = im.naturalHeight * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, (cw - iw) / 2, (ch - ih) * anchorY, iw, ih);
    };

    let cur = 0, raf = 0, lastPos = -1, lastStage = -1;
    const tick = () => {
      const r = w.getBoundingClientRect();
      const run = r.height - window.innerHeight;
      const p = run > 0 ? Math.min(1, Math.max(0, -r.top / run)) : 0;
      const target = reduce ? FRAMES - 1 : p * (FRAMES - 1);
      // Once the scroll comes to rest, settle on a whole frame: resting
      // halfway between two frames of a moving bleacher reads as a ghost.
      const goal = Math.abs(target - cur) < 0.08 ? Math.round(target) : target;
      cur += (goal - cur) * (reduce ? 1 : 0.22);

      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      let s = 0;
      for (let i = 0; i < STAGES.length; i++) if (p >= STAGES[i].at) s = i;
      if (s !== lastStage) {
        lastStage = s;
        setStage(s);
      }

      if (r.bottom > 0 && (dirty || Math.abs(cur - lastPos) > 0.002)) {
        const lo = Math.floor(cur);
        const f = cur - lo;
        const a = nearest(lo, -1);
        const b = nearest(Math.min(FRAMES - 1, lo + 1), 1);
        if (a >= 0) {
          draw(imgs[a], 1);
          // A steep blend keeps the double exposure to the middle of each step.
          const t = Math.min(1, Math.max(0, (f - 0.3) / 0.4));
          const k = t * t * (3 - 2 * t);
          if (b > a && k > 0.001) draw(imgs[b], k);
          ctx.globalAlpha = 1;
          lastPos = cur;
          dirty = false;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduce, setKey]);

  return (
    <section ref={wrap} data-scroll-hero className="on-ink relative h-[260svh] bg-scrim text-white lg:h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-between overflow-hidden lg:justify-end">
        {/* The first frame paints as a plain background, so there is never an
            empty flash while the canvas loads. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-scrim bg-cover bg-center bg-[url(/hero-deploy/wide/f_001.webp)] portrait:bg-[url(/hero-deploy/tall/f_001.webp)]"
        >
          <canvas ref={canvas} className="h-full w-full" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-scrim/90 via-scrim/25 to-scrim/10" />
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-scrim/60 via-scrim/15 to-transparent lg:block" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-scrim/75 via-scrim/30 to-transparent lg:hidden" />

        <div className="relative z-10 mx-auto w-full max-w-content px-gutter pt-28 lg:px-8 lg:pt-40">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease }}
            className="type-display type-hero max-w-5xl text-[2.2rem] sm:text-[clamp(2.6rem,7.2vw,6.4rem)] lg:text-[clamp(3rem,5.4vw,5.2rem)]"
          >
            Premier bleacher systems
            <br />
            for every event<span className="text-accent">.</span>
          </motion.h1>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-content px-gutter pb-10 lg:px-8 lg:pb-14">
          <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="max-w-lg text-[0.98rem] leading-relaxed text-white/80 max-lg:hidden lg:mt-6">
                Mobile bleachers and event decks that one person unfolds in minutes. Rent for the weekend or own a fleet.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="flex lg:mt-7 flex-wrap items-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Get a quote
                </Link>
                <Link href="/products/10-row-bleachers" className="btn btn-ghost">
                  See the lineup
                </Link>
              </motion.div>
            </div>

            {/* Numbered stage rows, the current one lit in orange. */}
            <motion.ol initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-8 w-full border-t border-white/20 lg:mt-0 lg:w-[22rem] lg:shrink-0">
              {STAGES.map((s, i) => (
                <li
                  key={s.n}
                  className={`flex items-baseline gap-4 border-b border-white/15 py-2.5 transition-colors duration-500 max-lg:hidden ${i === stage ? "text-white" : "text-white/40"}`}
                >
                  <span className={`kicker transition-colors duration-500 ${i === stage ? "text-accent" : ""}`}>{s.n}</span>
                  <span className="kicker">{s.t}</span>
                </li>
              ))}
              {/* Phones show just the current row, to keep the photo clear. */}
              <li className="flex items-baseline gap-4 border-b border-white/15 py-2.5 lg:hidden">
                <span className="kicker text-accent">{STAGES[stage].n}</span>
                <span className="kicker">{STAGES[stage].t}</span>
              </li>
            </motion.ol>
          </div>

          {/* Scroll progress as a hairline. */}
          <div aria-hidden className="mt-6 h-px w-full bg-white/15">
            <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}
