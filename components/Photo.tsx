import Image from "next/image";
import { resolveAsset } from "@/lib/assets";
import { cn } from "@/lib/cn";

/**
 * Server component. Renders the real photo when the file exists under /public,
 * otherwise a labeled placeholder. Parent must be `relative` with a size.
 */
export default function Photo({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: React.CSSProperties;
}) {
  const real = resolveAsset(src);
  if (real) {
    return <Image src={real} alt={alt} fill sizes={sizes} priority={priority} quality={88} className={cn("object-cover", className)} style={style} />;
  }
  return (
    <div className="placeholder-stripes absolute inset-0 flex items-end p-4" aria-label={alt} role="img">
      <span className="kicker font-normal text-fg-muted">{alt}</span>
      <code className="mono ml-auto hidden text-[10px] text-fg-faint sm:block">{src}</code>
    </div>
  );
}
