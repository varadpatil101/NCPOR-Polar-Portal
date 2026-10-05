"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ArchiveFilters, ArchivePageData, ArchiveRecord, ArchiveType } from "@/server/repositories/archive-repository";

const labels: Record<ArchiveType, string> = { all: "All", expeditions: "Expeditions", publications: "Publications", datasets: "Datasets", media: "Media" };
const recordLabels: Record<ArchiveRecord["type"], string> = { expeditions: "Expedition", publications: "Publication", datasets: "Dataset", media: "Media" };

function useArchiveUrl() {
  const router = useRouter(); const pathname = usePathname(); const params = useSearchParams();
  const currentParams = params.toString();
  return useCallback((changes: Record<string, string | undefined>) => {
    const next = new URLSearchParams(currentParams);
    Object.entries(changes).forEach(([key, value]) => value ? next.set(key, value) : next.delete(key));
    if (!Object.hasOwn(changes, "page")) next.delete("page");
    router.push(`${pathname}${next.size ? `?${next.toString()}` : ""}`);
  }, [currentParams, pathname, router]);
}

export function ArchiveSearch({ value }: { value?: string }) {
  const [query, setQuery] = useState(value ?? ""); const update = useArchiveUrl();
  useEffect(() => setQuery(value ?? ""), [value]);
  useEffect(() => { const id = window.setTimeout(() => { if (query !== (value ?? "")) update({ q: query.trim() || undefined }); }, 350); return () => window.clearTimeout(id); }, [query, value, update]);
  return <label className="archive-search"><Search size={19} aria-hidden="true"/><span className="sr-only">Search the knowledge archive</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search expeditions, publications, datasets and media" type="search" /></label>;
}

function FilterFields({ filters, close }: { filters: ArchiveFilters; close?: () => void }) {
  const update = useArchiveUrl();
  return <div className="archive-filter-fields">
    <label>Region<select value={filters.region ?? ""} onChange={(event) => update({ region: event.target.value || undefined })}><option value="">All regions</option><option>Antarctica</option><option>Arctic</option><option>Southern Ocean</option></select></label>
    <label>Year<input value={filters.year ?? ""} type="number" min="1900" max="2200" placeholder="Any year" onChange={(event) => update({ year: event.target.value || undefined })} /></label>
    <label className="archive-checkbox"><input type="checkbox" checked={Boolean(filters.featured)} onChange={(event) => update({ featured: event.target.checked ? "true" : undefined })} /> Featured expeditions only</label>
    <button type="button" className="filter-clear" onClick={() => { update({ region: undefined, year: undefined, featured: undefined }); close?.(); }}>Clear filters</button>
  </div>;
}

export function ArchiveFilters({ filters }: { filters: ArchiveFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => { if (!isOpen) return; const close = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); }; document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [isOpen]);
  return <><aside className="archive-filter-rail" aria-label="Archive filters"><p className="eyebrow">REFINE RESULTS</p><FilterFields filters={filters} /></aside><button className="filter-drawer-trigger" type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-controls="archive-filters"><SlidersHorizontal size={17}/> Filters</button>{isOpen && <div className="archive-filter-drawer" role="dialog" aria-modal="true" aria-labelledby="archive-filter-title" id="archive-filters"><div><button type="button" aria-label="Close filters" className="drawer-close" onClick={() => setIsOpen(false)}><X /></button><p id="archive-filter-title" className="eyebrow">REFINE RESULTS</p><FilterFields filters={filters} close={() => setIsOpen(false)} /></div></div>}</>;
}

export function ArchiveTypeNav({ filters }: { filters: ArchiveFilters }) {
  const params = useSearchParams();
  return <nav className="archive-type-nav" aria-label="Content types">{(Object.keys(labels) as ArchiveType[]).map((type) => { const next = new URLSearchParams(params.toString()); type === "all" ? next.delete("type") : next.set("type", type); next.delete("page"); return <Link key={type} href={`/archive${next.size ? `?${next.toString()}` : ""}`} aria-current={filters.type === type ? "page" : undefined}>{labels[type]}</Link>; })}</nav>;
}

export function ArchiveResults({ data, filters }: { data: ArchivePageData; filters: ArchiveFilters }) {
  const query = useSearchParams();
  const pageLink = (page: number) => { const next = new URLSearchParams(query.toString()); page > 1 ? next.set("page", String(page)) : next.delete("page"); return `/archive${next.size ? `?${next.toString()}` : ""}`; };
  const description = filters.query ? ` for “${filters.query}”` : "";
  if (!data.records.length) return <section className="archive-empty" aria-live="polite"><p className="eyebrow">NO MATCHES YET</p><h2>No published records match this view.</h2><p>Try a broader term or remove a filter. The archive only shows public, published portal records.</p><Link href="/archive" className="button button-dark">Reset discovery</Link></section>;
  return <><p className="result-count" aria-live="polite">{data.total}{data.hasNextPage ? "+" : ""} records found{description}</p><div className="archive-results">{data.records.map((record) => <ArchiveCard key={`${record.type}-${record.id}`} record={record} />)}</div><nav className="archive-pagination" aria-label="Archive pagination">{filters.page > 1 && <Link href={pageLink(filters.page - 1)}><ArrowLeft size={16}/> Previous</Link>}<span>Page {data.page}</span>{data.hasNextPage && <Link href={pageLink(filters.page + 1)}>Next <ArrowRight size={16}/></Link>}</nav></>;
}

function ArchiveCard({ record }: { record: ArchiveRecord }) {
  return <article className={`archive-result-card${record.coverUrl ? " has-cover" : ""}`}>{record.coverUrl && <img className="archive-card-cover" src={record.coverUrl} alt="" />}<div className="archive-result-meta"><span className="type-badge">{recordLabels[record.type]}</span>{record.dateLabel && <span>{record.dateLabel}</span>}</div><h2>{record.title}</h2><p>{record.description}</p>{record.region && <p className="archive-region">{record.region}</p>}<div className="tags">{record.metadata.filter(Boolean).map((item) => <span key={item}>{item}</span>)}</div><Link href={`/archive/record/${record.type}/${record.slug}`} className="text-link">Open record <ArrowUpRight size={16}/></Link></article>;
}
