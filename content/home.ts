import type { Heading, NavLink, PageMeta } from "@/lib/types";

// The codenax.com home page. Verbatim, captured 2026-09-30.
// Left out on purpose until the owner confirms them (see CONTENT-GAPS.md):
//   - the stat strip (120+ Live Applications, 99% Client Retention, 10+ Years, 8+ Industries)
//   - "99% happy clients" and "On time · Every sprint" on the hero cards
//   - mock-up metrics on the service cards (97% Accuracy, Speed 96, 4.9 avg rating, 98% on-time…)

export const homeMeta: PageMeta = {
  title: "CodeNax | AI-Powered Software | Web & Mobile Development Company",
  description:
    "We design and build AI-powered applications, websites, and mobile apps that turn your vision into workable, scalable products.",
};

export type HeroSlide = {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: NavLink;
  card: { label: string; points: string[] };
};

/** The hero rotates through three slides, in this order. */
export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "AI & Automation",
    title: "AI-Powered Software",
    highlight: "built to drive growth",
    // Shown as on codenax.com (owner decision 2026-10-05; it was held before).
    description:
      "Backed by a decade of success, CodeNax builds your software with utmost care, keeping usability and long-term business goals as the goalpost.",
    cta: { label: "Build with AI", href: "/services/ai-development" },
    card: {
      label: "CodeNax · AI Studio",
      points: [
        "Custom AI agents & assistants",
        "Chatbots trained on your data",
        "Workflow & document automation",
        "Recommendation & prediction engines",
      ],
    },
  },
  {
    eyebrow: "Build Your MVP in 80 Hours",
    title: "Bring ideas to life with a market-ready MVP in",
    highlight: "80 hours",
    description:
      "Transform your business ideas into a market-ready MVP that measures competition, user interest and market validation in 80 hours.",
    cta: { label: "Start your MVP", href: "/services/mvp-development" },
    card: {
      label: "CodeNax · Launchpad",
      points: [
        "Fixed scope & fixed timeline",
        "Real design, not a wireframe",
        "Production-grade, deployed live",
        "Built to scale into your full build",
      ],
    },
  },
  {
    eyebrow: "Dedicated Teams",
    title: "Scale your team with CodeNax",
    highlight: "elite engineers",
    description:
      "Scale up your staff with senior engineers or hire a dedicated team to meet deadlines and add width to your tech stack.",
    cta: { label: "Hire a team", href: "/services/staff-augmentation" },
    card: {
      label: "CodeNax · Team Hub",
      points: [
        "Vetted senior developers",
        "Full squads or individual hires",
        "Integrates into your workflow",
        "Flexible — scale up or down",
      ],
    },
  },
];

export const engagementModels = {
  heading: {
    eyebrow: "Our engagement models",
    title: "Three Ways We Accelerate",
    highlight: "Product Development",
    description: "Choose the software development engagement model that best suits your business needs!",
  } satisfies Heading,
  models: [
    {
      name: "Staff Augmentation",
      tagline: "Elite engineers, on demand",
      description:
        "Hire vetted senior developers or a full squad that plugs straight into your workflow and ships from week one.",
      points: ["Pre-vetted senior developers", "Plugs into your workflow", "Scale up or down anytime"],
      cta: { label: "Hire a team", href: "/services/staff-augmentation" } satisfies NavLink,
    },
    {
      badge: "Fixed scope · 80 hrs",
      name: "Build Your MVP in 80 Hours",
      tagline: "Idea to live product, fast",
      description:
        "A fixed-scope sprint that takes your core idea from concept to a polished, deployed MVP in 80 hours of build time.",
      points: ["Fixed scope, fixed timeline", "A real, deployed product", "Scales into your full build"],
      cta: { label: "Start your MVP", href: "/services/mvp-development" } satisfies NavLink,
    },
    {
      name: "AI-Powered Applications",
      tagline: "Intelligent products, real ROI",
      description:
        "Custom AI agents, chatbots, and automation grounded in your data — built where AI creates real competitive advantage.",
      points: ["Custom agents & chatbots", "Workflow automation", "Grounded in your data"],
      cta: { label: "Build with AI", href: "/services/ai-development" } satisfies NavLink,
    },
  ],
};

/** "What we do": the six service cards on the home page. */
export const serviceHighlights = {
  heading: {
    eyebrow: "What we do",
    title: "Services that take you",
    highlight: "from idea to impact",
    description: "A full-stack product partner — design, engineering, AI, and growth — under one roof.",
  } satisfies Heading,
  items: [
    {
      slug: "ai-development",
      name: "AI Development",
      badge: "Most requested",
      description:
        "Custom AI agents, chatbots, and intelligent automation that transform your data into business insights for growth.",
      points: ["Custom AI agents & assistants", "RAG pipelines & embeddings", "Workflow automation"],
      cta: "Explore AI services",
    },
    {
      slug: "web-development",
      name: "Website Development",
      description: "Fast, SEO-ready websites and web apps on Next.js and modern frameworks.",
      tags: ["Blazing fast"],
    },
    {
      slug: "custom-mobile-app-development",
      name: "Mobile Apps",
      description: "Native and cross-platform iOS & Android apps built to scale.",
      tags: ["iOS", "Android"],
    },
    {
      slug: "ui-ux-design-and-development",
      name: "UI/UX Design",
      description: "User-first interfaces and design systems made for simple and easy user navigation",
      tags: ["Design tokens", "Components", "Handoff"],
    },
    {
      slug: "staff-augmentation",
      name: "Dedicated Teams",
      description: "Top engineering talent that plugs into your workflow and adds value from day one.",
    },
    {
      slug: "software-testing-and-qa",
      name: "Software Testing",
      description: "Automated QA ensuring your product is ready to launch.",
      tags: ["Ship with confidence"],
    },
  ],
  cta: { label: "View all services", href: "/services" } satisfies NavLink,
};

export const techStackHeading: Heading = {
  eyebrow: "Tech stack",
  title: "Built with tools you trust",
};

export const industriesHeading: Heading = {
  eyebrow: "Our expertise",
  title: "Industries we",
  highlight: "serve",
};

export const caseStudiesHeading = {
  heading: {
    eyebrow: "Case studies",
    title: "Real products,",
    highlight: "real results",
  } satisfies Heading,
  /** The three case studies the home page features, in order. */
  featured: [
    "curenax-digital-healthcare-platform",
    "prepabac-tchad-learning-app",
    "fintech-solution-for-smarter-invoicing",
  ],
  cta: { label: "View all case studies", href: "/case-studies" } satisfies NavLink,
};

export const testimonialsHeading: Heading = {
  title: "Testimonials",
};

export const faqHeading = {
  heading: {
    title: "FAQ",
    description: "Everything you might want to know before we start working together.",
  } satisfies Heading,
  aside: {
    title: "Still have questions?",
    description: "Can't find the answer you're looking for? Reach out and we'll reply within a day.",
    cta: { label: "Get in touch", href: "/contact" } satisfies NavLink,
  },
  cta: { label: "View all FAQs", href: "/faq" } satisfies NavLink,
};
