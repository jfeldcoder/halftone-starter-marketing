import { site } from "@/lib/site";

const SOCIALS = [
  { key: "instagram", label: "Instagram" },
  { key: "x", label: "X" },
  { key: "linkedin", label: "LinkedIn" },
] as const;

export default function Footer() {
  const socials = SOCIALS.filter((s) => site.socials[s.key]);
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="border-t border-line">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2">
        <div>
          <p className="display text-xl font-extrabold text-fg">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-fg-muted">{site.description}</p>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm font-medium text-accent hover:text-accent-dark"
            >
              {site.email}
            </a>
          )}
          {site.phone && <p className="mt-1 text-sm text-fg-muted">{site.phone}</p>}
        </div>

        {socials.length > 0 && (
          <nav className="sm:text-right">
            <p className="eyebrow">Follow</p>
            <ul className="mt-4 flex flex-col gap-2 sm:items-end">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={site.socials[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="container-page flex items-center justify-between border-t border-line py-6 text-xs text-fg-faint">
        <span>
          © {year} {site.name}
        </span>
        <span>
          Built by{" "}
          <a
            href={site.builtBy.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg"
          >
            {site.builtBy.label}
          </a>
        </span>
      </div>
    </footer>
  );
}
