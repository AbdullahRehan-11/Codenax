import type { Metadata } from "next";
import { site } from "@/content/site";
import type { FAQ, RichBlock } from "@/lib/types";

type PageSeo = {
  /** The page's own title from codenax.com (already includes the brand where the site has it). */
  title: string;
  description?: string;
  /** Path of the page, e.g. "/pricing"; becomes the canonical URL. */
  path: string;
  /** "article" for blog posts, with their date, author and tags. */
  article?: { publishedTime: string; authors: string[]; tags: string[] };
  /** A page's own share picture (e.g. a blog post's opengraph-image route); defaults to the site's. */
  image?: string;
};

/** The site-wide share picture (app/opengraph-image.tsx). */
const SHARE_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: site.name };

/**
 * Metadata for one page: title, description, canonical URL, and the Open Graph / Twitter tags
 * used when the link is shared. A page's `openGraph` replaces its parent's as a whole
 * (including a nearby opengraph-image file), so the share picture is always set here.
 */
export function pageMetadata({ title, description, path, article, image }: PageSeo): Metadata {
  const shareImage = image ? { ...SHARE_IMAGE, url: image, alt: title } : SHARE_IMAGE;
  return {
    // absolute: the titles are copied as written on codenax.com, so no template is added.
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      images: [shareImage],
      ...(article
        ? { type: "article", publishedTime: article.publishedTime, authors: article.authors, tags: article.tags }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage.url] },
  };
}

// ---------------------------------------------------------------------------
// Structured data (JSON-LD), rendered by components/seo/json-ld.tsx
// ---------------------------------------------------------------------------

const absolute = (path: string) => new URL(path, site.url).href;

/** The company, on every page (from content/site.ts). */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: absolute("/images/brand/logo.png"),
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: { "@type": "PostalAddress", streetAddress: site.address },
  sameAs: site.socials.map((social) => social.href),
};

/** Plain text of an answer, for search engines. */
const plain = (blocks: RichBlock[]) =>
  blocks
    .map((block) => (block.type === "list" ? block.items.join("; ") : block.type === "table" ? block.rows.map((r) => r.join(" – ")).join("; ") : block.text))
    .join(" ");

/** A page's FAQs as an FAQPage. */
export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: plain(faq.answer) },
    })),
  };
}

/** A blog post as a BlogPosting. */
export function articleJsonLd(post: {
  title: string;
  description: string;
  path: string;
  date: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absolute(post.path),
    mainEntityOfPage: absolute(post.path),
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: site.name, logo: absolute("/images/brand/logo.png") },
    ...(post.image && { image: absolute(post.image) }),
  };
}
