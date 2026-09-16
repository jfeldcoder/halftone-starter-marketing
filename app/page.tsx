import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ProcessSteps from "@/components/ProcessSteps";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import Photo from "@/components/Photo";
import { products } from "@/lib/products";
import Image from "next/image";
import { stats, profit, proof } from "@/lib/content";
import { posts } from "@/lib/posts";
import { assetManifest, resolveAsset } from "@/lib/assets";

const USE_CASES = ["Sporting events", "Graduations", "Festivals", "Concerts", "Schools", "Corporate events", "Motorsports", "Parades", "Fairs & expos", "Community centers"];

export default function Home() {
  const galleryItems = assetManifest.home.gallery.map((path, i) => ({
    path,
    src: resolveAsset(path),
    alt: ["Event Deck at a festival", "10 Row on a football field", "Fans on a 3 Row at a stadium", "3 Row under the palms", "Event Deck at a county fair", "10 Row packed for a night event"][i],
    span: i === 0 ? ("wide" as const) : i === 3 ? ("tall" as const) : undefined,
  }));

  return (
    <>
      <HomeHero image={resolveAsset(assetManifest.home.hero)} />

      <Marquee items={USE_CASES} />

      {/* Stats */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="border-l-2 border-accent pl-5">
              <div className="display text-5xl font-extrabold text-fg">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-fg-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="border-t border-line bg-bg-elev">
        <div className="container-page py-20 sm:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="The lineup" title="Three systems. Every crowd." lead="From a sideline bench to a festival grandstand, each system is engineered to be deployed by one person and moved to the next event." />
            <Reveal delay={0.1}>
              <Link href="/sales" className="btn btn-ghost">
                Compare rent vs. buy →
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} image={resolveAsset(p.heroImage)} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How to profit (from the current site) */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="How to profit with EventPro" title={<>Seating that shows up <span className="text-gradient">ready to unfold.</span></>} lead="Most temporary bleachers are still assembled from loose parts by a crew. Ours roll in on a chassis and lock into place, and every seat is revenue." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profit.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <div className="card card-hover flex h-full flex-col p-7">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
                  <Image src={w.icon} alt="" width={32} height={32} className="h-8 w-8" />
                </span>
                <h3 className="display mt-5 text-2xl font-extrabold text-fg">{w.title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-muted">{w.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.3}>
            <div className="on-ink relative flex h-full flex-col justify-between overflow-hidden rounded-[1.25rem] bg-ink p-7 text-white">
              <div className="bg-grid-ink absolute inset-0 opacity-30" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">Rent or buy</p>
                <p className="display mt-3 text-2xl font-extrabold">Purchase now, or rent today.</p>
              </div>
              <div className="relative mt-6 flex flex-col gap-2">
                <Link href="/contact?interest=buy" className="btn btn-primary">
                  Purchase now
                </Link>
                <Link href="/contact?interest=rent" className="btn btn-ghost">
                  Rent today
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-bg-elev">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How it works" title="From first call to folded away." lead="A simple process, whether you rent for a weekend or buy a fleet." />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Photo src={assetManifest.home.about} alt="One person unfolding a trailer-mounted 3 Row bleacher" />
            </div>
          </div>
          <div className="lg:pt-10">
            <ProcessSteps />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="In the field" title="Seen at fields, festivals, and finish lines." align="center" />
        <div className="mt-12">
          <Gallery items={galleryItems} />
        </div>
      </section>

      {/* Proof */}
      <section className="border-y border-line bg-ink text-white">
        <div className="container-page py-20 sm:py-28">
          <SectionHeading eyebrow="Proof, not promises" title="Numbers from the field." light />
          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
            {proof.map((p, i) => (
              <Reveal key={p.value} delay={i * 0.08} className="bg-ink p-8">
                <div className="display text-3xl font-extrabold text-accent sm:text-4xl">{p.value}</div>
                <div className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{p.label}</div>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      <section className="container-page py-20 sm:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Insights" title="From the blog." />
          <Reveal delay={0.1}>
            <Link href="/blog" className="btn btn-ghost">
              All articles →
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link href={`/blog/${p.slug}`} className="card card-hover group block h-full overflow-hidden">
                <div className="relative aspect-[16/10]">
                  <Photo src={p.image} alt={p.title} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="eyebrow-accent">{p.categories[0]}</span>
                  <h3 className="display mt-2 text-xl font-extrabold leading-snug text-fg group-hover:text-accent-dark">{p.title}</h3>
                  <p className="mt-2 text-sm text-fg-muted">{p.excerpt}</p>
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
