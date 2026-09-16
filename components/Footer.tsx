import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { products } from "@/lib/products";

const SOCIALS = [
  { key: "instagram", label: "Instagram" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "x", label: "X" },
] as const;

export default function Footer() {
  const socials = SOCIALS.filter((s) => site.socials[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer className="on-ink bg-ink text-white">
      <div className="mx-auto max-w-content px-gutter py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" aria-label={`${site.name} home`} className="inline-block">
              <Image src="/logo.png" alt="EventPro Seating" width={2500} height={1144} className="h-auto w-[220px]" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
          </div>

          <div className="md:col-span-2">
            <p className="kicker text-white/40">Products</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}`} className="kicker font-normal text-white/80 transition-colors hover:text-accent">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="kicker text-white/40">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                { label: "Sales & Rentals", href: "/sales" },
                { label: "About", href: "/about" },
                { label: "FAQ", href: "/about#faq" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="kicker font-normal text-white/80 transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="kicker text-white/40">Contact</p>
            <a href={site.phoneHref} className="type-display mt-4 block text-2xl text-white transition-colors hover:text-accent">
              {site.phone}
            </a>
            <p className="mono mt-3 text-xs leading-relaxed text-white/60">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <br />
              {site.hours}
            </p>
            {socials.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a href={site.socials[s.key]} target="_blank" rel="noopener noreferrer" className="kicker font-normal text-white/60 transition-colors hover:text-accent">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mono mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[0.65rem] uppercase tracking-[0.18em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {site.name}. Engineered and manufactured in the USA.
          </span>
          <span>
            Site by{" "}
            <a href={site.builtBy.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              {site.builtBy.label}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
