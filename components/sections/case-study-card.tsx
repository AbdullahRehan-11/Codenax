import Image from "next/image";
import Link from "next/link";
import { caseStudiesPage } from "@/content/case-studies";
import { cn } from "@/lib/cn";
import { CASE_STUDY_SCREENSHOTS } from "@/lib/media";
import type { CaseStudy } from "@/lib/types";
import { Icon } from "@/components/ui/icon";

type CaseStudyCardProps = {
  study: CaseStudy;
  /** "wide" puts the screenshot beside the text from `md` up; "stacked" puts it on top. */
  layout?: "stacked" | "wide";
  /** h2 on /case-studies (cards are the page's sections), h3 inside another section. */
  as?: "h2" | "h3";
  /** Shorter text for small cards (e.g. "More work"). */
  compact?: boolean;
};

/** A case study as a linked card: framed screenshot, client and engagement, title, summary. */
export function CaseStudyCard({ study, layout = "stacked", as: Heading = "h3", compact }: CaseStudyCardProps) {
  const wide = layout === "wide";
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-background shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700",
        wide && "md:grid md:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "relative isolate overflow-hidden bg-surface-2 px-5 pt-5 sm:px-7 sm:pt-7",
          wide && "md:flex md:items-end md:px-10 md:pt-10",
        )}
      >
        <div aria-hidden className="absolute -right-16 -bottom-16 -z-10 size-64 rounded-full bg-brand-300/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-brand-700/30" />
        <Image
          src={CASE_STUDY_SCREENSHOTS[study.slug]}
          alt=""
          placeholder="blur"
          // Stacked cards sit in 2 columns (case studies, industries) or 3 ("More work"); 40rem covers both on laptops.
          sizes={wide ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 1280px) 40rem, (min-width: 768px) 50vw, 100vw"}
          className="aspect-16/10 w-full rounded-t-xl bg-white object-cover object-top shadow-lift transition-[scale,translate] duration-500 ease-smooth group-hover:-translate-y-1 group-hover:scale-[1.02]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col gap-3 p-6 sm:p-7", wide && "md:justify-center md:p-10")}>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-link">{study.client}</span>
          <span aria-hidden className="text-muted">·</span>
          <span className="text-muted">{study.industry}</span>
        </div>
        <Heading className={cn("font-bold", compact ? "text-lg" : "text-xl sm:text-2xl")}>{study.title}</Heading>
        {!compact && <p className="text-muted">{study.summary}</p>}
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-semibold text-link">
          {caseStudiesPage.cardCta}
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
