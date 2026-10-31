import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, FileText, Github, Search, X } from "lucide-react";
import { PageHeader, Section, Eyebrow } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { projects, projectCategories, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Projects Gallery — CAI, Kirori Mal College" },
      {
        name: "description",
        content:
          "Research reproductions, applied machine learning and systems work built by members of the Centre for Artificial Intelligence at Kirori Mal College.",
      },
      { property: "og:title", content: "Projects — Centre for Artificial Intelligence" },
      {
        property: "og:description",
        content: "Research, applied ML, systems and community projects from CAI members.",
      },
    ],
  }),
  component: Projects,
});

function Projects() {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<Project | null>(null);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return projects.filter((p) => {
      const matchCat = cat === "All" || p.category === cat;
      const matchTerm =
        !term ||
        [p.title, p.summary, p.category, ...p.stack].join(" ").toLowerCase().includes(term);
      return matchCat && matchTerm;
    });
  }, [cat, q]);

  return (
    <>
      <PageHeader
        eyebrow="Projects gallery"
        title="Evidence, not slogans."
        lead="Research reproductions, applied machine learning, systems work and community programmes from CAI members. Filter by area or search by stack."
      />

      <Section>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {(["All", ...projectCategories] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all",
                  cat === c
                    ? "border-primary/60 bg-primary/12 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects or tech…"
              aria-label="Search projects"
              className="w-full rounded-full border border-border bg-surface/60 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
            />
          </div>
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No projects match that search yet.
          </p>
        ) : (
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal as="li" key={p.id} delay={(i % 3) * 80}>
                <article className="card-3d flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <Eyebrow>{p.category}</Eyebrow>
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider",
                        p.status === "Active"
                          ? "border-primary/50 text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-lg font-semibold leading-snug">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {p.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.62rem] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                    <button
                      onClick={() => setOpen(p)}
                      className="text-sm text-primary transition-colors hover:underline"
                    >
                      View details →
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        >
          <div
            className="glass glow-ring relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close project details"
              autoFocus
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <Eyebrow>
              {open.category} · {open.year} · {open.status}
            </Eyebrow>
            <h2 className="mt-4 pr-10 font-display text-2xl font-semibold">{open.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{open.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{open.detail}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {open.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {open.links.repo && (
                <a
                  href={open.links.repo}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60"
                >
                  <Github className="h-4 w-4" /> Repository
                </a>
              )}
              {open.links.demo && (
                <a
                  href={open.links.demo}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60"
                >
                  <ExternalLink className="h-4 w-4" /> Demo
                </a>
              )}
              {open.links.paper && (
                <a
                  href={open.links.paper}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:border-primary/60"
                >
                  <FileText className="h-4 w-4" /> Write-up
                </a>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Placeholder links. Update in <span className="font-mono">src/data/projects.ts</span>.
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
