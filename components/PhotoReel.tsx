"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

export type ReelItem = { src: string | null; alt: string };

/**
 * Horizontal, edge-to-edge strip of photos with a scrubber underneath: a
 * hairline track, an orange thumb that tracks the scroll position, and
 * prev/next arrows. Swipe, scroll sideways, drag the thumb, or click the arrows.
 */
export default function PhotoReel({ items }: { items: ReelItem[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ start: 0, size: 0.3 });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const size = Math.max(0.08, el.clientWidth / el.scrollWidth);
      const start = max > 0 ? (el.scrollLeft / max) * (1 - size) : 0;
      setPos({ start, size });
      setAtStart(el.scrollLeft < 4);
      setAtEnd(el.scrollLeft > max - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 12), behavior: "smooth" });
  };

  const seek = (clientX: number) => {
    const el = scroller.current;
    const t = track.current;
    if (!el || !t) return;
    const r = t.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    el.scrollTo({ left: ratio * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  return (
    <div>
      <Reveal delay={0.08}>
        <div ref={scroller} className="no-bar flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter lg:px-8">
          {items.map((it, i) => (
            <div key={i} data-card className="relative aspect-[4/5] w-[72vw] shrink-0 snap-center overflow-hidden bg-surface sm:w-[380px] lg:w-[420px]">
              {it.src ? (
                <Image src={it.src} alt={it.alt} fill sizes="(max-width: 640px) 72vw, 420px" className="object-cover" />
              ) : (
                <div className="placeholder-stripes absolute inset-0" />
              )}
              <p className="kicker absolute bottom-4 left-4 font-normal text-white drop-shadow">{it.alt}</p>
            </div>
          ))}
          <div aria-hidden className="w-px shrink-0" />
        </div>
      </Reveal>

      {/* Scrubber */}
      <div className="mx-auto mt-6 flex max-w-content items-center gap-5 px-gutter lg:px-8">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={atStart}
          aria-label="Previous photos"
          className="mono grid h-10 w-10 shrink-0 place-items-center border border-line text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-line"
        >
          ←
        </button>
        <div
          ref={track}
          role="scrollbar"
          aria-controls="photo-reel"
          aria-valuenow={Math.round(pos.start * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-orientation="horizontal"
          onClick={(e) => seek(e.clientX)}
          className="relative h-6 flex-1 cursor-pointer"
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line" />
          <motion.div
            className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-accent"
            animate={{ left: `${pos.start * 100}%`, width: `${pos.size * 100}%` }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            drag="x"
            dragConstraints={track}
            dragElastic={0}
            dragMomentum={false}
            onDrag={(_, info) => seek(info.point.x)}
          />
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={atEnd}
          aria-label="Next photos"
          className="mono grid h-10 w-10 shrink-0 place-items-center border border-line text-fg transition-colors hover:border-fg disabled:opacity-30 disabled:hover:border-line"
        >
          →
        </button>
      </div>
    </div>
  );
}
