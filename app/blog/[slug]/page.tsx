import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PostBody } from "@/components/blog/PostBody";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

const base = site.domain.replace(/\/$/, "");

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };

  const url = `${base}/blog/${post.slug}`;
  return {
    title: post.metaTitle ?? post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${base}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.description,
    inLanguage: "en",
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    author: { "@type": "Person", name: site.name, url: base },
    publisher: { "@type": "Person", name: site.name, url: base },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main>
      <JsonLd data={faqLd ? [articleLd, breadcrumbLd, faqLd] : [articleLd, breadcrumbLd]} />

      <article>
        {/* Header */}
        <header className="relative overflow-hidden border-b border-border">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_-10%,color-mix(in_oklab,var(--accent)_12%,transparent),transparent_72%)]"
          />
          <Container className="pb-14 pt-32 lg:pb-16 lg:pt-40">
            <div className="mx-auto max-w-3xl">
              <Reveal>
                <nav aria-label="Breadcrumb" className="text-[0.82rem] text-text-muted">
                  <Link href="/blog" className="inline-flex items-center gap-1.5 hover:text-accent">
                    <ArrowLeft size={14} weight="bold" />
                    All articles
                  </Link>
                </nav>
              </Reveal>
              <Reveal index={1}>
                <div className="mt-6 flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-text-muted">
                  <span className="text-accent">{post.category}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </Reveal>
              <Reveal index={1}>
                <h1 className="mt-5 text-balance font-display text-[2.1rem] font-light leading-[1.08] tracking-[-0.02em] text-text sm:text-5xl">
                  {post.title}
                </h1>
              </Reveal>
              <Reveal index={2}>
                <p className="mt-6 text-lg leading-relaxed text-text-muted">{post.excerpt}</p>
              </Reveal>
              <Reveal index={2}>
                <div className="mt-6 flex items-center gap-3 text-[0.85rem] text-text-muted">
                  <span>{site.name}</span>
                  <span aria-hidden>·</span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </Reveal>
            </div>
          </Container>
        </header>

        {/* Body */}
        <div className="py-14 lg:py-20">
          <Container>
            <div className="mx-auto max-w-3xl">
              <PostBody blocks={post.body} />

              {post.faqs?.length ? (
                <section className="mt-14 border-t border-border pt-12">
                  <h2 className="font-display text-2xl font-normal text-text">
                    Frequently asked questions
                  </h2>
                  <dl className="mt-6 space-y-6">
                    {post.faqs.map((f) => (
                      <div key={f.q}>
                        <dt className="font-display text-lg text-text">{f.q}</dt>
                        <dd className="mt-2 text-[1.02rem] leading-relaxed text-text-muted">
                          {f.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {/* Inline CTA */}
              <div className="mt-14 rounded-card border border-border bg-bg-elevated p-8 text-center">
                <h2 className="font-display text-2xl font-light text-text">
                  Curious to feel it, not just read about it?
                </h2>
                <p className="mx-auto mt-3 max-w-md text-[1.02rem] leading-relaxed text-text-muted">
                  A first session in {site.location} is a calm, no-pressure way to
                  experience this work for yourself.
                </p>
                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink href="/book" icon={<ArrowRight size={16} weight="bold" />}>
                    Book a session
                  </ButtonLink>
                  <ButtonLink href="/sessions" variant="secondary">
                    Explore sessions
                  </ButtonLink>
                </div>
              </div>

              {/* Trademark note */}
              <p className="mt-10 text-[0.78rem] leading-relaxed text-text-muted">
                Access Consciousness®, Access Bars® and Access Energetic Facelift®
                are registered trademarks of Access Consciousness LLC, referenced
                here for descriptive and educational purposes. This article is
                general information and is not medical, psychological or financial
                advice.
              </p>
            </div>
          </Container>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-16 lg:py-24">
          <Container>
            <Reveal>
              <h2 className="font-display text-2xl font-light text-text sm:text-3xl">
                Keep reading
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} index={i}>
                  <BlogCard post={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
