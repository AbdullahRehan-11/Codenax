import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";

// Shown for any URL the site doesn't have (and for unknown slugs). Next.js sends a 404
// status and adds noindex. The wording is ours (codenax.com has no 404 copy to copy).
export const metadata: Metadata = { title: `Page not found | ${site.name}` };

const POPULAR: { label: string; href: string; icon: IconName }[] = [
  { label: "Services", href: "/services", icon: "sparkles" },
  { label: "Case Studies", href: "/case-studies", icon: "file-text" },
  { label: "Pricing", href: "/pricing", icon: "trending-up" },
  { label: "Blog", href: "/blog", icon: "globe" },
];

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="relative isolate flex flex-1 items-center overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="absolute top-1/2 left-1/2 size-[36rem] -translate-1/2 rounded-full bg-brand-200/50 blur-3xl dark:bg-brand-900/40" />
      </div>
      <Container className="flex flex-col items-center text-center">
        <p aria-hidden className="text-gradient animate-fade-up font-display text-[clamp(6rem,4rem+10vw,11rem)] leading-none font-bold">
          404
        </p>
        <h1 id="not-found-title" className="mt-4 animate-fade-up text-display-2 font-bold [animation-delay:80ms]">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl animate-fade-up text-lead text-muted [animation-delay:160ms]">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex w-full animate-fade-up flex-col justify-center gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row">
          <Button href="/" size="lg" block>
            Back to home
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button href="/contact" variant="secondary" size="lg" block>
            Contact us
          </Button>
        </div>
        <nav aria-label="Popular pages" className="mt-12 w-full max-w-2xl animate-fade-up [animation-delay:320ms]">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {POPULAR.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-line bg-background/80 p-4 text-sm font-semibold transition-[translate,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
                >
                  <span className="grid size-10 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors group-hover:bg-primary group-hover:text-on-primary">
                    <Icon name={page.icon} className="size-5" />
                  </span>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
