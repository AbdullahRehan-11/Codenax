import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

/** Page-width wrapper with responsive side gutters. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
