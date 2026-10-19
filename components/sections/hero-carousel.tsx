"use client";

import Image from "next/image";
import { useEffect, useState, type FocusEvent } from "react";
import officeOne from "@/public/images/hero/office-1.jpg";
import officeTwo from "@/public/images/hero/office-2.jpg";
import { cn } from "@/lib/cn";
import { heroSlides, homeMeta } from "@/content/home";
import { heroStats } from "@/content/stats";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { StatValue } from "./stats";

const SLIDE_MS = 7000;
// Decorative icon per slide (AI & Automation, MVP in 80 Hours, Dedicated Teams).
const SLIDE_ICONS: IconName[] = ["sparkles", "rocket", "users"];
// Background photos (Unsplash, as used on codenax.com); slides alternate between them.
const HERO_PHOTOS = [officeOne, officeTwo];

/**
 * Home hero: the three slides from codenax.com, rotating every 7s. Rotation pauses while the
 * pointer or keyboard focus is inside, can be stopped with the pause button, and never runs
 * for visitors who prefer reduced motion.
 */
export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = playing && !reducedMotion;

  useEffect(() => {
    if (!autoplay || interacting) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % heroSlides.length), SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay, interacting]);

  function onBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={onBlur}
    >
      <h1 id="hero-title" className="sr-only">
        {homeMeta.title}
      </h1>

      {/* Decorative backdrop: the office photos from codenax.com's hero, washed out under a
          gradient so text stays readable; each slide cross-fades to its photo. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {heroSlides.map((slide, i) => (
          <Image
            key={slide.eyebrow}
            src={HERO_PHOTOS[i % HERO_PHOTOS.length]}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={cn(
              "object-cover grayscale-[30%] transition-opacity duration-1000 ease-smooth",
              i === active ? "opacity-35 dark:opacity-20" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
        <div className="absolute -top-32 right-[-10%] size-[36rem] rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-900/40" />
        <div className="absolute bottom-[-20%] left-[-10%] size-[28rem] rounded-full bg-royal-500/10 blur-3xl" />
      </div>

      <Container className="pt-10 pb-12 sm:pt-16 lg:pt-20 lg:pb-16">
        {/* All slides share one grid cell, so the hero keeps the height of the tallest slide. */}
        <div className="grid">
          {heroSlides.map((slide, i) => {
            const isActive = i === active;
            return (
              <div
                key={slide.eyebrow}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${heroSlides.length}`}
                inert={!isActive}
                className={cn(
                  "col-start-1 row-start-1 grid items-center gap-10 transition-[opacity,translate] duration-700 ease-smooth lg:grid-cols-12 lg:gap-12",
                  isActive ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
                )}
              >
                {/* Children animate in each time their slide becomes active (the class is only set then). */}
                <div className="flex flex-col items-start gap-6 lg:col-span-7">
                  <div className={cn(isActive && "animate-fade-up")}>
                    <Badge>{slide.eyebrow}</Badge>
                  </div>
                  <h2
                    className={cn("text-display-1 font-bold", isActive && "animate-fade-up [animation-delay:80ms]")}
                  >
                    {slide.title} <span className="text-gradient">{slide.highlight}</span>
                  </h2>
                  <p
                    className={cn(
                      "max-w-xl text-lead text-muted",
                      isActive && "animate-fade-up [animation-delay:160ms]",
                    )}
                  >
                    {slide.description}
                  </p>
                  <div
                    className={cn(
                      "flex w-full flex-col gap-3 sm:w-auto sm:flex-row",
                      isActive && "animate-fade-up [animation-delay:240ms]",
                    )}
                  >
                    <Button href={slide.cta.href} size="lg" block>
                      {slide.cta.label}
                      <Icon name="arrow-right" className="size-4" />
                    </Button>
                    <Button href="/estimate" variant="secondary" size="lg" block>
                      Get an estimate
                    </Button>
                  </div>
                </div>

                <div className="relative lg:col-span-5">
                  {/* Depth: a soft brand glow and a second card peeking out behind the main one. */}
                  <div aria-hidden className="bg-brand-gradient absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl dark:opacity-30" />
                  <div
                    aria-hidden
                    className="absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-3xl border border-line bg-surface/70"
                  />
                  <div className="relative overflow-hidden rounded-3xl border border-line bg-background/90 shadow-lift backdrop-blur-md">
                    <div aria-hidden className="bg-brand-gradient h-1" />
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                          <span aria-hidden className="relative flex size-2">
                            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                            <span className="relative inline-flex size-2 rounded-full bg-success" />
                          </span>
                          {slide.card.label}
                        </p>
                        <span aria-hidden className="flex gap-1.5">
                          <span className="size-2.5 rounded-full bg-line-strong" />
                          <span className="size-2.5 rounded-full bg-line-strong" />
                          <span className="size-2.5 rounded-full bg-line-strong" />
                        </span>
                      </div>
                      <ul className="mt-6 flex flex-col gap-3">
                        {slide.card.points.map((point, p) => (
                          <li
                            key={point}
                            style={isActive ? { animationDelay: `${300 + p * 90}ms` } : undefined}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border border-line bg-surface/60 px-3 py-2.5 font-medium",
                              isActive && "animate-fade-up",
                            )}
                          >
                            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-on-primary">
                              <Icon name="check" className="size-4" />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Floating label: the slide's own eyebrow text. */}
                  <div
                    aria-hidden
                    className="absolute -top-4 -left-3 hidden animate-float items-center gap-2 rounded-full border border-line bg-background px-3.5 py-2 text-xs font-semibold shadow-lift sm:flex"
                  >
                    <span className="grid size-6 place-items-center rounded-full bg-soft text-soft-foreground">
                      <Icon name={SLIDE_ICONS[i]} className="size-3.5" />
                    </span>
                    {slide.eyebrow}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The site's three stats; outside the slides, so they stay while slides change. */}
        <ul
          aria-label="CodeNax in numbers"
          className="mt-10 grid max-w-xl animate-fade-up grid-cols-3 border-t border-line pt-6 [animation-delay:300ms] lg:max-w-[min(36rem,58%)]"
        >
          {heroStats.map((stat, i) => (
            <li key={stat.label} className={cn("flex flex-col gap-1.5 pr-3 sm:pr-5", i > 0 && "border-l border-line pl-3 sm:pl-5")}>
              <StatValue value={stat.value} start="load" className="font-display text-2xl leading-none font-bold sm:text-4xl" />
              <span className="text-xs text-muted sm:text-sm">{stat.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center gap-2">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.eyebrow}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${slide.eyebrow} slide`}
                aria-current={i === active}
                className="group grid h-11 place-items-center px-1"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-[width,background-color] duration-300 ease-smooth",
                    i === active ? "w-8 bg-primary" : "w-2 bg-line-strong group-hover:bg-muted",
                  )}
                />
              </button>
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
            >
              <Icon name={playing ? "pause" : "play"} className="size-4" />
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
