import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CallCTA } from "@/components/call-cta";
import { Card } from "@/components/ui/card";
import { SiteLogo } from "@/components/site-logo";
import { BOOKING_CTA_LABEL, CALENDLY_URL } from "@/lib/constants";

const audioSampleAvailable =
  process.env.NEXT_PUBLIC_AUDIO_SAMPLE_AVAILABLE === "true";

export function Hero() {
  return (
    <section className="relative bg-white">
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

      <div className="mx-auto max-w-4xl px-6 pb-28 pt-28 text-center sm:pt-40 lg:pb-36 lg:pt-48">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-6xl lg:text-7xl">
          Stop missing $400 service calls.
        </h1>
        <p className="mx-auto mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[color:var(--brand-muted)] sm:text-xl">
          An AI receptionist that&rsquo;s actually installed for you. We
          answer every call, qualify every lead, and text you the urgent
          ones — so you stop losing jobs.
        </p>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button size="xl" asChild>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {BOOKING_CTA_LABEL}
            </Link>
          </Button>
          {audioSampleAvailable ? (
            <Button size="xl" variant="outline" asChild>
              <Link href="#sample-call">Hear it answer a call</Link>
            </Button>
          ) : null}
        </div>

        <CallCTA tone="light" />

        {audioSampleAvailable ? (
          <Card
            id="sample-call"
            className="mx-auto mt-16 max-w-xl scroll-mt-24 p-6 text-left"
          >
            <span className="inline-flex items-center rounded-full bg-[color:var(--brand-bg-secondary)] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
              Demo
            </span>
            <p className="mt-3 text-base font-semibold leading-snug text-[color:var(--brand-slate)]">
              AI receptionist for a Northern Colorado trades business
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--brand-muted)]">
              What an installed RingDesk receptionist sounds like handling a
              customer call end-to-end — water heater leak, urgency triage,
              same-day service booking, full details captured with
              confirmation readback. About 2 min, unedited.
            </p>
            <audio
              controls
              preload="none"
              src="/audio/sample-call.mp3"
              className="mt-5 w-full"
            >
              Your browser does not support the audio element.
            </audio>
            <p className="mt-3 text-xs leading-relaxed text-[color:var(--brand-muted)]">
              Crestline Plumbing is a fictional demo business. Your installed
              receptionist is configured for your specific business, service
              area, and call types.
            </p>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
