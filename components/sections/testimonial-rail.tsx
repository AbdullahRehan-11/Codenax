"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { testimonialsHeading } from "@/content/home";
import { testimonials } from "@/content/testimonials";
import { caseStudies, caseStudiesPage } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const GAP = 20; // matches gap-5
const SLIDE_MS = 6000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

/** The case study for a testimonial's company, if the site has one ("Buzup" vs "BuzUp"). */
const caseStudyFor = (company: string) =>
  caseStudies.find((study) => study.client.toLowerCase() === company.toLowerCase());

/** Splits a quote so figures like "120+" and "45%" can be highlighted. Odd items are figures. */
const splitFigures = (quote: string) => quote.split(/(\d+[+%])/);

const arrowClass =
  "grid size-11 place-items-center rounded-full border border-line-strong bg-background transition-[border-color,color,opacity] duration-200 enabled:hover:border-primary enabled:hover:text-link disabled:cursor-default disabled:opacity-40";

/**
 * Swipeable row of testimonials (CSS scroll-snap). The arrows and dots scroll by one card and
 * follow the swipe; the edges fade where more cards are hidden. On touch screens people swipe.
 */
export function TestimonialRail() {
  const railRef = useRef<HTMLUListElement>(null);
  const [rail, setRail] = useState({
    index: 0,
    pages: 1,
    atStart: true,
    atEnd: false,
  });
  const [playing, setPlaying] = useState(true);
  const [interacting, setInteracting] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const autoplay = playing && !reducedMotion;

  const step = () => (railRef.current?.querySelector("li")?.offsetWidth ?? 0) + GAP;

  // Work out which "page" is showing, how many there are and whether we're at either end.
  const sync = useCallback(() => {
    const el = railRef.current;
    const width = (el?.querySelector("li")?.offsetWidth ?? 0) + GAP;
    if (!el || width <= GAP) return;
    const max = el.scrollWidth - el.clientWidth;
    const pages = Math.ceil(max / width - 0.05) + 1;
    const atEnd = el.scrollLeft >= max - 4;
    setRail({
      pages,
      atStart: el.scrollLeft <= 4,
      atEnd,
      index: atEnd ? pages - 1 : Math.min(pages - 1, Math.round(el.scrollLeft / width)),
    });
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  // Only rotate while the rail is on screen, so visitors arrive at the first card.
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-play: one card every 6s, back to the start after the last. Any swipe, click or arrow
  // changes rail.index and so restarts the wait.
  useEffect(() => {
    if (!autoplay || interacting || !inView || rail.pages < 2) return;
    const timer = window.setTimeout(() => {
      const el = railRef.current;
      const width = (el?.querySelector("li")?.offsetWidth ?? 0) + GAP;
      if (rail.atEnd) el?.scrollTo({ left: 0, behavior: "smooth" });
      else el?.scrollBy({ left: width, behavior: "smooth" });
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [rail.index, rail.atEnd, rail.pages, autoplay, interacting, inView]);

  function scrollByCard(direction: 1 | -1) {
    railRef.current?.scrollBy({ left: direction * step(), behavior: "smooth" });
  }

  function scrollToPage(page: number) {
    railRef.current?.scrollTo({ left: page * step(), behavior: "smooth" });
  }

  function onBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setInteracting(false);
  }

  return (
    <Section tone="surface" labelledBy="testimonials-title">
      {/* Rotation pauses while the pointer or keyboard focus is inside. */}
      <div
        aria-roledescription="carousel"
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={onBlur}
      >
        <div className="flex items-end justify-between gap-6">
          <SectionHeading id="testimonials-title" {...testimonialsHeading} />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={rail.atStart}
              aria-label="Previous slide"
              className={arrowClass}
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={rail.atEnd}
              aria-label="Next slide"
              className={arrowClass}
            >
              <Icon name="chevron-right" />
            </button>
          </div>
        </div>

        {/* data-reveal="stagger": the rail reveals as one unit, then its cards rise one by one. */}
        {/* tabIndex: keyboard users can focus the rail and scroll it with the arrow keys. */}
        <ul
          ref={railRef}
          onScroll={sync}
          tabIndex={0}
          aria-labelledby="testimonials-title"
          data-reveal="stagger"
          style={
            {
              "--fade-l": rail.atStart ? "0px" : "48px",
              "--fade-r": rail.atEnd ? "0px" : "48px",
            } as CSSProperties
          }
          className="scrollbar-none mask-fade-x mt-8 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 py-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
        >
          {testimonials.map((t, i) => {
            const study = caseStudyFor(t.company);
            return (
              <li
                key={t.name}
                style={{ "--reveal-index": i } as CSSProperties}
                className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[calc((100%-2.5rem)/3)]"
              >
                <figure className="group flex h-full flex-col gap-5 rounded-3xl border border-transparent bg-soft p-7 transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700">
                  <div aria-hidden className="flex items-start justify-between gap-3">
                    <span className="text-gradient origin-bottom-left font-display text-5xl leading-none font-bold transition-transform duration-500 ease-smooth group-hover:-translate-y-0.5 group-hover:scale-115 group-hover:-rotate-6">
                      “
                    </span>
                    <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold tracking-wide text-soft-foreground">
                      {t.company}
                    </span>
                  </div>
                  <blockquote className="text-[1.0625rem] leading-relaxed font-medium text-foreground">
                    {splitFigures(t.quote).map((part, j) =>
                      j % 2 === 1 ? (
                        <strong key={j} className="text-gradient font-bold">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </blockquote>
                  {study && (
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-link underline-offset-4 hover:underline"
                    >
                      {caseStudiesPage.cardCta}
                      <Icon name="arrow-right" className="size-4" />
                    </Link>
                  )}
                  <figcaption className="mt-auto flex items-center gap-3 border-t border-line-strong pt-5">
                    <span
                      aria-hidden
                      className="bg-brand-gradient grid size-11 shrink-0 place-items-center rounded-full font-semibold text-white"
                    >
                      {initials(t.name)}
                    </span>
                    <span className="flex flex-col">
                      <span className="font-semibold">{t.name}</span>
                      <span className="text-sm text-muted">
                        {t.role}, {t.company}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {rail.pages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex gap-1" role="group" aria-label="Choose a slide">
              {Array.from({ length: rail.pages }, (_, page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => scrollToPage(page)}
                  aria-label={`Go to slide ${page + 1}`}
                  aria-current={page === rail.index}
                  className="group/dot grid size-6 place-items-center rounded-full"
                >
                  <span
                    className={cn(
                      "h-2 rounded-full transition-[width,background-color] duration-300 ease-smooth",
                      page === rail.index ? "w-5 bg-primary" : "w-2 bg-line-strong group-hover/dot:bg-brand-300",
                    )}
                  />
                </button>
              ))}
            </div>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause testimonials" : "Play testimonials"}
                className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:bg-surface-2 hover:text-foreground"
              >
                <Icon name={playing ? "pause" : "play"} className="size-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}
