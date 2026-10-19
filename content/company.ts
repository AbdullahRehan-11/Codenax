import type { Feature, Heading, NavLink, PageMeta } from "@/lib/types";

// Company pages: /about, /why-us, /careers and /life-at-codenax.
// Verbatim from codenax.com, captured 2026-09-30.
// Stat strips ("120+ Live Applications", "99% Client Retention"…) are deliberately left out
// until the owner confirms the figures — see CONTENT-GAPS.md.

export const aboutPage = {
  meta: {
    title: "About Us | CodeNax",
    description:
      "CodeNax is a custom software development company that helps businesses use modern technologies to drive impact.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "About CodeNax",
    title: "We have the",
    highlight: "Courage to Innovate",
    // "12+ years" disagrees with other pages; shown as on codenax.com (owner decision 2026-10-05, CONTENT-GAPS.md §2).
    description:
      "After spending 12+ years in a fast-evolving software development industry, we value creativity, innovation, and long-term relationships. It is what we do: we develop our products with a touch of creativity, a focus on real-world problems, and a commitment to building lasting value for our clients.",
  } satisfies Heading,
  ctas: [
    { label: "Work with us", href: "/contact" },
    { label: "See our work", href: "/case-studies" },
  ] satisfies NavLink[],
  story: {
    eyebrow: "What we do",
    title: "Our Collective Expertise Covers Your Digital Product from",
    highlight: "Idea to Impact",
    // "12+ years" and "200+ products" disagree with other pages; shown as on codenax.com (CONTENT-GAPS.md §2).
    description:
      "CodeNax started with a simple belief: great software should solve real problems, should be easy to use, and be built to succeed in a competitive environment. Over 12+ years, we have shipped 200+ products for founders and teams across healthcare, finance, e-commerce, logistics, and beyond.",
  } satisfies Heading,
  ceoMessage: {
    label: "Message from the CEO",
    quote:
      "We fuel growth with expertise and our vision for products' future. At CodeNax, we do not believe in just coding. Instead, we nurture every product for the future.",
    name: "Salman",
    role: "Founder & CEO",
  },
  expertise: {
    intro: "We excel at the following services:",
    items: [
      {
        title: "AI Development",
        description:
          "CodeNax develops and integrates AI to turn software products into intelligent systems for real-world business impact.",
        href: "/services/ai-development",
      },
      {
        title: "Staff Augmentation",
        description:
          "We deploy senior vetted engineers into your teams to fill tech-stack gaps and meet deadlines.",
        href: "/services/staff-augmentation",
      },
      {
        title: "MVP Development",
        description:
          "CodeNax provides MVP development services to enterprises and startups. We hit the market in 80 hours with your MVP.",
        href: "/services/mvp-development",
      },
    ],
  },
  processHeading: {
    eyebrow: "How we work",
    title: "How We Think, Build & Deliver",
  } satisfies Heading,
  values: {
    heading: {
      eyebrow: "What Guides Us",
      title: "Our Principles Behind Every Interaction",
    } satisfies Heading,
    items: [
      {
        title: "Respect",
        description:
          "We value each interaction, whether it is with our employees or partners. We believe mutual respect fuels mutual growth!",
      },
      {
        title: "Curiosity",
        description:
          "We understand and ask about the motives behind every request made by our partners, validate it, and translate it into workable products.",
      },
      {
        title: "Innovation",
        description:
          "We believe every product lives in the future. We look beyond today and anticipate how products, technologies, and market needs will evolve. Our products survive the test of time.",
      },
      {
        title: "Commitment",
        description:
          "We treat every project with utmost care. We deliver what we promise and stay connected with our clients after delivering products to solve any problems that might arise later on.",
      },
      {
        title: "Courage",
        description:
          "Great endeavors demand unbroken resolve. We take problems head-on, embrace challenges, learn from them, and keep pushing until we find a solution that works.",
      },
      {
        title: "Trust",
        description:
          "We believe trust begets success. We completely trust our partners and give them the confidence to share ideas and future perspectives with us to fuel growth.",
      },
    ] satisfies Feature[],
  },
};

