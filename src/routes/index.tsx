import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading, Eyebrow } from "@/components/Section";
import { site, stats } from "@/data/site";
import { highlights, principles } from "@/data/content";
import { projects } from "@/data/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "CAI — Centre for Artificial Intelligence, Kirori Mal College" },
      {
        name: "description",
        content:
          "A student-led AI research and innovation society at Kirori Mal College, University of Delhi. We read, reproduce, and build.",
      },
      { property: "og:title", content: "Centre for Artificial Intelligence — Kirori Mal College" },
      {
        property: "og:description",
        content:
          "A student-led AI research and innovation society at Kirori Mal College, University of Delhi.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="grid-bg noise relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-56 left-1/2 h-[38rem] w-[68rem] -translate-x-1/2 rounded-full bg-[var(--gradient-brand)] opacity-[0.16] blur-[130px]"
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div>
            <Reveal>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                {site.college} · {site.university}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
                Centre for
                <br />
                <span className="text-gradient">Artificial Intelligence</span>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {site.positioning}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--gradient-brand)] px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Explore Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/team"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:border-primary/60 hover:bg-primary/10"
                >
                  Meet the Team
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="relative h-[320px] sm:h-[420px] lg:h-[540px]">
            <HeroVisual />
          </div>
        </div>

        <Reveal delay={320} className="relative mx-auto mt-14 w-full max-w-6xl">
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-6">
                <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-2 font-display text-2xl font-semibold sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
          <SectionHeading
            eyebrow="About CAI"
            title="A working society, not a signup sheet."
            lead="CAI brings together students across departments who want to understand artificial intelligence properly — reading the literature, reproducing results, and turning what we learn into things that actually run."
          />
          <div className="grid gap-4 self-center">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="card-3d rounded-xl border border-border bg-surface/60 p-6">
                  <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={280}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="grid-bg border-y border-border">
        <SectionHeading
          eyebrow="Vision"
          title="Five principles we actually hold ourselves to."
          align="center"
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.key} delay={i * 70}>
              <div className="card-3d h-full rounded-xl border border-border bg-surface/50 p-6">
                <span className="font-mono text-xs text-primary">{p.index}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{p.key}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={420} className="mt-10 text-center">
          <Link to="/vision" className="text-sm text-primary hover:underline">
            See the full vision →
          </Link>
        </Reveal>
      </Section>

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Projects"
            title="What members are building."
            lead="A selection of what CAI members are building and researching."
          />
          <Reveal delay={120}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm transition-all hover:border-primary/60 hover:bg-primary/10"
            >
              Full gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {projects.slice(0, 3).map((p, i) => (
            <Reveal as="li" key={p.id} delay={i * 90}>
              <article className="card-3d flex h-full flex-col rounded-xl border border-border bg-surface/60 p-6">
                <Eyebrow>{p.category}</Eyebrow>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {p.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="pb-28">
        <Reveal>
          <div className="glass glow-ring relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-32 h-64 bg-[var(--gradient-brand)] opacity-20 blur-[90px]"
            />
            <h2 className="relative text-balance text-3xl font-semibold sm:text-4xl">
              Have an idea, a question, or a project worth building?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
              Drop it in the suggestion box, or reach out directly. Anyone at the college is welcome
              — no prior machine learning experience required.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/suggestions"
                className="rounded-full bg-[var(--gradient-brand)] px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Open Suggestion Box
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:border-primary/60 hover:bg-primary/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
