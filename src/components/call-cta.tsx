import { Phone } from "lucide-react";

import {
  RINGDESK_PHONE_DISPLAY,
  RINGDESK_PHONE_TEL,
} from "@/lib/constants";

type CallCTAProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function CallCTA({ tone = "light", className = "" }: CallCTAProps) {
  const linkColor =
    tone === "dark" ? "text-white" : "text-[color:var(--brand-indigo)]";
  return (
    <p
      className={`mt-6 text-sm text-[color:var(--brand-muted)] ${className}`.trim()}
    >
      Or try it —{" "}
      <a
        href={`tel:${RINGDESK_PHONE_TEL}`}
        aria-label={`Call RingDesk at ${RINGDESK_PHONE_DISPLAY}`}
        className={`inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline ${linkColor}`}
      >
        <Phone className="h-4 w-4" aria-hidden />
        <span>{RINGDESK_PHONE_DISPLAY}</span>
      </a>
    </p>
  );
}
