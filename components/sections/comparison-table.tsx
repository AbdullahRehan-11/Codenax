import type { ComparisonCell, ComparisonTable as Table } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/icon";

/**
 * A comparison with CodeNax in the first column. From md up it is a real table with that column
 * highlighted; on phones each row becomes a small card, so nothing scrolls sideways.
 */
export function ComparisonTable({ table, id, as: Title = "h2" }: { table: Table; id: string; as?: "h2" | "h3" }) {
  const [ours, ...others] = table.columns;
  const RowTitle = Title === "h2" ? "h3" : "h4";
  return (
    <section aria-labelledby={id} data-reveal className="flex flex-col gap-6">
      <Title id={id} className="text-display-3 font-bold">
        {table.title}
      </Title>

      {/* Tablet and up. */}
      <div className="hidden overflow-hidden rounded-3xl border border-line bg-background shadow-soft md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <td className="w-1/4 p-5" />
              <th scope="col" className="bg-brand-gradient p-5 font-display text-lg font-bold text-white">
                <span className="flex items-center gap-2">
                  <Icon name="sparkles" className="size-4" />
                  {ours}
                </span>
              </th>
              {others.map((column) => (
                <th key={column} scope="col" className="p-5 font-display text-lg font-bold text-muted">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className="border-b border-line transition-colors last:border-b-0 hover:bg-surface">
                <th scope="row" className="p-5 font-semibold">
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td key={i} className={cn("p-5", i === 0 ? "bg-soft/60 font-semibold text-foreground" : "text-muted")}>
                    <Cell cell={cell} ours={i === 0} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: one card per row. */}
      <ul className="flex flex-col gap-3 md:hidden">
        {table.rows.map((row) => (
          <li key={row.label} className="rounded-2xl border border-line bg-background p-5 shadow-soft">
            <RowTitle className="font-semibold">{row.label}</RowTitle>
            <dl className="mt-3 flex flex-col gap-2">
              {row.cells.map((cell, i) => (
                <div
                  key={table.columns[i]}
                  className={cn(
                    "flex items-center justify-between gap-4 rounded-xl px-3.5 py-2.5 text-sm",
                    i === 0 ? "bg-soft font-semibold text-soft-foreground" : "bg-surface text-muted",
                  )}
                >
                  <dt>{table.columns[i]}</dt>
                  <dd className="text-right">
                    <Cell cell={cell} ours={i === 0} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Cell({ cell, ours }: { cell: ComparisonCell; ours: boolean }) {
  if (typeof cell === "string") return <>{cell}</>;
  const yes = cell.icon === "check";
  return (
    <span
      className={cn(
        "inline-grid size-7 place-items-center rounded-full",
        yes ? (ours ? "bg-primary text-on-primary" : "bg-success-soft text-success") : "bg-danger-soft text-danger",
      )}
    >
      <Icon name={yes ? "check" : "close"} className="size-4" title={yes ? "Yes" : "No"} />
    </span>
  );
}
