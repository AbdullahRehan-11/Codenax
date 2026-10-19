import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { contactForm, contactPage } from "@/content/contact";
import { site } from "@/content/site";
import { revealDelay } from "@/lib/reveal";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { ContactForm } from "@/components/features/contact-form";
import { PrefilledContactForm } from "@/components/features/prefilled-contact-form";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = pageMetadata({ ...contactPage.meta, path: "/contact" });

// Decorative icon per channel, in content order: email, WhatsApp, address, response time.
const CHANNEL_ICONS: IconName[] = ["mail", "whatsapp", "map-pin", "clock"];
const BADGE_ICONS: IconName[] = ["sparkles", "clock", "shield-check"];

export default function ContactPage() {
  const { hero, badges, channels, about } = contactPage;
  return (
    <>
      <PageHero {...hero}>
        <ul className="flex flex-wrap gap-2.5">
          {badges.map((badge, i) => (
            <li
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-background/70 px-3.5 py-1.5 text-sm font-semibold backdrop-blur"
            >
              <Icon name={BADGE_ICONS[i]} className="size-4 text-link" />
              {badge}
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <section
            aria-labelledby="contact-form-title"
            data-reveal
            className="relative rounded-3xl border border-line bg-background p-6 shadow-soft sm:p-10 lg:col-span-7"
          >
            <div aria-hidden className="bg-brand-gradient absolute inset-x-8 top-0 h-1 rounded-b-full" />
            <h2 id="contact-form-title" className="text-display-3 font-bold">
              {contactForm.title}
            </h2>
            <p className="mt-2 mb-8 text-muted">{contactForm.description}</p>
            {/* The fallback is the same form without a prefill, so the page stays fully static. */}
            <Suspense fallback={<ContactForm />}>
              <PrefilledContactForm />
            </Suspense>
          </section>

          <aside aria-label="Other ways to reach us" className="flex flex-col gap-4 lg:col-span-5">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {channels.map((channel, i) => {
                const body = (
                  <>
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-soft text-soft-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-on-primary">
                      <Icon name={CHANNEL_ICONS[i]} className="size-5" />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="text-sm text-muted">{channel.label}</span>
                      <span className="font-semibold break-words">{channel.value}</span>
                    </span>
                    {channel.href && (
                      <Icon
                        name="arrow-up-right"
                        className="ml-auto size-4 text-muted transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-link"
                      />
                    )}
                  </>
                );
                const box = "flex items-center gap-4 rounded-2xl border border-line bg-background p-5";
                return (
                  <li key={channel.label} data-reveal style={revealDelay(i)}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                        className={`group ${box} transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift dark:hover:border-brand-700`}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={box}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              data-reveal
              style={revealDelay(channels.length)}
              className="relative isolate overflow-hidden rounded-3xl bg-brand-950 p-7 text-white"
            >
              <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-20" />
              <div aria-hidden className="absolute -right-16 -bottom-16 -z-10 size-56 rounded-full bg-brand-500/40 blur-3xl" />
              <p className="font-display text-2xl font-bold">{about.name}</p>
              <p className="mt-3 text-brand-100">{about.text}</p>
              <ul className="mt-6 flex gap-2">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white hover:text-brand-950"
                    >
                      <Icon name={social.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </div>
    </>
  );
}
