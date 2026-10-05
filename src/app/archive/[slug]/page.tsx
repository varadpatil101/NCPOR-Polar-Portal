import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { archiveItems } from "@/lib/content/demo";

export default async function ArchiveRecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = archiveItems.find((record) => record.slug === slug);
  if (!item) notFound();
  return <article className="detail-page"><Link className="back-link" href="/archive"><ArrowLeft size={16} /> Knowledge archive</Link><header className="record-header"><p className="eyebrow">{item.type.toUpperCase()} · SYNTHETIC DEMO RECORD</p><h1>{item.title}</h1><p>{item.summary}</p><div className="tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></header><div className="detail-grid record-detail"><section><p className="eyebrow">PROVENANCE</p><h2>Designed for traceable discovery.</h2><p>This record is synthetic content created solely to demonstrate the portal’s information architecture. It is not an official NCPOR publication, dataset, field record or media asset.</p><p>Once Supabase Cloud is connected, this detail template will query the published record, relationships, access state and source metadata from the cloud database.</p></section><aside><p className="eyebrow">RECORD AT A GLANCE</p><div><b>TYPE</b><span>{item.type}</span></div><div><b>YEAR</b><span>{item.year}</span></div>{item.region && <div><b>REGION</b><span>{item.region}</span></div>}<Link className="text-link" href="/archive">Keep discovering <ArrowUpRight /></Link></aside></div></article>;
}
