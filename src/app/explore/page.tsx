import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PolarMap } from "@/components/home/polar-map";
import { stations } from "@/lib/content/demo";
export const metadata = { title: "Polar Explorer" };
export default function ExplorePage() { return <section className="explore-page"><div className="archive-hero"><p className="eyebrow">POLAR EXPLORER · DEMO</p><h1>Geography<br />with context.</h1><p>Select a station to see the data-backed relationship pattern that the production explorer will expand.</p></div><PolarMap stations={stations} /><div className="station-list"><p className="eyebrow">ACCESSIBLE LIST ALTERNATIVE</p>{stations.map((station) => <article key={station.id}><h2>{station.name}</h2><p>{station.region} · {station.latitude}, {station.longitude} · {station.focus}</p><Link className="text-link" href={`/archive?q=${encodeURIComponent(station.name)}`}>View related records <ArrowUpRight /></Link></article>)}</div></section>; }
