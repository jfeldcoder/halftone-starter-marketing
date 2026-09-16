"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export type GalleryItem = { src: string | null; path: string; alt: string; span?: "wide" | "tall" };

/** Square-edged photo grid with a lightbox. */
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
      <div className="grid auto-rows-[200px] grid-cols-2 gap-2 sm:auto-rows-[260px] md:grid-cols-4">
        {items.map((it, i) => (
          <motion.button
            key={it.path}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.05 }}
            onClick={() => setActive(i)}
            aria-label={`Open ${it.alt}`}
            className={cn("group relative overflow-hidden bg-surface", it.span === "wide" && "md:col-span-2", it.span === "tall" && "row-span-2")}
          >
            {it.src ? (
              <Image src={it.src} alt={it.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
            ) : (
              <div className="placeholder-stripes absolute inset-0" />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-scrim/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-[4/3] w-full max-w-5xl bg-scrim"
              onClick={(e) => e.stopPropagation()}
            >
              {items[active].src ? (
                <Image src={items[active].src!} alt={items[active].alt} fill sizes="90vw" className="object-contain" />
              ) : (
                <div className="placeholder-stripes absolute inset-0" />
              )}
              <p className="kicker absolute bottom-3 left-3 font-normal text-white/80">{items[active].alt}</p>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a === null ? a : (a - 1 + items.length) % items.length));
              }}
              aria-label="Previous"
              className="mono absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white hover:border-white sm:flex"
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((a) => (a === null ? a : (a + 1) % items.length));
              }}
              aria-label="Next"
              className="mono absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/30 text-white hover:border-white sm:flex"
            >
              →
            </button>
            <button onClick={() => setActive(null)} aria-label="Close" className="mono absolute right-4 top-4 h-11 w-11 border border-white/30 text-white hover:border-white">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
