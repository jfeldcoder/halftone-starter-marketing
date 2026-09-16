"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type GalleryItem = { src: string | null; path: string; alt: string; span?: "wide" | "tall" };

/** Masonry-ish grid with a lightbox. Placeholders render for missing files. */
export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4">
        {items.map((it, i) => (
          <motion.button
            key={it.path}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setActive(i)}
            aria-label={`Open ${it.alt}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-bg-elev",
              it.span === "wide" && "md:col-span-2",
              it.span === "tall" && "row-span-2",
            )}
          >
            {it.src ? (
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            ) : (
              <div className="placeholder-stripes absolute inset-0 flex items-end p-3">
                <span className="rounded-full bg-bg/90 px-2.5 py-1 text-[11px] font-medium text-fg-muted">{it.alt}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl bg-bg-elev"
              onClick={(e) => e.stopPropagation()}
            >
              {items[active].src ? (
                <Image src={items[active].src!} alt={items[active].alt} fill sizes="90vw" className="object-contain" />
              ) : (
                <div className="placeholder-stripes absolute inset-0 flex items-center justify-center text-sm text-fg-muted">{items[active].alt}</div>
              )}
              <p className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-white">{items[active].alt}</p>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
              }}
              aria-label="Previous"
              className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a === null ? a : (a + 1) % items.length));
              }}
              aria-label="Next"
              className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            >
              →
            </button>
            <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-white/20">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
