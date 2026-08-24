import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BlogCard } from "@/components/blog/BlogCard";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getCategories, blogMeta } from "@/lib/blog";
import { site } from "@/lib/site";

const base = site.domain.replace(/\/$/, "");

export const metadata: Metadata = {
  title: "Blog — Access Consciousness, Access Bars & Everyday Tools",
  description:
    "Honest, jargon-free articles on Access Consciousness, Access Bars, the Energetic Facelift and the everyday tools behind them — for the curious and the skeptical alike.",
  keywords: [
    "access consciousness blog",
    "access bars blog",
    "access consciousness articles",
    "what is access consciousness",
    "access bars India",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Access Consciousness, Access Bars & Everyday Tools",
    description:
      "Honest, jargon-free articles on Access Consciousness, Access Bars and the everyday tools behind them.",
    url: `${base}/blog`,
    type: "website",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${base}/blog`,
    name: `${site.name} — Blog`,
    description: metadata.description,
    url: `${base}/blog`,
    inLanguage: "en",
    publisher: { "@type": "Person", name: site.name, url: base },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${base}/blog/${p.slug}`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
      author: { "@type": "Person", name: site.name },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${base}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
    ],
  };

  return (
    <main>
      <JsonLd data={[blogLd, breadcrumbLd]} />
      <PageHero
        kicker={blogMeta.kicker}
        heading={blogMeta.heading}
        emphasis={blogMeta.emphasis}
        lead={blogMeta.lead}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.82rem] text-text-muted">
              <span className="uppercase tracking-[0.16em]">Topics:</span>
              {categories.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border bg-bg-elevated px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} index={i % 3}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta
        heading="Reading is a fine place to start."
        body="When words have taken you as far as they can, a first session is the next honest step."
        primaryLabel="Book a session"
        secondaryLabel="Explore sessions"
        secondaryHref="/sessions"
      />
    </main>
  );
}
