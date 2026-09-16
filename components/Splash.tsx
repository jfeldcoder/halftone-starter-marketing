"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import BleacherDrawing from "@/components/BleacherDrawing";

/**
 * Intro: plays on every hard load of the site (not on in-site navigation).
 * A bleacher draws itself in line by line, the logo wipes on beneath it, a
 * progress hairline runs the full length, then the olive sheet lifts.
 * Click skips. Reduced motion bypasses it entirely.
 */
const HOLD_MS = 3400;
const EASE = [0.22, 1, 0.36, 1] as const;

export default function Splash() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), reduce ? 0 : HOLD_MS);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.button
          key="sheet"
          type="button"
          aria-label="Enter site"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-ink"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] } }}
        >
          {/* faint grid that fades up */}
          <motion.div
            aria-hidden
            className="absolute inset-0 opacity-0"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "56px 56px" }}
            animate={{ opacity: [0, 1, 1, 0.4] }}
            transition={{ duration: 3.4, times: [0, 0.2, 0.7, 1] }}
          />
          {/* warm glow behind the drawing */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1.1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          />

          <div className="relative flex w-[86vw] max-w-[640px] flex-col items-center sm:w-[56vw]">
            <BleacherDrawing className="h-auto w-full" delay={0.1} />

            <motion.div
              className="mt-2 w-[64%] max-w-[380px]"
              initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6 }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.7, ease: EASE }}
            >
              <Image src="/logo.png" alt="EventPro Seating" width={2500} height={1144} priority className="h-auto w-full" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6, duration: 0.5 }}
              className="kicker mt-6 text-center font-normal text-white/55"
            >
              Set up in minutes. By one person.
            </motion.p>
          </div>

          {/* progress hairline, the full hold */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-white/10">
            <motion.div className="h-full origin-left bg-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: HOLD_MS / 1000, ease: "linear" }} />
          </div>
          <motion.span
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="kicker absolute bottom-5 right-6 font-normal text-white/35"
          >
            Skip
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
