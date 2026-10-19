import type { NavLink } from "@/lib/types";
import { site } from "@/content/site";

// The closing call-to-action banner that ends almost every page on codenax.com.
// Verbatim, captured 2026-09-30.

export const ctaBanner = {
  title: "Let's build something people love",
  description:
    "Tell us about your idea and get a free, no-obligation consultation. We'll help you scope it, shape it, and ship it.",
  email: { label: "Email us", href: `mailto:${site.email}` } satisfies NavLink,
  whatsapp: { label: "Chat on WhatsApp", href: site.whatsappUrl } satisfies NavLink,
  note: "Free consultation · Response within 24 hours",
};
