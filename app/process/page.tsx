import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { processPage, processSteps } from "@/content/process";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { STAGE_ICONS } from "@/components/sections/process-timeline";
import { StoryNav } from "@/components/sections/story-nav";

export const metadata: Metadata = pageMetadata({ ...processPage.meta, path: "/process" });

const stageId = (step: { number: string; name: string }) => `stage-${step.number}-${step.name.toLowerCase()}`;

export default function ProcessPage() {
  const { hero, ctas, labels } = processPage;
  const navItems = processSteps.map((step) => ({ id: stageId(step), label: `${step.number} ${step.name}` }));

  return (
    <>
      <PageHero
        {...hero}
        actions={ctas}
        aside={
          // Stage map: jump links to each stage below.
          <nav aria-label="Stages" className="rounded-3xl border border-line bg-background/80 p-3 shadow-lift backdrop-blur">
            <ol className="grid grid-cols-2 gap-2">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <a
                    href={`#${stageId(step)}`}
                    className="group flex items-center gap-3 rounded-2xl p-3 transition-colors duration-200 hover:bg-soft"
                  >
                    <span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-glow transition-[rotate] duration-300 group-hover:-rotate-6">
                      <Icon name={STAGE_ICONS[step.number].icon} className="size-5" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold text-muted">{step.number}</span>
                      <span className="font-semibold group-hover:text-link">{step.name}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        }
      />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 xl:grid-cols-[13rem_minmax(0,1fr)] xl:gap-14">
          <div className="hidden xl:block">
            <StoryNav label="On this page" articleId="process-stages" items={navItems} />
          </div>

          <ol id="process-stages" className="relative flex flex-col gap-8 lg:gap-10">
            {/* A faint rail joining the stages. */}
            <span aria-hidden className="absolute top-8 bottom-8 left-[3.625rem] hidden w-px bg-line sm:block" />
            {processSteps.map((step, i) => {
              const id = stageId(step);
              return (
                <li key={step.number} id={id} data-reveal className="relative scroll-mt-28">
                  <article
                    aria-labelledby={`${id}-title`}
                    className="overflow-hidden rounded-3xl border border-line bg-background shadow-soft"
                  >
                    <header
                      className={cn(
                        "relative flex flex-col gap-5 border-b border-line p-6 sm:flex-row sm:items-start sm:p-8",
                        i % 2 === 0 ? "bg-surface" : "bg-soft/50",
                      )}
                    >
                      <span className="bg-brand-gradient relative grid size-13 shrink-0 place-items-center rounded-2xl text-white shadow-glow">
                        <Icon name={STAGE_ICONS[step.number].icon} className="size-6" />
                      </span>
                      <div className="flex flex-1 flex-col gap-1.5">
                        <h2 id={`${id}-title`} className="flex items-baseline gap-3 text-display-3 font-bold">
                          <span className="text-gradient font-display">{step.number}</span>
                          {step.name}
                        </h2>
                        <p className="font-semibold text-link">{step.tagline}</p>
                      </div>
                      <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line bg-background px-3.5 py-1.5 text-sm">
                        <Icon name="clock" className="size-4 text-link" />
                        <span className="text-muted">{labels.duration}</span>
                        <span className="font-semibold">{step.duration}</span>
                      </p>
                    </header>

                    <div className="flex flex-col gap-8 p-6 sm:p-8">
                      <p className="text-lead text-muted">{step.description}</p>
                      <div className="grid gap-5 md:grid-cols-2">
                        <div className="rounded-2xl border border-line p-5 sm:p-6">
                          <h3 className="flex items-center gap-2 font-bold">
                            <Icon name="file-text" className="size-5 text-link" />
                            {labels.deliverables}
                          </h3>
                          <ul className="mt-4 flex flex-col gap-3">
                            {step.deliverables.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                                  <Icon name="check" className="size-3" />
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-2xl bg-surface p-5 sm:p-6">
                          <h3 className="flex items-center gap-2 font-bold">
                            <Icon name="eye" className="size-5 text-link" />
                            {labels.whatToExpect}
                          </h3>
                          <ul className="mt-4 flex flex-col gap-3">
                            {step.whatToExpect.map((item) => (
                              <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                                <Icon name="arrow-right" className="mt-0.5 size-4 shrink-0 text-link" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>

      <CTABanner />
    </>
  );
}
