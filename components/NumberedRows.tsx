import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

/** Hairline-divided rows: "01  Claim / sub". */
export default function NumberedRows({
  rows,
  light = false,
  className,
}: {
  rows: { title: string; sub?: string }[];
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col divide-y border-y", light ? "divide-white/10 border-white/10" : "divide-line border-line", className)}>
      {rows.map((r, i) => (
        <Reveal key={r.title} delay={i * 0.06}>
          <div className="flex items-baseline gap-5 py-4 lg:py-5">
            <p className={cn("mono text-sm", light ? "text-accent" : "text-accent-dark")}>{String(i + 1).padStart(2, "0")}</p>
            <div>
              <p className={cn("type-display text-xl sm:text-2xl", light ? "text-white" : "text-fg")}>{r.title}</p>
              {r.sub && <p className={cn("kicker mt-1 font-normal", light ? "text-white/50" : "text-fg-muted")}>{r.sub}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
