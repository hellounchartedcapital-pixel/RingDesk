import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="bg-white py-10">
      <div className="mx-auto max-w-6xl px-6 text-center text-sm text-[color:var(--brand-muted)]">
        <p>
          &copy; 2026 RingDesk. Built in Berthoud, Colorado.{" "}
          <Link
            href="/privacy"
            className="hover:text-[color:var(--brand-slate)]"
          >
            Privacy
          </Link>{" "}
          ·{" "}
          <Link
            href="/terms"
            className="hover:text-[color:var(--brand-slate)]"
          >
            Terms
          </Link>{" "}
          ·{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-[color:var(--brand-slate)]"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
