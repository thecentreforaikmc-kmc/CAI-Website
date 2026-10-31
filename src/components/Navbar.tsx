import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks, site } from "@/data/site";
const logo = "/cai-logo.webp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-border py-2 shadow-[0_10px_40px_-30px_black]" : "py-5",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <Link to="/" className="group flex items-center gap-3" aria-label={`${site.name} home`}>
          <img
            src={logo}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full transition-transform duration-500 group-hover:rotate-12"
          />

          <span className="leading-tight">
            <span className="block font-display text-sm font-semibold tracking-[0.18em]">
              Centre for ArtificiaI Intelligence
            </span>
            <span className="block text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              {site.college}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = pathname === l.to;
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-[var(--gradient-brand)] transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            to="/contact"
            className="rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/10"
          >
            Join CAI
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-md border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div id="mobile-nav" hidden={!open} className="glass mx-4 mt-3 rounded-xl p-3 lg:hidden">
        <ul className="flex flex-col">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm transition-colors",
                  pathname === l.to
                    ? "bg-primary/12 text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
