# Codex Execution Prompts

Use these as milestone prompts after the repository contains `AGENTS.md` and the specification files. Each prompt assumes Codex can inspect the repo and prior changes.

## Bootstrap / reconnaissance prompt

```text
Read AGENTS.md first. Then read PRODUCT_SPEC.md, ARCHITECTURE.md, DESIGN_SYSTEM.md, UX_SPEC.md, ANIMATION_SPEC.md, DATA_MODEL.md, and PLAN.md as needed for the current task.

Do not start by coding blindly.

First inspect the entire repository, package manager, existing app structure, database state, current routes, tests, configuration, and assets. Preserve good existing work.

Create/update a concrete implementation plan for the NCPOR Polar Knowledge & Outreach Portal based on the repository you actually find. Identify risks, missing infrastructure, and the first implementation slice.

After the plan is internally consistent, implement only the foundation slice required for the first milestone. Run the relevant validation commands. Fix failures. Update PLAN.md.

Do not fabricate scientific facts or copy competitor assets/code.
```

## Milestone 1 - Foundation

```text
Implement Milestone 1 from PLAN.md.

Goal: establish a reliable application foundation for the portal without building the full visual product yet.

Requirements:
- current stable framework versions at implementation time;
- strict TypeScript;
- lint/format/typecheck;
- test runner;
- Playwright smoke test;
- environment validation;
- Prisma/PostgreSQL integration;
- seed/reset commands;
- basic error handling;
- route structure compatible with PRODUCT_SPEC.md;
- no fake or hard-coded business data in components.

Acceptance criteria:
1. Fresh setup can install dependencies.
2. Database can migrate and seed.
3. App runs locally.
4. Typecheck/lint/tests/build pass.
5. A basic shell exists.
6. PLAN.md is updated.

When done, summarize only actual changes and validation results.
```

## Milestone 2 - Design system + shell

```text
Implement Milestone 2 and the public application shell.

Read DESIGN_SYSTEM.md and ANIMATION_SPEC.md closely.

Build reusable tokens and primitives before composing page-specific UI.

Create:
- typography system;
- color tokens;
- spacing/radius/shadow tokens;
- container/layout primitives;
- buttons/links/badges/tags;
- cards;
- dialogs/drawers/tabs/accordions;
- skeleton/error/empty states;
- responsive navigation;
- global footer shell;
- motion utilities;
- prefers-reduced-motion handling.

The visual direction should be polished and original, inspired by modern polar-science editorial design. Do not imitate POLARIN source/layout.

Acceptance criteria:
- components are reusable;
- keyboard navigation works;
- focus states are visible;
- mobile navigation works;
- no visible layout shift from hover effects;
- reduced-motion mode is functional;
- tests/build pass.
```

## Milestone 3 - Homepage

```text
Implement the production-quality homepage described in PRODUCT_SPEC.md §7.

The homepage should feel cinematic but remain fast and accessible.

Build the sections in order:
1. immersive hero;
2. polar pulse from database counts;
3. polar explorer teaser;
4. featured expeditions;
5. research highlights;
6. news/stories;
7. data story;
8. gallery preview;
9. outreach routes;
10. partners/footer.

Use real seeded records. Do not hard-code counts or pretend that demo data is official.

Implement the hero scroll choreography from ANIMATION_SPEC.md. Make it elegant, not excessive.

Add loading, empty, error, and reduced-motion behavior.

Run Playwright against the most important homepage interactions, then typecheck/lint/build.
```

## Milestone 4 - Domain data

```text
Implement the data model and repository/service layer according to DATA_MODEL.md.

Do not create database entities merely to satisfy the schema. Wire them into real application services.

Build coherent synthetic seed content with explicit demo/synthetic labeling where appropriate.

Verify that one expedition can connect to publications, datasets, reports, people, media, topics, and waypoints.

Verify relation queries through automated tests.
```

## Milestone 5 - Polar Explorer

```text
Implement the Polar Explorer.

Requirements:
- Arctic/Antarctica selection;
- station markers from database;
- expedition route rendering from waypoints;
- optional media/data overlays;
- filter/layer control;
- selected-object detail panel;
- deep links;
- accessible list alternative;
- responsive mobile composition.

Use a map library appropriate for polar data. Do not create a decorative map with fake points.

Performance requirement: lazy-load heavy map code and avoid shipping unnecessary map libraries to pages that do not use them.
```

