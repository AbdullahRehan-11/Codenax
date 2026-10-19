import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "@/components/ui/icon";

/** Small decorative icon per blog category, shown on the card's cover. */
export const BLOG_CATEGORY_ICONS: Record<string, IconName> = {
  "MVP Development": "rocket",
  "Staff Augmentation": "users",
  "AI & Product": "sparkles",
  Engineering: "code",
  Design: "palette",
  Automation: "trending-up",
  Product: "box",
};

/** What a card needs: everything but the article body, plus its photos (see lib/blog-media.ts). */
export type PostSummary = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "date" | "readingMinutes" | "author"> & {
  cover?: StaticImageData;
  avatar?: StaticImageData;
};

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));
// Our label: the site shows the number with "min read".
export const readingTime = (minutes: number) => `${minutes} min read`;

export const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

/** The author's photo, or their initials when there is none. */
export function AuthorAvatar({ name, photo, className }: { name: string; photo?: StaticImageData; className: string }) {
  return photo ? (
    <Image src={photo} alt="" sizes="4rem" className={cn("shrink-0 rounded-full object-cover", className)} />
  ) : (
    <span aria-hidden className={cn("bg-brand-gradient grid shrink-0 place-items-center rounded-full font-semibold text-white", className)}>
      {initials(name)}
    </span>
  );
}

/**
 * A blog post card: the post's cover photo, then category, title, excerpt and author.
 * "featured" lays it out wide (photo beside the text) from md up. It imports no content
 * (the CTA label and photos come in as props) so client components can use it without
 * bundling articles.
 */
export function PostCard({
  post,
  cta,
  featured,
  as: Title = "h2",
}: {
  post: PostSummary;
  cta: string;
  featured?: boolean;
  as?: "h2" | "h3";
}) {
  const icon = BLOG_CATEGORY_ICONS[post.category] ?? "file-text";
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-background shadow-soft transition-[translate,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700",
        featured && "md:grid md:grid-cols-2",
      )}
    >
      <div
        className={cn(
          "relative isolate overflow-hidden bg-brand-950",
          featured ? "aspect-[16/9] md:aspect-auto md:min-h-80" : "aspect-[16/9]",
        )}
      >
        {post.cover && (
          <Image
            src={post.cover}
            alt=""
            fill
            placeholder="blur"
            sizes={featured ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1280px) 26rem, (min-width: 768px) 50vw, 100vw"}
            className="-z-10 object-cover transition-[scale] duration-700 ease-smooth group-hover:scale-105"
          />
        )}
        <span aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-brand-950/50 to-transparent" />
        <span
          aria-hidden
          className="bg-brand-gradient absolute top-4 left-4 grid size-10 place-items-center rounded-xl text-white shadow-glow transition-[rotate] duration-300 group-hover:-rotate-6"
        >
          <Icon name={icon} className="size-5" />
        </span>
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-6 sm:p-7", featured && "md:justify-center md:p-10")}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-semibold text-soft-foreground">{post.category}</span>
          <span className="text-muted">{readingTime(post.readingMinutes)}</span>
        </p>
        <Title className={cn("font-bold", featured ? "text-display-3" : "text-xl")}>
          {/* The link covers the whole card. */}
          <Link href={`/blog/${post.slug}`} className="transition-colors after:absolute after:inset-0 group-hover:text-link">
            {post.title}
          </Link>
        </Title>
        <p className={cn("text-muted", !featured && "line-clamp-3")}>{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="flex min-w-0 items-center gap-2.5">
            <AuthorAvatar name={post.author.name} photo={post.avatar} className="size-9 text-xs" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-sm font-semibold">{post.author.name}</span>
              <time dateTime={post.date} className="text-xs text-muted">
                {formatDate(post.date)}
              </time>
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-link">
            {cta}
            <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
