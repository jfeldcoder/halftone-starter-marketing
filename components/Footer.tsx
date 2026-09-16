import Link from "next/link";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import Logo from "@/components/Logo";

const SOCIALS = [
  { key: "instagram", label: "Instagram" },
  { key: "x", label: "X" },
  { key: "linkedin", label: "LinkedIn" },
] as const;

export default function Footer() {
  const socials = SOCIALS.filter((s) => site.socials[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink relative overflow-hidden bg-ink text-white">
      <div className="bg-grid-ink absolute inset-0 opacity-30" />
      <div className="absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl" />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          <div className="mt-6 flex flex-col gap-1 text-sm text-white/70">
            <a href={site.phoneHref} className="w-fit font-semibold text-white hover:text-accent">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="w-fit hover:text-accent">
              {site.email}
            </a>
            <span className="mt-2 text-white/50">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </span>
          </div>
        </div>

        <nav className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Products</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="text-sm text-white/75 transition-colors hover:text-accent">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Company</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {[
              { label: "Sales & Rentals", href: "/sales" },
              { label: "About", href: "/about" },
              { label: "FAQ", href: "/about#faq" },
              { label: "Blog", href: "/blog" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/75 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">Ready when you are</p>
          <p className="mt-4 text-sm text-white/70">Tell us about the event and we&apos;ll recommend a configuration the same day.</p>
          <Link href="/contact" className="btn btn-primary mt-5">
            Get a quote
          </Link>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4">
              {socials.map((s) => (
                <li key={s.key}>
                  <a href={site.socials[s.key]} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-accent">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-page relative flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {site.name}. Engineered and manufactured in the USA.
        </span>
        <span>
          Built by{" "}
          <a href={site.builtBy.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            {site.builtBy.label}
          </a>
        </span>
      </div>
    </footer>
  );
}
