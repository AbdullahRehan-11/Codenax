import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "surface" | "outline";

const variants: Record<Variant, string> = {
  default: "border border-line bg-background shadow-soft",
  surface: "border border-line bg-surface",
  outline: "border border-line-strong bg-transparent",
};

type CardProps = {
  as?: "div" | "article" | "li";
  variant?: Variant;
  /** Adds a hover lift for cards that link somewhere. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  variant = "default",
  interactive,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl p-6 sm:p-7",
        variants[variant],
        interactive &&
          "transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
