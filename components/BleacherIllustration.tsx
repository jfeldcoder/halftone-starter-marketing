"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Side-profile bleacher on a towable chassis, drawn in SVG and assembled row by
 * row. Used in the hero and as the stand-in visual until product photos land.
 */
export default function BleacherIllustration({
  rows = 10,
  className,
  mode = "view",
  delay = 0,
  dark = false,
  variant = "bleacher",
}: {
  rows?: number;
  className?: string;
  mode?: "view" | "mount";
  delay?: number;
  dark?: boolean;
  variant?: "bleacher" | "deck";
}) {
  if (variant === "deck") return <DeckIllustration className={className} mode={mode} delay={delay} dark={dark} />;
  const W = 640;
  const baseY = 300;
  const x0 = 110;
  const totalW = 430;
  const totalH = Math.min(230, 40 + rows * 19);
  const td = totalW / rows;
  const rh = totalH / rows;
  const frame = dark ? "rgba(255,255,255,0.35)" : "var(--alu-dark)";
  const plank = dark ? "var(--alu)" : "var(--alu)";
  const seat = "var(--accent)";
  const rowAnim = (i: number) => ({
    initial: { opacity: 0, y: 26 },
    ...(mode === "mount"
      ? { animate: { opacity: 1, y: 0 } }
      : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-15% 0px" } }),
    transition: { delay: delay + 0.25 + i * (0.9 / rows), duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <svg viewBox={`0 0 ${W} 360`} className={cn("h-auto w-full", className)} role="img" aria-label={`${rows} row bleacher illustration`}>
      {/* ground shadow */}
      <motion.ellipse
        cx={x0 + totalW / 2}
        cy={baseY + 40}
        rx={totalW / 2 + 40}
        ry={12}
        fill={dark ? "rgba(0,0,0,0.35)" : "rgba(23,20,17,0.08)"}
        initial={{ opacity: 0, scaleX: 0.6 }}
        {...(mode === "mount" ? { animate: { opacity: 1, scaleX: 1 } } : { whileInView: { opacity: 1, scaleX: 1 }, viewport: { once: true } })}
        transition={{ delay, duration: 0.8 }}
      />
      {/* chassis */}
      <motion.g
        initial={{ opacity: 0, x: -40 }}
        {...(mode === "mount" ? { animate: { opacity: 1, x: 0 } } : { whileInView: { opacity: 1, x: 0 }, viewport: { once: true } })}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <rect x={x0 - 24} y={baseY} width={totalW + 48} height={14} rx={4} fill={frame} />
        <path d={`M${x0 - 24} ${baseY + 7} H${x0 - 80} l-8 -6 v12 l8 -6`} stroke={frame} strokeWidth={4} fill="none" strokeLinejoin="round" />
        <circle cx={x0 + 40} cy={baseY + 24} r={17} fill={dark ? "#2a2520" : "#2b2622"} />
        <circle cx={x0 + 40} cy={baseY + 24} r={7} fill={plank} />
        <circle cx={x0 + totalW - 40} cy={baseY + 24} r={17} fill={dark ? "#2a2520" : "#2b2622"} />
        <circle cx={x0 + totalW - 40} cy={baseY + 24} r={7} fill={plank} />
        {/* main diagonal support */}
        <line x1={x0} y1={baseY} x2={x0 + totalW} y2={baseY - totalH} stroke={frame} strokeWidth={5} strokeLinecap="round" />
        <line x1={x0 + totalW} y1={baseY} x2={x0 + totalW} y2={baseY - totalH - 46} stroke={frame} strokeWidth={5} strokeLinecap="round" />
      </motion.g>

      {/* rows */}
      {Array.from({ length: rows }).map((_, i) => {
        const x = x0 + i * td;
        const y = baseY - (i + 1) * rh;
        return (
          <motion.g key={i} {...rowAnim(i)}>
            {/* riser */}
            <rect x={x} y={y} width={td} height={rh} fill={dark ? "rgba(255,255,255,0.06)" : "rgba(23,20,17,0.05)"} />
            <line x1={x} y1={y} x2={x} y2={y + rh} stroke={frame} strokeWidth={2.5} />
            {/* tread */}
            <rect x={x} y={y - 3} width={td} height={6} rx={2} fill={plank} />
            {/* seat plank */}
            <rect x={x + td * 0.42} y={y - 15} width={td * 0.56} height={9} rx={3} fill={seat} />
            <line x1={x + td * 0.5} y1={y - 6} x2={x + td * 0.5} y2={y - 3} stroke={frame} strokeWidth={2} />
          </motion.g>
        );
      })}

      {/* guardrail */}
      <motion.g
        initial={{ opacity: 0, y: -12 }}
        {...(mode === "mount" ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
        transition={{ delay: delay + 1.2, duration: 0.6 }}
      >
        <line x1={x0 + totalW - td * 0.1} y1={baseY - totalH - 46} x2={x0 + totalW + 2} y2={baseY - totalH - 46} stroke={frame} strokeWidth={4} strokeLinecap="round" />
        <line x1={x0 + totalW - td * 0.1} y1={baseY - totalH - 46} x2={x0 + totalW - td * 0.1} y2={baseY - totalH} stroke={frame} strokeWidth={3} />
      </motion.g>
    </svg>
  );
}

/** Elevated modular platform with legs, guardrail, and an ADA ramp. */
function DeckIllustration({ className, mode, delay, dark }: { className?: string; mode: "view" | "mount"; delay: number; dark: boolean }) {
  const frame = dark ? "rgba(255,255,255,0.35)" : "var(--alu-dark)";
  const plank = "var(--alu)";
  const sections = 5;
  const x0 = 150;
  const secW = 84;
  const deckY = 200;
  const baseY = 300;
  const anim = (i: number, from: object) => ({
    initial: { opacity: 0, ...from },
    ...(mode === "mount" ? { animate: { opacity: 1, x: 0, y: 0 } } : { whileInView: { opacity: 1, x: 0, y: 0 }, viewport: { once: true, margin: "-15% 0px" } }),
    transition: { delay: delay + 0.2 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <svg viewBox="0 0 640 360" className={cn("h-auto w-full", className)} role="img" aria-label="Modular event deck illustration">
      <motion.ellipse cx={x0 + (sections * secW) / 2} cy={baseY + 30} rx={sections * secW * 0.6} ry={12} fill={dark ? "rgba(0,0,0,0.35)" : "rgba(23,20,17,0.08)"} {...anim(0, { scaleX: 0.6 })} />
      {/* ramp */}
      <motion.g {...anim(sections + 1, { x: -30 })}>
        <polygon points={`${x0 - 10},${deckY + 4} ${x0 - 10},${deckY + 12} ${x0 - 130},${baseY} ${x0 - 130},${baseY - 8}`} fill={plank} />
        <line x1={x0 - 130} y1={baseY - 8} x2={x0 - 10} y2={deckY + 4} stroke={frame} strokeWidth={3} />
        <line x1={x0 - 70} y1={baseY - 4} x2={x0 - 70} y2={baseY - 38} stroke={frame} strokeWidth={3} />
        <line x1={x0 - 130} y1={baseY - 30} x2={x0 - 10} y2={deckY - 24} stroke={frame} strokeWidth={3} strokeLinecap="round" />
      </motion.g>
      {Array.from({ length: sections }).map((_, i) => {
        const x = x0 + i * secW;
        return (
          <motion.g key={i} {...anim(i + 1, { y: 30 })}>
            <line x1={x + 8} y1={deckY + 12} x2={x + 8} y2={baseY} stroke={frame} strokeWidth={5} strokeLinecap="round" />
            <line x1={x + secW - 8} y1={deckY + 12} x2={x + secW - 8} y2={baseY} stroke={frame} strokeWidth={5} strokeLinecap="round" />
            <line x1={x + 8} y1={baseY - 40} x2={x + secW - 8} y2={baseY - 40} stroke={frame} strokeWidth={3} />
            <rect x={x} y={deckY} width={secW} height={12} rx={2} fill={plank} />
            <rect x={x + 2} y={deckY - 4} width={secW - 4} height={5} rx={2} fill="var(--accent)" />
            {/* rail */}
            <line x1={x + 6} y1={deckY - 4} x2={x + 6} y2={deckY - 50} stroke={frame} strokeWidth={3} />
            <line x1={x} y1={deckY - 50} x2={x + secW} y2={deckY - 50} stroke={frame} strokeWidth={4} strokeLinecap="round" />
            <line x1={x} y1={deckY - 28} x2={x + secW} y2={deckY - 28} stroke={frame} strokeWidth={2} />
          </motion.g>
        );
      })}
      {/* people-ish markers on deck */}
      {[1, 2, 3].map((n) => (
        <motion.g key={n} {...anim(sections + 1 + n, { y: -10 })}>
          <circle cx={x0 + n * 110} cy={deckY - 74} r={9} fill={dark ? "#f4a62a" : "var(--fg)"} opacity={0.85} />
          <rect x={x0 + n * 110 - 10} y={deckY - 62} width={20} height={26} rx={6} fill={dark ? "#f4a62a" : "var(--fg)"} opacity={0.85} />
        </motion.g>
      ))}
    </svg>
  );
}
