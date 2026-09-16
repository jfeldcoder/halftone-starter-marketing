import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionHeading, { Dot } from "@/components/SectionHeading";
import RentBuy from "@/components/RentBuy";
import Configurator from "@/components/Configurator";
import SplitSection from "@/components/SplitSection";
import NumberedRows from "@/components/NumberedRows";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import { faqs } from "@/lib/content";
import { assetManifest } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Sales & Rentals",
  description: "Rent EventPro bleachers for an event or buy a fleet with territory exclusivity. Compare options and plan your seating.",
  alternates: { canonical: "/sales" },
};

export default function SalesPage() {
  return (
    <>
      <section className="mx-auto max-w-content px-gutter pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-52">
        <Reveal>
          <p className="kicker text-accent-dark">Sales and rentals</p>
          <h1 className="type-display mt-3 max-w-5xl text-[clamp(2.6rem,7vw,6rem)] text-fg">
            Rent it for the weekend<Dot />
            <br />
            Or own the season<Dot />
          </h1>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-fg-muted">
            Same patented systems either way. The right answer depends on how many events you run, where they are, and who sets up.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-content px-gutter pb-20 lg:px-8 lg:pb-28">
        <Reveal>
          <RentBuy />
        </Reveal>
      </section>

      <section className="border-t border-line bg-bg-elev">
        <div className="mx-auto max-w-content px-gutter py-20 lg:px-8 lg:py-28">
          <SectionHeading kicker="Seating planner" title={<>How many seats do you need<Dot /></>} lead="Mix systems, watch capacity and setup time update, then send us the configuration." />
          <div className="mt-12">
            <Configurator />
          </div>
        </div>
      </section>

      <SplitSection
        image={assetManifest.sales.allProducts}
        alt="The full lineup: 3 Row, 10 Row, and Event Deck"
        flip
        position="50% 50%"
        heading={{
          kicker: "For rental operators",
          title: (
            <>
              Own your region<Dot />
            </>
          ),
          lead: "Buy a fleet and secure exclusivity in your territory. Grow on capacity and service, not price.",
        }}
      >
        <NumberedRows
          className="lg:mt-10"
          rows={[
            { title: "Exclusive region", sub: "No one else in your territory runs these systems" },
            { title: "Factory support", sub: "Training, parts, and service from Brooksville" },
            { title: "Fleet pricing", sub: "Improves as your fleet grows" },
          ]}
        />
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center gap-5 lg:mt-10">
            <Link href="/contact?interest=buy" className="btn btn-primary">
              Talk to sales
            </Link>
            <Link href="/blog/territorial-exclusivity-market-share" className="link-arrow">
              Read about the program →
            </Link>
          </div>
        </Reveal>
      </SplitSection>

      <section className="mx-auto grid max-w-content gap-12 px-gutter py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
        <SectionHeading kicker="Buying a system" title={<>From consult<br />to first event<Dot /></>} />
        <NumberedRows
          rows={[
            { title: "Consult", sub: "We size a fleet to your events and towing capacity" },
            { title: "Build", sub: "Manufactured to order in our Florida facility" },
            { title: "Deliver and train", sub: "Delivered or picked up, with hands-on operator training" },
            { title: "Support", sub: "Parts, service, and a direct line to the factory" },
          ]}
        />
      </section>

      <section className="border-t border-line bg-bg-elev">
        <div className="mx-auto grid max-w-content gap-12 px-gutter py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <SectionHeading kicker="Questions" title={<>Rent vs. buy,<br />answered<Dot /></>} />
          <Reveal delay={0.1}>
            <FAQ items={faqs.filter((f) => /rent|sell|territory|tow|indoors/i.test(f.q))} />
          </Reveal>
        </div>
      </section>

      <ClosingCTA image="/images/products/10-row/gallery-1.jpg" title={<>Not sure<br />which way to go<Dot /></>} cta="Ask us" />
    </>
  );
}
