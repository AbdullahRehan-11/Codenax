import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { servicesOverview, servicesPage } from "@/content/services";
import { cn } from "@/lib/cn";
import { SERVICE_ICONS } from "@/lib/media";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...servicesPage.meta, path: "/services" });

export default function ServicesPage() {
  const { hero, ctas, mostRequestedLabel, serviceCtas } = servicesPage;
  const total = String(servicesOverview.length).padStart(2, "0");

  return (
    <>
      <PageHero {...hero} actions={ctas} />

      <div className="py-16 sm:py-20 lg:py-28">
        <Container>
          {/* On laptops each card sticks a little lower than the last, so they stack as you scroll. */}
          <ol className="flex flex-col gap-6 lg:gap-10">
            {servicesOverview.map((service, i) => (
              <li
                key={service.slug}
                data-reveal
                className="lg:sticky"
                style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
              >
                <article
                  aria-labelledby={`${service.slug}-title`}
                  className={cn(
                    "group relative grid gap-8 overflow-hidden rounded-3xl border border-line bg-background p-6 shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-brand-300 hover:shadow-lift sm:p-10 lg:grid-cols-12 lg:gap-12 dark:hover:border-brand-700",
                    service.mostRequested && "ring-2 ring-primary",
                  )}
                >
                  <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-200/40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-brand-900/40" />

                  <div className="flex flex-col gap-4 lg:col-span-7">
                    <div className="flex items-center justify-between gap-4">
                      <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-white shadow-glow transition-[rotate,scale] duration-300 ease-smooth group-hover:scale-105 group-hover:-rotate-6">
                        <Icon name={SERVICE_ICONS[service.slug]} className="size-6" />
                      </span>
                      <div className="flex items-center gap-3">
                        {service.mostRequested && <Badge variant="solid">{mostRequestedLabel}</Badge>}
                        <span aria-hidden className="font-display text-sm font-bold text-muted">
                          {String(i + 1).padStart(2, "0")} / {total}
                        </span>
                      </div>
                    </div>
                    <h2 id={`${service.slug}-title`} className="text-display-3 font-bold">
                      {service.name}
                    </h2>
                    <p className="font-semibold text-link">{service.tagline}</p>
                    <p className="text-muted">{service.description}</p>
                    <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                      <Button href={serviceCtas.getStarted.href} block>
                        {serviceCtas.getStarted.label}
                      </Button>
                      <Button href={`/services/${service.slug}`} variant="secondary" block aria-label={`${serviceCtas.learnMore}: ${service.name}`}>
                        {serviceCtas.learnMore}
                        <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>

                  <ul className="flex flex-col justify-center gap-3 rounded-2xl border border-line bg-surface p-6 lg:col-span-5">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-soft text-soft-foreground">
                          <Icon name="check" className="size-3" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </Container>
      </div>

      <CTABanner />
    </>
  );
}
