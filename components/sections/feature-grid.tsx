import type { Feature } from "@/lib/types";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { Icon, type IconName } from "@/components/ui/icon";

type FeatureGridProps = {
  items: Feature[];
  /** Decorative icon per item, in content order. */
  icons: IconName[];
  /** "cards": light icon cards. "glass": translucent cards for a dark band. "numbered": big index, no icon box. */
  variant?: "cards" | "glass" | "numbered";
  /** Columns from lg up. */
  columns?: 2 | 3 | 4;
  className?: string;
};

const COLS = { 2: "lg:grid-cols-2", 3: "lg:grid-cols-3", 4: "lg:grid-cols-4" } as const;

/** A titled-description list (values, perks, differentiators…) as a responsive grid of cards. */
export function FeatureGrid({ items, icons, variant = "cards", columns = 3, className }: FeatureGridProps) {
  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2", COLS[columns], className)}>
      {items.map((item, i) => (
        <li
          key={item.title}
          data-reveal
          style={revealDelay(i % columns)}
          className={cn(
            "group relative flex flex-col gap-4 overflow-hidden rounded-3xl p-7 transition-[translate,box-shadow,border-color,background-color] duration-300 ease-smooth hover:-translate-y-1",
            variant === "glass"
              ? "border border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
              : "border border-line bg-background shadow-soft hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700",
          )}
        >
          {variant === "numbered" && (
            // Decorative watermark: drawn by CSS (content: attr()) so it isn't text for screen
            // readers or contrast checks (WCAG exempts decoration).
            <span
              aria-hidden
              data-n={String(i + 1).padStart(2, "0")}
              className="pointer-events-none absolute -top-3 right-4 font-display text-8xl font-bold text-brand-500/10 transition-colors duration-300 group-hover:text-brand-500/20 before:content-[attr(data-n)]"
            />
          )}
          <span
            className={cn(
              "grid size-12 place-items-center rounded-2xl transition-[rotate,scale] duration-300 ease-smooth group-hover:scale-105 group-hover:-rotate-6",
              variant === "cards" ? "bg-soft text-soft-foreground" : "bg-brand-gradient text-white shadow-glow",
            )}
          >
            <Icon name={icons[i] ?? "sparkles"} className="size-6" />
          </span>
          <h3 className={cn("text-xl font-bold", variant === "glass" && "text-white")}>{item.title}</h3>
          <p className={variant === "glass" ? "text-brand-100" : "text-muted"}>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
