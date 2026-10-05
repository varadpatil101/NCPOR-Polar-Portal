import "server-only";

import { createClient } from "@supabase/supabase-js";
import { supabasePublicEnv } from "@/lib/env";

/**
 * Trusted server-only client for future admin workflows and background jobs.
 * Never import this module into a Client Component or expose its key to users.
 */
export function createAdminClient() {
  const url = supabasePublicEnv.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase admin operations require NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
