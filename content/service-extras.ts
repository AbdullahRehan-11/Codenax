// Extra labels for each /services/[slug] page, captured from codenax.com on 2026-10-02:
// the hero label and buttons, the label pill above each section heading, and the icon the
// site shows beside each item (icon names are Lucide's). Text is verbatim. Generated.

import type { ServiceExtras } from "@/lib/types";

/** Label of the link the site puts on each service item. */
export const serviceItemCta = "Talk to us about this";

/** The kicker the site shows on the AI Development page's first item. */
export const serviceStartLabel = "Start here";

export const serviceExtras: Record<string, ServiceExtras> = {
  "ai-development": {
    "eyebrow": "AI Development",
    "ctas": [
      {
        "label": "Start your AI project",
        "href": "/contact"
      },
      {
        "label": "Get an estimate",
        "href": "/estimate"
      }
    ],
    "sections": {
      "Our AI Development Services": {
        "pill": "What we offer",
        "icons": {
          "AI Development Consultation": "lightbulb",
          "AIOps": "activity",
          "AI Assistant & Chatbot Development": "messages-square",
          "AI Product Development": "rocket",
          "AI as a Service": "cloud",
          "Generative AI": "sparkles",
          "AI Integration": "plug",
          "AI Voice Agents": "mic",
          "AI Copilot Solutions": "users"
        }
      },
      "Our Artificial Intelligence Technology Solutions": {
        "pill": "Capabilities",
        "icons": {
          "Machine Learning": "brain",
          "Generative AI": "sparkles",
          "Predictive Analysis": "trending-up",
          "Computer Vision": "eye",
          "Deep Learning": "network",
          "Audio Processing": "volume2",
          "NLP": "bot"
        }
      },
      "AI Software Development Workflow": {
        "pill": "How we work"
      },
      "Our AI Software Development Services Tech Stack": {
        "pill": "Tooling",
        "icons": {
          "Data Storage": "database",
          "Data Annotation": "tags",
          "Data Preprocessing": "funnel",
          "Algorithm Development": "file-code-corner",
          "Machine Learning Models": "brain",
          "Deep Learning Models": "network",
          "Generative AI": "sparkles",
          "Model Training and Evaluation": "gauge",
          "Deployment and Integration": "rocket",
          "Monitoring and Logging": "activity",
          "MLOps and Workflow Orchestration": "workflow"
        }
      },
      "Top-of-the-Line AI Models We Deploy for Maximum Impact": {
        "pill": "Models"
      },
      "Mitigating Problems in Your AI Transformation": {
        "pill": "AI as a layer"
      },
      "AI Solutions Built to Revolutionise Your Industry": {
        "pill": "Industries",
        "icons": {
          "Healthcare": "stethoscope",
          "Education": "graduation-cap",
          "Banking": "landmark",
          "Real Estate": "building2",
          "Retail & E-commerce": "shopping-bag",
          "Logistics": "truck",
          "Travel": "plane",
          "Food & Delivery": "utensils"
        }
      }
    }
  },
  "web-development": {
    "eyebrow": "Web Development",
    "ctas": [
      {
        "label": "Start your web project",
        "href": "/contact"
      },
      {
        "label": "Get an estimate",
        "href": "/estimate"
      }
    ],
    "sections": {
      "Web Development Services Tailored to Your Needs": {
        "pill": "What we build",
        "icons": {
          "Web Applications": "code-xml",
          "Web Portals": "shield-check",
          "Websites": "globe",
          "E-commerce": "shopping-bag",
          "Web Applications for Analytics": "chart-column",
          "CMS Development": "file-text"
        }
      },
      "Our Comprehensive Web Development Process": {
        "pill": "How we work"
      },
      "Cost Analysis for Web Development Solutions": {
        "pill": "Investment"
      },
      "Web Development Optimized for Google and AI": {
        "pill": "Built to be found"
      },
      "Why Choose CodeNax as a Web Development Company": {
        "pill": "Why us",
        "icons": {
          "Agile Development": "refresh-cw",
          "We Never Miss a Deadline": "clock",
          "Cost Transparency": "wallet"
        }
      },
      "Industries We Serve": {
        "pill": "Industries",
        "icons": {
          "Healthcare": "stethoscope",
          "Education": "graduation-cap",
          "Finance & Business": "landmark",
          "Real Estate": "house",
          "Retail & E-commerce": "shopping-bag",
          "Logistics": "truck",
          "Travel & Tourism": "plane",
          "Food & Delivery": "utensils"
        }
      },
      "Our Tech Stack": {
        "pill": "Tooling",
        "icons": {
          "Front-end Programming": "monitor",
          "Back-end Programming": "server",
          "Platforms": "layers",
          "Databases & Storage": "database"
        }
      }
    }
  },
  "custom-mobile-app-development": {
    "eyebrow": "Mobile App Development",
    "ctas": [
      {
        "label": "Start your app project",
        "href": "/contact"
      },
      {
        "label": "Get an estimate",
        "href": "/estimate"
      }
    ],
    "sections": {
      "Custom Mobile App Development for iOS, Android & Cross-Platform": {
        "pill": "What we build",
        "icons": {
          "Android App Development": "smartphone",
          "iOS App Development": "panels-top-left",
          "Cross-Platform App Development": "layers",
          "Mobile App Modernization and Revamping": "refresh-cw"
        }
      },
      "Our Custom Mobile App Development Process": {
        "pill": "How we work"
      },
      "How We Integrate AI into Custom Mobile App Development Services": {
        "pill": "AI inside",
        "icons": {
          "Enhanced Security with Biometric Authentication": "fingerprint-pattern",
          "Contextual AI Search": "search",
          "In-App Chatbot Integration": "messages-square",
          "AI Personalization": "sparkles",
          "AI Predictive Analysis": "trending-up"
        }
      },
      "Custom Mobile App Development Cost": {
        "pill": "Investment"
      },
      "Why Clients Trust CodeNax as a Mobile App Development Partner": {
        "pill": "Why us",
        "icons": {
          "Business-Focused Development": "target",
          "Transparent & Clear Process": "eye",
          "Experienced Mobile Developers": "users",
          "Scalable Architecture": "layers",
          "Security Built-In": "shield-check",
          "Quality-First Development": "badge-check",
          "Long-Term Support & Optimization": "handshake",
          "End-to-End App Development": "workflow"
        }
      },
      "Industries We Develop Mobile Apps for and Use Cases": {
        "pill": "Industries",
        "icons": {
          "Medical Apps": "stethoscope",
          "Health & Fitness Apps": "activity",
          "Banking & Finance Apps": "landmark",
          "Insurance Apps": "shield-check",
          "Enterprise Apps": "building2",
          "Communication & Social Media Apps": "messages-square",
          "Supply Chain & Logistics Apps": "truck",
          "mCommerce Apps": "shopping-bag",
          "Manufacturing & Production Control Apps": "factory",
          "Travel, Navigation & Hospitality Apps": "plane",
          "Booking & Reservation Apps": "calendar-days",
          "Real Estate Apps": "house",
          "Nonprofit & Humanitarian Aid Apps": "heart",
          "Entertainment & Media Apps": "tv"
        }
      },
      "Features We Embed into Your Apps": {
        "pill": "Capabilities"
      },
      "Our Custom Mobile App Development Tech Stack for Success": {
        "pill": "Tooling",
        "icons": {
          "Mobile Development Languages": "file-code-corner",
          "Mobile Frameworks & SDKs": "smartphone",
          "Backend Technologies": "server",
          "Databases & Data Storage": "database",
          "Cloud & Platforms": "cloud",
          "APIs & Integrations": "plug",
          "Testing & QA": "flask-conical",
          "DevOps & CI/CD": "workflow",
          "Monitoring & Analytics": "activity",
          "AI & Machine Learning": "brain",
          "Low-Code & Rapid Development": "zap"
        }
      }
    }
  },
  "ui-ux-design-and-development": {
    "eyebrow": "UI/UX Design & Development",
    "ctas": [
      {
        "label": "Start your design project",
        "href": "/contact"
      },
      {
        "label": "See our work",
        "href": "/case-studies"
      }
    ],
    "sections": {
      "Our Approach to Creating Intuitive User Experiences": {
        "pill": "How We Engage",
        "icons": {
          "UX Strategy & Research": "search",
          "UX Audit & Optimization": "gauge",
          "Design Systems": "layers",
          "New Product Design": "pen-tool",
          "Product Redesign & Modernization": "refresh-cw",
          "Mobile App UX/UI": "smartphone",
          "AI-Powered UX/UI": "sparkles",
          "Enterprise & Complex Products": "building2"
        }
      },
      "UI/UX Challenges We Help You Solve": {
        "pill": "Challenges"
      },
      "How Poor UI/UX Impacts Your Business": {
        "pill": "The cost of bad design"
      },
      "Our End-to-End UI/UX Design Process": {
        "pill": "How we work"
      },
      "Why Choose CodeNax for UI/UX Design Services": {
        "pill": "Why us",
        "icons": {
          "Clear communication, no guesswork": "messages-square",
          "Designed for development": "code-xml",
          "Accessible design": "accessibility",
          "Design scales with your product": "trending-up",
          "Evidence-based decisions": "flask-conical",
          "Work in collaboration": "users",
          "Long-term collaboration": "handshake"
        }
      },
      "Our Tech Stack for UI/UX Services": {
        "pill": "Tooling",
        "icons": {
          "Programming Languages & Technologies": "file-code-corner",
          "Wireframing & Prototyping": "pen-tool",
          "Testing & Analytics": "activity",
          "Visual Design": "palette"
        }
      },
      "Industries We Serve in UI/UX Development and Benefits": {
        "pill": "Industries",
        "icons": {
          "Healthcare": "stethoscope",
          "Education": "graduation-cap",
          "Finance & Business": "landmark",
          "Real Estate": "house",
          "Retail & E-commerce": "shopping-bag",
          "Travel & Tourism": "plane",
          "Food & Delivery": "utensils"
        }
      }
    }
  },
  "staff-augmentation": {
    "eyebrow": "IT Staff Augmentation",
    "ctas": [
      {
        "label": "Hire a team",
        "href": "/contact"
      },
      {
        "label": "See how it works",
        "href": "#why-choose-staff-augmentation-services"
      }
    ],
    "sections": {
      "Why Choose Staff Augmentation Services": {
        "pill": "Why choose us"
      },
      "Our Working Models": {
        "pill": "Working models"
      },
      "Find the Right Talent for Every Tech Stack": {
        "pill": "Our expertise"
      },
      "How We Build High-Performing Teams": {
        "pill": "Our process"
      },
      "Why Choose Codenax as a Staff Augmentation Partner": {
        "pill": "Why us"
      },
      "Industries We've Served with IT Staff Augmentation": {
        "pill": "Industries"
      }
    }
  },
  "software-testing-and-qa": {
    "eyebrow": "Software Testing & QA",
    "ctas": [
      {
        "label": "Talk to our QA team",
        "href": "/contact"
      },
      {
        "label": "Get an estimate",
        "href": "/estimate"
      }
    ],
    "sections": {
      "Our End-to-End Software Testing and Quality Assurance Services": {
        "pill": "What we offer",
        "icons": {
          "QA Assessment & Consulting": "clipboard-list",
          "Manual Testing": "search",
          "Automated Testing": "bot",
          "Performance Testing": "gauge"
        }
      },
      "Why Invest in Professional Software Testing and QA Services?": {
        "pill": "The case for QA",
        "icons": {
          "Fewer Bugs in Production": "bug-off",
          "Faster and More Confident Releases": "badge-check",
          "Reduced Development Costs": "wallet"
        }
      },
      "Types of Software CodeNax Tests": {
        "pill": "What we test"
      },
      "Types of Quality Assurance Tests We Perform": {
        "pill": "Coverage",
        "icons": {
          "Functional & Product Testing": "flask-conical",
          "Performance & Reliability Testing": "gauge",
          "Security & Compliance Testing": "shield-check",
          "Usability & Accessibility Testing": "heart",
          "Compatibility & Device Testing": "smartphone"
        }
      },
      "Why Choose CodeNax as a Software Testing and QA Company": {
        "pill": "Why us",
        "icons": {
          "Professional QA Engineers": "users",
          "Coverage of All Testing Areas": "boxes",
          "Customized Testing Strategies": "clipboard-list",
          "Modern Testing & Automation": "sparkles",
          "Communication & Reporting": "messages-square",
          "Scalable QA for Your Product": "shield-check"
        }
      },
      "Our Comprehensive Software Testing and QA Process": {
        "pill": "How we work"
      },
      "Our Engagement Models": {
        "pill": "How we engage",
        "icons": {
          "QA Integrated Into Development": "users",
          "QA-as-a-Service": "bug-off"
        }
      },
      "Our Tech Stack for Software Testing and Quality Assurance": {
        "pill": "Tooling",
        "icons": {
          "Performance": "gauge",
          "Security": "shield-check",
          "Automation": "workflow",
          "Mobile": "smartphone",
          "CI/CD": "workflow",
          "Test Management": "tags",
          "Cross-Browser": "monitor",
          "API Testing": "plug",
          "Code Quality": "file-code-corner",
          "Monitoring": "activity"
        }
      },
      "Industries We Serve": {
        "pill": "Industries",
        "icons": {
          "Healthcare": "stethoscope",
          "Education": "graduation-cap",
          "Finance & Business": "landmark",
          "Real Estate": "house",
          "E-commerce": "shopping-bag",
          "Logistics": "truck",
          "Travel & Tourism": "plane",
          "Food & Delivery": "utensils"
        }
      }
    }
  },
  "branding-marketing": {
    "ctas": [
      {
        "label": "Start your project",
        "href": "/contact"
      },
      {
        "label": "All services",
        "href": "/services"
      }
    ],
    "sections": {
      "Everything you need, nothing you don't": {
        "pill": "What's included"
      },
      "Identity that means something": {
        "icons": {
          "Logo & visual identity": "palette",
          "Brand guidelines": "pen-tool",
          "Positioning & messaging": "lightbulb"
        }
      },
      "Marketing that drives growth": {
        "icons": {
          "Marketing website": "globe",
          "Email campaigns": "target",
          "Growth strategy": "trending-up"
        }
      },
      "Measure everything": {
        "icons": {
          "Marketing analytics": "chart-column",
          "Conversion tracking": "target",
          "Monthly reporting": "trending-up"
        }
      },
      "Our process for this service": {
        "pill": "How it works"
      }
    }
  },
  "social-media-marketing": {
    "ctas": [
      {
        "label": "Start your project",
        "href": "/contact"
      },
      {
        "label": "All services",
        "href": "/services"
      }
    ],
    "sections": {
      "Everything you need, nothing you don't": {
        "pill": "What's included"
      },
      "Strategy before posts": {
        "icons": {
          "Audience research": "target",
          "Platform strategy": "trending-up",
          "Content calendar": "pen-tool"
        }
      },
      "Content that performs": {
        "icons": {
          "Visual content & design": "eye",
          "Copywriting": "pen-tool",
          "Community management": "users"
        }
      },
      "Paid social that converts": {
        "icons": {
          "Meta & LinkedIn ads": "megaphone",
          "Retargeting & funnels": "target",
          "Monthly reporting": "chart-column"
        }
      },
      "Our process for this service": {
        "pill": "How it works"
      }
    }
  },
  "metaverse-development": {
    "eyebrow": "Metaverse Development",
    "ctas": [
      {
        "label": "Start your metaverse project",
        "href": "/contact"
      },
      {
        "label": "Get an estimate",
        "href": "/estimate"
      }
    ],
    "sections": {
      "Our Comprehensive Metaverse Development Services": {
        "pill": "What we build",
        "icons": {
          "Metaverse App Development Services": "boxes",
          "Metaverse NFT Development": "wallet",
          "Metaverse Game Development": "gamepad2",
          "Metaverse Platform Integration": "plug",
          "Metaverse Social Media App Development": "messages-square",
          "Metaverse Digital Assets Development": "gem",
          "Metaverse Store Development": "store",
          "Metaverse Avatar Development": "user-round",
          "Metaverse AR/VR Development": "headset",
          "Metaverse Maintenance & Support": "life-buoy",
          "Decentralised Platforms": "network"
        }
      },
      "Our Tech Stack for Metaverse Development Services": {
        "pill": "Tooling",
        "icons": {
          "AR/VR": "headset",
          "AI": "brain",
          "3D Development": "boxes",
          "IoT": "radio",
          "Front-End": "monitor",
          "Back-End": "server",
          "Storage Platforms": "database",
          "Cloud Platforms": "cloud"
        }
      },
      "Why Partner with CodeNax for Metaverse Development": {
        "pill": "Why us",
        "icons": {
          "Research-Driven Development": "sparkles",
          "Cross-Industry Metaverse Experience": "boxes",
          "The Core of Creativity": "headset",
          "Client-Friendly Pricing": "wallet"
        }
      },
      "Metaverse Development Services Industries and Use Cases": {
        "pill": "Industries",
        "icons": {
          "Real Estate": "house",
          "Educational Institutions": "graduation-cap",
          "Retail and E-commerce": "shopping-bag",
          "Healthcare": "stethoscope",
          "Sports": "trophy",
          "Travel & Tourism": "plane",
          "Automobile": "car",
          "Manufacturers": "factory"
        }
      },
      "Our Metaverse Development Engagement Models": {
        "pill": "Engagement models",
        "icons": {
          "Project-Based Development": "boxes",
          "Staff Augmentation": "users",
          "Metaverse Dedicated Team": "building2"
        }
      },
      "Our Metaverse Development Process": {
        "pill": "How we work"
      }
    }
  },
  "mvp-development": {
    "eyebrow": "MVP Development Company",
    "ctas": [
      {
        "label": "Start your MVP",
        "href": "/contact"
      },
      {
        "label": "See how it works",
        "href": "#benefits-of-choosing-our-mvp-development-services"
      }
    ],
    "sections": {
      "Our MVP Development Services": {
        "pill": "Our services",
        "icons": {
          "Product Discovery and MVP Planning": "search",
          "Prototype Design": "mouse-pointer-click",
          "Market Research & Opportunity Analysis": "chart-column",
          "UX/UI Design": "palette",
          "Front-End Development": "code-xml",
          "Back-End Development": "server",
          "Quality Assurance and Testing": "shield-check",
          "Deployment and Launch Support": "rocket",
          "Maintenance and Support": "wrench"
        }
      },
      "Benefits of Starting Your Product with an MVP": {
        "pill": "Why MVP",
        "icons": {
          "Build Only What Users Need": "shopping-cart",
          "Look Before You Leap": "globe",
          "Learn as You Go": "brain-circuit",
          "Cut Costs, Reduce Risks": "layout-dashboard",
          "Real Progress for Investor Confidence": "rocket"
        }
      },
      "Benefits of Choosing Our MVP Development Services": {
        "pill": "Why choose us"
      },
      "We Offer Flexible MVP Development Solutions for Startups & Businesses": {
        "pill": "Our packages"
      },
      "Our Engagement Models for MVP Development": {
        "pill": "Engagement models"
      },
      "Our MVP Development Technology Stack": {
        "pill": "Technology"
      },
      "Deliverables at Every Stage of MVP Development": {
        "pill": "Deliverables"
      },
      "Our Risk Mitigation Approach for MVP Development": {
        "pill": "Risk mitigation"
      },
      "Why Partner with Codenax as MVP Development Company?": {
        "pill": "Why us"
      }
    }
  }
};
