import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import ProcessSteps from "@/components/ProcessSteps";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import CTABand from "@/components/CTABand";
import Photo from "@/components/Photo";
import BleacherIllustration from "@/components/BleacherIllustration";
import { products } from "@/lib/products";
import { stats, posts } from "@/lib/content";
import { assetManifest, resolveAsset } from "@/lib/assets";

const USE_CASES = ["Sporting events", "Graduations", "Festivals", "Concerts", "Schools", "Corporate events", "Motorsports", "Parades", "Fairs & expos", "Community centers"];

const WHY = [
  { title: "One operator, minutes not hours", body: "Patented fold-out design deploys from the trailer. No pallets of parts, no scaffold crew, no lost day.", big: true },
  { title: "Towable", body: "Hitch it to a truck and it goes where the crowd is." },
  { title: "Made in the USA", body: "Engineered and manufactured in Brooksville, Florida." },
  { title: "Code-compliant", body: "Guardrails, closed risers, and treads to ICC 300. ADA options on Event Deck." },
  { title: "Rent or own", body: "Weekend rentals or a fleet with territory exclusivity for operators.", big: true },
];

export default function Home() {
  const galleryItems = assetManifest.home.gallery.map((path, i) => ({
    path,
    src: resolveAsset(path),
    alt: ["10 Row at a stadium event", "Event Deck VIP platform", "3 Row on a sideline", "Towing a 10 Row", "Festival crowd seated", "Graduation ceremony"][i],
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

      {/* Why */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Why EventPro" title={<>Seating that shows up <span className="text-gradient">ready to unfold.</span></>} lead="Most temporary bleachers are still assembled from loose parts by a crew. Ours roll in on a chassis and lock into place." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06} className={w.big ? "md:col-span-2" : ""}>
              <div className="card card-hover h-full p-7">
                <span className="display text-sm font-extrabold text-accent">0{i + 1}</span>
                <h3 className="display mt-3 text-2xl font-extrabold text-fg">{w.title}</h3>
                <p className="mt-2 max-w-md text-[15px] leading-relaxed text-fg-muted">{w.body}</p>
                {w.big && i === 0 && (
                  <div className="mt-6 max-w-md opacity-90">
                    <BleacherIllustration rows={3} />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-bg-elev">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How it works" title="From first call to folded away." lead="A simple process, whether you rent for a weekend or buy a fleet." />
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Photo src={assetManifest.home.about} alt="EventPro operator deploying a 10 Row bleacher" />
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

      {/* Testimonials */}
      <section className="border-y border-line bg-bg-elev">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="What clients say" title="Less crew. More crowd." />
          <Testimonials />
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
                  <span className="eyebrow-accent">{p.category}</span>
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
