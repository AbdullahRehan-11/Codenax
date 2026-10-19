# Content gaps and items to confirm

Every piece of text in `content/` was copied from the rendered pages of codenax.com on 2026-09-30. A script then checked all 3,853 strings against the captured pages, and 3,851 matched word for word. The two that don't are listed in section 6.

This file lists what is **missing**, **unconfirmed** or **deliberately left out**. Items marked ❓ need a decision from the owner before the page that uses them is built.

## 1. ✅ Stats (shown since 2026-10-05) and mock-up figures (still left out)

**Owner decision (2026-10-05): show the stats as codenax.com does.** `content/stats.ts` holds "120+ Live Applications · 99% Client Retention · 10+ Years of Experience · 8+ Industries Served", verbatim. As on the site: the first three sit in the home hero, and all four form a strip on About and Why Us (under the hero) and on the home page (between the engagement models and the services). The remaining rows below are numbers inside decorative app mock-ups we never recreated, so they stay out.

Originally these were **not** in any content file:

| Figure | Where it appears on codenax.com |
|---|---|
| 120+ Live Applications · 99% Client Retention · 10+ Years of Experience · 8+ Industries Served | Stat strips on the home, About and Why Us pages |
| "99% happy clients", "On time · Every sprint" | Home hero cards |
| 97% Accuracy, 88% Latency, 100% Uptime, ↑ 34% Requests, Speed 96, SEO 100, Accessibility 94, 4.9 avg store rating, 98% on-time, 94% test coverage, 847 passed | Mock-up visuals on the home service cards |
| 96.4% coverage, 279 tests · 0 failed, 100+ Engineers placed, sample chat and dashboard text | Mock-up visuals in the service page heroes |

## 2. ✅ Conflicting figures inside copied text (now shown)

These sentences are copied word for word, so the figures are in the content files. They disagree with each other on how long CodeNax has existed and how much it has shipped. **Owner decision (2026-09-30): deal with these later**, so they were held back. **Owner decision (2026-10-05): show them exactly as codenax.com does** (it is a demo site, so the differences may be intended). They now render on every page, and so do the blog figures below. The hold mechanism (`lib/on-hold.ts`) was removed on 2026-10-09 because it no longer hid anything.

| File | Text | Conflicts with |
|---|---|---|
| `content/home.ts` (hero slide 1) | "Backed by a decade of success…" | 12+ / 15 years elsewhere |
| `content/company.ts` (About hero) | "After spending 12+ years…" | "10+ Years" stat, "15 years" |
| `content/company.ts` (About story) | "Over 12+ years, we have shipped 200+ products…" | "120+ Live Applications", "100+ products" |
| `content/industries.ts` (hero) | "We've shipped 100+ products across 8 industries." | 120+ / 200+ |
| `content/services.ts` (web development) | "CodeNax, working in the IT sector for 15 years…" | 10+ / 12+ years |
| `content/services.ts` (MVP development) | Item title "15 Years of Experience" | 10+ / 12+ years |
| `content/services.ts` (metaverse development) | "…more than a decade in the industry…" | — |
| `content/services.ts` (staff augmentation) | "Codenax is an IT company operating in the US since 2015… headquartered in Cincinnati." | "Founded 2014", ©2020, Wyoming address |
| `content/blog.ts` (11 Best MVP Development Companies) | Codenax listing: "Year Founded: 2014", "Team Size: 11–50", "Hourly Rate: $25–$50" | "since 2015"; the $25–$49/hr below |
| `content/blog.ts` (Top IT Staff Augmentation Companies) | CodeNax row: "$25–$49/hr" | "$25–$50" above |

## 3. ✅ Prices shown on codenax.com

**Owner decision (2026-09-30): shown as the site shows them publicly.** The pricing page itself shows no amounts, and we add none there. Other pages quote these prices, copied as written:

- **Web development, "Cost Analysis" section:** Starting at $10,000 / $50,000 / $80,000 / $100,000
- **Mobile app development, cost section:** "ranges from about $50,000…", plus a complexity table ($50,000 / $120,000 / $250,000+)
- **Staff augmentation:** "Hiring a local engineer in the US can cost your company $10,000 to $15,000…" and "Up to 50% Cost Savings"
- **Estimator (`content/estimator.ts`):** hours per option and the $60 / $95 per-hour rates were read from the live estimator by trying every option. They reproduce every result tested, but the site doesn't publish the formula, so the owner should confirm them.

## 4. ✅ Blog authors

- **Owner decision (2026-09-30): shown as credited on the site.** Maya Chen (Head of Engineering), Daniel Okonkwo (Lead AI Engineer) and Sofia Marin (Head of Design). They also appear in a decorative "Your dedicated squad" mock-up on the staff augmentation page; noted, no action needed.
- **Salman (Founder & CEO)** appears consistently (About page, blog author), so no question there.

## 5. ✅ Company details (settled 2026-10-05)

| Item | Status |
|---|---|
| Address | Rendered pages say "30N Gould ST#7785 Sheridan, Wyoming". The site's JS config says "Cincinnati, Ohio, USA", and the staff augmentation page says "headquartered in Cincinnati". The rendered address is used. ✅ Owner: Wyoming (2026-10-05). |
| Social URLs | Rendered: `facebook.com/codenaxx`, `instagram.com/codenax_llc/`. The JS config has `facebook.com/codenax`, `instagram.com/codenax`. The rendered ones are used. ✅ Checked 2026-10-05: identical to the links codenax.com shows (Facebook, Instagram, LinkedIn, WhatsApp, email). |
| Fintech case study client | The site itself shows the client as "Fintech Client (TBD)". Copied as-is. ✅ Owner: keep it as the site shows it (2026-10-05). |

