import Link from "next/link";
import type { NavGroup } from "@/lib/types";
import { footerGroups } from "@/content/nav";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { Logo } from "./logo";

export function Footer() {
  return (
    // Extra bottom padding on mobile keeps the copyright clear of the sticky CTA bar.
    <footer className="border-t border-line bg-surface pb-24 lg:pb-0">
      <Container className="grid gap-10 py-14 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="flex flex-col gap-5 lg:col-span-4">
          <Logo />
          <p className="max-w-sm text-muted">{site.description}</p>
          <ul className="flex gap-2">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full border border-line bg-background text-muted transition-colors duration-200 hover:border-primary hover:text-link"
                >
                  <Icon name={social.icon} className="size-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-3 md:gap-8 lg:col-span-8">
          {footerGroups.map((group) => (
            <FooterGroup key={group.title} group={group} />
          ))}

          <div className="pt-8 md:pt-0">
            <h2 className="font-sans text-sm font-semibold">Get in touch</h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className="group inline-flex min-h-11 items-center gap-3 text-muted hover:text-link lg:min-h-0">
                  <Icon name="mail" className="size-4.5 text-link" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 text-muted hover:text-link lg:min-h-0"
                >
                  <Icon name="whatsapp" className="size-4.5 text-link" />
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-muted">
                <Icon name="map-pin" className="mt-0.5 size-4.5 text-link" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-1 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{site.copyright}</p>
          <p>{site.tagline}</p>
        </Container>
      </div>
    </footer>
  );
}

/** Collapsible on mobile, an always-open column from md up. */
function FooterGroup({ group }: { group: NavGroup }) {
  const links = (
    <ul className="flex flex-col gap-1 lg:gap-3">
      {group.links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="inline-flex min-h-11 items-center text-sm text-muted transition-colors duration-200 hover:text-link lg:min-h-0"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <details className="group border-b border-line md:hidden">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
          {group.title}
          <Icon
            name="chevron-down"
            className="size-4 text-muted transition-transform duration-300 ease-smooth group-open:rotate-180"
          />
        </summary>
        <div className="pb-4">{links}</div>
      </details>
      <div className="hidden md:block">
        <h2 className="font-sans text-sm font-semibold">{group.title}</h2>
        <div className="mt-4">{links}</div>
      </div>
    </div>
  );
}
