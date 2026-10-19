import Link from "next/link";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { serviceHighlights } from "@/content/home";
import { Button } from "@/components/ui/button";
import { SERVICE_ICONS as ICONS } from "@/lib/media";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/** "What we do": AI Development as the large lead tile, the other five around it. */
export function ServicesBento() {
  const { heading, items, cta } = serviceHighlights;
  const [lead, ...rest] = items;
  return (
    <Section tone="surface" labelledBy="services-title">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading id="services-title" {...heading} />
        <div className="shrink-0">
          <Button href={cta.href} variant="secondary">
            {cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <li
          data-reveal
          className="group relative overflow-hidden rounded-3xl bg-brand-950 p-7 text-white sm:p-9 md:col-span-2 lg:row-span-2"
        >
          {/* Decoration: glow, faint grid and orbit rings around a large sparkle. */}
          <div aria-hidden className="absolute -right-24 -bottom-24 size-80 rounded-full bg-brand-500/30 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
          <div aria-hidden className="bg-grid absolute inset-0 opacity-15" />
          <div aria-hidden className="absolute top-1/2 right-[-6rem] hidden -translate-y-1/2 sm:block">
            <div className="relative grid size-80 place-items-center rounded-full border border-white/10">
              <div className="grid size-56 place-items-center rounded-full border border-white/10">
                <div className="grid size-32 place-items-center rounded-full border border-white/15 bg-white/5">
                  <Icon
                    name="sparkles"
                    className="size-12 text-brand-300 transition-transform duration-700 ease-smooth group-hover:rotate-12 group-hover:scale-110"
                  />
                </div>
              </div>
              <span className="absolute top-6 left-12 size-2 rounded-full bg-brand-300" />
              <span className="absolute right-16 bottom-10 size-1.5 rounded-full bg-white/60" />
            </div>
          </div>
          <div className="relative flex h-full flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-brand-300">
                <Icon name={ICONS[lead.slug]} className="size-6" />
              </span>
              {lead.badge && (
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-brand-100">
                  {lead.badge}
                </span>
              )}
            </div>
            <h3 className="text-display-2 font-bold">{lead.name}</h3>
            <p className="max-w-lg text-lead text-brand-100">{lead.description}</p>
            {lead.points && (
              <ul className="flex flex-col gap-3">
                {lead.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 font-medium">
                    <Icon name="check" className="size-4 text-brand-300" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-auto pt-4">
              <Button href={`/services/${lead.slug}`}>
                {lead.cta}
                <Icon name="arrow-right" className="size-4" />
              </Button>
            </div>
          </div>
        </li>

        {rest.map((service, i) => (
          <li
            key={service.slug}
            data-reveal
            style={revealDelay(i + 1)}
            className={cn(i === rest.length - 1 && "md:col-span-2 lg:col-span-1")}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group relative isolate flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-line bg-background p-7 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
            >
              <span
                aria-hidden
                className="absolute -top-16 -right-16 -z-10 size-40 rounded-full bg-brand-300/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-300/30 dark:group-hover:bg-brand-700/40"
              />
              <span className="grid size-11 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-on-primary">
                <Icon name={ICONS[service.slug]} />
              </span>
              <h3 className="text-xl font-bold">{service.name}</h3>
              <p className="text-muted">{service.description}</p>
              <div className="mt-auto flex items-end justify-between gap-3 pt-2">
                {/* Short labels the same cards show on codenax.com (no scores or ratings). */}
                {service.tags ? (
                  <ul className="flex flex-wrap gap-1.5">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-muted"
                      >
                        <span aria-hidden className="size-1.5 rounded-full bg-success" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span />
                )}
                <Icon
                  name="arrow-up-right"
                  className="size-5 shrink-0 text-link transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
