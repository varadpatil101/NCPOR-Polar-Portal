export type Region = "Antarctica" | "Arctic" | "Southern Ocean";
export type EntityType = "Expedition" | "Publication" | "Dataset" | "Story" | "Media" | "Station";

export interface Expedition { id: string; slug: string; title: string; region: Region; year: string; summary: string; theme: string; station: string; status: "Completed" | "In preparation"; image: string; counts: { reports: number; datasets: number; media: number } }
export interface ArchiveItem { id: string; type: EntityType; slug: string; title: string; summary: string; year: string; tags: string[]; region?: Region }
export interface Station { id: string; name: string; region: Region; latitude: number; longitude: number; focus: string; expeditions: number }
