import type { Feature, Heading, Industry, NavLink, PageMeta } from "@/lib/types";

// The eight industries, in the order the /industries tabs list them.
// Verbatim from codenax.com, captured 2026-09-30. Slugs match the site's anchors.
// Taglines come from the home page's industry carousel data (captured 2026-10-01).

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "Telehealth & patient apps",
    summary:
      "Compliant, patient-first digital health products that clinicians and patients actually use — built with HIPAA requirements from day one.",
    whatWeBuild: [
      "Patient portals & telehealth apps",
      "AI triage & clinical assistants",
      "HIPAA-compliant infrastructure",
      "Remote monitoring & wearable integrations",
    ],
    caseStudies: ["curenax-digital-healthcare-platform"],
  },
  {
    slug: "finance-business",
    name: "Finance & Business",
    tagline: "Fintech, payments & dashboards",
    summary:
      "Secure, scalable fintech products built for regulatory compliance and real-time performance across payments, lending, and analytics.",
    whatWeBuild: [
      "Payment & lending platforms",
      "Financial dashboards & analytics",
      "KYC/AML workflow automation",
      "Investor-ready MVPs",
    ],
    caseStudies: [],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    tagline: "Storefronts & marketplaces",
    summary:
      "High-converting storefronts and marketplaces that scale with your catalogue and traffic — plus AI to personalise the experience.",
    whatWeBuild: [
      "Custom storefronts & marketplaces",
      "Inventory & order management",
      "AI support chatbots",
      "Personalisation & recommendation engines",
    ],
    caseStudies: [],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "LMS, e-learning & student platforms",
    summary:
      "Engaging learning platforms that improve outcomes for students, teachers, and institutions at any scale.",
    whatWeBuild: [
      "LMS & e-learning platforms",
      "Student progress dashboards",
      "AI tutoring & assessment tools",
      "Live class & cohort management",
    ],
    caseStudies: ["prepabac-tchad-learning-app", "educator-hub-global-online-learning-platform"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    tagline: "Tracking & fleet management",
    summary:
      "Operations software that gives real-time visibility, reduces cost, and keeps deliveries on time — every time.",
    whatWeBuild: [
      "Fleet & route management",
      "Real-time tracking apps",
      "Warehouse & inventory systems",
      "Driver dispatch & proof-of-delivery",
    ],
    caseStudies: [],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Listings, CRM & virtual tours",
    summary:
      "Property tech that streamlines buying, selling, and managing real estate at scale with modern UX.",
    whatWeBuild: [
      "Listing & search platforms",
      "CRM & lead management",
      "Virtual tours & 3D walkthroughs",
      "Rental & property management portals",
    ],
    caseStudies: [],
  },
  {
    slug: "travel-tourism",
    name: "Travel & Tourism",
    tagline: "Booking & itinerary platforms",
    summary:
      "Booking and itinerary platforms that delight travellers, reduce drop-off, and drive repeat business.",
    whatWeBuild: [
      "Booking & reservation engines",
      "Itinerary & trip planning apps",
      "Loyalty & rewards programmes",
      "Multi-supplier aggregation APIs",
    ],
    caseStudies: [],
  },
  {
    slug: "food-delivery",
    name: "Food & Delivery",
    tagline: "Ordering & delivery apps",
    summary:
      "Fast, reliable ordering and delivery apps that handle peak demand without breaking a sweat.",
    whatWeBuild: [
      "On-demand delivery apps",
      "Restaurant management systems",
      "Driver dispatch & routing",
      "Menu & pricing management",
    ],
    caseStudies: ["alkebabish-food-ordering-app"],
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export const industriesPage = {
  meta: {
    title: "Industries | CodeNax",
    description:
      "From healthcare and fintech to retail and logistics, CodeNax builds software tuned to the realities, compliance, and users of your industry.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Industries we serve",
    title: "Software built for",
    highlight: "your industry",
    // "100+ products" disagrees with other pages; shown as on codenax.com (CONTENT-GAPS.md §2).
    description:
      "We've shipped 100+ products across 8 industries. Every sector has its own rules, users, and pressures — and we know them.",
  } satisfies Heading,
  ctas: [
    { label: "Start your project", href: "/contact" },
    { label: "See our work", href: "/case-studies" },
  ] satisfies NavLink[],
  explorer: {
    eyebrow: "8 industries",
    title: "Deep expertise, sector by sector",
    description: "Select an industry to see what we build and relevant work from our portfolio.",
  } satisfies Heading,
  labels: {
    whatWeBuild: "What we build",
    relatedWork: "Related work",
  },
  /** Shown instead of related work when an industry has no case study yet. */
  noRelatedWork: {
    title: "Building in this space?",
    description: "Tell us what you have in mind and we will scope it with you.",
    cta: { label: "Start a conversation", href: "/contact" } satisfies NavLink,
  },
  strengths: {
    heading: {
      eyebrow: "Consistent across every project",
      title: "What we bring to every industry",
    } satisfies Heading,
    items: [
      {
        title: "Security & compliance",
        description: "GDPR, HIPAA, PCI-DSS, and SOC 2 baked in from day one — not bolted on at the end.",
      },
      {
        title: "Scalable architecture",
        description: "Infrastructure that grows from 100 to 1 million users without a rewrite.",
      },
      {
        title: "AI integration",
        description: "We weave AI in where it creates real leverage — automation, insights, and intelligent UX.",
      },
    ] satisfies Feature[],
  },
};
