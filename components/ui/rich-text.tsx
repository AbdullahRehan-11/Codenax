import { Fragment, type ReactNode } from "react";
import type { RichBlock } from "@/lib/types";
import { cn } from "@/lib/cn";
import { slugify } from "@/lib/slug";

type RichTextProps = {
  blocks: RichBlock[];
  className?: string;
  /** Gives each h2 an id (from its text) so a table of contents can link to it. */
  headingIds?: boolean;
  /** Extra content shown right under a heading (e.g. a company's logo), looked up by its text. */
  afterHeading?: (text: string) => ReactNode;
};

/** Renders long-form content from content/ (paragraphs, headings, lists, quotes, tables) in order. */
export function RichText({ blocks, className, headingIds, afterHeading }: RichTextProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading": {
            const extra = afterHeading?.(block.text);
            const heading = block.level === 2 ? (
              <h2
                id={headingIds ? slugify(block.text) : undefined}
                className="mt-4 scroll-mt-28 text-display-3 font-bold text-foreground"
              >
                {block.text}
              </h2>
            ) : (
              <h3 className="mt-2 text-xl font-semibold text-foreground">{block.text}</h3>
            );
            return (
              <Fragment key={i}>
                {heading}
                {extra}
              </Fragment>
            );
          }
          case "paragraph":
            return <p key={i}>{block.text}</p>;
          case "list":
            return (
              <ul key={i} className="flex list-disc flex-col gap-2 pl-5 marker:text-link">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-primary pl-5 text-lg italic text-foreground">
                {block.text}
              </blockquote>
            );
          case "table": {
            const [head, ...body] = block.rows;
            return (
              // On phones the table scrolls sideways; tabIndex lets keyboard users focus and scroll it.
              <div key={i} tabIndex={0} role="region" aria-label="Table" className="overflow-x-auto rounded-xl border border-line">
                <table className="w-full min-w-[32rem] text-left text-sm">
                  <thead className="bg-surface text-foreground">
                    <tr>
                      {head.map((cell, j) =>
                        // An empty corner cell isn't a header for anything, so it's a plain cell.
                        cell.trim() ? (
                          <th key={j} scope="col" className="px-4 py-3 font-semibold">
                            {cell}
                          </th>
                        ) : (
                          <td key={j} className="px-4 py-3" />
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {body.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, j) =>
                          j === 0 ? (
                            <th key={j} scope="row" className="px-4 py-3 font-semibold text-foreground">
                              {cell}
                            </th>
                          ) : (
                            <td key={j} className="px-4 py-3">
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
