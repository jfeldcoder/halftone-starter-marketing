/** Native accordion, hairline rows, "+" that turns into "×". */
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col divide-y divide-line border-y border-line">
      {items.map((it) => (
        <details key={it.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-base font-bold uppercase tracking-[0.04em] text-fg transition-colors hover:text-accent-dark [&::-webkit-details-marker]:hidden">
            {it.q}
            <span aria-hidden className="mono text-accent-dark transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-fg-muted">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
