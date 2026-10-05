import { LoginForm } from "@/components/admin/login-form";
export const metadata = { title: "Admin sign in" };
export default function AdminLoginPage() { return <main className="admin-auth-page"><div className="admin-auth-card"><p className="eyebrow">NCPOR POLAR PORTAL · ADMIN</p><h1>Sign in to the workspace.</h1><p>Administrative tools are restricted to explicitly authorized portal accounts.</p><LoginForm /></div></main>; }
