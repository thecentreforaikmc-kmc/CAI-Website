import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Lock, Send } from "lucide-react";
import { PageHeader, Section } from "@/components/Section";
import { Field, inputClass } from "@/components/FormField";
import { suggestionCategories, suggestionSchema } from "@/lib/forms.schema";
import { submitSuggestion } from "@/lib/forms.functions";

export const Route = createFileRoute("/suggestions")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { title: "Suggestion Box — CAI, Kirori Mal College" },
      {
        name: "description",
        content:
          "Share ideas for events, workshops and projects with the Centre for Artificial Intelligence. Name and email are optional.",
      },
      { property: "og:title", content: "Suggestion Box — CAI, Kirori Mal College" },
      {
        property: "og:description",
        content: "Tell CAI what you'd like to learn, build or research next.",
      },
    ],
  }),
  component: SuggestionsPage,
});

const empty = { name: "", email: "", category: "", suggestion: "", website: "" };

function SuggestionsPage() {
  const send = useServerFn(submitSuggestion);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = suggestionSchema.safeParse(form);
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

  return (
    <>
      <PageHeader
        eyebrow="Suggestion Box"
        title="Your idea could be our next project."
        lead="Workshops you want, papers worth reading, problems worth solving — tell us. You can stay anonymous."
      />
      <Section>
        <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <aside className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <div className="glass rounded-2xl border border-border p-6">
              <Lock className="h-5 w-5 text-primary" aria-hidden />
              <h2 className="mt-3 font-display text-lg text-foreground">Privacy first</h2>
              <p className="mt-2">
                Name and email are optional. Suggestions are only read by the CAI committee and are
                never shared publicly or used for anything else.
              </p>
            </div>
          </aside>

          {status === "done" ? (
            <div
              role="status"
              className="glass flex flex-col items-start gap-4 rounded-2xl border border-primary/30 p-8"
            >
              <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
              <h2 className="font-display text-2xl">Thank you — suggestion received.</h2>
              <p className="text-muted-foreground">The committee reviews every submission.</p>
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
                <Field id="s-name" label="Name" hint="Optional" error={errors.name}>
                  <input
                    id="s-name"
                    className={inputClass}
                    value={form.name}
                    onChange={set("name")}
                    maxLength={100}
                  />
                </Field>
                <Field id="s-email" label="Email" hint="Optional" error={errors.email}>
                  <input
                    id="s-email"
                    type="email"
                    className={inputClass}
                    value={form.email}
                    onChange={set("email")}
                    maxLength={255}
                  />
                </Field>
              </div>
              <Field id="s-cat" label="Category" error={errors.category}>
                <select
                  id="s-cat"
                  className={inputClass}
                  value={form.category}
                  onChange={set("category")}
                  aria-invalid={!!errors.category}
                >
                  <option value="">Choose a category…</option>
                  {suggestionCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field
                id="s-text"
                label="Suggestion"
                hint={`${form.suggestion.length}/2000`}
                error={errors.suggestion}
              >
                <textarea
                  id="s-text"
                  rows={6}
                  className={inputClass}
                  value={form.suggestion}
                  onChange={set("suggestion")}
                  maxLength={2000}
                  aria-invalid={!!errors.suggestion}
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
                  Something went wrong. Please try again.
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden />
                {status === "sending" ? "Sending…" : "Submit suggestion"}
              </button>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}
