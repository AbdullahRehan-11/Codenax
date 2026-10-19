import type { CSSProperties } from "react";
import type { Stat } from "@/content/stats";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";

// Decorative icon per stat, by its label.
const STAT_ICONS: Record<string, IconName> = {
  "Live Applications": "smartphone",
  "Client Retention": "heart",
  "Years of Experience": "clock",
  "Industries Served": "building",
};

/**
 * A stat value that counts up from 0 (CSS only, see "Stat count-up" in globals.css).
 * "load" counts as the page loads; "reveal" waits until its [data-reveal] block is on screen.
 */
export function StatValue({ value, start, className }: { value: string; start: "load" | "reveal"; className?: string }) {
  const [, number = "", suffix = value] = value.match(/^(\d+)(.*)$/) ?? [];
  return (
    <span className={className}>
      {/* What screen readers and search engines get. */}
      <span className="sr-only">{value}</span>
      <span aria-hidden className="text-gradient">
        <span className="stat-count" data-count={start} style={{ "--to": Number(number) } as CSSProperties} />
        {suffix}
      </span>
    </span>
  );
}

/**
 * The four company stats as one card: hairline-split columns (2 × 2 on phones), an icon each,
 * and numbers that count up when the card scrolls into view.
 */
export function StatsStrip({ stats, className }: { stats: Stat[]; className?: string }) {
  return (
    <section aria-label="CodeNax in numbers" className={cn("py-10 sm:py-14", className)}>
      <Container>
        <div data-reveal className="relative overflow-hidden rounded-3xl border border-line shadow-soft">
          <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 z-10 h-1" />
          <ul className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {stats.map((stat, i) => (
              <li
                key={stat.label}
                style={revealDelay(i)}
                className="group flex flex-col gap-3 bg-background p-5 transition-colors duration-200 hover:bg-surface sm:p-7"
              >
                <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-white shadow-glow transition-[rotate,scale] duration-300 ease-smooth group-hover:scale-105 group-hover:-rotate-6 sm:size-11">
                  <Icon name={STAT_ICONS[stat.label] ?? "sparkles"} className="size-5" />
                </span>
                <StatValue value={stat.value} start="reveal" className="font-display text-4xl leading-none font-bold sm:text-5xl" />
                <span className="text-sm font-medium text-muted sm:text-base">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
