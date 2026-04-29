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
            actually gets.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {TRADE_SLUGS.map((slug) => {
            const trade = TRADES[slug];
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
                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                      {trade.heroHeadline}
                    </h3>
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
