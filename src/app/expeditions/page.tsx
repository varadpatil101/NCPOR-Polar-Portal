import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { expeditions } from "@/lib/content/demo";
export const metadata = { title: "Expeditions" };
export default function ExpeditionsPage() { return <section className="archive-page"><div className="archive-hero"><p className="eyebrow">EXPEDITION ARCHIVE</p><h1>Follow the<br />fieldwork.</h1><p>Sample expedition records demonstrate the connected archive model. They are synthetic and not official activity records.</p></div><div className="expedition-grid">{expeditions.map((item) => <article className="expedition-card" key={item.id}><div className="card-image" style={{backgroundImage:`url(${item.image})`}} /><div className="card-body"><div className="card-meta"><span>{item.region}</span><span>{item.year}</span></div><h2>{item.title}</h2><p>{item.summary}</p><Link className="text-link" href={`/expeditions/${item.slug}`}>View connected record <ArrowUpRight /></Link></div></article>)}</div></section>; }
