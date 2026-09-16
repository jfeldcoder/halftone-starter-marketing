/**
 * ── Single source of truth for brand, copy, nav, and SEO. ──
 * Colors/fonts live in app/globals.css and app/layout.tsx.
 */

export const site = {
  name: "EventPro Seating",
  shortName: "EventPro",
  tagline: "Premier bleacher systems for every event.",
  description:
    "Patented, USA-made mobile bleachers and modular event decks that one person can set up in minutes. Rent or buy for sports, festivals, schools, and corporate events.",
  url: "https://eventproseating.com",

  // Primary call to action.
  cta: { label: "Get a quote", href: "/contact" },

  // Contact.
  // The current site lists no public email (contact is by phone + form). Leave empty to hide.
  email: "",
  phone: "(888) 404-3130",
  phoneHref: "tel:+18884043130",
  address: {
    street: "720 Ponce De Leon Blvd",
    city: "Brooksville",
    region: "FL",
    postalCode: "34601",
  },
  hours: "Mon–Fri, 8am–5pm ET",

  // Top nav links (in order).
  nav: [
    {
      label: "Products",
      href: "/products/3-row-bleachers",
      children: [
        { label: "3 Row Bleachers", href: "/products/3-row-bleachers", note: "15 seats · 5 min setup" },
        { label: "10 Row Bleachers", href: "/products/10-row-bleachers", note: "160 seats · 15 min setup" },
        { label: "Event Deck", href: "/products/event-deck", note: "Modular VIP + production platform" },
      ],
    },
    { label: "Sales", href: "/sales" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],

  // Footer socials (leave a value empty to hide it).
  socials: {
    instagram: "https://www.instagram.com/eventproseating/",
    facebook: "https://www.facebook.com/profile.php?id=61559640423809",
    linkedin: "https://www.linkedin.com/company/eventpro-seating",
    x: "",
  },

  // ── SEO / structured data ──
  seo: {
    schemaType: "LocalBusiness",
    image: "/images/og.jpg",
    streetAddress: "720 Ponce De Leon Blvd",
    city: "Brooksville",
    region: "FL",
    postalCode: "34601",
    country: "US",
    geo: { latitude: "28.5553", longitude: "-82.3879" },
    priceRange: "$$$",
    areaServed: ["United States"],
  },

  // Credit line in the footer.
  builtBy: { label: "Halftone", href: "https://halftone-fawn.vercel.app" },
} as const;

export type Site = typeof site;
export type NavItem = (typeof site.nav)[number];
