"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const t = testimonials[i];

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <svg className="absolute -left-2 -top-6 h-16 w-16 text-accent/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M7.2 6C4.9 6 3 7.9 3 10.2c0 2 1.4 3.7 3.3 4.1-.4 1.6-1.5 2.7-3.3 3.2v1.5c3.8-.4 6.4-3 6.4-7.1V6H7.2zm10 0c-2.3 0-4.2 1.9-4.2 4.2 0 2 1.4 3.7 3.3 4.1-.4 1.6-1.5 2.7-3.3 3.2v1.5c3.8-.4 6.4-3 6.4-7.1V6h-2.2z" />
      </svg>
      <div className="relative min-h-[190px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="pl-6"
          >
            <p className="display text-2xl font-semibold leading-snug text-fg sm:text-3xl">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-6 text-sm text-fg-muted">
              <span className="font-semibold text-fg">{t.name}</span> · {t.org}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>
      <div className="mt-6 flex gap-2 pl-6">
        {testimonials.map((_, j) => (
          <button
            key={j}
            aria-label={`Show testimonial ${j + 1}`}
            onClick={() => setI(j)}
            className={cn("h-1.5 rounded-full transition-all duration-300", j === i ? "w-8 bg-accent" : "w-3 bg-line hover:bg-fg-faint")}
          />
        ))}
      </div>
    </div>
  );
}
