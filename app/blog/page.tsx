import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import CTABand from "@/components/CTABand";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on event seating, safety, and growing a rental business with EventPro Seating.",
  alternates: { canonical: "/blog" },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="relative overflow-hidden pt-[72px]">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-page relative py-16 lg:py-20">
          <Reveal className="max-w-2xl">
            <p className="eyebrow-accent">Insights</p>
            <h1 className="display mt-4 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl">Notes from the field.</h1>
            <p className="mt-5 text-lg text-fg-muted">Event seating, safety, ROI, and how operators grow with EventPro. Written by Nick Pinto.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="card card-hover group grid overflow-hidden md:grid-cols-2">
            <div className="relative aspect-[16/10] md:aspect-auto">
              <Photo src={featured.image} alt={featured.title} className="transition-transform duration-700 group-hover:scale-105" priority />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="eyebrow-accent">{featured.categories[0]} · Featured</span>
              <h2 className="display mt-3 text-3xl font-extrabold leading-tight text-fg group-hover:text-accent-dark sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 text-fg-muted">{featured.excerpt}</p>
              <p className="mt-6 text-xs text-fg-faint">
                {fmt(featured.date)} · {featured.readMinutes} min read
              </p>
            </div>
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/blog/${p.slug}`} className="card card-hover group block h-full overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Photo src={p.image} alt={p.title} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="eyebrow-accent">{p.categories[0]}</span>
                  <h3 className="display mt-2 text-xl font-extrabold leading-snug text-fg group-hover:text-accent-dark">{p.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-fg-faint">
                    {fmt(p.date)} · {p.readMinutes} min read
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
