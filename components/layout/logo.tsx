import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import logo from "@/public/images/brand/logo.png";

/**
 * The CodeNax logo from codenax.com (231×48 PNG; a vector version would be sharper).
 * Its wordmark is black, so in dark mode it is inverted and hue-rotated 180°: black turns
 * white while the blue mark stays blue.
 */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label={`${site.name} home`} className={cn("inline-flex shrink-0", className)}>
      <Image
        src={logo}
        alt=""
        loading="eager"
        className="h-8 w-auto dark:invert dark:hue-rotate-180"
      />
    </Link>
  );
}
