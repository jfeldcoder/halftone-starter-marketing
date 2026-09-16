"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type Slide = { kicker: string; quote: string; image: string | null };

const ROTATE_MS = 5600;

/** Full-width photo band with auto-rotating statements. */
export default function Banner({ slides, height = "h-[26rem] sm:h-[32rem]", soft = false }: { slides: Slide[]; height?: string; soft?: boolean }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [reduce, slides.length]);

  const slide = slides[i];

  return (
    <section className={`relative overflow-hidden ${soft ? "" : "border-y border-line"} ${height}`} aria-label="Highlights">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {slide.image ? (
            <Image src={slide.image} alt="" fill sizes="100vw" className="object-cover" priority={i === 0} />
          ) : (
            <div className="placeholder-stripes absolute inset-0" />
          )}
          <div className="absolute inset-0 bg-scrim/60" />
        </motion.div>
      </AnimatePresence>

      {soft && (
        <>
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-20 bg-gradient-to-b from-bg to-transparent" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-20 bg-gradient-to-t from-bg to-transparent" />
        </>
      )}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-gutter text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
          >
            <p className="kicker text-accent">{slide.kicker}</p>
            <p className="type-display mx-auto mt-4 max-w-4xl text-[clamp(1.6rem,3.6vw,2.9rem)] text-white">{slide.quote}</p>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="absolute bottom-6 flex gap-2.5">
            {slides.map((s, n) => (
              <button
                key={s.kicker + n}
                type="button"
                aria-label={`Show slide ${n + 1}`}
                onClick={() => setI(n)}
                className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-accent" : "w-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
