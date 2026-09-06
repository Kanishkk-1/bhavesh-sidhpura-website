"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarBlank } from "@phosphor-icons/react";

const PLACEHOLDER = "your-handle";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function CalendlyEmbed({ url }: { url: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const isPlaceholder = url.includes(PLACEHOLDER);

  const themedUrl = `${url}${url.includes("?") ? "&" : "?"}background_color=14120e&text_color=f3efe6&primary_color=a9793f&hide_gdpr_banner=1`;

  useEffect(() => {
    const parent = ref.current;
    if (isPlaceholder || !parent) return;

    function init() {
      if (!window.Calendly || !parent) return;
      parent.innerHTML = "";
      window.Calendly.initInlineWidget({ url: themedUrl, parentElement: parent });
      setLoaded(true);
    }

    if (window.Calendly) {
      init();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_JS}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = WIDGET_JS;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener("load", init);
    return () => script?.removeEventListener("load", init);
  }, [isPlaceholder, themedUrl]);

  if (isPlaceholder) {
    return (
      <div className="grid min-h-[460px] place-items-center rounded-card border border-dashed border-border-strong bg-bg-elevated p-10 text-center">
        <div className="max-w-xs">
          <CalendarBlank
            size={32}
            weight="regular"
            className="mx-auto text-accent"
          />
          <p className="mt-4 font-display text-xl text-text">
            Calendly booking widget
          </p>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-text-muted">
            Live scheduling appears here once the Calendly account is connected.
            Pune in-person slots and travel-city dates.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Warm up the connection so the widget paints sooner */}
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
      <link rel="preconnect" href="https://calendly.com" crossOrigin="" />
      <div className="relative h-[760px] overflow-hidden rounded-card border border-border md:h-[720px]">
        {!loaded && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-bg-elevated">
            <div className="flex flex-col items-center gap-3 text-text-muted">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-accent" />
              <span className="text-sm">Loading scheduling…</span>
            </div>
          </div>
        )}
        <div ref={ref} className="h-full w-full" />
      </div>
    </>
  );
}
