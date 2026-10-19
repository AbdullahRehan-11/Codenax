import type { IconName } from "@/components/ui/icon";  

// Shared content types. Every value that uses them lives in content/ and is copied
// verbatim from codenax.com (see CONTENT-GAPS.md for what is missing or unconfirmed).

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type NavMenu = {
  kind: "menu";
  id: string;
  label: string;
  /** "mega" spans the full width under the header; "dropdown" sits under its trigger. */
  layout: "mega" | "dropdown";
  groups: NavGroup[];
  /** Optional "view all" link shown at the bottom of the panel. */
  overview?: NavLink;
};

export type NavItem = { kind: "link"; label: string; href: string } | NavMenu;

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

// ---------------------------------------------------------------------------
// Building blocks shared by long-form pages
// ---------------------------------------------------------------------------

/** The <title> and meta description a reference page uses. */
export type PageMeta = {
  title: string;
  description: string;
};

/**
 * A page or section heading. `highlight` is the part the reference site styles
 * differently, e.g. title "Services that take you" + highlight "from idea to impact".
 */
export type Heading = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
};

/** One piece of long-form text, kept in the order it appears on the reference page. */
export type RichBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  /** The first row is the header row. */
  | { type: "table"; rows: string[][] };

export type FAQ = {
  question: string;
  answer: RichBlock[];
};

/** A card, step or group inside a section: a title plus whatever sits under it. */
export type ContentItem = {
  title: string;
  body: RichBlock[];
};

/** One titled section of a page: optional intro content, then its items. */
export type ContentSection = {
  heading: string;
  intro: RichBlock[];
  items: ContentItem[];
};

/** A label with a short description (values, perks, differentiators…). */
export type Feature = {
  title: string;
  description: string;
};

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

/** A service as listed on /services. */
export type ServiceSummary = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  mostRequested?: boolean;
};

/** The full /services/[slug] page. */
export type ServicePage = {
  slug: string;
  meta: PageMeta;
  title: string;
  intro: string[];
  sections: ContentSection[];
  faqs: FAQ[];
};

/** Labels a service page shows beside its main content (content/service-extras.ts). */
export type ServiceExtras = {
  /** The label above the hero title. */
  eyebrow?: string;
  /** The hero's own buttons (first primary). */
  ctas: NavLink[];
  /** Keyed by section heading: the pill above it, and a Lucide icon name per item title. */
  sections: Record<string, { pill?: string; icons?: Record<string, string> }>;
};

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export type Industry = {
  slug: string;
  name: string;
  /** Short one-liner from the home page's industry carousel. */
  tagline: string;
  summary: string;
  whatWeBuild: string[];
  /** Slugs of case studies shown as related work for this industry. */
  caseStudies: string[];
};

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

export type CaseStudy = {
  slug: string;
  meta: PageMeta;
  client: string;
  industry: string;
  engagement: string;
  title: string;
  summary: string;
  clientQuote: string;
  /** Overview, challenge, solution and outcome, with their headings as written. */
  sections: { heading: string; blocks: RichBlock[] }[];
  techStack: { group: string; items: string[] }[];
};

// ---------------------------------------------------------------------------
// Testimonials, FAQ, process
// ---------------------------------------------------------------------------

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type FAQCategory = "General" | "Services" | "Process" | "Pricing" | "Support";

export type CategorizedFAQ = FAQ & { category: FAQCategory };

export type ProcessStep = {
  number: string;
  name: string;
  summary: string;
  tagline: string;
  description: string;
  duration: string;
  deliverables: string[];
  whatToExpect: string[];
};

// ---------------------------------------------------------------------------
// Pricing and estimator
// ---------------------------------------------------------------------------

export type PricingPlan = {
  name: string;
  tagline: string;
  /** How the price is expressed, e.g. "Fixed price". The site shows no amounts. */
  priceLabel: string;
  priceNote: string;
  features: string[];
  cta: { label: string; href: string };
  mostPopular?: boolean;
};

/** A comparison cell: text, or a tick / cross icon. */
export type ComparisonCell = string | { icon: "check" | "cross" };

export type ComparisonTable = {
  title: string;
  columns: string[];
  rows: { label: string; cells: ComparisonCell[] }[];
};

export type EstimatorOption = {
  id: string;
  label: string;
  hours: number;
};

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export type BlogPost = {
  slug: string;
  meta: PageMeta;
  category: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingMinutes: number;
  title: string;
  excerpt: string;
  tags: string[];
  author: { name: string; role: string };
  body: RichBlock[];
  faqs: FAQ[];
};
