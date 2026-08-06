import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { testimonials, testimonialsPage } from "@/lib/testimonials";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Client notes after Access Consciousness sessions and classes with Bhavesh Sidhpura — in their own words.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <PageHero
        kicker={testimonialsPage.kicker}
        heading={testimonialsPage.heading}
        lead={testimonialsPage.lead}
      />

      <section className="border-t border-border py-20 lg:py-28">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {testimonials.map((t, i) => (
              <Reveal as="article" index={i % 3} key={t.id}>
                <blockquote className="spotlight rounded-card border border-border bg-bg-elevated p-7 transition-shadow duration-300 hover:shadow-soft sm:p-9">
                  <span
                    aria-hidden
                    className="font-display text-5xl font-light leading-none text-accent/50"
                  >
                    &ldquo;
                  </span>
                  <p className="mt-4 font-display text-[1.3rem] font-light leading-snug text-text sm:text-[1.45rem]">
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
        </Container>
      </section>

      <ClosingCta
        heading="Curious what a session feels like?"
        body="Book a first session, or send a note with any question at all."
        secondaryLabel="See sessions"
        secondaryHref="/sessions"
      />
    </main>
  );
}
