"use client";

import { createBrowserClient } from "@supabase/ssr";
import { hasSupabaseConfig, supabasePublicEnv } from "@/lib/env";

export function createClient() {
  if (!hasSupabaseConfig) return null;
  return createBrowserClient(
    supabasePublicEnv.NEXT_PUBLIC_SUPABASE_URL!,
    supabasePublicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
