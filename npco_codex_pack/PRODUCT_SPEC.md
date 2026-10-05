# NCPOR Polar Knowledge & Outreach Portal
## Master Product Specification

## 0. Product identity

**Problem Statement ID:** 26063
**Problem Statement:** Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal
**Organization:** Ministry of Earth Sciences (MoES)
**Department:** National Centre for Polar and Ocean Research (NCPOR)
**Category:** Software
**Theme:** Smart Education

## 1. Product mission

Build a unified digital portal that archives and connects polar-science knowledge while making that knowledge discoverable and understandable to researchers, students, educators, outreach teams, media users, and the public.

The portal must support the full chain:

**discover -> explore -> understand -> read -> investigate -> connect -> download -> reuse -> disseminate**

It must bring expedition reports, scientific datasets, publications, photographs, videos, institutional activities, people, events, and outreach stories into a coherent information architecture. It must also provide a content-distribution layer that can transform structured scientific records into web stories and social-media-ready drafts.

## 2. Product thesis

The portal should feel like two systems fused correctly:

### Discovery world
Cinematic, editorial, visual, approachable, immersive, highly animated, designed for browsing and learning.

### Research world
Precise, searchable, metadata-rich, filterable, citation-friendly, document-focused, designed for deep work.

The user should be able to move from one world to the other without losing context.

## 3. Primary inspiration and boundaries

### Inspiration hierarchy
1. POLARIN: visual direction, modern institutional presentation, service-oriented information architecture, data discovery mindset, clean cards, subtle motion, hero storytelling, modern archive patterns.
2. UK Polar Network: outreach, education, events, training/opportunities, people/community structure, partner/community storytelling.
3. Additional competitor observations in the supplied reference documents: search/filtering, categorized archives, image galleries, data visualization, publication metadata/DOIs, people directories, event calendars, FAQs, funding/opportunity sections, newsletters, partner grids.

### Explicit boundary
Do not reproduce competitor layouts or source code. Do not reuse their logos, screenshots, written content, proprietary assets, or brand identifiers except where an item is part of the project's supplied factual content. Use them only to derive design patterns and feature ideas.

## 4. Target audiences

### Public explorer
Wants to understand polar science, view expeditions, browse stories, see imagery, learn about stations and discover current activity.

### Student / educator
Wants explainers, visualizations, educational resources, simple summaries, people profiles, events, FAQs, and approachable scientific content.

### Researcher
Wants datasets, publications, expedition reports, metadata, DOI links, related records, advanced search, geographic discovery, and downloads.

### Outreach / communications team
Wants approved source material, photographs, videos, story-building tools, social-media drafts, and reusable media.

### Portal editor
Creates and curates records, uploads media/documents, adds relationships, drafts content, submits for review, and publishes.

### Reviewer / administrator
Reviews submissions, manages permissions, monitors content quality, handles metadata integrity, and oversees the system.

## 5. Experience principles

1. **The poles are the visual setting, science is the substance.**
2. **Motion should reveal relationships.**
3. **Every archive entry should answer "why should I care?" before exposing every field.**
4. **Progressive disclosure prevents information overload.**
5. **A scientific object is more useful when its relationships are visible.**
6. **Search should behave like a discovery engine, not a database form.**
7. **Documents are experiences, not downloads.**
8. **Media should carry scientific context and provenance.**
9. **Data visualization should explain before it overwhelms.**
10. **Institutional trust comes from traceable metadata, clear provenance, and restrained visual design.**

## 6. Global application shell

### Desktop
- slim institutional utility band where appropriate;
- primary navigation with concise labels;
- search trigger always easy to reach;
- optional global "Explore" entry;
- visible active state;
- subtle background-fill/underline motion on hover inspired by the supplied POLARIN observations;
- sticky behavior only when it improves navigation.

### Mobile
- compact brand mark;
- menu drawer with clear hierarchy;
- search accessible within first interaction;
- no hover-dependent meaning;
- preserve page context when opening/closing navigation.

### Global search
The search interface must support a command-style/expanded overlay on desktop and an accessible full-screen/modal pattern on small screens.

