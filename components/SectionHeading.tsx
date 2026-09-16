import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

/** Kicker + uppercase display headline. Pass `period` to end with the accent dot. */
export default function SectionHeading({
  kicker,
  title,
  lead,
  align = "left",
  light = false,
  size = "md",
  className,
}: {
  kicker?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    md: "text-[clamp(1.9rem,3.8vw,3.2rem)]",
    lg: "text-[clamp(2.2rem,5vw,4.2rem)]",
    xl: "text-[clamp(2.6rem,7vw,6rem)]",
  };
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {kicker && <p className={cn("kicker", light ? "text-accent" : "text-accent-dark")}>{kicker}</p>}
      <h2 className={cn("type-display mt-3", sizes[size], light ? "text-white" : "text-fg")}>{title}</h2>
      {lead && <p className={cn("mt-5 max-w-xl text-[0.98rem] leading-relaxed", align === "center" && "mx-auto", light ? "text-white/65" : "text-fg-muted")}>{lead}</p>}
    </Reveal>
  );
}

export function Dot() {
  return <span className="text-accent">.</span>;
}
