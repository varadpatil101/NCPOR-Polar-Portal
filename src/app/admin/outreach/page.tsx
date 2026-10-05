import { requireAdmin } from "@/server/auth/admin";
import { getOutreachSources } from "@/server/repositories/admin-repository";
import { OutreachStudio } from "@/components/admin/outreach-studio";
export const metadata = { title: "Outreach Studio" };
export default async function OutreachPage() { await requireAdmin(); const records = await getOutreachSources(); return <main className="admin-page outreach-page"><div className="admin-breadcrumb"><a href="/admin">Admin workspace</a><span>/</span><span>Outreach Studio</span></div><header className="admin-header studio-header"><div><p className="eyebrow">OUTREACH STUDIO</p><h1>Turn knowledge into a clear next step.</h1><p>Generate audience-specific drafts from published Supabase records. Every draft stays grounded in the selected source.</p></div></header><OutreachStudio records={records} /></main>; }
