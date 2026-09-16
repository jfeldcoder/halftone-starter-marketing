import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/** Nav/footer logo: the vector mark + a live-text wordmark in the brand font. */
export default function Logo({
  className,
  light = false,
  wordmark = true,
}: {
  className?: string;
  light?: boolean;
  wordmark?: boolean;
}) {
  return (
    <Link href="/" aria-label={`${site.name} home`} className={cn("group flex items-center gap-3", className)}>
      <Image
        src="/logo-mark.svg"
        alt=""
        width={96}
        height={30}
        priority
        className="h-[26px] w-auto transition-transform duration-500 ease-out group-hover:scale-[1.04]"
      />
      {wordmark && (
        <span className={cn("display text-[17px] font-extrabold tracking-tight", light ? "text-white" : "text-fg")}>
          EventPro <span className="font-medium text-accent">Seating</span>
        </span>
      )}
    </Link>
  );
}
