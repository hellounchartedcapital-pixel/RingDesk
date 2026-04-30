import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CallCTA } from "@/components/call-cta";
import { Card, CardContent } from "@/components/ui/card";
import { SiteLogo } from "@/components/site-logo";
import { SiteFooter } from "@/components/site-footer";
import {
  BOOKING_CTA_LABEL,
  CALENDLY_URL,
  CONTACT_EMAIL,
  SITE_URL,
} from "@/lib/constants";
import {
  LOCATION_SLUGS,
  getLocation,
} from "@/lib/locations";
import { ACTIVE_TRADE_SLUGS, TRADES } from "@/lib/trades";
import {
  buildBreadcrumbSchema,
  buildLocationBusinessSchema,
} from "@/lib/schema";

type Params = { city: string };

export function generateStaticParams(): Params[] {
  return LOCATION_SLUGS.map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  const canonical = `${SITE_URL}/locations/${location.slug}`;
  return {
    title: { absolute: location.metaTitle },
    description: location.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: canonical,
    },
    twitter: {
      title: location.metaTitle,
      description: location.metaDescription,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { city: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const canonical = `${SITE_URL}/locations/${location.slug}`;
  const schema = buildLocationBusinessSchema({
    slug: location.slug,
    city: location.displayName,
    url: canonical,
  });
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Locations" }, // no /locations index page; name-only is valid
    { name: location.displayName, url: canonical },
  ]);

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
            {location.fullName}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-5xl lg:text-6xl">
            AI receptionist for trades businesses in {location.displayName}, CO.
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-[color:var(--brand-muted)] sm:text-xl">
            Installed and tuned by a real person. Built for plumbers, HVAC
            contractors, and electricians in {location.displayName} who
            can&rsquo;t afford to lose jobs to whoever picks up first.
          </p>
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

      {/* Local context */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Trades in {location.displayName}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/80">
            {location.localContext}
          </p>
          <p className="mt-6 text-sm text-[color:var(--brand-muted)]">
            Service areas include {location.displayName} and nearby{" "}
            {location.nearbyAreas.join(", ")}.
          </p>
        </div>
      </section>

      {/* Why trades here */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Why {location.displayName} trades businesses choose RingDesk
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/80">
            {location.whyTradesHere}
          </p>
        </div>
      </section>

      {/* What RingDesk does */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            What RingDesk does
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/80">
            We set up your AI receptionist in 48 hours, answer every call
            24/7, qualify leads, and tune the system weekly based on real
            calls.{" "}
            <Link
              href="/#how-it-works"
              className="font-medium text-[color:var(--brand-indigo)] hover:underline"
            >
              See the full how-it-works on the home page
            </Link>{" "}
            for the three-step breakdown.
          </p>
        </div>
      </section>

      {/* Cross-links to trade pages */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Built for trades in {location.displayName}
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {ACTIVE_TRADE_SLUGS.map((tradeSlug) => {
              const trade = TRADES[tradeSlug];
              if (trade.comingSoon) return null;
              return (
                <Link
                  key={tradeSlug}
                  href={`/for/${trade.slug}`}
                  className="group block"
                >
                  <Card className="h-full transition-colors group-hover:border-[color:var(--brand-indigo)]">
                    <CardContent className="flex h-full flex-col p-8 pt-8">
                      <h3 className="text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                        {trade.displayName}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[color:var(--brand-slate)]/80">
                        {trade.cardSummary}
                      </p>
                      <p className="mt-6 text-sm font-medium text-[color:var(--brand-indigo)]">
                        See {trade.displayName.toLowerCase()} page →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <figure className="rounded-lg border-2 border-dashed border-[color:var(--border)] bg-white p-8 text-center">
            <blockquote className="text-base italic text-[color:var(--brand-muted)] sm:text-lg">
              {location.testimonialPlaceholder}
            </blockquote>
            <figcaption className="mt-4 text-sm text-[color:var(--brand-muted)]">
              <Link
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[color:var(--brand-indigo)] hover:underline"
              >
                Talk to Tony →
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[color:var(--brand-slate)] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stop losing {location.displayName} jobs to whoever picks up
            first.
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
        // Location-scoped LocalBusiness; static per route.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // BreadcrumbList: Home › Locations › [City].
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </main>
  );
}

export const dynamicParams = false;
