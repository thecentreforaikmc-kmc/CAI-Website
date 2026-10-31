import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { PageHeader, Section } from "@/components/Section";
import { Field, inputClass } from "@/components/FormField";
import { contactSchema } from "@/lib/forms.schema";
import { submitContact } from "@/lib/forms.functions";
import { site } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Contact — CAI, Kirori Mal College" },
      {
        name: "description",
        content:
          "Get in touch with the Centre for Artificial Intelligence at Kirori Mal College, University of Delhi.",
      },
      { property: "og:title", content: "Contact — CAI, Kirori Mal College" },
      {
        property: "og:description",
        content: "Collaborations, questions, or joining CAI — send us a message.",
      },
    ],
  }),
  component: ContactPage,
});

const empty = { name: "", email: "", subject: "", message: "", website: "" };

function ContactPage() {
  const send = useServerFn(submitContact);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof typeof empty, string>> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof typeof empty] ??= i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await send({ data: parsed.data });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setForm(empty);
    } catch {
      setStatus("error");
    }
  }

  const info = [
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: Phone, label: "Phone", value: site.contact.phone },
    { icon: Clock, label: "Office hours", value: site.contact.officeHours },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something together."
        lead="Collaborations, speaker invites, questions about joining — we'd love to hear from you."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <aside className="space-y-4">
            {info.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="glass flex gap-4 rounded-2xl border border-border p-5">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </p>
                  {href ? (
                    <a href={href} className="mt-1 block text-sm hover:text-primary">
                      {value}
                    </a>
                  ) : (
                    <p className="mt-1 text-sm">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl border border-border p-5">
              <MapPin className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                Campus
              </p>
              <address className="mt-1 text-sm not-italic leading-relaxed">
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </aside>

          {status === "done" ? (
            <div
              role="status"
              className="glass flex flex-col items-start gap-4 rounded-2xl border border-primary/30 p-8"
            >
              <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
              <h2 className="font-display text-2xl">Message sent.</h2>
              <p className="text-muted-foreground">
                Thanks for reaching out — the team will get back to you.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="rounded-full border border-border px-5 py-2 text-sm hover:border-primary"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              className="glass space-y-5 rounded-2xl border border-border p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="c-name" label="Name" error={errors.name}>
                  <input
                    id="c-name"
                    className={inputClass}
                    value={form.name}
                    onChange={set("name")}
                    maxLength={100}
                    aria-invalid={!!errors.name}
                  />
                </Field>
                <Field id="c-email" label="Email" error={errors.email}>
                  <input
                    id="c-email"
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={set("email")}
                    maxLength={255}
                    aria-invalid={!!errors.email}
                  />
                </Field>
              </div>
              <Field id="c-subject" label="Subject" error={errors.subject}>
                <input
                  id="c-subject"
                  className={inputClass}
                  value={form.subject}
                  onChange={set("subject")}
                  maxLength={150}
                  aria-invalid={!!errors.subject}
                />
              </Field>
              <Field id="c-msg" label="Message" error={errors.message}>
                <textarea
                  id="c-msg"
                  rows={6}
                  className={inputClass}
                  value={form.message}
                  onChange={set("message")}
                  maxLength={3000}
                  aria-invalid={!!errors.message}
                />
              </Field>
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
                value={form.website}
                onChange={set("website")}
              />
              {status === "error" ? (
                <p role="alert" className="text-sm text-destructive">
                  Couldn't send your message. Please try again.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden />
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
