import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPage, blogPosts, getBlogPost } from "@/content/blog";
import { BLOG_AUTHORS, BLOG_COMPANY_LOGOS, BLOG_COVERS, BLOG_LIGHT_LOGOS, toSummary } from "@/lib/blog-media";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { articleJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { slugify } from "@/lib/slug";
import { Accordion } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { AuthorAvatar, PostCard, formatDate, readingTime } from "@/components/sections/post-card";
import { StoryNav } from "@/components/sections/story-nav";

// Only the nine known posts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    ...post.meta,
    path: `/blog/${slug}`,
    image: `/blog/${slug}/opengraph-image`,
    article: { publishedTime: post.date, authors: [post.author.name], tags: post.tags },
  });
}

/**
 * A company's logo under its heading in a round-up. Its chip has a fixed background whatever
 * the theme: white for dark logos, dark for the white ones.
 */
function companyLogo(heading: string) {
  const logo = BLOG_COMPANY_LOGOS[heading];
  if (!logo) return null;
  return (
    <span
      className={cn(
        "-mt-1 inline-flex h-16 w-fit items-center rounded-2xl border border-line px-5 shadow-soft",
        BLOG_LIGHT_LOGOS.has(heading) ? "bg-brand-950" : "bg-white",
      )}
    >
      <Image src={logo} alt={`${heading} logo`} sizes="12rem" className="h-9 w-auto max-w-40 object-contain" />
    </span>
  );
}

// A side list of sections only helps when there are a few to jump between.
const MIN_TOC_ITEMS = 3;

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const { writtenBy, relatedTitle, faqTitle } = blogPage.detail;
  const cover = BLOG_COVERS[slug];
  const avatar = BLOG_AUTHORS[post.author.name];
  const body = post.body;
  const toc = body.flatMap((block) =>
    block.type === "heading" && block.level === 2 ? [{ id: slugify(block.text), label: block.text }] : [],
  );
  const hasToc = toc.length >= MIN_TOC_ITEMS;
  const faqs = post.faqs;

  // Same category first, then the newest of the rest.
  const others = [...blogPosts].filter((p) => p.slug !== slug).sort((a, b) => b.date.localeCompare(a.date));
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${slug}`,
          date: post.date,
          author: post.author.name,
          image: cover?.src,
        })}
      />
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        // "Blog" is the site's menu label for this section.
        parent={{ label: "Blog", href: "/blog" }}
        titleSize="md"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <span className="flex items-center gap-3">
              <AuthorAvatar name={post.author.name} photo={avatar} className="size-11 shadow-glow ring-2 ring-background" />
              <span className="flex flex-col leading-tight">
                <span className="font-semibold">{post.author.name}</span>
                <span className="text-muted">{post.author.role}</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <Icon name="clock" className="size-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              {readingTime(post.readingMinutes)}
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-line bg-background/70 px-3 py-1 text-xs font-semibold text-muted">
                #{tag}
              </li>
            ))}
          </ul>
        </div>
      </PageHero>

      {cover && (
        // The post's cover photo, overlapping the bottom of the hero.
        <Container>
          <figure className="relative z-10 mx-auto -mt-8 max-w-5xl overflow-hidden rounded-3xl border border-line shadow-lift sm:-mt-12">
            <Image src={cover} alt={post.title} placeholder="blur" preload sizes="(min-width: 1024px) 64rem, 100vw" className="aspect-video w-full object-cover" />
          </figure>
        </Container>
      )}

      <div className="py-14 sm:py-16 lg:py-20">
        <Container className={cn("grid gap-10", hasToc && "xl:grid-cols-[15rem_minmax(0,1fr)] xl:gap-14")}>
          {hasToc && (
            <div className="hidden xl:block">
              <StoryNav label="On this page" articleId="post-body" items={toc} />
            </div>
          )}

          {/* min-w-0: wide tables scroll inside their own box instead of stretching the column. */}
          <div className={cn("flex w-full max-w-3xl min-w-0 flex-col gap-12", !hasToc && "mx-auto")}>
            <article id="post-body">
              <RichText
                blocks={body}
                headingIds
                afterHeading={companyLogo}
                className="gap-5 text-[1.0625rem] leading-[1.8] text-muted [&_h2]:mt-8 [&_h3]:mt-4 [&_li]:pl-1"
              />
            </article>

            <aside
              aria-label={writtenBy}
              className="relative flex items-center gap-5 overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-7"
            >
              <div aria-hidden className="bg-brand-gradient absolute inset-y-0 left-0 w-1" />
              <AuthorAvatar name={post.author.name} photo={avatar} className="size-16 text-xl shadow-glow" />
              <span className="flex flex-col gap-0.5">
                <span className="text-eyebrow font-semibold text-link uppercase">{writtenBy}</span>
                <span className="text-lg font-bold">{post.author.name}</span>
                <span className="text-muted">{post.author.role}</span>
              </span>
            </aside>
          </div>
        </Container>
      </div>

      {faqs.length > 0 && (
        <Section tone="surface" labelledBy="post-faq-title">
          <JsonLd data={faqJsonLd(faqs)} />
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionHeading id="post-faq-title" title={faqTitle} className="lg:col-span-4" />
            <div data-reveal className="lg:col-span-8">
              <Accordion
                name="post-faq"
                items={faqs.map((faq, i) => ({ id: `faq-${i}`, title: faq.question, content: <RichText blocks={faq.answer} /> }))}
              />
            </div>
          </div>
        </Section>
      )}

      <Section labelledBy="related-title">
        <SectionHeading id="related-title" title={relatedTitle} />
        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {related.map((p, i) => (
            <li key={p.slug} data-reveal style={revealDelay(i)}>
              <PostCard post={toSummary(p)} cta={blogPage.cardCta} as="h3" />
            </li>
          ))}
        </ul>
      </Section>

      <CTABanner />
    </>
  );
}
