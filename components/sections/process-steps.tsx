"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Icon, type IconName } from "@/components/ui/icon";

export type ProcessStepItem = {
  number: string;
  name: string;
  tagline: string;
  summary: string;
  icon: IconName;
  /** One-shot animation class played on the icon when this stage becomes current. */
  motion: string;
};

type ProcessStepsProps = {
  steps: ProcessStepItem[];
  /** The section heading, rendered on the server and pinned beside the steps on laptops. */
  heading: ReactNode;
};

/**
 * Scroll-driven timeline. As the page scrolls, a gradient line fills down the rail and the
 * stage whose icon has passed the middle of the screen becomes current: earlier stages are
 * "done", later ones are faded until reached (or hovered).
 *
 * `active` is null until the first scroll measurement and under reduced motion; in that
 * "static" state every stage is shown in full and the line is complete.
 */
export function ProcessSteps({ steps, heading }: ProcessStepsProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [measured, setMeasured] = useState<number | null>(null);
  const active = reducedMotion ? null : measured;

  useEffect(() => {
    const list = listRef.current;
    if (reducedMotion || !list) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const listTop = list.getBoundingClientRect().top;
      const centers = Array.from(list.querySelectorAll<HTMLElement>("[data-tile]"), (tile) => {
        const r = tile.getBoundingClientRect();
        return r.top + r.height / 2 - listTop;
      });
      const first = centers[0];
      const last = centers[centers.length - 1];
      // The point on screen (55% down) that the line fills towards, in list coordinates.
      const anchor = window.innerHeight * 0.55 - listTop;
      const progress = Math.min(Math.max((anchor - first) / (last - first), 0), 1);

      // Written straight to CSS variables so scrolling never re-renders React.
      list.style.setProperty("--rail-top", `${first}px`);
      list.style.setProperty("--rail-h", `${last - first}px`);
      list.style.setProperty("--fill", String(progress));
      setMeasured(centers.findLastIndex((c) => c <= anchor));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion]);

  const shownStage = Math.max(active ?? 0, 0) + 1;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
      <div className="self-start lg:sticky lg:top-28">
        {heading}
        {/* Visual progress only; the list itself carries the content. */}
        {active !== null && (
          <div aria-hidden className="mt-8 hidden items-center gap-3 text-sm font-semibold text-muted lg:flex">
            <span className="h-1 w-40 overflow-hidden rounded-full bg-line">
              <span
                className="bg-brand-gradient block h-full origin-left rounded-full transition-[scale] duration-500 ease-smooth"
                style={{ scale: `${(active + 1) / steps.length} 1` }}
              />
            </span>
            Stage {String(shownStage).padStart(2, "0")} of {String(steps.length).padStart(2, "0")}
          </div>
        )}
      </div>

      <ol ref={listRef} className="relative flex flex-col gap-3">
        {/* Rail and its fill run between the first and last icon centres (measured in JS). */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-[var(--rail-top,1.75rem)] left-[1.3125rem] h-[var(--rail-h,calc(100%-3.5rem))] w-0.5 bg-line sm:left-[1.5625rem]"
        />
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-[var(--rail-top,1.75rem)] left-[1.3125rem] h-[var(--rail-h,calc(100%-3.5rem))] w-0.5 origin-top bg-linear-to-b from-brand-500 to-royal-600 shadow-[0_0_12px_var(--color-brand-500)] sm:left-[1.5625rem]",
            active === null ? "scale-y-100" : "scale-y-(--fill)",
          )}
        />

        {steps.map((step, i) => {
          const state = active === null || i < active ? "done" : i === active ? "active" : "todo";
          return (
            <li key={step.number} data-reveal style={revealDelay(i)} className="group relative pl-15 sm:pl-21">
              <span
                data-tile
                aria-hidden
                className={cn(
                  "absolute top-3 left-0 z-10 grid size-11 place-items-center rounded-2xl border transition-[background-color,border-color,color,box-shadow,scale,translate,rotate] duration-300 ease-smooth sm:top-4 sm:size-13",
                  "motion-safe:group-hover:-translate-y-0.75 motion-safe:group-hover:-rotate-8",
                  state === "todo"
                    ? "border-line bg-background text-muted group-hover:border-brand-300 group-hover:bg-brand-50 group-hover:text-link group-hover:shadow-glow dark:group-hover:bg-brand-950"
                    : "bg-brand-gradient border-transparent text-white",
                  state === "active" && "scale-108 shadow-glow ring-7 ring-brand-500/15",
                )}
              >
                <Icon name={step.icon} className={cn("size-5.5 sm:size-6", state === "active" && step.motion)} />
              </span>

              <div
                className={cn(
                  "rounded-3xl border p-4 transition-[background-color,border-color,box-shadow] duration-500 ease-smooth sm:px-6 sm:py-5",
                  state === "active"
                    ? "border-brand-200 bg-background shadow-glow dark:border-brand-800"
                    : "border-transparent",
                )}
              >
                {/* Upcoming stages are quieter by colour, not opacity, so every line keeps 4.5:1 contrast. */}
                <h3
                  className={cn(
                    "flex items-baseline gap-3 text-xl font-bold transition-colors duration-500 sm:text-2xl",
                    state === "todo" && "text-muted group-hover:text-foreground",
                  )}
                >
                  <span className={cn("font-display", state === "todo" ? "text-muted" : "text-gradient")}>
                    {step.number}
                  </span>
                  {step.name}
                </h3>
                <p className="mt-1.5 font-semibold text-link">{step.tagline}</p>
                <p className="mt-1.5 text-muted">{step.summary}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
