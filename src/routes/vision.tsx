import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { principles } from "@/data/content";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/vision")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Vision — CAI, Kirori Mal College" },
      {
        name: "description",
        content:
          "Learn, Research, Build, Collaborate, Impact — the five principles guiding the Centre for Artificial Intelligence at Kirori Mal College.",
      },
      { property: "og:title", content: "Vision — Centre for Artificial Intelligence" },
      {
        property: "og:description",
        content: "The five principles guiding CAI: Learn, Research, Build, Collaborate, Impact.",
      },
    ],
  }),
  component: Vision,
});

function Vision() {
  const [active, setActive] = useState(0);

  return (
    <>
      <PageHeader
        eyebrow="Vision"
        title="Curiosity, held to a standard."
        lead="We want members to leave CAI able to read a paper, argue with it, reproduce it, and build something honest on top of it. These five principles are how we get there."
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <ul className="flex flex-col gap-2" role="tablist" aria-label="Core principles">
            {principles.map((p, i) => (
              <li key={p.key}>
                <button
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all duration-300",
                    active === i
                      ? "border-primary/50 bg-primary/10"
                      : "border-border bg-surface/40 hover:border-primary/30 hover:bg-surface",
                  )}
                >
                  <span className="font-mono text-xs text-primary">{p.index}</span>
                  <span className="font-display text-lg font-semibold">{p.key}</span>
                </button>
              </li>
            ))}
          </ul>

          <Reveal className="glass glow-ring flex min-h-[18rem] flex-col justify-center rounded-2xl p-10">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-primary">
              Principle {principles[active]!.index}
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              {principles[active]!.key}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
              {principles[active]!.body}
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="grid-bg border-y border-border">
        <Reveal>
          <p className="mx-auto max-w-4xl text-balance text-center font-display text-3xl leading-[1.25] sm:text-4xl md:text-5xl">
            We are not here to keep up with artificial intelligence.
            <span className="text-gradient">
              {" "}
              We are here to understand it well enough to be useful with it.
            </span>
          </p>
        </Reveal>
      </Section>

      <Section>
        <ul className="grid gap-4 md:grid-cols-3">
          {principles.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 90}>
              <div className="card-3d h-full rounded-xl border border-border bg-surface/50 p-7">
                <span className="font-mono text-xs text-primary">{p.index}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.key}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={200} className="mt-10 text-center">
          <Link
            to="/suggestions"
            className="inline-block rounded-full border border-border px-6 py-3 text-sm transition-all hover:border-primary/60 hover:bg-primary/10"
          >
            Tell us what we're missing
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
