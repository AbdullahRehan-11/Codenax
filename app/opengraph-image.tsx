import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { heroSlides } from "@/content/home";
import { site } from "@/content/site";

// The picture shown when a link to the site is shared (WhatsApp, LinkedIn, Slack…).
// Generated once at build time. Pages with their own opengraph-image (blog posts) override it.
export const alt = `${site.name}: ${heroSlides[0].title} ${heroSlides[0].highlight}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logo = await readFile(join(process.cwd(), "public/images/brand/logo.png"));
  const { title, highlight } = heroSlides[0];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #ffffff 0%, #eef7fd 55%, #d6ecfa 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>. */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="" width={308} height={64} />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, lineHeight: 1.05, color: "#0b1b2b" }}>
            <span style={{ marginRight: 20 }}>{title}</span>
            <span style={{ color: "#1a7fc0" }}>{highlight}</span>
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#41546a", maxWidth: 900 }}>{site.description}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 8, borderRadius: 8, background: "linear-gradient(90deg, #1a95d5, #2f4fd8)" }} />
          <div style={{ fontSize: 26, fontWeight: 600, color: "#1a7fc0" }}>{site.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    size,
  );
}
