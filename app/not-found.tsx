import Link from "next/link";
import BleacherIllustration from "@/components/BleacherIllustration";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70svh] flex-col items-center justify-center pt-[72px] text-center">
      <div className="w-full max-w-md opacity-80">
        <BleacherIllustration rows={4} mode="mount" />
      </div>
      <p className="eyebrow-accent">404</p>
      <h1 className="display mt-3 text-4xl font-extrabold text-fg sm:text-5xl">This seat doesn&apos;t exist.</h1>
      <p className="mt-3 max-w-sm text-fg-muted">The page moved or never unfolded. Head back home or look at the lineup.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/products/10-row-bleachers" className="btn btn-ghost">
          Products
        </Link>
      </div>
    </section>
  );
}
