import type { ReactNode } from "react";
import Link from "next/link";

import { SiteLogo } from "@/components/site-logo";
import { SiteFooter } from "@/components/site-footer";

type CrossLink = {
  href: "/privacy" | "/terms";
  label: string;
};

export function LegalPage({
  children,
  crossLink,
}: {
  children: ReactNode;
  crossLink: CrossLink;
}) {
  return (
    <main className="min-h-screen bg-white">
      <header className="mx-auto max-w-3xl px-6 pt-8">
        <SiteLogo />
      </header>

      <article className="prose prose-slate mx-auto max-w-3xl px-6 py-16 prose-headings:tracking-tight prose-headings:text-[color:var(--brand-slate)] prose-h1:text-4xl sm:prose-h1:text-5xl prose-a:text-[color:var(--brand-indigo)] prose-a:underline-offset-4 prose-strong:text-[color:var(--brand-slate)]">
        {children}

        <hr className="my-12 border-[color:var(--border)]" />

        <p className="text-sm">
          <Link href="/">← Back to home</Link>
          {" · "}
          <Link href={crossLink.href}>{crossLink.label}</Link>
        </p>
      </article>

      <SiteFooter />
    </main>
  );
}
