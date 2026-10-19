import { caseStudiesHeading } from "@/content/home";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { CASE_STUDY_SCREENSHOTS as SCREENSHOTS } from "@/lib/media";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CaseStudyStage, type StageItem } from "./case-study-stage";

/**
 * Home "Real products, real results": all eight case studies in a showcase stage.
 * This Server Component picks out only what the stage needs, so the long case-study
 * text in content/case-studies.ts never ships to the browser.
 */
export function CaseStudyShowcase() {
  const { heading, cta } = caseStudiesHeading;
  const items: StageItem[] = caseStudies.map((study) => {
    const group = (name: string) => study.techStack.find((g) => g.group === name)?.items[0];
    return {
      slug: study.slug,
      client: study.client,
      industry: study.industry,
      engagement: study.engagement,
      title: study.title,
      summary: study.summary,
      image: SCREENSHOTS[study.slug],
      // Three real tech-stack items to float around the screenshot.
      chips: [group("Frontend"), group("Mobile") ?? group("Backend"), group("Integrations")].filter(
        (chip): chip is string => Boolean(chip),
      ),
    };
  });

  return (
    <Section labelledBy="cases-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading id="cases-title" {...heading} />
        <div className="shrink-0">
          <Button href={cta.href} variant="secondary">
            {cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>
      </div>
      <div data-reveal className="mt-12">
        <CaseStudyStage items={items} cardCta={caseStudiesPage.cardCta} />
      </div>
    </Section>
  );
}
