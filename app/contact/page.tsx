import type { Metadata } from "next";
import { Suspense } from "react";
import Reveal from "@/components/Reveal";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description: "Request a quote for EventPro bleachers or event decks. We reply within one business day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-[72px]">
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_60%)]" />
      <div className="container-page relative grid gap-12 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow-accent">Contact</p>
            <h1 className="display mt-4 text-5xl font-extrabold leading-[0.98] text-fg sm:text-6xl">Let&apos;s seat your crowd.</h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
              Tell us about the event and whether you want to rent or buy. We&apos;ll recommend a configuration and pricing within one business day.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <div className="card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-faint">Call</p>
              <a href={site.phoneHref} className="display mt-1 block text-2xl font-extrabold text-fg hover:text-accent-dark">
                {site.phone}
              </a>
              <p className="mt-1 text-sm text-fg-muted">{site.hours}</p>
            </div>
            <div className="card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-faint">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-lg font-semibold text-fg hover:text-accent-dark">
                {site.email}
              </a>
            </div>
            <div className="card p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fg-faint">Visit</p>
              <p className="mt-1 text-fg">
                {site.address.street}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </p>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal delay={0.15}>
            <Suspense fallback={<div className="card h-[520px] animate-pulse bg-bg-elev" />}>
              <QuoteForm />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