export const whyUsPage = {
  meta: {
    title: "Why Us | CodeNax",
    description:
      "Why founders and teams choose CodeNax — senior craft, real ownership, AI at the core, and a long-term partnership that makes your product succeed.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Why CodeNax",
    title: "A partner invested in",
    highlight: "your outcome",
    description:
      "We pair senior craft with genuine ownership — so your product doesn't just launch, it succeeds long after.",
  } satisfies Heading,
  ctas: [
    { label: "Let's build together", href: "/contact" },
    { label: "See our work", href: "/case-studies" },
  ] satisfies NavLink[],
  differentiators: {
    heading: {
      eyebrow: "What sets us apart",
      title: "The reasons teams keep coming back",
    } satisfies Heading,
    items: [
      {
        title: "User-Centric by Design",
        description:
          "Every product starts with your users. We obsess over experience to drive adoption and retention.",
      },
      {
        title: "Built to Scale",
        description:
          "Architecture and infrastructure that grow with you — from MVP to millions of users.",
      },
      {
        title: "AI at the Core",
        description:
          "We weave AI into products to automate work, unlock insights, and create real competitive advantage.",
      },
      {
        title: "Industry Compliance",
        description:
          "Security and compliance baked in, so your product meets the standards of your industry.",
      },
      {
        title: "Long-Term Partnership",
        description:
          "We don't disappear after launch. We provide ongoing support and continuous improvement.",
      },
      {
        title: "Transparent Delivery",
        description:
          "Clear communication, predictable timelines, and full visibility into progress at every step.",
      },
    ] satisfies Feature[],
  },
  /** The two tables themselves live in content/pricing.ts (comparisonTables). */
  comparisonHeading: {
    eyebrow: "How we compare",
    title: "See the difference side by side",
    description: "Honest comparisons — so you can make the right call for your project.",
  } satisfies Heading,
  testimonialHeading: {
    eyebrow: "Client stories",
    title: "Heard from our clients",
  } satisfies Heading,
  /** The one testimonial /why-us shows (from content/testimonials.ts). */
  testimonialCompany: "Educator Hub",
};

export const careersPage = {
  meta: {
    title: "Careers | CodeNax",
    description:
      "Join CodeNax and help build software that people love. Explore open roles across engineering, design, product, and more.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "We're hiring",
    title: "Join",
    highlight: "our team",
    description:
      "We're a team of builders, designers, and problem-solvers who care about craft. If you want to do the best work of your career alongside people who push you higher, we'd love to hear from you.",
  } satisfies Heading,
  ctas: [
    { label: "View open positions", href: "#open-positions" },
    { label: "Get in touch", href: "/contact" },
  ] satisfies NavLink[],
  perks: {
    heading: {
      eyebrow: "Why CodeNax",
      title: "Why work with us",
      description: "We build a place people are proud to work — good tools, real ownership, and room to grow.",
    } satisfies Heading,
    items: [
      {
        title: "Remote-friendly",
        description: "Work from wherever you do your best work — we care about output, not office hours.",
      },
      {
        title: "Modern Tech Stack",
        description: "Ship with the latest tools and frameworks — no legacy baggage slowing you down.",
      },
      {
        title: "Learning & Growth",
        description: "A budget for courses, conferences, and books — we invest in your next level.",
      },
      {
        title: "Work-Life Balance",
        description: "Flexible hours and real time off. Sustainable pace beats burnout, every time.",
      },
    ] satisfies Feature[],
  },
  openings: {
    heading: {
      eyebrow: "Open positions",
      title: "Open positions",
      description: "Don't see the perfect fit? Reach out anyway — we're always open to meeting good people.",
    } satisfies Heading,
    /** The site currently lists no roles. */
    roles: [] as { title: string; href: string }[],
    empty: {
      title: "No open positions right now",
      description:
        "We don't have any roles open at the moment, but we're always happy to hear from talented people. Send us your resume through our contact page and we'll keep you in mind for what's next.",
      cta: { label: "Send us your resume", href: "/contact" } satisfies NavLink,
    },
  },
};

