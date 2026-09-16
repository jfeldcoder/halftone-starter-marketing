import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export default function CTABand({
  title = "Seat the crowd. Skip the crew.",
  body = "Rent for the weekend or own a fleet. Tell us about the event and we'll recommend a configuration the same day.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-page py-20 sm:py-28">
      <Reveal>
        <div className="on-ink relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-white sm:px-14 sm:py-20">
          <div className="bg-grid-ink absolute inset-0 opacity-30" />
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-sand/10 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="display text-3xl font-extrabold leading-[1.05] sm:text-5xl">{title}</h2>
              <p className="mt-4 max-w-xl text-white/65">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link href="/contact" className="btn btn-primary">
                Get a quote
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
