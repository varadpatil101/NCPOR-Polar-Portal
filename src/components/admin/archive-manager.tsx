"use client";

import { ArrowUpRight, Check, ImagePlus, LoaderCircle, Plus, Search, X } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { adminArchiveTypes, contentStatuses, slugify, type AdminArchiveType } from "@/lib/archive-admin";
import type { AdminArchiveRecord } from "@/server/repositories/admin-repository";
import { createClient } from "@/lib/supabase/browser";

const labels: Record<AdminArchiveType, string> = { expeditions: "Expeditions", publications: "Publications", datasets: "Datasets", media: "Media" };
const blank = (type: AdminArchiveType) => ({ type, title: "", slug: "", status: "DRAFT", provenance: "", coverImageKey: "", coverImageAlt: "", region: "Antarctica", startDate: "", endDate: "", summary: "", objectives: "", featured: false, abstract: "", year: "", journal: "", doi: "", externalUrl: "", accessStatus: "OPEN", shortDescription: "", fullDescription: "", geographicArea: "", temporalStart: "", temporalEnd: "", license: "", mediaType: "IMAGE", caption: "", altText: "", fileKey: "", thumbnailKey: "", mimeType: "", rights: "" });

function Field({ label, name, value, onChange, required = false, type = "text", hint }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; required?: boolean; type?: string; hint?: string }) {
  return <label className="archive-admin-field">{label}{required && <b aria-hidden="true">*</b>}<input name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} required={required} />{hint && <small>{hint}</small>}</label>;
}
function Area({ label, name, value, onChange, required = false }: { label: string; name: string; value: string; onChange: (name: string, value: string) => void; required?: boolean }) {
  return <label className="archive-admin-field archive-admin-field-wide">{label}{required && <b aria-hidden="true">*</b>}<textarea name={name} value={value} onChange={(event) => onChange(name, event.target.value)} required={required} /></label>;
}

