"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";
import Logo from "@/components/Logo";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href.split("/").slice(0, 2).join("/")));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-bg/85 shadow-[0_10px_40px_-30px_rgb(23_20_17/0.4)] backdrop-blur-md" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setMenu(null)}>
          {site.nav.map((l) => {
            const hasChildren = "children" in l && l.children;
            return (
              <div key={l.label} className="relative" onMouseEnter={() => setMenu(hasChildren ? l.label : null)}>
                <Link
                  href={l.href}
                  className={cn(
                    "relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(l.href) ? "text-fg" : "text-fg-muted hover:text-fg",
                  )}
                >
                  {l.label}
                  {hasChildren && (
                    <svg width="10" height="10" viewBox="0 0 10 10" className={cn("transition-transform", menu === l.label && "rotate-180")} aria-hidden>
                      <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {isActive(l.href) && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />
                  )}
                </Link>

                <AnimatePresence>
                  {hasChildren && menu === l.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="card overflow-hidden p-2 shadow-[0_30px_60px_-30px_rgb(23_20_17/0.35)]">
                        {l.children!.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setMenu(null)}
                            className="group flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-bg-elev"
                          >
                            <span className="text-sm font-semibold text-fg group-hover:text-accent-dark">{c.label}</span>
                            <span className="text-xs text-fg-faint">{c.note}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <Link href={site.cta.href} className="btn btn-primary ml-3 !py-2.5 !text-[13px]">
            {site.cta.label}
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative h-10 w-10 md:hidden"
        >
          <span
            className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-fg transition-transform duration-300"
            style={{ transform: open ? "translate(-50%,-50%) rotate(45deg)" : "translate(-50%,-6px)" }}
          />
          <span
            className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 bg-fg transition-transform duration-300"
            style={{ transform: open ? "translate(-50%,-50%) rotate(-45deg)" : "translate(-50%,4px)" }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-bg md:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-6">
              {site.nav.flatMap((l, i) => {
                const items = "children" in l && l.children ? l.children : [l];
                return items.map((c, j) => (
                  <motion.div
                    key={c.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + (i + j) * 0.05 }}
                  >
                    <Link
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-center justify-between border-b border-line py-4 text-2xl font-extrabold text-fg"
                    >
                      {c.label}
                      <span className="text-accent">→</span>
                    </Link>
                  </motion.div>
                ));
              })}
              <Link href={site.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-6 w-full">
                {site.cta.label}
              </Link>
              <a href={site.phoneHref} className="mt-4 text-center text-sm text-fg-muted">
                Call {site.phone}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
