import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { blogCategories, blogPage, blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { BlogBrowser } from "@/components/features/blog-browser";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { toSummary } from "@/lib/blog-media";

export const metadata: Metadata = pageMetadata({ ...blogPage.meta, path: "/blog" });

export default function BlogPage() {
  // Newest first; only summaries go to the client filter.
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).map(toSummary);
  return (
    <>
      <PageHero {...blogPage.heading} />
      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <BlogBrowser posts={posts} categories={blogCategories} cta={blogPage.cardCta} />
        </Container>
      </div>
      <CTABanner />
    </>
  );
}
