import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { TradesCrossLinks } from "@/components/sections/trades-cross-links";
import { SiteFooter } from "@/components/site-footer";
import { HOME_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { HOME_FAQ_SCHEMA } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

// Hero audio sample (Vapi recording) is gated by the build-time env var
// NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE. While unset (or any value other than
// the literal string "true") the audio player card and the secondary
// "Hear it answer a call" button are hidden — only the primary booking
// CTA renders. To enable: drop the recording at /public/audio/sample-call.mp3,
// set NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE=true in Vercel project env vars,
// and redeploy.
export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Problem />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <TradesCrossLinks />
      <FinalCTA />
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_FAQ_SCHEMA) }}
      />
    </main>
  );
}
