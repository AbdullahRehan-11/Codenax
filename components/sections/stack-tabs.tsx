"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { LineIcon } from "@/components/ui/line-icon";
import { ToolLogo } from "@/components/ui/tool-logo";

export type StackGroup = { title: string; icon?: string; tools: string[] };

/**
 * A tech stack as tabs: each category is a pill with its tool count; the selected one shows
 * its tools as chips with logos. Tabs pattern: arrows, Home and End move between categories.
 */
export function StackTabs({ groups }: { groups: StackGroup[] }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const group = groups[selected];

  function onKeyDown(event: KeyboardEvent) {
    const last = groups.length - 1;
    const next =
      event.key === "ArrowRight" || event.key === "ArrowDown" ? (selected === last ? 0 : selected + 1)
      : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (selected === 0 ? last : selected - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        // One scrollable row on phones; wraps from sm up.
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {groups.map((g, i) => {
          const on = i === selected;
          return (
            <button
              key={g.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${baseId}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => setSelected(i)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border py-2 pr-2.5 pl-4 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200",
                on
                  ? "bg-brand-gradient border-transparent text-white shadow-glow"
                  : "border-line bg-background text-muted hover:border-brand-300 hover:text-foreground dark:hover:border-brand-700",
              )}
            >
              {g.title}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-xs tabular-nums",
                  on ? "bg-white/20 text-white" : "bg-surface-2 text-muted",
                )}
              >
                {g.tools.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${selected}`}
        className="relative mt-4 overflow-hidden rounded-3xl border border-line bg-background p-6 shadow-soft sm:p-8"
      >
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-900/40" />
        {/* key replays the fade each time the category changes. */}
        <div key={selected} className="relative animate-fade-up">
          <div className="flex items-center gap-3">
            {group.icon && (
              <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-white shadow-glow">
                <LineIcon name={group.icon} />
              </span>
            )}
            <h3 className="text-lg font-bold">{group.title}</h3>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {group.tools.map((tool) => (
              <li
                key={tool}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-background py-2 pr-4 pl-2.5 text-sm font-medium shadow-soft transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-brand-300 dark:hover:border-brand-700"
              >
                <ToolLogo tool={tool} className="size-4.5" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
