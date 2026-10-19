import type { CSSProperties } from "react";

/** Inline style that delays an item's scroll-reveal, so items in a grid appear one after another. */
export function revealDelay(index: number, stepMs = 80): CSSProperties {
  return { "--reveal-delay": `${index * stepMs}ms` } as CSSProperties;
}
 