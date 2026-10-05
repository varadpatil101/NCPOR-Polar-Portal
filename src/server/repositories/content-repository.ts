import { createClient } from "@/lib/supabase/server";
import { archiveItems } from "@/lib/content/demo";

export type HomeExpedition = { id: string; slug: string; title: string; region: string; year: string; summary: string };
export type HomeStation = { id: string; name: string; region: "Antarctica" | "Arctic" | "Southern Ocean"; latitude: number; longitude: number; focus: string; expeditions: number };
export type HomeTopic = { id: string; slug: string; name: string; description: string | null };
export type HomeMedia = { id: string; title: string; caption: string | null; altText: string | null; thumbnailKey: string | null };
export type HomeContent = { source: "supabase" | "unconfigured"; expeditions: HomeExpedition[]; stations: HomeStation[]; topics: HomeTopic[]; media: HomeMedia[]; counts: { expeditions: number; publications: number; datasets: number; media: number } };

const dateLabel = (start: string | null, end: string | null) => {
  if (!start) return "Date pending";
  const startYear = new Date(`${start}T00:00:00Z`).getUTCFullYear();
  const endYear = end ? new Date(`${end}T00:00:00Z`).getUTCFullYear() : startYear;
  return startYear === endYear ? String(startYear) : `${startYear}–${String(endYear).slice(-2)}`;
};

/** Public homepage reads. Queries use the publishable key and Supabase RLS. */
export async function getHomeContent(): Promise<HomeContent> {
  const supabase = await createClient();
  if (!supabase) return { source: "unconfigured", expeditions: [], stations: [], topics: [], media: [], counts: { expeditions: 0, publications: 0, datasets: 0, media: 0 } };
  const [expeditionResult, stationResult, topicResult, mediaResult, expeditionCount, publicationCount, datasetCount, mediaCount] = await Promise.all([
    supabase.from("expeditions").select("id,slug,title,region,start_date,end_date,summary").eq("status", "PUBLISHED").order("start_date", { ascending: false }).limit(3),
    supabase.from("stations").select("id,name,region,latitude,longitude,research_focus").eq("active_status", true).order("name").limit(3),
    supabase.from("research_topics").select("id,slug,name,description").order("name").limit(4),
    supabase.from("media_assets").select("id,title,caption,alt_text,thumbnail_key").eq("status", "PUBLISHED").eq("type", "IMAGE").limit(3),
    supabase.from("expeditions").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED"),
    supabase.from("publications").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED"),
    supabase.from("datasets").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED"),
    supabase.from("media_assets").select("id", { count: "exact", head: true }).eq("status", "PUBLISHED"),
  ]);
  const errors = [expeditionResult.error, stationResult.error, topicResult.error, mediaResult.error, expeditionCount.error, publicationCount.error, datasetCount.error, mediaCount.error].filter(Boolean);
  if (errors.length) throw new Error(`Unable to load public content from Supabase: ${errors.map((error) => error!.message).join("; ")}`);
  return {
    source: "supabase",
    expeditions: (expeditionResult.data ?? []).map((item) => ({ ...item, year: dateLabel(item.start_date, item.end_date) })),
    stations: (stationResult.data ?? []).map((item) => ({ id: item.id, name: item.name, region: item.region, latitude: Number(item.latitude), longitude: Number(item.longitude), focus: item.research_focus ?? "Research focus pending", expeditions: 0 })),
    topics: topicResult.data ?? [],
    media: (mediaResult.data ?? []).map((item) => ({ id: item.id, title: item.title, caption: item.caption, altText: item.alt_text, thumbnailKey: item.thumbnail_key })),
    counts: { expeditions: expeditionCount.count ?? 0, publications: publicationCount.count ?? 0, datasets: datasetCount.count ?? 0, media: mediaCount.count ?? 0 },
  };
}

/** Temporary archive-demo helper; the public homepage never uses this local data. */
export async function searchArchive(query = "", type = "All") {
  const normalized = query.trim().toLowerCase();
  return archiveItems.filter((item) => (type === "All" || item.type === type) && (!normalized || `${item.title} ${item.summary} ${item.tags.join(" ")}`.toLowerCase().includes(normalized)));
}
