import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

/** Lineup tile: photo plate, title, one line, arrow. */
export default function ProductTile({ product, image, wide = false }: { product: Product; image: string | null; wide?: boolean }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-surface ${wide ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {image ? (
          <Image src={image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
        ) : (
          <div className="placeholder-stripes absolute inset-0" />
        )}
      </div>
      <div className="flex items-start justify-between gap-4 border-b border-line py-5">
        <div>
          <h3 className="type-display text-2xl text-fg transition-colors group-hover:text-accent-dark sm:text-3xl">{product.name}</h3>
          <p className="kicker mt-1.5 font-normal text-fg-muted">{product.kicker}</p>
        </div>
        <span aria-hidden className="mono mt-1 text-accent-dark transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
