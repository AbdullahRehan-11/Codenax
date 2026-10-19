import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "@/content/blog";
import { site } from "@/content/site";

// Each post's share picture: its cover photo, darkened, with the category and title on top.
export const alt = `${site.name} blog article`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Drawn once per post at build time, like the pages themselves.
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const cover = await readFile(join(process.cwd(), `public/images/blog/covers/${slug}.jpg`)).catch(() => null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0b1b2b", fontFamily: "sans-serif" }}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>.
          <img
            src={`data:image/jpeg;base64,${cover.toString("base64")}`}
            alt=""
            width={1200}
            height={630}
            style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
          />
        )}
        <div
          style={{
            // Satori (the image renderer) has no `inset`, so the box is spelled out.
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 24,
            padding: 72,
            background: "linear-gradient(to top, rgba(6,18,30,0.95) 0%, rgba(6,18,30,0.7) 50%, rgba(6,18,30,0.2) 100%)",
          }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ fontSize: 24, fontWeight: 600, color: "#ffffff", background: "#1a7fc0", padding: "8px 20px", borderRadius: 999 }}>
              {post?.category ?? "Blog"}
            </div>
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, color: "#ffffff" }}>{post?.title ?? site.name}</div>
          <div style={{ fontSize: 28, color: "#cfe6f6" }}>
            {post ? `${post.author.name} · ${site.name}` : site.name}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
