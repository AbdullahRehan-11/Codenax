import type { Metadata } from "next"; 
import Link from "next/link";
import { notFound } from "next/navigation";
import { faqPage } from "@/content/faq";
import { mainNav } from "@/content/nav";
import { serviceExtras, serviceItemCta, serviceStartLabel } from "@/content/service-extras";
import { getServicePage, servicePages, servicesOverview, servicesPage } from "@/content/services";
import { SERVICE_ICONS } from "@/lib/media";
import { revealDelay } from "@/lib/reveal";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceSection, hasContent, sectionId } from "@/components/sections/service-section";
import { StoryNav } from "@/components/sections/story-nav";

// Only the ten known services exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.meta.title,
    description: page.meta.description,
    path: `/services/${slug}`,
  });
}

/** The service's menu label (MVP Development is in the menu but not on /services). */
function navLabel(href: string) {
  for (const item of mainNav) {
    if (item.kind !== "menu") continue;
    for (const group of item.groups) {
      const link = group.links.find((l) => l.href === href);
      if (link) return link.label;
    }
  }
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const summary = servicesOverview.find((service) => service.slug === slug);
  const name = summary?.name ?? navLabel(`/services/${slug}`);
  const icon = SERVICE_ICONS[slug];
  const extras = serviceExtras[slug];
  // Sections with nothing to show are skipped.
  const sections = page.sections.filter(hasContent);
  const others = servicesOverview.filter((service) => service.slug !== slug);
  const faqId = "faq";
  const faqLabel = `${faqPage.heading.title} ${faqPage.heading.highlight}`;
  const jumpLinks = [
    ...sections.map((s) => ({ id: sectionId(s.heading), label: s.heading })),
    ...(page.faqs.length ? [{ id: faqId, label: faqLabel }] : []),
  ];
 
  return (
    <>
      <PageHero
        parent={{ label: "Services", href: "/services" }}
        eyebrow={extras?.eyebrow ?? name}
        title={page.title}
        description={page.intro}
        actions={extras?.ctas ?? servicesPage.ctas}
        aside={
          summary && (
            <div className="relative">
              <div aria-hidden className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-gradient opacity-15 blur-2xl" />
              <div className="rounded-3xl border border-line bg-background/90 p-7 shadow-lift backdrop-blur sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl text-white shadow-glow">
                    <Icon name={icon} className="size-7" />
                  </span>
                  {summary.mostRequested && <Badge>{servicesPage.mostRequestedLabel}</Badge>}
                </div>
                <p className="mt-6 font-display text-xl font-bold">{summary.tagline}</p>
                <ul className="mt-5 flex flex-col gap-3">
                  {summary.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-muted">
                      <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-soft text-soft-foreground">
                        <Icon name="check" className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
      />

      {/* Below xl: jump links as a scrollable chip row. From xl: a sticky list beside the sections. */}
      <nav aria-label="On this page" className="border-b border-line xl:hidden">
        <Container>
          <ul className="scrollbar-none flex gap-2 overflow-x-auto py-4">
            {jumpLinks.map((link) => (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  className="block rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-brand-300 hover:text-link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Container className="grid gap-x-12 pt-6 pb-10 xl:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden pt-16 xl:block">
          <StoryNav label="On this page" articleId="service-body" items={jumpLinks} />
        </aside>
        <div id="service-body" className="min-w-0">
          {sections.map((section, i) => (
            <ServiceSection
              key={section.heading}
              section={section}
              index={i}
              pill={extras?.sections[section.heading]?.pill}
              icons={extras?.sections[section.heading]?.icons}
              startLabel={slug === "ai-development" ? serviceStartLabel : undefined}
              itemCta={serviceItemCta}
            />
          ))}
        </div>
      </Container>

      {page.faqs.length > 0 && (
        <Section id={faqId} tone="surface" labelledBy="faq-title" className="scroll-mt-20">
          <JsonLd data={faqJsonLd(page.faqs)} />
          <div className="grid gap-10 lg:grid-cols-12">
            <SectionHeading
              id="faq-title"
              title={faqPage.heading.title}
              highlight={faqPage.heading.highlight}
              className="lg:col-span-4"
            />
            <div data-reveal className="lg:col-span-8">
              <Accordion
                name="service-faq"
                items={page.faqs.map((faq, i) => ({
                  id: `faq-${i}`,
                  title: faq.question,
                  content: <RichText blocks={faq.answer} />,
                }))}
              />
            </div>
          </div>
        </Section>
      )}

      <Section labelledBy="other-services-title">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="other-services-title" {...servicesPage.hero} description={undefined} />
          <Link
            href="/services"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start font-semibold text-link lg:self-auto"
          >
            View all services
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((service, i) => (
            <li key={service.slug} data-reveal style={revealDelay(i % 4)}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-background p-5 transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors group-hover:bg-primary group-hover:text-on-primary">
                  <Icon name={SERVICE_ICONS[service.slug]} />
                </span>
                <span className="font-bold">{service.name}</span>
                <span className="text-sm text-muted">{service.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABanner />
    </>
  );
}
