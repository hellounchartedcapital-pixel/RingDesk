import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { TRADES, TRADE_SLUGS } from "@/lib/trades";

export function TradesCrossLinks() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl">
            RingDesk for your trade
          </h2>
          <p className="mt-4 text-lg text-[color:var(--brand-muted)]">
            Tuned out of the box for the call types your business
            actually gets. More trades coming as our pilot program grows.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRADE_SLUGS.map((slug) => {
            const trade = TRADES[slug];
            if (trade.comingSoon) {
              return (
                <div
                  key={slug}
                  aria-label={`${trade.displayName} — coming soon`}
                  className="block opacity-60"
                >
                  <Card className="h-full">
                    <CardContent className="flex h-full flex-col p-8 pt-8">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                          For {trade.displayName}
                        </p>
                        <span className="inline-flex items-center rounded-full bg-[color:var(--brand-bg-secondary)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-muted)]">
                          Coming soon
                        </span>
                      </div>
                      <p className="mt-4 text-base leading-relaxed text-[color:var(--brand-slate)]/80">
                        {trade.cardSummary}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            }
            return (
              <Link
                key={slug}
                href={`/for/${trade.slug}`}
                className="group block"
              >
                <Card className="h-full transition-colors group-hover:border-[color:var(--brand-indigo)]">
                  <CardContent className="flex h-full flex-col p-8 pt-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                      For {trade.displayName}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-[color:var(--brand-slate)]">
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
  );
}
