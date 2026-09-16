import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import { Dot } from "@/components/SectionHeading";
import QuoteForm from "@/components/QuoteForm";
import Photo from "@/components/Photo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Request a quote for EventPro bleachers or event decks. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto grid max-w-content gap-12 px-gutter pb-20 pt-28 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:pb-28 lg:pt-52">
        <div>
          <Reveal>
            <p className="kicker text-accent-dark">Contact</p>
            <h1 className="type-display mt-3 text-[clamp(2.6rem,6vw,5rem)] text-fg">
              Let&apos;s seat
              <br />
              your crowd<Dot />
            </h1>
            <p className="mt-6 max-w-md text-[0.98rem] leading-relaxed text-fg-muted">
              Tell us about the event and whether you want to rent or buy. We&apos;ll recommend a configuration and pricing within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 flex flex-col divide-y divide-line border-y border-line">
              <div className="py-5">
                <dt className="kicker text-fg-muted">Call</dt>
                <dd>
                  <a href={site.phoneHref} className="type-display mt-2 block text-3xl text-fg transition-colors hover:text-accent-dark">
                    {site.phone}
                  </a>
                  <p className="kicker mt-1 font-normal text-fg-faint">{site.hours}</p>
                </dd>
              </div>
              <div className="py-5">
                <dt className="kicker text-fg-muted">Visit</dt>
                <dd className="mono mt-2 text-sm leading-relaxed text-fg">
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden bg-surface lg:block">
              <Photo src="/images/products/10-row/gallery-4.jpg" alt="10 Row bleachers on a Florida field" sizes="40vw" />
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <Suspense fallback={<div className="h-[520px] animate-pulse bg-bg-elev" />}>
            <QuoteForm />
          </Suspense>
        </Reveal>
      </section>
    </>
  );
}
