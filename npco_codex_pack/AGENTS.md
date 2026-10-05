# NCPOR Polar Knowledge & Outreach Portal - AGENTS.md

## Mission
You are working on a production-quality prototype for Problem Statement 26063: an integrated polar science outreach portal, knowledge repository, and media dissemination system for NCPOR under the Ministry of Earth Sciences.

The product is not a marketing landing page. It is a functional knowledge platform with a cinematic public experience and a serious research/archive experience underneath it.

## Non-negotiable product principles
1. Functionality over visual illusion. UI must be wired to real application state, routes, APIs, and database records whenever the feature claims to be functional.
2. No fabricated scientific facts. Seed/demo content must be clearly synthetic or sourced from explicitly supplied/reference material. Never present invented measurements as real NCPOR science.
3. Do not scrape, clone, or copy competitor source code, assets, branding, logos, layouts, or copyrighted text. Competitor sites are inspiration only.
4. POLARIN is the primary visual inspiration; UK Polar Network is a secondary inspiration for outreach, events, education, opportunities, people, and community-oriented information architecture.
5. The visual language must be original: polar editorial + scientific visualization + modern institutional product.
5a. The production architecture is **cloud-backend-first with Supabase**: local development means the web application runs on the user’s computer while database/auth/storage live in Supabase. Do not replace Supabase with a local database as the primary backend.
6. Animation must communicate hierarchy, state, navigation, spatial relationships, or discovery. Avoid animation for animation's sake.
7. Respect `prefers-reduced-motion` everywhere.
8. All pages and components must work on desktop, tablet, and mobile unless a feature is explicitly desktop-only and the UI explains why.
9. Accessibility is a product requirement, not a later enhancement. Use semantic HTML, keyboard support, focus states, ARIA only where needed, contrast, captions/transcripts, and reduced-motion handling.
10. Reuse design tokens and primitives. Do not create one-off spacing, colors, radii, shadows, or typography values without a documented reason.
11. Keep the application modular. Domain logic belongs in domain/service modules, not buried inside presentation components.
12. Every meaningful async interaction needs loading, success, error, empty, and retry states where applicable.
13. Avoid huge client components. Prefer server rendering/data fetching where appropriate, and isolate client-side interaction to focused components.
14. Do not leave dead buttons. A visible action must navigate, open a real interaction, mutate data, download something, or clearly state why it is unavailable.
15. Never hide errors with silent fallbacks. Surface actionable error messages and log useful diagnostics in development.
16. Keep dependencies justified and current at implementation time. Prefer stable, well-maintained open-source packages.
17. Do not hard-code data that belongs in the database or content model.
18. Seed data must make the demo feel coherent and interconnected: expeditions, publications, datasets, reports, people, media, stories, news, and events should reference each other.
19. Build for progressive enhancement. Rich visual features should have useful static or accessible equivalents.
20. Before declaring a milestone complete, run the project's validation suite and fix regressions rather than merely reporting them.

## Working style for Codex
- First inspect the repository and existing instructions before changing architecture.
- For a major milestone, first produce or update the implementation plan, then implement.
- Work in small coherent slices. After each slice, run relevant checks.
- Read the relevant section of `PRODUCT_SPEC.md`, `ARCHITECTURE.md`, `DESIGN_SYSTEM.md`, `UX_SPEC.md`, `ANIMATION_SPEC.md`, and `DATA_MODEL.md` before implementing a feature covered by those documents.
- Update `PLAN.md` checkboxes/status after completing a milestone.
- Preserve working functionality while adding polish.
- Prefer boring, explicit code for data integrity and security, and reserve creativity for product UX and visual design.

## Required verification mindset
At minimum, when the project supports these scripts, use:
- lint
- typecheck
- unit/integration tests
- Playwright smoke/e2e tests
- production build

If one is not available yet, create the smallest appropriate infrastructure for it as part of the foundation milestone.

## Definition of done
A feature is done only when:
- its UI exists and is responsive;
- its core behavior works with seeded data;
- its data path is connected end-to-end where relevant;
- loading/error/empty states exist;
- accessibility basics work;
- the relevant tests/checks pass;
- no obvious console/runtime errors remain;
- documentation is updated where behavior or architecture changed.
