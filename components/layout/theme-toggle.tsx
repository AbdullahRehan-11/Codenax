"use client";

import { useLayoutEffect } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

const STORAGE_KEY = "theme";

function readStoredTheme() {
  try {
    const theme = localStorage.getItem(STORAGE_KEY);
    return theme === "dark" || theme === "light" ? theme : null;
  } catch {
    return null;
  }
}

/**
 * Switches between light (default) and dark. The inline script in app/layout.tsx
 * applies the saved choice before first paint; the icons swap with CSS, so no
 * React state is needed and nothing mismatches on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // Strict Mode's dev-only remount resets <html> attributes; re-apply the saved theme.
  // This is a no-op in production.
  useLayoutEffect(() => {
    const theme = readStoredTheme();
    if (theme) document.documentElement.setAttribute("data-theme", theme);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage unavailable (private mode etc.): the theme still applies for this visit.
    }
  }
 
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "relative grid size-11 place-items-center overflow-hidden rounded-full border border-line text-foreground transition-colors duration-200 hover:bg-surface-2",
        className,
      )}
    >
      <Icon
        name="moon"
        className="transition-transform duration-300 ease-smooth dark:scale-0 dark:-rotate-90"
      />
      <Icon
        name="sun"
        className="absolute scale-0 rotate-90 transition-transform duration-300 ease-smooth dark:scale-100 dark:rotate-0"
      />
    </button>
  );
}
