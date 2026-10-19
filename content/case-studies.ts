// Case studies, in the order /case-studies lists them.
// Generated from codenax.com (rendered pages, captured 2026-09-30). Text is verbatim.
// See CONTENT-GAPS.md for anything missing or awaiting confirmation.

import type { CaseStudy, Heading, NavLink, PageMeta } from "@/lib/types";

export const caseStudiesPage = {
  meta: {
    title: "Case Studies | CodeNax",
    description: "Real results from real projects — AI assistants, fixed-scope MVPs, and embedded engineering squads that moved the metrics that matter.",
  },
  heading: {
    eyebrow: "Our work",
    title: "Outcomes, not just",
    highlight: "output",
    description: "A selection of products we've shipped — and the measurable results they delivered for our clients. Click any project for the full story.",
  },
  cardCta: "Read the story",
  closing: {
    title: "Want results like these?",
    cta: { label: "Start your project", href: "/contact" },
  },
  detail: {
    backLink: { label: "All case studies", href: "/case-studies" },
    startCta: { label: "Start a project like this", href: "/contact" },
    labels: {
      client: "Client",
      industry: "Industry",
      engagement: "Engagement",
      techStack: "Tech Stack Used",
    },
    moreWork: { eyebrow: "More work", title: "Explore more case studies" },
  },
} satisfies {
  meta: PageMeta;
  heading: Heading;
  cardCta: string;
  closing: { title: string; cta: NavLink };
  detail: {
    backLink: NavLink;
    startCta: NavLink;
    labels: { client: string; industry: string; engagement: string; techStack: string };
    moreWork: Heading;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "curenax-digital-healthcare-platform",
    meta: {
      title: "CureNax Healthcare Platform Case Study | CodeNax",
      description: "CureNax case study: how CodeNax developed a digital healthcare platform that simplifies patient care, treatments, and healthcare services.",
    },
    client: "CureNax",
    industry: "Healthcare",
    engagement: "Custom Software Development",
    title: "CureNax: Revolutionizing Patient Care Through a Connected Digital Healthcare Platform",
    summary: "CureNax case study: how CodeNax developed a digital healthcare platform that simplifies patient care, treatments, and healthcare services.",
    clientQuote: "Working with CodeNax has completely changed how we manage patient care. What used to involve multiple processes can now be handled through one platform. From appointments and treatment plans to patient communication and medicine orders, everything is connected, making life easier for both our team and our patients. The platform has become an important part of how we deliver care every day.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "CureNax and CodeNax partnered to create a digital platform for connected healthcare that streamlines patient care from the initial consultation through to recovery. This solution combines appointment scheduling, medication purchases, communication between doctor and patient, lab services, payment processing, and tracking treatment progress, all within a user-friendly platform.",
          },
          {
            type: "paragraph",
            text: "CureNax is designed to increase patient engagement, streamline operations, and give patients easy access to services throughout the treatment process.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "heading",
            level: 3,
            text: "Create a seamless digital healthcare experience",
          },
          {
            type: "paragraph",
            text: "Client wanted to streamline the way patients and providers interacted throughout their treatment. These services, which ranged from booking appointments, managing treatment plans, ordering medicine, scheduling laboratory tests, tracking recovery, and ordering lab tests, required the patient to use different communication channels. It created friction and increased the administrative burden, making it difficult to provide a seamless patient experience.",
          },
          {
            type: "paragraph",
            text: "The organization needed to expand its digital health services, and a platform could be created that would bring all touchpoints together. It was important to provide healthcare to patients in a more convenient way, while also giving doctors and their teams tools that would allow them to communicate effectively, manage treatment, and track patient progress.",
          },
          {
            type: "paragraph",
            text: "The client was looking for a solution to improve their day-to-day operations and strengthen engagement with patients, promote treatment compliance, and provide a digital experience reflecting the high quality of the care they offer.",
          },
        ],
      },
      {
        heading: "The Solution",
        blocks: [
          { type: "heading", level: 3, text: "Centralizing The Patient Experience" },
          {
            type: "paragraph",
            text: "CodeNax developed CureNax to be a digital platform for healthcare that integrates all stages of patient care into a single ecosystem. The platform combines essential services such as appointments, medication purchases, lab services, patient communication, and treatment plans into a single ecosystem, eliminating the need for separate tools.",
          },
          { type: "paragraph", text: "This solution allows patients to:" },
          {
            type: "list",
            items: [
              "Register securely and quickly.",
              "Manage and book doctor's appointments.",
              "Examine and approve the treatment plan.",
              "Buy prescribed medications through the platform.",
              "Reminders for medication and appointments are sent to you automatically.",
              "Book laboratory tests to access diagnostic services",
              "Chat directly with your doctor through the app.",
              "Get real-time updates and notifications about your treatment.",
              "Upload recovery pictures to track treatment progress.",
              "Track the status of your order for medicine and health care.",
              "Secure online payment for healthcare, consultations, and medicines.",
            ],
          },
          {
            type: "paragraph",
            text: "CureNax is a platform that streamlines workflows for healthcare providers. It centralizes information about patients, manages treatments, improves communication, and lowers overhead.",
          },
          {
            type: "paragraph",
            text: "The solution is built with the idea of scalability, providing a solid digital foundation to support the client’s growth over the long term while also delivering an efficient and connected healthcare experience.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "CodeNax turned the vision of the client into an integrated digital platform for healthcare that connects patients, doctors, and services within one ecosystem. CureNax streamlines healthcare for patients and providers by centralizing appointment scheduling, management of treatment, communication, lab bookings, payment, and tracking progress.",
          },
          {
            type: "paragraph",
            text: "The healthcare teams are able to manage interactions with patients more efficiently by using a single platform. Patients also benefit from an easier and more engaging experience. Every stage of the journey for patients is now connected by a digital platform. From setting up appointments to receiving reminders about treatment, communicating with doctors to monitoring recovery.",
          },
          {
            type: "paragraph",
            text: "CureNax is designed with scalability in mind. It provides the client with an excellent digital foundation that will support their future growth, while providing a modern and patient-centric experience. This platform streamlines operations in healthcare, improves engagement with patients, and allows providers to provide more efficient and connected care.",
          },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: ["Stripe — Payments", "Firebase — Notifications", "Socket.io — Chat"],
      },
    ],
  },
  {
    slug: "prepabac-tchad-learning-app",
    meta: {
      title: "PrépaBac Tchad Case Study | Digital Learning Platform | CodeNax",
      description: "CodeNax developed PrépaBac Tchad, a digital learning platform that makes exam preparation more accessible through online courses and voucher-based access.",
    },
    client: "PrépaBac Tchad",
    industry: "Education & E-Learning",
    engagement: "Mobile App Development",
    title: "PrépaBac Tchad: Simplifying Digital Exam Preparation",
    summary: "CodeNax developed PrépaBac Tchad, a digital learning platform that makes exam preparation more accessible through online courses and voucher-based access.",
    clientQuote: "Our goal was to make quality exam preparation more accessible while providing a practical way to deliver premium educational content. CodeNax developed a platform that aligned with our vision by combining online learning, voucher-based course access, and centralized content management into one solution. The result is a scalable platform that supports both our students and our long-term growth.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "PrépaBac Tchad, a digital platform for learning, is designed to prepare high school students for the national exams through online, structured courses, practice tests, and study materials. CodeNax created a mobile app and a central administration portal.",
          },
          {
            type: "paragraph",
            text: "We introduced a voucher system for course access that allows secure content delivery, while also supporting the business model of their client. The platform makes exam preparation easier while also simplifying the content management and administration for administrators.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "PrépaBac Tchad wanted a reliable digital platform to provide high-quality exam preparation to all high school students in Chad. Students relied heavily on traditional coaching and printed materials, which made it hard to find consistent resources. This was especially true outside of major cities.",
          },
          {
            type: "paragraph",
            text: "The client required a practical way to provide premium educational content in a market that did not use online payment systems. Students were encouraged to use the platform without restriction, while paid courses could be accessed easily and securely through a local solution.",
          },
          {
            type: "paragraph",
            text: "The client was concerned that if the platform expanded, it would become increasingly difficult to manage educational content, student enrollments, and voucher distributions manually. The client needed a central system to simplify administration, support future growth, and improve the students' learning experience.",
          },
        ],
      },
      {
        heading: "The Solution",
        blocks: [
          {
            type: "paragraph",
            text: "To address these challenges, CodeNax developed PrépaBac Tchad, a digital learning platform that combines exam preparation, premium course delivery, and centralized content management into one solution.",
          },
          { type: "heading", level: 3, text: "Student Learning Platform" },
          {
            type: "list",
            items: [
              "Browse available courses and free introductory lessons.",
              "Access video lectures, study materials, exercises, quizzes, and exam preparation resources.",
              "Follow personalized learning plans and manage user profiles.",
              "Study anytime through a simple, mobile-friendly experience.",
            ],
          },
          { type: "heading", level: 3, text: "Voucher-Based Course Access" },
          {
            type: "list",
            items: [
              "Unlock premium courses using unique voucher codes.",
              "Eliminate dependence on online payment systems.",
              "Provide secure and controlled access to paid educational content.",
              "Support a business model tailored to local purchasing habits.",
            ],
          },
          { type: "heading", level: 3, text: "Centralized Administration" },
          {
            type: "list",
            items: [
              "Create and organize courses from a single dashboard.",
              "Upload and manage educational content.",
              "Generate and manage voucher codes.",
              "Monitor student activity and platform usage.",
            ],
          },
          { type: "heading", level: 3, text: "Built for Growth" },
          {
            type: "list",
            items: [
              "Simplify day-to-day platform management.",
              "Reduce manual administrative tasks.",
              "Support an expanding course catalog and growing student base.",
              "Provide a scalable foundation for future growth.",
            ],
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "PrépaBac Tchad has transformed the exam preparation experience into one that is more convenient for Chadian students. Students can prepare for exams at their own pace and access all the resources they need, including study materials and assessments.",
          },
          {
            type: "paragraph",
            text: "This model of voucher-based payment gave clients a way to provide premium content while avoiding the need for online payments. The client could maintain control over paid courses while aligning with the local buying habits.",
          },
          {
            type: "paragraph",
            text: "A centralized admin panel simplified platform management, combining course publishing, voucher administration, and student administration in a single system. The client can expand their educational offerings with fewer manual tasks and a more scalable platform.",
          },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      {
        group: "Cloud & Hosting",
        items: ["Vercel — Admin Portal", "AWS — Cloud & Media Storage"],
      },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: ["Firebase — Push Notifications", "CloudFront — Video Streaming"],
      },
    ],
  },
  {
    slug: "fintech-solution-for-smarter-invoicing",
    meta: {
      title: "Fintech Solution for Smarter Invoicing | CodeNax",
      description: "CodeNax case study of a fintech invoice management platform that simplifies invoicing, payment tracking, multi-currency billing, and financial workflows.",
    },
    client: "Fintech Client (TBD)",
    industry: "Fintech",
    engagement: "Custom Software Development",
    title: "Fintech Solution for Smarter Invoicing",
    summary: "CodeNax case study of a fintech invoice management platform that simplifies invoicing, payment tracking, multi-currency billing, and financial workflows.",
    clientQuote: "The platform has transformed the way our users manage billing. It's easy to use, reliable, and brings the entire invoicing workflow into one place.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "The client partnered with CodeNax to build a fintech platform to eliminate common billing problems faced by small businesses, freelancers, and agencies. Users had to keep moving between spreadsheets, currency rate converters, and other tools to generate invoices and keep records.",
          },
          {
            type: "paragraph",
            text: "They needed a platform that could track payments, automate financial calculations, and manage client information in a single place. Our solution was designed to be user-friendly and secure. It also gave businesses better visibility of their payment status.",
          },
        ],
      },
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The client wanted an invoice platform that could do more than just generate bills — one that makes the whole process streamlined. They wanted to build a tool that could help small business owners, freelancers, and agencies manage the billing process all in a single platform centered on simplicity and ease.",
          },
          {
            type: "paragraph",
            text: "Many users still created invoices by hand using generic templates or spreadsheets. Multiple tools were required to manage taxes, apply discounts, track payments, and bill international clients. The businesses had no visibility of whether or not invoices were viewed, paid, or delivered. This made payment tracking difficult and time-consuming.",
          },
          {
            type: "paragraph",
            text: "It was important to simplify invoicing and give businesses greater control of their cash flow, without adding complexity.",
          },
        ],
      },
      {
        heading: "The Solution",
        blocks: [
          {
            type: "paragraph",
            text: "Our fintech platform for invoice management streamlined and standardized the entire billing process, making invoicing more efficient, accurate, and easier to handle.",
          },
          { type: "heading", level: 3, text: "Invoice & Estimate Creation" },
          {
            type: "paragraph",
            text: "Create customized invoices with just a couple of clicks.",
          },
          { type: "heading", level: 3, text: "Automated Financial Calculations" },
          {
            type: "paragraph",
            text: "Calculate taxes, discounts, and extra charges automatically to reduce manual work and eliminate human errors.",
          },
          { type: "heading", level: 3, text: "Centralized Customer Management" },
          {
            type: "paragraph",
            text: "Store and manage all customer information in one location for quicker invoice generation and improved record-keeping.",
          },
          { type: "heading", level: 3, text: "Multi-Currency Support" },
          {
            type: "paragraph",
            text: "Bill international clients using multiple currencies, without manual conversions.",
          },
          { type: "heading", level: 3, text: "Invoice Status Tracking" },
          {
            type: "paragraph",
            text: "Monitor each invoice, from draft through to payment, with live updates.",
          },
          { type: "heading", level: 3, text: "Flexible Payment Terms" },
          {
            type: "paragraph",
            text: "Define payment dates and conditions for different agreements with clients.",
          },
          { type: "heading", level: 3, text: "Estimate-to-Invoice Conversion" },
          {
            type: "paragraph",
            text: "Reduce duplication of work and save time by converting approved estimates into bills without re-entering information.",
          },
          { type: "heading", level: 3, text: "PDF Export & Email Delivery" },
          {
            type: "paragraph",
            text: "Create professional PDF invoices and email them to clients from within the platform.",
          },
          {
            type: "paragraph",
            text: "The features of this platform combined to simplify financial workflows and reduce administrative work, while giving businesses greater visibility over their billing and payments processes.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "The finished product gave the client a modern invoicing solution that combined professional billing with practical financial management features.",
          },
          {
            type: "paragraph",
            text: "By reducing manual tasks and bringing the entire invoicing process into one platform, businesses could spend less time on administration and more time serving their customers. The addition of payment tracking, automated calculations, and multi-currency support made the platform suitable for both local and international businesses.",
          },
          {
            type: "paragraph",
            text: "Most importantly, the client achieved their goal of launching a product that felt intuitive for everyday users while providing the financial capabilities expected from a modern invoicing platform.",
          },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: [
          "PDF Generation — Invoices",
          "Exchange Rate API — Multi-Currency",
          "SendGrid — Email Delivery",
        ],
      },
    ],
  },
  {
    slug: "buzup-networking-platform",
    meta: {
      title: "BuzUp Case Study | Professional Networking Platform",
      description: "CodeNax case study: BuzUp, a cross-platform digital business card and networking platform with lead management, CRM integration, and team administration.",
    },
    client: "BuzUp",
    industry: "Professional Networking",
    engagement: "Custom Software Development",
    title: "BuzUp: Modernizing Professional Networking",
    summary: "CodeNax case study: BuzUp, a cross-platform digital business card and networking platform with lead management, CRM integration, and team administration.",
    clientQuote: "We wanted to create a platform that made networking easier and more convenient for individuals as well as businesses. The team delivered an intuitive solution that is reliable and easy to scale. Every feature, from digital business cards to team management and lead management, was designed with business requirements in mind. We now have a solid foundation on which to build the platform in the future.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "We developed BuzUp, a professional network and digital business card platform for web, Android, and iOS. It allows professionals to replace paper cards with digital profiles that can be instantly shared using QR codes, NFC links, or email signatures.",
          },
          {
            type: "paragraph",
            text: "The platform also features lead management, integration with CRM, and central team management to increase efficiency and revenue.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The client was looking for a platform to help manage professional relationships and solve the limitations related to the use of business cards.",
          },
          {
            type: "paragraph",
            text: "Sales teams were unable to easily organize new contacts after events or meetings because paper business cards would be lost. Contact details also became outdated. As the business grew, it became a challenge to manage employee profiles while maintaining consistent branding and contact details across the organization.",
          },
          {
            type: "paragraph",
            text: "The challenge was creating a platform that allowed professionals to instantly share their information while also giving businesses tools to manage contacts, capture leads, and maintain updated profiles across multiple devices.",
          },
        ],
      },
      {
        heading: "Our Solution",
        blocks: [
          {
            type: "paragraph",
            text: "Our platform combines sharing professional profiles with managing consistent business relationships.",
          },
          { type: "heading", level: 3, text: "Digital Business Card" },
          {
            type: "paragraph",
            text: "Users can easily create personalised digital business cards and share them via QR codes, NFC, or direct links. Updates to profiles are immediately reflected without having to print new business cards.",
          },
          { type: "heading", level: 3, text: "Lead Capture & Contact Management" },
          {
            type: "paragraph",
            text: "We built a central lead management system to simplify networking. It automatically saves new contacts and makes it easy for users to organize their connections, with a system where users can sort warm leads and pursue them across the organisation. This bridges the gap between sales, marketing, and operations teams.",
          },
          { type: "heading", level: 3, text: "Centralized Team Management" },
          {
            type: "paragraph",
            text: "We developed an administrative portal for organizations that allows them to update and manage their employee profiles in one location, maintaining a consistent brand and accurate information throughout the organization.",
          },
          { type: "heading", level: 3, text: "Cross-Platform Experience" },
          {
            type: "paragraph",
            text: "A shared backend was used to build the solution for web, Android, and iOS, which allows users to manage and access their profiles on any device to streamline the workflow.",
          },
          { type: "heading", level: 3, text: "CRM Integration & Security" },
          {
            type: "paragraph",
            text: "The platform was integrated with the existing workflows of the business while incorporating secure authentication and protection measures for both individuals and enterprises.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "The client received a digital platform for networking that was scalable and simplified the way professionals could connect with each other and increase the revenue of the business.",
          },
          {
            type: "paragraph",
            text: "Using our platform, users can exchange their contact information instantly, maintain business relationships efficiently, and update professional details without having to rely on printed cards.",
          },
          {
            type: "paragraph",
            text: "The centralized management of profiles, the improved consistency of brands, and the streamlined management and tracking of leads are helping businesses to grow with ease.",
          },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: [
          "CRM Integrations — HubSpot & Salesforce",
          "QR & NFC — Instant Sharing",
          "Firebase — Push Notifications",
        ],
      },
    ],
  },
  {
    slug: "educator-hub-global-online-learning-platform",
    meta: {
      title: "Educator Hub: Building a Global Online Learning Platform | CodeNax",
      description: "CodeNax built Educator Hub, a global education marketplace connecting students and verified educators through web and mobile platforms.",
    },
    client: "Educator Hub",
    industry: "Education & E-Learning",
    engagement: "Custom Software Development",
    title: "Educator Hub: Global Online Learning Platform",
    summary: "CodeNax built Educator Hub, a global education marketplace connecting students and verified educators through web and mobile platforms.",
    clientQuote: "We wanted to create a platform that made online learning easy for students as well as educators. CodeNax delivered a solution that brought everything in one place. The experience is intuitive and simple, from finding the right teacher to managing classes and payments. Since launch, the platform has expanded to 120+ countries, with educator registrations increasing by 45% and student enrollments growing by 160%.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "The Educator Hub platform was designed to make it easier for students and teachers to connect online. It combines lesson booking, communication with educators, payments, and educator discovery into one platform, eliminating the need to use multiple tools.",
          },
          {
            type: "paragraph",
            text: "It is available on the web, Android, and iOS and supports both educators and students in more than 120 countries.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The client was aware of several limitations in the online education market.",
          },
          {
            type: "paragraph",
            text: "Most tutoring platforms focus on connecting tutors with students, but users are left to navigate between multiple third-party applications for scheduling, communication, and sharing study material like files and lectures. This fragmented approach created friction between students and teachers, resulting in confusion and loss of valuable time.",
          },
          {
            type: "paragraph",
            text: "The client was looking to solve a number of industry-wide problems:",
          },
          {
            type: "list",
            items: [
              "Students had difficulty finding educators who fit their needs based on language, curriculum, country, and budget.",
              "Many platforms lacked the proper verification of educators, which reduced trust.",
              "Multiple applications were needed to manage communication, class scheduling, and administration.",
              "It is difficult for international students to find educators who are familiar with their educational systems.",
              "Teachers had few opportunities to establish a global professional presence and to attract students outside their localities.",
              "No centralized platform managed the entire education journey, from discovery to successful outcomes.",
            ],
          },
          {
            type: "paragraph",
            text: "The vision was to build a platform that would allow students to find the perfect educator in any part of the world, while allowing educators the opportunity to expand their business internationally.",
          },
        ],
      },
      {
        heading: "Our Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We engineered Educator Hub as an end-to-end education ecosystem rather than a simple tutor listing platform.",
          },
          { type: "heading", level: 3, text: "Global Educator Marketplace" },
          {
            type: "paragraph",
            text: "Students can discover verified educators from around the world using intelligent search filters based on:",
          },
          {
            type: "list",
            items: [
              "Subject",
              "Curriculum",
              "Education system",
              "Language",
              "Country",
              "Budget",
              "Availability",
              "Learning preferences",
            ],
          },
          {
            type: "paragraph",
            text: "This enables highly personalized educator matching instead of generic tutor searches.",
          },
          { type: "heading", level: 3, text: "Verified Professional Profiles" },
          {
            type: "paragraph",
            text: "Every educator has a structured professional profile showcasing qualifications, expertise, teaching experience, and specializations, helping students make informed decisions with confidence.",
          },
          { type: "heading", level: 3, text: "Complete Learning Workflow" },
          {
            type: "paragraph",
            text: "Instead of forcing users to switch between different applications, we integrated the complete learning experience into one platform. The platform hosts:",
          },
          {
            type: "list",
            items: [
              "Demo class requests",
              "Direct messaging",
              "Calendar management",
              "Booking system",
              "Secure payments",
              "Live online classes",
              "Notifications",
              "Feedback system",
              "Session management",
            ],
          },
          { type: "paragraph", text: "Everything happens inside a single ecosystem." },
          { type: "heading", level: 3, text: "Cross-Platform Experience" },
          {
            type: "paragraph",
            text: "To make the platform user-friendly and easily accessible, we built:",
          },
          {
            type: "list",
            items: [
              "Responsive web platform",
              "Android application",
              "iOS application",
              "Administrative dashboard",
              "Scalable backend APIs",
            ],
          },
          {
            type: "paragraph",
            text: "This ensures students and educators enjoy a consistent experience regardless of their device.",
          },
          { type: "heading", level: 3, text: "Built for Global Scale" },
          {
            type: "paragraph",
            text: "The architecture was designed to support international growth, multiple education systems, different time zones, various languages, and thousands of concurrent users without compromising performance.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Most tutoring marketplaces only help students find a tutor.",
          },
          {
            type: "paragraph",
            text: "Educator Hub does not end on discovery alone, which is the starting point; instead, it is an entire operating system.",
          },
          { type: "heading", level: 3, text: "Global instead of Local" },
          {
            type: "paragraph",
            text: "This platform allows educators to connect with students in more than 120 different countries, rather than limiting them to their local market.",
          },
          { type: "heading", level: 3, text: "Personalised Matching" },
          {
            type: "paragraph",
            text: "Students can search for educators not only by subject, but also by language, curriculum, education system and location. They can even filter by budget.",
          },
          { type: "heading", level: 3, text: "End-to-End Learning Platform" },
          {
            type: "paragraph",
            text: "Educator Hub, unlike many of its competitors, which rely on Zoom, calendars, chat apps, and external payment systems separately, centralizes discovery and communication, bookings, live learning, and management in one platform seamlessly.",
          },
          { type: "heading", level: 3, text: "Verified Trust Ecosystem" },
          {
            type: "paragraph",
            text: "Verifying educators helps build trust between students and teachers, improving the credibility of platforms and learning quality.",
          },
          { type: "heading", level: 3, text: "Future-Ready Architecture" },
          {
            type: "paragraph",
            text: "We have developed the platform with a scalable codebase so it can be expanded to include new academic services and learning models in the future.",
          },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: ["Stripe — Payments", "WebRTC — Live Classes", "Firebase — Push Notifications"],
      },
    ],
  },
  {
    slug: "ciwac-unified-business-platform",
    meta: {
      title: "Ciwac Case Study | Building a Unified Business Management Platform",
      description: "CodeNax built Ciwac, a unified business management platform that connects finance, inventory, invoicing, sales, vendor, and employee operations, helping reduce human errors by 40%.",
    },
    client: "Ciwac",
    industry: "Business Operations",
    engagement: "Custom Software Development",
    title: "Ciwac: A Unified Business Platform That Cuts Administrative Work by 60%",
    summary: "CodeNax built Ciwac, a unified business management platform that connects finance, inventory, invoicing, sales, vendor, and employee operations, helping reduce human errors by 40%.",
    clientQuote: "Ciwac transformed the way we manage our business. Instead of juggling multiple systems and spreadsheets, our entire workflow is now connected in one place. Invoice management, inventory tracking, employee records, and financial operations have become much easier to manage. The platform has saved us countless hours every week and given us much better control over our business.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "Ciwac is a platform for business operations that brings together the most important aspects of running an enterprise. Ciwac integrates all workflows, from customer and vendor management through to invoicing, sales and purchases, financial management and employee management.",
          },
          {
            type: "paragraph",
            text: "We wanted to eliminate fragmented software and manual processes in favor of a connected, collaborative way of working. Ciwac's ability to keep business data and operational processes in one place gives the team better visibility and simplifies tasks. It also makes it easy for them to grow their business.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "The client wanted to fix a problem that is common for growing companies: data from operations was spread across different platforms, including spreadsheets, paper documents, and various software platforms. The client struggled with keeping customer and vendor data synchronized. Invoices were manually shared, payments were not followed up on, and the financial records required a lot of manual work to reconcile.",
          },
          {
            type: "paragraph",
            text: "Separately managing inventory, employee attendance, payroll, and business documents also caused delays and increased human error risk. These disconnected workflows were difficult to manage as the company expanded and limited productivity.",
          },
          {
            type: "paragraph",
            text: "The client needed an easy-to-use platform to connect all departments and automate business processes.",
          },
        ],
      },
      {
        heading: "Our Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We developed Ciwac as a centralized business management platform, bringing day-to-day operations into one connected system.",
          },
          { type: "heading", level: 3, text: "Connected Customer & Vendor Ledgers" },
          {
            type: "paragraph",
            text: "Businesses can maintain customer and vendor transaction records in one place, with connected ledgers providing a clearer view of financial activity.",
          },
          { type: "heading", level: 3, text: "Invoice Sharing & Payment Reminders" },
          {
            type: "paragraph",
            text: "Users can share invoices directly with customers and send reminders for outstanding payments, reducing the need for manual follow-ups.",
          },
          { type: "heading", level: 3, text: "Inventory Management" },
          {
            type: "paragraph",
            text: "Businesses can monitor stock, purchases, and sales from the same platform, helping keep inventory records up to date.",
          },
          { type: "heading", level: 3, text: "Sales & Purchase Management" },
          {
            type: "paragraph",
            text: "Sales and purchase activities are recorded within the platform, making it easier to track transactions and maintain organized business records.",
          },
          { type: "heading", level: 3, text: "Cash & Bank Account Management" },
          {
            type: "paragraph",
            text: "Financial activities can be tracked alongside business transactions, giving owners better visibility into cash and bank movements.",
          },
          { type: "heading", level: 3, text: "Employee & Attendance Management" },
          {
            type: "paragraph",
            text: "Employee records and attendance can be managed centrally instead of relying on separate spreadsheets or manual records.",
          },
          { type: "heading", level: 3, text: "Payroll Management" },
          {
            type: "paragraph",
            text: "Payroll processes are connected with employee records, helping businesses manage salary-related information more efficiently.",
          },
          { type: "heading", level: 3, text: "Document Management" },
          {
            type: "paragraph",
            text: "Important business documents can be organized and accessed through the same platform, reducing dependency on scattered files and records.",
          },
          { type: "heading", level: 3, text: "Real-Time Business Collaboration" },
          {
            type: "paragraph",
            text: "By connecting these modules, Ciwac gives businesses a single source of information and makes it easier for teams to coordinate their daily operations.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Ciwac brought the client's day-to-day business operations into a single connected platform, reducing the need to switch between separate tools and manually maintain records.",
          },
          { type: "heading", level: 3, text: "Core operations in one platform" },
          {
            type: "paragraph",
            text: "Customers and vendors, billing, purchasing, accounting, documents, employee payroll and management are done in a single system.",
          },
          { type: "heading", level: 3, text: "Improved invoice management" },
          {
            type: "paragraph",
            text: "Teams can send invoices and payment reminders through the platform, making it easier to follow up on outstanding payments.",
          },
          { type: "heading", level: 3, text: "Improved financial visibility" },
          {
            type: "paragraph",
            text: "Connected accounts, ledgers and cash registers, as well as bank records and purchase and sales data, give the client a better view into their financial activities.",
          },
          { type: "heading", level: 3, text: "Accurate inventory records" },
          {
            type: "paragraph",
            text: "Inventory can be linked to sales and purchases, which reduces the need for manual updates.",
          },
          { type: "heading", level: 3, text: "Simplified employee management" },
          {
            type: "paragraph",
            text: "Employee information, attendance, payroll, and documents are all managed in a central workspace.",
          },
          { type: "heading", level: 3, text: "Less repetitive work" },
          {
            type: "paragraph",
            text: "Connected workflows reduce the duplication of data and errors associated with maintaining information in different systems.",
          },
          { type: "heading", level: 3, text: "Improved team coordination" },
          {
            type: "paragraph",
            text: "Instead of using separate spreadsheets and disconnected records, employees can use the most up-to-date business information.",
          },
          { type: "heading", level: 3, text: "Quicker decision-making" },
          {
            type: "paragraph",
            text: "Centralized data on operations gives managers a better picture of the state of their business.",
          },
          { type: "paragraph", text: "60%" },
          { type: "paragraph", text: "Less administrative work" },
          { type: "paragraph", text: "40%" },
          { type: "paragraph", text: "Fewer errors" },
          { type: "paragraph", text: "10+" },
          { type: "paragraph", text: "Core business modules" },
          { type: "paragraph", text: "8+" },
          { type: "paragraph", text: "Connected operational workflows" },
          { type: "paragraph", text: "Real-time" },
          { type: "paragraph", text: "Customer & vendor collaboration" },
          { type: "paragraph", text: "24/7" },
          { type: "paragraph", text: "Access to business records" },
          { type: "paragraph", text: "Centralized management platform" },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: ["PDF Generation — Invoices", "SendGrid — Email & Payment Reminders"],
      },
    ],
  },
  {
    slug: "asset-hub-saas",
    meta: {
      title: "Asset Hub Case Study | Centralized Asset Management SaaS",
      description: "CodeNax built Asset Hub to centralize asset tracking, maintenance, assignments, and reporting while reducing manual asset-management work by 35%.",
    },
    client: "Asset Hub",
    industry: "Asset Management",
    engagement: "Custom Software Development",
    title: "Asset Hub: Reducing Manual Asset Management by 35%",
    summary: "CodeNax built Asset Hub to centralize asset tracking, maintenance, assignments, and reporting while reducing manual asset-management work by 35%.",
    clientQuote: "Before Asset Hub, keeping track of our assets across different locations was difficult. A lot of information was spread across different files and conversations, so getting a clear picture wasn't always easy. Having everything in one place has made a big difference. We can see where assets are, who they're assigned to, and keep track of maintenance without chasing information from different teams.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "We built Asset Hub for businesses that manage a large number of physical assets across different locations but don't always have a clear picture of where those assets are, who is using them, or when they were last maintained.",
          },
          {
            type: "paragraph",
            text: "The platform brings asset records, assignments, locations, maintenance, service history, and reporting into one place, giving businesses 100% digital visibility of their registered assets while reducing manual asset-management work by 35%. With a web dashboard and mobile apps for Android and iOS, teams can update asset information while they're on-site, while managers get a central view of everything across their organization.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Managing physical assets becomes surprisingly difficult as a business grows. An air conditioner may have been serviced six months ago, a piece of kitchen equipment may have been moved to another branch, or a company vehicle may have been assigned to a different employee — but that information is often sitting in spreadsheets, messages, or someone's memory.",
          },
          {
            type: "paragraph",
            text: "Our client needed a better way to answer simple but important questions:",
          },
          {
            type: "list",
            items: [
              "Where is each asset?",
              "Who is responsible for it?",
              "When was it last serviced?",
              "When is its next maintenance due?",
              "What has been spent on maintaining it?",
              "Has the asset been moved or reassigned?",
            ],
          },
          {
            type: "paragraph",
            text: "Without a centralized system, keeping this information updated across multiple locations was time-consuming and made it easy for important maintenance and asset records to fall through the cracks.",
          },
        ],
      },
      {
        heading: "The Solution",
        blocks: [
          {
            type: "paragraph",
            text: "We developed Asset Hub, an asset management platform that connects the management team with those who manage assets in the field.",
          },
          { type: "heading", level: 3, text: "Centralized Asset Records" },
          {
            type: "paragraph",
            text: "Every asset has a record that contains its location, its assignment, its status, and its history.",
          },
          { type: "heading", level: 3, text: "Asset Assignment & Transfers" },
          {
            type: "paragraph",
            text: "Managers are able to see which employees or departments have responsibility for an asset, and can record the transfers between them.",
          },
          { type: "heading", level: 3, text: "Maintenance Tracking" },
          {
            type: "paragraph",
            text: "Service dates, records of maintenance, cost, and future requirements are all tracked.",
          },
          { type: "heading", level: 3, text: "Routine Maintenance Reminders" },
          {
            type: "paragraph",
            text: "Scheduled reminders help teams stay on top of equipment servicing instead of waiting until something fails.",
          },
          { type: "heading", level: 3, text: "Mobile Apps for Field Teams" },
          {
            type: "paragraph",
            text: "Employees are able to update records, perform maintenance tasks, and send information straight from their Android or iOS device.",
          },
          { type: "heading", level: 3, text: "Centralized Management Dashboard" },
          {
            type: "paragraph",
            text: "The dashboard allows managers to see assets in all locations at once, without having to rely on spreadsheets and manual reports.",
          },
          { type: "heading", level: 3, text: "Reports & Visibility" },
          {
            type: "paragraph",
            text: "Operational data can be reviewed to better understand asset usage, maintenance, and status.",
          },
          {
            type: "paragraph",
            text: "The result was a centrally managed system that connected those managing assets to the ones responsible for their maintenance, and kept management in the loop.",
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "Asset Hub gave the client a much clearer picture of their physical assets and how they were being managed.",
          },
          {
            type: "paragraph",
            text: "Teams no longer had to search through different records to find an asset's location or maintenance history. Managers could quickly check assignments, review service records, and keep track of upcoming maintenance from one place.",
          },
          {
            type: "paragraph",
            text: "The mobile apps also made the system practical for teams working across different locations. Instead of updating records later from a desktop, employees could record changes and maintenance activities as they happened.",
          },
          {
            type: "paragraph",
            text: "Most importantly, the client moved from reactive asset management to a more organized, preventive approach — giving them better control over their assets, reducing administrative work, and making it easier to manage operations as the business grows.",
          },
          { type: "paragraph", text: "62%" },
          { type: "paragraph", text: "Less time spent on asset administration" },
          { type: "paragraph", text: "38%" },
          { type: "paragraph", text: "Fewer overdue maintenance tasks" },
          { type: "paragraph", text: "75%" },
          { type: "paragraph", text: "Faster asset information retrieval" },
          { type: "paragraph", text: "1,500+" },
          { type: "paragraph", text: "Assets managed across 25 locations" },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: ["QR Code Scanning — Asset Tagging", "Firebase — Push Notifications"],
      },
    ],
  },
  {
    slug: "alkebabish-food-ordering-app",
    meta: {
      title: "ALKEBABISH Case Study | Food Ordering App Development",
      description: "CodeNax built ALKEBABISH's food ordering app, enabling online ordering, payments, meal customization, delivery tracking, and repeat orders.",
    },
    client: "Alkebabish",
    industry: "Food & Delivery",
    engagement: "Mobile App Development",
    title: "ALKEBABISH: 43% of Orders Now Come Through the App",
    summary: "CodeNax built ALKEBABISH's food ordering app, enabling online ordering, payments, meal customization, delivery tracking, and repeat orders.",
    clientQuote: "The app has made a real difference in how we handle orders. Today, 43% of our orders come through the app, which has taken a lot of pressure off our traditional ordering process. Customers can also check their order status directly, and calls asking about order tracking have dropped by 60%. It has made ordering easier for our customers and given our team more time to focus on preparing and delivering orders.",
    sections: [
      {
        heading: "Overview",
        blocks: [
          {
            type: "paragraph",
            text: "The ALKEBABISH App was built to provide the restaurant with a convenient, direct way to digitally serve their customers. This app allows customers to manage their entire ordering process in one location. They can browse menus, create customized meals, make payments online, view order histories, track orders, and change delivery addresses when needed.",
          },
          {
            type: "paragraph",
            text: "Alkebabish's platform offers a structured alternative to the traditional order process, while also creating a digital channel that allows for direct customer engagement.",
          },
        ],
      },
      {
        heading: "The Challenge",
        blocks: [
          {
            type: "paragraph",
            text: "Alkebabish wanted its customers to order food more easily, but traditional ordering processes were causing friction between customers and staff.",
          },
          {
            type: "paragraph",
            text: "Many customers had to call to order, inquire about the menu, express their preferences for a meal, or to check on the delivery status. Customers who were waiting on an order had to call the restaurant directly if they wanted information about how it was progressing. These calls can be difficult to handle for the staff during busy times, when they are also preparing orders and processing them.",
          },
          {
            type: "paragraph",
            text: "Also, the restaurant had to manually handle all order details. Staff needed to be attentive when taking orders by phone, as they had to record information about the customer, confirm their meal choice, and provide delivery details. This process became more complex as the number of orders increased. It also created opportunities for errors, delays, and miscommunications.",
          },
          {
            type: "paragraph",
            text: "Alkebabish also lacked a dedicated digital channel to present their menus, take orders, and keep in touch with their customers. The customers had to use traditional methods of ordering instead of having an easy way to go back to the restaurant to place another order.",
          },
          {
            type: "paragraph",
            text: "The client wanted to improve the experience of the customers by integrating a digital ordering system that was easy for them and organized. The goal wasn't to simply put the menu in an app — the aim was to streamline the ordering process, from discovering and personalizing a menu to tracking delivery and placing another order.",
          },
        ],
      },
      {
        heading: "The Solution",
        blocks: [
          { type: "heading", level: 3, text: "Designed Around How Customers Order" },
          {
            type: "paragraph",
            text: "The ALKEBABISH app was designed around how customers order their food. The app allows customers to:",
          },
          {
            type: "list",
            items: [
              "Choose their meal, personalize their order, and pay without calling the restaurant.",
              "Easily decide what to order, with the app showing all of their options and pricing.",
              "Customize their meal before checking out, eliminating the need to call in their preferences.",
              "Pay online directly from the order flow.",
              "Track their order's progress without having to call the restaurant.",
              "Store their delivery address and reuse it for subsequent orders.",
              "View past purchases and reorder favorite meals from their order history.",
            ],
          },
        ],
      },
      {
        heading: "The Outcome",
        blocks: [
          {
            type: "paragraph",
            text: "ALKEBABISH gave the restaurant an easy way to serve its clients digitally.",
          },
          {
            type: "paragraph",
            text: "Customers no longer have to rely on the traditional methods of ordering. They can browse menus, create meals, make payments online, update their address, and track their orders all from a single place.",
          },
          {
            type: "paragraph",
            text: "The digital ordering workflow is a structured method of receiving and managing customer orders. It reduces the need to communicate information manually and helps the restaurant build stronger relationships with their customers.",
          },
          { type: "paragraph", text: "43%" },
          { type: "paragraph", text: "Orders now come through the app" },
          { type: "paragraph", text: "28%" },
          { type: "paragraph", text: "Increase in repeat orders" },
          { type: "paragraph", text: "35%" },
          { type: "paragraph", text: "Fewer phone orders" },
          { type: "paragraph", text: "2,500+" },
          { type: "paragraph", text: "Customers served through the platform" },
        ],
      },
    ],
    techStack: [
      { group: "Frontend", items: ["Next.js", "TypeScript"] },
      { group: "Backend", items: ["Node.js (NestJS)", "REST APIs"] },
      { group: "Mobile", items: ["React Native"] },
      { group: "Database", items: ["PostgreSQL"] },
      { group: "Cloud & Hosting", items: ["Vercel — Web", "AWS — Cloud Infrastructure"] },
      { group: "CI/CD & DevOps", items: ["GitHub Actions — CI/CD", "Docker"] },
      {
        group: "Integrations",
        items: [
          "Stripe — Online Payments",
          "Firebase — Push Notifications",
          "Google Maps — Delivery Tracking",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
