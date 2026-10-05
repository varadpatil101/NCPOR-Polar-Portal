import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { hasSupabaseConfig, supabasePublicEnv } from "@/lib/env";

export async function createClient() {
  if (!hasSupabaseConfig) return null;
  const cookieStore = await cookies();
  return createServerClient(supabasePublicEnv.NEXT_PUBLIC_SUPABASE_URL!, supabasePublicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet) => {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies; middleware refreshes sessions instead.
        }
      },
    },
  });
}
