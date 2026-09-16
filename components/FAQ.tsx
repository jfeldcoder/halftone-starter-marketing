"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

export default function FAQ({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className={cn("text-base font-semibold transition-colors sm:text-lg", isOpen ? "text-accent-dark" : "text-fg")}>{it.q}</span>
              <span className={cn("relative h-6 w-6 shrink-0 rounded-full border transition-colors", isOpen ? "border-accent bg-accent" : "border-line")}>
                <span className={cn("absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2", isOpen ? "bg-on-accent" : "bg-fg")} />
                <span
                  className={cn("absolute left-1/2 top-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300", isOpen ? "rotate-0 bg-on-accent" : "rotate-90 bg-fg")}
                />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-fg-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
