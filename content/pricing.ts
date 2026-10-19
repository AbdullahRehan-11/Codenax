import type { ComparisonTable, Heading, PageMeta, PricingPlan } from "@/lib/types";

// /pricing: engagement models and comparison tables. Verbatim from codenax.com, captured 2026-09-30.
// The site shows how each model is priced but no amounts; we add none.

export const pricingPlans: PricingPlan[] = [
  {
    name: "Rapid MVP",
    tagline: "Idea to live product, fast",
    priceLabel: "Fixed price",
    priceNote: "Quoted upfront — no scope creep",
    features: [
      "80 hours of focused build time",
      "Design, development & deployment",
      "One core flow, production-grade",
      "Live on a real URL in ~2 weeks",
      "You own all the code & IP",
      "A costed roadmap to version two",
    ],
    cta: { label: "Get an estimate", href: "/estimate" },
    mostPopular: true,
  },
  {
    name: "Staff Augmentation",
    tagline: "Elite engineers, on demand",
    priceLabel: "Monthly",
    priceNote: "Per engineer, billed monthly",
    features: [
      "Pre-vetted senior developers",
      "Plugs into your workflow in days",
      "Scale the squad up or down anytime",
      "Optional CodeNax delivery lead",
      "No recruitment or hiring overhead",
      "Swap or replace with no penalty",
    ],
    cta: { label: "Hire a team", href: "/contact" },
  },
  {
    name: "AI & Custom Build",
    tagline: "Intelligent products, end to end",
    priceLabel: "Custom",
    priceNote: "Scoped to your goals",
    features: [
      "Discovery & product strategy",
      "AI agents, chatbots & automation",
      "Full web, mobile & platform builds",
      "Grounded in your data, with guardrails",
      "Ongoing support & iteration",
      "SLA & compliance options",
    ],
    cta: { label: "Book a call", href: "/contact" },
  },
];

/** Shown on /pricing and /why-us. */
export const comparisonTables: ComparisonTable[] = [
  {
    title: "The 80-hour MVP vs a traditional build",
    columns: ["CodeNax 80-hr MVP", "Traditional agency build"],
    rows: [
      { label: "Time to live", cells: ["~2 weeks", "3–6 months"] },
      { label: "Pricing", cells: ["Fixed, upfront", "Hourly, scope creep"] },
      { label: "Scope", cells: ["Focused core flow", "Everything at once"] },
      { label: "Delivery risk", cells: ["Low", "High"] },
      { label: "You own the code", cells: [{ icon: "check" }, { icon: "check" }] },
      { label: "Path to scale", cells: ["Built in", "Often a rewrite"] },
    ],
  },
  {
    title: "Staff augmentation vs the alternatives",
    columns: ["CodeNax", "In-house hire", "Freelancers"],
    rows: [
      { label: "Time to start", cells: ["Days", "2–3 months", "Days"] },
      { label: "Vetting", cells: ["Rigorous", "On you", "On you"] },
      { label: "Scale up or down", cells: ["Anytime", "Slow", "Risky"] },
      { label: "Seniority", cells: ["Senior", "Varies", "Varies"] },
      { label: "Reliability", cells: [{ icon: "check" }, { icon: "check" }, { icon: "cross" }] },
      { label: "Hiring overhead", cells: ["None", "High", "Low"] },
    ],
  },
];

export const pricingPage = {
  meta: {
    title: "Pricing & Engagement Models | CodeNax",
    description:
      "Three clear ways to work with CodeNax — a fixed-price 80-hour MVP, monthly staff augmentation, or a custom AI build. Transparent models, no hidden fees.",
  } satisfies PageMeta,
  heading: {
    eyebrow: "Pricing",
    title: "Simple, transparent",
    highlight: "engagement models",
    description:
      "Pick the model that fits how you want to work. Every engagement is scoped and quoted up front — no hidden fees, and you always own the code.",
  } satisfies Heading,
  mostPopularLabel: "Most popular",
  estimatorPrompt: {
    title: "Not sure what your project costs?",
    description: "Use our estimator to get an indicative scope and price in under a minute.",
    cta: { label: "Try the estimator", href: "/estimate" },
  },
};
 