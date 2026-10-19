import { ctaBanner } from "@/content/cta";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

/** The closing call to action that ends almost every page on codenax.com. */
export function CTABanner() {
  const { title, description, email, whatsapp, note } = ctaBanner;
  return (
    <section aria-labelledby="cta-title" className="pb-16 sm:pb-20 lg:pb-28">
      <Container>
        <div data-reveal className="relative isolate overflow-hidden rounded-3xl bg-brand-950 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-20" />
          <div aria-hidden className="absolute -top-24 left-1/2 -z-10 size-96 -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl" />
          <h2 id="cta-title" className="text-display-2 font-bold">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lead text-brand-100">{description}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={email.href} size="lg" block>
              <Icon name="mail" className="size-4" />
              {email.label}
            </Button>
            <Button href={whatsapp.href} variant="secondary" size="lg" block>
              <Icon name="whatsapp" className="size-4" />
              {whatsapp.label}
            </Button>
          </div>
          <p className="mt-6 text-sm text-brand-200">{note}</p>
        </div>
      </Container>
    </section>
  );
}
