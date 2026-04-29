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
- Privacy and Terms pages with custom-drafted long-form policies (not Termly)
- Programmatic content pages — trade vertical pages at `/for/[trade]` and location pages at `/locations/[city]`, generated from content data files. Currently includes: plumbers, hvac, loveland, fort-collins.
- Technical SEO: `/robots.txt` (`src/app/robots.ts`), `/sitemap.xml` (`src/app/sitemap.ts` — auto-includes every trade and location route), sitewide JSON-LD `LocalBusiness` + 2x `Service` injected via the root layout, plus page-level FAQPage on the homepage and each trade page, plus a location-scoped LocalBusiness on each location page
- Per-page metadata with `title.template` (`%s | RingDesk`), Open Graph (1200x630), Twitter `summary_large_image`, page-level canonicals, robots + googlebot directives, and a separate `viewport` export
- Audio sample gating via `NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE` env var — hero audio player and the secondary "Hear it answer a call" button are omitted from the rendered HTML until Tony sets the var to `true` and drops the recording
- Centralized constants, FAQ content, trade/location content, and schema in `src/lib/` so metadata, structured data, and rendered components share one source of truth
- Stripe payment links embedded for $249 Standard / $499 Premium tiers
- Calendly link for discovery calls

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
- `@tailwindcss/typography` plugin (drives the `prose prose-slate` styling on `/privacy` and `/terms`)
- shadcn/ui components (button, card, accordion, separator)
- Inter font via `next/font/google` with `display: swap`, exposed as `--font-inter`
- JSON-LD structured data injected via `dangerouslySetInnerHTML` in the root layout
- Vercel deployment (framework pinned via `vercel.json`)
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
- **Stripe Standard ($249) payment link:** ✅ live — https://buy.stripe.com/cNicN79cp8yQe8ibT104800
- **Stripe Premium ($499) payment link:** ✅ live — https://buy.stripe.com/dRm00l60d7uM3tE2ir04801

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
- When architectural facts change, update both the relevant top-of-file section AND add a dated Recent Changes entry — top sections must reflect current state, not history

### Extensibility patterns — where things live

- **Site-wide constants** (URLs, phone, copy, OG paths): `src/lib/constants.ts`. Add new shared strings here so metadata, schema, and components don't drift.
- **FAQ content** (homepage): `src/lib/faq.ts`. The visible `<FAQ>` component (`src/components/sections/faq.tsx`) and the homepage `FAQPage` JSON-LD both consume this array — change questions/answers in one place.
- **Trade content**: `src/lib/trades.ts`. To add a new trade vertical page, add an entry to the `TRADES` record — the `/for/[slug]` route, the trade-specific FAQPage JSON-LD, the homepage `<TradesCrossLinks>` cards, the cross-links from each location page, and the sitemap all auto-update. No manual route, sitemap, or schema edits needed.
- **Location content**: `src/lib/locations.ts`. To add a new location page, add an entry to the `LOCATIONS` record — the `/locations/[slug]` route, the location-scoped LocalBusiness JSON-LD, and the sitemap all auto-update. No manual sitemap edits needed.
- **JSON-LD schema** (`@graph` builders): `src/lib/schema.ts`. `SITE_SCHEMA` (LocalBusiness + 2x Service, no FAQPage) is injected from the root layout on every page. `HOME_FAQ_SCHEMA` is injected from the homepage. `buildTradePageSchema(faqs)` is injected from each trade page. `buildLocationBusinessSchema({slug, city, url})` is injected from each location page. FAQPage only appears on pages that actually render the FAQs (Google guidance).
- **Legal page shell** (Privacy and Terms share it): `src/components/legal-page.tsx`. Wraps content in `prose prose-slate max-w-3xl mx-auto` with the logo header, `SiteFooter`, "← Back to home", and a cross-link to the other policy.
- **Audio sample gating**: env var `NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE` (must equal the literal string `"true"`); recording at `/public/audio/sample-call.mp3`. Logic in `src/components/sections/hero.tsx`.
- **Brand color tokens**: CSS vars in `src/app/globals.css` (`--brand-slate`, `--brand-indigo`, `--brand-muted`, `--brand-bg-secondary`). Reference via `text-[color:var(--brand-slate)]` etc.
- **SEO routes**: `src/app/robots.ts` and `src/app/sitemap.ts` use Next's `MetadataRoute.Robots` / `MetadataRoute.Sitemap` types; trade and location routes are added automatically by iterating `TRADE_SLUGS` and `LOCATION_SLUGS`. New top-level routes (e.g. a future `/about`) need a hand-added entry here.
- **Vercel build**: pinned in `vercel.json` (`framework: nextjs`, `buildCommand`, `outputDirectory`, `installCommand`); do not let Vercel's dashboard auto-detect override.

