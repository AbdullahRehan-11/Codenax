import type { Heading } from "@/lib/types";
import { processHeading, processSteps } from "@/content/process";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessSteps, type ProcessStepItem } from "./process-steps";

/** Icon and one-shot icon motion per stage (presentation only, keyed by stage number). */
export const STAGE_ICONS: Record<string, Pick<ProcessStepItem, "icon" | "motion">> = {
  "01": { icon: "search", motion: "motion-safe:animate-icon-wiggle" },
  "02": { icon: "palette", motion: "motion-safe:animate-icon-pop" },
  "03": { icon: "code", motion: "motion-safe:animate-icon-pop" },
  "04": { icon: "shield-check", motion: "motion-safe:animate-icon-pop" },
  "05": { icon: "rocket", motion: "motion-safe:animate-icon-nudge" },
  "06": { icon: "trending-up", motion: "motion-safe:animate-icon-draw" },
};

/**
 * The six-stage process as a scroll-driven timeline. This Server Component keeps the full
 * process content on the server and sends the client only the fields the timeline shows.
 */
export function ProcessTimeline({ heading = processHeading }: { heading?: Heading }) {
  const steps: ProcessStepItem[] = processSteps.map((step) => ({
    number: step.number,
    name: step.name,
    tagline: step.tagline,
    summary: step.summary,
    ...STAGE_ICONS[step.number],
  }));

  return (
    <Section labelledBy="process-title">
      <ProcessSteps steps={steps} heading={<SectionHeading id="process-title" {...heading} />} />
    </Section>
  );
}
