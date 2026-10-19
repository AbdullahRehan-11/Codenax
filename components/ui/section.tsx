import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

type Tone = "default" | "surface";

type SectionProps = {
  id?: string;
  tone?: Tone;
  /** Accessible name for the section, usually the id of its heading. */
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

/** Vertical rhythm for every page section: tighter on mobile, roomier on desktop. */
export function Section({
  id,
  tone = "default",
  labelledBy,
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "py-16 sm:py-20 lg:py-28",
        tone === "surface" && "border-y border-line bg-surface",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