The global search must eventually search across:
- expeditions;
- publications;
- datasets;
- reports;
- images;
- videos;
- people;
- news;
- stories;
- events;
- stations/infrastructure;
- research topics.

Results should expose result type, title, short summary, date/year, relevant tags, and key relationships.

## 7. Homepage specification

The homepage is the portal's primary storytelling surface. It must not become a dashboard clone.

### 7.1 Hero
- full-bleed polar image/video background;
- optional slow ambient movement;
- overlay for readability;
- high-confidence focal typography;
- small mission statement;
- 2 clear actions: explore polar world and explore knowledge archive;
- optional live/current activity indicator sourced from the database;
- subtle title transformation while scrolling: title scales down and transitions toward the content flow;
- hero background gradually yields to the body, following the supplied reference observation about a hero image being overtaken by the main canvas on scroll;
- motion must degrade gracefully on reduced-motion.

### 7.2 Polar pulse
A concise current-state strip or card cluster containing database-driven facts such as number of expeditions in the archive, publications, datasets, media assets, and latest activity. In demo mode, these are derived from the seeded dataset, not manually typed numbers.

### 7.3 Explore polar world
An interactive visual route into Arctic/Antarctic discovery. Desktop can use a stylized globe or polar map, with accessible list equivalents.

### 7.4 Featured expeditions
Use editorial cards with:
- expedition title;
- year/date range;
- region;
- concise mission objective;
- representative image;
- route/geo hint;
- linked counts for reports/publications/datasets/media.

### 7.5 Research highlights
Research categories with visually distinct panels. Hover motion should reveal additional context without making cards unstable.

### 7.6 Latest news / stories
News and research/outreach highlights should appear on the homepage in adjacent or consecutive sections, reflecting the supplied competitor research observation.

### 7.7 Data stories
At least one interactive visualization preview linking to the data explorer.

### 7.8 Gallery preview
A strong, curated photo strip/grid. Avoid a generic stock-photo wall.

### 7.9 Outreach CTA
Invite educators, students, researchers, and the public into tailored discovery paths.

### 7.10 Partners and institutional footer
Support a partner/sponsor/institution grid and comprehensive footer. Do not invent real partnership relationships; demo records must be labeled as sample where necessary.

## 8. Polar Explorer

Create a dedicated experience for geographic exploration.

### Core behavior
- polar region selector: Arctic / Antarctica / Both;
- map/globe visualization;
- research station markers;
- expedition route lines where route data exists;
- media location points where location metadata exists;
- dataset/research points where geographic metadata exists;
- layer controls;
- legend;
- search by place/station/expedition/topic;
- map result cards;
- side panel or bottom sheet on selection;
- deep links into entity pages.

### Station detail
Show:
- name;
- country/organization when appropriate;
- latitude/longitude;
- description;
- research focus;
- related expeditions;
- related people;
- media;
- datasets;
- publications.

### Map design constraint
Do not create a visually impressive globe that is disconnected from the data model. Geographic objects must be backed by actual records and relationships.

## 9. Expedition system

### Expedition index
- search;
- filters: region, year, status, research theme;
- visual timeline or year grouping;
- cards with representative imagery;
- pagination/infinite loading chosen based on dataset size.

### Expedition detail
Sections:
1. hero/identity;
2. mission overview;
3. objectives;
4. route/timeline;
5. participating researchers/people;
6. research themes;
7. reports;
8. datasets;
9. publications;
10. images;
11. videos;
12. field notes/stories;
13. related expeditions.

### Timeline interaction
Users should be able to move through expedition stages. Selecting a stage updates contextual details. Route and media should synchronize where location/time data exists.

## 10. Knowledge Archive

This is the core repository surface.

### Entity types
- Expeditions
- Publications
- Datasets
- Reports
- Photographs
- Videos
- Research topics
- People
- Stations/infrastructure
- Institutional activities
- News
- Stories
- Events
- Educational resources

### Archive landing
Avoid a wall of records. Start with:
- search;
- popular/recent categories;
- saved/recently viewed where account exists;
- clear filter entry;
- concise explanation;
- visual grouping by entity type.