## Milestone 6 - Expeditions

```text
Implement the expedition index/detail experience.

Use URL-persisted filters. Provide a visual timeline and route context. Expose relationships to reports, publications, datasets, people, media, and research topics.

Animations should communicate movement through the expedition chronology.

Test deep-linking from homepage -> expedition -> related publication -> archive -> back.
```

## Milestone 7 - Archive + search

```text
Implement the unified knowledge archive and global search.

Search across multiple entity types with normalized result cards.

Filters must include at minimum:
- region;
- year/date;
- research topic;
- document/media type;
- language where data exists;
- expedition;
- people/author;
- station/location;
- access status.

Persist query/filter state in URLs.

The archive must be calm, readable, and not visually overwhelming.

Implement robust no-result and error states. Add automated tests for search combinations and pagination/filter behavior.
```

## Milestone 8 - Publications + flipbook

```text
Implement publications and the report/PDF reader.

The reader should provide a polished DearFlip-inspired book experience using properly licensed/open components.

Requirements:
- PDF.js rendering;
- page-turning on desktop;
- single-page/scroll fallback;
- page thumbnails;
- zoom;
- fit modes;
- fullscreen;
- search where feasible;
- keyboard navigation;
- download;
- metadata/citation panel;
- related records;
- mobile optimized reader.

Do not load all PDF pages at once. Use progressive rendering/windowing.

Add a sample PDF to the demo environment only if legally/technically appropriate; otherwise generate a simple synthetic sample document or use a project-created test PDF.
```

## Milestone 9 - Data explorer

```text
Implement dataset archive/detail pages and at least three reusable visualization patterns: time series, categorical distribution, and geographic coverage/point display.

Every chart must include a title, explanation, source/provenance field, and accessible textual summary.

Demo data must be explicitly synthetic/demo where necessary.
```

## Milestone 10 - Media gallery

```text
Implement the media archive and gallery.

Requirements:
- image/video filtering;
- expedition/topic/region/year filters;
- responsive gallery;
- keyboard-accessible lightbox;
- metadata and provenance;
- rights/license display;
- download behavior based on access status;
- related records.

Do not make the gallery a wall of identical cards. Build visual rhythm while preserving scanability.
```

## Milestone 11 - Content/community

```text
Implement news, stories, events, people, education resources, opportunities, and related content navigation.

Create a coherent editorial system rather than a collection of isolated pages.

Reuse repository objects in stories and education pages where possible.
```

## Milestone 12 - Admin CMS

```text
Implement admin authentication, authorization, dashboard, CRUD, media uploads, relation pickers, editorial workflow, scheduling, and audit log.

All authorization must be enforced server-side.

Admin UI should optimize for data accuracy and speed, not visual spectacle.

Create deterministic demo admin credentials through environment configuration or a documented development-only seed mechanism. Never commit production secrets.
```

## Milestone 13 - Outreach generator

```text
Implement the outreach/content-generation layer.

Create an AI provider adapter plus deterministic local fallback.

The editor selects repository records, audience, channel, tone, and length. The system generates a draft with source-record provenance, timestamp, provider/model metadata when available, and review status.

Require human review before publication.

Do not represent generated content as verified scientific fact.

Test the feature both with the fallback provider and with a configurable external provider interface.
```

## Milestone 14 - Final hardening

```text
Perform a full product audit against PRODUCT_SPEC.md and PLAN.md.

Check every public route, archive interaction, map interaction, document viewer, gallery interaction, admin flow, and outreach flow.

Fix:
- broken navigation;
- console errors;
- runtime exceptions;
- accessibility failures;
- responsive issues;
- loading/error/empty-state gaps;
- poor performance caused by large bundles;
- inconsistent typography/spacing;
- animation overload;
- metadata/SEO omissions;
- security/authorization gaps.

Run lint, typecheck, unit/integration tests, Playwright, and production build. Keep iterating until the checks pass or a concrete external dependency blocks completion.

Update PLAN.md and documentation.
```
