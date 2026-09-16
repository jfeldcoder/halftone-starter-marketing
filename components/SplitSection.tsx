import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

type Heading = { kicker?: string; title: React.ReactNode; lead?: string };

/**
 * Two columns: the photo runs to the outer edge and the full section height,
 * copy sits in the other column. `flip` puts the photo on the right.
 *
 * With `heading`, phones show the kicker, title, and lead overlaid on the
 * photo and the rest (children) underneath; desktop keeps everything in the
 * copy column.
 */
export default function SplitSection({
  image,
  alt,
  heading,
  children,
  flip = false,
  tone = "light",
  position = "50% 50%",
  id,
  noTopRule = false,
  soft = false,
}: {
  image: string;
  alt: string;
  heading?: Heading;
  children: React.ReactNode;
  flip?: boolean;
  tone?: "light" | "elev" | "ink";
  position?: string;
  id?: string;
  noTopRule?: boolean;
  /** No rules; the photo fades in from the page color at its top and bottom. */
  soft?: boolean;
}) {
  const dark = tone === "ink";
  return (
    <section
      id={id}
      className={cn(
        soft ? "" : noTopRule ? "border-b border-line" : "border-y border-line",
        tone === "elev" && "bg-bg-elev",
        dark && "on-ink border-white/10 bg-ink text-white",
      )}
    >
      <div className="mx-auto grid max-w-content lg:grid-cols-2">
        <div className={cn("relative overflow-hidden bg-surface lg:aspect-auto lg:min-h-[640px]", heading ? "aspect-[4/5] sm:aspect-[4/3]" : "aspect-[4/3]", flip ? "lg:order-2" : "lg:order-1")}>
          <Photo src={image} alt={alt} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: position }} />
          {soft && (
            <>
              <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent lg:h-40", heading && "hidden lg:block")} />
              <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent lg:h-40", heading && "hidden lg:block")} />
            </>
          )}
          {heading && (
            <>
              {/* Phones: kicker + title at the top of the photo */}
              <div className="absolute inset-x-0 top-0 lg:hidden">
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-scrim/85 via-scrim/45 to-transparent" />
                <Reveal className="relative px-gutter pb-20 pt-8">
                  {heading.kicker && <p className="kicker text-accent">{heading.kicker}</p>}
                  <h2 className="type-display mt-3 text-[clamp(1.9rem,8vw,3rem)] text-white">{heading.title}</h2>
                </Reveal>
              </div>
              {/* Phones: lead at the bottom of the photo */}
              {heading.lead && (
                <div className="absolute inset-x-0 bottom-0 lg:hidden">
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-scrim/85 via-scrim/45 to-transparent" />
                  <Reveal className="relative px-gutter pb-7 pt-20">
                    <p className="max-w-md text-[0.95rem] leading-relaxed text-white/85">{heading.lead}</p>
                  </Reveal>
                </div>
              )}
            </>
          )}
        </div>
        <div className={cn("flex flex-col justify-center px-gutter py-10 lg:px-14 lg:py-24", flip ? "lg:order-1" : "lg:order-2")}>
          {heading && (
            <Reveal className="hidden lg:block">
              {heading.kicker && <p className={cn("kicker", dark ? "text-accent" : "text-accent-dark")}>{heading.kicker}</p>}
              <h2 className={cn("type-display mt-4 text-[clamp(1.9rem,3.8vw,3.2rem)]", dark ? "text-white" : "text-fg")}>{heading.title}</h2>
              {heading.lead && <p className={cn("mt-6 max-w-md text-[0.98rem] leading-relaxed", dark ? "text-white/65" : "text-fg-muted")}>{heading.lead}</p>}
            </Reveal>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
