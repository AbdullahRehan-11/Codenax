import type { StaticImageData } from "next/image";
import type { IconName } from "@/components/ui/icon";
import alkebabish from "@/public/images/case-studies/alkebabish.jpg";
import assetHub from "@/public/images/case-studies/asset-hub.jpg";
import buzup from "@/public/images/case-studies/buzup.jpg";
import ciwac from "@/public/images/case-studies/ciwac.jpg";
import curenax from "@/public/images/case-studies/curenax.jpg";
import educatorHub from "@/public/images/case-studies/educator-hub.jpg";
import fintech from "@/public/images/case-studies/fintech.jpg";
import prepabac from "@/public/images/case-studies/prepabac.jpg";
import education from "@/public/images/industries/education.jpg";
import financeBusiness from "@/public/images/industries/finance-business.jpg";
import foodDelivery from "@/public/images/industries/food-delivery.jpg";
import healthcare from "@/public/images/industries/healthcare.jpg";
import logistics from "@/public/images/industries/logistics.jpg";
import realEstate from "@/public/images/industries/real-estate.jpg";
import retailEcommerce from "@/public/images/industries/retail-ecommerce.jpg";
import travelTourism from "@/public/images/industries/travel-tourism.jpg";

// Presentation assets keyed by content slug, shared by every page that shows them.

/** Service icons: the ones the Services mega menu uses (`content/nav.ts`). */
export const SERVICE_ICONS: Record<string, IconName> = {
  "ai-development": "sparkles",
  "web-development": "globe",
  "custom-mobile-app-development": "smartphone",
  "ui-ux-design-and-development": "palette",
  "staff-augmentation": "users",
  "software-testing-and-qa": "shield-check",
  "branding-marketing": "megaphone",
  "social-media-marketing": "share",
  "metaverse-development": "box",
  "mvp-development": "rocket",
};

/** Photo and icon per industry: the ones codenax.com uses (photos from Unsplash, icons from Lucide). */
export const INDUSTRY_MEDIA: Record<string, { image: StaticImageData; icon: IconName }> = {
  healthcare: { image: healthcare, icon: "heart-pulse" },
  "finance-business": { image: financeBusiness, icon: "landmark" },
  "retail-ecommerce": { image: retailEcommerce, icon: "shopping-bag" },
  education: { image: education, icon: "graduation-cap" },
  logistics: { image: logistics, icon: "truck" },
  "real-estate": { image: realEstate, icon: "building" },
  "travel-tourism": { image: travelTourism, icon: "plane" },
  "food-delivery": { image: foodDelivery, icon: "utensils" },
};

/** Product screenshots from codenax.com, keyed by case-study slug. */
export const CASE_STUDY_SCREENSHOTS: Record<string, StaticImageData> = {
  "curenax-digital-healthcare-platform": curenax,
  "prepabac-tchad-learning-app": prepabac,
  "fintech-solution-for-smarter-invoicing": fintech,
  "buzup-networking-platform": buzup,
  "educator-hub-global-online-learning-platform": educatorHub,
  "ciwac-unified-business-platform": ciwac,
  "asset-hub-saas": assetHub,
  "alkebabish-food-ordering-app": alkebabish,
};
