import type { NavGroup, NavItem, NavLink } from "@/lib/types";

// Labels, hrefs and descriptions are verbatim from codenax.com (rendered header/footer,
// the site's own nav config, and /services headings/taglines), verified 2026-09-28.
// Industry links point at our /industries/[slug] pages; slugs match the reference anchors.

export const primaryCta: NavLink = { label: "Book a call", href: "/contact" };

// The reference header's Services menu.
const featuredServices: NavLink[] = [
  {
    label: "AI Development",
    href: "/services/ai-development",
    description: "Custom agents, chatbots & automation",
    icon: "sparkles",
  },
  {
    label: "Staff Augmentation",
    href: "/services/staff-augmentation",
    description: "Senior engineers on demand",
    icon: "users",
  },
  {
    label: "MVP in 80 Hours",
    href: "/services/mvp-development",
    description: "Idea to live product, fast",
    icon: "rocket",
  },
];

// Every service on /services, with its tagline.
const allServices: NavLink[] = [
  {
    label: "AI Development",
    href: "/services/ai-development",
    description: "Intelligent products that create real leverage",
    icon: "sparkles",
  },
  {
    label: "Website Development",
    href: "/services/web-development",
    description: "Fast, modern, and built to convert",
    icon: "globe",
  },
  {
    label: "Mobile App Development",
    href: "/services/custom-mobile-app-development",
    description: "Native and cross-platform apps users love",
    icon: "smartphone",
  },
  {
    label: "UI/UX Design",
    href: "/services/ui-ux-design-and-development",
    description: "Interfaces people actually want to use",
    icon: "palette",
  },
  {
    label: "Dedicated Teams",
    href: "/services/staff-augmentation",
    description: "Senior engineers that plug in and ship",
    icon: "users",
  },
  {
    label: "Software Testing & QA",
    href: "/services/software-testing-and-qa",
    description: "Ship with confidence, every time",
    icon: "shield-check",
  },
  {
    label: "Branding & Marketing",
    href: "/services/branding-marketing",
    description: "A brand that stands out and scales",
    icon: "megaphone",
  },
  {
    label: "Social Media Marketing",
    href: "/services/social-media-marketing",
    description: "Turn followers into paying customers",
    icon: "share",
  },
  {
    label: "Metaverse & Immersive",
    href: "/services/metaverse-development",
    description: "Next-generation 3D and AR/VR experiences",
    icon: "box",
  },
];

const industries: NavLink[] = [
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Education", href: "/industries/education" },
  { label: "Finance & Business", href: "/industries/finance-business" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "Retail & E-commerce", href: "/industries/retail-ecommerce" },
  { label: "Logistics", href: "/industries/logistics" },
  { label: "Travel & Tourism", href: "/industries/travel-tourism" },
  { label: "Food & Delivery", href: "/industries/food-delivery" },
];

export const mainNav: NavItem[] = [
  {
    kind: "menu",
    id: "services",
    label: "Services",
    layout: "mega",
    groups: [
      { title: "Featured", links: featuredServices },
      { title: "All services", links: allServices },
    ],
    overview: { label: "View all services", href: "/services" },
  },
  {
    kind: "menu",
    id: "industries",
    label: "Industries",
    layout: "dropdown",
    groups: [{ title: "Industries we serve", links: industries }],
    overview: { label: "View all industries", href: "/industries" },
  },
  { kind: "link", label: "Case Studies", href: "/case-studies" },
  { kind: "link", label: "Pricing", href: "/pricing" },
  {
    kind: "menu",
    id: "insights",
    label: "Insights",
    layout: "dropdown",
    // The reference Insights menu lists only Blog. FAQ and Estimator come from the
    // footer's Resources group so the menu isn't a single item (presentation choice).
    groups: [
      {
        title: "Insights",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "FAQ", href: "/faq" },
          { label: "Estimator", href: "/estimate" },
        ],
      },
    ],
  },
  {
    kind: "menu",
    id: "company",
    label: "Company",
    layout: "dropdown",
    groups: [
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Why Us", href: "/why-us" },
          { label: "Process", href: "/process" },
          { label: "Careers", href: "/careers" },
          { label: "Life at CodeNax", href: "/life-at-codenax" },
          { label: "Contact Us", href: "/contact" },
        ],
      },
    ],
  },
];

// The reference footer's link groups.
export const footerGroups: NavGroup[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Services", href: "/services" },
      { label: "Why Us", href: "/why-us" },
      { label: "Process", href: "/process" },
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Life at CodeNax", href: "/life-at-codenax" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Estimator", href: "/estimate" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
