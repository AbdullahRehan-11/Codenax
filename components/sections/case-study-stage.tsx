"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type FocusEvent, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export type StageItem = {
  slug: string;
  client: string;
  industry: string;
  engagement: string;
  title: string;
  summary: string;
  image: StaticImageData;
  chips: string[];
};

const SLIDE_MS = 6000;
// Where the tech chips float around the screenshot (laptops and up).
const CHIP_SPOTS = ["top-2 right-4", "bottom-12 -left-3", "-bottom-3 right-16"];

/**
 * A large "stage" for the selected case study plus a thumbnail strip of all of them.
 * Thumbnails are tabs (arrow keys move between them). The stage advances on its own;
 * the progress bar's animationend drives the next slide, so pausing the animation pauses it.
 * Hover or keyboard focus pauses; reduced motion turns autoplay and the tilt off.
 */
export function CaseStudyStage({ items, cardCta }: { items: StageItem[]; cardCta: string }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = playing && !reducedMotion;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const shot = useRef<HTMLDivElement>(null);
  const item = items[active];

  const go = (index: number) => setActive((index + items.length) % items.length);

  function onTabKeyDown(event: KeyboardEvent, index: number) {
    const next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: items.length - 1 }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const target = (next + items.length) % items.length;
    go(target);
    tabs.current[target]?.focus();
  }

  // Gentle 3D tilt that follows the pointer (written to CSS variables, no re-render).
  function onTilt(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType !== "mouse" || !shot.current) return;
    const box = shot.current.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    shot.current.style.setProperty("--ry", `${x * 10}deg`);
    shot.current.style.setProperty("--rx", `${-y * 8}deg`);
  }
  function resetTilt() {
    shot.current?.style.setProperty("--ry", "-6deg");
    shot.current?.style.setProperty("--rx", "2deg");
  }

  function onBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
  }

  return (
    <div
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={onBlur}
    >
      {/* ---------- Stage ---------- */}
      <div
        id="case-stage"
        role="tabpanel"
        aria-labelledby={`case-tab-${item.slug}`}
        className="relative grid items-center gap-8 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-11"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/3 right-0 size-[34rem] translate-x-1/4 rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-900/40"
        />
        <span className="absolute top-6 right-7 hidden font-mono text-sm text-muted sm:block">
          {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>

        {/* key={slug} remounts the content, replaying the fade-up for each new project. */}
        <div key={`info-${item.slug}`} className="relative order-2 flex animate-fade-up flex-col items-start gap-4 lg:order-1 lg:col-span-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{item.engagement}</Badge>
            <span className="text-sm text-muted">{item.industry}</span>
          </div>
          <p className="font-display font-bold text-link">{item.client}</p>
          <h3 className="text-display-3 font-bold">{item.title}</h3>
          <p className="text-muted sm:text-lg">{item.summary}</p>
          <Button href={`/case-studies/${item.slug}`} className="mt-2">
            {cardCta}
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>

        <div
          ref={shot}
          onPointerMove={onTilt}
          onPointerLeave={resetTilt}
          className="relative order-1 [--rx:2deg] [--ry:-6deg] [perspective:1200px] lg:order-2 lg:col-span-7"
        >
          <div
            key={`shot-${item.slug}`}
            className="animate-fade-up transition-transform duration-300 ease-out [transform:rotateX(var(--rx))_rotateY(var(--ry))] motion-reduce:[transform:none]"
          >
            {/* The screenshots are on white, so they sit in a white frame in both themes. */}
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lift">
              <Image
                src={item.image}
                alt={`${item.client} product screenshots`}
                sizes="(min-width: 1024px) 55vw, 100vw"
                placeholder="blur"
                className="h-auto w-full rounded-xl"
              />
            </div>
          </div>
          {item.chips.map((chip, i) => (
            <span
              key={`${item.slug}-${chip}`}
              aria-hidden
              style={{ animationDelay: `${200 + i * 120}ms` }}
              className={cn(
                // z-10 + translate-z keep chips in front of the tilted screenshot in 3D space.
                "absolute z-10 hidden animate-fade-up rounded-full border border-line bg-background px-3.5 py-2 text-sm font-semibold shadow-lift [transform:translateZ(60px)] lg:block",
                CHIP_SPOTS[i],
              )}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Thumbnails (tabs) ---------- */}
      <div className="mt-4 flex items-center gap-3">
        <div
          role="tablist"
          aria-label="Case studies"
          className="scrollbar-none -mx-4 flex flex-1 snap-x gap-3 overflow-x-auto px-4 py-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-8 lg:overflow-visible lg:px-0"
        >
          {items.map((study, i) => {
            const selected = i === active;
            return (
              <button
                key={study.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                id={`case-tab-${study.slug}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="case-stage"
                tabIndex={selected ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={cn(
                  "relative w-36 shrink-0 snap-start overflow-hidden rounded-2xl border bg-background p-2 text-left transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-0.5 lg:w-auto",
                  selected ? "border-primary ring-2 ring-primary" : "border-line hover:border-brand-300",
                )}
              >
                <span className="relative block aspect-[16/10] overflow-hidden rounded-xl bg-white">
                  <Image src={study.image} alt="" fill sizes="10rem" className="object-cover" />
                </span>
                <span
                  className={cn(
                    "mt-1.5 block truncate px-0.5 text-xs font-semibold",
                    selected ? "text-foreground" : "text-muted",
                  )}
                >
                  {study.client}
                </span>
                {/* Progress bar: its animationend advances the stage. */}
                {selected && autoplay && (
                  <span
                    aria-hidden
                    key={`bar-${active}`}
                    onAnimationEnd={() => go(active + 1)}
                    style={{ animationDuration: `${SLIDE_MS}ms`, animationPlayState: interacting ? "paused" : "running" }}
                    className="bg-brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left animate-[progress_linear_both]"
                  />
                )}
              </button>
            );
          })}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause case studies" : "Play case studies"}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
          >
            <Icon name={playing ? "pause" : "play"} className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
