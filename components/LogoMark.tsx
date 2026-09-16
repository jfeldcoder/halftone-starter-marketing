"use client";

import { motion } from "framer-motion";
import { logoPaths, LOGO_ORANGE, LOGO_SAND } from "@/lib/logo";

/**
 * Inline, animatable version of the EPS mark. `animate` plays the assemble-in
 * sequence (used by the splash); otherwise it renders static.
 */
export default function LogoMark({
  className,
  animate = false,
  delay = 0,
}: {
  className?: string;
  animate?: boolean;
  delay?: number;
}) {
  const shapes = [
    { d: logoPaths.e1, fill: LOGO_ORANGE, from: { x: -90, opacity: 0 } },
    { d: logoPaths.e2, fill: LOGO_ORANGE, from: { x: -90, opacity: 0 } },
    { d: logoPaths.e3, fill: LOGO_ORANGE, from: { x: -90, opacity: 0 } },
    { d: logoPaths.p, fill: LOGO_SAND, from: { y: 60, opacity: 0 }, evenodd: true },
    { d: logoPaths.s, fill: LOGO_ORANGE, from: { x: 90, opacity: 0 } },
  ];

  return (
    <svg viewBox="0 0 1540 480" className={className} role="img" aria-label="EventPro Seating">
      {shapes.map((s, i) =>
        animate ? (
          <motion.path
            key={i}
            d={s.d}
            fill={s.fill}
            fillRule={s.evenodd ? "evenodd" : undefined}
            initial={s.from}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ delay: delay + 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : (
          <path key={i} d={s.d} fill={s.fill} fillRule={s.evenodd ? "evenodd" : undefined} />
        ),
      )}
    </svg>
  );
}