### Result card design
Each card should expose the minimum decision-making information:
- type badge;
- title;
- 1-2 sentence abstract;
- date/year;
- 2-5 high-signal tags;
- relationship hints;
- primary action;
- secondary action where relevant.

### Filters
At minimum:
- region/geographical area;
- year/date;
- research field/topic;
- document type;
- media type;
- language;
- expedition;
- people/author;
- station/location;
- access status;
- publication status where applicable.

Filters must be reflected in URL query parameters so results are shareable.

## 11. Publication system

### Publication listing
Support:
- title;
- authors;
- year;
- journal/conference;
- research topic;
- DOI/persistent identifier;
- abstract;
- related expedition/dataset/topic.

### Publication detail
Provide a polished scholarly layout with:
- citation block;
- DOI/persistent ID as an external link;
- authors as links to people pages;
- related records;
- abstract;
- keywords;
- files when permitted;
- citation copy action.

### Citation formats
Support at least plain text and BibTeX. Structure the code so additional formats can be added later.

## 12. Report reader / flipbook

Create a premium in-browser document reading experience inspired by book-style scientific readers such as DearFlip, but implemented with appropriately licensed/open tooling rather than copying a proprietary plugin.

### Requirements
- load PDF pages through PDF.js or a stable equivalent;
- page-turn animation for desktop;
- fallback continuous-scroll PDF mode;
- single-page mode on mobile;
- thumbnail navigation;
- page number indicator;
- zoom in/out;
- fit-to-width / fit-page;
- fullscreen;
- search within document when feasible;
- table-of-contents support when PDF structure allows it;
- download original PDF;
- print action where technically appropriate;
- keyboard navigation;
- screen-reader fallback exposing document title and standard PDF controls;
- progress persistence per document for authenticated users if enabled;
- metadata panel;
- related expedition/publications/datasets;
- citation info.

### Performance
Do not eagerly render hundreds of pages. Use progressive loading, virtualization or page-windowing, and show a meaningful loading indicator.

### PDF security
Treat uploaded files as untrusted. Validate MIME/content where possible, store safely, and never execute uploaded files.

## 13. Dataset explorer

### Dataset card
Show:
- title;
- short description;
- geographic area;
- temporal coverage;
- key parameters/variables;
- source/owner field;
- access status;
- file/resource links;
- identifier/DOI when present;
- related expedition/publication.

### Dataset detail
Tabs or sections:
- overview;
- metadata;
- geographic coverage;
- temporal coverage;
- variables;
- preview/visualization;
- files/access;
- provenance;
- related research;
- related publications;
- citation.

### Data visualization
Support small but meaningful interactive visualizations such as:
- time series;
- categorical distributions;
- location plots;
- parameter comparisons.

Visualizations must show source metadata and clearly distinguish sample/demo data from official data when applicable.

## 14. Media gallery

Create a dedicated gallery because the supplied competitor research identified the absence of dedicated galleries on many institutional sites as a missed opportunity.

### Gallery index
- masonry or balanced grid on large screens;
- accessible standard grid on small screens;
- filter by topic/object;
- filter by expedition;
- filter by region;
- filter by year;
- image/video toggle;
- keyword search.

### Media detail/lightbox
- high-resolution viewing;
- caption;
- photographer/creator when available;
- date;
- location;
- expedition;
- scientific topic;
- rights/license metadata;
- download when permitted;
- shareable URL;
- related records.

Do not strip provenance from media.

## 15. News and stories

### News
- latest list;
- year/date archive;
- category/tag filters;
- rich article page;
- related records;
- share actions;
- author and publication date.

### Stories
Use a more editorial visual system for narrative pieces:
- field diary;
- scientist spotlight;
- explainer;
- photo essay;
- research story;
- educational feature.

Stories can be built from reusable content blocks so editors do not need a developer for every article.

## 16. Events

Provide:
- month/calendar view;
- list view;
- event detail;
- category/type;
- location or online indicator;
- registration/external link;
- related topics and people;
- past/upcoming filtering.

Event dates must be timezone-aware.

## 17. People / contributors

