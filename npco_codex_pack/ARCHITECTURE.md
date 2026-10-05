# Architecture Blueprint

## Recommended stack
Use current stable releases available at implementation time, with versions pinned in the lockfile.

### Frontend/application
- Next.js App Router
- TypeScript strict mode
- Tailwind CSS or equivalent token-driven CSS
- accessible component primitives (shadcn/ui or comparable)
- Framer Motion for most UI transitions
- GSAP only where a genuinely timeline-driven hero/scroll interaction benefits from it

### Data/backend
- Supabase PostgreSQL as the cloud database
- Supabase Auth for authentication and role-aware access
- Supabase Storage for documents, images, videos, and dataset files
- Supabase SSR helpers for secure Next.js App Router sessions
- Server Actions and/or REST route handlers where appropriate
- Zod for runtime validation
- Supabase Row Level Security (RLS) as the database authorization boundary

### Search
Start with PostgreSQL full-text + pg_trgm style capabilities. Abstract search behind a service so it can later move to OpenSearch/Meilisearch without rewriting UI.

### Maps/geospatial
Prefer OpenLayers or MapLibre for 2D geospatial functionality. A lightweight React Three Fiber/globe surface can be used for an optional visual explorer, but it must not become the only map implementation.

### Charts
Use a maintained charting library suitable for React and accessibility. Encapsulate chart logic inside chart components.

### Documents
- PDF.js / pdfjs-dist for rendering
- an open-source page-flip component such as react-pageflip if stable at implementation time

### Testing
- Vitest or Jest for unit tests
- Playwright for end-to-end tests
- Testing Library for component behavior

## Project structure

```text
src/
  app/
    (public)/
    admin/
    api/
  components/
    ui/
    shell/
    archive/
    expedition/
    publication/
    dataset/
    media/
    map/
    charts/
    documents/
    outreach/
  lib/
    auth/
    db/
    search/
    storage/
    ai/
    validation/
    seo/
  server/
    services/
    repositories/
    workflows/
  types/
  styles/
prisma/
  schema.prisma
  seed.ts
public/
  images/
  icons/
  sample-documents/
scripts/
tests/
```

Adapt this structure to the existing repository rather than blindly replacing a working codebase.

## Domain layering

UI -> application/service layer -> repository/data access -> Supabase/PostgreSQL.

Do not let React components directly assemble complex database queries. Keep domain operations testable.

## Core entities

- User
- Role
- Person
- Organization
- Station
- Expedition
- ExpeditionWaypoint
- ResearchTopic
- Publication
- PublicationAuthor
- Dataset
- DatasetVariable
- DatasetCoverage
- Report
- MediaAsset
- VideoAsset
- NewsArticle
- Story
- Event
- Opportunity
- EducationalResource
- Relationship
- Tag
- ContentRevision
- AIContentDraft
- NewsletterSubscription
- SavedItem
- ViewHistory
- AuditLog

Use join tables for many-to-many relationships where practical.

## File/storage abstraction

Create a `StorageProvider` abstraction with:
- save;
- delete;
- getSignedUrl or access URL;
- metadata;
- existence check.

Primary implementation: Supabase Storage.
Use local mock/in-memory behavior only for tests when appropriate. Do not design the production path around a local file database or local-only storage.

## Supabase integration
The application is cloud-backend-first. The website may run locally during development, but its real backend is Supabase.

Required integration seams:
- Supabase browser client for client-safe operations.
- Supabase server client for server components/actions.
- Auth callback/session handling.
- RLS policies for every protected table.
- Storage buckets and policies for media/documents.
- SQL migrations and deterministic seed data in `supabase/migrations` and `supabase/seed.sql`.
- Never expose the Supabase service-role key to the browser.
- Keep `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as client-safe configuration; keep `SUPABASE_SERVICE_ROLE_KEY` server-only.

The application must fail clearly and safely when Supabase environment variables are missing rather than silently pretending the cloud backend exists.

## AI abstraction

Create:
```text
AiContentProvider
  generateWebsiteStory(input)
  generateSocialPost(input)
  generateSummary(input)
  generateFaq(input)
  generateAltText(input)
```

Provide:
- configured external provider implementation;
- deterministic mock provider for development/demo.

## Search abstraction

Create:
```text
search(query, filters, pagination, sort)
```
that returns normalized search results regardless of underlying index.

## Background processing
Where practical, isolate heavy tasks such as:
- PDF metadata extraction;
- image thumbnail generation;
- video metadata extraction;
- AI generation;
- large import operations.

The first demo can process these synchronously/asynchronously within the app where safe, but the architecture should not make a future job queue impossible.

## Security architecture
- validate input at server boundary;
- authorize every protected mutation;
- sanitize rich text;
- store uploads outside executable paths;
- use content-type checks;
- limit upload size;
- use signed URLs for private objects if necessary;
- avoid exposing database credentials to the client;
- protect admin server actions/API routes;
- audit significant admin mutations.

## SEO
Use Next.js metadata APIs, sitemap generation, robots configuration, stable slugs, canonical URLs, and structured data where appropriate.

## Observability
For the demo, provide development logging and a small internal audit log. Keep a clean seam where a production logging/error service can be integrated later.
