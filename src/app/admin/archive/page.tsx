import Link from "next/link";
import { requireAdmin } from "@/server/auth/admin";
import { getAdminArchiveRecords } from "@/server/repositories/admin-repository";
import { ArchiveManager } from "@/components/admin/archive-manager";

export const metadata = { title: "Archive Management" };

export default async function AdminArchivePage() {
  await requireAdmin();
  const records = await getAdminArchiveRecords();
  return <main className="admin-page admin-archive-page"><div className="admin-breadcrumb"><Link href="/admin">Admin workspace</Link><span>/</span><span>Archive management</span></div><header className="admin-header archive-admin-header"><div><p className="eyebrow">PUBLIC ARCHIVE</p><h1>Make knowledge discoverable.</h1><p>Create records by archive category, keep drafts private, and publish only when they are ready for public discovery.</p></div></header><ArchiveManager records={records} /></main>;
}
