"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { process } from "@/lib/content";

/** Vertical timeline whose spine draws as you scroll. */
export default function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  return (
    <ol ref={ref} className="relative">
      <div className="absolute bottom-6 left-[19px] top-6 w-px bg-line" />
      <motion.div style={{ scaleY }} className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-accent" />
      {process.map((s, i) => (
        <motion.li
          key={s.step}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex gap-6 py-6"
        >
          <span className="display relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-xs font-extrabold text-fg">
            {s.step}
          </span>
          <div>
            <h3 className="display text-xl font-extrabold text-fg">{s.title}</h3>
            <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
