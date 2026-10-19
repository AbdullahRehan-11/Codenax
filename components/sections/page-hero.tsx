import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { NavLink } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  /** Second part of the title, shown in the brand gradient. */
  highlight?: string;
  /** Lead paragraphs under the title. */
  description?: string | string[];
  /** Link back to the parent page, shown as a breadcrumb above the title. */
  parent?: NavLink;
  /** The first action is primary, the rest secondary. */
  actions?: NavLink[];
  /** Optional content beside the text on laptops (a card, an image…). */
  aside?: ReactNode;
  /** "md" for long titles (e.g. case-study headlines) that would wrap too often at full size. */
  titleSize?: "lg" | "md";
  /** Extra content under the lead text (e.g. badges). */
  children?: ReactNode;
};

/** The top of every inner page: one h1, lead text and actions, on a soft grid-and-glow backdrop. */
export function PageHero({ eyebrow, title, highlight, description, parent, actions, aside, titleSize = "lg", children }: PageHeroProps) {
  const hasAside = Boolean(aside);
  const paragraphs = typeof description === "string" ? [description] : (description ?? []);
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden border-b border-line">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute -top-40 right-[-10%] size-[34rem] rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-900/40" />
        <div className="absolute bottom-[-30%] left-[-10%] size-[26rem] rounded-full bg-royal-500/10 blur-3xl" />
      </div>

      <Container
        className={cn(
          "grid gap-12 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24",
          hasAside && "lg:grid-cols-12 lg:items-center",
        )}
      >
        <div className={cn("flex flex-col gap-5", hasAside ? "lg:col-span-7" : "max-w-4xl")}>
          {parent && (
            <nav aria-label="Breadcrumb" className="animate-fade-up">
              <Link
                href={parent.href}
                // min-h-11 / -my-3: a 44px tap target that takes no extra space.
                className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-muted transition-colors hover:text-link"
              >
                <Icon name="chevron-left" className="size-4" />
                {parent.label}
              </Link>
            </nav>
          )}
          {eyebrow && (
            <p className="inline-flex animate-fade-up items-center gap-2 text-eyebrow font-semibold uppercase text-link">
              <span aria-hidden className="h-px w-6 bg-current" />
              {eyebrow}
            </p>
          )}
          <h1
            id="page-title"
            className={cn(
              "animate-fade-up font-bold [animation-delay:80ms]",
              titleSize === "lg" ? "text-display-1" : "text-display-2",
            )}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span className="text-gradient">{highlight}</span>
              </>
            )}
          </h1>
          {paragraphs.map((text) => (
            <p key={text} className="max-w-3xl animate-fade-up text-lead text-muted [animation-delay:160ms]">
              {text}
            </p>
          ))}
          {children && <div className="animate-fade-up [animation-delay:200ms]">{children}</div>}
          {actions && actions.length > 0 && (
            <div className="mt-3 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              {actions.map((action, i) => (
                <Button key={action.href} href={action.href} variant={i === 0 ? "primary" : "secondary"} size="lg" block>
                  {action.label}
                  {i === 0 && <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />}
                </Button>
              ))}
            </div>
          )}
        </div>
        {hasAside && <div className="animate-fade-up [animation-delay:200ms] lg:col-span-5">{aside}</div>}
      </Container>
    </section>
  );
}
