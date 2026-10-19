"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/cn";
import type { NavMenu } from "@/lib/types";
import { mainNav, primaryCta } from "@/content/nav";
import { useScrolledPast } from "@/hooks/use-scrolled-past";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";
import { MenuPanel } from "./mega-menu";
import { MobileNav } from "./mobile-nav";
import { ThemeToggle } from "./theme-toggle";

// Open state records the path it was opened on, so any navigation closes it
// without needing an effect.
type OpenMenu = { id: string; path: string; by: "hover" | "click" };

const isActive = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScrolledPast(8);

  const [menu, setMenu] = useState<OpenMenu | null>(null);
  const openId = menu?.path === pathname ? menu.id : null;

  const [mobileOpenedAt, setMobileOpenedAt] = useState<string | null>(null);
  const mobileOpen = mobileOpenedAt === pathname;

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const closeTimer = useRef<number | undefined>(undefined);

  // Close the desktop menu on outside click or Escape.
  useEffect(() => {
    if (!openId) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenu(null);
      triggerRefs.current[openId]?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    }  
  }, [openId]);

  function onPointerEnter(event: ReactPointerEvent, id: string) {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setMenu((current) =>
      current?.id === id && current.path === pathname ? current : { id, path: pathname, by: "hover" },
    );
  }

  function onPointerLeave(event: ReactPointerEvent) {
    if (event.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setMenu(null), 150);
  }

  function onTriggerClick(id: string) {
    setMenu((current) => {
      const isOpen = current?.id === id && current.path === pathname;
      // A click on a hover-opened menu keeps it open; a second click closes it.
      if (isOpen && current.by === "click") return null;
      return { id, path: pathname, by: "click" };
    });
  }

  // Stable identity: MobileNav's focus-trap effect depends on it.
  const closeMobile = useCallback((restoreFocus: boolean) => {
    setMobileOpenedAt(null);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  const solid = scrolled || openId !== null;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-smooth",
          solid
            ? "border-line bg-background/85 shadow-soft backdrop-blur-lg"
            : "border-transparent bg-background/0",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-18">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.kind === "link" ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={cn(
                        "inline-flex h-10 items-center whitespace-nowrap rounded-full px-2.5 text-sm xl:text-[0.9375rem] xl:px-3.5 font-medium transition-colors duration-200 hover:bg-surface-2 hover:text-foreground",
                        isActive(pathname, item.href) ? "text-link" : "text-foreground/80",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <MenuItem
                    key={item.id}
                    menu={item}
                    open={openId === item.id}
                    active={
                      (item.overview !== undefined && isActive(pathname, item.overview.href)) ||
                      item.groups.some((g) => g.links.some((l) => isActive(pathname, l.href)))
                    }
                    triggerRef={(el) => {
                      triggerRefs.current[item.id] = el;
                    }}
                    onPointerEnter={(e) => onPointerEnter(e, item.id)}
                    onPointerLeave={onPointerLeave}
                    onTriggerClick={() => onTriggerClick(item.id)}
                    onBlurOutside={() => setMenu(null)}
                    onNavigate={() => setMenu(null)}
                  />
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Wrapper handles visibility: Button's own inline-flex would override `hidden`.
                Phones and tablets get the CTA from MobileCTABar and the menu sheet instead. */}
            <div className="hidden lg:block">
              <Button href={primaryCta.href}>{primaryCta.label}</Button>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpenedAt(pathname)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              className="grid size-11 place-items-center rounded-full border border-line text-foreground transition-colors duration-200 hover:bg-surface-2 lg:hidden"
            >
              <Icon name="menu" />
            </button>
          </div>
        </Container>
      </header>

      {/* Sibling of the header: its backdrop-filter would otherwise trap the fixed sheet. */}
      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}

type MenuItemProps = {
  menu: NavMenu;
  open: boolean;
  active: boolean;
  triggerRef: (el: HTMLButtonElement | null) => void;
  onPointerEnter: (event: ReactPointerEvent) => void;
  onPointerLeave: (event: ReactPointerEvent) => void;
  onTriggerClick: () => void;
  onBlurOutside: () => void;
  onNavigate: () => void;
};

function MenuItem({
  menu,
  open,
  active,
  triggerRef,
  onPointerEnter,
  onPointerLeave,
  onTriggerClick,
  onBlurOutside,
  onNavigate,
}: MenuItemProps) {
  return (
    <li
      // Mega panels anchor to the header; dropdowns anchor to their own item.
      className={menu.layout === "mega" ? "static" : "relative"}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        // Close when keyboard focus moves outside this item.
        const next = event.relatedTarget as Node | null;
        if (next && !event.currentTarget.contains(next)) onBlurOutside();
      }}
    >
      {menu.overview ? (
        // Menus with an overview page: the label links to it, the chevron opens the menu
        // (hover still opens it too). Both sit in one pill so it looks like a single item.
        <span
          className={cn(
            "inline-flex h-10 items-center whitespace-nowrap rounded-full text-sm xl:text-[0.9375rem] font-medium transition-colors duration-200 hover:bg-surface-2 hover:text-foreground",
            open && "bg-surface-2 text-foreground",
            !open && (active ? "text-link" : "text-foreground/80"),
          )}
        >
          <Link
            href={menu.overview.href}
            onClick={onNavigate}
            className="flex h-full items-center rounded-l-full pr-0.5 pl-2.5 xl:pl-3.5"
          >
            {menu.label}
          </Link>
          <button
            ref={triggerRef}
            type="button"
            onClick={onTriggerClick}
            aria-expanded={open}
            aria-controls={`menu-${menu.id}`}
            aria-label={`${menu.label} menu`}
            className="grid h-full place-items-center rounded-r-full pr-2 pl-0.5 xl:pr-3"
          >
            <Icon
              name="chevron-down"
              className={cn("size-4 transition-transform duration-200 ease-smooth", open && "rotate-180")}
            />
          </button>
        </span>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          onClick={onTriggerClick}
          aria-expanded={open}
          aria-controls={`menu-${menu.id}`}
          className={cn(
            "inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-2.5 text-sm xl:text-[0.9375rem] xl:px-3.5 font-medium transition-colors duration-200 hover:bg-surface-2 hover:text-foreground",
            open && "bg-surface-2 text-foreground",
            !open && (active ? "text-link" : "text-foreground/80"),
          )}
        >
          {menu.label}
          <Icon
            name="chevron-down"
            className={cn("size-4 transition-transform duration-200 ease-smooth", open && "rotate-180")}
          />
        </button>
      )}
      <MenuPanel menu={menu} open={open} onNavigate={onNavigate} />
    </li>
  );
}
