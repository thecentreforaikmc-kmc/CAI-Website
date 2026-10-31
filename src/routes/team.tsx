import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import {
  foundingTeam,
  roleGroupOrder,
  studentTeam,
  type RoleGroup,
  type StudentMember,
} from "@/data/team";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — CAI, Kirori Mal College" },
      {
        name: "description",
        content:
          "Meet the Founding Team and the Student Team behind the Centre for Artificial Intelligence at Kirori Mal College — leadership, coordinators and functional heads.",
      },
      { property: "og:title", content: "Our Team — Centre for Artificial Intelligence" },
      {
        property: "og:description",
        content: "The founding leadership and the student team running CAI at Kirori Mal College.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Team,
});

const cardClass =
  "h-full rounded-2xl border border-border bg-surface/60 p-5 transition-colors duration-200 hover:border-primary/40";

/** Two-letter monogram shown in the photo slot until a real portrait is supplied. */
function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "")).toUpperCase();
}

function StudentCard({ member }: { member: StudentMember }) {
  return (
    <Reveal as="li" delay={80}>
      <article className={`${cardClass} flex flex-col`}>
        {member.photo ? (
          <div className="mb-4 flex h-56 items-end justify-center overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-b from-secondary/80 to-secondary/30 p-2">
            <img
              src={member.photo}
              alt={`Portrait of ${member.name}`}
              loading="lazy"
              decoding="async"
              className="h-full w-auto max-w-full object-contain object-bottom"
            />
          </div>
        ) : (
          <div
            aria-hidden="true"
            className="mb-4 flex h-56 items-center justify-center rounded-xl border border-dashed border-primary/20 bg-secondary/40"
          >
            <span className="font-display text-4xl font-semibold tracking-tight text-muted-foreground/45">
              {initials(member.name)}
            </span>
          </div>
        )}
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-primary">
          {member.role}
        </p>
        <h4 className="mt-2 font-display text-lg font-semibold leading-snug">{member.name}</h4>
        <p className="mt-2 text-sm text-muted-foreground [overflow-wrap:anywhere] [text-wrap:pretty]">
          {member.course}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">{member.year} year</p>
      </article>
    </Reveal>
  );
}

function GroupSection({ group, members }: { group: RoleGroup; members: StudentMember[] }) {
  return (
    <Reveal>
      <section aria-labelledby={`group-${group.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}>
        <div className="flex items-baseline gap-3">
          <span className="h-px w-6 bg-primary/50" aria-hidden="true" />
          <h3
            id={`group-${group.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
            className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            {group}
          </h3>
        </div>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <StudentCard key={m.id} member={m} />
          ))}
        </ul>
      </section>
    </Reveal>
  );
}

function Team() {
  return (
    <>
      <PageHeader
        eyebrow="Our team"
        title="The people behind CAI."
        lead="CAI is led by a founding team and run day to day by a student team organised by role."
      />

      {/* Founding Team */}
      <Section>
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            The Founding Team
          </h2>
          <p className="mt-2 text-muted-foreground">The founding leadership behind CAI.</p>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foundingTeam.map((m, i) => (
            <Reveal
              as="li"
              key={m.name}
              delay={i * 80}
              {...(i === 0 ? { className: "sm:col-span-2 lg:col-span-1" } : {})}
            >
              <article className="flex h-full flex-col gap-5 rounded-2xl border border-primary/25 bg-surface/70 p-6 transition-colors duration-200 hover:border-primary/50">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full rounded-xl border border-primary/25 bg-gradient-to-b from-secondary/80 to-secondary/30 object-contain object-bottom"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border border-dashed border-primary/20 bg-secondary/40"
                  >
                    <span className="font-display text-4xl font-semibold tracking-tight text-muted-foreground/45">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-primary">
                    {m.role}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold tracking-tight">{m.name}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Student Team */}
      <Section>
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            The Student Team
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The student leadership and functional teams driving CAI&rsquo;s initiatives, projects,
            and operations.
          </p>
        </Reveal>
        <div className="mt-10 space-y-10">
          {roleGroupOrder.map((group) => (
            <GroupSection
              key={group}
              group={group}
              members={studentTeam.filter((m) => m.group === group)}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
