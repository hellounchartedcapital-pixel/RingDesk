import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CallCTA } from "@/components/call-cta";
import { CALENDLY_URL, CONTACT_EMAIL } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="bg-[color:var(--brand-slate)] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Stop missing service calls. Book a 15-min call.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-[color:var(--brand-muted)]">
          We&rsquo;ll figure out together if RingDesk is right for your
          business. No pitch deck, no pressure.
        </p>

        <div className="mt-10 flex justify-center">
          <Button size="xl" asChild>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a call
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
  );
}