Profiles for researchers, editors, educators, volunteers, staff, contributors, and partners where appropriate.

Profile fields:
- name;
- role/title;
- organization;
- portrait;
- short bio;
- expertise/topics;
- expeditions;
- publications;
- datasets;
- stories/news;
- social/external links when supplied.

Do not infer qualifications or affiliations.

## 18. Education and outreach

A public education layer inspired by the UK Polar Network's outreach emphasis.

Include:
- explainers;
- classroom/educator resources;
- FAQs;
- student pathways;
- events/workshops;
- career discovery;
- simple data stories;
- polar glossary.

The educational layer should never compromise scientific accuracy. Complex concepts can be simplified in language, not falsified in meaning.

## 19. Opportunities / funding / training

Provide structured listings for:
- training;
- fellowships;
- scholarships;
- funding calls;
- internships;
- workshops;
- volunteer opportunities.

Each record should have deadline/status/eligibility/source information. Avoid presenting expired records as current.

## 20. Outreach content generator

### Objective
Let an editor turn structured repository content into dissemination-ready drafts.

### Inputs
- selected entity/entities;
- audience;
- channel;
- tone;
- length;
- reading level;
- optional key message.

### Outputs
- website article draft;
- short social caption;
- LinkedIn-style post;
- short announcement;
- student-friendly summary;
- FAQ draft;
- visual caption/alt-text suggestion.

### AI architecture
Use a provider adapter so the application can support an OpenAI-compatible provider when an API key is configured. Provide a deterministic local fallback for demo/dev so the UI remains functional without credentials.

Never claim generated text is factual verification. Display a clear editor-review stage before publication.

### Provenance
Generated drafts must store:
- source entity IDs;
- generation timestamp;
- model/provider identifier if known;
- prompt/config summary where safe;
- editor/reviewer status.

## 21. Admin CMS

### Roles
- Visitor
- Registered user
- Editor
- Reviewer
- Administrator

### Admin dashboard
Show database-driven summaries:
- drafts needing review;
- scheduled/upcoming events;
- recent uploads;
- content by type;
- failed processing jobs;
- media requiring metadata;
- recent activity.

Do not fabricate metrics.

### CRUD
Editors must be able to create/edit/archive:
- expeditions;
- publications;
- datasets;
- reports;
- media;
- people;
- stations;
- events;
- news;
- stories;
- opportunities;
- educational resources.

### Relationships
Admin forms must allow attaching related entities. Prefer searchable relation pickers rather than giant dropdowns.

### Publishing workflow
Draft -> Review -> Approved -> Published -> Archived

Support:
- status;
- author/editor;
- last modified;
- reviewer;
- timestamps;
- optional scheduled publish time.

### Media upload
Support safe upload and metadata editing. Generate thumbnails/previews as appropriate. Preserve original file and metadata when possible.

## 22. Authentication and authorization

- Public pages accessible without login unless explicitly private.
- Admin routes protected server-side, not only by hiding links.
- Role checks enforced in API/server actions.
- Never trust role information from the client.
- Session expiration and logout must work.
- Validation must exist at both UI and server boundaries.

## 23. Saved/recent behavior

For authenticated users, optionally support:
- bookmark publication;
- bookmark dataset;
- save expedition;
- recently viewed;
- reading progress for reports.

For visitors, use local storage only for non-sensitive conveniences such as recently viewed IDs.

## 24. Notification / subscription surfaces

Provide newsletter subscription UI, but make it functional through a provider abstraction. In local/demo mode, submissions can be stored in the database with an explicit demo/dev status.

## 25. Footer

Footer should contain:
- institutional identity;
- navigation;
- research/discovery links;
- outreach links;
- contact information from configured content;
- partners section;
- social links from configuration;
- privacy/accessibility/terms placeholders if required;
- back-to-top affordance.

## 26. Search engine behavior

Implement a two-stage search strategy that can start with PostgreSQL full-text/trigram search and remain replaceable with a dedicated search engine later.

Search features:
- weighted fields;
- typo tolerance where practical;
- exact-phrase preference;
- entity-type filtering;
- related entity suggestions;
- recent searches locally for signed-out users;
- result highlighting;
- query preserved in URL.

