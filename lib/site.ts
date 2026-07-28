/**
 * ── EDIT THIS FILE FIRST for every new client. ──
 * It is the single source of truth for brand, copy, nav, and SEO.
 * Then rebrand colors/fonts in app/globals.css.
 */

export const site = {
  name: "Client Name",
  // Short tagline shown in the hero and meta title.
  tagline: "A one line promise about what this business does.",
  // Longer description for SEO / social cards.
  description:
    "One or two sentences describing the business, who it serves, and why it is different.",
  // Production URL (no trailing slash). Also set NEXT_PUBLIC_SITE_URL in the env.
  url: "https://example.com",

  // Primary call to action.
  cta: { label: "Get in touch", href: "#contact" },

  // Contact.
  email: "hello@example.com",
  phone: "",

  // Top nav links (in order).
  nav: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],

  // Footer socials (leave a value empty to hide it).
  socials: {
    instagram: "",
    x: "",
    linkedin: "",
  },

  // ── SEO / structured data ──
  // Powers the JSON-LD (lib/schema.ts) + metadata. Fill per client.
  seo: {
    // "Organization" by default (works for any business). If the client has a physical
    // storefront, switch to a LocalBusiness subtype ("Store", "Restaurant",
    // "ProfessionalService", …) and fill the address block below.
    schemaType: "Organization",
    // Social + share image at /public (1200x630). Used for OpenGraph + schema logo. Leave "" to skip.
    image: "",
    // ── Physical location (leave blank for a non-local / online business) ──
    streetAddress: "",
    city: "",
    region: "", // state, e.g. "FL"
    postalCode: "",
    country: "US",
    geo: { latitude: "", longitude: "" },
    priceRange: "", // only meaningful for LocalBusiness types
    areaServed: [] as string[],
  },

  // Credit line in the footer.
  builtBy: { label: "Halftone", href: "https://halftone-fawn.vercel.app" },
} as const;

export type Site = typeof site;
