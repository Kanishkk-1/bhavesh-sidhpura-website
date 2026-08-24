import type { BlogBlock } from "@/lib/blog";

/* Renders a blog post's block content as semantic, SEO-friendly HTML.
   Server component — no client JS needed. */
export function PostBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="pt-4 font-display text-2xl font-normal leading-snug tracking-[-0.01em] text-text sm:text-[1.7rem]"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="pt-2 font-display text-xl font-normal leading-snug text-text"
              >
                {block.text}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent pl-5 font-display text-xl font-light italic leading-relaxed text-text"
              >
                {block.text}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="space-y-2.5 pl-1">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-[1.05rem] leading-relaxed text-text-muted">
                    <span
                      aria-hidden
                      className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "p":
          default:
            return (
              <p key={i} className="text-[1.05rem] leading-relaxed text-text-muted">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
