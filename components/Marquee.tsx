import { cn } from "@/lib/cn";

/** Infinite CSS ticker. Pauses on hover. */
export default function Marquee({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("marquee relative overflow-hidden border-y border-line bg-bg-elev py-4", className)} aria-label={items.join(", ")}>
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-medium uppercase tracking-[0.18em] text-fg-muted" aria-hidden={i >= items.length}>
            {it}
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-elev to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-elev to-transparent" />
    </div>
  );
}