## 6. ✅ Labels we added that are not on codenax.com (approved 2026-10-05)

Owner decision (2026-10-05): where the site had no text, our wording is fine.

These are menu labels from Phase 3, not business claims. Keep them or replace them:

- **"Featured"**: group title in the Services mega menu (`content/nav.ts`)
- **"View all industries"**: link at the bottom of the Industries menu (`content/nav.ts`)
- **Insights menu entries:** the site's Insights menu has only "Blog". We added "FAQ" and "Estimator" from the footer's Resources group.
- ✅ **Service page labels (captured 2026-10-02):** the hero label and buttons, the pill above each section heading and the per-item icons are now copied from codenax.com (`content/service-extras.ts`). Branding & Marketing and Social Media Marketing have no hero label on the site, so their service name is used there.
- **Phase 6 page labels:** "On this page" (screen-reader name of the jump-link row on service pages) and the "View all industries" tile on industry pages. Headings reused from elsewhere on the site: "Frequently asked questions" (from /faq) above service FAQs, "What we do / Everything you need to build and grow" (from /services) above the other services, and "Industries we serve" (the menu's group title) above the other industries.
- **Phase 7 labels:** "On this page" also names the sticky section list on case studies (screen readers only). The story sections are numbered 01–04 as decoration.
- **Case-study quotes:** credited to the client company only; the site gives no person's name with these quotes. The label "Client feedback" above each quote was added at the owner's request.
- **Industry page titles:** the site has no page per industry, so `/industries/[slug]` uses "Industry name | CodeNax" as its title and the industry summary as its description.
- **Phase 8 labels (our wording, needed for the forms to work honestly):**
  - Estimator: "Continue to contact" replaces the site's "Email me this estimate" (no backend; see PROJECT-PLAN.md). The text it carries to the contact form uses the site's own labels.
  - Contact form: the validation messages ("Please enter your name.", "Please enter a valid email address.", …), the error-summary heading, "Sending…" while it waits, and the success screen ("Thanks for reaching out!" / "We've received your message and will get back to you within 24 hours." / "Send another message", owner decision 2026-10-07). The site's own messages come from its form library and weren't captured.
  - Screen-reader names: "Other ways to reach us" (contact sidebar), "Filter questions by category" (FAQ), "Yes" / "No" on comparison ticks and crosses.
- **Phase 9:** "Stages" (screen-reader name of the stage map on /process) and "On this page" (its sticky list).- **Phase 10:** "{n} min read" (the site shows the minutes; the wording is ours), "#" before tags, "Blog" as the article breadcrumb (the menu label), "Filter articles by category" and "On this page" (screen readers only). Post FAQs use the site's own heading above them, "FAQs" (switched 2026-10-05; it was the FAQ page's heading before).
- **Phase 13:** the 404 page's wording ("Page not found", "The page you're looking for doesn't exist or has moved. Let's get you back on track.", "Back to home", "Contact us") is ours; codenax.com has no 404 text to copy. Screen-reader names: "Popular pages" (404), "Table" (scrollable tables). The share image uses the home hero headline and the site description, both verbatim. Structured data (JSON-LD) repeats only content already on the pages; the address in it is the rendered one (see §5).
- **Testimonial rail (2026-10-08):** screen-reader names "Choose a slide" and "Go to slide {n}" on the new dots, and "Pause testimonials" / "Play testimonials" on the auto-play button, are ours. The "Read the story" link reuses the case-studies card label.
- **Inconsistency on the site (not changed):** the first post is titled "11 Best MVP Development Companies" on the page but its meta title says "Best 12 MVP Development Companies"; both are copied as-is.

## 7. Not available on codenax.com

- ✅ **Home industries carousel one-liners** (resolved 2026-10-01): all 8 were found in the site's own carousel data and are now `tagline` in `content/industries.ts`.
- **Images:**
  - ✅ In use (owner approved 2026-10-01): the codenax.com logo (PNG), favicon and app icons, and the two hero office photos (Unsplash).
  - ✅ Also in use (2026-10-01): the 8 industry photos and the 8 case-study product screenshots from codenax.com.
  - ✅ Also in use (2026-10-02): 56 tool logos from codenax.com/logos in the tech-stack marquee. Pinecone, Twilio and Microsoft Azure have no logo on the site and show a letter badge.
  - ✅ Also in use (2026-10-05): the blog's 9 cover photos (Unsplash), the 4 author photos, and the 11 company logos in "11 Best MVP Development Companies" (Emerline has none on the site). Salman's photo is his own (`/avatars/salman-khadium.jpg`) on every post; the site shows a stock photo for him on "How we run discovery sprints…" only, which looks like a mistake there, so it isn't copied.
  - Still missing: a vector (SVG) logo, client logos and team photos.
  - The blog posts reference images (e.g. "Prototype/MVP/Product") that are not copied.
- **FAQs:** the Branding & Marketing and Social Media Marketing service pages have none.
- **Careers:** no open roles (the site shows an empty state, which is copied).
- **"Meet the team"** (Life at CodeNax) links to /about; the site has no team page.
- **Hero mock-up content** was left out as decoration. That includes the MVP page's hour breakdown (Scope & strategy 8h, Design & prototype 16h, Build 40h, AI & integrations 8h, Test & deploy 8h). It can be added back if wanted.
