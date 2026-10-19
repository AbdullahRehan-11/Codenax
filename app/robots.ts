import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// /robots.txt: every page may be crawled; points search engines to the sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).href,
  };
}
