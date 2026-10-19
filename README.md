# CodeNax Website

Frontend for the CodeNax website, built with Next.js (App Router), React, Tailwind CSS v4 and TypeScript.

The roadmap, scope, constraints and phase status are in [PROJECT-PLAN.md](PROJECT-PLAN.md).

## Scripts

```bash
npm install      # install dependencies
npm run dev      # start the dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next build does not lint in Next.js 16)
```

## Structure

| Folder | Purpose |
|---|---|
| `app/` | Routes, root layout, global styles |
| `components/ui/` | Design-system primitives (Button, Card, …) |
| `components/layout/` | Navbar, Footer, mobile navigation, theme toggle |
| `components/sections/` | Reusable page sections, driven by data |
| `components/features/` | Interactive features: estimator, contact form, blog filters |
| `content/` | Typed business content (single source of truth) |
| `hooks/` | Client hooks |
| `lib/` | Helpers and shared types |
| `public/` | Static assets |
