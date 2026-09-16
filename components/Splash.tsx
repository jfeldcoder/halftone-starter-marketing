"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Logo-reveal splash using the client's actual logo file. Plays once per browser
 * session (sessionStorage), click to skip, and is skipped for reduced-motion users.
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

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Splash() {
  const seen = useSyncExternalStore(subscribe, readSeen, () => true);
  const reduce = useReducedMotion();
  const show = !seen && !reduce;

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(markSeen, 2900);
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
            className="absolute -bottom-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
          />
          <div className="relative flex flex-col items-center px-6">
            {/* Three slanted bars sweep in, then the logo wipes on left to right. */}
            <div className="relative w-[260px] sm:w-[380px]">
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-[6%]" aria-hidden>
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block h-[14%] w-[36%] origin-left bg-accent"
                    style={{ clipPath: "polygon(16% 0, 100% 0, 84% 100%, 0 100%)" }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                    transition={{ delay: 0.1 + i * 0.1, duration: 1.1, times: [0, 0.35, 0.6, 1], ease: EASE }}
                  />
                ))}
              </div>
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6, scale: 0.98 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, scale: 1 }}
                transition={{ delay: 0.55, duration: 1.1, ease: EASE }}
              >
                <Image src="/logo.png" alt="EventPro Seating" width={2500} height={1144} priority className="h-auto w-full" />
              </motion.div>
              <motion.span
                className="pointer-events-none absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ left: "-20%", opacity: 0 }}
                animate={{ left: "110%", opacity: [0, 1, 0] }}
                transition={{ delay: 0.7, duration: 1.1, ease: "easeInOut" }}
                aria-hidden
              />
            </div>
            <motion.p
              className="mt-8 text-xs uppercase tracking-[0.3em] text-white/50"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              Premier bleacher systems for every event
            </motion.p>
            <motion.div
              className="mt-8 h-px w-48 origin-left bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 2.4, ease: "linear" }}
            />
            <motion.span
              className="mt-8 text-[11px] uppercase tracking-[0.2em] text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
            >
              Click to skip
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
