import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { MobileCTABar } from "@/components/layout/mobile-cta-bar";
import { Navbar } from "@/components/layout/navbar";
import { ScrollReveal } from "@/components/layout/scroll-reveal";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

// Body text
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display headings
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Defaults for every page; each page adds its own via pageMetadata() in lib/seo.ts.
// metadataBase turns relative URLs (canonical, Open Graph) into absolute codenax.com ones.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.name,
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image" },
};

// Runs during HTML parsing, before first paint, so a saved theme never flashes.
// Light is the default; only the theme preference is ever stored.
// It also sets data-js, so scroll-reveal content is only hidden when JavaScript can reveal it.
const themeScript = `(function(){document.documentElement.setAttribute("data-js","");try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only rounded-full bg-primary px-5 py-3 font-semibold text-on-primary focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
          {children}
        </main>
        <Footer />
        <MobileCTABar />
        <ScrollReveal />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
