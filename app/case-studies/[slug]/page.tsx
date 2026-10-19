import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { CASE_STUDY_SCREENSHOTS } from "@/lib/media";
import { revealDelay } from "@/lib/reveal";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ToolLogo } from "@/components/ui/tool-logo";
import { CaseStudyCard } from "@/components/sections/case-study-card";
import { ChallengeBody, SolutionBody } from "@/components/sections/case-study-story";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { sectionId } from "@/components/sections/service-section";
import { StoryNav } from "@/components/sections/story-nav";

// Only the eight known case studies exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

// Icon per industry as the case studies name them.
const INDUSTRY_ICONS: Record<string, IconName> = {
  Healthcare: "heart-pulse",
  "Education & E-Learning": "graduation-cap",
  Fintech: "landmark",
  "Professional Networking": "users",
  "Business Operations": "building",
  "Asset Management": "box",
  "Food & Delivery": "utensils",
};

const getStudy = (slug: string) => caseStudies.find((study) => study.slug === slug);

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getStudy(slug);
  return study ? pageMetadata({ ...study.meta, path: `/case-studies/${slug}` }) : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getStudy(slug);
  if (!study) notFound();

  const { backLink, startCta, labels, moreWork } = caseStudiesPage.detail;
  const sections = study.sections.map((section) => ({ ...section, id: sectionId(section.heading) }));
  const techId = "tech-stack";
  // The next three studies, wrapping round to the start.
  const index = caseStudies.indexOf(study);
  const more = [1, 2, 3].map((step) => caseStudies[(index + step) % caseStudies.length]);

  const facts: { label: string; value: string; icon?: IconName }[] = [
    { label: labels.client, value: study.client },
    { label: labels.industry, value: study.industry, icon: INDUSTRY_ICONS[study.industry] ?? "building" },
    { label: labels.engagement, value: study.engagement, icon: study.engagement.includes("Mobile") ? "smartphone" : "code" },
  ];

  return (
    <>
      <PageHero
        parent={backLink}
        eyebrow={study.industry}
        title={study.title}
        titleSize="md"
        description={study.summary}
        actions={[startCta]}
        aside={
          <div className="relative">
            <div aria-hidden className="bg-brand-gradient absolute -inset-3 -z-10 rounded-[2rem] opacity-15 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
            <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 z-10 h-1" />
            <dl className="grid gap-px bg-line">
              {facts.map((fact) => (
                // A <dl> row may only hold <dt>/<dd>, so the decorative icon sits inside the <dt>,
                // positioned in the row's left padding.
                <div
                  key={fact.label}
                  className="group relative flex min-h-21 flex-col justify-center gap-0.5 bg-background/90 py-5 pr-6 pl-21 backdrop-blur transition-colors duration-200 hover:bg-surface"
                >
                  <dt className="text-eyebrow font-semibold uppercase text-muted">
                    {fact.icon ? (
                      <span aria-hidden className="absolute top-1/2 left-6 grid size-11 -translate-y-1/2 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-on-primary">
                        <Icon name={fact.icon} />
                      </span>
                    ) : (
                      <span aria-hidden className="bg-brand-gradient absolute top-1/2 left-6 grid size-11 -translate-y-1/2 place-items-center rounded-xl font-display text-lg font-bold text-white normal-case shadow-glow">
                        {fact.value[0]}
                      </span>
                    )}
                    {fact.label}
                  </dt>
                  <dd className="text-lg font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
            </div>
          </div>
        }
      />

      {/* The product screenshot in a browser frame, overlapping the hero's bottom edge. */}
      <Container className="relative -mt-8 sm:-mt-12">
        <figure data-reveal className="relative mx-auto max-w-5xl">
          <div aria-hidden className="bg-brand-gradient absolute -inset-6 -z-10 rounded-[2.5rem] opacity-20 blur-3xl" />
          <div className="overflow-hidden rounded-2xl border border-line bg-background shadow-lift sm:rounded-3xl">
            <div aria-hidden className="flex items-center gap-1.5 border-b border-line bg-surface px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <Image
              src={CASE_STUDY_SCREENSHOTS[study.slug]}
              alt={`${study.client} product screens`}
              placeholder="blur"
              preload
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="w-full bg-white"
            />
          </div>
        </figure>
      </Container>

      <div className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <StoryNav
              label="On this page"
              articleId="story"
              items={[...sections.map((s) => ({ id: s.id, label: s.heading })), { id: techId, label: labels.techStack }]}
            />
          </aside>

          <article id="story" className="flex flex-col gap-16 lg:col-span-8 lg:col-start-5">
            {sections.map((section, i) => (
              <div key={section.id} className="flex flex-col gap-16">
                <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28" data-reveal>
                  <p aria-hidden className="font-display text-sm font-bold text-gradient">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 id={`${section.id}-title`} className="mt-2 text-display-3 font-bold">
                    {section.heading}
                  </h2>
                  {/challenge|problem/i.test(section.heading) ? (
                    <ChallengeBody blocks={section.blocks} />
                  ) : /solution/i.test(section.heading) ? (
                    <SolutionBody blocks={section.blocks} />
                  ) : (
                    <RichText
                      blocks={section.blocks}
                      className="mt-6 text-[1.0625rem] leading-8 text-muted"
                    />
                  )}
                </section>

                {/* The client's own words, after the overview. */}
                {i === 0 && (
                  <figure data-reveal className="relative isolate overflow-hidden rounded-3xl bg-brand-950 p-8 text-white sm:p-12">
                    <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-15" />
                    <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-brand-500/40 blur-3xl" />
                    <div className="flex items-center justify-between gap-4">
                      <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-brand-100 uppercase ring-1 ring-white/15">
                        <Icon name="sparkles" className="size-3.5 text-brand-300" />
                        Client feedback
                      </p>
                      <span aria-hidden className="font-display text-7xl leading-none text-brand-400/80">“</span>
                    </div>
                    <blockquote className="mt-4 text-lg leading-8 text-brand-50 sm:text-xl sm:leading-9">
                      {study.clientQuote}
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                      <span className="bg-brand-gradient grid size-11 place-items-center rounded-full font-bold shadow-glow">
                        {study.client[0]}
                      </span>
                      <span className="flex flex-col">
                        <span className="font-semibold">{study.client}</span>
                        <span className="text-sm text-brand-200">{labels.client}</span>
                      </span>
                    </figcaption>
                  </figure>
                )}
              </div>
            ))}

            <section id={techId} aria-labelledby={`${techId}-title`} className="scroll-mt-28" data-reveal>
              <h2 id={`${techId}-title`} className="text-display-3 font-bold">
                {labels.techStack}
              </h2>
              <dl className="mt-6 divide-y divide-line rounded-3xl border border-line">
                {study.techStack.map((group) => (
                  <div key={group.group} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6 sm:px-7">
                    <dt className="w-40 shrink-0 text-sm font-semibold text-muted">{group.group}</dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-2 rounded-full border border-line bg-background py-1.5 pr-3.5 pl-2.5 text-sm font-medium shadow-soft transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-brand-300"
                        >
                          <ToolLogo tool={item} className="size-4" />
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        </Container>
      </div>

      <Section tone="surface" labelledBy="more-work-title">
        <SectionHeading id="more-work-title" {...moreWork} />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {more.map((other, i) => (
            <li key={other.slug} data-reveal style={revealDelay(i)}>
              <CaseStudyCard study={other} compact />
            </li>
          ))}
        </ul>
      </Section>

      <CTABanner />
    </>
  );
}
