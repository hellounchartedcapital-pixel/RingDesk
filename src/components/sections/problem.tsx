import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    headline: "30%+ of inbound calls",
    body: "to trades businesses go unanswered during busy hours",
  },
  {
    headline: "$400 average",
    body: "value of a service call in plumbing, HVAC, electrical",
  },
  {
    headline: "78% of callers",
    body: "won't leave a voicemail — they call the next number",
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

        <p className="mx-auto mt-12 max-w-3xl text-center text-base text-[color:var(--brand-muted)] sm:text-lg">
          We built RingDesk because every missed call is a customer calling
          someone else next.
        </p>
      </div>
    </section>
  );
}
