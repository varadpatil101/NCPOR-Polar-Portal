"use client";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function LoginForm() {
  const router = useRouter(); const params = useSearchParams(); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [show, setShow] = useState(false); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setError(""); if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address."); if (password.length < 8) return setError("Password must be at least 8 characters."); const supabase = createClient(); if (!supabase) return setError("Supabase is not configured in this environment."); setBusy(true); const result = await supabase.auth.signInWithPassword({ email, password }); if (result.error) { setBusy(false); return setError("The sign-in details were not accepted. Check your credentials and try again."); } router.replace(params.get("next") || "/admin"); router.refresh(); }
  return <form className="admin-login-form" onSubmit={submit} noValidate><label>Email<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label><label>Password<div className="password-field"><input type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} /><button type="button" aria-label={show ? "Hide password" : "Show password"} onClick={() => setShow(!show)}>{show ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-dark admin-submit" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={16}/> Signing in…</> : "Sign in"}</button></form>;
}
