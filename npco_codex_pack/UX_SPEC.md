# UX Specification

## Navigation model

Primary routes:
- Home
- Explore
- Expeditions
- Research
- Data
- Publications
- Media
- Stories
- Events
- Education
- Opportunities
- About

Admin is separated from the public navigation.

## Information scent
Cards and search results must expose enough metadata for the user to decide whether to open the record. Avoid title-only grids.

## Progressive disclosure
Use summary -> key metadata -> full details. Keep secondary metadata in collapsible/secondary zones.

## Search UX
Search should be useful from the first keystroke without producing overwhelming instant results. Debounce where necessary. Support keyboard navigation through suggestions.

## Filter UX
Desktop: sticky/filter sidebar or horizontal filter bar depending on archive density.
Mobile: filter drawer with clear Apply/Clear actions.
Always show active filters and easy removal.

## Detail pages
Use a persistent contextual header where helpful. Provide breadcrumbs. The user should always know what entity they are inside and how it relates to the wider archive.

## Relationships
Related records are a first-class experience. Show them near the bottom of detail pages, and sometimes near the hero when they are central to context.

## Gallery
Treat images as scientific/media records. A lightbox without context is not enough.

## Data explorer
Provide both visual exploration and a metadata table/list equivalent.

## Document reader
The reading experience should remember context: document title, source, related expedition, related publication, and download/citation controls should not disappear behind the flipbook.

## Education path
Provide a calmer, more explanatory visual route that reuses repository objects rather than duplicating content manually.

## Admin
Optimize for speed and clarity rather than cinematic effects. Dense tables, keyboard-friendly controls, and predictable CRUD patterns are more valuable than visual spectacle.

## Accessibility acceptance
Every public route must be navigable by keyboard and understandable with reduced motion. The map and chart experiences require text/list equivalents.
