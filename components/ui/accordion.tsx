import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./icon";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  /** Items sharing a name behave exclusively: opening one closes the others. */
  name?: string;
  className?: string;
};

/** Built on native <details>, so it works without JavaScript and is keyboard accessible. */
export function Accordion({ items, name, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.id} name={name} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-base font-semibold transition-colors duration-200 hover:text-link sm:text-lg [&::-webkit-details-marker]:hidden">
            <span>{item.title}</span>
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[rotate,background-color,color,border-color] duration-300 ease-smooth group-open:rotate-45 group-open:border-transparent group-open:bg-soft group-open:text-soft-foreground"
            >
              <Icon name="plus" className="size-4" />
            </span>
          </summary>
          <div className="pb-6 text-muted sm:pr-14">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
