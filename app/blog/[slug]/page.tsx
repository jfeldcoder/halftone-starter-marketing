import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { Dot } from "@/components/SectionHeading";
import ClosingCTA from "@/components/ClosingCTA";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", publishedTime: p.date } };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <article>
        <div className="mx-auto max-w-content px-gutter pt-28 lg:px-8 lg:pt-40">
          <Reveal className="max-w-4xl">
            <Link href="/blog" className="link-arrow">
              ← All articles
            </Link>
            <p className="kicker mt-8 text-accent-dark">{p.categories.join(" · ")}</p>
            <h1 className="type-display mt-3 text-[clamp(2.2rem,5.5vw,4.6rem)] text-fg">{p.title}</h1>
            <p className="kicker mt-5 font-normal text-fg-faint">
              By {p.author} · {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} · {p.readMinutes} min read
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mx-auto mt-10 max-w-content px-gutter lg:px-8">
          <div className="relative aspect-[16/8] overflow-hidden bg-surface">
            <Photo src={p.image} alt={p.title} sizes="100vw" priority />
          </div>
        </Reveal>
        <div className="mx-auto max-w-2xl px-gutter py-14 lg:py-20">
          {p.body.map((b, i) =>
            b.type === "h2" ? (
              <Reveal key={i} delay={0.04}>
                <h2 className="type-display mb-4 mt-10 text-2xl text-fg sm:text-3xl">{b.text}</h2>
              </Reveal>
            ) : (
              <Reveal key={i} delay={0.04}>
                <p className="mb-6 text-[1.05rem] leading-[1.75] text-fg-muted">{b.text}</p>
              </Reveal>
            ),
          )}
        </div>
      </article>

      <section className="border-t border-line bg-bg-elev">
        <div className="mx-auto max-w-content px-gutter py-16 lg:px-8 lg:py-20">
          <p className="kicker text-fg-muted">Keep reading</p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Photo src={o.image} alt={o.title} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <p className="kicker mt-4 text-accent-dark">{o.categories[0]}</p>
                <h3 className="type-display mt-1.5 text-xl leading-tight text-fg transition-colors group-hover:text-accent-dark">{o.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA image="/images/home/gallery-6.jpg" title={<>Seat the crowd<Dot /><br />Skip the crew<Dot /></>} />
    </>
  );
}
