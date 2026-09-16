"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import BleacherIllustration from "@/components/BleacherIllustration";
import type { Product } from "@/lib/products";

/** Product tile with a cursor-following spotlight and a slight lift. */
export default function ProductCard({ product, image, index = 0 }: { product: Product; image: string | null; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link href={`/products/${product.slug}`} className="group block h-full">
        <div
          ref={ref}
          onMouseMove={(e) => {
            const r = ref.current?.getBoundingClientRect();
            if (!r) return;
            setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          className="card card-hover relative flex h-full flex-col overflow-hidden"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%)` }}
          />
          <div className="relative aspect-[4/3] overflow-hidden bg-bg-elev">
            {image ? (
              <Image src={image} alt={product.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
            ) : (
              <div className="absolute inset-0 flex items-end p-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                <BleacherIllustration rows={product.rows} variant={product.slug === "event-deck" ? "deck" : "bleacher"} delay={index * 0.1} />
              </div>
            )}
            <span className="absolute left-4 top-4 rounded-full bg-bg/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg backdrop-blur">
              {product.kicker}
            </span>
          </div>
          <div className="relative flex flex-1 flex-col p-6">
            <h3 className="display text-2xl font-extrabold text-fg">{product.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{product.headline}</p>
            <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-center">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-fg-faint">{product.slug === "event-deck" ? "Guests" : "Seats"}</dt>
                <dd className="display text-lg font-extrabold text-fg">{product.seats}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-fg-faint">Setup</dt>
                <dd className="display text-lg font-extrabold text-fg">{product.setupMinutes} min</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-fg-faint">Crew</dt>
                <dd className="display text-lg font-extrabold text-fg">{product.crew}</dd>
              </div>
            </dl>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-dark">
              Explore
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
