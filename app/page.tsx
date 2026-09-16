import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal, { Ticker } from "@/components/Reveal";
import SectionHeading, { Dot } from "@/components/SectionHeading";
import ProductTile from "@/components/ProductTile";
import Banner from "@/components/Banner";
import SplitSection from "@/components/SplitSection";
import NumberedRows from "@/components/NumberedRows";
import PhotoReel from "@/components/PhotoReel";
import ClosingCTA from "@/components/ClosingCTA";
import Photo from "@/components/Photo";
import { products } from "@/lib/products";
import { profit } from "@/lib/content";
import { posts } from "@/lib/posts";
import { assetManifest, resolveAsset } from "@/lib/assets";

const COMMITMENT = [
  { k: "Dependable systems", v: "Top-tier bleacher and deck solutions for events of any scale, from a local gathering to a major sporting event." },
  { k: "Customized support", v: "No two events are alike. From the first consultation to post-event follow-up, expert advice and responsive service whether you rent or buy." },
  { k: "Innovative and adaptable", v: "Designed to meet the evolving demands of any event, with features that improve attendee comfort and the viewing experience." },
  { k: "Made in the USA", v: "Engineered and manufactured in the USA for long-term reliability, whether you rent for a single event or purchase for many." },
];

const USE_CASES = ["Sporting events", "Graduations", "Festivals", "Concerts", "Schools", "Corporate events", "Motorsports", "Parades", "Fairs & expos", "Community centers"];

