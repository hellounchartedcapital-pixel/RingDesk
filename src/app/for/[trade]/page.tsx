import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  SITE_URL,
} from "@/lib/constants";
import { LOCATIONS, LOCATION_SLUGS } from "@/lib/locations";
import {
  ACTIVE_TRADE_SLUGS,
  getOtherTrades,
  getTrade,
} from "@/lib/trades";
import {
  buildBreadcrumbSchema,
  buildTradePageSchema,
} from "@/lib/schema";

type Params = { trade: string };

export function generateStaticParams(): Params[] {
  // Coming-soon trades are intentionally excluded so /for/[stub-slug]
  // 404s rather than rendering an incomplete page. Stubs still surface
  // on the homepage as non-link "Coming soon" cards.
  return ACTIVE_TRADE_SLUGS.map((trade) => ({ trade }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade || trade.comingSoon) return {};
  const canonical = `${SITE_URL}/for/${trade.slug}`;
  return {
    title: { absolute: trade.metaTitle },
    description: trade.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: trade.metaTitle,
      description: trade.metaDescription,
      url: canonical,
    },
    twitter: {
      title: trade.metaTitle,
      description: trade.metaDescription,
    },
  };
}

export default async function TradePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { trade: slug } = await params;
  const trade = getTrade(slug);
  if (!trade || trade.comingSoon) notFound();
  // After this guard, trade is narrowed to the full TradeContent variant.

  const otherTrades = getOtherTrades(slug);
  const canonical = `${SITE_URL}/for/${trade.slug}`;
  const schema = buildTradePageSchema(trade.faqs);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: `For ${trade.displayName}`, url: canonical },
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
            For {trade.displayName}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-5xl lg:text-6xl">
            {trade.heroHeadline}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-lg leading-relaxed text-[color:var(--brand-muted)] sm:text-xl">
            {trade.heroSubheadline}
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

      {/* Value props */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Built for the way {trade.displayName.toLowerCase()} actually
            work.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {trade.valueProps.map((prop) => (
              <Card key={prop.title} className="h-full">
                <CardContent className="flex h-full flex-col p-8 pt-8">
                  <h3 className="text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-[color:var(--brand-slate)]/80">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What we handle */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            What we handle for {trade.displayName.toLowerCase()}
          </h2>
          <p className="mt-4 text-lg text-[color:var(--brand-muted)]">
            Every {trade.category.toLowerCase()} business has its own call
            mix, but these are the call types we tune for out of the box.
            We add new ones every week as the receptionist learns your
            business.
          </p>
          <ul className="mt-10 space-y-3">
            {trade.commonCallTypes.map((callType) => (
              <li
                key={callType}
                className="flex items-start gap-3 text-base text-[color:var(--brand-slate)]"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--brand-indigo)]"
                />
                <span>{callType}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The math */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            The math on missed calls
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[color:var(--brand-slate)]/80">
            {trade.avgJobValueText}
          </p>
        </div>
      </section>

      {/* Testimonial placeholder */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <figure className="rounded-lg border-2 border-dashed border-[color:var(--border)] bg-white p-8 text-center">
            <blockquote className="text-base italic text-[color:var(--brand-muted)] sm:text-lg">
              {trade.testimonialPlaceholder}
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

      {/* FAQ */}
      <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            {trade.displayName} FAQ
          </h2>
          <Accordion type="single" collapsible className="mt-12 w-full">
            {trade.faqs.map((faq, i) => (
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

      {/* Locations cross-link */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-balance text-center text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            Trades in Northern Colorado
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-[color:var(--brand-muted)]">
            Local context, service areas, and call volume notes for the
            cities we tune for out of the box.
          </p>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            {LOCATION_SLUGS.map((locationSlug) => {
              const location = LOCATIONS[locationSlug];
              return (
                <Link
                  key={locationSlug}
                  href={`/locations/${location.slug}`}
                  className="group block"
                >
                  <Card className="h-full transition-colors group-hover:border-[color:var(--brand-indigo)]">
                    <CardContent className="flex h-full flex-col p-8 pt-8">
                      <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                        {location.fullName}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                        {trade.displayName} in {location.displayName}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                        Service areas include {location.displayName} and
                        nearby {location.nearbyAreas.slice(0, 3).join(", ")}.
                      </p>
                      <p className="mt-6 text-sm font-medium text-[color:var(--brand-indigo)]">
                        See {location.displayName} page →
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[color:var(--brand-slate)] py-16 text-white sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Built for {trade.displayName} in Northern Colorado.
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
          {otherTrades.length > 0 ? (
            <p className="mt-10 text-sm text-[color:var(--brand-muted)]">
              {otherTrades.map((other, i) => (
                <span key={other.slug}>
                  {i === 0
                    ? "Or see how it works for "
                    : i === otherTrades.length - 1
                      ? " or "
                      : ", "}
                  <Link
                    href={`/for/${other.slug}`}
                    className="text-white underline-offset-4 hover:underline"
                  >
                    {other.displayName.toLowerCase()}
                  </Link>
                </span>
              ))}
              .
            </p>
          ) : null}
        </div>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        // Trade-specific FAQPage; static per route.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        // BreadcrumbList: Home › For [Trade].
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </main>
  );
}

// Force 404 for any param outside generateStaticParams.
export const dynamicParams = false;
