import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

/* Sticky WhatsApp button that opens the private broadcast channel.
   Renders only once a real channel link is set in site.whatsappChannel. */
export function WhatsAppFab() {
  const ready =
    site.whatsappChannel.startsWith("http") &&
    !site.whatsappChannel.includes("your-channel-id");

  if (!ready) return null;

  return (
    <a
      href={site.whatsappChannel}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join the WhatsApp channel"
      className="group fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform duration-300 hover:-translate-y-0.5 hover:opacity-95"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-40 [animation-duration:2.5s]"
      />
      <WhatsappLogo size={26} weight="fill" />
    </a>
  );
}
