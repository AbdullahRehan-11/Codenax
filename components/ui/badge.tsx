import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "soft" | "outline" | "solid";

const variants: Record<Variant, string> = {
  soft: "bg-soft text-soft-foreground",
  outline: "border border-line-strong text-muted",
  solid: "bg-primary text-on-primary",
};

type BadgeProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "soft", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
