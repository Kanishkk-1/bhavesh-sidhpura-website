import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import {
  testimonials,
  testimonialsHome,
} from "@/lib/testimonials";

export function Testimonials({
  limit = testimonialsHome.previewCount,
  showCta = true,
}: {
  limit?: number;
  showCta?: boolean;
}) {
  const items = testimonials.slice(0, limit);

  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-t border-border bg-surface py-24 lg:py-32"
    >
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>{testimonialsHome.label}</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-6 text-balance font-display text-4xl font-light leading-[1.1] tracking-[-0.02em] text-text sm:text-5xl">
                {testimonialsHome.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal index={2}>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-text-muted">
              {testimonialsHome.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {items.map((t, i) => (
            <Reveal as="article" index={i % 2} key={t.id}>
              <blockquote className="spotlight flex h-full flex-col rounded-card border border-border bg-bg p-7 transition-shadow duration-300 hover:shadow-soft lg:p-9">
                <span
                  aria-hidden
                  className="font-display text-5xl font-light leading-none text-accent/50"
                >
                  &ldquo;
                </span>
                <p className="mt-4 flex-1 font-display text-[1.25rem] font-light leading-snug text-text sm:text-[1.35rem]">
                  {t.quote}
                </p>
                <footer className="mt-8 border-t border-border pt-5">
                  <cite className="not-italic text-[0.8rem] font-medium uppercase tracking-[0.16em] text-text-muted">
                    {t.context}
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        {showCta && (
          <Reveal index={1}>
            <div className="mt-12 flex justify-center md:justify-start">
              <ButtonLink
                href="/testimonials"
                variant="secondary"
                icon={<ArrowRight size={16} weight="bold" />}
              >
                See more testimonials
              </ButtonLink>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
