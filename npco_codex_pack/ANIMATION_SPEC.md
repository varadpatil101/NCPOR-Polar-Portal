# Animation and Interaction Specification

## Principle
Animation is choreography for information. Every meaningful animation should answer at least one of: where did this come from, what changed, what can I interact with, or what is loading?

## Global motion tokens
Create:
- instant: 80-120ms
- quick: 140-220ms
- standard: 240-360ms
- expressive: 450-800ms
- cinematic: 900-1600ms

Use smooth transform/opacity properties first. Avoid layout-thrashing animation.

## Page entry
Use subtle fade/translate or clip transitions for page content. Never delay usability behind an intro animation.

## Hero scroll choreography
1. Hero begins full-height.
2. Background media has a restrained scale/parallax effect.
3. Hero title subtly reduces in scale while scrolling.
4. Hero visual loses dominance as the body canvas overlaps/continues.
5. The title may settle into a compact contextual heading.
6. Reduced-motion mode removes parallax/scaling and uses simple fades.

## Card hover
- image scale: tiny;
- border/elevation shift;
- CTA affordance movement by a few pixels;
- no bouncing.

## Navigation hover
Use accent fill/reveal from bottom to top or equivalent transform-based reveal. Keep the active state clearly visible.

## Archive filtering
When filters change:
- preserve page shell;
- animate result content with opacity/transform;
- do not animate hundreds of DOM nodes simultaneously;
- use skeleton or progress if network latency exists.

## Map selection
Selecting a station/route/data point should animate the side panel into place and emphasize the corresponding map marker/region. Provide focusable list equivalent.

## Expedition timeline
Use progressive highlighting of the route/timeline. Selecting a milestone should update related content with a short crossfade.

## Flipbook
Page turns should feel physical but not slow. Avoid continuous 3D effects on mobile. Provide instant jump controls for accessibility and usability.

## Gallery lightbox
Use a smooth shared-element style transition when practical. Ensure focus management and close behavior work with keyboard and screen readers.

## Charts
Animate initial draw only when it helps comprehension. Provide a reduced-motion static rendering.

## Loading
Prefer skeletons that resemble final geometry. Avoid generic spinners for full-page loading when a content skeleton can communicate structure.

## Reduced motion
All non-essential motion must respect `prefers-reduced-motion`. In reduced motion:
- remove parallax;
- remove page-flip 3D motion or make it instant;
- disable large-scale transitions;
- keep state changes visible using opacity or static style changes only.

## Motion quality checklist
Before milestone completion, test:
- 60-ish fps feel on normal hardware where practical;
- no visible layout jumping;
- no horizontal overflow;
- animations do not block clicks;
- focus remains predictable;
- mobile is not overloaded.
