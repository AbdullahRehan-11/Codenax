import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { estimatorPage } from "@/content/estimator";
import { Container } from "@/components/ui/container";
import { EstimatorWizard } from "@/components/features/estimator-wizard";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...estimatorPage.meta, path: "/estimate" });

export default function EstimatePage() {
  return (
    <>
      <PageHero {...estimatorPage.heading} />
      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <EstimatorWizard />
        </Container>
      </div>
      <CTABanner />
    </>
  );
}
