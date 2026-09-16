import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

/** Full-bleed photo with the closing line and one button. */
export default function ClosingCTA({
  image,
  title,
  cta = "Get a quote",
  href = "/contact",
  position = "50% 40%",
}: {
  image: string;
  title: React.ReactNode;
  cta?: string;
  href?: string;
  position?: string;
}) {
  return (
    <section className="on-ink relative flex min-h-[72svh] items-center justify-center overflow-hidden bg-scrim">
      <Photo src={image} alt="" sizes="100vw" style={{ objectPosition: position }} />
      <div aria-hidden className="absolute inset-0 bg-scrim/55" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-bg via-bg/50 to-transparent" />
      <div className="relative z-10 px-gutter py-24 text-center lg:py-32">
        <Reveal>
          <p className="type-display text-[clamp(2.2rem,5.5vw,5rem)] text-white">{title}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={href} className="btn btn-primary !px-9 !py-5">
              {cta}
            </Link>
            <a href={site.phoneHref} className="btn btn-ghost !px-9 !py-5">
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
