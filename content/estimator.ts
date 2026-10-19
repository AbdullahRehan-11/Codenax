import type { EstimatorOption, Heading, PageMeta } from "@/lib/types";

// /estimate: options, hours and page copy. Labels and messages are verbatim from codenax.com.
//
// Hours and rates were read from the live estimator (2026-09-30) by selecting each option and
// recording the result. They reproduce every combination tested, including both extremes
// (SaaS + all features = 90 h, $5,400–$8,600). The site does not publish the formula, so the
// owner should still confirm these numbers (see CONTENT-GAPS.md).

/** Step 1: choose one. Hours are the project's base build time. */
export const projectTypes: EstimatorOption[] = [
  { id: "saas", label: "SaaS web app", hours: 32 },
  { id: "marketplace", label: "Marketplace / two-sided", hours: 40 },
  { id: "mobile", label: "Mobile app (iOS / Android)", hours: 40 },
  { id: "ai-assistant", label: "AI assistant / chatbot", hours: 36 },
  { id: "internal-tool", label: "Internal tool / dashboard", hours: 28 },
];

/** Step 2: choose any. Each adds its hours to the project type's base. */
export const estimatorFeatures: EstimatorOption[] = [
  { id: "auth", label: "User accounts & auth", hours: 6 },
  { id: "payments", label: "Payments / subscriptions", hours: 8 },
  { id: "admin", label: "Admin dashboard", hours: 8 },
  { id: "ai", label: "AI feature (chat, automation)", hours: 12 },
  { id: "realtime", label: "Real-time / live updates", hours: 8 },
  { id: "notifications", label: "Email & push notifications", hours: 4 },
  { id: "integrations", label: "Third-party integrations", hours: 6 },
  { id: "analytics", label: "Analytics & reporting", hours: 6 },
];

export const estimatorRules = {
  /** Price range = hours × these rates, rounded to the nearest $100. */
  lowRatePerHour: 60,
  highRatePerHour: 95,
  roundTo: 100,
  /** At or under this many hours the project fits one MVP sprint. */
  mvpSprintHours: 80,
  /** What the live estimator starts with selected. */
  defaultProjectType: "saas",
  defaultFeatures: ["auth"],
};

export const estimatorPage = {
  meta: {
    title: "Project Estimator | CodeNax",
    description:
      "Pick your project type and features to get an instant, indicative scope and price — and see if it fits our 80-hour MVP sprint.",
  } satisfies PageMeta,
  heading: {
    eyebrow: "Project estimator",
    title: "Get an instant",
    highlight: "project estimate",
    description:
      "Choose what you're building and the features you need. We'll show indicative scope, price, and whether it fits our 80-hour MVP sprint.",
  } satisfies Heading,
  steps: {
    projectType: "1. What are you building?",
    features: "2. Which features do you need?",
  },
  result: {
    title: "Estimated scope",
    hoursLabel: "hours of build time",
    priceLabel: "Indicative price",
    fitsSprint: "This fits our 80-hour MVP sprint — live in about two weeks.",
    // The live site shows this exact sentence whenever the total goes over 80 hours.
    exceedsSprint: "Best delivered as 2 focused sprints — we'll ship the core MVP first, then phase the rest.",
    cta: "Email me this estimate",
    disclaimer: "Indicative only. Final quote follows a quick scoping call. Or book a call.",
  },
};
