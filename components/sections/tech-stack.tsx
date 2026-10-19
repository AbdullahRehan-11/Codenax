import { cn } from "@/lib/cn";
import { techStackHeading } from "@/content/home";
import { techStackRows } from "@/content/tech-stack";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ToolLogo } from "@/components/ui/tool-logo";

/** 
 * The two rows from codenax.com's "Built with tools you trust" marquee. Each row's list is
 * rendered twice so the -50% scroll loops seamlessly; the copy is hidden from screen readers.
 * Rows pause on hover. With reduced motion they become a static, wrapped list.
 */
export function TechStack() {
  return (
    <Section labelledBy="stack-title" className="overflow-hidden">
      <SectionHeading id="stack-title" align="center" {...techStackHeading} />
      {/* py-2 leaves room for the hover lift and glow. */}
      <div data-reveal className="mt-12 flex flex-col gap-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:[mask-image:none]">
        {techStackRows.map((row, r) => (
          <div
            key={r}
            className={cn(
              "flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center",
              r === 1 && "[animation-direction:reverse]",
            )}
          >
            <ToolList tools={row} />
            <ToolList tools={row} hidden />
          </div>
        ))}
      </div>
    </Section>
  );
}

function ToolList({ tools, hidden }: { tools: string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden}
      // pr-3 (not a gap between the copies) keeps both halves exactly equal, so -50% loops cleanly.
      className={cn(
        "flex gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0",
        hidden && "motion-reduce:hidden",
      )}
    >
      {tools.map((tool) => (
        <li
          key={tool}
          className="group flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-background py-2.5 pr-5 pl-4 text-sm font-medium text-foreground shadow-soft transition-[translate,box-shadow,border-color,color] duration-200 hover:border-brand-300 hover:text-link hover:shadow-glow motion-safe:hover:-translate-y-0.5"
        >
          {/* Greyscale at rest, full colour when its pill is hovered. */}
          <ToolLogo tool={tool} tone="muted" />
          {tool}
        </li>
      ))}
    </ul>
  );
}
