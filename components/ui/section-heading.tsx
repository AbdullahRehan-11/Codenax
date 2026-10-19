import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  /** "line": uppercase label after a short rule (default). "pill": the label in a soft pill. */
  eyebrowStyle?: "line" | "pill";
  title: ReactNode;
  /** Second part of the title, shown in the brand gradient. */
  highlight?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  /** Use "h1" for page heroes, "h2" (default) for sections. */
  as?: "h1" | "h2";
  /** "md" for long section titles (service pages) that wrap too often at full size. */
  size?: "lg" | "md";
  /** Colours for a dark section background. */
  onDark?: boolean;
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  eyebrowStyle = "line",
  title,
  highlight,
  description,
  align = "left",
  as: Heading = "h2",
  size = "lg",
  onDark,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "flex max-w-3xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {eyebrow &&
        (eyebrowStyle === "pill" ? (
          <p
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
              align === "center" ? "self-center" : "self-start",
              onDark ? "border-white/15 bg-white/10 text-brand-200" : "border-brand-200 bg-soft text-soft-foreground dark:border-brand-800",
            )}
          >
            <span aria-hidden className="size-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
        ) : (
          <p className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase text-link">
            <span aria-hidden className="h-px w-6 bg-current" />
            {eyebrow}
          </p>
        ))}
      <Heading
        id={id}
        className={cn(
          "font-bold",
          Heading === "h1"
            ? "text-display-1"
            : size === "md"
              ? "text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] leading-[1.12] tracking-[-0.02em]"
              : "text-display-2",
          onDark && "text-white",
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        )}
      </Heading>
      {description && <p className={cn("text-lead", onDark ? "text-brand-100" : "text-muted")}>{description}</p>}
    </div>
  );
}
