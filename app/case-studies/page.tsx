import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...caseStudiesPage.meta, path: "/case-studies" });

// Rhythm of the grid: one wide card, two pairs, one wide card, one pair (fits all eight).
const WIDE = new Set([0, 5]);

export default function CaseStudiesPage() {
  const { heading, closing } = caseStudiesPage;
  return (
    <>
      <PageHero {...heading} />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {caseStudies.map((study, i) => (
              <li
                key={study.slug}
                data-reveal
                style={revealDelay(WIDE.has(i) ? 0 : i % 2)}
                className={cn(WIDE.has(i) && "md:col-span-2")}
              >
                <CaseStudyCard study={study} layout={WIDE.has(i) ? "wide" : "stacked"} as="h2" />
              </li>
            ))}
          </ul>

          <div
            data-reveal
            className="mt-16 flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
          >
            <h2 className="text-display-3 font-bold">{closing.title}</h2>
            <Button href={closing.cta.href} size="lg">
              {closing.cta.label}
              <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </Container>
      </div>

      <CTABanner />
    </>
  );
}
