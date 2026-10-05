# Design System Specification

## 1. Design north star

Modern polar editorial design with scientific precision. POLARIN is the primary inspiration for restraint, cards, hero composition and institutional polish. The final system must remain original.

## 2. Tokens

Create centralized tokens for:
- colors;
- typography sizes/weights/line heights;
- spacing;
- radii;
- shadows;
- borders;
- z-index layers;
- motion durations/easings;
- content widths;
- breakpoints.

Prefer CSS variables with typed utility access.

## 3. Color roles

Define semantic roles rather than raw colors:
- background-primary
- background-secondary
- surface
- surface-elevated
- text-primary
- text-secondary
- text-muted
- border-subtle
- accent
- accent-strong
- success
- warning
- error
- info

## 4. Typography

Use fluid display sizes with clamp() where helpful. Avoid too many font sizes. Establish:
- display-xl
- display-lg
- heading-xl
- heading-lg
- heading-md
- heading-sm
- body-lg
- body-md
- body-sm
- caption
- mono/meta

Use tabular numbers for statistics.

## 5. Layout

Use a central max-width with generous whitespace on editorial pages. Research/archive pages may use wider content widths.

Provide reusable layouts:
- FullBleed
- Container
- SplitHero
- Section
- ContentGrid
- DetailShell
- ArchiveShell
- AdminShell
- DashboardShell

## 6. Core components

Build reusable primitives:
- Button
- IconButton
- LinkButton
- Badge
- Tag
- Breadcrumbs
- Tabs
- Accordion
- Card
- MediaCard
- EntityCard
- StatCard
- SearchBar
- FilterPanel
- FilterChip
- Pagination
- Modal/Dialog
- Drawer
- Tooltip
- Toast
- Skeleton
- EmptyState
- ErrorState
- LoadingIndicator
- DataTable
- Timeline
- MapPanel
- ChartPanel
- MediaViewer
- DocumentViewer
- ShareMenu
- CitationBlock
- RelationList
- PersonCard
- EventCard
- NewsCard

## 7. Interaction details

Hover effects should be short, subtle and compositional:
- image scale around 1.02-1.04;
- title color/underline transition;
- card elevation shift;
- metadata reveal only if it does not destabilize layout.

Do not rely on hover for essential information.

## 8. Navigation motion

The top navigation can use a bottom-to-top accent fill or reveal motion inspired by the supplied notes. It must not cause layout shifts or obscure dropdown contents.

## 9. Hero treatment

Use an image or looped muted video only when it improves comprehension/brand. Provide poster image fallback. Keep copy readable over the media.

## 10. Archive treatment

The archive should visually calm down relative to the homepage. Use white/cool-neutral surfaces, restrained blue/cyan accents, consistent cards, predictable filter controls, and strong density control.

## 11. Data visualization treatment

Charts need:
- title;
- explanatory subtitle;
- axes/labels;
- source/provenance;
- accessible text summary;
- hover/focus details;
- loading/empty/error state.

Use consistent chart typography and semantic colors.

## 12. Responsive rules

Do not merely shrink desktop. Recompose:
- grids collapse logically;
- filters become drawers;
- side panels become bottom sheets or stacked sections;
- maps expose list alternatives;
- flipbook becomes single-page reader;
- tables gain horizontal scroll or card fallback.

## 13. Dark mode

If implemented, it should be a deliberate second visual theme, not an inversion filter. Do not prioritize it over the core light/polar experience unless the product direction later requires it.

## 14. Branding

Use an original portal wordmark/mark direction based on polar geometry. Do not imitate competitor logos. The implementation should allow official NCPOR/MoES branding assets to be inserted later without rewriting layout code.
