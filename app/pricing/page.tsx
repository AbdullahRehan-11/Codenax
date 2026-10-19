import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { comparisonTables, pricingPage } from "@/content/pricing";
import { Container } from "@/components/ui/container";
import { ComparisonTable } from "@/components/sections/comparison-table";
import { CTABanner } from "@/components/sections/cta-banner";
import { EstimatorTeaser } from "@/components/sections/estimator-teaser";
import { PageHero } from "@/components/sections/page-hero";
import { PricingCards } from "@/components/sections/pricing-cards";

export const metadata: Metadata = pageMetadata({ ...pricingPage.meta, path: "/pricing" });

export default function PricingPage() {
  return (
    <>
      <PageHero {...pricingPage.heading} />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <PricingCards />
        </Container>
      </div>

      <EstimatorTeaser />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-16 lg:gap-20">
          {comparisonTables.map((table, i) => (
            <ComparisonTable key={table.title} table={table} id={`comparison-${i}`} />
          ))}
        </Container>
      </div>

      <CTABanner />
    </>
  );
}
