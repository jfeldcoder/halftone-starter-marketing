import Photo from "@/components/Photo";
import { cn } from "@/lib/cn";

/**
 * Two columns: the photo runs to the outer edge and the full section height,
 * copy sits in the other column. `flip` puts the photo on the right.
 */
export default function SplitSection({
  image,
  alt,
  children,
  flip = false,
  tone = "light",
  position = "50% 50%",
  id,
  noTopRule = false,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
  flip?: boolean;
  tone?: "light" | "elev" | "ink";
  position?: string;
  id?: string;
  noTopRule?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        noTopRule ? "border-b border-line" : "border-y border-line",
        tone === "elev" && "bg-bg-elev",
        tone === "ink" && "on-ink border-white/10 bg-ink text-white",
      )}
    >
      <div className={cn("mx-auto grid max-w-content lg:grid-cols-2", flip ? "lg:grid-cols-[1fr_1fr]" : "")}>
        <div className={cn("relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-auto lg:min-h-[640px]", flip ? "lg:order-2" : "lg:order-1")}>
          <Photo src={image} alt={alt} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: position }} />
        </div>
        <div className={cn("flex flex-col justify-center px-gutter py-14 lg:px-14 lg:py-24", flip ? "lg:order-1" : "lg:order-2")}>{children}</div>
      </div>
    </section>
  );
}
