import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CallCTA } from "@/components/call-cta";
import { SiteLogo } from "@/components/site-logo";
import { SiteFooter } from "@/components/site-footer";
import {
  BOOKING_CTA_LABEL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  OG_DEFAULTS,
  SITE_URL,
  TWITTER_DEFAULTS,
} from "@/lib/constants";
import { LOCATION_SLUGS, getLocation } from "@/lib/locations";
import { ACTIVE_TRADE_SLUGS, getTrade } from "@/lib/trades";
import { getTradeLocation } from "@/lib/data/trade-locations";
import {
  buildBreadcrumbSchema,
  buildComboServiceSchema,
  buildFaqPageSchema,
  buildLocationBusinessSchema,
} from "@/lib/schema";

type Params = { trade: string; city: string };

export function generateStaticParams(): Params[] {
  // Generate the cartesian product of active trades x locations. Stub
  // (coming-soon) trades are excluded from ACTIVE_TRADE_SLUGS so combo
  // routes for them simply don't render — same pattern as /for/[trade].
  const params: Params[] = [];
  for (const trade of ACTIVE_TRADE_SLUGS) {
    for (const city of LOCATION_SLUGS) {
      params.push({ trade, city });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { trade: tradeSlug, city: citySlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(citySlug);
  const combo = getTradeLocation(tradeSlug, citySlug);
  if (!trade || trade.comingSoon || !location || !combo) return {};
  const canonical = `${SITE_URL}/for/${trade.slug}/${location.slug}`;
  return {
    title: { absolute: combo.metaTitle },
    description: combo.metaDescription,
    alternates: { canonical },
    openGraph: {
      ...OG_DEFAULTS,
      title: combo.metaTitle,
      description: combo.metaDescription,
      url: canonical,
    },
    twitter: {
      ...TWITTER_DEFAULTS,
      title: combo.metaTitle,
      description: combo.metaDescription,
    },
  };
}

export default async function TradeLocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { trade: tradeSlug, city: citySlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(citySlug);
  const combo = getTradeLocation(tradeSlug, citySlug);
  if (!trade || trade.comingSoon || !location || !combo) notFound();

  const canonical = `${SITE_URL}/for/${trade.slug}/${location.slug}`;
  const tradePath = `/for/${trade.slug}`;
  const locationPath = `/locations/${location.slug}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [buildFaqPageSchema(combo.faqs)],
  };
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: `For ${trade.displayName}`, url: `${SITE_URL}${tradePath}` },
    { name: location.displayName, url: canonical },
  ]);
  const serviceSchema = buildComboServiceSchema({
    tradeSlug: trade.slug,
    citySlug: location.slug,
    tradeName: trade.displayName,
    cityName: location.displayName,
    url: canonical,
  });
  const localBusinessSchema = buildLocationBusinessSchema({
    slug: location.slug,
    city: location.displayName,
    url: canonical,
  });

  const openingParagraphs = combo.opening.split(/\n\n+/);
  const whySpecificParagraphs = combo.whySpecific.split(/\n\n+/);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-8">
        <SiteLogo />
        <Link
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-[color:var(--brand-slate)] hover:text-[color:var(--brand-indigo)]"
        >
          {BOOKING_CTA_LABEL}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center sm:pt-28 lg:pb-28 lg:pt-36">
          <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
            {trade.displayName} · {location.fullName}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-5xl lg:text-6xl">
            {combo.h1}
          </h1>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="xl" asChild>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BOOKING_CTA_LABEL}
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/#pricing">See pricing</Link>
            </Button>
          </div>
          <CallCTA tone="light" />
        </div>
      </section>

      {/* Opening prose */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="space-y-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/85">
            {openingParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Why this trade in this city */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Why {trade.displayName.toLowerCase()} in {location.displayName}{" "}
            choose RingDesk
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/85">
            {whySpecificParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* What we handle */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            What we handle for {trade.displayName.toLowerCase()} in{" "}
            {location.displayName}
          </h2>
          <ul className="mt-10 space-y-3">
            {combo.whatWeHandle.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base text-[color:var(--brand-slate)]"
              >
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-[color:var(--brand-indigo)]"
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            {trade.displayName} in {location.displayName} FAQ
          </h2>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {combo.faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger className="text-[color:var(--brand-slate)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[color:var(--brand-slate)]/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Cross-links: trade page + location page */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            More on RingDesk for {trade.displayName.toLowerCase()} and{" "}
            {location.displayName} trades
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Link href={tradePath} className="group block">
              <Card className="h-full transition-colors group-hover:border-[color:var(--brand-indigo)]">
                <CardContent className="flex h-full flex-col p-8 pt-8">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                    For {trade.displayName}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                    RingDesk for {trade.displayName.toLowerCase()}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                    {trade.cardSummary}
                  </p>
                  <p className="mt-6 text-sm font-medium text-[color:var(--brand-indigo)]">
                    See the {trade.displayName.toLowerCase()} page →
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href={locationPath} className="group block">
              <Card className="h-full transition-colors group-hover:border-[color:var(--brand-indigo)]">
                <CardContent className="flex h-full flex-col p-8 pt-8">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                    {location.fullName}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                    Trades in {location.displayName}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                    Local context, service area, and how RingDesk works for{" "}
                    {location.displayName} trades businesses.
                  </p>
                  <p className="mt-6 text-sm font-medium text-[color:var(--brand-indigo)]">
                    See the {location.displayName} page →
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[color:var(--brand-slate)] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for {trade.displayName.toLowerCase()} in{" "}
            {location.displayName}.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-[color:var(--brand-muted)]">
            Installed and tuned by a real person. Cancel anytime. First
            customer gets a free 30-day pilot.
          </p>
          <div className="mt-10 flex justify-center">
            <Button size="xl" asChild>
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {BOOKING_CTA_LABEL}
              </Link>
            </Button>
          </div>
          <CallCTA tone="dark" />
          <p className="mt-6 text-sm text-[color:var(--brand-muted)]">
            Or email{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            directly.
          </p>
        </div>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
    </main>
  );
}

export const dynamicParams = false;
