import { createServerFn } from "@tanstack/react-start";
import { contactSchema, suggestionSchema } from "./forms.schema";

export const submitSuggestion = createServerFn({ method: "POST" })
  .validator((d: unknown) => suggestionSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("suggestions").insert({
      name: data.name || null,
      email: data.email || null,
      category: data.category,
      suggestion: data.suggestion,
    });
    if (error) {
      console.error("suggestion insert failed", error.message);
      return { ok: false };
    }
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .validator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      return { ok: false };
    }
    return { ok: true };
  });
