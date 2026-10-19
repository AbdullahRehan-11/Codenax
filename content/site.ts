import type { SocialLink } from "@/lib/types";

// All values are verbatim from the rendered codenax.com (header, footer and contact
// sections), verified 2026-09-28. See PROJECT-PLAN.md before changing anything here.
export const site = {
  name: "CodeNax",
  url: "https://www.codenax.com",
  description:
    "We design and build AI-powered applications, websites, and mobile apps that turn your vision into workable, scalable products.",
  email: "info@codenax.com",
  phone: "+1 307 443 6778",
  whatsappUrl: "https://wa.me/13074436778",
  // Prefilled message used by the reference site's footer WhatsApp link.
  whatsappProjectUrl:
    "https://wa.me/13074436778?text=Hi+CodeNax%21+I%27d+like+to+discuss+a+project.+Could+we+chat%3F",
  address: "30N Gould ST#7785 Sheridan, Wyoming",
  responseTime: "Response within 24 hours",
  copyright: "Copyright ©2020 CodeNax. All Rights Reserved",
  tagline: "Crafted with care, powered by AI.",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/codenax", icon: "linkedin" },
    { label: "Facebook", href: "https://www.facebook.com/codenaxx", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/codenax_llc/", icon: "instagram" },
  ] satisfies SocialLink[],
} as const;