export const lifePage = {
  meta: {
    title: "Life at CodeNax — Culture, Perks & Work Environment",
    description:
      "Discover what it's like to work at CodeNax. Remote-first culture, continuous learning, meaningful work, and a team that genuinely cares.",
  } satisfies PageMeta,
  hero: {
    eyebrow: "Life at CodeNax",
    title: "Where great people build",
    highlight: "great products",
    description:
      "Remote-first, senior-driven, and obsessed with craft. We believe the best work happens when talented people have freedom, trust, and meaningful problems to solve.",
  } satisfies Heading,
  ctas: [
    { label: "See open roles", href: "/careers" },
    { label: "Meet the team", href: "/about" },
  ] satisfies NavLink[],
  perks: {
    heading: {
      eyebrow: "Perks & benefits",
      title: "Built for people who do their best work with freedom",
    } satisfies Heading,
    items: [
      {
        title: "Remote-first, always",
        description:
          "Work from anywhere in the world. We are a fully distributed team — no mandatory office, no relocation required.",
      },
      {
        title: "Flexible hours",
        description:
          "We care about output, not hours logged. Manage your own schedule around the work — not the other way around.",
      },
      {
        title: "Learning budget",
        description:
          "Annual budget for courses, conferences, and certifications. Stay sharp with the tools and skills that excite you.",
      },
      {
        title: "Ship real products",
        description:
          "No ticket factories. You work on products that launch, get users, and make a difference for real businesses.",
      },
      {
        title: "Health & wellbeing",
        description:
          "Paid time off, mental health support, and a culture that respects boundaries. Burnout is not a badge of honour here.",
      },
      {
        title: "Small, senior teams",
        description:
          "No layers of middle management. You collaborate directly with talented people who trust each other to do great work.",
      },
    ] satisfies Feature[],
  },
  culture: {
    heading: {
      eyebrow: "Our culture",
      title: "How we work together",
      description: "Culture is not a ping-pong table — it is how people treat each other every day.",
    } satisfies Heading,
    items: [
      {
        title: "Ownership over process",
        description: "We trust people to figure out the best way to solve problems. You own your work end to end.",
      },
      {
        title: "Craft matters",
        description:
          "We take pride in clean code, pixel-perfect UI, and thoughtful architecture. Details make the difference.",
      },
      {
        title: "Honest communication",
        description:
          "Feedback is direct, kind, and two-way. No politics, no guessing games — just clear, respectful conversations.",
      },
      {
        title: "Fun is part of the job",
        description:
          "Team game nights, casual catch-ups, and a Slack culture that does not take itself too seriously.",
      },
      {
        title: "Sustainable pace",
        description:
          "We ship fast, but we plan well. Crunch is a failure of planning, not a flex — and we avoid it deliberately.",
      },
      {
        title: "Grow with us",
        description:
          "Take on bigger challenges, explore new technologies, and shape your career path — we grow when you grow.",
      },
    ] satisfies Feature[],
  },
  typicalDay: {
    heading: {
      eyebrow: "A typical day",
      title: "What a day looks like",
    } satisfies Heading,
    items: [
      {
        title: "Morning",
        description:
          "Start on your own schedule. Catch up on async updates, review PRs, and plan your focus blocks.",
      },
      {
        title: "Midday",
        description:
          "A quick standup with your squad — 15 minutes, camera optional. Unblock, align, and get back to building.",
      },
      {
        title: "Afternoon",
        description:
          "Deep work time. Ship features, pair on a tricky problem, or explore a new approach to something that has been bugging you.",
      },
      {
        title: "Evening",
        description:
          "Wrap up at a time that works for you. Drop a summary in Slack, close the laptop, and actually switch off.",
      },
    ] satisfies Feature[],
  },
  closing: {
    title: "Sound like your kind of team?",
    description:
      "We are always looking for talented, curious people who care about craft. Check out our open roles or drop us a line — we would love to hear from you.",
    ctas: [
      { label: "View open positions", href: "/careers" },
      { label: "Get in touch", href: "/contact" },
    ] satisfies NavLink[],
  },
};
