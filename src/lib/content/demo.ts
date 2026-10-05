import type { ArchiveItem, Expedition, Station } from "@/types/content";

const image = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=82`;

export const expeditions: Expedition[] = [
  { id: "exp-aurora", slug: "aurora-shelf-survey", title: "Aurora Shelf Survey", region: "Antarctica", year: "2025–26", summary: "A synthetic fieldwork narrative exploring how ice-shelf observations can be connected across disciplines.", theme: "Ice dynamics", station: "Bharati research station", status: "In preparation", image: image("photo-1517783999520-f068d7431a60"), counts: { reports: 3, datasets: 4, media: 18 } },
  { id: "exp-monsoon", slug: "southern-ocean-monsoon-link", title: "Southern Ocean–Monsoon Link", region: "Southern Ocean", year: "2024–25", summary: "Demo records tracing atmospheric observations between ocean and polar systems.", theme: "Climate connections", station: "Ocean transect", status: "Completed", image: image("photo-1519608487953-e999c86e7450"), counts: { reports: 5, datasets: 3, media: 12 } },
  { id: "exp-sediment", slug: "antarctic-sediment-cores", title: "Antarctic Sediment Cores", region: "Antarctica", year: "2023–24", summary: "A sample archive of sediment-core workflows, imagery and teaching resources.", theme: "Paleoclimate", station: "Maitri research station", status: "Completed", image: image("photo-1483347756197-71ef80e95f73"), counts: { reports: 4, datasets: 5, media: 9 } },
];

export const stations: Station[] = [
  { id: "bharati", name: "Bharati research station", region: "Antarctica", latitude: -69.41, longitude: 76.19, focus: "Coastal Antarctic observation", expeditions: 8 },
  { id: "maitri", name: "Maitri research station", region: "Antarctica", latitude: -70.77, longitude: 11.73, focus: "Inland ice and atmosphere", expeditions: 11 },
  { id: "arctic", name: "Arctic field node", region: "Arctic", latitude: 78.22, longitude: 15.64, focus: "Sea ice and fjord systems", expeditions: 4 },
];

export const archiveItems: ArchiveItem[] = [
  ...expeditions.map(({ id, slug, title, summary, year, region, theme }) => ({ id, type: "Expedition" as const, slug, title, summary, year, region, tags: [theme, region] })),
  { id: "pub-1", type: "Publication", slug: "sample-polar-observation-methods", title: "Sample polar observation methods", summary: "A demonstration publication record designed to show citation-ready metadata.", year: "2025", tags: ["Methods", "Demo"] },
  { id: "data-1", type: "Dataset", slug: "demo-coastal-ice-observations", title: "Demo coastal ice observations", summary: "Synthetic example metadata only; not scientific measurement data.", year: "2025", region: "Antarctica", tags: ["Ice dynamics", "Synthetic demo"] },
  { id: "story-1", type: "Story", slug: "field-notes-at-first-light", title: "Field notes at first light", summary: "A sample outreach story about the people and processes behind field observation.", year: "2026", tags: ["Outreach", "Field diary"] },
  { id: "media-1", type: "Media", slug: "blue-ice-study", title: "Blue ice study: image record", summary: "Demonstration media asset with provenance-oriented descriptive fields.", year: "2025", region: "Antarctica", tags: ["Photography", "Demo"] },
];

export const topics = ["Ice dynamics", "Southern Ocean", "Atmosphere", "Biodiversity", "Paleoclimate", "Education"];
