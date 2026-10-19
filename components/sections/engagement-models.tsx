import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { engagementModels } from "@/content/home";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

// Decorative icon per model, in content order: Staff Augmentation, MVP, AI-Powered Applications.
const MODEL_ICONS: IconName[] = ["users", "rocket", "sparkles"];

export function EngagementModels() {
  const { heading, models } = engagementModels;
  return (
    <Section labelledBy="engagement-title">
      <SectionHeading id="engagement-title" {...heading} />
      <ul className="mt-12 grid gap-6 lg:grid-cols-3">
        {models.map((model, i) => {
          // The model with a badge (the 80-hour MVP) is the featured one, as on codenax.com.
          const featured = "badge" in model;
          return (
            <li
              key={model.name}
              data-reveal
              style={revealDelay(i, 120)}
              className={cn("relative h-full", featured && "lg:-mt-3")}
            >
              {featured && (
                <div aria-hidden className="bg-brand-gradient absolute -inset-3 rounded-[1.75rem] opacity-25 blur-xl" />
              )}
              <Card
                interactive
                className={cn(
                  "flex h-full flex-col gap-5",
                  // Ring, not border colour: Card already sets border-line and cn() doesn't merge classes.
                  featured && "ring-2 ring-primary",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-xl",
                      featured ? "bg-brand-gradient text-white shadow-glow" : "bg-soft text-soft-foreground",
                    )}
                  >
                    <Icon name={MODEL_ICONS[i]} className="size-6" />
                  </span>
                  {"badge" in model && <Badge variant="solid">{model.badge}</Badge>}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-display-3 font-bold">{model.name}</h3>
                  <p className="font-semibold text-link">{model.tagline}</p>
                </div>
                <p className="text-muted">{model.description}</p>
                <ul className="flex flex-col gap-2.5 border-t border-line pt-5">
                  {model.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm font-medium">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-soft text-soft-foreground">
                        <Icon name="check" className="size-3" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Button href={model.cta.href} variant={featured ? "primary" : "secondary"} block>
                    {model.cta.label}
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </Button>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
