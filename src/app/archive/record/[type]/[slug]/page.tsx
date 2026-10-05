import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getArchiveCoverUrl, getArchiveRecord, type ArchiveRecordType } from "@/server/repositories/archive-repository";

const validTypes = ["expeditions", "publications", "datasets", "media"] as const;
const label: Record<ArchiveRecordType, string> = { expeditions: "Expedition", publications: "Publication", datasets: "Dataset", media: "Media" };
const value = (record: Record<string, unknown>, key: string) => typeof record[key] === "string" ? record[key] : undefined;
const dateYear = (date?: string) => date?.slice(0, 4);

export default async function ArchiveDetailPage({ params }: { params: Promise<{ type: string; slug: string }> }) {
  const { type, slug } = await params;
  if (!validTypes.includes(type as ArchiveRecordType)) notFound();
  const recordType = type as ArchiveRecordType;
  const record = await getArchiveRecord(recordType, slug);
  if (!record) notFound();
  const title = value(record, "title") ?? "Archive record";
  const description = recordType === "expeditions" ? value(record, "summary") : recordType === "publications" ? value(record, "abstract") : recordType === "datasets" ? value(record, "full_description") ?? value(record, "short_description") : value(record, "caption") ?? value(record, "alt_text");
  const metadata = recordType === "expeditions" ? [["Region", value(record, "region")], ["Field period", [dateYear(value(record, "start_date")), dateYear(value(record, "end_date"))].filter(Boolean).join("–")], ["Featured", record.featured ? "Yes" : "No"]] : recordType === "publications" ? [["Year", record.year ? String(record.year) : undefined], ["Journal", value(record, "journal")], ["Access", value(record, "access_status")], ["DOI", value(record, "doi")]] : recordType === "datasets" ? [["Geographic area", value(record, "geographic_area")], ["Temporal coverage", [dateYear(value(record, "temporal_start")), dateYear(value(record, "temporal_end"))].filter(Boolean).join("–")], ["License", value(record, "license")], ["Access", value(record, "access_status")]] : [["Media type", value(record, "type")], ["Rights", value(record, "rights")], ["License", value(record, "license")], ["Access", value(record, "access_status")]];
  const externalUrl = value(record, "external_url");
  const coverUrl = await getArchiveCoverUrl(value(record, "cover_image_key"));
  const coverAlt = value(record, "cover_image_alt") ?? "";
  return <article className="detail-page archive-detail-page"><Link className="back-link" href="/archive"><ArrowLeft size={16} /> Knowledge archive</Link><header className={`record-header${coverUrl ? " record-header-cover" : ""}`}>{coverUrl && <img src={coverUrl} alt={coverAlt} />}<div className="record-header-content"><p className="eyebrow">{label[recordType].toUpperCase()} · PUBLISHED DEVELOPMENT RECORD</p><h1>{title}</h1>{description && <p>{description}</p>}</div></header><div className="detail-grid record-detail"><section><p className="eyebrow">RECORD CONTEXT</p><h2>Built for traceable discovery.</h2><p>{value(record, "provenance") ?? "This is synthetic development content used to demonstrate the portal’s public knowledge architecture. It is not an official NCPOR scientific record."}</p>{recordType === "expeditions" && value(record, "objectives") && <><p className="eyebrow">OBJECTIVES</p><p>{value(record, "objectives")}</p></>}{externalUrl && <a className="button button-dark" href={externalUrl} target="_blank" rel="noreferrer">Open external record <ExternalLink size={16}/></a>}</section><aside><p className="eyebrow">RECORD AT A GLANCE</p>{metadata.filter(([, detail]) => detail).map(([name, detail]) => <div key={name ?? "record-detail"}><b>{String(name).toUpperCase()}</b><span>{detail}</span></div>)}<Link className="text-link" href="/archive">Keep discovering <ArrowUpRight /></Link></aside></div></article>;
}
