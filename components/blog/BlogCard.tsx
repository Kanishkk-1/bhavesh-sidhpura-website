import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { BlogPost } from "@/lib/blog";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* Consistent card used on the blog index, homepage teaser and related lists. */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-7 transition-shadow duration-300 hover:shadow-soft">
      <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.16em] text-text-muted">
        <span className="text-accent">{post.category}</span>
        <span aria-hidden>·</span>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mt-4 font-display text-[1.35rem] font-normal leading-snug text-text">
        <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
          <span className="absolute inset-0" aria-hidden />
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-text-muted">
        {post.excerpt}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <time dateTime={post.date} className="text-[0.82rem] text-text-muted">
          {formatDate(post.date)}
        </time>
        <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-accent">
          Read
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </article>
  );
}
