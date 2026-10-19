import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { careersPage } from "@/content/company";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...careersPage.meta, path: "/careers" });

// Decorative icons, in content order: remote, stack, learning, balance.
const PERK_ICONS: IconName[] = ["globe", "code", "graduation-cap", "clock"];

export default function CareersPage() {
  const { hero, ctas, perks, openings } = careersPage;
  return (
    <>
      <PageHero {...hero} actions={ctas} />

      <Section labelledBy="perks-title">
        <SectionHeading id="perks-title" {...perks.heading} />
        <FeatureGrid items={perks.items} icons={PERK_ICONS} columns={4} className="mt-12" />
      </Section>

      <Section id="open-positions" tone="surface" labelledBy="openings-title" className="scroll-mt-20">
        <SectionHeading id="openings-title" {...openings.heading} />
        {openings.roles.length > 0 ? (
          <ul className="mt-10 flex flex-col gap-3">
            {openings.roles.map((role) => (
              <li key={role.href}>
                <Link
                  href={role.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-background p-5 font-semibold transition-colors hover:border-brand-300 hover:text-link"
                >
                  {role.title}
                  <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          // Empty state: the site lists no roles right now.
          <div
            data-reveal
            className="relative mt-10 flex flex-col items-center gap-5 overflow-hidden rounded-3xl border-2 border-dashed border-line-strong bg-background px-6 py-14 text-center sm:px-12"
          >
            <div aria-hidden className="absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/40" />
            <span className="bg-brand-gradient relative grid size-16 place-items-center rounded-2xl text-white shadow-glow">
              <Icon name="briefcase" className="size-8" />
            </span>
            <h3 className="relative text-display-3 font-bold">{openings.empty.title}</h3>
            <p className="relative max-w-2xl text-muted">{openings.empty.description}</p>
            <Button href={openings.empty.cta.href} size="lg" className="relative">
              <Icon name="send" className="size-4" />
              {openings.empty.cta.label}
            </Button>
          </div>
        )}
      </Section>

      <div className="pt-16 sm:pt-20 lg:pt-28">
        <CTABanner />
      </div>
    </>
  );
}
