import Link from "next/link";
import { Dot } from "@/components/SectionHeading";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70svh] max-w-content flex-col justify-center px-gutter pt-28 lg:px-8">
      <p className="kicker text-accent-dark">404</p>
      <h1 className="type-display mt-3 text-[clamp(2.6rem,7vw,6rem)] text-fg">
        This seat
        <br />
        doesn&apos;t exist<Dot />
      </h1>
      <p className="mt-6 max-w-md text-fg-muted">The page moved or never unfolded. Head back home or look at the lineup.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-ink">
          Home
        </Link>
        <Link href="/products/10-row-bleachers" className="btn btn-ghost">
          Products
        </Link>
      </div>
    </section>
  );
}
