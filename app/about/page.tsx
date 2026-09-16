import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import FAQ from "@/components/FAQ";
import CTABand from "@/components/CTABand";
import Photo from "@/components/Photo";
import Counter from "@/components/Counter";
import { faqs, timeline } from "@/lib/content";
import { assetManifest } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & FAQ",
  description: "Over two decades of innovation in mobile bleacher systems, engineered and manufactured in Brooksville, Florida.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { t: "Simplicity", b: "If it needs a crew, it is not finished. Every system is designed to be deployed by one person." },
  { t: "Safety", b: "Guardrails, closed risers, and rated structures are engineered in from the start, not bolted on later." },
  { t: "Durability", b: "Aluminum and galvanized steel chosen for years of outdoor use, not one season." },
  { t: "Service", b: "From the first consultation to post-event follow-up, you talk to the people who build the systems." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[72px]">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow-accent">About EventPro Seating</p>
            <h1 className="display mt-4 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
              Over two decades of <span className="text-gradient">innovation.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              EventPro Seating was founded on a simple idea: temporary seating should not need a crew, a crane, or a week. Today our patented mobile bleacher systems and modular event decks are engineered and manufactured in Brooksville, Florida, and put to work at events nationwide.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Photo src={assetManifest.about.team} alt="Bleacher frames on the manufacturing floor in Brooksville, Florida" priority />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink text-white">
        <div className="container-page grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { v: 20, s: "+", l: "Years in bleachers" },
            { v: 1000, s: "s", l: "Of event days seated" },
            { v: 100, s: "%", l: "Made in the USA" },
          ].map((k, i) => (
            <Reveal key={k.l} delay={i * 0.06} className="px-2 py-8 sm:px-8">
              <div className="display text-4xl font-extrabold text-accent">
                <Counter value={k.v} suffix={k.s} />
              </div>
              <div className="mt-1 text-sm text-white/60">{k.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="container-page py-20 sm:py-28">
        <SectionHeading eyebrow="Our story" title="Built one event at a time." />
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {timeline.map((t, i) => (
            <Reveal key={t.year} as="li" delay={i * 0.08}>
              <div className="relative border-t-2 border-line pt-6">
                <span className="absolute -top-[2px] left-0 h-[2px] w-12 bg-accent" />
                <span className="display text-sm font-extrabold text-accent-dark">{t.year}</span>
                <h3 className="display mt-2 text-xl font-extrabold text-fg">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Values + facility */}
      <section className="border-y border-line bg-bg-elev">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
              <Photo src={assetManifest.about.facility} alt="The full lineup: 3 Row, 10 Row, and Event Deck" />
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="What we stand for" title="Engineered for the person setting it up." />
            <ul className="mt-8 divide-y divide-line">
              {VALUES.map((v, i) => (
                <Reveal key={v.t} as="li" delay={i * 0.06} className="py-5">
                  <h3 className="display text-xl font-extrabold text-fg">{v.t}</h3>
                  <p className="mt-1 text-[15px] text-fg-muted">{v.b}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_1fr]">
        <SectionHeading eyebrow="Headquarters" title="Brooksville, Florida." lead="Systems are engineered, manufactured, and serviced at our facility north of Tampa. Rentals serve the Southeast; purchased systems ship nationwide." />
        <Reveal delay={0.1}>
          <div className="card flex h-full flex-col justify-between p-7">
            <div>
              <p className="display text-xl font-extrabold text-fg">{site.name}</p>
              <p className="mt-2 text-fg-muted">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
              <p className="mt-4 text-sm text-fg-muted">{site.hours}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={site.phoneHref} className="btn btn-primary">
                {site.phone}
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-line bg-bg-elev scroll-mt-20">
        <div className="container-page grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title="Questions we hear most." lead="Don't see yours? Call us and talk to someone who builds the systems." />
          <Reveal delay={0.1}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
