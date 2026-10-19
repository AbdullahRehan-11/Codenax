import type { Heading, NavLink, PageMeta, ProcessStep } from "@/lib/types";
 
// The six-stage process shown on the home, About and /process pages.
// Verbatim from codenax.com, captured 2026-09-30.

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    name: "Discover",
    summary: "We run research to identify customers, problems, and competitors to define the product scope.",
    tagline: "Understand before we build",
    description:
      "Every great product starts with deep understanding. We research your users, map the problem space, analyse competitors, and define a sharp product strategy — so every decision from here is grounded in evidence, not assumptions.",
    duration: "1–2 weeks",
    deliverables: [
      "User research summary",
      "Competitive landscape analysis",
      "Product strategy document",
      "Prioritised feature list",
      "Project scope & timeline",
    ],
    whatToExpect: [
      "Kickoff call with key stakeholders",
      "User interview sessions (if applicable)",
      "Weekly sync to align on findings",
      "Written strategy doc shared for review",
    ],
  },
  {
    number: "02",
    name: "Design",
    summary: "We craft intuitive, responsive designs and prototypes that align with your brand identity.",
    tagline: "Make it beautiful and usable",
    description:
      "We translate strategy into interfaces. Starting with low-fidelity wireframes, we iterate to high-fidelity designs and interactive prototypes — testing with real users before a single line of code is written.",
    duration: "2–4 weeks",
    deliverables: [
      "Information architecture",
      "Wireframes for all key flows",
      "High-fidelity UI designs",
      "Interactive prototype",
      "Design system & component library",
    ],
    whatToExpect: [
      "Figma access for live collaboration",
      "Two design review rounds",
      "Prototype testing with target users",
      "Developer handoff with specs",
    ],
  },
  {
    number: "03",
    name: "Develop",
    summary: "We build robust web, mobile, and AI applications with a secure, maintainable codebase.",
    tagline: "Build it right, build it fast",
    description:
      "Senior engineers take the approved designs and build clean, maintainable, and scalable code. We work in two-week sprints with full transparency — you can see progress in real time and give feedback throughout.",
    duration: "4–12 weeks",
    deliverables: [
      "Fully functional application",
      "API integrations & backend services",
      "Admin dashboard (if scoped)",
      "CI/CD pipeline setup",
      "Code documentation",
    ],
    whatToExpect: [
      "Bi-weekly sprint demos",
      "Access to staging environment",
      "Daily async updates via Slack/email",
      "Code review and PR transparency",
    ],
  },
  {
    number: "04",
    name: "Test",
    summary: "We rigorously test for quality, performance, and security to ensure product quality.",
    tagline: "Ship with confidence",
    description:
      "Before anything goes live, we put it through its paces. Automated test suites, manual QA, performance profiling, and security checks — so you launch knowing the product is rock-solid.",
    duration: "1–2 weeks",
    deliverables: [
      "Automated test suite (unit + integration)",
      "QA test plan & results report",
      "Performance audit",
      "Security vulnerability scan",
      "Bug fix log",
    ],
    whatToExpect: [
      "Dedicated QA environment",
      "Bug triage with priority levels",
      "Performance benchmarks shared",
      "Sign-off checklist before launch",
    ],
  },
  {
    number: "05",
    name: "Launch",
    summary: "We provide launch support to make sure your product works reliably in the production environment.",
    tagline: "Go live without the stress",
    description:
      "We manage the full deployment — infrastructure setup, DNS, SSL, monitoring, and error tracking. Launch day is calm, not chaotic. We stay on-hand for 48 hours post-launch to catch and fix anything immediately.",
    duration: "1 week",
    deliverables: [
      "Production deployment",
      "Infrastructure & hosting setup",
      "Analytics & error tracking integration",
      "Launch runbook & rollback plan",
      "48-hour post-launch support window",
    ],
    whatToExpect: [
      "Coordinated launch with your team",
      "Real-time monitoring dashboards",
      "Immediate response to any issues",
      "Post-launch summary report",
    ],
  },
  {
    number: "06",
    name: "Scale",
    summary: "We continuously improve and scale your product as your business grows.",
    tagline: "Grow without growing pains",
    description:
      "Launch is the beginning, not the end. We analyse usage data, gather user feedback, and continuously ship improvements — keeping your product competitive and your infrastructure ready for growth.",
    duration: "Ongoing",
    deliverables: [
      "Monthly performance & usage reports",
      "Prioritised roadmap updates",
      "Feature iterations & A/B tests",
      "Infrastructure scaling as needed",
      "Ongoing security patches",
    ],
    whatToExpect: [
      "Monthly strategy reviews",
      "Dedicated Slack channel",
      "Proactive recommendations",
      "Flexible engagement — scale up or down",
    ],
  },
];

/** The process section heading, as used on the home and /process pages. */
export const processHeading: Heading = {
  eyebrow: "How we work",
  title: "A proven process,",
  highlight: "from discovery to scalability",
  description: "Six clear stages that keep your project predictable and always moving forward.",
};

export const processPage = {
  meta: {
    title: "Process | CodeNax",
    description:
      "How CodeNax works — a proven six-step process from discovery to scale that keeps your project predictable, transparent, and always moving forward.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Our process",
    title: "From idea to impact,",
    highlight: "step by step",
    description:
      "Six clear stages that keep your project predictable, transparent, and always moving forward — from the first conversation to scaling in production.",
  } satisfies Heading,
  ctas: [
    { label: "Start your project", href: "/contact" },
    { label: "See our work", href: "/case-studies" },
  ] satisfies NavLink[],
  labels: {
    duration: "Typical duration:",
    deliverables: "Deliverables",
    whatToExpect: "What to expect",
  },
};
