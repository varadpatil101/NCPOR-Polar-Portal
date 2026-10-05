import { z } from "zod";

const supabasePublicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

/**
 * These values are intentionally public: Next.js embeds NEXT_PUBLIC_* values
 * into browser bundles at build time. They are the Supabase project URL and
 * publishable key, never a service-role credential.
 */
export const supabasePublicEnv = supabasePublicEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
});

export const hasSupabaseConfig = Boolean(
  supabasePublicEnv.NEXT_PUBLIC_SUPABASE_URL && supabasePublicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);

export const groqModel = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
export const groqVisionModel = process.env.GROQ_VISION_MODEL || "qwen/qwen3.6-27b";
export const hasGroqConfig = Boolean(process.env.GROQ_API_KEY);
