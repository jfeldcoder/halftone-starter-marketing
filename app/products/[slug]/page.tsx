import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { resolveAsset } from "@/lib/assets";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import SectionHeading from "@/components/SectionHeading";
import BleacherIllustration from "@/components/BleacherIllustration";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import ProductCard from "@/components/ProductCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.intro, alternates: { canonical: `/products/${p.slug}` } };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const hero = resolveAsset(p.heroImage);
  const isDeck = p.slug === "event-deck";
  const related = products.filter((x) => x.slug !== p.slug);
  const gallery = p.gallery.map((path, i) => ({ path, src: resolveAsset(path), alt: `${p.name} photo ${i + 1}`, span: i === 0 ? ("wide" as const) : undefined }));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-[72px]">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow-accent">{p.kicker}</p>
              <h1 className="display mt-4 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl lg:text-7xl">{p.name}</h1>
              <p className="display mt-4 text-2xl font-semibold text-fg-muted">{p.headline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">{p.intro}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/contact?product=${p.slug}`} className="btn btn-primary">
                  Get a quote
                </Link>
                <a href="#specs" className="btn btn-ghost">
                  Full specs
                </a>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-line bg-bg-elev shadow-[0_40px_80px_-40px_rgb(23_20_17/0.4)]">
                {hero ? (
                  <Photo src={p.heroImage} alt={`${p.name} deployed at an event`} priority />
                ) : (
                  <div className="absolute inset-0 flex items-center p-6 sm:p-10">
                    <BleacherIllustration rows={p.rows} variant={isDeck ? "deck" : "bleacher"} mode="mount" delay={0.3} />
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Key numbers */}
      <section className="border-y border-line bg-ink text-white">
        <div className="container-page grid divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            { v: p.seats, s: "", l: isDeck ? "Guests or crew" : "Guests seated", alt: "" },
            { v: p.setupMinutes, s: " min", l: "Setup time" },
            { v: p.crew, s: "", l: `Operator${p.crew > 1 ? "s" : ""} required` },
            { v: isDeck ? null : p.rows, s: "", l: isDeck ? "Open footprint" : "Rows", alt: "37′ × 24′" },
          ].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.06} className="px-2 py-8 sm:px-8">
              <div className="display text-4xl font-extrabold text-accent">{k.v === null ? k.alt : <Counter value={k.v} suffix={k.s} />}</div>
              <div className="mt-1 text-sm text-white/60">{k.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlights + dimensions */}
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading eyebrow="At a glance" title="The short version." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {p.bullets.map((b, i) => (
              <Reveal key={b} as="li" delay={i * 0.05} y={12}>
                <div className="flex gap-3 rounded-2xl border border-line bg-bg-elev p-4 text-[15px] text-fg">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] text-on-accent">✓</span>
                  {b}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <div className="on-ink relative h-full overflow-hidden rounded-[1.5rem] bg-ink p-7 text-white">
            <div className="bg-grid-ink absolute inset-0 opacity-30" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Dimensions</p>
              <dl className="mt-5 space-y-5">
                {p.dimensions.map((d) => (
                  <div key={d.label}>
                    <dt className="text-sm text-white/60">{d.label}</dt>
                    <dd className="display mt-1 text-2xl font-extrabold text-accent">{d.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 opacity-80">
                <BleacherIllustration rows={p.rows} variant={isDeck ? "deck" : "bleacher"} dark />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Features */}
      <section className="border-t border-line bg-bg-elev">
        <div className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Built for the job" title="What makes it different." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="card card-hover h-full p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent-dark">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h3 className="display mt-4 text-xl font-extrabold text-fg">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </section>

      {/* Trailer-mounted variant (3 Row only) */}
      {p.variant && (
        <section className="container-page py-20 sm:py-28">
          <SectionHeading eyebrow={p.variant.name} title={p.variant.headline} lead={p.variant.intro} />
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {p.variant.bullets.map((b, i) => (
              <Reveal key={b} as="li" delay={i * 0.05} y={12}>
                <div className="flex gap-3 rounded-2xl border border-line p-4 text-[15px] text-fg">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[11px] text-accent-dark">✓</span>
                  {b}
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <Gallery items={p.variant.gallery.map((path, i) => ({ path, src: resolveAsset(path), alt: `${p.variant!.name} photo ${i + 1}`, span: i === 0 ? ("wide" as const) : undefined }))} />
          </div>
        </section>
      )}

      {/* Use cases + specs */}
      <section id="specs" className="border-y border-line bg-bg-elev">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Where it works" title="Built for these events." />
            <ul className="mt-8 flex flex-wrap gap-2">
              {p.useCases.map((u, i) => (
                <Reveal key={u} as="li" delay={i * 0.04} y={10}>
                  <span className="inline-block rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-fg">{u}</span>
                </Reveal>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              {p.rentOrBuy.includes("rent") && (
                <Link href={`/contact?product=${p.slug}&interest=rent`} className="btn btn-primary">
                  Rent this system
                </Link>
              )}
              {p.rentOrBuy.includes("buy") && (
                <Link href={`/contact?product=${p.slug}&interest=buy`} className="btn btn-ink">
                  Buy this system
                </Link>
              )}
            </div>
          </div>
          <Reveal delay={0.1}>
            <div className="card overflow-hidden">
              <div className="border-b border-line px-6 py-4">
                <h3 className="display text-lg font-extrabold text-fg">Specifications</h3>
              </div>
              <dl className="divide-y divide-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between gap-6 px-6 py-3.5 text-sm">
                    <dt className="text-fg-muted">{s.label}</dt>
                    <dd className="font-semibold text-fg">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-line px-6 py-3 text-xs text-fg-faint">Specifications from EventPro Seating product data. Confirm the configuration for your event with our team.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Gallery" title={`${p.name} in the field.`} />
        <div className="mt-12">
          <Gallery items={gallery} />
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line bg-bg-elev">
        <div className="container-page py-20 sm:py-28">
          <SectionHeading eyebrow="Also consider" title="Pair it with." />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {related.map((r, i) => (
              <ProductCard key={r.slug} product={r} image={resolveAsset(r.heroImage)} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Ready to put the ${p.name} to work?`} />
    </>
  );
}
