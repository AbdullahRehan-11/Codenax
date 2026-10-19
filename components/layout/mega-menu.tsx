import Link from "next/link";
import type { NavLink, NavMenu } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

type MenuPanelProps = {
  menu: NavMenu;
  open: boolean;
  onNavigate: () => void;
};

/** Desktop panel for a nav menu: full-width "mega" layout or a compact dropdown. */
export function MenuPanel({ menu, open, onNavigate }: MenuPanelProps) {
  return (
    <div
      id={`menu-${menu.id}`}
      className={cn(
        "absolute top-full",
        menu.layout === "mega" ? "inset-x-0 pt-px" : "left-1/2 -translate-x-1/2 pt-3",
        // Visibility flips instantly on open (links are focusable at once) and only after
        // the fade on close.
        open
          ? "visible translate-y-0 opacity-100 [transition:opacity_200ms_var(--ease-smooth),translate_200ms_var(--ease-smooth),visibility_0s]"
          : "pointer-events-none invisible -translate-y-2 opacity-0 [transition:opacity_200ms_var(--ease-smooth),translate_200ms_var(--ease-smooth),visibility_0s_200ms]",
      )}
    >
      {menu.layout === "mega" ? (
        <MegaLayout menu={menu} onNavigate={onNavigate} />
      ) : (
        <DropdownLayout menu={menu} onNavigate={onNavigate} />
      )}
    </div>
  );
}

function MegaLayout({ menu, onNavigate }: Omit<MenuPanelProps, "open">) {
  const [featured, ...rest] = menu.groups;
  return (
    <div className="border-b border-line bg-background shadow-lift">
      <Container className="grid gap-6 py-8 lg:grid-cols-12">
        <div className="self-start rounded-2xl bg-surface p-4 lg:col-span-4">
          <GroupTitle>{featured.title}</GroupTitle>
          <ul className="mt-2 flex flex-col gap-1">
            {featured.links.map((link) => (
              <li key={link.href + link.label}>
                <RichLink link={link} onNavigate={onNavigate} emphasis />
              </li>
            ))}
          </ul>
        </div>
        {rest.map((group) => (
          <div key={group.title} className="lg:col-span-8">
            <GroupTitle className="px-3">{group.title}</GroupTitle>
            <ul className="mt-2 grid grid-cols-2 gap-1">
              {group.links.map((link) => (
                <li key={link.href + link.label}>
                  <RichLink link={link} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      {menu.overview && (
        <div className="border-t border-line bg-surface">
          <Container className="py-3">
            <OverviewLink link={menu.overview} onNavigate={onNavigate} />
          </Container>
        </div>
      )}
    </div>
  );
}

function DropdownLayout({ menu, onNavigate }: Omit<MenuPanelProps, "open">) {
  const wide = menu.groups.some((g) => g.links.length > 6);
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-background shadow-lift",
        wide ? "w-[30rem]" : "w-60",
      )}
    >
      <div className="p-2">
        {menu.groups.map((group) => (
          <ul key={group.title} className={cn("grid gap-0.5", wide && "grid-cols-2")}>
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="flex min-h-11 items-center rounded-xl px-3 text-[0.9375rem] font-medium text-foreground transition-colors duration-200 hover:bg-surface-2 hover:text-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {menu.overview && (
        <div className="border-t border-line bg-surface px-5 py-3">
          <OverviewLink link={menu.overview} onNavigate={onNavigate} />
        </div>
      )}
    </div>
  );
}

function GroupTitle({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("text-eyebrow font-semibold uppercase text-muted", className)}>{children}</p>
  );
}

function RichLink({
  link,
  onNavigate,
  emphasis,
}: {
  link: NavLink;
  onNavigate: () => void;
  emphasis?: boolean;
}) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={cn(
        "group flex items-start gap-3 rounded-xl p-3 transition-colors duration-200",
        emphasis ? "hover:bg-background" : "hover:bg-surface",
      )}
    >
      {link.icon && (
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-lg transition-colors duration-200",
            emphasis
              ? "bg-primary text-on-primary"
              : "bg-soft text-soft-foreground group-hover:bg-primary group-hover:text-on-primary",
          )}
        >
          <Icon name={link.icon} />
        </span>
      )}
      <span className="flex flex-col gap-0.5">
        <span className="font-semibold text-foreground group-hover:text-link">{link.label}</span>
        {link.description && <span className="text-sm text-muted">{link.description}</span>}
      </span>
    </Link>
  );
}

function OverviewLink({ link, onNavigate }: { link: NavLink; onNavigate: () => void }) {
  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-link"
    >
      {link.label}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
