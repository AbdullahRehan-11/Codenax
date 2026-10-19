import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { servicePages } from "@/content/services";
import { site } from "@/content/site";

// /sitemap.xml, built from the content files so new pages are listed automatically.
// Blog posts carry their publish date; other pages don't have one on the site.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).href;
  const pages = [
    "/",
    "/services",
    "/industries",
    "/case-studies",
    "/pricing",
    "/estimate",
    "/contact",
    "/faq",
    "/about",
    "/why-us",
    "/process",
    "/careers",
    "/life-at-codenax",
    "/blog",
  ];
  return [
    ...pages.map((path) => ({ url: url(path), priority: path === "/" ? 1 : 0.8 })),
    ...servicePages.map((page) => ({ url: url(`/services/${page.slug}`), priority: 0.7 })),
    ...industries.map((industry) => ({ url: url(`/industries/${industry.slug}`), priority: 0.6 })),
    ...caseStudies.map((study) => ({ url: url(`/case-studies/${study.slug}`), priority: 0.6 })),
    ...blogPosts.map((post) => ({ url: url(`/blog/${post.slug}`), lastModified: post.date, priority: 0.5 })),
  ];
}
