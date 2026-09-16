/**
 * Product catalog. Specs, dimensions, and claims are taken from the current
 * eventproseating.com product pages (Sept 2026).
 */
export type Product = {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  headline: string;
  intro: string;
  rows: number;
  seats: number;
  setupMinutes: number;
  crew: number;
  heroImage: string;
  gallery: string[];
  bullets: string[];
  dimensions: { label: string; value: string }[];
  features: { title: string; body: string }[];
  useCases: string[];
  specs: { label: string; value: string }[];
  rentOrBuy: ("rent" | "buy")[];
  /** Optional trailer-mounted variant (used by the 3 Row page). */
  variant?: {
    name: string;
    headline: string;
    intro: string;
    bullets: string[];
    gallery: string[];
  };
};

export const products: Product[] = [
  {
    slug: "3-row-bleachers",
    name: "3 Row Bleachers",
    short: "3 Row",
    kicker: "Compact. Fast. Anywhere.",
    headline: "Fifteen seats, five minutes, one person.",
    intro:
      "Designed for efficiency and ease, the 3 Row Bleacher is perfect for school events, community gatherings, or any venue where space and quick setup are priorities. Aluminum construction keeps it comfortable, safe, and low-maintenance, making every seat the best seat in the house.",
    rows: 3,
    seats: 15,
    setupMinutes: 5,
    crew: 1,
    heroImage: "/images/products/3-row/hero.jpg",
    gallery: [
      "/images/products/3-row/gallery-1.jpg",
      "/images/products/3-row/gallery-2.jpg",
      "/images/products/3-row/gallery-3.jpg",
      "/images/products/3-row/gallery-4.jpg",
    ],
    bullets: [
      "Assembles in only five minutes with one person",
      "Seats 15, optimizing space for comfort",
      "Fully compliant with ICC and NFPA standards",
      "Easily navigates through standard double doors",
      "Suitable for indoor and outdoor use",
      "Built with aluminum for long-term use with minimal maintenance",
    ],
    dimensions: [
      { label: "Open for use", value: "11′ 6″ L × 6′ D" },
      { label: "Transporting", value: "11′ 6″ L × 36″ W" },
    ],
    features: [
      { title: "One-person setup", body: "Unfolds and locks into place in about five minutes. No tools, no lifting crew." },
      { title: "Fits through a double door", body: "At 36 inches wide in transport it rolls from the gym to the field and back." },
      { title: "Indoor and outdoor", body: "Aluminum seating and frame handle rain, sun, and heavy seasonal use." },
      { title: "Code-compliant", body: "Engineered to ICC and NFPA bleacher safety standards." },
    ],
    useCases: ["Schools", "Community centers", "Sports fields", "Auxiliary seating", "Youth leagues", "Gymnasiums"],
    specs: [
      { label: "Rows", value: "3" },
      { label: "Seating capacity", value: "15 guests" },
      { label: "Setup time", value: "5 minutes" },
      { label: "Crew required", value: "1 person" },
      { label: "Open footprint", value: "11′ 6″ L × 6′ D" },
      { label: "Transport width", value: "36″" },
      { label: "Materials", value: "Aluminum" },
      { label: "Standards", value: "ICC & NFPA" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
    variant: {
      name: "3×3 Row Bleachers (with trailer)",
      headline: "More seating, maximum flexibility.",
      intro:
        "Our trailer-mounted 3×3 Row Bleachers seat up to 150 people with fast, easy setup and maximum mobility. A streamlined, high-impact solution for event organizers needing flexibility, efficiency, and profitability.",
      bullets: [
        "Versatile layouts: removable side fencing allows stadium, drag race, or custom configurations",
        "Easy transport: tow with a light-duty truck (F-150 or similar), no commercial vehicle needed",
        "Fast setup, high ROI: one person can deploy in minutes; $26K in a day proven revenue potential",
        "Indoor and outdoor ready: urethane wheels protect gym floors but roll smoothly on any terrain",
        "Forklift-accessible: perfect for beaches, fields, or tight spaces",
      ],
      gallery: [
        "/images/products/3-row/trailer-1.jpg",
        "/images/products/3-row/trailer-2.jpg",
        "/images/products/3-row/trailer-3.jpg",
        "/images/products/3-row/trailer-4.jpg",
      ],
    },
  },
  {
    slug: "10-row-bleachers",
    name: "10 Row Bleachers",
    short: "10 Row",
    kicker: "Big crowds. Clear views.",
    headline: "One hundred sixty seats in fifteen minutes.",
    intro:
      "Experience superior viewing with our 10 Row Bleachers, perfect for large events. Enhanced visibility and comfort for any crowd size make them ideal for sports events, festivals, and school functions. Featuring newly patented technology (Patent No. US 12,084,881 B1) for top-tier performance and design uniqueness.",
    rows: 10,
    seats: 160,
    setupMinutes: 15,
    crew: 1,
    heroImage: "/images/products/10-row/hero.jpg",
    gallery: [
      "/images/products/10-row/gallery-1.jpg",
      "/images/products/10-row/gallery-2.jpg",
      "/images/products/10-row/gallery-3.jpg",
      "/images/products/10-row/gallery-4.jpg",
      "/images/products/10-row/gallery-5.jpg",
      "/images/products/10-row/gallery-6.jpg",
    ],
    bullets: [
      "Set up in 15 minutes by a single individual",
      "Accommodates 160 guests, ready for big events",
      "Patented (Patent No. US 12,084,881 B1)",
      "Meets ICC and NFPA safety standards",
      "Ideal for both indoor and outdoor environments",
      "Constructed from aluminum, ensuring durability and ease of maintenance",
    ],
    dimensions: [
      { label: "Open for use", value: "31′ L × 20′ D × 11′ 9″ W" },
      { label: "Transporting", value: "25′ L × 102″ W × 13′ 3″ T" },
    ],
    features: [
      { title: "Patented deployment", body: "US Patent 12,084,881 B1. Rows unfold from the trailer in about fifteen minutes with one operator." },
      { title: "Sightlines from every seat", body: "Tiered rise engineered for unobstructed views of a field, stage, or track." },
      { title: "Road-ready", body: "Transports at 102 inches wide behind a standard tow vehicle, then opens to a 31-foot grandstand." },
      { title: "Code-compliant by design", body: "Guardrails, aisles, and closed risers engineered to ICC and NFPA standards." },
    ],
    useCases: ["Sporting events", "Graduations", "Festivals", "School functions", "Motorsports", "Fairs & expos"],
    specs: [
      { label: "Rows", value: "10" },
      { label: "Seating capacity", value: "160 guests" },
      { label: "Setup time", value: "15 minutes" },
      { label: "Crew required", value: "1 person" },
      { label: "Open footprint", value: "31′ L × 20′ D × 11′ 9″ W" },
      { label: "Transport size", value: "25′ L × 102″ W × 13′ 3″ T" },
      { label: "Patent", value: "US 12,084,881 B1" },
      { label: "Materials", value: "Aluminum" },
      { label: "Standards", value: "ICC & NFPA" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
  },
  {
    slug: "event-deck",
    name: "Event Deck",
    short: "Event Deck",
    kicker: "Modular. Elevated. Yours.",
    headline: "Transform any space in about an hour.",
    intro:
      "Enhance your event with the ultimate flexibility of our Event Deck systems. Perfect for concerts, festivals, and corporate gatherings, these platforms adapt to any terrain and scale to meet the needs of any event. With options for customization, ADA-accessible ramps, and premium finishes, EventPro Decks ensure every attendee enjoys style and comfort.",
    rows: 1,
    seats: 120,
    setupMinutes: 60,
    crew: 2,
    heroImage: "/images/products/event-deck/hero.jpg",
    gallery: [
      "/images/products/event-deck/gallery-1.jpg",
      "/images/products/event-deck/gallery-2.jpg",
      "/images/products/event-deck/gallery-3.jpg",
      "/images/products/event-deck/gallery-4.jpg",
      "/images/products/event-deck/gallery-5.jpg",
      "/images/products/event-deck/gallery-6.jpg",
    ],
    bullets: [
      "Ready in just one hour for rapid transformations",
      "Holds up to 120 guests or crew members",
      "Adheres to ICC and NFPA standards",
      "Compatible with various venue types",
      "Built with high-quality aluminum to last",
    ],
    dimensions: [
      { label: "Open for use", value: "37′ L × 24′ W" },
      { label: "Transporting", value: "35′ L × 102″ W × 10′ 6″ H" },
    ],
    features: [
      { title: "Adapts to any terrain", body: "Elevated platform levels on grass, sand, asphalt, or a parking lot and scales to the event." },
      { title: "ADA ramps and premium finishes", body: "Optional accessible ramps, rails, and finishes suit a VIP lounge, sponsor suite, or broadcast riser." },
      { title: "Hospitality-ready", body: "Furnish it as a lounge, bar, or nutrition suite. Shade canopies and branding panels available." },
      { title: "Rated for real loads", body: "Engineered for up to 120 guests or crew with a wide safety margin." },
    ],
    useCases: ["Concerts", "Festivals", "Corporate events", "VIP viewing", "Sponsor activations", "Hospitality suites"],
    specs: [
      { label: "System", value: "Elevated modular platform" },
      { label: "Capacity", value: "Up to 120 guests or crew" },
      { label: "Setup time", value: "About 1 hour" },
      { label: "Open footprint", value: "37′ L × 24′ W" },
      { label: "Transport size", value: "35′ L × 102″ W × 10′ 6″ H" },
      { label: "Accessibility", value: "Optional ADA ramps" },
      { label: "Materials", value: "Aluminum" },
      { label: "Standards", value: "ICC & NFPA" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
