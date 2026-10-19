import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { aboutPage } from "@/content/company";
import { revealDelay } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { StatsStrip } from "@/components/sections/stats";
import { companyStats } from "@/content/stats";
import { ProcessTimeline } from "@/components/sections/process-timeline";

export const metadata: Metadata = pageMetadata({ ...aboutPage.meta, path: "/about" });

// Decorative icons, in content order.
const EXPERTISE_ICONS: IconName[] = ["sparkles", "users", "rocket"];
const VALUE_ICONS: IconName[] = ["users", "search", "sparkles", "shield-check", "flame", "heart"];

export default function AboutPage() {
  const { hero, ctas, story, ceoMessage, expertise, processHeading, values } = aboutPage;
  return (
    <>
      <PageHero
        {...hero}
        actions={ctas}
        aside={
          <figure className="relative overflow-hidden rounded-3xl border border-line bg-background p-7 shadow-lift sm:p-8">
            <div aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1" />
            <figcaption className="text-eyebrow font-semibold text-link uppercase">{ceoMessage.label}</figcaption>
            <span aria-hidden className="text-gradient mt-4 block font-display text-7xl leading-none font-bold">
              “
            </span>
            <blockquote className="-mt-6 text-lg font-medium text-foreground">{ceoMessage.quote}</blockquote>
            <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
              <span aria-hidden className="bg-brand-gradient grid size-12 place-items-center rounded-full font-display text-lg font-bold text-white">
                {ceoMessage.name[0]}
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{ceoMessage.name}</span>
                <span className="text-sm text-muted">{ceoMessage.role}</span>
              </span>
            </div>
          </figure>
        }
      />
      <StatsStrip stats={companyStats} />

      <Section labelledBy="story-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading id="story-title" size="md" {...story} className="lg:sticky lg:top-28" />
          </div>
          <div className="flex flex-col gap-5 lg:col-span-7">
            <p data-reveal className="text-lead font-semibold">
              {expertise.intro}
            </p>
            <ul className="flex flex-col gap-4">
              {expertise.items.map((item, i) => (
                <li key={item.title} data-reveal style={revealDelay(i)}>
                  <Link
                    href={item.href}
                    className="group flex items-start gap-5 rounded-3xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-7 dark:hover:border-brand-700"
                  >
                    <span className="bg-brand-gradient grid size-13 shrink-0 place-items-center rounded-2xl text-white shadow-glow transition-[rotate,scale] duration-300 ease-smooth group-hover:scale-105 group-hover:-rotate-6">
                      <Icon name={EXPERTISE_ICONS[i]} className="size-6" />
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-2 text-xl font-bold transition-colors group-hover:text-link">
                        {item.title}
                        <Icon name="arrow-right" className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                      <span className="text-muted">{item.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <ProcessTimeline heading={processHeading} />

      <section aria-labelledby="values-title" className="relative isolate overflow-hidden bg-brand-950 py-16 sm:py-20 lg:py-28">
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-15" />
        <div aria-hidden className="absolute -top-40 left-1/2 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-brand-500/25 blur-3xl" />
        <Container>
          <SectionHeading id="values-title" align="center" eyebrowStyle="pill" onDark {...values.heading} />
          <FeatureGrid items={values.items} icons={VALUE_ICONS} variant="glass" className="mt-12" />
        </Container>
      </section>

      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTABanner />
      </div>
    </>
  );
}
