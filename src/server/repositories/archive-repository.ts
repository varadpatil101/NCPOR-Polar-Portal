import { createClient } from "@/lib/supabase/server";

export const ARCHIVE_TYPES = ["all", "expeditions", "publications", "datasets", "media"] as const;
export type ArchiveType = (typeof ARCHIVE_TYPES)[number];
export type ArchiveRecordType = Exclude<ArchiveType, "all">;
export const ARCHIVE_REGIONS = ["Antarctica", "Arctic", "Southern Ocean"] as const;
export const ARCHIVE_PAGE_SIZE = 9;

export type ArchiveFilters = {
  query?: string;
  type: ArchiveType;
  region?: (typeof ARCHIVE_REGIONS)[number];
  year?: number;
  featured?: boolean;
  page: number;
};

export type ArchiveRecord = {
  id: string;
  type: ArchiveRecordType;
  slug: string;
  title: string;
  description: string;
  dateLabel?: string;
  region?: string;
  metadata: string[];
  featured?: boolean;
  coverUrl?: string;
};
type ArchiveRecordWithCoverKey = ArchiveRecord & { coverKey?: string };

export type ArchivePageData = {
  records: ArchiveRecord[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
};

const escapeLike = (value: string) => value.replace(/[%,()]/g, " ").trim();
const matchesType = (type: ArchiveType, candidate: ArchiveRecordType) => type === "all" || type === candidate;

function recordFromExpedition(row: Record<string, unknown>): ArchiveRecordWithCoverKey {
  const start = typeof row.start_date === "string" ? row.start_date.slice(0, 4) : undefined;
  return { id: String(row.id), type: "expeditions", slug: String(row.slug), title: String(row.title), description: String(row.summary), dateLabel: start, region: String(row.region), metadata: ["Published expedition", row.featured ? "Featured" : "Field record"], featured: Boolean(row.featured), coverKey: typeof row.cover_image_key === "string" ? row.cover_image_key : undefined };
}
function recordFromPublication(row: Record<string, unknown>): ArchiveRecordWithCoverKey {
  return { id: String(row.id), type: "publications", slug: String(row.slug), title: String(row.title), description: String(row.abstract ?? "Published record available for discovery."), dateLabel: row.year ? String(row.year) : undefined, metadata: [String(row.journal ?? "Publication"), String(row.access_status ?? "Open access")], coverKey: typeof row.cover_image_key === "string" ? row.cover_image_key : undefined };
}
function recordFromDataset(row: Record<string, unknown>): ArchiveRecordWithCoverKey {
  const date = typeof row.temporal_start === "string" ? row.temporal_start.slice(0, 4) : undefined;
  return { id: String(row.id), type: "datasets", slug: String(row.slug), title: String(row.title), description: String(row.short_description), dateLabel: date, region: typeof row.geographic_area === "string" ? row.geographic_area : undefined, metadata: [String(row.access_status ?? "Open access"), row.license ? String(row.license) : "Dataset"], coverKey: typeof row.cover_image_key === "string" ? row.cover_image_key : undefined };
}
function recordFromMedia(row: Record<string, unknown>): ArchiveRecord {
  return { id: String(row.id), type: "media", slug: String(row.slug), title: String(row.title), description: String(row.caption ?? row.alt_text ?? "Published media record available for discovery."), metadata: [String(row.type), String(row.access_status ?? "Open access")] };
}

async function getCoverUrls(supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>, records: ArchiveRecordWithCoverKey[]) {
  const keys = records.flatMap((record) => record.coverKey ? [record.coverKey] : []);
  if (!keys.length) return new Map<string, string>();
  const { data } = await supabase.storage.from("archive-covers").createSignedUrls(keys, 3600);
  return new Map((data ?? []).flatMap((item) => item.signedUrl ? [[item.path, item.signedUrl] as const] : []));
}

export async function getArchiveCoverUrl(fileKey?: string) {
  if (!fileKey) return undefined;
  const supabase = await createClient();
  if (!supabase) return undefined;
  const { data } = await supabase.storage.from("archive-covers").createSignedUrl(fileKey, 3600);
  return data?.signedUrl;
}

export function parseArchiveFilters(params: Record<string, string | string[] | undefined>): ArchiveFilters {
  const value = (key: string) => typeof params[key] === "string" ? params[key] : undefined;
  const type = value("type");
  const region = value("region");
  const yearValue = Number(value("year"));
  const pageValue = Number(value("page"));
  return {
    query: value("q")?.slice(0, 120),
    type: ARCHIVE_TYPES.includes(type as ArchiveType) ? type as ArchiveType : "all",
    region: ARCHIVE_REGIONS.includes(region as (typeof ARCHIVE_REGIONS)[number]) ? region as (typeof ARCHIVE_REGIONS)[number] : undefined,
    year: Number.isInteger(yearValue) && yearValue >= 1900 && yearValue <= 2200 ? yearValue : undefined,
    featured: value("featured") === "true" ? true : undefined,
    page: Number.isInteger(pageValue) && pageValue > 0 ? pageValue : 1,
  };
}

export async function getArchivePage(filters: ArchiveFilters): Promise<ArchivePageData> {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured for this environment.");
  const search = escapeLike(filters.query ?? "");
  const fetchLimit = Math.max(ARCHIVE_PAGE_SIZE * filters.page, ARCHIVE_PAGE_SIZE) + 1;
  const queries: PromiseLike<{ data: Record<string, unknown>[] | null; error: { message: string } | null }>[] = [];

  if (matchesType(filters.type, "expeditions")) {
    let query = supabase.from("expeditions").select("id,slug,title,summary,region,start_date,featured,cover_image_key").eq("status", "PUBLISHED").order("start_date", { ascending: false }).limit(fetchLimit);
    if (search) query = query.or(`title.ilike.%${search}%,summary.ilike.%${search}%,short_title.ilike.%${search}%`);
    if (filters.region) query = query.eq("region", filters.region);
    if (filters.year) query = query.gte("start_date", `${filters.year}-01-01`).lt("start_date", `${filters.year + 1}-01-01`);
    if (filters.featured) query = query.eq("featured", true);
    queries.push(query);
  }
  if (matchesType(filters.type, "publications")) {
    let query = supabase.from("publications").select("id,slug,title,abstract,year,journal,access_status,cover_image_key").eq("status", "PUBLISHED").order("year", { ascending: false }).limit(fetchLimit);
    if (search) query = query.or(`title.ilike.%${search}%,abstract.ilike.%${search}%,journal.ilike.%${search}%,doi.ilike.%${search}%`);
    if (filters.year) query = query.eq("year", filters.year);
    queries.push(query);
  }
  if (matchesType(filters.type, "datasets")) {
    let query = supabase.from("datasets").select("id,slug,title,short_description,geographic_area,temporal_start,access_status,license,cover_image_key").eq("status", "PUBLISHED").order("temporal_start", { ascending: false, nullsFirst: false }).limit(fetchLimit);
    if (search) query = query.or(`title.ilike.%${search}%,short_description.ilike.%${search}%,full_description.ilike.%${search}%,geographic_area.ilike.%${search}%`);
    if (filters.region) query = query.ilike("geographic_area", `%${filters.region}%`);
    if (filters.year) query = query.gte("temporal_start", `${filters.year}-01-01`).lt("temporal_start", `${filters.year + 1}-01-01`);
    queries.push(query);
  }
  if (matchesType(filters.type, "media")) {
    let query = supabase.from("media_assets").select("id,slug,type,title,caption,alt_text,access_status").eq("status", "PUBLISHED").order("created_at", { ascending: false }).limit(fetchLimit);
    if (search) query = query.or(`title.ilike.%${search}%,caption.ilike.%${search}%,alt_text.ilike.%${search}%`);
    queries.push(query);
  }

  const results = await Promise.all(queries);
  const failure = results.find((result) => result.error);
  if (failure?.error) throw new Error(`Unable to load archive records: ${failure.error.message}`);
  const records: ArchiveRecordWithCoverKey[] = results.flatMap((result, index) => {
    const source = result.data ?? [];
    const enabledTypes = ARCHIVE_TYPES.filter((candidate) => candidate !== "all" && matchesType(filters.type, candidate));
    const type = enabledTypes[index];
    if (type === "expeditions") return source.map(recordFromExpedition);
    if (type === "publications") return source.map(recordFromPublication);
    if (type === "datasets") return source.map(recordFromDataset);
    return source.map(recordFromMedia);
  }).sort((a, b) => (b.dateLabel ?? "").localeCompare(a.dateLabel ?? "") || a.title.localeCompare(b.title));
  const offset = (filters.page - 1) * ARCHIVE_PAGE_SIZE;
  const pageRecords = records.slice(offset, offset + ARCHIVE_PAGE_SIZE);
  const coverUrls = await getCoverUrls(supabase, pageRecords);
  return { records: pageRecords.map(({ coverKey, ...record }) => ({ ...record, coverUrl: coverKey ? coverUrls.get(coverKey) : undefined })), total: records.length, page: filters.page, pageSize: ARCHIVE_PAGE_SIZE, hasNextPage: records.length > offset + ARCHIVE_PAGE_SIZE };
}

export async function getArchiveRecord(type: ArchiveRecordType, slug: string) {
  const supabase = await createClient();
  if (!supabase) throw new Error("Supabase is not configured for this environment.");
  const tables = {
    expeditions: "expeditions",
    publications: "publications",
    datasets: "datasets",
    media: "media_assets",
  } as const;
  const { data, error } = await supabase.from(tables[type]).select("*").eq("slug", slug).eq("status", "PUBLISHED").maybeSingle();
  if (error) throw new Error(`Unable to load archive record: ${error.message}`);
  return data as Record<string, unknown> | null;
}
