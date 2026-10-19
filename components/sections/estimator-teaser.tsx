import { pricingPage } from "@/content/pricing";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

/** Short band pointing to /estimate. Copy is the estimator prompt from codenax.com/pricing. */
export function EstimatorTeaser() {
  const { title, description, cta } = pricingPage.estimatorPrompt;
  return (
    <section aria-labelledby="estimator-teaser-title" className="py-12 sm:py-16">
      <Container>
        <div data-reveal className="flex flex-col items-start gap-6 rounded-3xl border border-line bg-soft p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2">
            <h2 id="estimator-teaser-title" className="text-display-3 font-bold text-foreground">
              {title}
            </h2>
            <p className="text-lead text-muted">{description}</p>
          </div>
          <div className="w-full shrink-0 sm:w-auto">
            <Button href={cta.href} size="lg" block>
              {cta.label}
              <Icon name="arrow-right" className="size-4" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
