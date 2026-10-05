import { createClient } from "@/lib/supabase/server";
import { getArchivePage, type ArchiveRecord } from "@/server/repositories/archive-repository";
import type { AdminArchiveType } from "@/lib/archive-admin";

export type AdminArchiveRecord = {
  id: string;
  type: AdminArchiveType;
  slug: string;
  title: string;
  status: string;
  dateLabel?: string;
  description: string;
  updatedAt?: string;
};

export async function getAdminSummary() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const tables = ["expeditions", "publications", "datasets", "media_assets"] as const;
  const results = await Promise.all(tables.map((table) => supabase.from(table).select("id", { count: "exact", head: true }).eq("status", "PUBLISHED")));
  const failure = results.find((result) => result.error);
  if (failure?.error) throw new Error(failure.error.message);
  return { expeditions: results[0].count ?? 0, publications: results[1].count ?? 0, datasets: results[2].count ?? 0, media: results[3].count ?? 0 };
}

export async function getOutreachSources(): Promise<ArchiveRecord[]> {
  const publicRecords = (await getArchivePage({ type: "all", page: 1 })).records;
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.from("media_assets").select("id,slug,title,caption,alt_text,type,access_status").neq("status", "PUBLISHED").order("created_at", { ascending: false }).limit(12);
  if (error) throw new Error(error.message);
  const uploads = (data ?? []).map((item) => ({ id: item.id, type: "media" as const, slug: item.slug, title: item.title, description: item.caption ?? item.alt_text ?? "Private admin outreach upload.", metadata: [item.type, item.access_status ?? "PRIVATE", "Draft upload"] }));
  return [...uploads, ...publicRecords];
}

export async function getOutreachSource(type: "expeditions" | "publications" | "datasets" | "media", slug: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  if (type !== "media") return null;
  const { data, error } = await supabase.from("media_assets").select("*").eq("slug", slug).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Record<string, unknown> | null;
}

export async function getAdminArchiveRecords(): Promise<AdminArchiveRecord[]> {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured.");
  const [expeditions, publications, datasets, media] = await Promise.all([
    supabase.from("expeditions").select("id,slug,title,summary,status,start_date,updated_at").order("updated_at", { ascending: false }).limit(100),
    supabase.from("publications").select("id,slug,title,abstract,status,year,created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("datasets").select("id,slug,title,short_description,status,temporal_start,created_at").order("created_at", { ascending: false }).limit(100),
    supabase.from("media_assets").select("id,slug,title,caption,alt_text,status,created_at").order("created_at", { ascending: false }).limit(100),
  ]);
  const failure = [expeditions, publications, datasets, media].find((result) => result.error);
  if (failure?.error) throw new Error(failure.error.message);
  return [
    ...(expeditions.data ?? []).map((record) => ({ id: record.id, type: "expeditions" as const, slug: record.slug, title: record.title, status: record.status, dateLabel: record.start_date?.slice(0, 4), description: record.summary, updatedAt: record.updated_at })),
    ...(publications.data ?? []).map((record) => ({ id: record.id, type: "publications" as const, slug: record.slug, title: record.title, status: record.status, dateLabel: record.year ? String(record.year) : undefined, description: record.abstract ?? "No abstract provided.", updatedAt: record.created_at })),
    ...(datasets.data ?? []).map((record) => ({ id: record.id, type: "datasets" as const, slug: record.slug, title: record.title, status: record.status, dateLabel: record.temporal_start?.slice(0, 4), description: record.short_description, updatedAt: record.created_at })),
    ...(media.data ?? []).map((record) => ({ id: record.id, type: "media" as const, slug: record.slug, title: record.title, status: record.status, description: record.caption ?? record.alt_text ?? "No media description provided.", updatedAt: record.created_at })),
  ].sort((first, second) => (second.updatedAt ?? "").localeCompare(first.updatedAt ?? ""));
}
