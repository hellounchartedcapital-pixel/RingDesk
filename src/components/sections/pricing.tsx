import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  BOOKING_CTA_LABEL,
  CALENDLY_URL,
  PILOT_GEO,
  PILOT_SLOT_BREAKDOWN,
  PILOT_SLOTS_REMAINING,
  STRIPE_PREMIUM_URL,
  STRIPE_STANDARD_URL,
} from "@/lib/constants";

type Plan = {
  name: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Standard",
    price: "$249/mo",
    features: [
      "Fully managed AI receptionist",
      "Daily call summary emails",
      "Monthly tuning review",
      "Lead alerts via SMS and email",
      "Cancel anytime",
    ],
    cta: "Get Standard",
    href: STRIPE_STANDARD_URL,
  },
  {
    name: "Premium",
    price: "$499/mo",
    features: [
      "Everything in Standard",
      "Weekly tuning sessions",
      "Priority response (4-hr SLA)",
      "Custom workflows + CRM integration",
      "Quarterly strategy call with the founder",
      "Cancel anytime",
    ],
    cta: "Get Premium",
    href: STRIPE_PREMIUM_URL,
    highlight: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl lg:text-5xl">
            Done-for-you. Two tiers. Cancel anytime.
          </h2>
          <p className="mt-4 text-lg text-[color:var(--brand-muted)]">
            First customer gets a free 30-day pilot —{" "}
            {PILOT_SLOTS_REMAINING} spots remaining: {PILOT_SLOT_BREAKDOWN}.{" "}
            {PILOT_GEO} trades businesses.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                "flex flex-col",
                plan.highlight &&
                  "border-2 border-[color:var(--brand-indigo)] shadow-md",
              )}
            >
              <CardContent className="flex flex-1 flex-col p-8 pt-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
                    {plan.name}
                  </h3>
                  <span className="text-2xl font-bold text-[color:var(--brand-slate)]">
                    {plan.price}
                  </span>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-base text-[color:var(--brand-slate)]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[color:var(--brand-indigo)]"
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Button
                    asChild
                    size="lg"
                    variant={plan.highlight ? "default" : "outline"}
                    className="w-full"
                  >
                    <Link
                      href={plan.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-[color:var(--brand-muted)]">
          Not sure which?{" "}
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[color:var(--brand-indigo)] hover:underline"
          >
            {BOOKING_CTA_LABEL}
          </Link>{" "}
          and we&rsquo;ll figure out together.
        </p>
      </div>
    </section>
  );
}
