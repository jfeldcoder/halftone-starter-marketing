import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

const SERVICES = [
  { title: "Service one", body: "Describe the first thing this business offers and the value it delivers." },
  { title: "Service two", body: "Describe the second offering. Keep it concrete and outcome focused." },
  { title: "Service three", body: "Describe the third offering, or swap this whole grid for the real menu." },
];

const PROOF = [
  { value: "10+", label: "Years in business" },
  { value: "500", label: "Happy clients" },
  { value: "4.9★", label: "Average rating" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section id="top" className="border-b border-line">
        <div className="container-page py-24 sm:py-32">
          <Reveal>
            <p className="eyebrow">{site.name}</p>
            <h1 className="display mt-5 max-w-3xl text-5xl font-extrabold leading-[1.05] text-fg sm:text-7xl">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={site.cta.href}
                className="rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dark"
              >
                {site.cta.label}
              </a>
              <a
                href="#services"
                className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-fg transition-colors hover:border-fg"
              >
                Learn more
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proof */}
      <section className="border-b border-line">
        <div className="container-page grid gap-px overflow-hidden sm:grid-cols-3">
          {PROOF.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.05}>
              <div className="py-10 sm:px-8">
                <div className="display text-4xl font-extrabold text-fg">{p.value}</div>
                <div className="mt-1 text-sm text-fg-muted">{p.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-b border-line">
        <div className="container-page py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="display mt-4 text-3xl font-extrabold text-fg sm:text-4xl">
              Services
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-bg-elev p-7">
                  <h3 className="text-lg font-bold text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-b border-line">
        <div className="container-page grid gap-10 py-20 sm:py-28 lg:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 className="display mt-4 text-3xl font-extrabold text-fg sm:text-4xl">
              A short story about the brand.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
              Replace this with a paragraph or two about who this business is, what
              they believe, and why customers choose them. Keep it human. The whole
              site rebrands from{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-fg">lib/site.ts</code>{" "}
              and{" "}
              <code className="rounded bg-surface px-1.5 py-0.5 text-sm text-fg">app/globals.css</code>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24 text-center sm:py-32">
        <Reveal>
          <h2 className="display mx-auto max-w-2xl text-4xl font-extrabold text-fg sm:text-5xl">
            Ready to get started?
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-8 inline-flex rounded-full bg-accent px-7 py-4 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-dark"
          >
            {site.cta.label}
          </a>
        </Reveal>
      </section>
    </>
  );
}