export default function Home() {
  const slides = [
    { kicker: "3×3 Row Bleachers", quote: "$26K in a day. Proven revenue potential from one trailer.", image: resolveAsset(assetManifest.home.hero) },
    { kicker: "10 Row Bleachers", quote: "160 guests seated in 15 minutes by a single individual.", image: resolveAsset(assetManifest.home.gallery[0]) },
    { kicker: "Patent No. US 12,084,881 B1", quote: "Newly patented technology. Engineered and built in Brooksville, Florida.", image: resolveAsset(assetManifest.home.gallery[2]) },
  ];

  const reel = [
    { src: resolveAsset("/images/home/gallery-4.jpg"), alt: "3 Row under the palms" },
    { src: resolveAsset("/images/products/10-row/gallery-3.jpg"), alt: "10 Row on the sand" },
    { src: resolveAsset("/images/products/event-deck/gallery-4.jpg"), alt: "Event Suite, nutrition lounge" },
    { src: resolveAsset("/images/home/gallery-5.jpg"), alt: "Event Deck at the fair" },
    { src: resolveAsset("/images/products/3-row/gallery-3.jpg"), alt: "3 Row courtside" },
    { src: resolveAsset("/images/products/10-row/gallery-5.jpg"), alt: "10 Row, ready to unfold" },
    { src: resolveAsset("/images/products/event-deck/gallery-6.jpg"), alt: "Event Deck folded for transport" },
    { src: resolveAsset("/images/home/gallery-6.jpg"), alt: "10 Row at a night event" },
  ];

  return (
    <>
      <Hero image={resolveAsset(assetManifest.home.heroAlt)} />

      <Ticker items={USE_CASES} />

      {/* Lineup */}
      <section>
        <div className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-display text-[clamp(2.2rem,5vw,4.2rem)] text-fg">
                The lineup<Dot />
              </h2>
              <Link href="/sales" className="link-arrow">
                Rent or buy →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3 lg:gap-8">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <ProductTile product={p} image={resolveAsset(p.heroImage)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Banner slides={slides} />

      {/* Our commitment to excellence (from the live site), on olive */}
      <section
        className="on-ink text-white"
        style={{ background: "linear-gradient(to bottom, var(--bg) 0%, var(--ink) 22%, var(--ink) 78%, var(--bg) 100%)" }}
      >
        <div className="mx-auto max-w-content px-gutter py-40 lg:px-8 lg:py-56">
          <SectionHeading kicker="Our commitment to excellence" title={<>Dependable seating<br />for every occasion<Dot /></>} light size="lg" />
          <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {COMMITMENT.map((c, i) => (
              <Reveal key={c.k} delay={i * 0.06}>
                <div className="border-t border-accent pt-5">
                  <p className="mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <p className="type-display mt-3 text-xl text-white">{c.k}</p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-white/65">{c.v}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Made in the USA */}
      <SplitSection image={assetManifest.about.team} noTopRule alt="Bleacher frames on the manufacturing floor in Brooksville, Florida" position="50% 40%">
        <Reveal>
          <p className="kicker text-accent-dark">Made in the USA</p>
          <h2 className="type-display mt-4 text-[clamp(1.9rem,3.8vw,3.2rem)] text-fg">
            Built in Brooksville,
            <br />
            Florida<Dot />
          </h2>
          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-fg-muted">
            Over two decades of innovation in modular bleacher systems. Every unit is engineered and manufactured in our own facility, then put to work at events nationwide.
          </p>
        </Reveal>
        <NumberedRows
          className="mt-8 lg:mt-10"
          rows={[
            { title: "Patented fold-out design", sub: "No loose parts, no crew" },
            { title: "ICC and NFPA compliant", sub: "Guardrails, closed risers, non-slip treads" },
            { title: "Aluminum, built to last", sub: "Indoor and outdoor, year after year" },
          ]}
        />
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-5 lg:mt-10">
            <Link href="/about" className="btn btn-ink">
              Our story
            </Link>
            <Link href="/about#faq" className="link-arrow">
              Read the FAQ →
            </Link>
          </div>
        </Reveal>
      </SplitSection>

      {/* Rent or own */}
      <SplitSection image={assetManifest.sales.fleet} alt="Towing an EventPro Event Deck to the venue" flip position="50% 60%">
        <Reveal>
          <p className="kicker text-accent-dark">Sales and rentals</p>
          <h2 className="type-display mt-4 text-[clamp(1.9rem,3.8vw,3.2rem)] text-fg">
            Rent it for the weekend<Dot />
            <br />
            Or own the season<Dot />
          </h2>
          <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-fg-muted">
            Same patented systems either way. Rentals arrive on our trailers with our operator. Purchased systems tow behind a light-duty truck, so your crew brings them anywhere.
          </p>
        </Reveal>
        <NumberedRows
          className="mt-8 lg:mt-10"
          rows={[
            { title: "Rent today", sub: "Delivered, deployed, picked up" },
            { title: "Purchase now", sub: "Pays for itself in a season" },
            { title: "Own your region", sub: "Territory exclusivity for operators" },
          ]}
        />
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-5 lg:mt-10">
            <Link href="/sales" className="btn btn-primary">
              Compare rent vs. buy
            </Link>
            <Link href="/contact" className="link-arrow">
              Get a quote →
            </Link>
          </div>
        </Reveal>
      </SplitSection>

      {/* In the field: horizontal reel */}
      <section className="overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-content px-gutter lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-fg">
                Fields<Dot /> Festivals<Dot />
                <br />
                Finish lines<Dot />
              </h2>
              <p className="kicker font-normal text-fg-muted">Drag or use the arrows</p>
            </div>
          </Reveal>
        </div>
        <div className="mt-10">
          <PhotoReel items={reel} />
        </div>
      </section>

      {/* How to profit */}
      <section className="border-t border-line bg-bg-elev">
        <div className="mx-auto grid max-w-content gap-12 px-gutter py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <SectionHeading kicker="How to profit with EventPro" title={<>More seats<Dot /> More tickets<Dot /></>} lead="Systems ready in moments save time and labor. Every seat you add is revenue you keep." />
          <div className="flex flex-col divide-y divide-line border-y border-line">
            {profit.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.05}>
                <div className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr] lg:py-6">
                  <p className="mono text-sm text-accent-dark">{String(i + 1).padStart(2, "0")}</p>
                  <div>
                    <p className="type-display text-xl text-fg sm:text-2xl">{w.title}</p>
                    <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-fg-muted">{w.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA image="/images/home/gallery-6.jpg" title={<>Seat the crowd<Dot /><br />Skip the crew<Dot /></>} />

      {/* Latest from the blog */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="type-display text-[clamp(1.9rem,4.2vw,3.4rem)] text-fg">
                From the blog<Dot />
              </h2>
              <Link href="/blog" className="link-arrow">
                All articles →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link href={`/blog/${p.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                    <Photo src={p.image} alt={p.title} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="kicker mt-5 text-accent-dark">{p.categories[0]}</p>
                  <h3 className="type-display mt-2 text-xl leading-tight text-fg transition-colors group-hover:text-accent-dark sm:text-2xl">{p.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
