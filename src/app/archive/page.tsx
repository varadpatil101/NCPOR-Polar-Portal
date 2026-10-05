import { ArchiveFilters, ArchiveResults, ArchiveSearch, ArchiveTypeNav } from "@/components/archive/archive-discovery";
import { getArchivePage, parseArchiveFilters } from "@/server/repositories/archive-repository";
export const metadata = { title: "Knowledge archive" };
export default async function ArchivePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseArchiveFilters(await searchParams);
  const data = await getArchivePage(filters);
  return <section className="archive-page archive-discovery-page"><div className="archive-hero"><p className="eyebrow">UNIFIED KNOWLEDGE ARCHIVE</p><h1>Find the thread<br />between records.</h1><p>Discover published expeditions, publications, datasets and media in one connected public archive. Current records are synthetic development content.</p></div><div className="archive-topbar"><ArchiveSearch value={filters.query} /><ArchiveTypeNav filters={filters} /></div><div className="archive-discovery-layout"><ArchiveFilters filters={filters} /><section aria-label="Archive results"><ArchiveResults data={data} filters={filters} /></section></div></section>;
}
