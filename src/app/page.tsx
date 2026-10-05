import Link from "next/link";
import { ArrowUpRight, BookOpen, Database, Image as ImageIcon, MapPinned } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { PolarMap } from "@/components/home/polar-map";
import { FeaturedExpeditions, GalleryPreview, ResearchHighlights } from "@/components/home/homepage-sections";
import { getHomeContent } from "@/server/repositories/content-repository";

export default async function Home() {
  const content = await getHomeContent();
  const latestExpedition = content.expeditions[0];
  const cards = [
    { icon: MapPinned, value: content.counts.expeditions, label: "Published expeditions" },
    { icon: BookOpen, value: content.counts.publications, label: "Publication records" },
    { icon: Database, value: content.counts.datasets, label: "Dataset records" },
    { icon: ImageIcon, value: content.counts.media, label: "Media records" },
  ];

  return <><Hero live={content.source === "supabase"} />
    <section className="pulse section"><p className="eyebrow">POLAR PULSE <span className="demo-label">SUPABASE PUBLIC RECORDS</span></p><div className="stat-grid">{cards.map(({ icon: Icon, value, label }) => <div className="stat-card" key={label}><Icon /><strong>{value}</strong><span>{label}</span></div>)}</div></section>
    <section className="section explore"><div className="section-head"><div><p className="eyebrow">EXPLORE POLAR WORLD</p><h2>The map is only<br />the beginning.</h2></div><Link href="/explore" className="text-link">Open Polar Explorer <ArrowUpRight /></Link></div>{content.stations.length ? <PolarMap stations={content.stations} /> : <div className="empty-state"><h2>No active stations yet.</h2><p>Station records will appear after they are published in the public archive.</p></div>}</section>
    <section className="section feature-section"><div className="section-head"><div><p className="eyebrow">FEATURED EXPEDITIONS</p><h2>Fieldwork, in context.</h2></div><Link href="/expeditions" className="text-link">Browse all expeditions <ArrowUpRight /></Link></div><FeaturedExpeditions expeditions={content.expeditions} /></section>
    <section className="research-band"><div><p className="eyebrow light">RESEARCH HIGHLIGHTS</p><h2>Science that connects<br />beyond the ice.</h2></div><ResearchHighlights topics={content.topics} /></section>
    <section className="section two-column"><article className="story-feature"><p className="eyebrow">LATEST EXPEDITION RECORD</p>{latestExpedition ? <><h2>{latestExpedition.title}</h2><p>{latestExpedition.summary}</p><Link href={`/expeditions/${latestExpedition.slug}`} className="button button-dark">Open live record <ArrowUpRight /></Link></> : <><h2>No latest record yet.</h2><p>Newly published expedition records will appear here.</p></>}</article><article className="data-feature"><p className="eyebrow">DATA CATALOGUE</p><div className="chart-bars" aria-label="Published archive counts"><i /><i /><i /><i /></div><h3>{content.counts.datasets} published dataset records</h3><p>Dataset metadata will appear here as it is published through the Supabase archive.</p><Link href="/archive?type=Dataset" className="text-link">Open data records <ArrowUpRight /></Link></article></section>
    <section className="section gallery"><div className="section-head"><div><p className="eyebrow">FROM THE ARCHIVE</p><h2>Evidence has a visual memory.</h2></div><Link href="/archive?type=Media" className="text-link">Explore media <ArrowUpRight /></Link></div><GalleryPreview media={content.media} /></section>
    <section className="outreach"><p className="eyebrow light">OUTREACH & EDUCATION</p><h2>Start where your<br /><i>curiosity</i> leads.</h2><div><Link href="/education">For learners <ArrowUpRight /></Link><Link href="/archive">For researchers <ArrowUpRight /></Link><Link href="/stories">For storytellers <ArrowUpRight /></Link></div></section>
  </>;
}
