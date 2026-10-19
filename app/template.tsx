import { ViewTransition } from "react";

/**
 * Unlike layout.tsx, a template re-mounts on every navigation, so React's <ViewTransition>
 * can play an exit for the old page and an enter for the new one (CSS: "page-enter" /
 * "page-exit" in globals.css). Only the page content moves; the navbar and footer stay put.
 * Browsers without the View Transitions API simply swap pages as before.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      <div className="flex flex-1 flex-col">{children}</div>
    </ViewTransition>
  );
}
