import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeExpedition, HomeMedia, HomeTopic } from "@/server/repositories/content-repository";

export function FeaturedExpeditions({ expeditions }: { expeditions: HomeExpedition[] }) {
  if (!expeditions.length) return <div className="empty-state"><h2>No published expeditions yet.</h2><p>Published expedition records will appear here as they are added to the archive.</p></div>;
  return <div className="expedition-grid">{expeditions.map((item) => <article className="expedition-card" key={item.id}><div className={`card-image region-${item.region.toLowerCase().replaceAll(" ", "-")}`} aria-hidden="true" /><div className="card-body"><div className="card-meta"><span>{item.region}</span><span>{item.year}</span></div><h3>{item.title}</h3><p>{item.summary}</p><Link href={`/expeditions/${item.slug}`} className="text-link">View expedition <ArrowUpRight /></Link></div></article>)}</div>;
}

export function ResearchHighlights({ topics }: { topics: HomeTopic[] }) {
  if (!topics.length) return <p className="section-empty-dark">Published research topics will appear here.</p>;
  return <div className="topic-list">{topics.map((topic, index) => <Link href={`/archive?q=${encodeURIComponent(topic.name)}`} key={topic.id}><small>{String(index + 1).padStart(2, "0")}</small>{topic.name}<ArrowUpRight /></Link>)}</div>;
}

export function GalleryPreview({ media }: { media: HomeMedia[] }) {
  if (!media.length) return <div className="gallery-empty"><p className="eyebrow">MEDIA ARCHIVE</p><h3>No published media records yet.</h3><p>When approved media is added in Supabase, its captions and provenance will appear here.</p></div>;
  return <div className="gallery-grid">{media.map((item, index) => <article key={item.id} className={`gallery-image g${index}`}><span>{item.caption ?? item.title}</span></article>)}</div>;
}
