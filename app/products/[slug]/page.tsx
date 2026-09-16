import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { resolveAsset } from "@/lib/assets";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import SectionHeading, { Dot } from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import Banner from "@/components/Banner";
import SplitSection from "@/components/SplitSection";
import ProductTile from "@/components/ProductTile";
import ClosingCTA from "@/components/ClosingCTA";

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

  const related = products.filter((x) => x.slug !== p.slug);
  const gallery = p.gallery.map((path, i) => ({ path, src: resolveAsset(path), alt: `${p.name}, photo ${i + 1}`, span: i === 0 ? ("wide" as const) : undefined }));
  const slides = p.bullets.slice(0, 3).map((b) => ({ kicker: p.name, quote: b, image: resolveAsset(p.gallery[1] ?? p.heroImage) }));

  return (
    <>
      {/* Title + photo */}
      <section className="mx-auto max-w-content px-gutter pt-28 lg:px-8 lg:pt-52">
        <Reveal>
          <p className="kicker text-accent-dark">{p.kicker}</p>
          <h1 className="type-display mt-3 text-[clamp(2.6rem,7vw,6rem)] text-fg">
            {p.name}
            <Dot />
          </h1>
        </Reveal>
      </section>
      <section className="mx-auto max-w-content px-gutter pt-10 lg:px-8 lg:pt-14">
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden bg-surface lg:aspect-[21/9]">
            <Photo src={p.heroImage} alt={`${p.name} deployed at an event`} sizes="100vw" priority />
          </div>
        </Reveal>
      </section>

      {/* Copy + facts */}
      <section className="mx-auto grid max-w-content gap-12 px-gutter py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <Reveal>
            <h2 className="type-display text-[clamp(1.8rem,3.6vw,3rem)] text-fg">{p.headline}</h2>
            <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-fg-muted">{p.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={`/contact?product=${p.slug}&interest=rent`} className="btn btn-primary">
                Rent today
              </Link>
              <Link href={`/contact?product=${p.slug}&interest=buy`} className="btn btn-ink">
                Purchase now
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {p.dimensions.map((d, i) => (
              <Reveal key={d.label} delay={i * 0.05}>
                <div className="border-t border-accent pt-4">
                  <p className="kicker text-fg-muted">{d.label}</p>
                  <p className="type-display mt-2 text-2xl text-fg sm:text-3xl">{d.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <ul className="flex flex-col divide-y divide-line border-y border-line self-start">
          {p.bullets.map((b, i) => (
            <Reveal key={b} as="li" delay={i * 0.04}>
              <div className="flex items-baseline gap-5 py-4">
                <span className="mono text-sm text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[0.95rem] text-fg">{b}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <Banner slides={slides} />

      {/* Features */}
      <section className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
        <SectionHeading kicker="Built for the job" title={<>What makes it different<Dot /></>} />
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="border-t border-line pt-5">
                <p className="mono text-sm text-accent-dark">{String(i + 1).padStart(2, "0")}</p>
                <p className="type-display mt-3 text-xl text-fg">{f.title}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-fg-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trailer variant (3 Row only) */}
      {p.variant && (
        <>
          <SplitSection image={p.variant.gallery[0]} alt={`${p.variant.name} on the trailer`} tone="elev">
            <Reveal>
              <p className="kicker text-accent-dark">{p.variant.name}</p>
              <h2 className="type-display mt-4 text-[clamp(1.9rem,3.8vw,3.2rem)] text-fg">
                More seating<Dot />
                <br />
                Maximum flexibility<Dot />
              </h2>
              <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-fg-muted">{p.variant.intro}</p>
            </Reveal>
            <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
              {p.variant.bullets.map((b, i) => (
                <Reveal key={b} as="li" delay={i * 0.04}>
                  <div className="flex items-baseline gap-5 py-3.5">
                    <span className="mono text-sm text-accent-dark">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[0.92rem] text-fg">{b}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </SplitSection>
          <section className="mx-auto max-w-content px-gutter py-16 lg:px-8 lg:py-20">
            <Gallery items={p.variant.gallery.slice(1).map((path, i) => ({ path, src: resolveAsset(path), alt: `${p.variant!.name}, photo ${i + 1}` }))} />
          </section>
        </>
      )}

      {/* Specs + use cases */}
      <section className="border-y border-line bg-bg-elev">
        <div className="mx-auto grid max-w-content gap-12 px-gutter py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <SectionHeading kicker="Where it works" title={<>Built for these events<Dot /></>} />
            <ul className="mt-8 flex flex-col divide-y divide-line border-y border-line">
              {p.useCases.map((u) => (
                <li key={u} className="type-display py-3 text-xl text-fg">
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="kicker text-accent-dark">Specifications</p>
            <dl className="mt-4 flex flex-col divide-y divide-line border-y border-line">
              {p.specs.map((s) => (
                <div key={s.label} className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="kicker font-normal text-fg-muted">{s.label}</dt>
                  <dd className="text-right text-sm font-bold uppercase tracking-[0.04em] text-fg">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="kicker mt-4 font-normal text-fg-faint">From EventPro Seating product data</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
        <SectionHeading kicker="Gallery" title={<>{p.name} in the field<Dot /></>} />
        <div className="mt-10">
          <Gallery items={gallery} />
        </div>
      </section>

      {/* Related */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
          <Reveal>
            <h2 className="type-display text-[clamp(1.9rem,4.2vw,3.4rem)] text-fg">
              Runs well with<Dot />
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:gap-8">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.06}>
                <ProductTile product={r} image={resolveAsset(r.heroImage)} wide />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA image={p.gallery[2] ?? p.heroImage} title={<>Ready to put the<br />{p.name} to work<Dot /></>} />
    </>
  );
}
