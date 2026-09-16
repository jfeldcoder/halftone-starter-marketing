/**
 * Product catalog. Specs are from the current site + public listings;
 * confirm exact figures with the client before launch.
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
  footprint: string;
  weight: string;
  transport: string;
  heroImage: string;
  gallery: string[];
  features: { title: string; body: string }[];
  useCases: string[];
  specs: { label: string; value: string }[];
  rentOrBuy: ("rent" | "buy")[];
};

export const products: Product[] = [
  {
    slug: "3-row-bleachers",
    name: "3 Row Bleachers",
    short: "3 Row",
    kicker: "Compact. Fast. Anywhere.",
    headline: "Fifteen seats, five minutes, one person.",
    intro:
      "The 3 Row Bleacher is the fastest way to add real seating to a sideline, a courtyard, or a community event. It rolls in, unfolds, and locks into place without tools or a crew.",
    rows: 3,
    seats: 15,
    setupMinutes: 5,
    crew: 1,
    footprint: "15 ft × 6 ft",
    weight: "Approx. 600 lb",
    transport: "Towable or trailer-mounted",
    heroImage: "/images/products/3-row/hero.jpg",
    gallery: [
      "/images/products/3-row/gallery-1.jpg",
      "/images/products/3-row/gallery-2.jpg",
      "/images/products/3-row/gallery-3.jpg",
      "/images/products/3-row/gallery-4.jpg",
    ],
    features: [
      { title: "One-person setup", body: "Patented fold-out design deploys in about five minutes with no tools and no lifting crew." },
      { title: "Move it between events", body: "Roll it from the practice field to the gym parking lot. Storage footprint is a fraction of fixed seating." },
      { title: "Built to be outside", body: "Aluminum planks and a powder-coated steel frame shrug off rain, sun, and heavy seasonal use." },
      { title: "Safety first", body: "Guardrails, non-slip treads, and closed risers meet ICC 300 bleacher safety guidelines." },
    ],
    useCases: ["Schools", "Community centers", "Sports fields", "Auxiliary seating", "Youth leagues", "Church events"],
    specs: [
      { label: "Rows", value: "3" },
      { label: "Seating capacity", value: "15 guests" },
      { label: "Setup time", value: "5 minutes" },
      { label: "Crew required", value: "1 person" },
      { label: "Footprint", value: "15 ft × 6 ft" },
      { label: "Materials", value: "Aluminum + powder-coated steel" },
      { label: "Transport", value: "Towable" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
  },
  {
    slug: "10-row-bleachers",
    name: "10 Row Bleachers",
    short: "10 Row",
    kicker: "Big crowds. Clear views.",
    headline: "One hundred sixty seats in fifteen minutes.",
    intro:
      "The 10 Row Bleacher gives large events real grandstand seating without the labor bill. A single operator tows it in, hydraulically unfolds it, and has the crowd seated before the crew has finished unloading the tent.",
    rows: 10,
    seats: 160,
    setupMinutes: 15,
    crew: 1,
    footprint: "30 ft × 22 ft",
    weight: "Approx. 9,500 lb",
    transport: "Towable trailer chassis",
    heroImage: "/images/products/10-row/hero.jpg",
    gallery: [
      "/images/products/10-row/gallery-1.jpg",
      "/images/products/10-row/gallery-2.jpg",
      "/images/products/10-row/gallery-3.jpg",
      "/images/products/10-row/gallery-4.jpg",
    ],
    features: [
      { title: "Hydraulic deployment", body: "Fold-out rows and integrated stairs deploy from the trailer in about fifteen minutes with one operator." },
      { title: "Sightlines from every seat", body: "Tiered rise is engineered for unobstructed views of a field, stage, or track." },
      { title: "Weather-ready construction", body: "Marine-grade aluminum seating and hot-dip galvanized structure handle frequent, year-round use." },
      { title: "Code-compliant by design", body: "Guardrails, aisles, and closed risers are engineered to ICC 300 and ADA guidelines." },
    ],
    useCases: ["Sporting events", "Graduations", "Festivals", "Parades", "Motorsports", "Fairs & expos"],
    specs: [
      { label: "Rows", value: "10" },
      { label: "Seating capacity", value: "160 guests" },
      { label: "Setup time", value: "15 minutes" },
      { label: "Crew required", value: "1 person" },
      { label: "Footprint", value: "30 ft × 22 ft" },
      { label: "Materials", value: "Aluminum + galvanized steel" },
      { label: "Transport", value: "Towable trailer chassis" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
  },
  {
    slug: "event-deck",
    name: "Event Deck",
    short: "Event Deck",
    kicker: "Modular. Elevated. Yours.",
    headline: "A platform that fits the space, not the other way around.",
    intro:
      "The Event Deck is a modular, high-capacity platform for VIP viewing areas, production and camera positions, hospitality lounges, and stage-front seating. Configure the height, footprint, and finish, add ADA ramps, and reuse it event after event.",
    rows: 1,
    seats: 200,
    setupMinutes: 60,
    crew: 2,
    footprint: "Modular, 8 ft sections",
    weight: "Varies by configuration",
    transport: "Flatbed or trailer",
    heroImage: "/images/products/event-deck/hero.jpg",
    gallery: [
      "/images/products/event-deck/gallery-1.jpg",
      "/images/products/event-deck/gallery-2.jpg",
      "/images/products/event-deck/gallery-3.jpg",
      "/images/products/event-deck/gallery-4.jpg",
    ],
    features: [
      { title: "Configure to any footprint", body: "Standard sections lock together to form platforms of nearly any shape and size, including multi-tier layouts." },
      { title: "ADA ramps and stairs", body: "Optional ramps, stairs, and guardrails make elevated VIP areas accessible and compliant." },
      { title: "Premium finishes", body: "Choose decking, skirting, and rail finishes that match a hospitality lounge or a broadcast riser." },
      { title: "Rated for real loads", body: "Engineered for crowds, camera platforms, and furnished lounges with a wide safety margin." },
    ],
    useCases: ["Concerts", "Festivals", "Corporate events", "VIP viewing", "Broadcast & camera platforms", "Hospitality"],
    specs: [
      { label: "System", value: "Modular platform" },
      { label: "Capacity", value: "Scales with footprint" },
      { label: "Deck height", value: "Configurable" },
      { label: "Accessibility", value: "Optional ADA ramps" },
      { label: "Finishes", value: "Standard or premium" },
      { label: "Materials", value: "Aluminum frame + composite deck" },
      { label: "Transport", value: "Flatbed / trailer" },
      { label: "Made in", value: "USA" },
    ],
    rentOrBuy: ["rent", "buy"],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
