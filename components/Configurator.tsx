"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { cn } from "@/lib/cn";
import BleacherIllustration from "@/components/BleacherIllustration";

/** Interactive capacity planner. Numbers come from lib/products.ts. */
export default function Configurator() {
  const [qty, setQty] = useState<Record<string, number>>({ "3-row-bleachers": 0, "10-row-bleachers": 2, "event-deck": 0 });
  const [interest, setInterest] = useState<"rent" | "buy">("rent");

  const totals = useMemo(() => {
    let seats = 0;
    let minutes = 0;
    for (const p of products) {
      const n = qty[p.slug] ?? 0;
      if (p.slug === "event-deck") {
        seats += n * p.seats; // Event Deck: up to 120 guests or crew per deck
      } else {
        seats += n * p.seats;
      }
      minutes += n * p.setupMinutes;
    }
    return { seats, minutes };
  }, [qty]);

  const query = new URLSearchParams({
    interest,
    ...Object.fromEntries(Object.entries(qty).filter(([, n]) => n > 0).map(([k, n]) => [k, String(n)])),
  }).toString();

  const active = products.find((p) => (qty[p.slug] ?? 0) > 0 && p.slug !== "event-deck") ?? products[1];

  return (
    <div className="card grid overflow-hidden lg:grid-cols-[1.1fr_0.9fr]">
      <div className="p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="display text-2xl font-extrabold text-fg">Plan your seating</h3>
          <div className="flex rounded-full border border-line p-1 text-xs font-semibold">
            {(["rent", "buy"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setInterest(m)}
                className={cn("rounded-full px-3 py-1.5 transition-colors", interest === m ? "bg-fg text-bg" : "text-fg-muted hover:text-fg")}
              >
                {m === "rent" ? "Rent" : "Buy"}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-fg-muted">Set quantities and see capacity and setup time update live.</p>

        <ul className="mt-8 divide-y divide-line">
          {products.map((p) => {
            const n = qty[p.slug] ?? 0;
            return (
              <li key={p.slug} className="flex items-center justify-between gap-4 py-4">
                <div>
                  <div className="font-semibold text-fg">{p.name}</div>
                  <div className="text-xs text-fg-faint">
                    {p.slug === "event-deck" ? `up to ${p.seats} guests` : `${p.seats} seats`} · {p.setupMinutes} min · {p.crew} operator{p.crew > 1 ? "s" : ""}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Fewer ${p.name}`}
                    onClick={() => setQty((q) => ({ ...q, [p.slug]: Math.max(0, n - 1) }))}
                    className="h-9 w-9 rounded-full border border-line text-lg leading-none transition-colors hover:border-fg"
                  >
                    −
                  </button>
                  <motion.span key={n} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="display w-8 text-center text-xl font-extrabold text-fg">
                    {n}
                  </motion.span>
                  <button
                    aria-label={`More ${p.name}`}
                    onClick={() => setQty((q) => ({ ...q, [p.slug]: Math.min(20, n + 1) }))}
                    className="h-9 w-9 rounded-full border border-line text-lg leading-none transition-colors hover:border-fg"
                  >
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="on-ink relative flex flex-col justify-between bg-ink p-6 text-white sm:p-10">
        <div className="bg-grid-ink absolute inset-0 opacity-30" />
        <div className="relative">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Your configuration</span>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <motion.div key={totals.seats} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display text-5xl font-extrabold text-accent">
                {totals.seats.toLocaleString()}
              </motion.div>
              <div className="mt-1 text-sm text-white/60">guests seated</div>
            </div>
            <div>
              <motion.div key={totals.minutes} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="display text-5xl font-extrabold">
                {totals.minutes}
                <span className="text-2xl text-white/60"> min</span>
              </motion.div>
              <div className="mt-1 text-sm text-white/60">total setup, one operator each</div>
            </div>
          </div>
          <div className="mt-6 opacity-90">
            <BleacherIllustration rows={active.rows} dark mode="mount" key={active.slug} />
          </div>
        </div>
        <div className="relative mt-6">
          <Link href={`/contact?${query}`} className="btn btn-primary w-full">
            Request this setup
          </Link>
          <p className="mt-3 text-center text-xs text-white/40">No commitment. We reply within one business day.</p>
        </div>
      </div>
    </div>
  );
}
