"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type StoryNavProps = {
  /** The article's sections, in order (`id` is the section element's id). */
  items: { id: string; label: string }[];
  /** Id of the element whose reading progress the top bar shows. */
  articleId: string;
  /** Accessible name of the jump-link list. */
  label: string;
};

/**
 * Sticky "on this page" list for a case study: highlights the section being read, and drives
 * a thin reading-progress bar across the top of the window.
 */
export function StoryNav({ items, articleId, label }: StoryNavProps) {
  const [active, setActive] = useState(items[0]?.id);
  const barRef = useRef<HTMLDivElement>(null);

  // The current section is the last one whose top has passed 30% of the viewport.
  useEffect(() => {
    const article = document.getElementById(articleId);
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= line) current = item.id;
      }
      setActive(current);
      if (article && barRef.current) {
        const r = article.getBoundingClientRect();
        const progress = Math.min(Math.max(-r.top / Math.max(r.height - window.innerHeight, 1), 0), 1);
        barRef.current.style.scale = `${progress} 1`;
      }
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
  }, [items, articleId]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden
        className="bg-brand-gradient fixed inset-x-0 top-0 z-50 h-1 origin-left"
        style={{ scale: "0 1" }}
      />
      {/* Long lists (e.g. a blog round-up) scroll inside the sticky column. */}
      <nav aria-label={label} className="scrollbar-none sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <ol className="relative flex flex-col border-l border-line">
          {items.map((item) => {
            const current = item.id === active;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  className={cn(
                    "-ml-px block border-l-2 py-2 pl-4 text-sm transition-colors duration-200",
                    current
                      ? "border-primary font-semibold text-link"
                      : "border-transparent text-muted hover:border-line-strong hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
