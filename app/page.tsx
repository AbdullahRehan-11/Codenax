import type { Metadata } from "next";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { homeFaqs } from "@/content/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { homeMeta } from "@/content/home";
import { CaseStudyShowcase } from "@/components/sections/case-study-showcase";
import { ClientStrip } from "@/components/sections/client-strip";
import { CTABanner } from "@/components/sections/cta-banner";
import { EngagementModels } from "@/components/sections/engagement-models";
import { EstimatorTeaser } from "@/components/sections/estimator-teaser";
import { FAQSection } from "@/components/sections/faq-section";
import { HeroCarousel } from "@/components/sections/hero-carousel";
import { IndustryExplorer } from "@/components/sections/industry-explorer";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServicesBento } from "@/components/sections/services-bento";
import { StatsStrip } from "@/components/sections/stats";
import { companyStats } from "@/content/stats";
import { TechStack } from "@/components/sections/tech-stack";
import { TestimonialRail } from "@/components/sections/testimonial-rail";

export const metadata: Metadata = pageMetadata({ ...homeMeta, path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <HeroCarousel />
      <ClientStrip />
      <EngagementModels />
      {/* Where codenax.com puts it: between the engagement models and the services. */}
      <StatsStrip stats={companyStats} />
      <ServicesBento />
      <ProcessTimeline />
      <IndustryExplorer />
      <CaseStudyShowcase />
      <TechStack />
      <TestimonialRail />
      <EstimatorTeaser />
      <FAQSection />
      <CTABanner />
    </>
  );
}
