import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
  tone = "slate",
}: {
  className?: string;
  tone?: "slate" | "white";
}) {
  return (
    <Link
      href="/"
      aria-label="RingDesk home"
      className={cn(
        "inline-flex items-center text-2xl font-bold tracking-tight",
        tone === "white" ? "text-white" : "text-[color:var(--brand-slate)]",
        className,
      )}
    >
      RingDesk
    </Link>
  );
}
