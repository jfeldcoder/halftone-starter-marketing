"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BleacherIllustration from "@/components/BleacherIllustration";
import { site } from "@/lib/site";

const words = ["Premier", "bleacher", "systems", "for", "every", "event."];

export default function HomeHero({ image }: { image: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-[72px]">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <motion.div
        className="absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-accent/15 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sand/40 blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-page relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-6">
          <motion.p
            className="eyebrow-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Patented · USA-made · One-person setup
          </motion.p>
          <h1 className="display mt-5 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 pr-[0.22em] align-top">
                <motion.span
                  className={`inline-block ${i === 1 ? "text-gradient" : ""}`}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.description}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/contact" className="btn btn-primary">
              Get a quote
            </Link>
            <Link href="/products/10-row-bleachers" className="btn btn-ghost">
              See the 10 Row
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
          <motion.ul
            className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-fg-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            {["3 Row · 15 seats · 5 min", "10 Row · 160 seats · 15 min", "Event Deck · modular"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div style={{ y: yArt }} className="relative pb-10 lg:col-span-6 lg:pb-0">
          <div className="relative">
            {image ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgb(23_20_17/0.5)]"
              >
                <Image src={image} alt="EventPro 10 Row bleacher deployed at an event" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </motion.div>
            ) : (
              <div className="relative rounded-[2rem] border border-line bg-bg/60 p-4 backdrop-blur-sm sm:p-8">
                <BleacherIllustration rows={10} mode="mount" delay={0.4} />
              </div>
            )}

            <motion.div
              className="card absolute -left-3 top-8 flex items-center gap-3 px-4 py-3 shadow-lg sm:-left-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-dark">⏱</span>
              <div>
                <div className="display text-lg font-extrabold leading-none text-fg">15 min</div>
                <div className="text-[11px] text-fg-faint">setup, one operator</div>
              </div>
            </motion.div>
            <motion.div
              className="card absolute -bottom-4 right-2 flex items-center gap-3 px-4 py-3 shadow-lg sm:-right-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent-dark">🇺🇸</span>
              <div>
                <div className="display text-lg font-extrabold leading-none text-fg">Made in USA</div>
                <div className="text-[11px] text-fg-faint">Brooksville, Florida</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#products"
        aria-label="Scroll to products"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-fg-faint lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Scroll
        <motion.span className="h-8 w-px bg-fg-faint" animate={{ scaleY: [0.2, 1, 0.2] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ originY: 0 }} />
      </motion.a>
    </section>
  );
}
