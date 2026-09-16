/*
 * Route transition: an ink curtain carrying the mark that lifts away on every
 * client navigation. Inlined so the CSS pipeline cannot strip it.
 */
const CSS = `
.ep-curtain{position:fixed;inset:0;z-index:96;display:flex;align-items:center;justify-content:center;background:#344734;pointer-events:none;animation:epCurtain .65s cubic-bezier(.83,0,.17,1) forwards}
.ep-curtain img{width:160px;height:auto;display:block}
@keyframes epCurtain{0%,28%{transform:translateY(0)}to{transform:translateY(-101%)}}
@media (prefers-reduced-motion:reduce){.ep-curtain{display:none}}
`;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="ep-curtain" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" />
      </div>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      {children}
    </>
  );
}
