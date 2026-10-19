# CodeNax Website — Project Plan

> **Source of truth for the development roadmap.**
> Upcoming phases are only changed with explicit owner approval. Every change is recorded in the [Change Log](#change-log).
 
---

## Status

| # | Phase | Status |
|---|---|---|
| 0 | Create PROJECT-PLAN.md | ✅ Completed (2026-09-28) |
| 1 | Project Setup | ✅ Completed (2026-09-28) |
| 2 | Design System | ✅ Completed (2026-09-28) |
| 3 | Core Layout | ✅ Completed (2026-09-28) |
| 4 | Content Extraction | ✅ Completed (2026-09-30) |
| 5 | Homepage | ✅ Completed (2026-10-01) |
| 6 | Services & Industries | ✅ Completed (2026-10-02) |
| 7 | Case Studies | ✅ Completed (2026-10-02) |
| 8 | Conversion Pages (Pricing, Estimator, Contact, FAQ) | ✅ Completed (2026-10-05) |
| 9 | Company Pages | ✅ Completed (2026-10-05) |
| 10 | Blog | ✅ Completed (2026-10-05) |
| 11 | Responsive Audit | ✅ Completed (2026-10-05) |
| 12 | Animations & Interactions | ✅ Completed (2026-10-05) |
| 13 | SEO, Performance & Accessibility | ✅ Completed (2026-10-05) |
| 14 | Testing & Final Polish | ✅ Completed (2026-10-05) |

**Current phase:** none. **All 14 phases are complete (2026-10-05).** The front end is finished and ready for a backend to be connected later (the contact form's single `submitContact()` stub in `lib/contact.ts`).

Legend: ⏳ Upcoming · ▶ Current · ✅ Completed

---

## 1. Project Summary

We are building a new, complete **front end** for **CodeNax** (the brand name used consistently throughout the project) using **Next.js (App Router) + React + Tailwind CSS + TypeScript**.

- The existing site, https://www.codenax.com/, is a **reference for business content and structure only**.
- The new site must **not** be a clone. Its UI/UX must be noticeably different and more modern.
- The site must be **fully responsive**, and mobile layouts are designed deliberately rather than shrunk from desktop.
- There is **no backend** in scope.

---

## 2. Constraints & Decisions

### Ground rules (apply to every phase)
1. **No invented business content.**
   - Stats, client names, testimonials, case-study details, metrics, prices and feature lists come verbatim from codenax.com or from the owner.
   - Some content can't be accessed, verified or confidently extracted: pages that fail to load, text that is only partially readable, content rendered only by JavaScript, or anything ambiguous. That content is **not inferred, reconstructed or guessed**.
   - Instead it is logged as a **content gap**: a typed `gap` field in `content/`, listed in `CONTENT-GAPS.md`, and shown as a neutral placeholder. Work then continues with verified content only.
   - **Conflicting figures:** when the reference site gives different values for the same fact, no value is chosen and none is invented. The figure is an unverified content gap and is **not displayed** until the owner verifies it.
   - **Unsupported metrics:** decorative or dashboard-style metrics without supporting evidence (e.g. "97% Accuracy", "Speed 96") are **dropped** unless verified. Nothing is kept just to fill a visual layout.
2. **Full scope.** Every page in [Section 3](#3-approved-scope-pages--routes) is built. Nothing is cut without explicit approval.
3. **Forms are front end only.**
   - Contact and estimate forms get real validation plus loading, success and error states.
   - Copy never claims that data was sent or stored.
   - Nothing is written to localStorage or any other storage for contact or estimate submissions. The only thing kept in localStorage is the theme preference.
4. **Lighthouse 95+ is an optimisation goal, not a hard requirement.** Design and functionality are not sacrificed to reach it.
5. **Animations and interactions are required.** They stay performant and CSS-first (only `transform` and `opacity` are animated) and fully support `prefers-reduced-motion`.
6. **Work strictly phase by phase.** After each phase: update this file, report what was built, then stop and wait for explicit approval. Never continue automatically.
7. **Keep it simple and maintainable.** No abstraction, dependency or complex pattern is used without first explaining why it is needed.

### Confirmed decisions
| Topic | Decision |
|---|---|
| Scope | Full parity with the reference site (~20 page types) |
| Theme | **Light by default** (white/light + blue, following CodeNax's brand), with a dark-mode toggle. A tiny inline script prevents a flash of the wrong theme (no `next-themes`). *Changed from dark-first on 2026-09-28; see Change Log.* |
| Content | Typed TypeScript data files in `content/`. No CMS. |
| Backend | None. Forms call a single `submitContact()` stub that resolves `{ status: "success" }`. Nothing is sent or stored. |
| Form success copy | *"Thanks for reaching out! We've received your message and will get back to you within 24 hours."* (in `content/contact.ts`). *Changed 2026-10-07 from the "not connected yet" screen; see Change Log.* |
| Estimator hand-off | "Email me this estimate" is replaced by **"Continue to contact"**, which prefills the contact form through URL query parameters (no storage). |
| Rendering | Pages are Server Components and all routes are statically generated (`generateStaticParams`). Client Components are used only for interactive pieces. |

### Dependencies
The only packages allowed: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/postcss` (plus ESLint from `create-next-app`).

The platform replaces the usual libraries:

| Need | Built with |
|---|---|
| Animation | CSS transitions/keyframes and IntersectionObserver |
| Carousels | CSS scroll-snap |
| Accordions | `<details>` |
| Icons | Inline SVG |
| Theme switching | A small inline script |
| Fonts | `next/font` |

Any new library must be justified and approved before it is installed.

### Visual direction
- **Colour:** white/light surfaces with CodeNax blue as the majority influence. The brand scale is built around the reference site's primary `#1a95d5`, with a secondary royal blue taken from its gradients (`#0d6efd`, deepened to `#1f63e6`). It is modernised, not copied 1:1.
- **Surfaces:** subtle blueprint grid texture, soft shadows, cards with hairline borders, pill-shaped buttons.
- **Typography:** Space Grotesk for display headings, paired with Inter for body text, on a fluid `clamp()` type scale.
- **Dark mode:** uses the same semantic tokens, remapped to deep navy.

---

## 3. Approved Scope (Pages & Routes)

| Route | Purpose | Content status |
|---|---|---|
| `/` | Credibility → offer → proof → conversion | Verified |
| `/services` | All offerings, grouped | Verified |
| `/services/[slug]` × 10 | Service detail template: `ai-development`, `web-development`, `custom-mobile-app-development`, `ui-ux-design-and-development`, `staff-augmentation`, `software-testing-and-qa`, `branding-marketing`, `social-media-marketing`, `metaverse-development`, `mvp-development` | Extracted (Phase 4); some copy has figures/prices to confirm |
| `/industries` | Sector hub | Verified |
| `/industries/[slug]` × 8 | Education, Finance & Business, Healthcare, Real Estate, Travel & Tourism, Food & Delivery, Retail & E-commerce, Logistics | Extracted: **all 8** have content on the site (the earlier "7 are gaps" was wrong) |
| `/case-studies` | Work grid | Verified |
| `/case-studies/[slug]` × 8 | `curenax-digital-healthcare-platform`, `prepabac-tchad-learning-app`, `fintech-solution-for-smarter-invoicing`, `buzup-networking-platform`, `educator-hub-global-online-learning-platform`, `ciwac-unified-business-platform`, `asset-hub-saas`, `alkebabish-food-ordering-app` | Extracted; fintech client name is a **gap** |
| `/pricing` | 3 plans and 2 comparison tables | Extracted (the site shows no fixed prices, so none are added) |
| `/estimate` | 2-step interactive estimator | Extracted; hours and rates read from the live estimator, **owner to confirm** |
| `/about` | Story, mission, values, CEO message, stats | Extracted (stats left out) |
| `/why-us` | Differentiators and comparisons | Extracted (stats left out) |
| `/process` | Detailed process | Extracted |
| `/careers` | Perks, empty-roles state, resume CTA | Extracted |
| `/life-at-codenax` | Culture | Extracted |
| `/blog` + `/blog/[slug]` × 9 | Articles, tag filter, reading layout | Extracted (full bodies); author names to confirm |
| `/faq` | All FAQs | Extracted (13 questions, 5 categories) |
| `/contact` | Validated form and direct channels | Verified |
| `not-found` | Branded 404 | none |

**Verified contact data:**
- Email: info@codenax.com
- Phone/WhatsApp: +1 307 443 6778
- Address: 30N Gould ST #7785, Sheridan, Wyoming
- Social: LinkedIn, Facebook, Instagram
- Promises shown on the site: "Response within 24 hours" · "NDA available"

---

## 4. Architecture

### Components
- **`components/ui/`:** Button, Badge, Card, Container, Section, SectionHeading, Tabs, Accordion, Field, Icon
- **`components/layout/`:** Navbar, MegaMenu, MobileNav, ThemeToggle, Footer, MobileCTABar
- **`components/sections/`:**
  - Heroes and proof: PageHero, StatsStrip
  - Offer: EngagementPaths, ServicesBento, ProcessTimeline, IndustryGrid, TechStackTabs
  - Proof: CaseStudyShowcase, TestimonialRail, ValuesGrid
  - Commercial: PricingCards, ComparisonTable
  - Closing: FAQSection, CTABanner
- **`components/features/`:**
  - Estimator: EstimatorWizard and `estimate.ts` (pure calculation)
  - Contact: ContactForm and `validate.ts`
  - Blog: PostCard, TagFilter
- **`hooks/`:** `useInView`, `useLockBodyScroll`

### Folder structure
```
/
├─ app/                 # routes (see Section 3), layout.tsx, globals.css, not-found, sitemap, robots
├─ components/          # ui/ layout/ sections/ features/
├─ content/             # typed business data: site, nav, services, industries, caseStudies,
│                       # testimonials, faqs, pricing, estimator, techStack, process,
│                       # company, careers, posts
├─ lib/                 # types.ts, cn.ts, seo.ts
├─ hooks/
├─ public/              # images, icons, favicon, OG image
├─ PROJECT-PLAN.md      # this file
└─ CONTENT-GAPS.md      # detailed list of missing or unverified content (created in Phase 4)
```

### Responsive strategy
Mobile-first, using Tailwind breakpoints `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`.

- **Mobile:**
  - Single column, 16–20px gutters, fluid type.
  - 44px minimum tap targets.
  - Full-screen nav sheet and a sticky bottom CTA bar.
  - Scroll-snap rails.
  - The estimator summary becomes a bottom sheet.
  - Footer groups become accordions.
  - Lighter effects.
- **Tablet:**
  - 2-column grids and drawer nav.
  - Comparison tables become stacked cards.
- **Laptop:**
  - Full nav with mega-menu.
  - 3-column grids.
  - Sticky process layout and sticky estimator summary.
- **Desktop:**
  - `max-w-7xl` container, larger hero visual.
  - Sticky table of contents on case studies.
- **All sizes:**
  - No horizontal overflow at 320px.
  - `next/image` with correct `sizes`.

---

## 5. Development Phases

**Approval gate after every phase:** update this file → report what was built and how it was checked → **stop and wait for explicit approval.**

### Phase 1: Project Setup
- **Objective:** a running Next.js skeleton.
- **Steps:**
  - `create-next-app` (TypeScript, App Router, Tailwind v4, ESLint)
  - Folder structure
  - `next/font` (display and body faces)
  - Base `globals.css`
  - `cn()` helper
- **Result:** a blank app that builds.

### Phase 2: Design System
- **Objective:** tokens and UI primitives.
- **Steps:**
  - Colour tokens (dark and light), fluid type scale, spacing, radii, shadows and glow
  - Theme script and ThemeToggle
  - All `ui/` primitives and the Icon set
  - Focus-visible styles and transition timing tokens
  - A temporary `/styleguide` page for review (removed in Phase 14)
- **Result:** an approved visual kit in both themes.

### Phase 3: Core Layout
- **Objective:** the global shell.
- **Steps:**
  - Navbar (condenses on scroll) and MegaMenu
  - MobileNav sheet (focus trap, Esc to close, body scroll lock, transitions)
  - Footer and MobileCTABar
  - `content/nav.ts` and `content/site.ts`
- **Result:** navigable shell on all breakpoints.

### Phase 4: Content Extraction
- **Objective:** all verified business content, typed.
- **Steps:**
  - `lib/types.ts`
  - Copy content verbatim from every reference page into `content/*.ts`
  - Log every unverifiable or missing item as a `gap` and create `CONTENT-GAPS.md`
- **Result:** pages can be built purely from data, plus a clear gap list.

### Phase 5: Homepage
- **Objective:** the flagship page.
- **Build order:**
  1. Hero and stats strip
  2. Client-names strip
  3. Engagement paths
  4. Services bento
  5. Process timeline
  6. Industries grid
  7. Case-study showcase
  8. Tech-stack tabs
  9. Testimonial rail
  10. Estimator teaser
  11. FAQ
  12. CTA banner
- **Result:** a complete, responsive home page.

### Phase 6: Services & Industries
- **Objective:** `/services`, 10 × `/services/[slug]`, `/industries`, 8 × `/industries/[slug]`, all from shared templates.
- **Result:** all service and industry pages live, with gaps shown as placeholders.

### Phase 7: Case Studies
- **Objective:** `/case-studies` and the `[slug]` story template (table of contents, stack chips, "more work").
- **Result:** all 8 case studies live.

### Phase 8: Conversion Pages
- **Objective:**
  - `/pricing`: PricingCards and a responsive ComparisonTable
  - `/estimate`: wizard and summary panel. The calculation reads `content/estimator.ts`; until the owner confirms the values, they are marked gaps and the result shows "pending".
  - `/contact`: validation plus loading, success and error states
  - `/faq`
- **Result:** every conversion page works on the front end and is honestly labelled.

### Phase 9: Company Pages
- **Objective:** `/about`, `/why-us`, `/process`, `/careers` (empty-roles state), `/life-at-codenax`.
- **Result:** company section complete.

### Phase 10: Blog
- **Objective:** `/blog` (tag filter, post cards) and `/blog/[slug]` (reading layout, related posts), with post bodies extracted verbatim.
- **Result:** all 9 posts render.

### Phase 11: Responsive Audit
- **Objective:** every page checked at 320 / 375 / 768 / 1024 / 1280 / 1536.
- **Steps:** fix overflow, vertical rhythm, tap targets and image sizes.
- **Result:** clean at every size.

### Phase 12: Animations & Interactions
- **Objective:** required motion layer.
- **Steps:**
  - Scroll reveals (staggered on grids)
  - Hover and focus states
  - Mega-menu, mobile sheet, accordion and tab transitions
  - Hero visual animation and name marquee
  - Process scroll progress
  - Estimator step transitions and form state transitions
  - Reduced-motion fallbacks for all of the above
- **Result:** polished, smooth motion.

### Phase 13: SEO, Performance & Accessibility
- **Objective:** production quality.
- **Steps:**
  - Per-page metadata, Open Graph image, sitemap and robots
  - JSON-LD for Organization and FAQPage
  - Image and font optimisation; client JS kept minimal
  - Accessibility audit: headings, landmarks, contrast in both themes, keyboard navigation, ARIA
  - Lighthouse 95+ as a goal; any shortfalls reported with their causes
- **Result:** optimised, accessible site.

### Phase 14: Testing & Final Polish
- **Objective:** ready to ship.
- **Steps:**
  - `next build` with no type or lint errors
  - Chrome, Safari (iOS), Firefox and Edge in both themes
  - Link check and consistency pass
  - Remove `/styleguide`
  - Final review of `CONTENT-GAPS.md` with the owner
- **Result:** a finished front end, ready to connect to a backend later.

### Verification checklist (every phase)
- [ ] `npm run dev` and `npm run build` pass
- [ ] New pages checked at 320–1536px in dark and light themes
- [ ] Keyboard-only walkthrough of the new interactive parts
- [ ] Reduced-motion check
- [ ] Content checked against the reference site; anything unverifiable logged as a gap
- [ ] This file updated (status, Decision Log)
- [ ] Stopped and waiting for approval

---

## 6. Open Items & Content Gaps
Summary only. The detailed list is in [`CONTENT-GAPS.md`](CONTENT-GAPS.md).

**Scope change approved 2026-09-30:** codenax.com lists **8** case studies, and all 8 will be built (see Change Log).

| Item | Status |
|---|---|
| Brand name | ✅ Resolved: **CodeNax** everywhere (set once in `content/site.ts`) |
| Products/applications count: the site says 120+, 200+ and 100+ in different places | 🕳 Gap (conflicting): not displayed until verified |
| Years of experience: the site says 10+ and 12+ in different places | 🕳 Gap (conflicting): not displayed until verified |
| Service-card mini-metrics ("97% Accuracy", "88% Latency", "100% Uptime", "↑34% Requests", "Speed 96 / SEO 100 / Accessibility 94", "4.9 avg store rating", "98% on-time", "94% Test coverage", "847 passed") | ✅ Resolved: **dropped** (unverified) |
| Consistently stated figures ("99% Client Retention", "8+ Industries") | 🕳 Gap: **kept out of the UI** until verified (owner decision) |
| Home "AI & Automation" metrics ("10× Faster workflows", "99% happy clients", "On time Every sprint") | 🕳 Gap: **kept out of the UI** until verified (owner confirmed) |
| Estimator hours per option and pricing formula | ✅ Read from the live estimator in Phase 4 (per-option hours; price = hours × $60–$95, rounded to $100). Reproduces every result tested. ❓ Owner to confirm. |
| Fintech case-study client name (the site shows "Fintech Client (TBD)") | 🕳 Gap |
| Detail content for 7 industries (everything except Healthcare) | ✅ Resolved in Phase 4: all 8 industries have content on /industries |
| Conflicting figures inside copied text ("a decade", "12+ years", "15 years", "since 2015", "Founded 2014", "100+ / 200+ products") | 🕳 Deferred by owner (2026-09-30): handled later. Kept verbatim and marked `⚠` in `content/`. Not to be rendered until decided (see `CONTENT-GAPS.md` §2) |
| Prices quoted on service pages and in blog posts | ✅ Owner (2026-09-30): shown as codenax.com shows them publicly |
| Blog author names | ✅ Owner (2026-09-30): shown as credited on codenax.com |
| Nav labels "Featured" and "View all industries" (added in Phase 3, not on the site) | ❓ Owner to keep or replace |
| Logo files, client logos and photos, case-study screenshots | 🟡 Partly resolved (2026-10-01): the site's logo, icons and hero photos are in use. Still missing: a vector or high-resolution logo, client logos, team photos, case-study screenshots |
| Contents of the "Insights" and "Company" nav dropdowns | ✅ Resolved in Phase 3: found verbatim in the reference site's own nav config (Insights → Blog; Company → About, Why Us, Process, Careers, Life at CodeNax, Contact Us) |
| Office address: every rendered page shows "30N Gould ST#7785 Sheridan, Wyoming", but the site's unrendered JS config says "Cincinnati, Ohio, USA" | ❓ Owner to confirm. The **rendered** address is shown for now, because it's what visitors currently see. |
| Social URLs: the rendered footer links to `facebook.com/codenaxx` and `instagram.com/codenax_llc/`; the unrendered JS config has `facebook.com/codenax` and `instagram.com/codenax` | ❓ Owner to confirm. The **rendered** URLs are used for now. |
| Official logo file | ✅ In use (2026-10-01): the PNG from codenax.com. A vector (SVG) version would look sharper on high-density screens. |

---

## 7. Decision Log
Implementation decisions, recorded as each phase completes.

| Date | Phase | Decision |
|---|---|---|
| 2026-09-28 | 0 | Plan approved; this file established as the roadmap source of truth. |
| 2026-09-28 | 1 | Stack as scaffolded: **Next.js 16.3.6 (Turbopack), React 19.2.8, Tailwind CSS v4, TypeScript 5, ESLint 9 flat config**. No extra packages added. |
| 2026-09-28 | 1 | Scaffolded in a temp folder and moved in, because `create-next-app` won't run in a non-empty folder. Demo SVGs and boilerplate page removed. |
| 2026-09-28 | 1 | Fonts via `next/font/google` (self-hosted, `display: swap`): **Inter** as body (`--font-sans`) and **Space Grotesk** as display (`--font-display`, Tailwind class `font-display`). |
| 2026-09-28 | 1 | `cn()` helper is a plain class joiner with no `tailwind-merge` dependency. Components will avoid conflicting classes by design instead. |
| 2026-09-28 | 1 | Next.js 16 notes for later phases: `next build` no longer lints, so run `npm run lint` separately. Route `params` are async (affects `[slug]` pages in Phases 6, 7 and 10). Smooth scrolling needs `data-scroll-behavior="smooth"` on `<html>` (Phase 2/12). |
| 2026-09-28 | 1 | Kept the `AGENTS.md`/`CLAUDE.md` that Next generated: they point agents at the bundled Next 16 docs. The default `app/favicon.ico` stays until a branded favicon is added in Phase 13. |
| 2026-09-28 | 2 | **Brand colours taken from the reference site's CSS:** `--primary: #1a95d5` on `#fff`, with gradients ending in `#0d6efd`. `#1a95d5` is only 3.33:1 on white, so it is used for accents, gradients and large display text. Body links use `#0d6fa8` and buttons `#0f7bb8`. All semantic text pairs pass WCAG AA (4.5:1) in both themes, checked with a script. |
| 2026-09-28 | 2 | **Tokens live in `app/globals.css`:** static brand scale and type scale in `@theme`; semantic colours (`background`, `surface`, `surface-2`, `foreground`, `muted`, `line`, `line-strong`, `link`, `primary`, `primary-hover`, `on-primary`, `soft`, `soft-foreground`, `ring`, `danger`, `success`) as CSS variables per `[data-theme]`, mapped through `@theme inline`. Fluid type classes: `text-display-1/2/3`, `text-lead`, `text-eyebrow`. Motion token: `ease-smooth`. Utilities: `text-gradient`, `bg-brand-gradient`, `bg-grid`, `scrollbar-none`. |
| 2026-09-28 | 2 | **Theme** follows the Next 16 guide "Preventing flash before hydration": `<html data-theme="light" suppressHydrationWarning>` plus a `<head>` inline script that reads `localStorage.theme`. The `dark:` variant is bound to `[data-theme="dark"]`. `ThemeToggle` swaps icons with CSS (no React state, no hydration mismatch) and reapplies the theme in `useLayoutEffect` for Strict Mode's dev remount. Default is light, even if the OS is set to dark. |
| 2026-09-28 | 2 | **Primitives in `components/ui/`:** Button (primary/secondary/ghost; sm/md/lg; renders `Link` for internal routes, `<a>` for mailto/tel/external, `<button>` otherwise), Badge, Card (`as` div/article/li, `interactive` hover lift), Container, Section, SectionHeading, Tabs (client; WAI-ARIA keyboard support; horizontal scroll on mobile; inactive panels stay in the HTML but hidden), Accordion (native `<details name>`, exclusive), Field (render-prop wiring of label, hint, error, `aria-describedby`, `aria-invalid`) with Input/Textarea/Select, Icon (19 inline SVGs). |
| 2026-09-28 | 2 | **Accessibility and motion baseline:** global `:focus-visible` ring; 16px form text (no iOS zoom); md/lg buttons and tabs are ≥44px tall (sm is for dense desktop use only). Under `prefers-reduced-motion`, transitions, animations and smooth scrolling are disabled. `data-scroll-behavior="smooth"` is set per the Next 16 change. |
| 2026-09-28 | 2 | **Temporary `/styleguide`** (noindex, neutral sample copy only) for review. Removed in Phase 14. |
| 2026-09-28 | 3 | **Nav content verified from the reference site's rendered HTML and its own nav config (JS bundle):** header items, the Services menu's 3 featured entries with their descriptions, the 9 service names and taglines from `/services`, the 8 industries, Insights/Company menus, footer groups, social URLs, contact details, copyright and tagline. All live in `content/site.ts` and `content/nav.ts`. |
| 2026-09-28 | 3 | **Industries** is a dropdown, as on the reference site, linking to our planned `/industries/[slug]` pages (slugs match the reference anchors: `healthcare`, `education`, `finance-business`, `real-estate`, `retail-ecommerce`, `logistics`, `travel-tourism`, `food-delivery`). |
| 2026-09-28 | 3 | **Presentation choice (owner can overrule):** the reference Insights menu has only "Blog". FAQ and Estimator (from the footer's Resources group) are added so it isn't a one-item menu. |
| 2026-09-28 | 3 | **Navbar** (`components/layout/navbar.tsx`): sticky and transparent at the top; turns solid (blur, border, shadow) after scrolling or while a menu is open. Only colours change, never height, so there's no layout animation. Menus follow the **disclosure pattern** (buttons with `aria-expanded`/`aria-controls`, not ARIA `menu` roles). They open on mouse hover (150ms close delay) or click/Enter, and close on mouse leave, outside click, Escape (focus returns to the trigger), tabbing out, or navigation. |
| 2026-09-28 | 3 | **Open-state trick:** menu and sheet state store the pathname they were opened on (`open = openedAt === pathname`), so navigation closes them with no `useEffect` state sync. |
| 2026-09-28 | 3 | **MenuPanel** (`mega-menu.tsx`): Services is a full-width mega panel (Featured + All services with icons + "View all services"); the others are compact dropdowns. **Visibility flips instantly on open and is delayed on close**, so links are focusable right away (found through testing: a transitioned `visibility` blocked `focus()`). |
| 2026-09-28 | 3 | **MobileNav** (below `lg`): full-screen dialog sheet, rendered as a *sibling* of the header (the header's `backdrop-filter` would trap a fixed child). Native `<details>` groups, `inert` while closed, focus moves to Close on open, Tab/Shift+Tab trapped, Escape closes and returns focus to the menu button, body scroll locked (`useLockBodyScroll`). Pinned footer: Book a call, WhatsApp, email, theme toggle. |
| 2026-09-28 | 3 | **MobileCTABar** (below `lg`): floating "Book a call" + WhatsApp pill that slides in after 480px of scrolling and stays hidden on `/contact`. The header "Book a call" button shows from `lg` up only. |
| 2026-09-28 | 3 | **Footer**: brand, description and socials; Company and Resources groups (accordions below `md`, columns above); "Get in touch" with email, WhatsApp number and address; copyright and tagline row. Extra bottom padding below `lg` keeps it clear of the CTA bar. |
| 2026-09-28 | 3 | **Root layout** now renders a skip link, Navbar, `<main id="main">`, Footer and MobileCTABar. Pages no longer render their own `<main>`. |
| 2026-09-28 | 3 | **Hooks added:** `useLockBodyScroll` (planned) and `useScrolledPast` (new, small: `useSyncExternalStore` over the scroll event, shared by the navbar and the CTA bar). **Icons added:** users, rocket, globe, smartphone, palette, shield-check, megaphone, share, box (29 total). **Types:** `lib/types.ts` started with the nav types. |
| 2026-09-28 | 3 | **Class-conflict rule applied:** because `cn()` doesn't merge Tailwind classes, primitives aren't given conflicting overrides (e.g. `hidden` on a `Button`). Visibility is handled by a wrapper element instead. |
| 2026-09-28 | 3 | Links to pages not built yet (e.g. `/pricing`) show the default 404 until their phase. |
| 2026-09-30 | 4 | **First attempt discarded.** The first set of content files was written without fetching the site and falsely labelled "verified". All of it was deleted before any page used it, and the phase was redone from real captures. |
| 2026-09-30 | 4 | **How content was captured:** codenax.com renders its content with JavaScript, so each page was opened in headless Chrome (via the DevTools protocol) and read from the rendered DOM. Hidden content was opened first: tab panels, Radix accordions (FAQ answers), the 3 home hero slides, and the estimator (every option tried). 41 pages were captured. |
| 2026-09-30 | 4 | **Generated vs hand-written:** the four large files (`services.ts`, `case-studies.ts`, `blog.ts`, `faq.ts`) are generated from the captures by a script, so their text is copied, never retyped. The smaller files (`home.ts`, `industries.ts`, `process.ts`, `pricing.ts`, `estimator.ts`, `company.ts`, `contact.ts`, `testimonials.ts`, `tech-stack.ts`, `cta.ts`) were written by hand from the captures. |
| 2026-09-30 | 4 | **Verification:** a script checked every string in `content/` against the captured pages. 3,853 strings, 3,851 found verbatim. The two exceptions are the Phase 3 nav labels "Featured" and "View all industries" (listed as open items). It also caught one Phase 3 error, now fixed: the copyright line had an extra full stop. |
| 2026-09-30 | 4 | **Types (`lib/types.ts`):** shared `RichBlock` (heading / paragraph / list / quote / table) for long-form text, so blog posts, service sections and case studies keep their original order and structure. Plus `Heading` (title + highlighted part, matching how the site styles its headings), `PageMeta`, `FAQ`, `ContentSection`/`ContentItem`, and one type per content kind. |
| 2026-09-30 | 4 | **Left out on purpose:** stat strips and metric badges (per the owner's decision), decorative hero mock-ups (sample chats, dashboards, a sample "team"), numbering like "01", counters like "10 tools", and "N / N" carousel counters. Sentences whose figures conflict are kept verbatim but marked `⚠`, and must not be rendered until the owner decides. |
| 2026-09-30 | 4 | **Estimator:** each option's hours and the price formula come from the live site's behaviour, not from a published table, so the owner must confirm them. The over-80-hour message is the site's exact text. |
| 2026-09-30 | 4 | **Findings that change the picture:** 8 case studies (not 3); all 8 industries have content; the home hero is a 3-slide carousel (AI & Automation, MVP in 80 Hours, Dedicated Teams); the home tech stack has 59 tools in 2 rows and no categories. |
| 2026-10-01 | 5 | **Homepage** (`app/page.tsx`) composes 12 section components in `components/sections/`, each reading from `content/`: HeroCarousel, ClientStrip, EngagementModels, ServicesBento, ProcessTimeline, IndustryGrid, CaseStudyShowcase, TechStack, TestimonialRail, EstimatorTeaser, FAQSection, CTABanner. Only HeroCarousel and TestimonialRail are Client Components; the rest render to static HTML. |
| 2026-10-01 | 5 | **Hero carousel:** the site's 3 slides rotate every 7s. Rotation pauses on hover or keyboard focus, has a pause/play button (WCAG 2.2.2), and never auto-plays under reduced motion (new `usePrefersReducedMotion` hook). All slides share one grid cell, so the hero keeps a fixed height and nothing jumps; hidden slides are `inert`. There is one page `<h1>` (sr-only, the page title); slide titles are `<h2>`. Each slide has a secondary "Get an estimate" button (a label used on the site). |
| 2026-10-01 | 5 | **On-hold copy:** the AI slide's description contains "a decade of success" (a deferred figure). `HeroSlide.descriptionOnHold` keeps it in content but hides it on the page. Stat strips and mock-up metrics are not rendered (owner decision). |
| 2026-10-01 | 5 | **New shared pieces:** `RichText` (renders `RichBlock[]`: headings, paragraphs, lists, quotes, accessible tables; reused in Phases 6–10). `SectionHeading` gained a `highlight` prop, so content `Heading` objects can be spread straight in (`<SectionHeading {...heading} />`). Icons added: chevron-left, pause, play. |
| 2026-10-01 | 5 | **Presentation choices (owner can overrule):** client names strip (testimonial companies as text, no logos supplied); AI Development as the large lead tile in a bento grid; case-study cards use the client name on a brand gradient (no imagery supplied); the tech stack is a static chip cloud (marquee motion is Phase 12); industries are numbered 01–08, as the site numbers its carousel. |
| 2026-10-01 | 5 | **Design enhancement pass (owner request: "enhance, don't change the data, style or look"):** hero card became a layered "app window" (glow, stacked back card, gradient top edge, live dot, floating eyebrow label, points that fade in on each slide); engagement cards gained icons, a glow behind the featured card and a hover lift; the AI tile gained grid and orbit-ring decoration; small service tiles got a hover glow; process and industry cards got a gradient accent bar that grows on hover; case-study visuals became a product-window preview built from each study's own client, industry and tech stack; the tech stack became a two-row marquee (pauses on hover, static wrapped list under reduced motion); testimonials got a quote mark, gradient avatars and a hover lift. New animation tokens in `globals.css`: `animate-marquee`, `animate-fade-up`, `animate-float`. Scroll-triggered reveals remain in Phase 12. |
| 2026-10-01 | 5 | **Scroll reveals brought forward from Phase 12 (owner request):** a single Client Component, `components/layout/scroll-reveal.tsx`, watches every `[data-reveal]` element with one IntersectionObserver and marks it `data-revealed`; CSS in `globals.css` fades it up. Stagger uses `revealDelay(i)` from `lib/reveal.ts` (a `--reveal-delay` CSS variable). Sections stay Server Components and only add the attribute. Content is hidden only when the head script has set `data-js` and the visitor allows motion, so nothing is lost without JavaScript or under reduced motion. It's a CSS animation (not a transition), so it never fights hover transitions. The testimonial rail reveals as one unit, because cards off to the side never cross the viewport. Tested: all 40 reveal targets appear after scrolling; none are hidden under reduced motion. |
| 2026-10-01 | 5 | **Service-card tags:** the non-numeric labels the same cards show on codenax.com ("Blazing fast", "iOS", "Android", "Design tokens", "Components", "Handoff", "Ship with confidence") added to `serviceHighlights` in `content/home.ts` and shown as chips. Scores, ratings and counts stay out. |
| 2026-10-01 | 5 | **Brand assets from codenax.com (owner approved; the owner works at CodeNax and the site runs locally):** logo `public/images/brand/logo.png` (231×48 PNG) in `Logo`, shown via `next/image` with a static import; in dark mode `invert` + `hue-rotate-180` turns the black wordmark white and keeps the mark blue. Favicon, `app/icon.png` and `app/apple-icon.png` replace the Next.js default (Next serves them automatically by file convention). Hero background: the two office photos codenax.com uses (Unsplash, `public/images/hero/`), one per slide, cross-fading with the slides under a gradient wash; the first loads eagerly with `fetchPriority="high"` (Next 16 deprecates `priority`). |
| 2026-10-01 | 5 | **Industries section redesigned (owner approved a mockup):** the plain 8-card grid became an "expanding panels" explorer. Laptops and up: 8 photo strips in a row; the open one widens (flex-grow) into a panel with photo, icon, name (links to `/industries/[slug]`), tagline, summary, "What we build" chips and related case studies (or the site's "Building in this space?" prompt). It opens on hover, click or keyboard focus; the arrow keys move between strips; closed panels are `inert`. Phones and tablets: a stack of cards that expand when tapped (grid-rows 0fr→1fr animation). Split into a Server Component (`industry-explorer.tsx`, gathers data and related case studies) and a Client Component (`industry-explorer-client.tsx`, interaction only), so case-study text never ships to the browser. `industry-grid.tsx` removed. |
| 2026-10-01 | 5 | **Industry assets and taglines from codenax.com:** the 8 industry photos (Unsplash, `public/images/industries/`) and their Lucide icons (graduation-cap, landmark, heart-pulse, building, plane, utensils, shopping-bag, truck, added to `Icon`) come from the site's own industry carousel data. That data also contained all 8 one-line taglines, now `Industry.tagline` in `content/industries.ts` (this resolves the earlier gap where only Education's was known). |
| 2026-10-01 | 5 | **Case studies section redesigned (owner approved a mockup):** a "showcase stage" for **all 8** case studies (was 3 cards). The stage shows the selected project's real screenshot (from codenax.com, `public/images/case-studies/`) in a white frame that tilts with the pointer, three of its real tech-stack items floating around it, and its engagement, industry, client, title, summary and "Read the story". Below it, a thumbnail strip acts as tabs (roving tabindex; arrows, Home and End). It auto-advances every 6s: the active thumbnail's progress-bar `animationend` drives the next slide, so pausing the animation pauses the slideshow. Hover or focus pauses; there is a pause/play button (WCAG 2.2.2); reduced motion disables autoplay and tilt. Split into a Server Component (`case-study-showcase.tsx`) and a Client Component (`case-study-stage.tsx`), so the long case-study text never ships to the browser. `caseStudiesHeading.featured` in `content/home.ts` is no longer used by the home page. |
| 2026-10-01 | 5 | **Industry panel fix:** at 1024–1280px, long names wrapped and pushed the counter onto two lines. The open strip now takes 9 shares (was 6), the title is `text-2xl` below `xl`, the counter is `whitespace-nowrap`, and the ↗ arrow sits inline after the name. |
| 2026-10-01 | 5 | **Tailwind v4 transition fix:** v4's `translate-*`, `scale-*` and `rotate-*` utilities use the CSS `translate`, `scale` and `rotate` properties, not `transform`. So arbitrary transition lists naming `transform` didn't animate hover lifts, button presses or accordion icons; they jumped instead. Fixed in Card, Button, Accordion, the services bento and testimonials. (`transition-transform` itself already covers all four in v4.) |
| 2026-10-01 | 5 | **Checked:** no horizontal overflow at 375/768/1280 in both themes; no console errors; autoplay, dot navigation, pause, `inert`, single h1, testimonial scrolling and exclusive FAQ accordion all tested in headless Chrome. Content verification is unchanged (3,851/3,853). Links to pages not built yet (services, industries, case studies, /estimate…) 404 until their phase. |
| 2026-10-02 | 5 | **Tech-stack logos (owner approved; option "1 + 2"):** each marquee pill now shows the tool's logo from codenax.com (`public/logos/*.svg`, 56 files; the name → file map lives in `tech-stack.tsx`, since it's presentation, not content). Logos rest in greyscale at 70% opacity and turn full colour when their pill is hovered; the pill also lifts and glows. Near-black logos (Java, Rust, Next.js, Angular, Express, Django, Prisma, AWS, Vercel) use `invert` + `hue-rotate-180` in dark mode, and resting logos are brightened there so dark colours stay visible. Pinecone, Twilio and Microsoft Azure have no logo on the site, so they get a gradient letter badge. Logos are decorative (`alt=""`); the name stays the label. A category filter was discussed and dropped (the site has no categories for these tools). Checked: 112/112 images load in both copies, no console errors, light, dark and hover screenshots reviewed. |
| 2026-10-02 | 5 | **"How we work" redesigned as a scroll-driven timeline (owner approved a mockup; the duration chips in the mockup were removed at the owner's request):** on laptops the heading is pinned on the left (`lg:sticky`) with a "Stage 0X of 06" bar; the six stages run down a rail on the right, whose gradient fill follows the scroll. Each stage shows its number, name, tagline (verbatim from /process, already in `content/process.ts`) and summary. Icons (Lucide search, palette, code, shield-check, rocket, trending-up; 3 added to `Icon`) sit on the rail as 52px tiles (44px on phones): stages already passed get a gradient tile, the current one is enlarged with a glow and a raised card and plays a one-shot icon motion (wiggle, pop, nudge or draw; new `animate-icon-*` tokens in `globals.css`), and later stages stay faded until reached or hovered. Hover lifts and tilts any tile. Scroll positions are measured in one rAF-throttled listener and written to CSS variables (`--rail-top`, `--rail-h`, `--fill`), so scrolling only re-renders when the current stage changes. Split into `process-timeline.tsx` (server: data and icon choice) and `process-steps.tsx` (client). Before JS runs and under reduced motion, every stage is shown in full and the line is complete. Checked in headless Chrome at 1280 and 390: states advance 01→06 with scroll, the heading stays pinned, no horizontal overflow, reduced motion is static, no console errors. |
| 2026-10-02 | 6 | **Routes:** `/services`, `/services/[slug]` (10), `/industries`, `/industries/[slug]` (8). Dynamic pages use `generateStaticParams` + `dynamicParams = false` (unknown slugs 404) and `PageProps<"/route">` with async `params` (Next 16). All 20 are prerendered as static HTML. |
| 2026-10-02 | 6 | **Shared templates:** `PageHero` (one h1, optional breadcrumb back to the parent page, actions, optional aside, grid-and-glow backdrop) is the top of every inner page. `ServiceSection` renders any service section by its shape: process/workflow headings become numbered steps; items whose bodies are only lists become cards of chips (short names) or ticked lists (longer phrases); other items become cards; sections without items show their intro (paragraphs as lead text, lists as chips or a ticked grid, tables via `RichText`). Every section is a jump target for the "On this page" chip row under the hero. |
| 2026-10-02 | 6 | **`/services`:** the nine services as large cards (icon, tagline, description, "Get started" / "Learn more", features); on laptops each card is `sticky` a little lower than the last, so they stack as you scroll (CSS only). **Service pages:** hero with the service's /services tagline and features in a side card (MVP Development has no /services entry, so no card), all sections, FAQs (heading "Frequently asked questions" from /faq), the other services as links, CTA. |
| 2026-10-02 | 6 | **Industries:** `/industries` = hero with a grid of the 8 industry icons as quick links, the home explorer reused with the page's own heading ("Deep expertise, sector by sector"), "What we bring to every industry", CTA. Industry pages = photo hero, "What we build", related case studies with screenshots (a single one is laid out side by side) or the site's "Building in this space?" prompt, strengths, the other industries as photo tiles plus a "View all industries" tile, CTA. The site has no page per industry, so their `<title>` is "Name \| CodeNax" and the description is the industry summary. |
| 2026-10-02 | 6 | **Deferred figures:** one list in `lib/on-hold.ts` (`isOnHold`, `visibleBlocks`, `visibleItems`) keeps them out of every page while the content files stay verbatim. Held back on these pages: the web-development "Why Choose CodeNax" intro ("15 years"), the staff-augmentation "Your Trusted US-Based…" item ("since 2015"; this also holds its "280 engineers in 30 countries"), the metaverse process intro ("more than a decade"), the MVP "15 Years of Experience" item, and the /industries hero description ("100+ products"). The AI and web-development meta descriptions also say "15 years", so those pages use their /services description instead. |
| 2026-10-02 | 6 | **Refactor:** service icons, industry photos/icons and case-study screenshots moved into `lib/media.ts`, shared by the home sections and the new pages. `IndustryExplorer` takes an optional heading and tone; `IndustryStrengths` is shared by both industry templates. Checked: lint, `tsc` and `next build` pass; all 21 pages (incl. home) at 1280 and 390 load with one h1, a meta description, no horizontal overflow, no broken images, no console errors and none of the deferred phrases; an unknown slug returns 404. |
| 2026-10-02 | 6 | **Navbar (owner request):** on desktop, the "Services" and "Industries" labels now link to `/services` and `/industries`; the ▾ beside them is a separate button that opens the menu (keyboard and touch), and hover still opens it. Both halves share one pill, so the bar looks unchanged. The item is also highlighted on the overview page itself. Insights and Company have no overview page and are unchanged; the phone menu already lists "View all…" in each group. Tested: hover opens, label click navigates, chevron Enter opens, Escape closes and returns focus. |
| 2026-10-02 | 7 | **Routes:** `/case-studies` and `/case-studies/[slug]` (8, `generateStaticParams` + `dynamicParams = false`), all prerendered. Titles and descriptions come from each study's own `meta`. |
| 2026-10-02 | 7 | **`/case-studies`:** hero from the page's heading, then the eight studies as cards in a wide / pair / pair / wide / pair rhythm (screenshot beside the text on wide cards), the page's own closing line "Want results like these?" with its button, and the CTA banner. **Shared `CaseStudyCard`** (framed screenshot, client · industry, title, summary, "Read the story") is also used by industry pages (replacing their own markup) and by "More work". |
| 2026-10-02 | 7 | **Story template:** hero (back link "All case studies", industry eyebrow, headline at a smaller `titleSize="md"` because these titles are long, summary, "Start a project like this") with the Client / Industry / Engagement facts beside it; the product screenshot in a browser frame overlapping the hero; then the story sections numbered 01–04, with the client's quote as a dark pull-quote after the overview, and "Tech Stack Used" as grouped chips with tool logos. On laptops a sticky "on this page" list (`StoryNav`, client) highlights the section being read, and a thin progress bar runs across the top of the window. "Explore more case studies" shows the next three studies (wrapping round). |
| 2026-10-02 | 7 | **Quotes:** each study's quote is credited to the client company only. The named testimonials on the home page use different wording, so names are not attached to these quotes. "Fintech Client (TBD)" is shown as the site shows it (still an open item). |
| 2026-10-02 | 7 | **Refactors and fixes:** the tool-logo map and logo component moved to `components/ui/tool-logo.tsx` (used by the home marquee and the stack chips; "Vercel — Web" and "Node.js (NestJS)" resolve to their tool's logo). `PageHero` gained `titleSize`. **Navbar at 1024px:** the bar was 22px too wide (labels wrapped, "Book a call" was clipped); between 1024 and 1280 the menu items now use slightly smaller padding and text, unchanged from 1280 up. Checked: lint, `tsc`, `next build` (36 pages); every page built so far (30) at 1280, 1024 and 390 loads with one h1, a meta description, no horizontal overflow, no broken images, no console errors and no deferred figures. |
| 2026-10-02 | 7 | **Story polish (owner request):** the Client / Industry / Engagement card gained icon tiles (the client's initial; the industry's icon; a code or phone icon for the engagement), a gradient top edge, a soft glow and a row hover. The quote is labelled "Client feedback" and credited "Client name · Client". `case-study-story.tsx`: the Challenge's opening statement (with its sub-heading, if any) is a highlighted amber callout with an alert icon, and the rest follows as normal text; a Solution with two or more sub-headed parts shows each part as a numbered card with ticked points, otherwise its lists become a two-column grid of feature tiles. Text and order are unchanged. |
| 2026-10-02 | 6 (revisit) | **Service pages redesigned (owner approved a mockup; codenax.com's own layout was shown for ideas only, not copied).** `ServiceSection` now picks one of these styles per section: **bento** (the first item section: a dark featured tile with "Talk to us about this", then icon tiles, last tile stretched to fill the row), **split** (5–8 items: heading pinned left, rows light up as they pass the middle of the screen), **zig-zag** (process/workflow: cards alternate around a centre line that fills as you scroll; a single left line on phones), **tabs** (tech stacks: category pills with tool counts, the chosen category's tools as logo chips; arrows/Home/End; one scrollable row on phones), **dark band** (sections that are an intro plus a list: chips or ticked tiles on a dark glowing panel), **grid** (everything else: icon cards; prices like "Starting at $10,000" emphasised), and plain text for text-only sections. Headings are a size smaller (`SectionHeading size="md"`) with the site's label pill above them (`eyebrowStyle="pill"`). From `xl` a sticky "On this page" list with a reading-progress bar (`StoryNav`) sits beside the sections; below `xl` the chip row remains. New: `scroll-steps.tsx` (client; writes `data-state` and `--fill`, no re-renders; nothing set under reduced motion), `stack-tabs.tsx` (client), `line-icon.tsx`. |
| 2026-10-02 | 6 (revisit) | **New verbatim content captured from codenax.com (2026-10-02):** `content/service-extras.ts` (generated): each service page's hero label and hero buttons (e.g. "Start your AI project" / "Get an estimate"; "See how it works" links to the section the site's `#how` points at), the label pill above every section heading (true case, read with `textContent`), and the Lucide icon the site shows beside each item, matched to our item titles by a script. The 75 icon drawings are in `components/ui/line-icon-paths.ts` (generated from the site's SVG markup; Lucide, MIT). `ServiceExtras` type added. Checked: lint, `tsc`, `next build`; all 30 pages at 1280/1024/390 pass; tabs, scroll states and reduced motion tested in headless Chrome. |
| 2026-10-05 | 8 | **Routes:** `/pricing`, `/estimate`, `/contact`, `/faq`, all prerendered (static). |
| 2026-10-05 | 8 | **`/pricing`:** hero, then `PricingCards` (3 models, verbatim; the "Most popular" Rapid MVP gets a gradient frame and glow), the estimator band (`EstimatorTeaser`), the two `ComparisonTable`s and the CTA banner. The comparison is a real `<table>` with the CodeNax column highlighted from md up; on phones each row becomes a small card, so nothing scrolls sideways. |
| 2026-10-05 | 8 | **`/estimate` shows real figures, not "pending":** the plan said the result would show "pending" until the owner confirmed the numbers, but the 2026-09-30 owner decision is to show prices the site shows publicly, and the live estimator shows these. The pure calculation (`lib/estimate.ts`) reproduces the site's own example (default selection = 38 h, $2,300–$3,600) and both extremes. The owner should still confirm the formula (CONTENT-GAPS §3). |
| 2026-10-05 | 8 | **`EstimatorWizard`** (client): native radio and checkbox cards (keyboard arrows work natively), and a live summary (sticky from lg) with hours, a bar showing how much of one 80-hour sprint is used, the price, the site's fit / two-sprint message and its disclaimer ("Or book a call." links to /contact). Totals are announced through `aria-live`. On phones a slim bar with the live total floats at the bottom while the summary is off screen; the global mobile CTA bar is hidden on /estimate so they don't overlap. |
| 2026-10-05 | 8 | **Estimator → contact hand-off:** "Continue to contact" opens `/contact?details=…` with the selection and totals as plain text (site labels only). `PrefilledContactForm` reads it with `useSearchParams` inside a `<Suspense>` whose fallback is the same form, so /contact stays static. Nothing is stored. |
| 2026-10-05 | 8 | **`ContactForm`** (client): validation in `lib/contact.ts` (on blur, then live once a field has been left; all fields on submit), an error summary with links to each field that takes focus, a character counter for project details (max 2000), and a loading state. `submitContact()` is the single stub a backend will replace; it resolves `{ status: "not-connected" }`. The result screen says plainly that nothing was sent and offers **Email us** (a `mailto:` with the form filled in) and WhatsApp, plus "Edit my details" (values kept). |
| 2026-10-05 | 8 | **`/contact` layout:** hero with the site's three badges, the form card, and beside it the four channels (email and WhatsApp are links) and a dark "about" card with the socials. No CTA banner here, as it would repeat the page. |
| 2026-10-05 | 8 | **`/faq`:** `FaqBrowser` (client): category filters as toggle buttons (`aria-pressed`) with counts (a sticky column from lg; one scrolling row on phones), and the questions in the shared accordion with their category shown under "All". Then the page's own "Still have questions?" closing with email and WhatsApp buttons (labels from the contact page), and the CTA banner. |
| 2026-10-05 | 8 | **Shared changes:** `PageHero` takes optional `children` (shown under the lead text); new icons `clock`, `send`, `loader`, `file-text`, `help-circle`. **Checked:** lint, `tsc`, `next build` (40 static pages); the 4 new pages pass at 1280/1024/768/390 (status, one h1, no overflow, no held figures, no console errors, meta); estimator totals, keyboard, the hand-off prefill, contact validation, loading, result and edit, and the FAQ filter tested in headless Chrome; the 30 earlier pages re-checked. |
| 2026-10-05 | 9 | **Routes:** `/about`, `/why-us`, `/process`, `/careers`, `/life-at-codenax`, all prerendered (static). |
| 2026-10-05 | 9 | **Held figures on /about:** the hero paragraph ("12+ years") and the story paragraph ("12+ years", "200+ products") are filtered out with `isOnHold()`, so they appear automatically once the owner clears the figures. The hero carries the CEO message as a quote card instead, so it doesn't look empty. |
| 2026-10-05 | 9 | **`/about`:** hero with CEO quote card; "What we do" heading (sticky) beside the three expertise cards, which link to their service pages; the "How we work" timeline reused with the About page's own heading (`ProcessTimeline` now takes `heading`); the six values as glass cards on a dark band; the CTA banner. |
| 2026-10-05 | 9 | **`/why-us`:** hero; six differentiators as numbered cards; both comparison tables under the page's own heading ("See the difference side by side"), with table titles as h3 (`ComparisonTable` now takes `as`); the Educator Hub testimonial as one large quote; the CTA banner. |
| 2026-10-05 | 9 | **`/process`:** hero with a stage map (jump links to all six stages); each stage as a full card: icon, number, name, tagline, the site's "Typical duration" chip, description, Deliverables (checklist) and What to expect; the sticky `StoryNav` with reading progress from xl. The durations were removed from the *home* timeline at the owner's request; they are kept here because this page states them on codenax.com. Stage icons are shared with the timeline (`STAGE_ICONS`). |
| 2026-10-05 | 9 | **`/careers`:** hero ("View open positions" jumps to the section); four perks; the open-positions section renders roles if the list ever has any, otherwise the site's empty state as a dashed card with "Send us your resume". **`/life-at-codenax`:** hero; six perks (cards); six culture points (numbered, surface band); "What a day looks like" as a Morning→Evening timeline (across on laptops, down on phones); the page's own closing band ("Sound like your kind of team?") ends the page in place of the CTA banner. |
| 2026-10-05 | 9 | **Shared:** new `FeatureGrid` (variants cards / glass / numbered; used for values, differentiators, perks and culture); icons `heart`, `flame`, `eye`, `briefcase`. **Checked:** lint, `tsc`, `next build` (45 static pages); the 5 new pages at 1280/1024/768/390 (status, one h1, no overflow, no held figures, no console errors, meta) and in dark mode; all 39 pages re-checked at 1280 and 390 (78/78). |
| 2026-10-05 | 10 | **Routes:** `/blog` (static) and `/blog/[slug]` (9 posts, `generateStaticParams` + `dynamicParams = false`), all prerendered. Titles and descriptions come from each post's own `meta`. |
| 2026-10-05 | 10 | **Hold rules made precise (`lib/on-hold.ts`):** the blog round-ups needed rules the phrase list couldn't express. (1) Added "founded in 2015" (conflicts with "Founded 2014") and "100% success rate" (an unverified CodeNax claim, like the stats already held). (2) Sentences about other companies are exempt (Emerline's own "15 years" stays). (3) In CodeNax's own listing (the list right after a "CodeNax" heading) only Hourly Rate, Team Size and Year Founded are dropped; Location and Cases stay. (4) CodeNax's rate in a comparison table shows "—" so the row keeps its shape. No other page has a CodeNax listing or table row, so earlier pages are unchanged (re-checked). |
| 2026-10-05 | 10 | **`/blog`:** hero, then `BlogBrowser` (client): the site's category filter as toggle buttons with counts (one scrolling row on phones), and the posts newest first; under "All" the newest is featured wide. Only post summaries are sent to the browser, never article bodies (`PostCard` imports no content; its CTA label is a prop). The posts have no images, so each card has a dark "cover" with the category's icon (decorative). |
| 2026-10-05 | 10 | **`/blog/[slug]`:** hero with a "Blog" breadcrumb, category, title, excerpt, author (initials), date, reading time and tags; the article in a reading column (larger text, h2s get ids via `RichText headingIds`); from xl a sticky "On this page" list with reading progress when a post has 3+ sections (it scrolls inside its column when long); a "Written by" author card; the post's FAQs (3 posts) under the FAQ page's heading; three related articles (same category first); the CTA banner. `slugify()` moved to `lib/slug.ts` (service sections reuse it). |
| 2026-10-05 | 10 | **Fixed during testing:** on phones a wide table stretched the article column and clipped its text (the page-level overflow check couldn't see it because the page clips sideways overflow). The column now has `min-w-0`, so tables scroll inside their own box. The automated check now also flags any text running past the screen edge, and all 49 pages pass it at 1280 and 390. **Checked:** lint, `tsc`, `next build` (55 static pages); hold rules verified in the rendered posts; the category filter; dark mode. |
| 2026-10-05 | 11 | **How the audit ran:** a headless-Chrome script loaded all 49 pages at 320 / 375 / 768 / 1024 / 1280 / 1536 (294 loads; phones and tablets at 2× pixel density with touch on), scrolled each page so lazy images loaded, and checked: page overflow; text running past the screen edge outside a scroll box; tap targets under 44px on touch widths (inline links in text excepted); images downloaded at the wrong size for their `sizes` (cache cleared before every page, so each page is measured as a first visit); text under 12px; one h1; console errors. |
| 2026-10-05 | 11 | **Result of the first run:** no overflow, clipped text, tiny text or errors anywhere. Tap targets: three shared sources, all fixed. (1) `PageHero` back links were 20px tall: now `min-h-11` with `-my-3`, so 44px without moving anything. (2) Footer links kept `min-h-11` only on phones and shrank to 20px on tablets: now 44px until lg (`lg:min-h-0`). (3) "View all services" on service pages was 24px tall and stretched full width on phones: now `min-h-11` and `self-start`. The contact page's social icons went from 40px to 44px. |
| 2026-10-05 | 11 | **Images:** most first-run flags were the browser reusing a larger cached copy from another page; with the cache cleared per page they disappeared. One real fix: stacked `CaseStudyCard`s assumed a 3-column grid (`30vw`) but sit in 2 columns on /case-studies and industry pages, so they downloaded 384px for a ~527px slot (slightly soft). `sizes` is now "(min-width: 1280px) 40rem, (min-width: 768px) 50vw, 100vw". **Kept on purpose:** the `/industries` explorer loads full-size photos for its collapsed panels (~70px wide) because each panel expands to full width on hover/click and must stay sharp. Also: "Fixed price" on the pricing card is `text-3xl` below sm so it fits one line at 320px. |
| 2026-10-05 | 11 | **Final result:** 289/294 clean after the fixes, and the 5 remaining were the explorer (by design) and the card `sizes` (then fixed and re-checked: 25/25 clean on every page with case-study cards). Visual review at 320px of home, a service page, the estimator, pricing, contact and process. Lint, `tsc`, `next build` (55 static pages). |
| 2026-10-05 | 12 | **Inventory first:** most of the motion layer was already built in Phases 5–11 (scroll reveals with stagger on every page, hero carousel, marquees that pause on hover, scroll-driven process timeline, sticky reading-progress bars, menu and sheet transitions, tab/filter fades, hover lifts, one-shot icon motions) with a global reduced-motion fallback. This phase filled the gaps. |
| 2026-10-05 | 12 | **Page transitions:** `app/template.tsx` wraps each page in React's `<ViewTransition enter="page-enter" exit="page-exit" default="none">` (per the Next 16 view-transitions guide; a template re-mounts on every navigation, a layout doesn't). The old page fades out in 160ms, the new one rises 12px and fades in over 380ms. The root snapshot isn't animated, so the navbar and footer stay still; `::view-transition { pointer-events: none }` keeps clicks working. Reduced motion sets the durations to 0. Browsers without the API swap pages as before. |
| 2026-10-05 | 12 | **Accordions:** every `<details>` (FAQs, footer groups, mobile-menu groups) now glides open and shut (`::details-content` block-size + opacity, with `interpolate-size: allow-keywords`), CSS only. Only when supported and when motion is welcome; the global reduced-motion rule doesn't reach `::details-content`, so it sits inside `prefers-reduced-motion: no-preference`. |
| 2026-10-05 | 12 | **Forms and estimator:** field errors and the contact form's error summary fade in instead of popping; the estimator's price replays its fade when it changes (like the hours). **Checked:** in headless Chrome, a navigation runs one view transition (page-out 160ms / page-in 380ms; 0ms under reduced motion); an FAQ item is mid-height 90ms after opening and settles at full height (instant under reduced motion); sticky side lists and progress bars still work inside the template wrapper; no console errors; `next build`; all 49 pages re-checked at 1280 and 390. |
| 2026-10-05 | 10 (revisit) | **Blog images added (owner request):** Phase 4 captured only the blog's text. The owner spotted the missing company logos; checking codenax.com showed covers and author photos were missing too. Downloaded to `public/images/blog/` (covers 1600px, authors, logos) and mapped in `lib/blog-media.ts`: `BLOG_COVERS` (by slug), `BLOG_AUTHORS` (by name), `BLOG_COMPANY_LOGOS` (by heading). `toSummary` moved there and attaches the cover and author photo, so `PostCard` still imports no content. Cards now show the cover photo (hover zoom) with a small category icon; the post shows the cover overlapping the hero and author photos (`AuthorAvatar`, initials as fallback). `RichText` gained `afterHeading`, used to show each company's logo under its heading on a fixed-colour chip: white, or dark for the two white wordmarks (Appinventiv, Intellectsoft; `BLOG_LIGHT_LOGOS`). Checked: blog pages at 1280/1024/768/390, screenshots, build. |
| 2026-10-05 | 13 | **Metadata (`lib/seo.ts`):** `pageMetadata({ title, description, path, article?, image? })` on all 49 pages: the site's own title (`title.absolute`, no template, since the titles already carry the brand as on codenax.com), description, canonical URL, Open Graph and Twitter tags. The root layout sets `metadataBase` (codenax.com) so all of these become absolute URLs. A page's `openGraph` replaces its parent's whole, including a nearby `opengraph-image` file, so the share picture is always set by the helper: the site image, or a blog post's own. |
| 2026-10-05 | 13 | **Share images (generated at build time with `ImageResponse`):** `app/opengraph-image.tsx` (light brand card: logo, the home hero headline, the site description, the domain) and `app/blog/[slug]/opengraph-image.tsx` (the post's cover, darkened, with category, title and author; `generateStaticParams` so all 9 are static). Satori, the renderer, has no `inset`, so boxes are spelled out. |
| 2026-10-05 | 13 | **`app/sitemap.ts`** (49 URLs built from the content files; blog posts carry their date), **`app/robots.ts`** (all allowed except `/styleguide`; points to the sitemap), **`app/not-found.tsx`** (branded 404: big gradient "404", short message, Home / Contact buttons, four popular pages; Next sends status 404 + noindex; title via `metadata`). |
| 2026-10-05 | 13 | **JSON-LD** (`components/seo/json-ld.tsx`, a plain `<script type="application/ld+json">` with `<` escaped, per the Next guide): Organization on every page (layout), FAQPage on home (6), /faq (13), the 8 service pages with FAQs and the 3 posts with FAQs, BlogPosting on every post. All parse; checked in the rendered HTML. |
| 2026-10-05 | 13 | **Accessibility audit:** axe-core 4.10 (WCAG 2.0/2.1/2.2 A + AA and best practices) injected into every page in the test browser only (not a project dependency), in light and dark, at 1280 and 390. First run 52/100 clean. Fixed: (1) decorative watermark numbers (FeatureGrid, service cards) are now drawn with CSS `content: attr()` so they aren't text; (2) industry photo tiles got a dark `bg-brand-950` backdrop so white text has contrast before/without the photo; (3) the case-study facts `<dl>` was invalid (icons wrapped dt/dd); each row's div now holds only dt + dd, with the icon inside the dt; (4) an empty table header cell (from the content) renders as a `<td>`; (5) the testimonial rail and RichText tables, which scroll sideways, are keyboard-focusable (`tabIndex={0}`). Result: 100/100 clean at 1280 and 390. Keyboard: Tab order starts with "Skip to content", then the navbar in order, and every stop has a visible focus ring. |
| 2026-10-05 | 13 | **Contrast in scroll-driven steps:** Lighthouse (normal motion) caught what axe (run with reduced motion) couldn't: upcoming steps in the home process timeline and the service-page "split" and "zig-zag" layouts were dimmed with 45–50% opacity, giving text 2–2.9:1. Muted text only passes above ~88% opacity, so dimming text by opacity was dropped: upcoming steps now show their title in the muted colour (≥ 4.5:1) and lose the glow/shadow; the current step keeps its highlight. Small visual change to the approved design, made for WCAG AA. |
| 2026-10-05 | 13 | **Lighthouse** (v12, production build on port 3100; home, a service, a case study, a blog post, contact): Accessibility, Best Practices and SEO **100 on all 10 runs**; Performance **96–99 on desktop**. **Mobile performance 61–86 (goal 95+, not met; Ground rule 4: goal, not gate).** Cause: on Lighthouse's simulated mid-range phone (4× slower CPU), React start-up for the interactive sections blocks the main thread for 300–700 ms (TBT) and delays the largest paint (the faded hero photo on home, the hero on other pages); first paint itself is ~1.3 s. Scores also swung ±10 between runs on this laptop (dev server running alongside). Tried and reverted: `experimental.inlineCss` (no measurable FCP/LCP gain, so not worth an experimental flag). A possible next step, if wanted: send less JavaScript on the home page by making below-the-fold interactive sections load on demand. |
| 2026-10-05 | 14 | **Removed** the temporary `/styleguide` page (now 404), the `Tabs` component (only the styleguide used it; a scan found no other unused file) and the `iconNames` export; `robots.txt` no longer needs to exclude it. |
| 2026-10-05 | 14 | **Link check:** every page in the sitemap plus the 404 page was fetched and every `<a href>` collected: 270 distinct internal links and anchors, all resolve (status 200, and each `#id` exists on its target page). The 5 external links (WhatsApp, Facebook, Instagram, LinkedIn, email) respond 200; they are the rendered codenax.com ones (CONTENT-GAPS §5). |
| 2026-10-05 | 14 | **Browsers:** Chrome (all checks throughout the project) and **Microsoft Edge 154** (headless): all 49 pages pass in light at 1280 and 390 and in dark at 1280; the estimator, contact form (validation, loading, result, edit), estimate hand-off, FAQ filter, page transitions and accordions (including reduced motion) behave identically. **Not tested here:** Safari (only runs on Apple devices) and Firefox (not installed). Firefox and older Safari lack `::details-content`, so their accordions open instantly instead of gliding, and browsers without the View Transitions API swap pages instantly; both fallbacks are by design. Owner to spot-check on an iPhone/Mac. |
| 2026-10-05 | 14 | **Consistency:** no leftover TODO/console.log/debugger; dependencies are exactly the planned six (next, react, react-dom; tailwindcss, @tailwindcss/postcss, typescript + types/eslint). Final: `tsc`, `eslint .`, `next build` (66 static outputs), all 49 pages at 1280 and 390. |
| 2026-10-05 | 14 | **Owner content review:** held figures shown as on codenax.com (`lib/on-hold.ts` lists emptied, mechanism kept; the home hero's `descriptionOnHold` flag removed); Fintech "TBD", Wyoming address and the visible social links kept (the links were compared with the live site and are identical); our wording where the site had none approved. |
| 2026-10-05 | 14 | **Stats added (mockup approved):** `content/stats.ts` (verbatim). `StatsStrip` (`components/sections/stats.tsx`): one card with the brand gradient line, hairline-split columns (2 × 2 on phones), an icon per stat, a hover tint. Placed where codenax.com has it: under the hero on About and Why Us, and between the engagement models and services on home. The home hero shows the first three in a row under its buttons, outside the slides so it stays while they change. **Count-up is CSS only:** the number is a CSS counter fed by a registered `@property --stat-n` animated from 0 (on load in the hero, on reveal in the strip); the real value is screen-reader text, so search engines and assistive tech get "120+"; without motion (or `@property`) the final number shows. Checked: count mid-way at 0.7 s and final after; instant with reduced motion; axe clean (both themes, 1280 and 390); build; all pages. |
---

## 8. Change Log
Approved scope or phase changes only.

| Date | Change | Approved by |
|---|---|---|
| 2026-09-28 | Initial plan approved (rev. 2 with ground rules, plus the rule on unverifiable content and this file) | Owner |
| 2026-09-28 | Content decisions: brand name is **CodeNax**; conflicting statistics are unverified gaps and not displayed; unverified service-card metrics are dropped. Ground rule 1 extended to match. | Owner |
| 2026-09-28 | **Visual direction changed** from dark-first with a violet/cyan accent to **light-first with CodeNax's white + blue brand as the majority influence**, modernised rather than copied. Dark mode stays as an option through the toggle. | Owner |
| 2026-09-28 | All unverified statistics and metrics are kept out of the UI, including the AI & Automation metrics, "99% Client Retention" and "8+ Industries". | Owner |
| 2026-09-30 | **Case studies: 8, not 3.** The site lists 8; all will be built in Phase 7. | Owner |
| 2026-09-30 | Prices that codenax.com shows publicly (service pages, blog posts) are shown as-is. Blog author names are shown as credited on the site. Conflicting experience/volume figures are deferred to a later decision. | Owner |
| 2026-10-05 | **Content review (Phase 14):** the conflicting experience/volume figures, the blog's CodeNax founding year / team size / hourly rate and the "100% success rate" claim are **shown as codenax.com shows them** (hold lists in `lib/on-hold.ts` emptied; mechanism kept). "Fintech Client (TBD)" stays as the site shows it. Address: Wyoming (as rendered). The site's stat strips ("120+ Live Applications"…) are also to be shown as on the site; placement to be agreed. | Owner |
| 2026-10-07 | **Contact form shows a success screen** ("Thanks for reaching out!…") instead of "Online submission isn't connected yet". Still no backend: nothing is sent, so `submitContact()` in `lib/contact.ts` must be wired to a real service before the site goes live. Replaces ground rule 3's "never says sent". | Owner |
| 2026-10-08 | **Home testimonial cards restyled "Soft tint"** (chosen from a preview of 3 styles): light-blue `bg-soft` card with no resting border or shadow, company name as a small pill beside the quote mark, slightly larger medium-weight quote text. Same quotes, palette and rail layout. Also added: slide dots and arrows that disable at the ends; edge fade where cards are hidden (`mask-fade-x` utility); cards reveal one after another (`data-reveal="stagger"`); figures in quotes (120+, 45%, 160%) in the brand gradient; "Read the story" link on cards whose company has a case study (CureNax, Buzup, Educator Hub, Ciwac); the quote mark tilts on hover. **Auto-play** (owner's choice): one card every 6s while the rail is on screen, looping back after the last; pauses on hover or keyboard focus, has a pause/play button, and is off for reduced motion (same pattern as the hero carousel). | Owner |
| 2026-10-09 | **`lib/on-hold.ts` removed.** Its hold lists had been empty since 2026-10-05, so it hid nothing; the 6 files that called it (About, Industries, service, case-study and blog pages, `service-section.tsx`) now read the content directly. Stale "held back" notes removed from CONTENT-GAPS.md. To hide a phrase again, edit the content file. | Owner |
| 2026-10-01 | Homepage design enhanced (data, palette and layout unchanged), and **scroll-reveal animations moved from Phase 12 into Phase 5**. Phase 12 keeps the remaining motion work (process scroll progress, estimator and form transitions, polish). | Owner |
