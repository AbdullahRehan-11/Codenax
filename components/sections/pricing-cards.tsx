import { pricingPage, pricingPlans } from "@/content/pricing";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";

// Decorative icon per plan, in content order: Rapid MVP, Staff Augmentation, AI & Custom Build.
const PLAN_ICONS: IconName[] = ["rocket", "users", "sparkles"];

/** The three engagement models. The most popular one is lifted and outlined in the brand gradient. */
export function PricingCards() {
  return (
    <ul className="grid gap-6 lg:grid-cols-3 lg:items-center">
      {pricingPlans.map((plan, i) => {
        const featured = plan.mostPopular;
        return (
          <li key={plan.name} data-reveal style={revealDelay(i, 120)} className="relative h-full">
            {featured && (
              <div aria-hidden className="bg-brand-gradient absolute -inset-3 rounded-[2rem] opacity-25 blur-2xl" />
            )}
            {/* Gradient border: a 2px gradient frame around the featured card. */}
            <div className={cn("relative h-full rounded-3xl", featured ? "bg-brand-gradient p-0.5" : "border border-line")}>
              <article
                className={cn(
                  "flex h-full flex-col gap-6 rounded-[calc(1.5rem-2px)] bg-background p-7 sm:p-8",
                  featured && "lg:py-10",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-xl",
                      featured ? "bg-brand-gradient text-white shadow-glow" : "bg-soft text-soft-foreground",
                    )}
                  >
                    <Icon name={PLAN_ICONS[i]} className="size-6" />
                  </span>
                  {featured && (
                    <span className="bg-brand-gradient inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white">
                      <Icon name="sparkles" className="size-3.5" />
                      {pricingPage.mostPopularLabel}
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="text-display-3 font-bold">{plan.name}</h2>
                  <p className="mt-1 font-semibold text-link">{plan.tagline}</p>
                </div>

                <div className="rounded-2xl bg-surface p-5">
                  <p className={cn("font-display text-3xl font-bold sm:text-4xl", featured && "text-gradient")}>{plan.priceLabel}</p>
                  <p className="mt-1 text-sm text-muted">{plan.priceNote}</p>
                </div>

                <ul className="flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-[0.9375rem]">
                      <span
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                          featured ? "bg-primary text-on-primary" : "bg-soft text-soft-foreground",
                        )}
                      >
                        <Icon name="check" className="size-3" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-2">
                  <Button href={plan.cta.href} variant={featured ? "primary" : "secondary"} size="lg" className="w-full">
                    {plan.cta.label}
                    <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </div>
              </article>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
