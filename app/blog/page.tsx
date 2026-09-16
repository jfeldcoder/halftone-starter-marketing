import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Dot } from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import ClosingCTA from "@/components/ClosingCTA";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on event seating, safety, ROI, and growing a rental business with EventPro Seating.",
  alternates: { canonical: "/blog" },
};

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="mx-auto max-w-content px-gutter pb-12 pt-28 lg:px-8 lg:pb-16 lg:pt-52">
        <Reveal>
          <p className="kicker text-accent-dark">Insights</p>
          <h1 className="type-display mt-3 text-[clamp(2.6rem,7vw,6rem)] text-fg">
            Notes from the field<Dot />
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-gutter pb-20 lg:px-8 lg:pb-28">
        <Reveal>
          <Link href={`/blog/${featured.slug}`} className="group grid gap-6 border-y border-line py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-8">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9]">
              <Photo src={featured.image} alt={featured.title} sizes="(min-width: 1024px) 60vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" priority />
              <div className="absolute inset-x-0 top-0 lg:hidden">
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-scrim/85 via-scrim/45 to-transparent" />
                <div className="relative px-gutter pb-20 pt-6">
                  <p className="kicker text-accent">{featured.categories[0]} · Latest</p>
                  <h2 className="type-display mt-3 text-[clamp(1.6rem,7vw,2.6rem)] text-white">{featured.title}</h2>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 lg:hidden">
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/45 to-transparent" />
                <p className="relative px-gutter pb-6 pt-20 text-[0.95rem] leading-relaxed text-white/85">{featured.excerpt}</p>
              </div>
            </div>
            <div>
              <p className="kicker hidden text-accent-dark lg:block">{featured.categories[0]} · Latest</p>
              <h2 className="type-display mt-3 hidden text-[clamp(1.8rem,3.6vw,3rem)] text-fg transition-colors group-hover:text-accent-dark lg:block">{featured.title}</h2>
              <p className="mt-4 hidden max-w-md text-[0.95rem] leading-relaxed text-fg-muted lg:block">{featured.excerpt}</p>
              <p className="kicker font-normal text-fg-faint lg:mt-6">
                {featured.author} · {fmt(featured.date)}
              </p>
            </div>
          </Link>
        </Reveal>

        <ul className="flex flex-col divide-y divide-line border-b border-line">
          {rest.map((p, i) => (
            <Reveal key={p.slug} as="li" delay={Math.min(i, 4) * 0.04}>
              <Link href={`/blog/${p.slug}`} className="group grid items-center gap-5 py-6 sm:grid-cols-[9rem_1fr_auto] lg:grid-cols-[12rem_1fr_auto]">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Photo src={p.image} alt={p.title} sizes="12rem" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="kicker text-accent-dark">{p.categories[0]}</p>
                  <h3 className="type-display mt-1.5 text-xl leading-tight text-fg transition-colors group-hover:text-accent-dark sm:text-2xl">{p.title}</h3>
                  <p className="mt-2 hidden max-w-xl text-sm text-fg-muted md:block">{p.excerpt}</p>
                </div>
                <p className="kicker font-normal text-fg-faint">{fmt(p.date)}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      <ClosingCTA image="/images/home/gallery-1.jpg" title={<>Seat the crowd<Dot /><br />Skip the crew<Dot /></>} />
    </>
  );
}
