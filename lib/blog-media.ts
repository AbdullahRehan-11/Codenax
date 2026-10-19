import type { StaticImageData } from "next/image"; 
import type { BlogPost } from "@/lib/types";
import type { PostSummary } from "@/components/sections/post-card";
import automate from "@/public/images/blog/covers/automate-the-boring-80-percent.jpg";
import techStack from "@/public/images/blog/covers/choosing-a-tech-stack.jpg";
import designSystems from "@/public/images/blog/covers/design-systems-that-speed-teams-up.jpg";
import discovery from "@/public/images/blog/covers/discovery-sprints-that-de-risk-products.jpg";
import mvpCompanies from "@/public/images/blog/covers/mvp-development-companies.jpg";
import mvpStartup from "@/public/images/blog/covers/mvp-in-software-development-and-startup.jpg";
import mvpToScale from "@/public/images/blog/covers/mvp-to-scale-without-rewrite.jpg";
import shippingAi from "@/public/images/blog/covers/shipping-ai-features-users-trust.jpg";
import staffAug from "@/public/images/blog/covers/top-it-staff-augmentation-companies.jpg";
import danielOkonkwo from "@/public/images/blog/authors/daniel-okonkwo.jpg";
import mayaChen from "@/public/images/blog/authors/maya-chen.jpg";
import salman from "@/public/images/blog/authors/salman.jpg";
import sofiaMarin from "@/public/images/blog/authors/sofia-marin.jpg";
import appMakers from "@/public/images/blog/logos/app-makers.png";
import appinventiv from "@/public/images/blog/logos/appinventiv.png";
import bairesdev from "@/public/images/blog/logos/bairesdev.png";
import closeloop from "@/public/images/blog/logos/closeloop-technologies.png";
import codenax from "@/public/images/blog/logos/codenax.png";
import infinum from "@/public/images/blog/logos/infinum.png";
import intellectsoft from "@/public/images/blog/logos/intellectsoft.png";
import leobit from "@/public/images/blog/logos/leobit.png";
import sciencesoft from "@/public/images/blog/logos/sciencesoft.png";
import simform from "@/public/images/blog/logos/simform.png";
import vention from "@/public/images/blog/logos/vention.png";

// Blog images from codenax.com (owner approved using the site's images): cover photos
// (Unsplash), author photos and the company logos in the MVP round-up.

/** Cover photo per post slug; its alt text on the site is the post title. */
export const BLOG_COVERS: Record<string, StaticImageData> = {
  "mvp-development-companies": mvpCompanies,
  "mvp-in-software-development-and-startup": mvpStartup,
  "top-it-staff-augmentation-companies": staffAug,
  "shipping-ai-features-users-trust": shippingAi,
  "mvp-to-scale-without-rewrite": mvpToScale,
  "design-systems-that-speed-teams-up": designSystems,
  "automate-the-boring-80-percent": automate,
  "choosing-a-tech-stack": techStack,
  "discovery-sprints-that-de-risk-products": discovery,
};

/** Author photo by name. Salman's is his own photo from codenax.com/avatars. */
export const BLOG_AUTHORS: Record<string, StaticImageData> = {
  Salman: salman,
  "Maya Chen": mayaChen,
  "Daniel Okonkwo": danielOkonkwo,
  "Sofia Marin": sofiaMarin,
};

/** Company logos shown under their heading in a round-up, keyed by the heading text. */
export const BLOG_COMPANY_LOGOS: Record<string, StaticImageData> = {
  Codenax: codenax,
  Appinventiv: appinventiv,
  Intellectsoft: intellectsoft,
  BairesDev: bairesdev,
  ScienceSoft: sciencesoft,
  Vention: vention,
  Simform: simform,
  "Closeloop Technologies": closeloop,
  "App Makers": appMakers,
  Infinum: infinum,
  Leobit: leobit,
};

/** Logos drawn in white (they need a dark background to be seen). */
export const BLOG_LIGHT_LOGOS = new Set(["Appinventiv", "Intellectsoft"]);

/** A post as a card needs it: no body, with its cover and author photo attached. */
export const toSummary = ({ slug, title, excerpt, category, date, readingMinutes, author }: BlogPost): PostSummary => ({
  slug,
  title,
  excerpt,
  category,
  date,
  readingMinutes,
  author,
  cover: BLOG_COVERS[slug],
  avatar: BLOG_AUTHORS[author.name],
});
