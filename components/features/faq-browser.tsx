"use client";

import { useState } from "react";
import { faqCategories, faqPage, faqs } from "@/content/faq";
import type { FAQCategory } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Accordion } from "@/components/ui/accordion";
import { Icon, type IconName } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";

type Filter = FAQCategory | "All";

// Decorative icon per category.
const CATEGORY_ICONS: Record<Filter, IconName> = {
  All: "help-circle",
  General: "globe",
  Services: "sparkles",
  Process: "trending-up",
  Pricing: "file-text",
  Support: "shield-check",
};

/** Every FAQ, filterable by the site's categories. The filters are toggle buttons (aria-pressed). */
export function FaqBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const filters: Filter[] = ["All", ...faqCategories];
  const shown = filter === "All" ? faqs : faqs.filter((faq) => faq.category === filter);
  const count = (f: Filter) => (f === "All" ? faqs.length : faqs.filter((faq) => faq.category === f).length);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <div
          role="group"
          aria-label="Filter questions by category"
          className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:sticky lg:top-28 lg:flex-col lg:gap-1.5"
        >
          {filters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={cn(
                  "group inline-flex shrink-0 items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 lg:rounded-2xl lg:px-4 lg:py-3 lg:text-base",
                  on
                    ? "bg-brand-gradient border-transparent text-white shadow-glow"
                    : "border-line bg-background text-muted hover:border-brand-300 hover:text-foreground dark:hover:border-brand-700",
                )}
              >
                <Icon name={CATEGORY_ICONS[f]} className="hidden size-5 lg:block" />
                {f === "All" ? faqPage.allLabel : f}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs tabular-nums lg:ml-auto",
                    on ? "bg-white/20 text-white" : "bg-surface-2 text-muted",
                  )}
                >
                  {count(f)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-8">
        {/* key replays the fade when the category changes. */}
        <div key={filter} className="animate-fade-up">
          <Accordion
            name="faq"
            items={shown.map((faq) => ({
              id: faq.question,
              title: (
                <span className="flex flex-col gap-1.5">
                  {filter === "All" && (
                    <span className="text-xs font-semibold tracking-wide text-link uppercase">{faq.category}</span>
                  )}
                  {faq.question}
                </span>
              ),
              content: <RichText blocks={faq.answer} />,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
