"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/types";
import { Icon, type IconName } from "@/components/ui/icon";

export type ExplorerItem = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  whatWeBuild: string[];
  image: StaticImageData;
  icon: IconName;
  related: NavLink[];
};

type Labels = {
  whatWeBuild: string;
  relatedWork: string;
  noRelatedWork: { title: string; description: string; cta: NavLink };
};

type Props = { items: ExplorerItem[]; labels: Labels };

/**
 * Laptops and up: a row of photo strips; the open one widens into a panel. Hover, click or
 * keyboard focus opens a strip, and the arrow keys move between them.
 * Phones and tablets: a stack of cards that expand when tapped (one open at a time).
 */
export function IndustryExplorerClient({ items, labels }: Props) {
  const [active, setActive] = useState(0);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  // Cards can all be closed on phones (-1); the strips always show one open.
  const openStrip = active < 0 ? 0 : active;

  function onKeyDown(event: KeyboardEvent, index: number) {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + items.length) % items.length;
    triggers.current[next]?.focus();
  }

  function onPointerEnter(event: PointerEvent, index: number) {
    if (event.pointerType === "mouse") setActive(index);
  }

  return (
    <>
      {/* ---------- Laptops and up: expanding strips ---------- */}
      <div className="hidden h-[32rem] gap-2.5 lg:flex">
        {items.map((item, i) => {
          const open = i === openStrip;
          return (
            <div
              key={item.slug}
              onPointerEnter={(e) => onPointerEnter(e, i)}
              // The open strip takes 9 shares to each closed strip's 1 (≈ half the row on laptops).
              style={{ flexGrow: open ? 9 : 1 }}
              className={cn(
                "group relative min-w-0 basis-0 overflow-hidden rounded-3xl bg-brand-950 transition-[flex-grow,box-shadow] duration-700 ease-smooth",
                open ? "shadow-lift" : "shadow-soft",
              )}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                placeholder="blur"
                className={cn(
                  "object-cover transition-[opacity,scale,filter] duration-700 ease-smooth",
                  open ? "scale-100 opacity-90" : "scale-110 opacity-45 grayscale-[40%] group-hover:opacity-60",
                )}
              />
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 transition-opacity duration-700",
                  open
                    ? "bg-linear-to-t from-brand-950 via-brand-950/70 to-brand-950/5"
                    : "bg-linear-to-t from-brand-950/95 to-brand-950/40",
                )}
              />

              {/* Trigger: covers the strip. Stays in place when open, under the panel. */}
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                aria-expanded={open}
                aria-controls={`industry-panel-${item.slug}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="absolute inset-0 z-10 cursor-pointer rounded-3xl text-white"
              >
                <span className="sr-only">{item.name}</span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-5 left-1/2 grid size-11 -translate-x-1/2 place-items-center rounded-xl bg-white/15 backdrop-blur-sm transition-opacity duration-300",
                    open && "opacity-0",
                  )}
                >
                  <Icon name={item.icon} />
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-6 left-1/2 -translate-x-1/2 rotate-180 font-semibold whitespace-nowrap transition-opacity duration-300 [writing-mode:vertical-rl]",
                    open && "opacity-0",
                  )}
                >
                  {item.name}
                </span>
              </button>

              {/* Panel: only interactive and announced while open. */}
              <div
                id={`industry-panel-${item.slug}`}
                inert={!open}
                className={cn(
                  "absolute inset-x-0 bottom-0 z-20 flex flex-col gap-4 p-8 text-white transition-[opacity,translate] ease-smooth",
                  open
                    ? "translate-y-0 opacity-100 duration-500 [transition-delay:250ms]"
                    : "pointer-events-none translate-y-4 opacity-0 duration-200",
                )}
              >
                <div className="flex items-center gap-4">
                  <span className="bg-brand-gradient grid size-13 shrink-0 place-items-center rounded-2xl shadow-glow">
                    <Icon name={item.icon} className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-2xl font-bold xl:text-display-3">
                      {/* Inline (not flex) so the arrow stays after the last word when the name wraps. */}
                      <Link href={`/industries/${item.slug}`} className="hover:underline">
                        {item.name}
                        <Icon name="arrow-up-right" className="ml-1.5 inline size-5 align-[-0.1em] text-brand-300" />
                      </Link>
                    </h3>
                    <p className="text-sm font-medium text-brand-200">{item.tagline}</p>
                  </div>
                  <span className="ml-auto shrink-0 self-start font-mono text-sm whitespace-nowrap text-white/60">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="max-w-xl text-white/85">{item.summary}</p>
                <PanelDetails item={item} labels={labels} tone="dark" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------- Phones and tablets: expanding cards ---------- */}
      <ul className="flex flex-col gap-3 lg:hidden">
        {items.map((item, i) => {
          const open = i === active;
          return (
            <li key={item.slug} className="overflow-hidden rounded-3xl border border-line bg-background shadow-soft">
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`industry-card-${item.slug}`}
                  onClick={() => setActive(open ? -1 : i)}
                  className="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left sm:px-5"
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                      open ? "bg-primary text-on-primary" : "bg-soft text-soft-foreground",
                    )}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="truncate text-sm text-muted">{item.tagline}</span>
                  </span>
                  <Icon
                    name="plus"
                    className={cn("ml-auto size-5 shrink-0 text-muted transition-transform duration-300", open && "rotate-45")}
                  />
                </button>
              </h3>
              {/* grid-rows 0fr → 1fr animates the height without measuring it. */}
              <div
                id={`industry-card-${item.slug}`}
                inert={!open}
                className={cn(
                  "grid transition-[grid-template-rows] duration-500 ease-smooth",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div className="relative mx-4 h-44 overflow-hidden rounded-2xl sm:mx-5 sm:h-56">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 90vw, 100vw"
                      placeholder="blur"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-4 px-4 pt-4 pb-5 sm:px-5">
                    <p className="text-muted">{item.summary}</p>
                    <PanelDetails item={item} labels={labels} tone="light" />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

/** "What we build" chips and related work (or the "Building in this space?" prompt). */
function PanelDetails({ item, labels, tone }: { item: ExplorerItem; labels: Labels; tone: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <>
      <div className="flex flex-col gap-2.5">
        <p className={cn("text-eyebrow font-semibold uppercase", dark ? "text-brand-300" : "text-link")}>
          {labels.whatWeBuild}
        </p>
        <ul className="flex flex-wrap gap-2">
          {item.whatWeBuild.map((thing) => (
            <li
              key={thing}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium",
                dark ? "border border-white/20 bg-white/10" : "bg-soft text-soft-foreground",
              )}
            >
              {thing}
            </li>
          ))}
        </ul>
      </div>
      {item.related.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className={cn("text-sm font-semibold", dark ? "text-white/70" : "text-muted")}>
            {labels.relatedWork}:
          </span>
          {item.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-200",
                dark ? "bg-white text-brand-950 hover:bg-brand-100" : "bg-primary text-on-primary hover:bg-primary-hover",
              )}
            >
              {link.label}
              <Icon name="arrow-right" className="size-4" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className={cn("text-sm", dark ? "text-white/70" : "text-muted")}>
            <span className={cn("font-semibold", dark ? "text-white" : "text-foreground")}>
              {labels.noRelatedWork.title}
            </span>{" "}
            {labels.noRelatedWork.description}
          </span>
          <Link
            href={labels.noRelatedWork.cta.href}
            className={cn(
              "inline-flex min-h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-colors duration-200",
              dark ? "bg-white text-brand-950 hover:bg-brand-100" : "bg-primary text-on-primary hover:bg-primary-hover",
            )}
          >
            {labels.noRelatedWork.cta.label}
            <Icon name="arrow-right" className="size-4" />
          </Link>
        </div>
      )}
    </>
  );
}
