/**
 * Canonical site URL. Prefers NEXT_PUBLIC_SITE_URL, then Vercel's production
 * domain (set automatically on every Vercel deploy), then the client's domain.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || "https://eventproseating.com").replace(/\/$/, "");
