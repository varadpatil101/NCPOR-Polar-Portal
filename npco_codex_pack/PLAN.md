# Implementation Plan and Checkpoints

Status values: [ ] not started, [~] in progress, [x] complete.

## Milestone 0 - Repository reconnaissance
[x] Inspect existing repository and preserve useful work.
[x] Confirm package manager and runtime.
[x] Identify existing app structure.
[x] Produce a concrete implementation plan before major code edits.

## Milestone 1 - Foundation
[x] Configure TypeScript strictness.
[x] Configure lint/typecheck.
[x] Configure test runner.
[x] Configure Playwright.
[x] Configure environment validation.
[x] Add base app shell.
[x] Add Supabase SQL database schema (cloud-first; no local database).
[x] Add deterministic demo seed SQL.
[x] Add baseline error/empty handling.

## Milestone 2 - Design system
[x] Create tokens.
[x] Create typography system.
[x] Create layout primitives.
[x] Create buttons/links/badges/cards.
[~] Create overlay primitives.
[x] Add responsive rules.
[x] Add reduced-motion support.

## Milestone 3 - Public shell + homepage
[x] Navigation.
[x] Hero.
[x] Polar pulse.
[x] Explore section.
[x] Featured expeditions.
[x] Research highlights.
[x] News/stories preview.
[x] Data story preview.
[x] Gallery preview.
[x] Institutional/demo footer.

## Milestone 4 - Data/domain foundation
[ ] Complete domain schema.
[ ] Implement repository/services.
[ ] Create seed records.
[ ] Ensure cross-links are real.
[ ] Add admin-safe server validation.

## Milestone 5 - Polar Explorer
[ ] Map.
[ ] Station records.
[ ] Expedition waypoints/routes.
[ ] Layers.
[ ] Selection panel.
[ ] Accessible list fallback.

## Milestone 6 - Expeditions
[ ] Index.
[ ] Filters.
[ ] Detail.
[ ] Timeline.
[ ] Media relationships.
[ ] Publications/dataset/report relationships.

## Milestone 7 - Knowledge Archive + Search
[ ] Unified archive.
[ ] Entity-type filtering.
[ ] Advanced filters.
[ ] URL-persisted filters.
[ ] Search highlighting.
[ ] Pagination/virtualization.
[ ] Empty/error states.

## Milestone 8 - Publications + document reader
[ ] Publication index.
[ ] Publication detail.
[ ] DOI/citation.
[ ] PDF rendering.
[ ] Flipbook.
[ ] Search/zoom/fullscreen/download.
[ ] Mobile reader.

## Milestone 9 - Datasets + visualizations
[ ] Dataset index.
[ ] Dataset detail.
[ ] Metadata.
[ ] Variables.
[ ] Geographic/temporal coverage.
[ ] Visualizations.
[ ] Provenance.

## Milestone 10 - Media gallery
[ ] Image/video index.
[ ] Filters.
[ ] Lightbox/detail.
[ ] Media metadata.
[ ] Download/rights handling.

## Milestone 11 - News, stories, events, people, education
[ ] News.
[ ] Stories.
[ ] Event calendar.
[ ] People directory.
[ ] Education resources.
[ ] Opportunities.

## Milestone 12 - Admin CMS
[ ] Authentication.
[ ] Role-based authorization.
[ ] Dashboard.
[ ] CRUD.
[ ] Media uploads.
[ ] Relations.
[ ] Draft/review/publish workflow.
[ ] Audit log.

## Milestone 13 - Outreach generator
[ ] AI provider abstraction.
[ ] Demo fallback provider.
[ ] Generation UI.
[ ] Provenance.
[ ] Review workflow.
[ ] Regeneration/versioning.

## Milestone 14 - Polish
[ ] Responsive audit.
[ ] Accessibility audit.
[ ] Performance audit.
[ ] Visual consistency pass.
[ ] Error-state pass.
[ ] SEO/social metadata.
[ ] Security pass.
[ ] Production build.

## Milestone 15 - Demo hardening
[ ] Create deterministic seed/reset workflow.
[ ] Verify all major paths from fresh database.
[ ] Verify every visible CTA.
[ ] Verify no dead routes.
[ ] Verify admin login/demo flow.
[ ] Verify document reader with sample PDF.
[ ] Verify gallery with sample assets.
[ ] Verify search across multiple entity types.
[ ] Verify map with seeded locations.

## Definition of complete
All milestones required for the selected project scope must be [x] only after tests, build, and manual smoke testing by Codex itself have passed. Codex should continue fixing concrete failures rather than merely reporting them.
