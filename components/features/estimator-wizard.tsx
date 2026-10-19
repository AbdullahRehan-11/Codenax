"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { estimatorFeatures, estimatorPage, estimatorRules, projectTypes } from "@/content/estimator";
import { estimate, formatUsd } from "@/lib/estimate";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";

// Decorative icon per option, keyed by id.
const TYPE_ICONS: Record<string, IconName> = {
  saas: "globe",
  marketplace: "shopping-bag",
  mobile: "smartphone",
  "ai-assistant": "sparkles",
  "internal-tool": "code",
};

// Our label: the site's button ("Email me this estimate") needs a backend, so the estimate
// is carried to the contact form in the URL instead (PROJECT-PLAN.md, Constraints).
const CONTINUE_LABEL = "Continue to contact";

/** The two-step estimator: one project type, any features, and a live summary beside them. */
export function EstimatorWizard() {
  const { steps, result } = estimatorPage;
  const [type, setType] = useState(estimatorRules.defaultProjectType);
  const [features, setFeatures] = useState<string[]>(estimatorRules.defaultFeatures);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [summaryVisible, setSummaryVisible] = useState(true);

  const { hours, low, high, fitsSprint } = estimate(type, features);
  const price = `${formatUsd(low)} – ${formatUsd(high)}`;
  const sprintShare = Math.min(hours / estimatorRules.mvpSprintHours, 1);

  // The phone bottom bar only shows while the full summary is off screen.
  useEffect(() => {
    const node = summaryRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setSummaryVisible(entry.isIntersecting), {
      threshold: 0.15,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggle(id: string) {
    setFeatures((list) => (list.includes(id) ? list.filter((f) => f !== id) : [...list, id]));
  }

  // The estimate travels to the contact form as plain text in the URL; nothing is stored.
  const typeLabel = projectTypes.find((t) => t.id === type)?.label ?? "";
  const chosen = estimatorFeatures.filter((f) => features.includes(f.id)).map((f) => `+ ${f.label}`);
  const details = [
    typeLabel,
    ...chosen,
    "",
    `${result.title}: ${hours} ${result.hoursLabel}`,
    `${result.priceLabel}: ${price}`,
  ].join("\n");
  const continueHref = `/contact?details=${encodeURIComponent(details)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
      <div className="flex flex-col gap-10 lg:col-span-7 xl:col-span-8">
        <fieldset>
          <legend className="flex items-center gap-3 text-xl font-bold">
            <StepDot done />
            {steps.projectType}
          </legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {projectTypes.map((option) => {
              const on = option.id === type;
              return (
                <label
                  key={option.id}
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 transition-[border-color,background-color,box-shadow,translate] duration-200 has-focus-visible:ring-4 has-focus-visible:ring-ring/30",
                    on
                      ? "border-primary bg-soft/60 shadow-glow"
                      : "border-line bg-background hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-700",
                  )}
                >
                  <input
                    type="radio"
                    name="project-type"
                    value={option.id}
                    checked={on}
                    onChange={() => setType(option.id)}
                    className="sr-only"
                  />
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl transition-colors duration-200",
                      on ? "bg-brand-gradient text-white" : "bg-soft text-soft-foreground",
                    )}
                  >
                    <Icon name={TYPE_ICONS[option.id] ?? "box"} className="size-5" />
                  </span>
                  <span className="font-semibold">{option.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "ml-auto grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors",
                      on ? "border-primary" : "border-line-strong",
                    )}
                  >
                    <span className={cn("size-2.5 rounded-full bg-primary transition-[scale] duration-200", on ? "scale-100" : "scale-0")} />
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="flex items-center gap-3 text-xl font-bold">
            <StepDot done={features.length > 0} />
            {steps.features}
          </legend>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {estimatorFeatures.map((option) => {
              const on = features.includes(option.id);
              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3.5 rounded-2xl border p-4 transition-[border-color,background-color,translate] duration-200 has-focus-visible:ring-4 has-focus-visible:ring-ring/30",
                    on
                      ? "border-primary bg-soft/60"
                      : "border-line bg-background hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-700",
                  )}
                >
                  <input type="checkbox" checked={on} onChange={() => toggle(option.id)} className="sr-only" />
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-lg border-2 transition-colors duration-200",
                      on ? "border-primary bg-primary text-on-primary" : "border-line-strong text-transparent",
                    )}
                  >
                    <Icon name="check" className="size-3.5" />
                  </span>
                  <span className="font-medium">{option.label}</span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* Summary: sticky beside the steps on laptops, after them on phones. */}
      <div ref={summaryRef} id="estimate-summary" className="scroll-mt-24 lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
        <section
          aria-labelledby="estimate-title"
          className="relative isolate overflow-hidden rounded-3xl bg-brand-950 p-7 text-white shadow-lift sm:p-8"
        >
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-20" />
          <div aria-hidden className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-brand-500/40 blur-3xl" />

          <h2 id="estimate-title" className="text-eyebrow font-semibold text-brand-200 uppercase">
            {result.title}
          </h2>
          {/* aria-live: screen readers hear the new total after each change. */}
          <div aria-live="polite" aria-atomic className="mt-4">
            <p className="flex items-baseline gap-3">
              <span key={hours} className="animate-fade-up font-display text-6xl font-bold tabular-nums">
                {hours}
              </span>
              <span className="text-brand-100">{result.hoursLabel}</span>
            </p>

            {/* How much of one 80-hour sprint the build fills. */}
            <div aria-hidden className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={cn(
                  "h-full origin-left rounded-full transition-[scale] duration-500 ease-smooth",
                  fitsSprint ? "bg-brand-gradient" : "bg-amber-400",
                )}
                style={{ scale: `${sprintShare} 1` }}
              />
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-sm text-brand-200">{result.priceLabel}</p>
              {/* key replays the fade whenever the price changes. */}
              <p key={price} className="mt-1 animate-fade-up font-display text-3xl font-bold tabular-nums">
                {price}
              </p>
            </div>

            <p
              className={cn(
                "mt-6 flex items-start gap-3 rounded-2xl p-4 text-sm font-medium",
                fitsSprint ? "bg-emerald-400/15 text-emerald-100" : "bg-amber-400/15 text-amber-100",
              )}
            >
              <Icon
                name={fitsSprint ? "rocket" : "alert-circle"}
                className={cn("mt-0.5 size-5", fitsSprint ? "text-emerald-300" : "text-amber-300")}
              />
              {fitsSprint ? result.fitsSprint : result.exceedsSprint}
            </p>
          </div>

          <Button href={continueHref} size="lg" className="mt-7 w-full">
            {CONTINUE_LABEL}
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Disclaimer text={result.disclaimer} />
        </section>
      </div>

      {/* Phones and tablets: a slim live total while the summary is off screen. */}
      <div
        inert={summaryVisible}
        className={cn(
          "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 transition-[opacity,translate] duration-300 ease-smooth lg:hidden",
          summaryVisible ? "translate-y-[calc(100%+1.5rem)] opacity-0" : "translate-y-0 opacity-100",
        )}
      >
        <a
          href="#estimate-summary"
          className="mx-auto flex max-w-md items-center gap-3 rounded-full bg-brand-950 py-2 pr-2 pl-5 text-white shadow-lift"
        >
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-semibold tabular-nums">
              {hours} h · {price}
            </span>
            <span className="truncate text-xs text-brand-200">{result.priceLabel}</span>
          </span>
          <span className="ml-auto grid size-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
            <Icon name="chevron-down" className="size-4" />
            <span className="sr-only">{result.title}</span>
          </span>
        </a>
      </div>
    </div>
  );
}

function StepDot({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 place-items-center rounded-full transition-colors duration-200",
        done ? "bg-brand-gradient text-white" : "border border-line-strong text-muted",
      )}
    >
      <Icon name="check" className="size-3.5" />
    </span>
  );
}

/** The site's disclaimer; its closing "book a call" becomes a link to /contact. */
function Disclaimer({ text }: { text: string }) {
  const marker = "Or book a call.";
  const [before] = text.split(marker);
  return (
    <p className="mt-4 text-center text-xs text-brand-200">
      {before}
      {text.includes(marker) && (
        <Link href="/contact" className="font-semibold text-white underline underline-offset-4">
          {marker}
        </Link>
      )}
    </p>
  );
}
