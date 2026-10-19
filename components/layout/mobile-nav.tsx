"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { mainNav, primaryCta } from "@/content/nav";
import { site } from "@/content/site";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

type MobileNavProps = {
  open: boolean;
  /** restoreFocus is true for Escape / close button, false when a link navigates. */
  onClose: (restoreFocus: boolean) => void;
};

const FOCUSABLE = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

/** Full-screen menu below the lg breakpoint: focus trap, Escape to close, body scroll lock. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(true);
        return;
      }
      if (event.key !== "Tab" || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null,
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const navigate = () => onClose(false);

  return (
    <div
      ref={sheetRef}
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-50 flex flex-col bg-background lg:hidden",
        // Visibility flips instantly on open (so focus() works right away) and only after
        // the fade on close.
        open
          ? "visible translate-y-0 opacity-100 [transition:opacity_300ms_var(--ease-smooth),translate_300ms_var(--ease-smooth),visibility_0s]"
          : "invisible -translate-y-3 opacity-0 [transition:opacity_300ms_var(--ease-smooth),translate_300ms_var(--ease-smooth),visibility_0s_300ms]",
      )}
    >
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line px-4 sm:px-6">
        <Logo onClick={navigate} />
        <button
          ref={closeRef}
          type="button"
          onClick={() => onClose(true)}
          aria-label="Close menu"
          className="grid size-11 place-items-center rounded-full border border-line text-foreground transition-colors duration-200 hover:bg-surface-2"
        >
          <Icon name="close" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6">
        <ul className="divide-y divide-line">
          {mainNav.map((item) =>
            item.kind === "link" ? (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={navigate}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex min-h-16 items-center justify-between font-display text-2xl font-semibold aria-[current=page]:text-link"
                >
                  {item.label}
                  <Icon name="arrow-right" className="size-5 text-muted" />
                </Link>
              </li>
            ) : (
              <li key={item.id}>
                <details className="group">
                  <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between font-display text-2xl font-semibold [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <Icon
                      name="chevron-down"
                      className="size-5 text-muted transition-transform duration-300 ease-smooth group-open:rotate-180"
                    />
                  </summary>
                  <ul className="flex flex-col gap-1 pb-5">
                    {/* The mega menu's featured links repeat its full list, so skip them here. */}
                    {(item.layout === "mega" ? item.groups.slice(1) : item.groups)
                      .flatMap((group) => group.links)
                      .map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={link.href}
                            onClick={navigate}
                            aria-current={pathname === link.href ? "page" : undefined}
                            className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-base font-medium text-foreground/85 transition-colors hover:bg-surface-2 aria-[current=page]:text-link"
                          >
                            {link.icon && (
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-soft text-soft-foreground">
                                <Icon name={link.icon} className="size-4.5" />
                              </span>
                            )}
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    {item.overview && (
                      <li>
                        <Link
                          href={item.overview.href}
                          onClick={navigate}
                          className="mt-1 flex min-h-11 items-center gap-2 px-3 text-sm font-semibold text-link"
                        >
                          {item.overview.label}
                          <Icon name="arrow-right" className="size-4" />
                        </Link>
                      </li>
                    )}
                  </ul>
                </details>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="flex shrink-0 flex-col gap-3 border-t border-line bg-surface px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="grid grid-cols-2 gap-3">
          <Button href={primaryCta.href} onClick={navigate} className="w-full">
            {primaryCta.label}
          </Button>
          <Button href={site.whatsappUrl} variant="secondary" className="w-full">
            <Icon name="whatsapp" className="size-4.5" />
            WhatsApp
          </Button>
        </div>
        <div className="flex items-center justify-between gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-link"
          >
            <Icon name="mail" className="size-4.5" />
            {site.email}
          </a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
