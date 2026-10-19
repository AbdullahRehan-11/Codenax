import Link from "next/link";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/reveal";
import { slugify } from "@/lib/slug";
import type { ContentItem, ContentSection, RichBlock } from "@/lib/types";
import { Icon } from "@/components/ui/icon";
import { LineIcon } from "@/components/ui/line-icon";
import { RichText } from "@/components/ui/rich-text";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScrollSteps } from "./scroll-steps";
import { StackTabs } from "./stack-tabs";

type Layout = "bento" | "split" | "zigzag" | "tabs" | "band" | "grid" | "prose";

const isList = (b: RichBlock): b is Extract<RichBlock, { type: "list" }> => b.type === "list";
const average = (items: string[]) => items.reduce((sum, s) => sum + s.length, 0) / Math.max(items.length, 1);

/** Picks a layout from the section's shape and place, so all ten pages share one template. */
function layoutOf(heading: string, intro: RichBlock[], items: ContentItem[], index: number): Layout {
  if (items.length === 0) return intro.some(isList) ? "band" : "prose";
  if (/process|workflow/i.test(heading)) return "zigzag";
  const allLists = items.every((item) => item.body.length > 0 && item.body.every(isList));
  if (allLists && items.length >= 3 && average(items.flatMap((i) => i.body.flatMap((b) => (isList(b) ? b.items : [])))) <= 22)
    return "tabs";
  if (/industr/i.test(heading)) return "grid";
  if (index === 0 && items.length >= 4) return "bento";
  if (items.length >= 5 && items.length <= 8 && !allLists) return "split";
  return "grid";
}

/** "AI Software Development Workflow" → "ai-software-development-workflow", for in-page links. */
export const sectionId = slugify;

/** Whether a section has anything to show. */
export function hasContent(section: ContentSection) {
  return section.intro.length > 0 || section.items.length > 0;
}

type ServiceSectionProps = {
  section: ContentSection;
  /** Position on the page: the first item-section becomes the bento. */
  index: number;
  /** The label pill the site shows above this heading. */
  pill?: string;
  /** Lucide icon name per item title. */
  icons?: Record<string, string>;
  /** Kicker on the featured bento tile, where the site has one ("Start here"). */
  startLabel?: string;
  /** Label of the featured tile's link ("Talk to us about this"). */
  itemCta: string;
};

