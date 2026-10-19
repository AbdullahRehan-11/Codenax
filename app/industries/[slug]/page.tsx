import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies } from "@/content/case-studies";
import { getIndustry, industries, industriesPage } from "@/content/industries";
import { cn } from "@/lib/cn";
import { INDUSTRY_MEDIA } from "@/lib/media";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CTABanner } from "@/components/sections/cta-banner";
import { IndustryStrengths } from "@/components/sections/industry-strengths";
import { PageHero } from "@/components/sections/page-hero";

// Only the eight known industries exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  // The site has no separate page per industry, so its name and summary serve as title and description.
  return pageMetadata({ title: `${industry.name} | CodeNax`, description: industry.summary, path: `/industries/${slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const { image, icon } = INDUSTRY_MEDIA[slug];
  const { labels, noRelatedWork, ctas } = industriesPage;
  const related = industry.caseStudies.flatMap((s) => caseStudies.filter((study) => study.slug === s));
  const single = related.length === 1;
  const others = industries.filter((other) => other.slug !== slug);

  return (
    <>
      <PageHero
        parent={{ label: "Industries", href: "/industries" }}
        eyebrow={industry.tagline}
        title={industry.name}
        description={industry.summary}
        actions={ctas}
        aside={
          <div className="relative">
            <div aria-hidden className="bg-brand-gradient absolute -inset-4 -z-10 rounded-[2rem] opacity-15 blur-2xl" />
            <Image
              src={image}
              alt=""
              placeholder="blur"
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-4/3 w-full rounded-3xl object-cover shadow-lift"
            />
            <span className="bg-brand-gradient absolute -bottom-5 left-6 grid size-16 animate-float place-items-center rounded-2xl text-white shadow-glow ring-4 ring-background">
              <Icon name={icon} className="size-8" />
            </span>
          </div>
        }
      />

      <Section labelledBy="build-title">
        <SectionHeading id="build-title" title={labels.whatWeBuild} />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industry.whatWeBuild.map((item, i) => (
            <li
              key={item}
              data-reveal
              style={revealDelay(i)}
              className="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
            >
              <span
                aria-hidden
                className="bg-brand-gradient absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-smooth group-hover:scale-x-100"
              />
              <span className="font-display text-display-3 font-bold text-gradient">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-bold">{item}</h3>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" labelledBy="related-title">
        <SectionHeading id="related-title" title={labels.relatedWork} />
        {related.length > 0 ? (
          <ul className={cn("mt-10 grid gap-6", !single && "md:grid-cols-2")}>
            {related.map((study, i) => (
              <li key={study.slug} data-reveal style={revealDelay(i)}>
                {/* A lone case study is laid out side by side rather than at half width. */}
                <CaseStudyCard study={study} layout={single ? "wide" : "stacked"} />
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-dashed border-line-strong bg-background p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{noRelatedWork.title}</h3>
              <p className="text-muted">{noRelatedWork.description}</p>
            </div>
            <Button href={noRelatedWork.cta.href} className="shrink-0">
              {noRelatedWork.cta.label}
              <Icon name="arrow-right" className="size-4" />
            </Button>
          </div>
        )}
      </Section>

      <IndustryStrengths tone="default" />

      <Section tone="surface" labelledBy="other-industries-title">
        <SectionHeading id="other-industries-title" title="Industries we serve" />
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {others.map((other, i) => (
            <li key={other.slug} data-reveal style={revealDelay(i % 4)}>
              <Link
                href={`/industries/${other.slug}`}
                // bg-brand-950: the dark backdrop behind the photo, so the white text keeps its contrast before it loads.
                className="group relative isolate flex aspect-4/3 flex-col justify-end overflow-hidden rounded-2xl bg-brand-950 p-4 text-white sm:p-5"
              >
                <Image
                  src={INDUSTRY_MEDIA[other.slug].image}
                  alt=""
                  placeholder="blur"
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="absolute inset-0 -z-20 size-full object-cover transition-[scale] duration-700 ease-smooth group-hover:scale-110"
                />
                <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950/90 via-brand-950/40 to-transparent" />
                <Icon name={INDUSTRY_MEDIA[other.slug].icon} className="mb-2 size-5 text-brand-200" />
                <span className="font-bold sm:text-lg">{other.name}</span>
                <span className="hidden text-sm text-brand-100 sm:block">{other.tagline}</span>
              </Link>
            </li>
          ))}
          {/* The seven other industries plus this tile fill an even grid. */}
          <li data-reveal style={revealDelay(3)}>
            <Link
              href="/industries"
              className="group bg-brand-gradient flex aspect-4/3 flex-col justify-between rounded-2xl p-4 text-white shadow-glow transition-[translate] duration-300 ease-smooth hover:-translate-y-1 sm:p-5"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
                <Icon name="arrow-right" className="size-5" />
              </span>
              <span className="font-bold sm:text-lg">View all industries</span>
            </Link>
          </li>
        </ul>
      </Section>

      <CTABanner />
    </>
  );
}
