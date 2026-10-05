"use client";

import { Check, Copy, FileText, Image as ImageIcon, LoaderCircle, Sparkles, Upload, WandSparkles, X } from "lucide-react";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import type { ArchiveRecord } from "@/server/repositories/archive-repository";
import { createClient } from "@/lib/supabase/browser";

type Output = { title: string; body: string; summary?: string; hashtags?: string[]; call_to_action?: string };
type SourceMode = "record" | "upload";

const formats = [["article", "Website article"], ["summary", "Short summary"], ["instagram", "Instagram caption"], ["linkedin", "LinkedIn post"], ["x", "X/Twitter short post"], ["student", "Student explanation"], ["press", "Press summary"], ["education", "Educational explainer"]] as const;
const supportedMimeTypes = ["image/jpeg", "image/png", "image/webp", "text/plain", "text/markdown", "text/csv", "application/json", "application/pdf"];
const mimeByExtension: Record<string, string> = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", txt: "text/plain", md: "text/markdown", markdown: "text/markdown", csv: "text/csv", json: "application/json", pdf: "application/pdf" };

const recordValue = (record: ArchiveRecord) => `${record.type}:${record.slug}`;
const inferredMimeType = (file: File) => file.type || mimeByExtension[file.name.split(".").pop()?.toLowerCase() || ""] || "";
const isImage = (mimeType: string) => mimeType.startsWith("image/");
const isPrivateDraft = (record: ArchiveRecord) => record.metadata.includes("Draft upload");

function DraftPreview({ output, busy, copied, formatLabel, onCopy }: { output: Output | null; busy: boolean; copied: boolean; formatLabel: string; onCopy: () => void }) {
  if (busy) return <section className="outreach-preview outreach-preview-loading" aria-live="polite"><LoaderCircle className="spin" size={25} /><p className="eyebrow">DRAFTING WITH YOUR SOURCE</p><h2>Building a clear, grounded draft.</h2><p>We are shaping the selected source into a {formatLabel.toLowerCase()}.</p></section>;
  if (!output) return <section className="outreach-preview outreach-preview-empty" aria-live="polite"><div className="outreach-preview-icon"><Sparkles size={23} /></div><p className="eyebrow">DRAFT PREVIEW</p><h2>Your draft will appear here.</h2><p>Choose a source, select an output format, then generate a draft.</p><div className="outreach-preview-steps"><span>1. Select source</span><span>2. Set format</span><span>3. Generate</span></div></section>;
  return <section className="outreach-preview outreach-preview-ready" aria-live="polite"><div className="outreach-preview-topline"><span>GENERATED DRAFT</span><span>{formatLabel}</span></div><div className="outreach-preview-actions"><p className="eyebrow">READY TO REVIEW</p><button type="button" className="outreach-copy" onClick={onCopy}>{copied ? <><Check size={15} /> Copied</> : <><Copy size={15} /> Copy draft</>}</button></div><h2>{output.title}</h2><p className="outreach-draft-body">{output.body}</p>{output.summary && <div className="outreach-summary"><p className="eyebrow">SUMMARY</p><p>{output.summary}</p></div>}{output.hashtags?.length ? <div className="outreach-tags" aria-label="Suggested hashtags">{output.hashtags.map((tag) => <span key={tag}>{tag}</span>)}</div> : null}{output.call_to_action && <p className="outreach-cta">{output.call_to_action}</p>}</section>;
}

