import Image from "next/image";
import { WhatsappLogo, Megaphone } from "@phosphor-icons/react/dist/ssr";
import { Container, Eyebrow } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { CalendlyEmbed } from "../ui/CalendlyEmbed";
import { EnquiryForm } from "../ui/EnquiryForm";
import { booking, site, images } from "@/lib/site";

export function Booking() {
  const channelReady =
    site.whatsappChannel.startsWith("http") &&
    !site.whatsappChannel.includes("your-channel-id");

  return (
    <section id="booking" className="scroll-mt-24 bg-surface py-20 lg:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:gap-14">
          {/* Primary: live scheduling */}
          <Reveal>
            <div>
              <Eyebrow>{booking.scheduleLabel}</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-light leading-[1.1] tracking-[-0.02em] text-text sm:text-4xl">
                {booking.scheduleHeading}
              </h2>
              <div className="mt-8">
                <CalendlyEmbed url={site.calendly} />
              </div>
            </div>
          </Reveal>

          {/* Aside: personal + alternative ways to reach him */}
          <Reveal index={1}>
            <aside className="rounded-card border border-border bg-bg-elevated p-6 lg:sticky lg:top-24 lg:p-7">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-card bg-bg">
                <Image
                  src={images.warm}
                  alt="Bhavesh Sidhpura"
                  fill
                  sizes="(max-width: 1024px) 90vw, 26vw"
                  className="object-cover object-top img-editorial"
                />
              </div>

              <h3 className="mt-6 font-display text-xl font-light text-text">
                {booking.contactLabel}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-text-muted">
                {booking.contactBody}
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={site.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border-strong bg-bg px-5 py-3 text-[0.92rem] font-medium text-text transition-colors hover:border-accent hover:text-accent"
                >
                  <WhatsappLogo size={19} weight="fill" className="text-accent" />
                  {booking.whatsappPrompt}
                </a>

                {channelReady ? (
                  <a
                    href={site.whatsappChannel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border-strong bg-bg px-5 py-3 text-[0.92rem] font-medium text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    <Megaphone size={19} weight="fill" className="text-accent" />
                    {booking.channelPrompt}
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center gap-2.5 rounded-full border border-dashed border-border-strong px-5 py-3 text-[0.92rem] font-medium text-text-muted">
                    <Megaphone size={19} weight="regular" />
                    {booking.channelPending}
                  </span>
                )}
              </div>
            </aside>
          </Reveal>
        </div>

        {/* Enquiry form, clearly separated */}
        <div className="mt-14 border-t border-border pt-14 lg:mt-16 lg:pt-16">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

