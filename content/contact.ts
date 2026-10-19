import type { Heading, PageMeta } from "@/lib/types";
import { site } from "@/content/site";

// /contact: page copy and the enquiry form's fields. Verbatim from codenax.com, captured 2026-09-30.

export const contactPage = {
  meta: {
    title: "Contact | CodeNax",
    description:
      "Get in touch with CodeNax for a free, no-obligation consultation. Tell us about your idea and we will help you scope it, shape it, and ship it.",
  } satisfies PageMeta,
  hero: {
    title: "Let's build something",
    highlight: "people love",
    description:
      "Tell us about your idea and get a free, no-obligation consultation. We'll help you scope it, shape it, and ship it.",
  } satisfies Heading,
  badges: ["Free consultation", "Reply within 24 hours", "NDA on request"],
  channels: [
    { label: "Email us", value: site.email, href: `mailto:${site.email}` },
    { label: "WhatsApp", value: site.phone, href: site.whatsappUrl },
    { label: "Our address", value: site.address },
    { label: "Response time", value: "Within 24 hours" },
  ],
  about: {
    name: site.name,
    text: "Your Partner To Grow Your Business. We partner with founders and teams to ship products people actually love.",
  },
};

export const contactForm = {
  title: "Send us a message",
  description: "Fill out the form and we'll be in touch shortly.",
  fields: {
    name: { label: "Full name", placeholder: "Jane Doe", required: true },
    email: { label: "Email", placeholder: "jane@company.com", required: true },
    company: { label: "Company", placeholder: "Acme Inc. (optional)", required: false },
    service: {
      label: "Service",
      placeholder: "What do you need?",
      required: true,
      options: [
        "AI Development",
        "Mobile App Development",
        "Website Development",
        "UI/UX Design",
        "Software Testing",
        "Branding & Marketing",
        "Social Media Marketing",
        "Dedicated Teams",
        "Metaverse Development",
      ],
    },
    budget: {
      label: "Budget",
      placeholder: "Estimated budget",
      required: false,
      options: ["Less than $5k", "$5k – $15k", "$15k – $50k", "$50k+", "Not sure yet"],
    },
    details: {
      label: "Project details",
      placeholder: "Tell us about your project, goals, and timeline…",
      hint: "The more context you share, the better we can help.",
      required: true,
      maxLength: 2000,
    },
  },
  submit: "Send message",
  sending: "Sending…",
  privacyNote: "We'll never share your details. No spam, ever.",
  // Our wording (not on codenax.com). Owner decision 2026-10-07: the form shows a success
  // screen even though there is no backend yet, so nothing is actually sent.
  success: {
    title: "Thanks for reaching out!",
    text: "We've received your message and will get back to you within 24 hours.",
    again: "Send another message",
  },
};
