"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const OPTIONS = {
  rent: {
    title: "Rent it for the event",
    tag: "One-off or seasonal",
    lead: "We deliver, deploy, and pick up. You get grandstand seating with none of the ownership.",
    points: [
      "Delivered on our trailers and set up by our operator",
      "Ideal for tournaments, graduations, festivals, and one-time events",
      "Insured, inspected, and code-compliant on arrival",
      "Book by the day, weekend, or season",
    ],
    cta: { label: "Request rental availability", href: "/contact?interest=rent" },
  },
  buy: {
    title: "Own a fleet",
    tag: "Schools, venues, operators",
    lead: "Towable systems your own crew deploys in minutes. Pays for itself in a season versus repeat rentals.",
    points: [
      "Patented fold-out systems, engineered and built in the USA",
      "Tow behind a standard truck; store on a fraction of the footprint",
      "Territory exclusivity available for rental operators",
      "Training, parts, and support from the factory in Brooksville, FL",
    ],
    cta: { label: "Talk to sales", href: "/contact?interest=buy" },
  },
} as const;

export default function RentBuy() {
  const [mode, setMode] = useState<keyof typeof OPTIONS>("rent");
  const o = OPTIONS[mode];

  return (
    <div className="card overflow-hidden">
      <div className="flex border-b border-line bg-bg-elev p-2">
        {(["rent", "buy"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn("relative flex-1 rounded-xl py-3 text-sm font-semibold transition-colors", mode === m ? "text-fg" : "text-fg-muted hover:text-fg")}
          >
            {mode === m && <motion.span layoutId="rentbuy-pill" className="absolute inset-0 rounded-xl bg-bg shadow-sm" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{m === "rent" ? "Rent" : "Buy"}</span>
          </button>
        ))}
      </div>
      <div className="p-6 sm:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow-accent">{o.tag}</span>
            <h3 className="display mt-3 text-3xl font-extrabold text-fg">{o.title}</h3>
            <p className="mt-3 max-w-xl text-fg-muted">{o.lead}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {o.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="flex gap-3 text-sm text-fg"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] text-accent-dark">✓</span>
                  {p}
                </motion.li>
              ))}
            </ul>
            <Link href={o.cta.href} className="btn btn-primary mt-8">
              {o.cta.label}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
