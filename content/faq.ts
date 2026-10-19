// FAQ: every question on /faq with its category filter.
// Generated from codenax.com (rendered pages, captured 2026-09-30). Text is verbatim.
// See CONTENT-GAPS.md for anything missing or awaiting confirmation.

import type { CategorizedFAQ, FAQCategory, Heading, PageMeta } from "@/lib/types";

export const faqPage = {
  meta: {
    title: "FAQ | CodeNax",
    description: "Answers to the most common questions about working with CodeNax — our services, process, pricing, timelines, and ongoing support.",
  },
  heading: {
    title: "Frequently asked",
    highlight: "questions",
    description: "Everything you might want to know before we start working together. Can't find your answer? We're only a message away.",
  },
  allLabel: "All",
  closing: {
    title: "Still have questions?",
    description: "Can't find the answer you're looking for? Reach out and we'll reply within a day.",
  },
} satisfies {
  meta: PageMeta;
  heading: Heading;
  allLabel: string;
  closing: { title: string; description: string };
};

export const faqCategories: FAQCategory[] = ["General", "Services", "Process", "Pricing", "Support"];

export const faqs: CategorizedFAQ[] = [
  {
    category: "General",
    question: "What kind of projects does CodeNax take on?",
    answer: [
      {
        type: "paragraph",
        text: "We build AI-powered applications, websites, and mobile apps across industries like healthcare, finance, e-commerce, education, and more. From a focused MVP to a large-scale platform, we can help.",
      },
    ],
  },
  {
    category: "General",
    question: "Where is your team based, and how do you collaborate?",
    answer: [
      {
        type: "paragraph",
        text: "We work as a fully remote, distributed team and partner with clients worldwide. We collaborate over your preferred tools — Slack, email, or weekly calls — with clear async updates so you always know where things stand.",
      },
    ],
  },
  {
    category: "Services",
    question: "How do you incorporate AI into products?",
    answer: [
      {
        type: "paragraph",
        text: "We integrate AI where it adds real value — intelligent chatbots, recommendation engines, automation, document processing, and custom AI agents — always grounded in your data and goals.",
      },
    ],
  },
  {
    category: "Services",
    question: "Which technologies and platforms do you specialize in?",
    answer: [
      {
        type: "paragraph",
        text: "Our core stack includes Next.js, React, Node.js, TypeScript, Python, and Flutter, plus cloud platforms like AWS, GCP, and Azure. We choose the right tools for your product rather than forcing a one-size-fits-all stack.",
      },
    ],
  },
  {
    category: "Services",
    question: "Can you redesign or improve an existing product?",
    answer: [
      {
        type: "paragraph",
        text: "Yes. We regularly take over and modernize existing codebases — improving performance, fixing technical debt, refreshing the UI/UX, and adding new features without a full rewrite where possible.",
      },
    ],
  },
  {
    category: "Process",
    question: "How long does a typical project take?",
    answer: [
      {
        type: "paragraph",
        text: "It depends on scope. A focused MVP can ship in as little as 80 hours of build time through our fixed-scope MVP sprint, while larger, full-featured platforms typically run 6–12 weeks or more. After our discovery phase we give you a clear, realistic timeline.",
      },
    ],
  },
  {
    category: "Process",
    question: "What exactly is the 80-hour MVP?",
    answer: [
      {
        type: "paragraph",
        text: "It is a fixed-scope sprint where we design, build, and deploy the single most important version of your product in 80 hours of dedicated build time — typically over about two weeks. We agree exactly what ships before we start, you get a real deployed product (not a prototype), and you own all the code. Larger ideas grow from there with a clear roadmap.",
      },
    ],
  },
  {
    category: "Process",
    question: "What does your design and development process look like?",
    answer: [
      {
        type: "paragraph",
        text: "We follow a proven six-step process: Discover, Design, Develop, Test, Launch, and Scale. You get full visibility at every stage with regular demos, so there are no surprises at delivery.",
      },
    ],
  },
  {
    category: "Pricing",
    question: "How much does a project cost?",
    answer: [
      {
        type: "paragraph",
        text: "Every project is scoped individually, so pricing depends on complexity, timeline, and team size. After a free consultation we provide a transparent, itemized estimate with no hidden fees.",
      },
    ],
  },
  {
    category: "Pricing",
    question: "Do you offer flexible engagement models?",
    answer: [
      {
        type: "paragraph",
        text: "Yes. You can engage us on a fixed-scope project basis, a monthly retainer, or by hiring dedicated developers and teams — whichever best fits your budget and how you like to work.",
      },
    ],
  },
  {
    category: "Support",
    question: "Do you provide support after launch?",
    answer: [
      {
        type: "paragraph",
        text: "Absolutely. We see launch as the beginning, not the end. We offer ongoing maintenance, monitoring, and continuous improvement so your product keeps getting better.",
      },
    ],
  },
  {
    category: "Support",
    question: "Who owns the code and intellectual property?",
    answer: [
      {
        type: "paragraph",
        text: "You do. On final payment, all source code, designs, and intellectual property are fully transferred to you. We can also sign an NDA before we start if you prefer.",
      },
    ],
  },
  {
    category: "Support",
    question: "Can I hire dedicated developers from CodeNax?",
    answer: [
      {
        type: "paragraph",
        text: "Yes. You can hire individual vetted developers or a full dedicated team that integrates directly into your workflow and processes.",
      },
    ],
  },
];

/** The six questions the home page shows, in its order. */
export const homeFaqs = [
  "What kind of projects does CodeNax take on?",
  "Where is your team based, and how do you collaborate?",
  "How do you incorporate AI into products?",
  "Which technologies and platforms do you specialize in?",
  "Can you redesign or improve an existing product?",
  "How long does a typical project take?",
].map((question) => faqs.find((faq) => faq.question === question)!);