function RecordForm({ type, onClose }: { type: AdminArchiveType; onClose: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState(blank(type));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const set = (name: string, value: string | boolean) => setForm((current) => ({ ...current, [name]: value }));
  const updateTitle = (value: string) => setForm((current) => ({ ...current, title: value, slug: current.slug === slugify(current.title) || !current.slug ? slugify(value) : current.slug }));

  function selectCover(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) { setCoverFile(null); setError("Use a JPEG, PNG, or WebP cover image under 5 MB."); return; }
    setCoverFile(file); setError("");
  }

  async function uploadCover() {
    if (!coverFile) return undefined;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) throw new Error("Set a valid slug before uploading a cover image.");
    const supabase = createClient();
    if (!supabase) throw new Error("Supabase is not configured in this environment.");
    const extension = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
    const key = `covers/${type}/${form.slug}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
    const { error: uploadError } = await supabase.storage.from("archive-covers").upload(key, coverFile, { contentType: coverFile.type, upsert: false });
    if (uploadError) throw uploadError;
    return key;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    let uploadedCoverKey: string | undefined;
    try {
      uploadedCoverKey = await uploadCover();
      const payload = { ...form, coverImageKey: uploadedCoverKey ?? form.coverImageKey };
      const response = await fetch("/api/admin/archive", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "The record could not be saved.");
      router.refresh(); onClose();
    } catch (reason) { if (uploadedCoverKey) { const supabase = createClient(); await supabase?.storage.from("archive-covers").remove([uploadedCoverKey]); } setError(reason instanceof Error ? reason.message : "The record could not be saved."); }
    finally { setBusy(false); }
  }

  return <form className="archive-admin-form" onSubmit={submit}><div className="archive-admin-form-heading"><div><p className="eyebrow">NEW {labels[type].slice(0, -1).toUpperCase()}</p><h2>Set the public record.</h2><p>Records marked <b>Published</b> appear in the public archive immediately.</p></div><button type="button" className="archive-admin-icon-button" onClick={onClose} aria-label="Close record form"><X size={18} /></button></div><div className="archive-admin-form-grid"><Field label="Title" name="title" value={form.title} onChange={(_, value) => updateTitle(value)} required /><Field label="Slug" name="slug" value={form.slug} onChange={set} required hint="Lowercase letters, numbers and hyphens." />{type !== "media" && <><label className="archive-admin-cover-picker archive-admin-field-wide"><input type="file" accept="image/jpeg,image/png,image/webp" onChange={selectCover} disabled={busy} /><span><ImagePlus size={19} /></span><span><strong>{coverFile ? coverFile.name : "Add cover image"}</strong><small>{coverFile ? `${(coverFile.size / 1024 / 1024).toFixed(1)} MB · ready to upload` : "JPEG, PNG, or WebP · 5 MB max"}</small></span>{coverFile && <button type="button" onClick={() => setCoverFile(null)} aria-label="Remove cover image"><X size={16} /></button>}</label><Field label="Cover image description" name="coverImageAlt" value={form.coverImageAlt} onChange={set} hint="Describe the image for screen-reader users." /></>}{type === "expeditions" && <><label className="archive-admin-field">Region<select value={form.region} onChange={(event) => set("region", event.target.value)}><option>Antarctica</option><option>Arctic</option><option>Southern Ocean</option></select></label><label className="archive-admin-check"><input type="checkbox" checked={form.featured} onChange={(event) => set("featured", event.target.checked)} /> Feature this expedition</label><Field label="Start date" name="startDate" value={form.startDate} onChange={set} type="date" /><Field label="End date" name="endDate" value={form.endDate} onChange={set} type="date" /><Area label="Summary" name="summary" value={form.summary} onChange={set} required /><Area label="Objectives" name="objectives" value={form.objectives} onChange={set} /></>}{type === "publications" && <><Field label="Year" name="year" value={form.year} onChange={set} type="number" /><Field label="Journal / publisher" name="journal" value={form.journal} onChange={set} /><Field label="DOI" name="doi" value={form.doi} onChange={set} /><Field label="External URL" name="externalUrl" value={form.externalUrl} onChange={set} type="url" /><Field label="Access status" name="accessStatus" value={form.accessStatus} onChange={set} /><Area label="Abstract" name="abstract" value={form.abstract} onChange={set} /></>}{type === "datasets" && <><Field label="Geographic area" name="geographicArea" value={form.geographicArea} onChange={set} /><label className="archive-admin-check"><input type="checkbox" checked={form.featured} onChange={(event) => set("featured", event.target.checked)} /> Feature this dataset</label><Field label="Temporal start" name="temporalStart" value={form.temporalStart} onChange={set} type="date" /><Field label="Temporal end" name="temporalEnd" value={form.temporalEnd} onChange={set} type="date" /><Field label="DOI" name="doi" value={form.doi} onChange={set} /><Field label="External URL" name="externalUrl" value={form.externalUrl} onChange={set} type="url" /><Field label="License" name="license" value={form.license} onChange={set} /><Field label="Access status" name="accessStatus" value={form.accessStatus} onChange={set} /><Area label="Short description" name="shortDescription" value={form.shortDescription} onChange={set} required /><Area label="Full description" name="fullDescription" value={form.fullDescription} onChange={set} /></>}{type === "media" && <><label className="archive-admin-field">Media type<select value={form.mediaType} onChange={(event) => set("mediaType", event.target.value)}><option>IMAGE</option><option>VIDEO</option><option>AUDIO</option><option>OTHER</option></select></label><Field label="Access status" name="accessStatus" value={form.accessStatus} onChange={set} /><Field label="Storage file key" name="fileKey" value={form.fileKey} onChange={set} /><Field label="Thumbnail key" name="thumbnailKey" value={form.thumbnailKey} onChange={set} /><Field label="MIME type" name="mimeType" value={form.mimeType} onChange={set} /><Field label="Rights" name="rights" value={form.rights} onChange={set} /><Field label="License" name="license" value={form.license} onChange={set} /><Area label="Caption" name="caption" value={form.caption} onChange={set} /><Area label="Alt text" name="altText" value={form.altText} onChange={set} /></>} {type !== "media" && <Field label="Provenance" name="provenance" value={form.provenance} onChange={set} />}</div><div className="archive-admin-publish"><label className="archive-admin-field">Publishing status<select value={form.status} onChange={(event) => set("status", event.target.value)}>{contentStatuses.map((status) => <option key={status}>{status}</option>)}</select></label><p><b>Draft</b> stays private. <b>Published</b> appears in the archive and its existing detail route.</p><button className="button button-dark" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={16} /> Saving…</> : <><Check size={16} /> Save {form.status === "PUBLISHED" ? "and publish" : "record"}</>}</button></div>{error && <p className="form-error" role="alert">{error}</p>}</form>;
}

export function ArchiveManager({ records }: { records: AdminArchiveRecord[] }) {
  const [type, setType] = useState<AdminArchiveType>("expeditions");
  const [query, setQuery] = useState("");
  const [creating, setCreating] = useState(false);
  const filtered = useMemo(() => records.filter((record) => (record.type === type) && `${record.title} ${record.slug} ${record.description}`.toLowerCase().includes(query.toLowerCase())), [records, type, query]);
  return <section className="archive-admin-manager"><div className="archive-admin-toolbar"><div><p className="eyebrow">ARCHIVE MANAGEMENT</p><h2>Publish records to discovery.</h2><p>Create archive records with the fields their public card and detail page need. Publishing is the only action that makes a record public.</p></div><button className="button button-dark" onClick={() => setCreating(true)}><Plus size={17} /> New {labels[type].slice(0, -1)}</button></div><nav className="archive-admin-tabs" aria-label="Archive record type">{adminArchiveTypes.map((item) => <button key={item} className={type === item ? "is-active" : ""} onClick={() => { setType(item); setQuery(""); }}>{labels[item]} <span>{records.filter((record) => record.type === item).length}</span></button>)}</nav>{creating ? <RecordForm type={type} onClose={() => setCreating(false)} /> : <><label className="archive-admin-search"><Search size={17} /><span className="sr-only">Search {labels[type]}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Search ${labels[type].toLowerCase()}`} /></label><div className="archive-admin-records">{filtered.length ? filtered.map((record) => <article key={record.id}><div><p className="eyebrow">{labels[record.type].slice(0, -1).toUpperCase()} · {record.status}</p><h3>{record.title}</h3><p>{record.description}</p><small>{record.dateLabel ?? "No year"} · /{record.slug}</small></div>{record.status === "PUBLISHED" && <Link href={`/archive/record/${record.type}/${record.slug}`} target="_blank">View public record <ArrowUpRight size={15} /></Link>}</article>) : <div className="archive-admin-empty"><p className="eyebrow">NO {labels[type].toUpperCase()} FOUND</p><h3>Start the collection.</h3><p>Create the first {labels[type].toLowerCase().slice(0, -1)} record for this archive category.</p><button className="button button-dark" onClick={() => setCreating(true)}><Plus size={16} /> New record</button></div>}</div></>}</section>;
}
