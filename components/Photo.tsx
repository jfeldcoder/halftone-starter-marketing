import Image from "next/image";
import { resolveAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Server component. Renders the real photo when the file exists under /public,
 * otherwise a labeled placeholder that shows the path to drop the file into.
 * Parent must be `relative` with a fixed aspect/height.
 */
export default function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const real = resolveAsset(src);
  if (real) {
    return <Image src={real} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />;
  }
  return <Placeholder label={alt} path={src} className={className} />;
}

export function Placeholder({ label, path, className }: { label: string; path?: string; className?: string }) {
  return (
    <div className={cn("placeholder-stripes absolute inset-0 flex items-end justify-between gap-3 p-4", className)} aria-label={label} role="img">
      <div className="flex items-center gap-2 rounded-full bg-bg/90 px-3 py-1.5 text-[11px] font-medium text-fg-muted shadow-sm backdrop-blur">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
        {label}
      </div>
      {path && <code className="hidden rounded bg-bg/80 px-2 py-1 text-[10px] text-fg-faint sm:block">{path}</code>}
    </div>
  );
}
