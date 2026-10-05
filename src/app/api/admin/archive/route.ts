import { createArchiveRecordSchema } from "@/lib/archive-admin";
import { createClient } from "@/lib/supabase/server";
import { getAdminContext } from "@/server/auth/admin";

export async function POST(request: Request) {
  const admin = await getAdminContext();
  if (!admin) return Response.json({ error: "Administrator authorization is required." }, { status: 403 });
  const supabase = await createClient();
  if (!supabase) return Response.json({ error: "Supabase is not configured." }, { status: 503 });

  const parsed = createArchiveRecordSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message ?? "Enter valid archive record details." }, { status: 400 });
  const input = parsed.data;
  let result: { data: { id: string; slug: string; status: string } | null; error: { message: string } | null };

  if (input.type === "expeditions") result = await supabase.from("expeditions").insert({ slug: input.slug, title: input.title, region: input.region, start_date: input.startDate, end_date: input.endDate, summary: input.summary, objectives: input.objectives, featured: input.featured, status: input.status, provenance: input.provenance, cover_image_key: input.coverImageKey, cover_image_alt: input.coverImageAlt }).select("id,slug,status").single();
  else if (input.type === "publications") result = await supabase.from("publications").insert({ slug: input.slug, title: input.title, abstract: input.abstract, year: input.year, journal: input.journal, doi: input.doi, external_url: input.externalUrl, access_status: input.accessStatus, status: input.status, provenance: input.provenance, cover_image_key: input.coverImageKey, cover_image_alt: input.coverImageAlt }).select("id,slug,status").single();
  else if (input.type === "datasets") result = await supabase.from("datasets").insert({ slug: input.slug, title: input.title, short_description: input.shortDescription, full_description: input.fullDescription, geographic_area: input.geographicArea, temporal_start: input.temporalStart, temporal_end: input.temporalEnd, access_status: input.accessStatus, doi: input.doi, external_url: input.externalUrl, license: input.license, featured: input.featured, status: input.status, provenance: input.provenance, cover_image_key: input.coverImageKey, cover_image_alt: input.coverImageAlt }).select("id,slug,status").single();
  else result = await supabase.from("media_assets").insert({ slug: input.slug, type: input.mediaType, title: input.title, caption: input.caption, alt_text: input.altText, file_key: input.fileKey, thumbnail_key: input.thumbnailKey, mime_type: input.mimeType, rights: input.rights, license: input.license, access_status: input.accessStatus, status: input.status }).select("id,slug,status").single();

  if (result.error) {
    const message = result.error.message.includes("duplicate key") ? "A record with this slug or identifier already exists." : "The archive record could not be saved.";
    console.error("Archive record creation failed", result.error.message);
    return Response.json({ error: message }, { status: 422 });
  }
  return Response.json({ record: { ...result.data, type: input.type } }, { status: 201 });
}
