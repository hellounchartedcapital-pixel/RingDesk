import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { FinalCTA } from "@/components/sections/final-cta";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Problem />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </main>
  );
}
