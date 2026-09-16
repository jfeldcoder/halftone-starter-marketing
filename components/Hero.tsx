"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Full-bleed photo hero, copy bottom-left, nav floats over the top. */
export default function Hero({ image }: { image: string | null }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="on-ink relative flex min-h-svh flex-col justify-between overflow-hidden bg-scrim text-white lg:justify-end">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 -bottom-32">
        {image ? (
          <Image src={image} alt="A packed EventPro 10 Row bleacher at a night event" fill priority sizes="100vw" quality={88} className="object-cover object-[50%_40%]" />
        ) : (
          <div className="placeholder-stripes absolute inset-0" />
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/45 to-scrim/10" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-scrim/80 via-scrim/35 to-transparent lg:hidden" />

      <div className="relative z-10 mx-auto w-full max-w-content px-gutter pt-28 lg:px-8 lg:pt-40">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease }}
          className="type-display type-hero max-w-5xl text-[2.2rem] sm:text-[clamp(2.6rem,7.2vw,6.4rem)]"
        >
          Premier bleacher systems
          <br />
          for every event<span className="text-accent">.</span>
        </motion.h1>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-content px-gutter pb-12 lg:px-8 lg:pb-16">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="max-w-lg text-[0.98rem] leading-relaxed text-white/75 lg:mt-6">
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
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.6 }} className="kicker mt-8 text-accent">
          Patented · Made in the USA · One-person setup
        </motion.p>
      </div>
    </section>
  );
}
