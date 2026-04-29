import type { Metadata } from "next";
import Link from "next/link";

import { SiteLogo } from "@/components/site-logo";
import { SiteFooter } from "@/components/site-footer";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service — RingDesk",
  description: "Terms governing your use of the RingDesk service.",
  alternates: { canonical: "https://ringdesk.co/terms" },
};

export default function TermsPage() {
  return (
    <>
      {/* ⚠️ ACTION REQUIRED: Replace with Termly-generated copy before launch */}
      <main className="min-h-screen bg-white">
        <header className="mx-auto max-w-3xl px-6 pt-8">
          <SiteLogo />
        </header>

        <article className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm text-[color:var(--brand-muted)]">
            Last updated: April 2026 — placeholder copy.
          </p>

          <section className="mt-10 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Acceptance
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              By signing up for or using RingDesk, you agree to these Terms.
              If you do not agree, do not use the service.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Service Description
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              RingDesk is a managed AI receptionist service. We configure,
              operate, and tune an AI receptionist on your behalf, and deliver
              lead alerts and call summaries.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Subscription and Billing
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              Subscriptions renew monthly and are billed in advance through
              Stripe. Pricing is shown on the RingDesk site and may change
              with notice for upcoming billing cycles.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Cancellation
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              You can cancel anytime. Your subscription remains active through
              the end of the current billing period; we do not pro-rate
              partial months.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Limitation of Liability
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              RingDesk is provided &ldquo;as is.&rdquo; To the fullest extent
              permitted by law, our aggregate liability is limited to the
              amount you paid us in the prior twelve months.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Governing Law
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              These Terms are governed by the laws of the State of Colorado,
              without regard to conflict-of-laws rules.
            </p>
          </section>

          <section className="mt-8 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--brand-slate)]">
              Contact
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--brand-slate)]/80">
              Questions? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[color:var(--brand-indigo)] underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <p className="mt-12 text-sm">
            <Link
              href="/"
              className="text-[color:var(--brand-indigo)] hover:underline"
            >
              ← Back to home
            </Link>
          </p>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
