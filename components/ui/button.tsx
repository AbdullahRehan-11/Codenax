import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  /** Full width on mobile, auto width from `sm` up. */
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-smooth " +
  "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary shadow-glow hover:bg-primary-hover",
  secondary:
    "border border-line-strong bg-background text-foreground hover:border-primary hover:text-link",
  ghost: "text-foreground hover:bg-surface-2",
};

// md and lg meet the 44px minimum tap target. sm is for dense desktop UI only.
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base sm:h-13 sm:px-7",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", block, className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], block && "w-full sm:w-auto", className);

  if (rest.href === undefined) {
    const { type = "button", ...buttonProps } = rest as ButtonAsButton;
    return (
      <button type={type} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }

  const { href, ...anchorProps } = rest as ButtonAsLink;

  // Internal routes and in-page anchors use client-side navigation.
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  // mailto:, tel: and external URLs. Web links open in a new tab.
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