## Recent Changes

- 2026-04-29: Project context defined. Landing page scaffolding scheduled.
- 2026-04-29: Phase 1 landing page scaffolded. Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui (button, card, accordion, separator) initialized in `src/`. Inter font wired via `next/font/google`. Brand colors exposed as CSS vars (`--brand-slate`, `--brand-indigo`, `--brand-muted`, `--brand-bg-secondary`) in `src/app/globals.css`. Single landing page at `/` with 6 sections — Hero (logo + Calendly link, headline, dual CTAs, audio sample card), Problem (slate bg, 3 stat cards), How it works (3 numbered steps), Pricing (Standard $249 / Premium $499 with indigo accent border), FAQ (shadcn Accordion, 6 Qs), Final CTA (slate bg). Footer links to `/privacy` and `/terms` (placeholder Termly content). Root `layout.tsx` configured with full SEO meta — OG image, Twitter card, canonical, favicon links pointing at `/public/favicon/...`. Constants in `src/lib/constants.ts`. Stripe payment links currently fall back to Calendly (TBD Block 4). ⚠️ ACTION REQUIRED for Tony: (1) drop logo/favicon/og-image into `/public` per `public/README.md`, (2) record `audio/sample-call.mp3` after Vapi build, (3) swap Stripe payment URLs in `src/lib/constants.ts`, (4) replace Termly placeholder copy on `/privacy` and `/terms`.
- 2026-04-29: Fixed Vercel `404 NOT_FOUND` on every route (`/`, `/privacy`, `/terms`). Diagnosis: locally `next build`, `next dev`, and `next start` all serve the routes correctly (verified — HTTP 200, prerendered HTML in `.next/server/app/*.html`). The `404 NOT_FOUND` shown by Vercel is its **platform-level routing error** (raised before the Next.js runtime), which means Vercel's build output wasn't being recognized as a Next.js deployment — symptom of either framework auto-detection failing (e.g. project was created against the empty repo before Next.js was added) or production-branch / root-directory misconfiguration in the Vercel dashboard. Fix: added `vercel.json` pinning `framework: nextjs`, `buildCommand: next build`, `outputDirectory: .next`, `installCommand: npm install` so Vercel uses the Next.js builder regardless of dashboard auto-detect. Also renamed `package.json` `name` from leftover `ringdesk-scaffold` to `ringdesk`. Reminder: Vercel's production branch is `main` per this CLAUDE.md — the landing page must be merged into `main` for `ringdesk.co` to serve it.
- 2026-04-29: Privacy and Terms placeholder content replaced with custom-drafted long-form policies (not Termly). Both pages now live in `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`, sharing a new `LegalPage` shell (`src/components/legal-page.tsx`) that wraps the body in a `prose prose-slate max-w-3xl mx-auto` article with the site logo header and `SiteFooter`, plus a "← Back to home" link and a cross-link to the other policy. Installed `@tailwindcss/typography` and registered it via `@plugin "@tailwindcss/typography";` in `globals.css`; prose modifiers (`prose-headings:tracking-tight`, `prose-headings:text-[--brand-slate]`, `prose-a:text-[--brand-indigo]`) keep the typography on-brand. Privacy covers Customers vs Callers, info collected, processors (Stripe, Vercel, Twilio, Vapi, Anthropic, Google Workspace, Calendly with deep links), retention, rights (CCPA/GDPR notes), recording consent, security, children, contact. Terms cover service description, eligibility, plans/pricing/payment/cancellation/refunds (including the First-90-Days promo language), customer responsibilities, recording-consent indemnity, phone-number/forwarding rules, AI limitations, IP, availability, disclaimers, liability cap, indemnification, termination, Colorado governing law, AAA arbitration in Denver with class-action waiver, and miscellaneous. Both policies dated "Last updated: April 29, 2026" and route the contact channel to tony@ringdesk.co with the Castle Pines address. The earlier ⚠️ ACTION REQUIRED item (4) — replace Termly placeholder copy on `/privacy` and `/terms` — is now resolved; remaining ACTION REQUIRED items are still (1) public assets, (2) audio sample, (3) Stripe payment URLs.
- 2026-04-29: Footer copy trimmed — dropped "Built in Berthoud, Colorado." from `src/components/site-footer.tsx`. Footer now reads `© 2026 RingDesk. Privacy · Terms · tony@ringdesk.co` (links and email unchanged). Verified `Berthoud` no longer appears in any rendered HTML (`.next/server/app/{index,privacy,terms}.html`).
- 2026-04-29: Technical SEO foundation: robots.txt, sitemap.xml, per-page metadata, JSON-LD schema (LocalBusiness, Service x2, FAQPage), heading hierarchy, performance optimizations. Generated `/robots.txt` via `src/app/robots.ts` (User-agent `*`, Allow `/`, Sitemap `https://ringdesk.co/sitemap.xml`) and `/sitemap.xml` via `src/app/sitemap.ts` (homepage priority 1.0 monthly, /privacy and /terms priority 0.3 yearly, ISO-8601 lastmod). Reworked root metadata in `src/app/layout.tsx` to use `metadataBase`, a `title.template` of `%s | RingDesk` with default `RingDesk — AI receptionist for trades in Northern Colorado`, the new long-form description focused on plumbers/HVAC/electricians/$249, full `robots`/`googleBot` directives (`max-image-preview: large`, `max-snippet: -1`), `openGraph` (type/locale/url/siteName/images 1200x630), and `twitter:summary_large_image`; added a separate `viewport` export (`width: device-width`, `initialScale: 1`, `maximumScale: 5`). Homepage (`src/app/page.tsx`) overrides title via `title.absolute` (`AI receptionist for trades in Northern Colorado | RingDesk`) so the template doesn't double up; `/privacy` and `/terms` get short titles, page-specific descriptions, page-level canonicals, and `robots: { index: true, follow: true }`. Centralized site copy + URLs in `src/lib/constants.ts` (SITE_URL, SITE_DESCRIPTION, HOME_TITLE, OG_IMAGE_PATH, RINGDESK_PHONE) so metadata and structured data share one source of truth. Extracted FAQ content to `src/lib/faq.ts` and refactored `src/components/sections/faq.tsx` to consume it. Added `src/lib/schema.ts` exporting a single `SITE_SCHEMA` `@graph` containing LocalBusiness (`@id #business`, Castle Pines address, +1-970-528-8725, areaServed Berthoud/Loveland/Fort Collins/Greeley/Longmont/Johnstown/Windsor + Colorado, priceRange `$249-$499`, image/logo URLs, sameAs []), Service `#service-standard` ($249/MON UnitPriceSpecification), Service `#service-premium` ($499/MON), and FAQPage built from the same `faqs` array. The schema is injected once via `<script type="application/ld+json">` at the end of `<body>` in the root layout (static, dangerouslySetInnerHTML with JSON.stringify). Heading hierarchy verified: exactly one `<h1>` per page (hero on `/`, page title on legal pages), `<h2>` per section, `<h3>` for tier names / step titles / legal subsections — no skips. All external links (Calendly, Stripe placeholders, processor deep links in `/privacy`) carry `target="_blank" rel="noopener noreferrer"`; same-origin self-references intentionally do not. No `<img>` tags exist (logo is a text wordmark) so there's nothing to migrate to `next/image`; Inter is loaded via `next/font/google` with `display: swap`. Verified locally: `next build` reports `/robots.txt` and `/sitemap.xml` as static routes alongside `/`, `/privacy`, `/terms`; `curl /robots.txt` and `/sitemap.xml` return the expected payloads; the homepage HTML contains a single `application/ld+json` block whose JSON parses cleanly with all four schema types and ID cross-references intact; per-page `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, `<meta name="googlebot">`, `viewport`, `og:*`, and `twitter:*` tags are all present and page-specific where they should be.
- 2026-04-29: Hero polish + audio-sample gating. (1) Gated the hero audio player and the "Hear it answer a call" secondary button behind a build-time env var `NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE`. With the var unset (default), both the audio card and the secondary button are completely omitted from the rendered HTML — only the primary "Book a 15-min call" CTA renders, so there's no dead button pointing at a missing file. ⚠️ ACTION REQUIRED for Tony when the Vapi recording is live: drop it at `/public/audio/sample-call.mp3`, set `NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE=true` in Vercel project env vars, and redeploy — the audio card and the "Hear it answer a call" button will both appear, and the button anchor-scrolls to the player. Comment in `src/app/page.tsx` documents the toggle. (2) Added `scroll-smooth` to `<html>` in `src/app/layout.tsx` so the in-page anchor scroll feels good. (3) Increased hero breathing room — top padding bumped from `pt-20 sm:pt-28 lg:pt-32` to `pt-28 sm:pt-40 lg:pt-48` (~50% more), bottom padding `pb-24 lg:pb-32` → `pb-28 lg:pb-36`, headline → subheadline gap `mt-6` → `mt-10`, subheadline → CTAs gap `mt-10` → `mt-14`. Both build modes verified locally (`next build` with and without the env var); with the var off, `<audio>`, `Hear it answer`, and `sample-call` are all absent from `.next/server/app/index.html`.
- 2026-04-29: CLAUDE.md cleanup — top-of-file authoritative sections updated to reflect current state. Recent Changes log preserved as-is. Going forward, every PR should update both the relevant top sections (if architectural facts change) AND add a dated changelog entry. Specifically: "What's in Phase 1" now lists the privacy/terms pages, technical SEO routes, JSON-LD schema, per-page metadata, audio-sample gating, and the centralized `src/lib/` source-of-truth pattern; "Tech stack" adds `@tailwindcss/typography`, the Inter font wiring, JSON-LD via `dangerouslySetInnerHTML`, and the `vercel.json` framework pin; "Conventions for Claude Code" adds an "Extensibility patterns" subsection mapping each shared concern (constants, FAQ data, schema, legal page shell, audio gating, brand tokens, SEO routes, Vercel build) to its file path so future PRs don't have to grep.
- 2026-04-29: SEO Layer 3 launched — programmatic content pages for trade verticals (`/for/plumbers`, `/for/hvac`) and locations (`/locations/loveland`, `/locations/fort-collins`) with reusable templates. Sitemap now includes 7 URLs (was 3). New content data files: `src/lib/trades.ts` (TradeContent + TRADES record with hero copy, three value props, common call types, avg job value text, testimonial placeholder, four trade-specific FAQs, metaTitle/metaDescription) and `src/lib/locations.ts` (LocationContent + LOCATIONS record with displayName, fullName, region, population, nearbyAreas, localContext prose, whyTradesHere prose, localKeywords, testimonialPlaceholder, metaTitle/metaDescription). Adding a new trade or location is now a single-file edit (add an entry to the relevant record); `/for/[slug]` / `/locations/[slug]` routes, sitemap entries, homepage cross-link cards, and JSON-LD all update automatically. Each page has unique `title` (via `title.absolute`), `description`, `canonical`, `og:url`, and `twitter` overrides. Each trade page injects its own FAQPage JSON-LD via `buildTradePageSchema(trade.faqs)`; each location page injects a location-scoped LocalBusiness via `buildLocationBusinessSchema({slug, city, url})` with `parentOrganization` `@id` ref to the master `#business`. Refactored `SITE_SCHEMA` to drop FAQPage from the layout-level @graph (so it doesn't show up on pages that don't render the FAQ — Google's guidance) and added `HOME_FAQ_SCHEMA` injected from the homepage. Homepage now has a `RingDesk for your trade` section above the footer (`src/components/sections/trades-cross-links.tsx`) with cards linking to each trade page. Added `id="pricing"` and `id="how-it-works"` (with `scroll-mt-24`) to the homepage Pricing and How-it-works sections so the trade/location page CTAs that link to `/#pricing` and `/#how-it-works` land cleanly. Trade-page final CTA cross-links to other trade pages; location pages cross-link to all trade pages. Both new dynamic routes use `generateStaticParams` + `dynamicParams = false` so they're fully statically prerendered and any unknown slug 404s. Verified locally: `next build` shows 9 prerendered pages (`/`, `/privacy`, `/terms`, `/for/plumbers`, `/for/hvac`, `/locations/loveland`, `/locations/fort-collins`, `/robots.txt`, `/sitemap.xml`); `next lint` clean; `curl /sitemap.xml` returns all 7 content URLs; per-page audit shows trade pages have a unique 4-question FAQPage and location pages have a city-scoped LocalBusiness, with no duplicated FAQPage on pages that don't render the FAQ.
- 2026-04-29: Stripe payment links wired in — Standard ($249/mo) and Premium ($499/mo) live. Pricing CTAs on homepage and trade pages now go directly to Stripe Checkout. ACTION REQUIRED #3 (Stripe payment URLs) is now resolved. `STRIPE_STANDARD_URL` (`https://buy.stripe.com/cNicN79cp8yQe8ibT104800`) and `STRIPE_PREMIUM_URL` (`https://buy.stripe.com/dRm00l60d7uM3tE2ir04801`) replace the prior Calendly fallbacks in `src/lib/constants.ts`. The homepage Pricing section's "Get Standard" / "Get Premium" buttons render the new URLs (verified by grepping `.next/server/app/index.html`). Trade pages (`/for/plumbers`, `/for/hvac`) don't render Stripe links directly — their "See pricing" CTA anchor-scrolls to `/#pricing`, where the live links live — so they remain unchanged. "What's in Phase 1" now drops the "(TBD — added in Block 4)" qualifier on the Stripe bullet, and "External links" lists both URLs as ✅ live.
