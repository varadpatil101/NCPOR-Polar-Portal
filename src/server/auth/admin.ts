import "server-only";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AdminContext = { user: { id: string; email?: string }; role: "ADMIN" };

export async function getAdminContext(): Promise<AdminContext | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: role } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  if (role?.role !== "ADMIN") return null;
  return { user: { id: user.id, email: user.email }, role: "ADMIN" };
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context) redirect("/admin/login?next=/admin");
  return context;
}