export function OutreachStudio({ records }: { records: ArchiveRecord[] }) {
  const [sourceMode, setSourceMode] = useState<SourceMode>("record");
  const [source, setSource] = useState(() => { const firstPublishedRecord = records.find((record) => !isPrivateDraft(record)) ?? records[0]; return firstPublishedRecord ? recordValue(firstPublishedRecord) : ""; });
  const [format, setFormat] = useState("article");
  const [tone, setTone] = useState("clear");
  const [output, setOutput] = useState<Output | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploadedRecord, setUploadedRecord] = useState<ArchiveRecord | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCaption, setUploadCaption] = useState("");
  const publishedRecords = useMemo(() => records.filter((record) => !isPrivateDraft(record)), [records]);
  const sourceRecords = sourceMode === "upload" ? (uploadedRecord ? [uploadedRecord] : []) : publishedRecords;
  const selectedRecord = sourceRecords.find((record) => recordValue(record) === source);
  const formatLabel = formats.find(([value]) => value === format)?.[1] ?? "Outreach draft";

  function changeSourceMode(nextMode: SourceMode) {
    setSourceMode(nextMode); setOutput(null); setError("");
    if (nextMode === "upload") setSource(uploadedRecord ? recordValue(uploadedRecord) : "");
    else { const firstPublishedRecord = publishedRecords[0]; setSource(firstPublishedRecord ? recordValue(firstPublishedRecord) : ""); }
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";
    if (!file) return;
    const mimeType = inferredMimeType(file);
    if (!supportedMimeTypes.includes(mimeType) || file.size > 5 * 1024 * 1024) { setSelectedFile(null); setError("Choose a JPEG, PNG, WebP, TXT, Markdown, CSV, JSON, or text-based PDF under 5 MB."); return; }
    setSelectedFile(file); setError("");
    if (!uploadTitle.trim()) setUploadTitle(file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
  }

  async function uploadSource() {
    if (!selectedFile) return setError("Choose a source file first.");
    const title = uploadTitle.trim(); const caption = uploadCaption.trim(); const mimeType = inferredMimeType(selectedFile);
    if (title.length < 2 || title.length > 140) return setError("Give this source a title between 2 and 140 characters.");
    if (caption.length > 500) return setError("Keep the optional source context under 500 characters.");
    const supabase = createClient();
    if (!supabase) return setError("Supabase is not configured in this environment.");
    setUploading(true); setError("");
    const baseName = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90) || "outreach-source";
    const slug = `outreach-${baseName}-${crypto.randomUUID().slice(0, 8)}`;
    const fileKey = `outreach/${slug}.${selectedFile.name.split(".").pop()?.toLowerCase() || "file"}`;
    try {
      const uploaded = await supabase.storage.from("outreach-media").upload(fileKey, selectedFile, { contentType: mimeType, upsert: false });
      if (uploaded.error) throw uploaded.error;
      const saved = await supabase.rpc("create_outreach_source_asset", { p_slug: slug, p_title: title, p_caption: caption, p_file_key: fileKey, p_mime_type: mimeType, p_type: isImage(mimeType) ? "IMAGE" : "OTHER" });
      if (saved.error) { await supabase.storage.from("outreach-media").remove([fileKey]); throw saved.error; }
      const record: ArchiveRecord = { id: String(saved.data), type: "media", slug, title, description: caption || "Private source file uploaded for outreach drafting.", metadata: [isImage(mimeType) ? "IMAGE" : "DOCUMENT", "PRIVATE", "Ready to use"] };
      setUploadedRecord(record); setSource(recordValue(record)); setSelectedFile(null); setUploadTitle(""); setUploadCaption(""); setOutput(null);
    } catch (err) { setError(err instanceof Error ? err.message : "Source upload failed. Please try again."); }
    finally { setUploading(false); }
  }

  async function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const [type, slug] = source.split(":");
    if (!type || !slug) return setError("Select a source record or upload a private source first.");
    setBusy(true); setError(""); setOutput(null);
    try {
      const response = await fetch("/api/outreach/generate", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type, slug, format, tone }) });
      const responseText = await response.text(); let json: { error?: string; output?: Output };
      try { json = JSON.parse(responseText) as { error?: string; output?: Output }; } catch { throw new Error("The outreach service returned an unexpected response. Please try again."); }
      if (!response.ok) throw new Error(json.error || "Generation failed.");
      if (!json.output) throw new Error("The outreach service returned no draft.");
      setOutput(json.output);
    } catch (err) { setError(err instanceof Error ? err.message : "Generation failed. Please try again."); }
    finally { setBusy(false); }
  }

  async function copyDraft() {
    if (!output) return;
    await navigator.clipboard.writeText([output.title, output.body, output.summary, output.hashtags?.join(" "), output.call_to_action].filter(Boolean).join("\n\n"));
    setCopied(true); window.setTimeout(() => setCopied(false), 1600);
  }

  return <section className="outreach-workspace"><form className="outreach-composer" onSubmit={generate}><div className="outreach-composer-heading"><p className="eyebrow">COMPOSE A DRAFT</p><h2>Source-led publishing.</h2><p>Use a verified portal record or add a private file. The AI is constrained to the source you select.</p></div><fieldset className="outreach-source-switch"><legend>1. Choose a source</legend><div role="group" aria-label="Source type"><button type="button" className={sourceMode === "record" ? "is-active" : ""} onClick={() => changeSourceMode("record")}><FileText size={16} /> Portal record</button><button type="button" className={sourceMode === "upload" ? "is-active" : ""} onClick={() => changeSourceMode("upload")}><Upload size={16} /> Private upload</button></div></fieldset>{sourceMode === "record" ? <div className="outreach-source-panel"><label htmlFor="outreach-record">Published record</label><select id="outreach-record" value={source} onChange={(event) => { setSource(event.target.value); setOutput(null); }}><option value="">Choose a portal record</option>{sourceRecords.map((record) => <option key={recordValue(record)} value={recordValue(record)}>{record.title} · {record.type}</option>)}</select>{selectedRecord && <p className="outreach-source-summary"><span>{selectedRecord.type}</span>{selectedRecord.description}</p>}</div> : <div className="outreach-upload-panel"><div className="outreach-upload-grid"><label>Source title<input value={uploadTitle} onChange={(event) => setUploadTitle(event.target.value)} maxLength={140} placeholder="e.g. Station open day brief" /></label><label>Context <span>(optional)</span><textarea value={uploadCaption} onChange={(event) => setUploadCaption(event.target.value)} maxLength={500} placeholder="Add relevant factual context" /></label></div><label className="outreach-file-picker"><input type="file" accept="image/jpeg,image/png,image/webp,text/plain,text/markdown,text/csv,application/json,application/pdf,.txt,.md,.markdown,.csv,.json,.pdf" onChange={selectFile} disabled={uploading} /><span className="outreach-file-icon">{selectedFile && isImage(inferredMimeType(selectedFile)) ? <ImageIcon size={18} /> : <FileText size={18} />}</span><span>{selectedFile ? <><strong>{selectedFile.name}</strong><small>{(selectedFile.size / 1024 / 1024).toFixed(1)} MB · {inferredMimeType(selectedFile)}</small></> : <><strong>Select a private source file</strong><small>JPEG, PNG, WebP, TXT, Markdown, CSV, JSON, or PDF · 5 MB max</small></>}</span>{selectedFile ? <button type="button" aria-label="Clear selected file" onClick={(event) => { event.preventDefault(); setSelectedFile(null); }}><X size={16} /></button> : <span className="outreach-file-cta">Browse</span>}</label><div className="outreach-upload-footer"><p>Files remain private in Supabase Storage and are used only to ground this draft.</p><button type="button" className="outreach-secondary-button" onClick={uploadSource} disabled={!selectedFile || uploading}>{uploading ? <><LoaderCircle className="spin" size={15} /> Saving source…</> : <><Upload size={15} /> Save and use source</>}</button></div>{uploadedRecord && <p className="outreach-upload-success"><Check size={15} /> <strong>{uploadedRecord.title}</strong> is selected and ready to use.</p>}</div>}<fieldset className="outreach-settings"><legend>2. Shape the draft</legend><div><label htmlFor="outreach-format">Output format</label><select id="outreach-format" value={format} onChange={(event) => setFormat(event.target.value)}>{formats.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><div><label htmlFor="outreach-tone">Tone</label><select id="outreach-tone" value={tone} onChange={(event) => setTone(event.target.value)}><option value="clear">Clear and factual</option><option value="editorial">Editorial</option><option value="warm">Warm and inviting</option><option value="formal">Formal</option></select></div></fieldset>{error && <div className="outreach-error" role="alert"><span>{error}</span><button type="button" onClick={() => setError("")}>Dismiss</button></div>}<button className="outreach-generate" type="submit" disabled={busy || !source || (sourceMode === "upload" && !uploadedRecord)}>{busy ? <><LoaderCircle className="spin" size={17} /> Creating draft…</> : <><WandSparkles size={17} /> Generate {formatLabel}</>}</button></form><DraftPreview output={output} busy={busy} copied={copied} formatLabel={formatLabel} onCopy={copyDraft} /></section>;
}
