# RingDesk — Project Context

## What is RingDesk

RingDesk is a done-for-you AI receptionist service for small businesses, especially trades (plumbers, HVAC, electricians, garage door, roofers) in Northern Colorado. Differentiates from DIY tools (Rosie, Goodcall, Allo) by being fully managed — Tony installs, configures, and tunes the receptionist for each customer weekly.

## Phase 1 scope (locked April 2026)

- **Vertical:** Trades (plumbers, HVAC, electricians, garage door, roofers) in Northern Colorado
- **Pricing:** $249/mo Standard, $499/mo Premium
- **Target:** $5K MRR by end of July 2026 (90 days)
- **Time budget:** 10+ hrs/week
- **Customer #1:** Free 30-day pilot in exchange for testimonial + 2 referrals
- **Customers #2+:** Paid from day one
- **Phase 2 trigger:** Customer #5 paying

## What's in Phase 1 (this codebase)

- Single static landing page at ringdesk.co
- 6 sections: Hero, Problem, How it works, Pricing, FAQ, Final CTA
- Stripe payment links embedded for $249 Standard / $499 Premium tiers (TBD — added in Block 4)
- Calendly link for discovery calls
- Privacy policy and terms pages

## What's NOT in Phase 1

- ❌ Customer self-serve dashboard
- ❌ Authentication / login
- ❌ Supabase or any database
- ❌ Customer-facing app
- ❌ Stripe webhooks (payment links handle billing fully)
- ❌ Multi-tenant anything
- ❌ Founder story section (Phase 2)
- ❌ Comparison table vs competitors (Phase 2)

These are Phase 2 problems triggered by customer #5 paying. Do not build them in Phase 1.

## Tech stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Vercel deployment
- Domain: ringdesk.co

## Brand assets

- **Primary color (slate):** `#0F172A`
- **Accent (indigo):** `#4F46E5` (sparingly — CTAs, accents only)
- **Muted text:** `#94A3B8`
- **Background:** `#FFFFFF` (light), `#0F172A` (dark sections)
- **Logo:** Wordmark only — `RingDesk` in Inter Bold, color `#0F172A`
- **Tagline:** "AI receptionist for trades. Installed and tuned by a real person."
- **RingDesk phone number:** (970) 528-8725 (Berthoud, CO Twilio number)
- **Logo file:** `/public/ringdesk-logo.png`
- **Favicon files:** `/public/favicon/...` (from realfavicongenerator.net)
- **OG image:** `/public/og-image.png`

## External links

- **Calendly (primary CTA):** https://calendly.com/tony-ringdesk/ringdesk-discovery-call
- **Email:** tony@ringdesk.co (primary), hello@ringdesk.co (general)
- **Stripe Standard ($249) payment link:** TBD — to be added in Block 4
- **Stripe Premium ($499) payment link:** TBD — to be added in Block 4

## Voice and tone

- **Direct, not slick.** Trades buyers distrust marketing-speak. Plain English wins.
- **Specific over abstract.** "Stop missing $400 service calls" beats "Maximize lead capture."
- **Founder-led.** First person where it fits. "I built this because..."
- **No corporate fluff.** No "synergize," "seamless," "best-in-class," "revolutionary."
- **Confident on differentiation.** Done-for-you vs DIY is the pitch. Don't apologize for being premium.

## Conventions for Claude Code

- Always read this CLAUDE.md first
- End every prompt with: "Update CLAUDE.md with a dated Recent Changes entry when complete."
- Flag all manual steps as ⚠️ ACTION REQUIRED
- Break large tasks into small scoped prompts
- All deployment via Vercel on `main` branch push
- No local dev environment — all changes via PRs from GitHub web UI
- SQL migrations as copy-paste (not applicable yet — no DB in Phase 1)

## Recent Changes

- 2026-04-29: Project context defined. Landing page scaffolding scheduled.
- 2026-04-29: Phase 1 landing page scaffolded. Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui (button, card, accordion, separator) initialized in `src/`. Inter font wired via `next/font/google`. Brand colors exposed as CSS vars (`--brand-slate`, `--brand-indigo`, `--brand-muted`, `--brand-bg-secondary`) in `src/app/globals.css`. Single landing page at `/` with 6 sections — Hero (logo + Calendly link, headline, dual CTAs, audio sample card), Problem (slate bg, 3 stat cards), How it works (3 numbered steps), Pricing (Standard $249 / Premium $499 with indigo accent border), FAQ (shadcn Accordion, 6 Qs), Final CTA (slate bg). Footer links to `/privacy` and `/terms` (placeholder Termly content). Root `layout.tsx` configured with full SEO meta — OG image, Twitter card, canonical, favicon links pointing at `/public/favicon/...`. Constants in `src/lib/constants.ts`. Stripe payment links currently fall back to Calendly (TBD Block 4). ⚠️ ACTION REQUIRED for Tony: (1) drop logo/favicon/og-image into `/public` per `public/README.md`, (2) record `audio/sample-call.mp3` after Vapi build, (3) swap Stripe payment URLs in `src/lib/constants.ts`, (4) replace Termly placeholder copy on `/privacy` and `/terms`.
- 2026-04-29: Fixed Vercel `404 NOT_FOUND` on every route (`/`, `/privacy`, `/terms`). Diagnosis: locally `next build`, `next dev`, and `next start` all serve the routes correctly (verified — HTTP 200, prerendered HTML in `.next/server/app/*.html`). The `404 NOT_FOUND` shown by Vercel is its **platform-level routing error** (raised before the Next.js runtime), which means Vercel's build output wasn't being recognized as a Next.js deployment — symptom of either framework auto-detection failing (e.g. project was created against the empty repo before Next.js was added) or production-branch / root-directory misconfiguration in the Vercel dashboard. Fix: added `vercel.json` pinning `framework: nextjs`, `buildCommand: next build`, `outputDirectory: .next`, `installCommand: npm install` so Vercel uses the Next.js builder regardless of dashboard auto-detect. Also renamed `package.json` `name` from leftover `ringdesk-scaffold` to `ringdesk`. Reminder: Vercel's production branch is `main` per this CLAUDE.md — the landing page must be merged into `main` for `ringdesk.co` to serve it.
