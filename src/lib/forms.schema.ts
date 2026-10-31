import { z } from "zod";

export const suggestionCategories = [
  "Events",
  "Workshops",
  "Projects",
  "Research",
  "Community",
  "Other",
] as const;

export const suggestionSchema = z.object({
  name: z.string().trim().max(100, "Keep it under 100 characters").optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").max(255).optional().or(z.literal("")),
  category: z.enum(suggestionCategories, { message: "Choose a category" }),
  suggestion: z
    .string()
    .trim()
    .min(10, "At least 10 characters")
    .max(2000, "Keep it under 2000 characters"),
  website: z.string().max(0).optional(), // honeypot
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(2, "Subject is required").max(150),
  message: z.string().trim().min(10, "At least 10 characters").max(3000),
  website: z.string().max(0).optional(),
});

export type SuggestionInput = z.infer<typeof suggestionSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
