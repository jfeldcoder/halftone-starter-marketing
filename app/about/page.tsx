import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionHeading, { Dot } from "@/components/SectionHeading";
import SplitSection from "@/components/SplitSection";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import { faqs, timeline } from "@/lib/content";
import { assetManifest } from "@/lib/assets";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About & FAQ",
  description: "Over two decades of innovation in mobile bleacher systems, engineered and manufactured in Brooksville, Florida.",
  alternates: { canonical: "/about" },
};

const BEATS = [
  { k: "Innovating event spaces", v: "Founded over two decades ago with a groundbreaking vision, revolutionizing event viewing experiences with innovative modular bleacher systems." },
  { k: "Efficiency and safety first", v: "Patented mobile bleacher systems engineered for maximum simplicity, minimizing labor and cost while meeting the highest standards of safety and durability." },
  { k: "Commitment to excellence", v: "Continual innovation and a steadfast commitment to quality. Each project is a chance to turn an ordinary venue into a memorable landmark." },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-gutter pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-52">
        <Reveal>
          <p className="kicker text-accent-dark">About EventPro Seating</p>
          <h1 className="type-display mt-3 max-w-5xl text-[clamp(2.6rem,7vw,6rem)] text-fg">
            Over two decades
            <br />
            of innovation<Dot />
          </h1>
        </Reveal>
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {BEATS.map((b, i) => (
            <Reveal key={b.k} delay={i * 0.07}>
              <div className="border-t border-accent pt-5">
                <p className="kicker text-accent-dark">{b.k}</p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{b.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <SplitSection
        image={assetManifest.about.team}
        alt="Bleacher frames on the manufacturing floor in Brooksville, Florida"
        position="50% 40%"
        tone="elev"
        heading={{
          kicker: "Headquarters",
          title: (
            <>
              Brooksville, Florida<Dot />
            </>
          ),
          lead: "Systems are engineered, manufactured, and serviced at our facility north of Tampa. Purchased systems ship nationwide.",
        }}
      >
        <Reveal delay={0.1}>
          <div className="mono border-t border-line pt-6 text-sm leading-relaxed text-fg lg:mt-8">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.postalCode}
            <br />
            <span className="text-fg-muted">{site.hours}</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <a href={site.phoneHref} className="btn btn-ink">
              {site.phone}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Open in Maps →
            </a>
          </div>
        </Reveal>
      </SplitSection>

      <section className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
        <SectionHeading kicker="Our story" title={<>Built one event<br />at a time<Dot /></>} />
        <ol className="mt-12 flex flex-col divide-y divide-line border-y border-line">
          {timeline.map((t, i) => (
            <Reveal key={t.year} as="li" delay={i * 0.05}>
              <div className="grid gap-2 py-6 md:grid-cols-[8rem_1fr]">
                <p className="mono text-sm text-accent-dark">{t.year}</p>
                <div>
                  <p className="type-display text-2xl text-fg">{t.title}</p>
                  <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-fg-muted">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line bg-bg-elev">
        <div className="mx-auto grid max-w-content gap-12 px-gutter py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <SectionHeading kicker="FAQ" title={<>Questions we<br />hear most<Dot /></>} lead="Don't see yours? Call and talk to someone who builds the systems." />
          <Reveal delay={0.1}>
            <FAQ items={faqs} />
          </Reveal>
        </div>
      </section>

      <ClosingCTA image={assetManifest.about.facility} title={<>Let&apos;s seat<br />your crowd<Dot /></>} />
    </>
  );
}
