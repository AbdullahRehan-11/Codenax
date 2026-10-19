import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import type { RichBlock } from "@/lib/types";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";

// Presentation for the Challenge and Solution sections of a case study. The text is the
// study's own, in its own order; only the layout changes.

const BODY = "text-[1.0625rem] leading-8 text-muted";

/** The Challenge: its opening statement (and sub-heading, if any) as a highlighted callout, then the rest. */
export function ChallengeBody({ blocks }: { blocks: RichBlock[] }) {
  const title = blocks[0]?.type === "heading" ? blocks[0].text : undefined;
  const leadIndex = blocks.findIndex((b) => b.type === "paragraph");
  const lead = leadIndex >= 0 ? (blocks[leadIndex] as Extract<RichBlock, { type: "paragraph" }>) : undefined;
  const rest = blocks.filter((b, i) => i !== leadIndex && !(i === 0 && title));

  return (
    <div className="mt-6 flex flex-col gap-6">
      {lead && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-7 dark:border-amber-500/25 dark:bg-amber-500/10">
          <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-amber-400 to-orange-500" />
          <div className="flex gap-4">
            <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300">
              <Icon name="alert-circle" />
            </span>
            <div className="flex flex-col gap-2">
              {title && <h3 className="text-lg font-bold text-foreground">{title}</h3>}
              <p className="text-lg leading-8 font-medium text-foreground">{lead.text}</p>
            </div>
          </div>
        </div>
      )}
      {rest.length > 0 && <StoryBlocks blocks={rest} />}
    </div>
  );
}

/**
 * The Solution: with two or more sub-headed parts, each part becomes a card; otherwise the
 * text reads as normal and its lists become a grid of feature tiles.
 */
export function SolutionBody({ blocks }: { blocks: RichBlock[] }) {
  const { intro, groups } = splitByHeading(blocks);

  if (groups.length < 2) {
    return <StoryBlocks blocks={blocks} tiles className="mt-6" />;
  }

  return (
    <div className="mt-6 flex flex-col gap-8">
      {intro.length > 0 && <StoryBlocks blocks={intro} />}
      <ul className="grid gap-4 sm:grid-cols-2">
        {groups.map((group, i) => (
          <li
            key={group.title}
            data-reveal
            style={revealDelay(i % 2)}
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700"
          >
            <span
              aria-hidden
              className="bg-brand-gradient absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-smooth group-hover:scale-x-100"
            />
            <div className="flex items-center gap-3">
              <span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-xl font-display text-sm font-bold text-white shadow-glow">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg leading-snug font-bold">{group.title}</h3>
            </div>
            <StoryBlocks blocks={group.blocks} compact />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Splits blocks at each level-3 heading: what comes before the first one is the intro. */
function splitByHeading(blocks: RichBlock[]) {
  const intro: RichBlock[] = [];
  const groups: { title: string; blocks: RichBlock[] }[] = [];
  for (const block of blocks) {
    if (block.type === "heading") groups.push({ title: block.text, blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(block);
    else intro.push(block);
  }
  return { intro, groups };
}

type StoryBlocksProps = {
  blocks: RichBlock[];
  /** Lists as a two-column grid of feature tiles instead of a ticked list. */
  tiles?: boolean;
  /** Smaller text, for inside cards. */
  compact?: boolean;
  className?: string;
};

/** Story text with ticked lists (or feature tiles); everything else via RichText. */
function StoryBlocks({ blocks, tiles, compact, className }: StoryBlocksProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {blocks.map((block, i) => {
        if (block.type !== "list") {
          return <RichText key={i} blocks={[block]} className={compact ? "text-muted" : BODY} />;
        }
        if (tiles) {
          return (
            <ul key={i} className="grid gap-3 sm:grid-cols-2">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  data-reveal
                  style={revealDelay(j % 2, 60)}
                  className="flex gap-3 rounded-xl border border-line bg-surface p-4 text-foreground transition-colors duration-200 hover:border-brand-300 dark:hover:border-brand-700"
                >
                  <span aria-hidden className="bg-brand-gradient mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white">
                    <Icon name="check" className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ul key={i} className="flex flex-col gap-2.5">
            {block.items.map((item, j) => (
              <li key={j} className={cn("flex gap-3", compact ? "text-muted" : BODY)}>
                <span aria-hidden className={cn("grid size-5 shrink-0 place-items-center rounded-full bg-soft text-soft-foreground", compact ? "mt-0.5" : "mt-1.5")}>
                  <Icon name="check" className="size-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
