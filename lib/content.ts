/** Editorial content: stats, testimonials, FAQ, process, timeline, blog. */

export const stats = [
  { value: 20, suffix: "+", label: "Years building bleachers" },
  { value: 160, suffix: "", label: "Seats in one 10 Row unit" },
  { value: 15, suffix: " min", label: "Setup with a single operator" },
  { value: 100, suffix: "%", label: "Engineered and made in the USA" },
];

export const process = [
  { step: "01", title: "Tell us about the event", body: "Crowd size, venue, dates, and whether you want to rent or own. We recommend a configuration the same day." },
  { step: "02", title: "We deliver, or you tow", body: "Rentals arrive on our trailers. Purchased systems are towable behind a standard truck, so your crew brings them anywhere." },
  { step: "03", title: "Set up in minutes", body: "One operator unfolds a 3 Row in five minutes and a 10 Row in fifteen. No cranes, no scaffold crews, no lost afternoon." },
  { step: "04", title: "Seat the crowd, then fold it away", body: "After the event, the system folds back onto its chassis and rolls to storage or the next venue." },
];

export const testimonials = [
  {
    quote: "We used to schedule a six-person crew the day before every home game. Now one guy tows the bleachers over during lunch.",
    name: "Athletic Director",
    org: "Florida high school",
  },
  {
    quote: "The Event Deck gave our sponsors a real VIP platform with a ramp. It looked permanent and came down in an afternoon.",
    name: "Festival Producer",
    org: "Regional music festival",
  },
  {
    quote: "Buying two 10 Row units paid for itself in a season versus renting. EventPro handled everything down to the trailer plates.",
    name: "Owner",
    org: "Event rental company",
  },
];

export const faqs = [
  { q: "How fast can a bleacher really be set up?", a: "A 3 Row Bleacher unfolds in about five minutes and a 10 Row in about fifteen, each with a single operator. The systems are patented fold-out designs on a towable chassis, so there is no assembly of loose parts." },
  { q: "Do you rent, sell, or both?", a: "Both. Rentals are ideal for one-off or seasonal events. Purchasing makes sense for schools, venues, municipalities, and rental companies that need seating dozens of times a year. Our Sales page walks through the trade-offs." },
  { q: "Where do you deliver?", a: "We are based in Brooksville, Florida and deliver rentals across the Southeast. Purchased systems ship nationwide and are towable behind a standard pickup." },
  { q: "Are the bleachers code-compliant?", a: "Yes. Guardrails, aisles, closed risers, and non-slip treads are engineered to ICC 300 bleacher safety standards, and the Event Deck offers optional ADA ramps." },
  { q: "What kind of vehicle do I need to tow one?", a: "A 3 Row tows behind most SUVs and pickups. A 10 Row is a heavier trailer chassis that needs a three-quarter-ton or larger truck. We confirm towing requirements before delivery." },
  { q: "Can I get exclusive rights to my region?", a: "Yes. Our territory program gives operators who purchase systems exclusivity in their area, so you grow without competing on price. Ask us about availability in your region." },
  { q: "What is the lead time?", a: "Rentals can often be scheduled within days. New-build purchases are typically several weeks depending on configuration and season. Reserve early for spring and fall." },
];

export const timeline = [
  { year: "2000s", title: "A better bleacher", body: "Founded on a simple idea: temporary seating should not need a crew, a crane, or a week. The first modular fold-out systems go to work at Florida sporting events." },
  { year: "2010s", title: "Patented and proven", body: "Mobile, towable designs are patented and refined across thousands of event days. Rental Bleachers, Inc. grows into a regional leader." },
  { year: "2020", title: "Mobile seating, reinvented", body: "During the pandemic shutdown the team designs the current generation of mobile and towable systems that set up with one operator." },
  { year: "Today", title: "Rent it or own it", body: "EventPro Seating manufactures in Brooksville, Florida, and supplies schools, venues, producers, and rental operators nationwide." },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  category: string;
  image: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "own-your-region-territorial-exclusivity",
    title: "Own your region: how territorial exclusivity grows a seating business",
    excerpt: "Market share, local trust, and margin protection. Why exclusivity beats competing on price.",
    date: "2026-08-12",
    readMinutes: 5,
    category: "Growth",
    image: "/images/blog/territory.jpg",
    body: [
      "Rental operators who buy EventPro systems can secure exclusive rights to their region. It sounds like a nice-to-have. In practice it changes the economics of the business.",
      "When you are the only operator with one-person mobile bleachers in a metro, the conversation with a school district or festival producer stops being about price. It becomes about capacity, dates, and how fast you can be on site.",
      "Exclusivity also compounds. Every event you seat is a referral to the next athletic director or event planner in the area, and none of those referrals can leak to a competitor running the same equipment.",
      "The program is simple: purchase a minimum fleet, commit to service standards, and EventPro will not sell the same systems to another operator in your territory. Ask us which regions are still open.",
    ],
  },
  {
    slug: "mobile-bleacher-safety-built-in",
    title: "Safety is not an add-on: how mobile bleachers are built for compliance",
    excerpt: "Guardrails, closed risers, aisles, and inspections. What organizers should ask before seating a crowd.",
    date: "2026-06-03",
    readMinutes: 6,
    category: "Safety",
    image: "/images/blog/safety.jpg",
    body: [
      "Temporary seating carries the same duty of care as permanent grandstands. The ICC 300 standard covers guardrail heights, riser openings, aisle widths, and load ratings, and organizers are responsible for meeting it.",
      "EventPro systems are engineered to those requirements from the first weld. Guardrails come attached, risers are closed so nothing falls through, and treads are non-slip in the rain.",
      "Because the systems fold out from a single chassis rather than being assembled from loose parts, there is far less room for a setup error. The structure is either deployed and locked or it is not.",
      "Before any event, walk the seating with a simple checklist: locks engaged, rails secure, aisles clear, ground stable. It takes two minutes and it is the best insurance you will ever buy.",
    ],
  },
  {
    slug: "crafting-memorable-experiences",
    title: "Crafting memorable experiences with EventPro",
    excerpt: "Seating shapes how a crowd feels. A look at how producers use bleachers and decks to design the moment.",
    date: "2026-04-21",
    readMinutes: 4,
    category: "Events",
    image: "/images/blog/experience.jpg",
    body: [
      "Great events are designed from the crowd's point of view. Where people sit decides what they see, how they hear, and whether they stay.",
      "Elevated Event Decks put sponsors and VIPs above the crowd with an unobstructed view of the stage. Ten Row bleachers turn a flat field into a stadium bowl where every seat has a sightline.",
      "The best producers treat seating like lighting: a tool for shaping attention. And because EventPro systems move, the same seating can headline a festival on Saturday and a graduation on Monday.",
    ],
  },
  {
    slug: "why-choose-eventpro-seating",
    title: "Why choose EventPro Seating solutions",
    excerpt: "USA-made, patented, and set up by one person. The short version of what makes the systems different.",
    date: "2026-02-10",
    readMinutes: 3,
    category: "Products",
    image: "/images/blog/why.jpg",
    body: [
      "Most temporary bleachers are still built the old way: pallets of parts, a crew, and a long day. EventPro started from a different question: what if seating arrived ready to unfold?",
      "The result is a patented mobile system that one operator deploys in minutes, engineered and manufactured in Brooksville, Florida, with materials chosen for years of outdoor use.",
      "Rent it for a weekend or own a fleet. Either way the labor line on the budget gets a lot smaller.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
