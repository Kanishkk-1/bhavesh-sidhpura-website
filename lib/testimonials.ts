/* Client testimonials — text only (no chat screenshots).
   Add new entries here; home shows a preview, /testimonials shows all. */

export type Testimonial = {
  id: string;
  quote: string;
  context: string;
};

export const testimonialsHome = {
  label: "Kind words",
  heading: "What people say after a session.",
  intro:
    "Notes from clients after classes and sessions — shared with gratitude, in their own words.",
  cta: "See more testimonials",
  ctaHref: "/testimonials",
  /** How many quotes to show on the home page. */
  previewCount: 2,
};

export const testimonialsPage = {
  kicker: "Testimonials",
  heading: "Words from the ones who sat with the work.",
  lead:
    "Real notes from clients after sessions and classes. More will be added here as they arrive.",
};

export const testimonials: Testimonial[] = [
  {
    id: "class-facilitation",
    quote:
      "Both are super happy. They liked your facilitation a lot. Thank you from all three of us from the bottom of our hearts. Ever so grateful.",
    context: "After a class",
  },
  {
    id: "sop-session",
    quote:
      "Hey, thank you Bhavesh for the lovely SOP session yesterday. Feeling so at ease after the session — it's just magical. Thank you, thank you, thank you.",
    context: "After a Symphony of Possibilities session",
  },
];
