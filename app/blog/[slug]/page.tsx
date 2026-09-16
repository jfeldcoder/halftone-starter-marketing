import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import CTABand from "@/components/CTABand";

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
  const others = posts.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      <article className="pt-[72px]">
        <div className="container-page py-12 lg:py-16">
          <Reveal className="mx-auto max-w-3xl">
            <Link href="/blog" className="text-sm text-fg-muted hover:text-fg">
              ← All articles
            </Link>
            <p className="eyebrow-accent mt-8">{p.categories.join(" · ")}</p>
            <h1 className="display mt-3 text-4xl font-extrabold leading-[1.02] text-fg sm:text-6xl">{p.title}</h1>
            <p className="mt-5 text-sm text-fg-faint">
              By {p.author} · {new Date(p.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })} · {p.readMinutes} min read
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto mt-10 max-w-5xl">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem]">
              <Photo src={p.image} alt={p.title} sizes="(min-width: 1024px) 60rem, 100vw" priority />
            </div>
          </Reveal>
          <div className="mx-auto mt-12 max-w-2xl">
            {p.body.map((b, i) =>
              b.type === "h2" ? (
                <Reveal key={i} delay={0.05} y={12}>
                  <h2 className="display mb-4 mt-10 text-2xl font-extrabold text-fg sm:text-3xl">{b.text}</h2>
                </Reveal>
              ) : (
                <Reveal key={i} delay={0.05} y={12}>
                  <p className="mb-6 text-lg leading-[1.75] text-fg-muted">{b.text}</p>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </article>

      <section className="border-t border-line bg-bg-elev">
        <div className="container-page py-16">
          <p className="eyebrow">Keep reading</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/blog/${o.slug}`} className="card card-hover group flex gap-5 p-5">
                <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <Photo src={o.image} alt={o.title} sizes="8rem" />
                </div>
                <div>
                  <span className="eyebrow-accent">{o.categories[0]}</span>
                  <h3 className="display mt-1 text-lg font-extrabold leading-snug text-fg group-hover:text-accent-dark">{o.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
