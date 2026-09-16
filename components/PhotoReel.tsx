import Image from "next/image";
import Reveal from "@/components/Reveal";

export type ReelItem = { src: string | null; alt: string };

/** Horizontal, edge-to-edge strip of photos. Swipe or scroll sideways. */
export default function PhotoReel({ items }: { items: ReelItem[] }) {
  return (
    <Reveal delay={0.08}>
      <div className="no-bar flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter lg:px-8">
        {items.map((it, i) => (
          <div key={i} className="relative aspect-[4/5] w-[72vw] shrink-0 snap-center overflow-hidden bg-surface sm:w-[380px] lg:w-[420px]">
            {it.src ? (
              <Image src={it.src} alt={it.alt} fill sizes="(max-width: 640px) 72vw, 420px" className="object-cover" />
            ) : (
              <div className="placeholder-stripes absolute inset-0" />
            )}
            <p className="kicker absolute bottom-4 left-4 font-normal text-white drop-shadow">{it.alt}</p>
          </div>
        ))}
        <div aria-hidden className="w-px shrink-0" />
      </div>
    </Reveal>
  );
}
