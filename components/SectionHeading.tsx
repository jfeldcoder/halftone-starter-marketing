import Reveal from "@/components/Reveal";
import { cn } from "@/lib/cn";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow && <p className="eyebrow-accent">{eyebrow}</p>}
      <h2 className={cn("display mt-4 text-3xl font-extrabold leading-[1.05] sm:text-5xl", light ? "text-white" : "text-fg")}>{title}</h2>
      {lead && <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/65" : "text-fg-muted")}>{lead}</p>}
    </Reveal>
  );
}
