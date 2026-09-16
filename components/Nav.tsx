"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Fixed nav. Desktop: the mark centered on top, links underneath. Sits
 * transparent over a photo hero and turns to ink once you scroll.
 */
export default function Nav() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith("/" + href.split("/")[1]));
  const products = site.nav[0].children ?? [];
  const rest = site.nav.slice(1);
  const linkCls = (active: boolean) =>
    cn("kicker font-normal transition-colors hover:text-accent", active ? "text-accent" : "text-white/80");

  return (
    <header
      className={cn(
        "on-ink fixed inset-x-0 top-0 z-50 border-b text-white transition-[background-color,border-color] duration-300",
        scrolled || menu || pathname !== "/" ? "border-white/10 bg-ink/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-scrim/70 to-transparent",
      )}
    >
      <nav className="relative mx-auto max-w-content px-gutter lg:px-8">
        {/* Mobile row */}
        <div className="flex h-16 items-center justify-between md:hidden">
          <Link href="/" data-nav-logo aria-label={`${site.name} home`} className="block">
            <Image src="/logo-mark@2x.png" alt="EventPro Seating" width={2500} height={640} priority className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <a href={site.phoneHref} className="kicker font-normal text-white/80">
              Call
            </a>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              onClick={() => setMenu((v) => !v)}
              className="grid h-10 w-10 place-items-center"
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 block h-0.5 w-5 bg-current transition-transform", menu ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 block h-0.5 w-5 bg-current transition-transform", menu ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop: mark on top, links below */}
        <div className="hidden md:block">
          <div className="relative flex items-center justify-center pt-5">
            <Link href="/" data-nav-logo aria-label={`${site.name} home`} className="block transition-opacity hover:opacity-85">
              <Image src="/logo-mark@2x.png" alt="EventPro Seating" width={2500} height={640} priority className="h-10 w-auto" />
            </Link>
            <a href={site.phoneHref} className="kicker absolute right-0 top-1/2 -translate-y-1/2 font-normal text-white/80 transition-colors hover:text-accent">
              {site.phone}
            </a>
          </div>
          <div className="flex items-center justify-center gap-9 pb-4 pt-3">
            <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <Link href={site.nav[0].href} className={cn("flex items-center gap-1.5", linkCls(isActive("/products")))}>
                Products
                <span aria-hidden className={cn("text-[0.6rem] transition-transform", drop && "rotate-180")}>
                  ▾
                </span>
              </Link>
              <AnimatePresence>
                {drop && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
                  >
                    <div className="flex min-w-56 flex-col border border-white/10 bg-ink py-1.5">
                      {products.map((c) => (
                        <Link key={c.href} href={c.href} onClick={() => setDrop(false)} className="whitespace-nowrap px-5 py-2.5 transition-colors hover:bg-white/5">
                          <span className={cn("kicker block font-normal", isActive(c.href) && pathname === c.href ? "text-accent" : "text-white/85")}>{c.label}</span>
                          <span className="mono mt-0.5 block text-[0.62rem] text-white/45">{c.note}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {rest.map((l) => (
              <Link key={l.href} href={l.href} className={linkCls(isActive(l.href))}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="btn btn-primary !px-5 !py-2.5 !text-[0.62rem]">
              Get a quote
            </Link>
          </div>
        </div>
      </nav>

      {menu && (
        <div className="no-bar max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-ink px-gutter py-4 md:hidden">
          <p className="kicker pb-1 text-white/40">Products</p>
          {products.map((c) => (
            <Link key={c.href} href={c.href} onClick={() => setMenu(false)} className="type-display block py-3 pl-4 text-2xl text-white">
              {c.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-white/10 pt-2">
            {rest.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setMenu(false)} className="type-display block py-3 text-2xl text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" onClick={() => setMenu(false)} className="btn btn-primary mt-6 w-full">
            Get a quote
          </Link>
          <a href={site.phoneHref} className="kicker mt-5 block text-center font-normal text-white/60">
            {site.phone}
          </a>
        </div>
      )}
    </header>
  );
}
