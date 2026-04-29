# Public assets

⚠️ ACTION REQUIRED — Tony to upload the following before launch:

## Logo
- `ringdesk-logo.png` — wordmark, ~80px tall (retina-ready), color `#0F172A` on transparent background.

## Favicon (drop the realfavicongenerator.net package into `/public/favicon/`)
- `favicon/favicon.ico`
- `favicon/favicon-16x16.png`
- `favicon/favicon-32x32.png`
- `favicon/apple-touch-icon.png` (180x180)
- `favicon/android-chrome-192x192.png`
- `favicon/android-chrome-512x512.png`
- `favicon/site.webmanifest`

## Open Graph
- `og-image.png` — 1200x630, used for social previews on Twitter/LinkedIn/iMessage.

## Audio sample (Block 2 — after Vapi build)
- `audio/sample-call.mp3` — short recording of the AI receptionist handling a plumber emergency call.

This folder is referenced by `src/app/layout.tsx` (favicon + OG) and `src/components/sections/hero.tsx` (audio sample). Do not rename without updating those.
