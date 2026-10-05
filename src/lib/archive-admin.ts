import { z } from "zod";

export const adminArchiveTypes = ["expeditions", "publications", "datasets", "media"] as const;
export type AdminArchiveType = (typeof adminArchiveTypes)[number];
export const contentStatuses = ["DRAFT", "REVIEW", "APPROVED", "PUBLISHED", "ARCHIVED"] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().transform((value) => value || null);
const optionalUrl = z.string().trim().url().max(2048).optional().or(z.literal("")).transform((value) => value || null);
const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")).transform((value) => value || null);
const optionalYear = z.preprocess((value) => value === "" || value === undefined ? null : value, z.coerce.number().int().min(1900).max(2200).nullable());
const slug = z.string().trim().min(3).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only.");
const base = z.object({ type: z.enum(adminArchiveTypes), slug, title: z.string().trim().min(2).max(220), status: z.enum(contentStatuses), provenance: optionalText(500), coverImageKey: optionalText(1024), coverImageAlt: optionalText(1000) });

export const createArchiveRecordSchema = z.discriminatedUnion("type", [
  base.extend({ type: z.literal("expeditions"), region: z.enum(["Antarctica", "Arctic", "Southern Ocean"]), startDate: optionalDate, endDate: optionalDate, summary: z.string().trim().min(10).max(1200), objectives: optionalText(5000), featured: z.boolean().default(false) }),
  base.extend({ type: z.literal("publications"), abstract: optionalText(12000), year: optionalYear, journal: optionalText(500), doi: optionalText(300), externalUrl: optionalUrl, accessStatus: optionalText(80) }),
  base.extend({ type: z.literal("datasets"), shortDescription: z.string().trim().min(10).max(1200), fullDescription: optionalText(12000), geographicArea: optionalText(500), temporalStart: optionalDate, temporalEnd: optionalDate, accessStatus: optionalText(80), doi: optionalText(300), externalUrl: optionalUrl, license: optionalText(300), featured: z.boolean().default(false) }),
  base.extend({ type: z.literal("media"), mediaType: z.enum(["IMAGE", "VIDEO", "AUDIO", "OTHER"]), caption: optionalText(3000), altText: optionalText(1000), fileKey: optionalText(1024), thumbnailKey: optionalText(1024), mimeType: optionalText(255), rights: optionalText(500), license: optionalText(300), accessStatus: optionalText(80) }),
]);

export type CreateArchiveRecordInput = z.infer<typeof createArchiveRecordSchema>;

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 160);
}
