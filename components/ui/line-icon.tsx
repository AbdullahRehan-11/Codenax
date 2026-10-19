import { cn } from "@/lib/cn";
import { LINE_ICON_PATHS } from "./line-icon-paths";

type LineIconProps = {
  /** A Lucide icon name from line-icon-paths.ts (e.g. "brain", "shield-check"). */
  name: string;
  className?: string;
};

/**
 * Draws one of the service-page icons. The markup is our own generated file (no user input),
 * so injecting it is safe. Decorative: always hidden from screen readers.
 */
export function LineIcon({ name, className }: LineIconProps) {
  const paths = LINE_ICON_PATHS[name];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0", className ?? "size-5")}
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}
