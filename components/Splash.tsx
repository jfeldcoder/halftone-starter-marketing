"use client";

import { useEffect, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LogoMark from "@/components/LogoMark";

/**
 * Logo-reveal splash. Plays once per browser session (sessionStorage), can be
 * skipped with a click, and is skipped entirely for reduced-motion users.
 */
const KEY = "eps-splash-seen";
const EVENT = "eps-splash";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}
function readSeen() {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return true;
  }
}
function markSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export default function Splash() {
  const seen = useSyncExternalStore(subscribe, readSeen, () => true);
  const reduce = useReducedMotion();
  const show = !seen && !reduce;

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(markSeen, 2700);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          role="presentation"
          onClick={markSeen}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink text-white"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="bg-grid-ink absolute inset-0 opacity-40" />
          <motion.div
            className="absolute -bottom-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <div className="relative flex flex-col items-center px-6">
            <LogoMark animate className="w-[240px] sm:w-[340px]" />
            <motion.p
              className="display mt-8 text-2xl font-extrabold tracking-tight sm:text-3xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              EventPro <span className="font-medium text-accent">Seating</span>
            </motion.p>
            <motion.p
              className="mt-2 text-xs uppercase tracking-[0.28em] text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              Premier bleacher systems
            </motion.p>
            <motion.div
              className="mt-10 h-px w-48 origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 2.2, ease: "linear" }}
            />
            <motion.span
              className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              Click to skip
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
