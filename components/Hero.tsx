"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";

/** Full-bleed photo hero, copy bottom-left, nav floats over the top. */
export default function Hero({ image }: { image: string | null }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="on-ink relative flex min-h-svh flex-col justify-end overflow-hidden bg-scrim text-white">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 -bottom-32">
        {image ? (
          <Image src={image} alt="A packed EventPro 10 Row bleacher at a night event" fill priority sizes="100vw" quality={88} className="object-cover object-[50%_40%]" />
        ) : (
          <div className="placeholder-stripes absolute inset-0" />
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/45 to-scrim/10" />

      <div className="relative z-10 mx-auto w-full max-w-content px-gutter pb-12 pt-40 lg:px-8 lg:pb-16">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="kicker text-accent">
          Patented · Made in the USA · One-person setup
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className="type-display type-hero mt-4 max-w-5xl text-[clamp(2.6rem,7.2vw,6.4rem)]"
        >
          Premier bleacher systems
          <br />
          for every event<span className="text-accent">.</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-6 max-w-lg text-[0.98rem] leading-relaxed text-white/75">
          Mobile bleachers and event decks that one person unfolds in minutes. Rent for the weekend or own a fleet.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/contact" className="btn btn-primary">
            Get a quote
          </Link>
          <Link href="/products/10-row-bleachers" className="btn btn-ghost">
            See the lineup
          </Link>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mono mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-white/15 pt-5 text-[0.65rem] uppercase tracking-[0.22em] text-white/60"
        >
          <li>3 Row · 15 seats · 5 min</li>
          <li>10 Row · 160 seats · 15 min</li>
          <li>Event Deck · 120 guests · 1 hr</li>
          <li className="hidden sm:block">{site.phone}</li>
        </motion.ul>
      </div>
    </section>
  );
}