## 27. Content provenance

Every scientific/content record should have a provenance-friendly metadata shape, even if some fields are optional:
- source organization;
- original source URL where supplied;
- creator/author;
- date created;
- date published;
- license/rights;
- external identifier;
- verification/review status.

## 28. SEO and sharing

- meaningful title/meta descriptions;
- Open Graph/Twitter cards;
- canonical URLs;
- sitemap;
- robots config;
- structured data for articles/events where appropriate;
- shareable entity URLs;
- stable slugs.

## 29. Performance targets

Aim for excellent real-world performance:
- fast first meaningful render;
- optimized responsive images;
- lazy-loaded media;
- code-splitting for heavy map/3D/PDF features;
- avoid blocking the homepage with large JS bundles;
- defer advanced visualization libraries until needed;
- virtualize large archives.

Do not sacrifice core accessibility or interaction quality merely to chase a synthetic score.

## 30. Accessibility

Minimum:
- semantic structure;
- keyboard navigation;
- visible focus;
- accessible names;
- proper labels;
- logical heading hierarchy;
- captions/transcripts for video where available;
- meaningful alt text or explicit decorative treatment;
- reduced-motion support;
- sufficient contrast;
- screen-reader-friendly alternatives for maps and charts;
- modal focus trapping and escape behavior.

## 31. Error, empty and loading states

Create intentional states for:
- archive no results;
- filter no results;
- entity missing;
- API error;
- upload processing;
- PDF load failure;
- map load failure;
- AI provider unavailable;
- image missing;
- video unavailable;
- unauthorized admin action;
- network offline when relevant.

Empty states should explain what the user can do next.

## 32. Seed/demo data

The demo dataset should be small enough to understand but rich enough to demonstrate relationships.

Create coherent synthetic sample records across:
- at least 6 expeditions;
- at least 20 publications;
- at least 12 datasets;
- at least 10 reports/documents;
- at least 40 photos/media items;
- at least 8 videos or video placeholders;
- at least 15 people;
- at least 8 stations/infrastructure records;
- at least 15 news/stories;
- at least 12 events;
- at least 10 opportunities/education records.

All sample content must be clearly marked as demo/synthetic where there is any risk of confusing it for official NCPOR information.

## 33. Visual language

### Color philosophy
Primary: deep polar/navy family.
Surface: snow/ice whites and cool neutrals.
Accent: controlled cyan/teal.
Optional aurora gradients reserved for hero/brand moments, not every card.

### Typography
Use a modern sans-serif family with strong multilingual coverage if possible. Use 1 display scale and 1 body system with a consistent rhythm.

### Shape
Moderately rounded, editorially restrained. Avoid overly bubbly SaaS styling.

### Cards
Cards should feel like windows into a scientific object. Use image, category, title, summary, and metadata hierarchy.

### Iconography
Consistent icon set. No random emoji used as UI icons.

## 34. Motion philosophy

Use motion to:
- establish hierarchy;
- connect pages;
- reveal hidden information;
- communicate loading/progress;
- emphasize geographic relationships;
- create continuity during transitions.

Avoid:
- constant floating objects;
- excessive cursor trails;
- huge zooms that induce motion discomfort;
- autoplay audio;
- animations that delay access to content.

## 35. Originality requirement

The finished system should be recognizably inspired by contemporary polar-science design patterns but clearly original. It should not be a visual clone of POLARIN, UKPN, Polar Collective, Npolar, or any other reference.

## 36. Technical quality bar

The application should be maintainable enough that a new contributor can:
- understand the domain model;
- find an entity's list/detail/admin code quickly;
- add another content type without rewriting the app;
- run the project locally with documented steps;
- run tests and a production build;
- understand required environment variables;
- seed and reset demo data.

## 37. Final product feeling

The final result should feel like:

**a digital polar field station for knowledge**

rather than:

**a government content management system wearing an iceberg wallpaper.**

The visual experience may be cinematic. The underlying information architecture must be sober, traceable, searchable, and useful.
