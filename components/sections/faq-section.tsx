import { revealDelay } from "@/lib/reveal";
import { faqHeading } from "@/content/home";
import { homeFaqs } from "@/content/faq";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function FAQSection() {
  const { heading, aside, cta } = faqHeading;
  return (
    <Section labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading id="faq-title" {...heading} />
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-6">
            <h3 className="text-lg font-bold">{aside.title}</h3>
            <p className="text-muted">{aside.description}</p>
            <Button href={aside.cta.href} size="sm">
              {aside.cta.label}
            </Button>
          </div>
        </div>
        <div data-reveal style={revealDelay(1, 150)} className="flex flex-col gap-6 lg:col-span-7">
          <Accordion
            name="home-faq"
            items={homeFaqs.map((faq, i) => ({
              id: `faq-${i}`,
              title: faq.question,
              content: <RichText blocks={faq.answer} />,
            }))}
          />
          {/* -ml-5 lines the label up with the questions (the ghost button keeps its padding). */}
          <Button href={cta.href} variant="ghost" className="-ml-5 self-start">
            {cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
