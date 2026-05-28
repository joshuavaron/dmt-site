# Project Guide

This site is built on a portable design system (see `DESIGN_SYSTEM.md`). Follow
it so the visual language stays coherent.

## Tech Stack
Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion + lucide-react

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (run before PRs) |
| `npm run lint` | Lint check |
| `npx tsc --noEmit` | Type check |

## Imports

```ts
import { Container, Heading, PillButton, ArrowLink, IconTile, AnimatedNumber } from "@/components/ui";
import { DiagonalSpread, TestimonialSpread, SectionIntro, FaqAccordion } from "@/components/sections";
import { fontSerif, fontHeading, fontBody, headingSize, bodySize } from "@/lib/typography";
import { palette, accentCycle } from "@/lib/colors";
import { cn } from "@/lib/utils";
```

## Core rules (full detail in `DESIGN_SYSTEM.md`)

- **Typography:** use the `<Heading size="…">` component, never raw `<h1>` with
  ad-hoc classes. Body copy is `<p style={fontBody} className={bodySize.…}>`.
  Three families only — serif (display), Outfit (numerals/card titles), Inter (body).
- **Color:** raw hex at the call site (`text-[#397bce]`, `panelBg="#f97316"`).
  `src/lib/colors.ts` is the source of truth. No gradients, no decorative blobs,
  no drop-shadow depth.
- **Layout:** content sections → `<section className="bg-white"><Container className="py-14 md:py-20">…`.
  Full-bleed `DiagonalSpread` / `TestimonialSpread` are NEVER wrapped in `Container`.
- **Backgrounds:** plain `bg-white` canvas; accent comes from interleaved colored
  spreads, not gray section alternation.
- **Animation:** import variants from `@/lib/animations` — never define local
  `containerVariants`/`itemVariants`. Cards stagger in by index; no hover-lifts.
- **CTAs:** `PillButton` (rounded-full) for buttons; `ArrowLink` for in-text/in-card links.

## Page recipe

Hero spread → content sections (`SectionIntro` + card grid) → an interleaved
colored spread every 2–3 sections → FAQ → final-CTA spread. `src/app/page.tsx`
is a complete working reference — read it before building new pages.

## Before any PR

```bash
npm run build && npm run lint && npx tsc --noEmit
```

Then check the page in the browser at mobile, tablet, and desktop widths, and
confirm scroll animations fire and there are no console errors.

## Fonts

The serif (Freight Text Pro) loads via the Adobe Typekit `<link>` in
`src/app/layout.tsx`. If headings render in Times New Roman, the Typekit link
needs attention — see `SETUP.md`.
