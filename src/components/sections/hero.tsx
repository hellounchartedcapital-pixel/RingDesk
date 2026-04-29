import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SiteLogo } from "@/components/site-logo";
import { CALENDLY_URL } from "@/lib/constants";

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
          Book a call
        </Link>
      </div>

      <div className="mx-auto max-w-4xl px-6 pb-28 pt-28 text-center sm:pt-40 lg:pb-36 lg:pt-48">
        <h1 className="text-balance text-5xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-6xl lg:text-7xl">
          Stop missing $400 service calls.
        </h1>
        <p className="mx-auto mt-10 max-w-2xl text-balance text-lg leading-relaxed text-[color:var(--brand-muted)] sm:text-xl">
          RingDesk is an AI receptionist installed and tuned by a real person.
          We answer every call, qualify every lead, and text you the urgent
          ones — so you stop losing jobs to whoever picks up first.
        </p>

        <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button size="xl" asChild>
            <Link
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a 15-min call
            </Link>
          </Button>
          {audioSampleAvailable ? (
            <Button size="xl" variant="outline" asChild>
              <Link href="#sample-call">Hear it answer a call</Link>
            </Button>
          ) : null}
        </div>

        {audioSampleAvailable ? (
          <Card
            id="sample-call"
            className="mx-auto mt-16 max-w-xl scroll-mt-24 p-6 text-left"
          >
            <p className="text-sm font-medium text-[color:var(--brand-slate)]">
              Sample call: a plumber&rsquo;s customer asking about an emergency
            </p>
            <audio
              controls
              preload="none"
              src="/audio/sample-call.mp3"
              className="mt-4 w-full"
            >
              Your browser does not support the audio element.
            </audio>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
