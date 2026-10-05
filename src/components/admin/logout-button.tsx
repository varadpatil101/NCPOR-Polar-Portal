"use client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";
export function LogoutButton() { const router = useRouter(); return <button className="admin-logout" onClick={async () => { const supabase = createClient(); await supabase?.auth.signOut(); router.replace("/admin/login"); router.refresh(); }}><LogOut size={16}/> Sign out</button>; }
