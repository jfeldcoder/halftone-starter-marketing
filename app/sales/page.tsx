import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import RentBuy from "@/components/RentBuy";
import Configurator from "@/components/Configurator";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import Photo from "@/components/Photo";
import { faqs } from "@/lib/content";
import { assetManifest } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sales & Rentals",
  description: "Rent EventPro bleachers for an event or buy a fleet with territory exclusivity. Compare options and plan your seating.",
  alternates: { canonical: "/sales" },
};

const TERRITORY = [
  { title: "Exclusive region", body: "We will not sell the same systems to another operator in your territory." },
  { title: "Factory support", body: "Training, parts, and service from Brooksville, Florida." },
  { title: "Marketing kit", body: "Photos, spec sheets, and co-branded materials to win local contracts." },
  { title: "Fleet pricing", body: "Volume pricing that improves as your fleet grows." },
];

const PURCHASE_STEPS = [
  { t: "Consult", b: "We size a fleet to your events and towing capacity." },
  { t: "Build", b: "Systems are manufactured to order in our Florida facility." },
  { t: "Deliver & train", b: "Delivered or picked up, with hands-on operator training." },
  { t: "Support", b: "Parts, service, and a direct line to the factory." },
];

export default function SalesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[72px]">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-page relative py-16 lg:py-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-accent">Sales & rentals</p>
            <h1 className="display mt-4 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
              Rent it for the weekend. <span className="text-gradient">Or own the season.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              Same patented systems either way. The right answer depends on how many events you run, where they are, and who sets up.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page pb-20 sm:pb-28">
        <Reveal>
          <RentBuy />
        </Reveal>
      </section>

      <section className="border-y border-line bg-bg-elev">
        <div className="container-page py-20 sm:py-28">
          <SectionHeading eyebrow="Interactive planner" title="How many seats do you need?" lead="Mix systems, see total capacity and setup time, then send us the configuration." />
          <div className="mt-12">
            <Configurator />
          </div>
        </div>
      </section>

      {/* Territory program */}
      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading eyebrow="For rental operators" title="Own your region." lead="Buy a fleet and secure exclusivity in your territory. Grow on capacity and service, not price." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {TERRITORY.map((t, i) => (
              <Reveal key={t.title} as="li" delay={i * 0.06}>
                <div className="card h-full p-5">
                  <h3 className="font-semibold text-fg">{t.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Link href="/blog/own-your-region-territorial-exclusivity" className="btn btn-ghost mt-8">
              Read about the program →
            </Link>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[4/3] lg:aspect-[4/5]">
            <Photo src={assetManifest.sales.fleet} alt="A fleet of EventPro bleachers ready to tow" />
          </div>
        </Reveal>
      </section>

      {/* Purchase process */}
      <section className="border-y border-line bg-ink text-white">
        <div className="container-page py-20 sm:py-28">
          <SectionHeading eyebrow="Buying a system" title="From consult to first event." light />
          <ol className="mt-12 grid gap-6 md:grid-cols-4">
            {PURCHASE_STEPS.map((s, i) => (
              <Reveal key={s.t} as="li" delay={i * 0.08}>
                <div className="relative border-t border-white/15 pt-6">
                  <span className="display text-sm font-extrabold text-accent">0{i + 1}</span>
                  <h3 className="display mt-2 text-xl font-extrabold">{s.t}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Questions" title="Rent vs. buy, answered." />
        <Reveal delay={0.1}>
          <FAQ items={faqs.filter((f) => /rent|sell|territory|lead|tow/i.test(f.q))} />
        </Reveal>
      </section>

      <CTABand title="Not sure which way to go?" body="Tell us how many events you run each year and we'll show you the math on renting versus owning." />
    </>
  );
}
