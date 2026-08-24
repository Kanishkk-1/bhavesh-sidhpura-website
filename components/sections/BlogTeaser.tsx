import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import { BlogCard } from "../blog/BlogCard";
import { getFeaturedPosts, blogMeta } from "@/lib/blog";

export function BlogTeaser() {
  const posts = getFeaturedPosts(4);

  return (
    <section className="border-t border-border py-24 lg:py-32">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>{blogMeta.homeKicker}</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
                {blogMeta.homeHeading}
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted">
                {blogMeta.homeBody}
              </p>
            </Reveal>
          </div>
          <Reveal index={2}>
            <ButtonLink href="/blog" icon={<ArrowUpRight size={16} weight="bold" />}>
              {blogMeta.homeCta}
            </ButtonLink>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <Reveal key={post.slug} index={i}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
