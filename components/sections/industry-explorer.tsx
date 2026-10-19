import { industriesHeading } from "@/content/home";
import { industries, industriesPage } from "@/content/industries";
import { caseStudies } from "@/content/case-studies";
import { INDUSTRY_MEDIA as MEDIA } from "@/lib/media";
import type { Heading } from "@/lib/types";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { IndustryExplorerClient, type ExplorerItem } from "./industry-explorer-client";

/**
 * "Industries we serve" (home) and the explorer on /industries. This Server Component gathers
 * the data (including related case studies) so only the small, serialisable result is sent to
 * the interactive client part.
 */
export function IndustryExplorer({
  heading = industriesHeading,
  tone = "surface",
}: {
  heading?: Heading;
  tone?: "default" | "surface";
}) {
  const items: ExplorerItem[] = industries.map((industry) => ({
    slug: industry.slug,
    name: industry.name,
    tagline: industry.tagline,
    summary: industry.summary,
    whatWeBuild: industry.whatWeBuild,
    ...MEDIA[industry.slug],
    related: industry.caseStudies.flatMap((slug) => {
      const study = caseStudies.find((s) => s.slug === slug);
      return study ? [{ label: study.client, href: `/case-studies/${study.slug}` }] : [];
    }),
  }));

  return (
    <Section tone={tone} labelledBy="industries-title">
      <SectionHeading id="industries-title" {...heading} />
      <div data-reveal className="mt-12">
        <IndustryExplorerClient
          items={items}
          labels={{
            whatWeBuild: industriesPage.labels.whatWeBuild,
            relatedWork: industriesPage.labels.relatedWork,
            noRelatedWork: industriesPage.noRelatedWork,
          }}
        />
      </div>
    </Section>
  );
}
