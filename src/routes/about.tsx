import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { timeline } from "@/data/content";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "About CAI — Centre for Artificial Intelligence, KMC" },
      {
        name: "description",
        content:
          "How the Centre for Artificial Intelligence at Kirori Mal College works: reading groups, research reproductions, project pods and open collaboration.",
      },
      { property: "og:title", content: "About CAI — Kirori Mal College" },
      {
        property: "og:description",
        content:
          "A student community for learning, researching and building with artificial intelligence.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A college community that treats AI as a craft."
        lead={`${site.name} is a student society at ${site.college}, ${site.university}. We exist so that students who are curious about intelligence — artificial or otherwise — have somewhere serious to take that curiosity.`}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-surface/50 p-8">
              <h2 className="font-display text-2xl font-semibold">What we do</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                We run reading sessions on current literature, reproduce results in small teams, and
                maintain project pods that ship something runnable each term. Members write up what
                they find — including the experiments that fail — so the society accumulates
                knowledge instead of restarting every year.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-surface/50 p-8">
              <h2 className="font-display text-2xl font-semibold">Who it's for</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Students from every department. Mathematics, computer science, economics,
                philosophy, psychology, linguistics and the sciences all have something to
                contribute here. The only requirement is a willingness to sit with hard material and
                to be honest about what you do and don't understand yet.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="grid-bg border-y border-border">
        <SectionHeading
          eyebrow="Our journey"
          title="From a reading group to a working centre."
          lead="How CAI grew from an informal reading group into a working centre."
        />
        <ol className="relative mt-14 border-l border-border pl-8">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.period} delay={i * 80} className="relative pb-12 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[2.28rem] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-primary/60 bg-background"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--gradient-brand)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {t.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">{t.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {t.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section>
        <Reveal>
          <blockquote className="glass mx-auto max-w-3xl rounded-2xl p-10 text-center">
            <p className="text-balance font-display text-2xl leading-snug sm:text-3xl">
              “Understanding a system well enough to rebuild it is the only proof of understanding
              we accept.”
            </p>
            <footer className="mt-5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              CAI Founding Team
            </footer>
          </blockquote>
        </Reveal>
      </Section>
    </>
  );
}
