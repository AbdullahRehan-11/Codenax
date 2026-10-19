"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { PostCard, type PostSummary } from "@/components/sections/post-card";

type BlogBrowserProps = {
  /** Newest first. Summaries only, so no article body reaches the browser. */
  posts: PostSummary[];
  /** The site's filter list; the first entry ("All") shows every post. */
  categories: readonly string[];
  cta: string;
};

/** The post list with the site's category filter. Under "All", the newest post is featured wide. */
export function BlogBrowser({ posts, categories, cta }: BlogBrowserProps) {
  const [allLabel] = categories;
  const [filter, setFilter] = useState(allLabel);
  const showAll = filter === allLabel;
  const shown = showAll ? posts : posts.filter((post) => post.category === filter);
  const count = (c: string) => (c === allLabel ? posts.length : posts.filter((post) => post.category === c).length);
  const [first, ...rest] = shown;

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filter articles by category"
        className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((c) => {
          const on = c === filter;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(c)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border py-2 pr-2.5 pl-4 text-sm font-semibold whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200",
                on
                  ? "bg-brand-gradient border-transparent text-white shadow-glow"
                  : "border-line bg-background text-muted hover:border-brand-300 hover:text-foreground dark:hover:border-brand-700",
              )}
            >
              {c}
              <span className={cn("rounded-full px-2 py-0.5 text-xs tabular-nums", on ? "bg-white/20 text-white" : "bg-surface-2 text-muted")}>
                {count(c)}
              </span>
            </button>
          );
        })}
      </div>

      {/* key replays the fade when the filter changes. */}
      <ul key={filter} className="grid animate-fade-up gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {first && (
          <li className={cn(showAll && "md:col-span-2 lg:col-span-3")}>
            <PostCard post={first} cta={cta} featured={showAll} />
          </li>
        )}
        {rest.map((post) => (
          <li key={post.slug}>
            <PostCard post={post} cta={cta} />
          </li>
        ))}
      </ul>
    </div>
  );
}
