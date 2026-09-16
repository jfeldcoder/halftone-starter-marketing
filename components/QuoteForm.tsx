"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/lib/products";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "error";

const chip = (active: boolean) =>
  cn("kicker border px-3.5 py-2 transition-colors", active ? "border-fg bg-fg text-bg" : "border-line text-fg-muted hover:border-fg hover:text-fg");

export default function QuoteForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState<"rent" | "buy" | "unsure">(() => {
    const v = params.get("interest");
    return v === "rent" || v === "buy" ? v : "unsure";
  });
  const [selected, setSelected] = useState<string[]>(() => products.filter((p) => params.get(p.slug) || params.get("product") === p.slug).map((p) => p.slug));

  const prefillNote = products
    .filter((p) => params.get(p.slug))
    .map((p) => `${params.get(p.slug)} × ${p.name}`)
    .join(", ");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, interest, products: selected }) });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const label = "kicker mb-2 block text-fg-muted";

  return (
    <div className="border-t border-line pt-8">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-16">
            <p className="kicker text-accent-dark">Request received</p>
            <h3 className="type-display mt-3 text-[clamp(1.8rem,3.6vw,3rem)] text-fg">
              Thanks<span className="text-accent">.</span> We&apos;ll be in touch within one business day.
            </h3>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <span className={label}>I&apos;m looking to</span>
              <div className="flex flex-wrap gap-2">
                {(["rent", "buy", "unsure"] as const).map((m) => (
                  <button type="button" key={m} onClick={() => setInterest(m)} className={chip(interest === m)}>
                    {m === "unsure" ? "Not sure yet" : m}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <span className={label}>Products of interest</span>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => {
                  const on = selected.includes(p.slug);
                  return (
                    <button type="button" key={p.slug} onClick={() => setSelected((s) => (on ? s.filter((x) => x !== p.slug) : [...s, p.slug]))} className={chip(on)}>
                      {p.name}
                    </button>
                  );
                })}
              </div>
              {prefillNote && <p className="kicker mt-3 font-normal text-fg-faint">From the planner: {prefillNote}</p>}
            </div>
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" required className="field" placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="org" className={label}>Organization</label>
              <input id="org" name="organization" className="field" placeholder="School, venue, or company" />
            </div>
            <div>
              <label htmlFor="email" className={label}>Email</label>
              <input id="email" name="email" type="email" required className="field" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone</label>
              <input id="phone" name="phone" type="tel" className="field" placeholder="(555) 555-5555" />
            </div>
            <div>
              <label htmlFor="date" className={label}>Event date(s)</label>
              <input id="date" name="dates" className="field" placeholder="Oct 12–13, or ongoing" />
            </div>
            <div>
              <label htmlFor="location" className={label}>Event location</label>
              <input id="location" name="location" className="field" placeholder="City, state" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className={label}>Tell us about the event</label>
              <textarea id="message" name="message" rows={4} className="field" placeholder="Expected crowd, venue type, anything we should know." defaultValue={prefillNote ? `Planner configuration: ${prefillNote}.\n` : ""} />
            </div>
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="kicker font-normal text-fg-faint">We reply within one business day</p>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Send request"}
              </button>
            </div>
            {status === "error" && <p className="mono text-xs text-red-700 sm:col-span-2">Something went wrong. Please call us at (888) 404-3130.</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
