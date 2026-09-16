/**
 * Server-only asset resolver.
 *
 * Every photo on the site references a path under /public. If the file exists it
 * renders as an image; if not, a labeled placeholder renders in its place. That means
 * the client's real photography and logo drop into /public/images (same file names)
 * with zero code changes. See README → "Dropping in the real photos".
 */
import fs from "node:fs";
import path from "node:path";

const cache = new Map<string, boolean>();

export function assetExists(src: string): boolean {
  if (!src) return false;
  if (cache.has(src)) return cache.get(src)!;
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));
  cache.set(src, exists);
  return exists;
}

export function resolveAsset(src: string): string | null {
  return assetExists(src) ? src : null;
}

/** Full list of expected photo slots (for the README + a quick audit script). */
export const assetManifest = {
  logo: "/logo.png",
  logoMark: "/logo-mark@2x.png",
  og: "/images/og.jpg",
  home: {
    hero: "/images/home/hero.jpg",
    heroAlt: "/images/home/hero-2.jpg",
    about: "/images/home/about.jpg",
    gallery: [1, 2, 3, 4, 5, 6].map((n) => `/images/home/gallery-${n}.jpg`),
  },
  about: {
    team: "/images/about/team.jpg",
    facility: "/images/about/facility.jpg",
  },
  sales: {
    fleet: "/images/sales/fleet.jpg",
    allProducts: "/images/sales/all-products.jpg",
  },
};
