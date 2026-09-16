"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Fast fade-and-rise on scroll into view; triggers early, never traps content. */
export default function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}

/** Thin ticker band. */
export function Ticker({ items, speed = 30 }: { items: string[]; speed?: number }) {
  const row = (
    <div className="ticker-track" style={{ ["--speed" as string]: `${speed}s` }}>
      {items.map((t, i) => (
        <span key={i} className="kicker flex items-center gap-6 pr-6 font-normal text-fg/70">
          {t}
          <span aria-hidden className="text-accent">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker border-y border-line bg-bg-elev py-3" aria-hidden>
      {row}
      {row}
    </div>
  );
}