/** One section of a /services/[slug] page, in the style its content suits. */
export function ServiceSection({ section, index, pill, icons = {}, startLabel, itemCta }: ServiceSectionProps) {
  const id = sectionId(section.heading);
  const { intro, items } = section;
  const layout = layoutOf(section.heading, intro, items, index);
  const iconOf = (item: ContentItem) => icons[item.title];

  const heading = (props: { onDark?: boolean; className?: string } = {}) => (
    <SectionHeading
      id={`${id}-title`}
      eyebrow={pill}
      eyebrowStyle="pill"
      size="md"
      title={section.heading}
      align={props.onDark ? "center" : "left"}
      onDark={props.onDark}
      className={props.className}
    />
  );

  if (layout === "band") {
    return (
      <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 py-6">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-14 text-center sm:px-12 sm:py-16">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-15" />
          <div aria-hidden className="absolute -top-40 left-1/2 -z-10 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-brand-500/40 blur-3xl" />
          {heading({ onDark: true, className: "mx-auto" })}
          <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-4">
            {intro.filter((b) => !isList(b)).map((b, i) => (
              <RichText key={i} blocks={[b]} className="text-lead text-brand-100" />
            ))}
          </div>
          {intro.filter(isList).map((list, i) =>
            average(list.items) <= 22 ? (
              <ul key={i} className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2.5">
                {list.items.map((item, j) => (
                  <li
                    key={j}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-[background-color,border-color,box-shadow] duration-200 hover:border-transparent hover:bg-primary hover:shadow-glow"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <ul key={i} className="mx-auto mt-8 grid max-w-4xl gap-3 text-left sm:grid-cols-2">
                {list.items.map((item, j) => (
                  <li key={j} className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-brand-50">
                    <span aria-hidden className="bg-brand-gradient mt-0.5 grid size-6 shrink-0 place-items-center rounded-full text-white">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            ),
          )}
        </div>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 py-14 sm:py-16">
      {layout === "split" ? (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-12">
          <div className="self-start lg:sticky lg:top-28">
            {heading()}
            {intro.length > 0 && <Intro blocks={intro} compact />}
          </div>
          <ScrollSteps>
            <ul className="flex flex-col gap-3">
              {items.map((item, i) => (
                <li
                  key={`${i}-${item.title}`}
                  data-step
                  className="group/step relative flex gap-4 rounded-2xl border border-transparent p-5 transition-[background-color,border-color,box-shadow] duration-500 ease-smooth data-[state=on]:border-brand-200 data-[state=on]:bg-surface data-[state=on]:shadow-glow data-[state=todo]:[&_h3]:text-muted sm:p-6 dark:data-[state=on]:border-brand-800"
                >
                  <span
                    aria-hidden
                    className="bg-brand-gradient absolute top-5 bottom-5 left-0 w-1 origin-top scale-y-0 rounded-full transition-transform duration-500 ease-smooth group-data-[state=on]/step:scale-y-100"
                  />
                  <ItemBadge icon={iconOf(item)} index={i} active />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <ItemBody blocks={item.body} />
                  </div>
                </li>
              ))}
            </ul>
          </ScrollSteps>
        </div>
      ) : (
        <>
          {heading()}
          {intro.length > 0 && <Intro blocks={intro} />}
        </>
      )}

      {layout === "bento" && <Bento items={items} iconOf={iconOf} startLabel={startLabel} itemCta={itemCta} />}

      {layout === "zigzag" && (
        <ScrollSteps className="relative mt-12">
          {/* Rail: centred on laptops, at the left on phones; the gradient fill follows the scroll. */}
          <span aria-hidden className="absolute top-2 bottom-2 left-5 w-0.5 bg-line md:left-1/2 md:-translate-x-1/2" />
          <span
            aria-hidden
            className="bg-brand-gradient absolute top-2 bottom-2 left-5 w-0.5 origin-top scale-y-[var(--fill,1)] md:left-1/2 md:-translate-x-1/2"
          />
          <ol className="relative flex flex-col gap-6 md:gap-4">
            {items.map((item, i) => (
              <li
                key={`${i}-${item.title}`}
                data-step
                data-reveal
                className="group/step grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] md:items-center md:gap-0"
              >
                <span
                  className={cn(
                    "bg-brand-gradient relative z-10 row-start-1 grid size-10 place-items-center rounded-full font-display text-sm font-bold text-white shadow-glow ring-4 ring-background transition-[background-color,color,box-shadow] duration-300 group-data-[state=todo]/step:bg-none group-data-[state=todo]/step:bg-background group-data-[state=todo]/step:text-muted group-data-[state=todo]/step:shadow-none group-data-[state=todo]/step:ring-line md:col-start-2 md:size-11 md:justify-self-center",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div
                  className={cn(
                    "row-start-1 rounded-2xl border border-line bg-background p-5 shadow-soft transition-[border-color,box-shadow,translate] duration-500 ease-smooth group-data-[state=on]/step:border-brand-300 group-data-[state=on]/step:shadow-glow group-data-[state=todo]/step:shadow-none group-data-[state=todo]/step:[&_h3]:text-muted sm:p-6 dark:group-data-[state=on]/step:border-brand-700",
                    i % 2 === 0 ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6",
                  )}
                >
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <ItemBody blocks={item.body} className="mt-2" />
                </div>
              </li>
            ))}
          </ol>
        </ScrollSteps>
      )}

      {layout === "tabs" && (
        <StackTabs
          groups={items.map((item) => ({
            title: item.title,
            icon: iconOf(item),
            tools: item.body.flatMap((b) => (isList(b) ? b.items : [])),
          }))}
        />
      )}

      {layout === "grid" && (
        <ul className={cn("mt-10 grid gap-4 sm:gap-5", gridCols(items.length))}>
          {items.map((item, i) => (
            <li
              key={`${i}-${item.title}`}
              data-reveal
              style={revealDelay(i % 3)}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift sm:p-7 dark:hover:border-brand-700"
            >
              <span
                aria-hidden
                className="bg-brand-gradient absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-500 ease-smooth group-hover:scale-x-100"
              />
              <div className="flex items-center gap-3">
                <ItemBadge icon={iconOf(item)} index={i} />
                <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
              </div>
              <ItemBody blocks={item.body} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** The first section's items: a large dark featured tile, then icon tiles filling the grid. */
function Bento({
  items,
  iconOf,
  startLabel,
  itemCta,
}: {
  items: ContentItem[];
  iconOf: (item: ContentItem) => string | undefined;
  startLabel?: string;
  itemCta: string;
}) {
  const [featured, ...rest] = items;
  // Make the last row full on each breakpoint: on laptops the featured tile takes 2 of the 3
  // columns with one tile beside it, then rows of three; the last tile stretches to fill a gap.
  const lgRemainder = (rest.length - 1) % 3;
  const smOdd = rest.length % 2 === 1;
  const icon = iconOf(featured);
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        data-reveal
        className="relative isolate flex flex-col overflow-hidden rounded-3xl bg-brand-950 p-7 text-white sm:col-span-2 sm:p-9"
      >
        <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-15" />
        <div aria-hidden className="absolute -right-24 -bottom-24 -z-10 size-80 rounded-full bg-brand-500/45 blur-3xl" />
        <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl shadow-glow">
          {icon ? <LineIcon name={icon} className="size-7" /> : <Icon name="sparkles" className="size-7" />}
        </span>
        <p className="mt-8 text-xs font-semibold tracking-[0.12em] text-brand-300 uppercase">
          01{startLabel && ` · ${startLabel}`}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-tight font-bold sm:text-3xl">{featured.title}</h3>
        <ItemBody blocks={featured.body} onDark className="mt-4 mb-8 max-w-xl" />
        <Link
          href="/contact"
          className="group mt-auto inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/20"
        >
          {itemCta}
          <Icon name="arrow-up-right" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </li>
      {rest.map((item, i) => {
        const last = i === rest.length - 1;
        return (
          <li
            key={`${i}-${item.title}`}
            data-reveal
            style={revealDelay(i % 3)}
            className={cn(
              "group relative flex flex-col gap-3 rounded-3xl border border-line bg-background p-6 shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-glow dark:hover:border-brand-700",
              last && smOdd && "sm:col-span-2 lg:col-span-1",
              last && lgRemainder === 1 && "lg:col-span-3",
              last && lgRemainder === 2 && "lg:col-span-2",
            )}
          >
            {/* Decorative index, drawn by CSS so it isn't text (see FeatureGrid). */}
            <span
              aria-hidden
              data-n={String(i + 2).padStart(2, "0")}
              className="absolute top-5 right-6 font-display text-sm font-bold text-line-strong before:content-[attr(data-n)]"
            />
            <span className="grid size-11 place-items-center rounded-xl bg-soft text-soft-foreground transition-[background-color,color,rotate] duration-300 ease-smooth group-hover:-rotate-6 group-hover:bg-primary group-hover:text-on-primary">
              {iconOf(item) ? <LineIcon name={iconOf(item)!} /> : <Icon name="sparkles" />}
            </span>
            <h3 className="mt-2 text-lg leading-snug font-bold">{item.title}</h3>
            <ItemBody blocks={item.body} compact />
          </li>
        );
      })}
    </ul>
  );
}

/** An item's icon tile, or its number when the site shows no icon for it. */
function ItemBadge({ icon, index, active }: { icon?: string; index: number; active?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-soft text-soft-foreground transition-[background-color,color,rotate] duration-300 ease-smooth group-hover:-rotate-6",
        active && "group-data-[state=on]/step:bg-primary group-data-[state=on]/step:text-on-primary",
      )}
    >
      {icon ? <LineIcon name={icon} /> : <span className="font-display text-sm font-bold">{String(index + 1).padStart(2, "0")}</span>}
    </span>
  );
}

/** Two columns for pairs and fours, three for threes and longer sets. */
function gridCols(count: number) {
  if (count === 2 || count === 4) return "sm:grid-cols-2";
  if (count === 1) return "";
  return "sm:grid-cols-2 lg:grid-cols-3";
}

/** An item's text: paragraphs via RichText, lists as ticked lists. */
function ItemBody({ blocks, compact, onDark, className }: { blocks: RichBlock[]; compact?: boolean; onDark?: boolean; className?: string }) {
  const tone = onDark ? "text-brand-100" : "text-muted";
  return (
    <div className={cn("flex flex-col gap-3", compact && "text-[0.9375rem]", className)}>
      {blocks.map((block, i) =>
        isList(block) ? (
          <CheckList key={i} items={block.items} onDark={onDark} />
        ) : block.type === "paragraph" && block.text.startsWith("Starting at") ? (
          // Prices (e.g. the web cost cards) stand out from the description.
          <p key={i} className="font-display text-xl font-bold text-link">
            {block.text}
          </p>
        ) : (
          <RichText key={i} blocks={[block]} className={tone} />
        ),
      )}
    </div>
  );
}

function CheckList({ items, onDark, className }: { items: string[]; onDark?: boolean; className?: string }) {
  return (
    <ul className={cn("flex flex-col gap-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className={cn("flex gap-3", onDark ? "text-brand-100" : "text-muted")}>
          <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-soft text-soft-foreground">
            <Icon name="check" className="size-3" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Section intro: paragraphs as lead text, lists as chips (short) or a ticked grid, tables via RichText. */
function Intro({ blocks, compact }: { blocks: RichBlock[]; compact?: boolean }) {
  return (
    <div data-reveal className="mt-6 flex max-w-4xl flex-col gap-5">
      {blocks.map((block, i) =>
        isList(block) ? (
          average(block.items) <= 22 ? (
            <ul key={i} className="flex flex-wrap gap-2">
              {block.items.map((item, j) => (
                <li key={j} className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <CheckList key={i} items={block.items} className="grid gap-x-8 sm:grid-cols-2" />
          )
        ) : block.type === "paragraph" ? (
          <p key={i} className={compact ? "text-muted" : "text-lead text-muted"}>
            {block.text}
          </p>
        ) : (
          <RichText key={i} blocks={[block]} className="text-muted" />
        ),
      )}
    </div>
  );
}
