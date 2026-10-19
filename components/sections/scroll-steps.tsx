"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type ScrollStepsProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Marks each `[data-step]` child as "done", "on" or "todo" (`data-state`) depending on whether
 * it has passed the middle of the screen, and sets `--fill` (0–1) on itself for a progress rail.
 * Children are server-rendered; this only writes attributes, so scrolling never re-renders.
 * Without JS or with reduced motion no attributes are set and every step shows in full.
 */
export function ScrollSteps({ className, children }: ScrollStepsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    if (reducedMotion) {
      steps.forEach((s) => s.removeAttribute("data-state"));
      root.style.removeProperty("--fill");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.55;
      let active = -1;
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top + 24 <= anchor) active = i;
      });
      steps.forEach((step, i) => {
        step.dataset.state = i < active ? "done" : i === active ? "on" : "todo";
      });
      const r = root.getBoundingClientRect();
      root.style.setProperty("--fill", String(Math.min(Math.max((anchor - r.top) / r.height, 0), 1)));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [reducedMotion]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
