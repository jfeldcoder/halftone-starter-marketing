import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/** Nav logo: the real EPS mark at a legible size plus a live-text wordmark. Designed for a dark bar. */
export default function Logo({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("group flex items-center gap-3.5", className)}>
      <Image
        src="/logo-mark@2x.png"
        alt=""
        width={148}
        height={38}
        priority
        className="h-[34px] w-auto transition-transform duration-500 ease-out group-hover:scale-[1.03] sm:h-[38px]"
      />
      <span className={cn("display hidden text-[18px] font-extrabold tracking-tight sm:inline", light ? "text-white" : "text-fg")}>
        EventPro <span className="font-medium text-accent">Seating</span>
      </span>
    </Link>
  );
}
