"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/products";
import { cn } from "@/lib/cn";

/** Interactive capacity planner. Numbers come from lib/products.ts. */
export default function Configurator() {
  const [qty, setQty] = useState<Record<string, number>>({ "3-row-bleachers": 0, "10-row-bleachers": 2, "event-deck": 0 });
  const [interest, setInterest] = useState<"rent" | "buy">("rent");

  const totals = useMemo(() => {
    let seats = 0;
    let minutes = 0;
    for (const p of products) {
      const n = qty[p.slug] ?? 0;
      seats += n * p.seats;
      minutes += n * p.setupMinutes;
    }
    return { seats, minutes };
  }, [qty]);

  const query = new URLSearchParams({
    interest,
    ...Object.fromEntries(Object.entries(qty).filter(([, n]) => n > 0).map(([k, n]) => [k, String(n)])),
  }).toString();

  return (
    <div className="grid border-y border-line lg:grid-cols-[1.1fr_0.9fr]">
      <div className="py-8 lg:pr-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="kicker text-fg-muted">Quantities</p>
          <div className="flex gap-2">
            {(["rent", "buy"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setInterest(m)}
                className={cn("kicker border px-4 py-2 transition-colors", interest === m ? "border-fg bg-fg text-bg" : "border-line text-fg-muted hover:border-fg hover:text-fg")}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line">
          {products.map((p) => {
            const n = qty[p.slug] ?? 0;
            return (
              <li key={p.slug} className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="type-display text-xl text-fg sm:text-2xl">{p.name}</p>
                  <p className="kicker mt-1 font-normal text-fg-muted">
                    {p.slug === "event-deck" ? `Up to ${p.seats} guests` : `${p.seats} seats`} · {p.setupMinutes} min · {p.crew} operator{p.crew > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="mono flex items-center border border-line">
                  <button aria-label={`Fewer ${p.name}`} onClick={() => setQty((q) => ({ ...q, [p.slug]: Math.max(0, n - 1) }))} className="px-4 py-3 text-fg-muted hover:text-fg">
                    –
                  </button>
                  <motion.span key={n} initial={{ scale: 1.25 }} animate={{ scale: 1 }} className="min-w-8 text-center text-fg">
                    {n}
                  </motion.span>
                  <button aria-label={`More ${p.name}`} onClick={() => setQty((q) => ({ ...q, [p.slug]: Math.min(20, n + 1) }))} className="px-4 py-3 text-fg-muted hover:text-fg">
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col justify-between border-t border-line bg-bg-elev px-6 py-8 lg:border-l lg:border-t-0 lg:px-12">
        <div>
          <p className="kicker text-fg-muted">Your configuration</p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div>
              <motion.p key={totals.seats} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="type-display text-[clamp(2.6rem,5vw,4.5rem)] text-fg">
                {totals.seats.toLocaleString()}
              </motion.p>
              <p className="kicker mt-1 font-normal text-fg-muted">Guests seated</p>
            </div>
            <div>
              <motion.p key={totals.minutes} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="type-display text-[clamp(2.6rem,5vw,4.5rem)] text-fg">
                {totals.minutes}
                <span className="text-[0.4em] text-fg-muted"> min</span>
              </motion.p>
              <p className="kicker mt-1 font-normal text-fg-muted">Total setup, one operator each</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Link href={`/contact?${query}`} className="btn btn-ink w-full">
            Request this setup
          </Link>
          <p className="kicker mt-3 text-center font-normal text-fg-faint">No commitment · Reply within one business day</p>
        </div>
      </div>
    </div>
  );
}
