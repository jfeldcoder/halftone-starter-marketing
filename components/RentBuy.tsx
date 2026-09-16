"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

const OPTIONS = {
  rent: {
    kicker: "One-off or seasonal",
    title: "Rent it for the event",
    lead: "We deliver, deploy, and pick up. You get grandstand seating with none of the ownership.",
    points: [
      "Delivered on our trailers and set up by our operator",
      "Tournaments, graduations, festivals, and one-time events",
      "Inspected and code-compliant on arrival",
      "Book by the day, weekend, or season",
    ],
    cta: { label: "Rent today", href: "/contact?interest=rent" },
  },
  buy: {
    kicker: "Schools, venues, operators",
    title: "Own a fleet",
    lead: "Towable systems your own crew deploys in minutes. Pays for itself in a season versus repeat rentals.",
    points: [
      "Patented fold-out systems, engineered and built in the USA",
      "Tow behind a light-duty truck; store on a fraction of the footprint",
      "Territory exclusivity available for rental operators",
      "Training, parts, and support from the factory in Brooksville, FL",
    ],
    cta: { label: "Purchase now", href: "/contact?interest=buy" },
  },
} as const;

export default function RentBuy() {
  const [mode, setMode] = useState<keyof typeof OPTIONS>("rent");
  const o = OPTIONS[mode];

  return (
    <div>
      <div className="flex border-b border-line">
        {(["rent", "buy"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn("kicker relative -mb-px border-b-2 px-2 py-4 transition-colors sm:px-6", mode === m ? "border-accent text-fg" : "border-transparent text-fg-muted hover:text-fg")}
          >
            {m === "rent" ? "Rent" : "Buy"}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <p className="kicker text-accent-dark">{o.kicker}</p>
            <h3 className="type-display mt-3 text-[clamp(1.8rem,3.6vw,3rem)] text-fg">
              {o.title}
              <span className="text-accent">.</span>
            </h3>
            <p className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-fg-muted">{o.lead}</p>
            <Link href={o.cta.href} className="btn btn-primary mt-8">
              {o.cta.label}
            </Link>
          </div>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {o.points.map((p, i) => (
              <li key={p} className="flex items-baseline gap-5 py-4">
                <span className="mono text-sm text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] text-fg">{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
