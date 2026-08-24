import type { ReactNode } from "react";

/* Renders a JSON-LD structured-data script. Server component only.
   The data is trusted, app-generated content (no user input), so
   serialising it into a script tag is safe. */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }): ReactNode {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
