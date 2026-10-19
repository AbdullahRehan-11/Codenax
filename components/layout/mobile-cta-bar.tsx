"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { primaryCta } from "@/content/nav";
import { site } from "@/content/site";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

/**
 * Floating "Book a call" / WhatsApp bar for phones and tablets. It slides in after the
 * first screen of scrolling. It stays hidden on the contact page, which already has both, and
 * on the estimator, which uses that spot for its live total.
 */
const HIDDEN_ON = new Set([primaryCta.href, "/estimate"]);

export function MobileCTABar() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(480);
  const hidden = !scrolled || HIDDEN_ON.has(pathname);
 
  return (
    <div
      inert={hidden}
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 transition-[opacity,translate] duration-300 ease-smooth lg:hidden",
        hidden ? "translate-y-[calc(100%+1.5rem)] opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-line bg-background/90 p-1.5 shadow-lift backdrop-blur-lg">
        <Button href={primaryCta.href} className="flex-1">
          {primaryCta.label}
        </Button>
        <Button href={site.whatsappUrl} variant="secondary" className="flex-1">
          <Icon name="whatsapp" className="size-4.5" />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
