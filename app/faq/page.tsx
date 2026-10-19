import type { Metadata } from "next";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { contactPage } from "@/content/contact";
import { faqPage, faqs } from "@/content/faq";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { FaqBrowser } from "@/components/features/faq-browser";
import { CTABanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...faqPage.meta, path: "/faq" });

export default function FaqPage() {
  const { heading, closing } = faqPage;
  // Button labels are the contact page's own channel names.
  const [email, whatsapp] = contactPage.channels;
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <PageHero {...heading} />

      <div className="py-16 sm:py-20 lg:py-24">
        <Container>
          <FaqBrowser />

          <section
            aria-labelledby="faq-closing-title"
            data-reveal
            className="mt-16 flex flex-col items-start gap-6 rounded-3xl border border-line bg-soft p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-glow">
                <Icon name="help-circle" className="size-6" />
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 id="faq-closing-title" className="text-display-3 font-bold">
                  {closing.title}
                </h2>
                <p className="text-muted">{closing.description}</p>
              </div>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={`mailto:${site.email}`} block>
                <Icon name="mail" className="size-4" />
                {email.label}
              </Button>
              <Button href={site.whatsappUrl} variant="secondary" block>
                <Icon name="whatsapp" className="size-4" />
                {whatsapp.label}
              </Button>
            </div>
          </section>
        </Container>
      </div>

      <CTABanner />
    </>
  );
}
