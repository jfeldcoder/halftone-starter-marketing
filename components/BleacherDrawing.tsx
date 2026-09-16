"use client";

import { motion } from "framer-motion";

/**
 * Line drawing of a 10 Row bleacher on its trailer, side profile. Every stroke
 * draws itself in with pathLength; `delay` offsets the whole sequence.
 */
export default function BleacherDrawing({ className, delay = 0, rows = 10 }: { className?: string; delay?: number; rows?: number }) {
  const ease = [0.65, 0, 0.35, 1] as const;
  const x0 = 120;
  const baseY = 292;
  const totalW = 400;
  const totalH = 210;
  const td = totalW / rows;
  const rh = totalH / rows;

  const stroke = "rgba(255,255,255,0.85)";
  const faint = "rgba(255,255,255,0.35)";
  const line = { fill: "none", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const draw = (d: number, dur = 0.6) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { delay: delay + d, duration: dur, ease }, opacity: { delay: delay + d, duration: 0.01 } },
  });

  // Steps as one continuous staircase path, drawn bottom-left to top-right
  let stair = `M${x0} ${baseY}`;
  for (let i = 0; i < rows; i++) {
    const x = x0 + i * td;
    const y = baseY - (i + 1) * rh;
    stair += ` V${y} H${x + td}`;
  }

  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Line drawing of a 10 row bleacher on a trailer">
      {/* ground */}
      <motion.line x1={30} y1={330} x2={610} y2={330} stroke={faint} {...line} strokeWidth={1.2} {...draw(0, 0.9)} />
      {/* chassis + hitch */}
      <motion.path d={`M${x0 - 20} ${baseY + 8} H${x0 + totalW + 22} M${x0 - 20} ${baseY + 8} H48 l-10 -7 v14 l10 -7`} stroke={stroke} {...line} strokeWidth={2.6} {...draw(0.15, 0.7)} />
      {/* wheels */}
      <motion.circle cx={x0 + 40} cy={baseY + 26} r={16} stroke={stroke} {...line} {...draw(0.55, 0.5)} />
      <motion.circle cx={x0 + 40} cy={baseY + 26} r={5} stroke={faint} {...line} {...draw(0.75, 0.3)} />
      <motion.circle cx={x0 + totalW - 40} cy={baseY + 26} r={16} stroke={stroke} {...line} {...draw(0.65, 0.5)} />
      <motion.circle cx={x0 + totalW - 40} cy={baseY + 26} r={5} stroke={faint} {...line} {...draw(0.85, 0.3)} />
      {/* main diagonal + rear post */}
      <motion.path d={`M${x0} ${baseY} L${x0 + totalW} ${baseY - totalH}`} stroke={faint} {...line} {...draw(0.9, 0.7)} />
      <motion.path d={`M${x0 + totalW} ${baseY} V${baseY - totalH - 44}`} stroke={stroke} {...line} {...draw(1.0, 0.6)} />
      {/* staircase */}
      <motion.path d={stair} stroke={stroke} {...line} strokeWidth={2.4} {...draw(1.05, 1.15)} />
      {/* vertical supports under every other tread */}
      {Array.from({ length: rows }).map((_, i) =>
        i % 2 === 1 ? (
          <motion.line key={i} x1={x0 + i * td + td / 2} y1={baseY - (i + 1) * rh} x2={x0 + i * td + td / 2} y2={baseY} stroke={faint} {...line} strokeWidth={1.2} {...draw(1.3 + i * 0.05, 0.4)} />
        ) : null,
      )}
      {/* guardrail across the top */}
      <motion.path d={`M${x0 + totalW - td * 0.9} ${baseY - totalH - 44} H${x0 + totalW + 4} M${x0 + totalW - td * 0.9} ${baseY - totalH - 44} V${baseY - totalH}`} stroke={stroke} {...line} {...draw(2.0, 0.45)} />
      {/* seat planks, orange, drawn last */}
      {Array.from({ length: rows }).map((_, i) => {
        const x = x0 + i * td;
        const y = baseY - (i + 1) * rh - 9;
        return <motion.line key={`s${i}`} x1={x + td * 0.42} y1={y} x2={x + td * 0.96} y2={y} stroke="#f1a638" {...line} strokeWidth={5} {...draw(2.05 + i * 0.07, 0.3)} />;
      })}
      {/* one operator, standing on the ground beside the unit */}
      <motion.circle cx={586} cy={272} r={8} stroke="#f1a638" {...line} strokeWidth={2.2} {...draw(2.25, 0.3)} />
      <motion.path d="M586 280 V312 M572 292 H600 M586 312 L574 330 M586 312 L598 330" stroke="#f1a638" {...line} strokeWidth={2.2} {...draw(2.4, 0.45)} />
    </svg>
  );
}
