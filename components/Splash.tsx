"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Quiet entry: the logo wipes on across an ink sheet with a hairline beneath
 * it, holds a beat, then the sheet lifts. Once per session; click skips.
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
    const t = setTimeout(markSeen, 2400);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="sheet"
          type="button"
          aria-label="Enter site"
          onClick={markSeen}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ink"
          exit={{ y: "-100%", transition: { duration: 0.75, ease: [0.83, 0, 0.17, 1] } }}
        >
          <div className="relative w-[70vw] max-w-[560px] sm:w-[40vw]">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.05, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src="/logo.png" alt="EventPro Seating" width={2500} height={1144} priority className="h-auto w-full" />
            </motion.div>
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 h-px w-full origin-left bg-white/20"
            />
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="kicker mt-5 text-center font-normal text-white/50"
            >
              Premier bleacher systems for every event
            </motion.p>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
