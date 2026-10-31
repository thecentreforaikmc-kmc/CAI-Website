import { Link } from "@tanstack/react-router";
import { navLinks, site } from "@/data/site";
const logo = "/cai-logo.webp";

export function Footer() {
  return (
    <footer className="grid-bg relative overflow-hidden border-t border-border px-5 py-16 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[var(--gradient-brand)] opacity-[0.1] blur-[100px]"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CAI seal"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              {site.shortName}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.name} — a student-led centre at {site.college}, {site.university}, building a
            serious community for learning, researching and shipping AI.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            Connect
          </h3>
          <ul className="mt-4 space-y-2">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label} <span className="text-xs opacity-60">{s.handle}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {site.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.shortName}, {site.college}. All rights reserved.
        </p>
        <p className="font-mono uppercase tracking-[0.2em]">Learn · Research · Build</p>
      </div>
    </footer>
  );
}
