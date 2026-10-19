import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { lifePage } from "@/content/company";
import { revealDelay } from "@/lib/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...lifePage.meta, path: "/life-at-codenax" });

// Decorative icons, in content order.
const PERK_ICONS: IconName[] = ["globe", "clock", "graduation-cap", "rocket", "heart", "users"];
const CULTURE_ICONS: IconName[] = ["shield-check", "palette", "megaphone", "sparkles", "trending-up", "flame"];
const DAY_ICONS: IconName[] = ["sun", "users", "code", "moon"];

export default function LifePage() {
  const { hero, ctas, perks, culture, typicalDay, closing } = lifePage;
  return (
    <>
      <PageHero {...hero} actions={ctas} />

      <Section labelledBy="life-perks-title">
        <SectionHeading id="life-perks-title" {...perks.heading} />
        <FeatureGrid items={perks.items} icons={PERK_ICONS} className="mt-12" />
      </Section>

      <Section tone="surface" labelledBy="culture-title">
        <SectionHeading id="culture-title" align="center" {...culture.heading} />
        <FeatureGrid items={culture.items} icons={CULTURE_ICONS} variant="numbered" className="mt-12" />
      </Section>

      <Section labelledBy="day-title">
        <SectionHeading id="day-title" align="center" {...typicalDay.heading} />
        <ol className="relative mt-14 grid gap-8 lg:grid-cols-4 lg:gap-6">
          {/* The day's line: down the left on phones, across the top from lg. */}
          <span aria-hidden className="absolute top-7 bottom-7 left-7 w-0.5 bg-linear-to-b from-amber-400 via-brand-500 to-royal-600 lg:hidden" />
          <span aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-0.5 bg-linear-to-r from-amber-400 via-brand-500 to-royal-600 lg:block" />
          {typicalDay.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={revealDelay(i, 120)}
              className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-4 border-background bg-brand-gradient text-white shadow-glow transition-[scale,rotate] duration-300 ease-smooth group-hover:scale-110 group-hover:-rotate-12">
                <Icon name={DAY_ICONS[i]} className="size-6" />
              </span>
              <div className="flex flex-1 flex-col gap-2 rounded-3xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <section aria-labelledby="life-closing-title" className="pb-16 sm:pb-20 lg:pb-28">
        <Container>
          <div
            data-reveal
            className="relative isolate overflow-hidden rounded-3xl bg-brand-950 px-6 py-14 text-center text-white sm:px-12 sm:py-20"
          >
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-20" />
            <div aria-hidden className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl" />
            <h2 id="life-closing-title" className="text-display-2 font-bold">
              {closing.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lead text-brand-100">{closing.description}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {closing.ctas.map((cta, i) => (
                <Button key={cta.href} href={cta.href} variant={i === 0 ? "primary" : "secondary"} size="lg" block>
                  {cta.label}
                  {i === 0 && <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
