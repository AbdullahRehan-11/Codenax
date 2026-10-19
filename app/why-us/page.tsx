import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { whyUsPage } from "@/content/company";
import { comparisonTables } from "@/content/pricing";
import { testimonials } from "@/content/testimonials";
import { type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { CTABanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { StatsStrip } from "@/components/sections/stats";
import { companyStats } from "@/content/stats";

export const metadata: Metadata = pageMetadata({ ...whyUsPage.meta, path: "/why-us" });

// Decorative icons, in content order.
const DIFFERENTIATOR_ICONS: IconName[] = ["users", "trending-up", "sparkles", "shield-check", "heart", "eye"];

export default function WhyUsPage() {
  const { hero, ctas, differentiators, comparisonHeading, testimonialHeading, testimonialCompany } = whyUsPage;
  const testimonial = testimonials.find((t) => t.company === testimonialCompany);
  return (
    <>
      <PageHero {...hero} actions={ctas} />
      <StatsStrip stats={companyStats} />

      <Section labelledBy="differentiators-title">
        <SectionHeading id="differentiators-title" {...differentiators.heading} />
        <FeatureGrid items={differentiators.items} icons={DIFFERENTIATOR_ICONS} variant="numbered" className="mt-12" />
      </Section>

      <Section tone="surface" labelledBy="compare-title" containerClassName="flex flex-col gap-14 lg:gap-16">
        <SectionHeading id="compare-title" {...comparisonHeading} />
        {comparisonTables.map((table, i) => (
          <ComparisonTable key={table.title} table={table} id={`why-comparison-${i}`} as="h3" />
        ))}
      </Section>

      {testimonial && (
        <Section labelledBy="client-story-title">
          <SectionHeading id="client-story-title" align="center" {...testimonialHeading} />
          <figure
            data-reveal
            className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-line bg-background p-8 text-center shadow-lift sm:p-12"
          >
            <div aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
            <div aria-hidden className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/40" />
            <span aria-hidden className="text-gradient relative block font-display text-8xl leading-none font-bold">
              “
            </span>
            <blockquote className="relative -mt-6 text-xl leading-relaxed font-medium text-foreground sm:text-2xl">
              {testimonial.quote}
            </blockquote>
            <figcaption className="relative mt-8 flex flex-col items-center gap-3">
              <span aria-hidden className="bg-brand-gradient grid size-14 place-items-center rounded-full font-display text-lg font-bold text-white shadow-glow">
                {testimonial.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-sm text-muted">
                  {testimonial.role}, {testimonial.company}
                </span>
              </span>
            </figcaption>
          </figure>
        </Section>
      )}

      <CTABanner />
    </>
  );
}
