import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    headline: "62% of inbound calls",
    body: "to small service businesses go unanswered during business hours",
  },
  {
    headline: "$400 average",
    body: "value of a service call in plumbing, HVAC, and electrical",
  },
  {
    headline: "85% of unanswered callers",
    body: "never call back, and 62% will call a competitor instead",
  },
];

export function Problem() {
  return (
    <section className="bg-[color:var(--brand-slate)] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Every missed call goes to your competitor.
        </h2>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.headline}
              className="border-white/20 bg-white/10 text-white"
            >
              <CardContent className="p-8 pt-8">
                <p className="text-2xl font-bold tracking-tight text-white">
                  {stat.headline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-[color:var(--brand-muted)]">
                  {stat.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[color:var(--brand-muted)]">
          Sources: 411 Locals (2024 study, 85 businesses), PATLive research,
          industry averages.
        </p>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            5 missed calls × $400 ={" "}
            <span className="whitespace-nowrap">$2,000 / week</span>
          </p>
          <p className="mx-auto mt-5 max-w-xl text-base text-[color:var(--brand-muted)] sm:text-lg">
            RingDesk: $249/month. About 2 hours of jobs per year recovers
            the cost.
          </p>
        </div>
      </div>
    </section>
  );
}
