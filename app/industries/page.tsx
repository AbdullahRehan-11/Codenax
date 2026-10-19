import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { industries, industriesPage } from "@/content/industries";
import { INDUSTRY_MEDIA } from "@/lib/media";
import { Icon } from "@/components/ui/icon";
import { CTABanner } from "@/components/sections/cta-banner";
import { IndustryExplorer } from "@/components/sections/industry-explorer";
import { IndustryStrengths } from "@/components/sections/industry-strengths";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...industriesPage.meta, path: "/industries" });

export default function IndustriesPage() {
  const { hero, ctas, explorer } = industriesPage;
  return (
    <>
      <PageHero
        {...hero}
        actions={ctas}
        aside={
          <nav aria-label="Industries">
            <ul className="grid grid-cols-4 gap-3">
              {industries.map((industry, i) => (
                <li key={industry.slug} className={i % 2 === 1 ? "translate-y-4" : undefined}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-line bg-background/80 p-2 text-center shadow-soft backdrop-blur transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-700"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon name={INDUSTRY_MEDIA[industry.slug].icon} />
                    </span>
                    <span className="text-xs leading-tight font-semibold">{industry.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      />
      <IndustryExplorer heading={explorer} tone="default" />
      <IndustryStrengths />
      <CTABanner />
    </>
  );
}
