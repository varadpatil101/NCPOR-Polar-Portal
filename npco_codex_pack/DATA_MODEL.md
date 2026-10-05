# Data Model Requirements

The data model is intentionally relationship-rich. The user experience depends on being able to traverse scientific knowledge rather than opening isolated records.

## User / authorization

### User
- id
- email
- name
- password/auth provider fields as required
- roleId
- createdAt
- updatedAt

### Role
- id
- name
- permissions

## People and organizations

### Person
- id
- slug
- name
- title
- role
- organizationId
- bio
- expertise
- portraitMediaId
- externalLinks
- createdAt
- updatedAt

### Organization
- id
- name
- acronym
- description
- website
- logoMediaId

## Geography

### Station
- id
- slug
- name
- region
- latitude
- longitude
- description
- organizationId
- researchFocus
- activeStatus

### ExpeditionWaypoint
- id
- expeditionId
- sequence
- name
- latitude
- longitude
- date/time if known
- notes

## Research

### ResearchTopic
- id
- slug
- name
- description
- parentId optional

## Expeditions

### Expedition
- id
- slug
- title
- shortTitle
- region
- startDate
- endDate
- summary
- objectives
- status
- featured
- heroMediaId
- primaryStationId optional
- createdAt
- updatedAt

Relations:
- many people
- many topics
- many waypoints
- many reports
- many publications
- many datasets
- many media assets
- many stories
- many news items

## Publications

### Publication
- id
- slug
- title
- abstract
- year
- publishedDate
- journal
- volume
- issue
- pages
- doi
- persistentIdentifier
- externalUrl
- accessStatus
- fullTextReportId optional
- createdAt
- updatedAt

### PublicationAuthor
- publicationId
- personId
- authorOrder

Relations:
- topics
- expeditions
- datasets
- reports

## Datasets

### Dataset
- id
- slug
- title
- shortDescription
- fullDescription
- sourceOrganizationId
- geographicArea
- temporalStart
- temporalEnd
- accessStatus
- doi
- externalUrl
- license
- provenance
- featured
- createdAt
- updatedAt

### DatasetVariable
- id
- datasetId
- name
- unit
- description
- type

### DatasetCoverage
- id
- datasetId
- geometry or bounding fields
- region

Relations:
- expeditions
- publications
- stations
- topics
- media

## Reports / documents

### Report
- id
- slug
- title
- description
- documentType
- year
- mimeType
- fileKey
- pageCount
- coverMediaId
- accessStatus
- doi/persistentIdentifier
- processingStatus
- createdAt
- updatedAt

Relations:
- expedition
- publications
- datasets
- topics
- authors

## Media

### MediaAsset
- id
- slug
- type: IMAGE | VIDEO | AUDIO | OTHER
- title
- description
- caption
- altText
- fileKey
- thumbnailKey
- mimeType
- width
- height
- durationSeconds
- creatorPersonId
- takenAt
- latitude
- longitude
- rights
- license
- accessStatus
- processingStatus
- createdAt
- updatedAt

Relations:
- expedition
- station
- topic
- people
- stories
- news
- datasets

## Content

### NewsArticle
- id
- slug
- title
- excerpt
- bodyRichText
- heroMediaId
- authorId
- publishedAt
- status
- createdAt
- updatedAt

### Story
- id
- slug
- title
- subtitle
- storyType
- blocks JSON
- heroMediaId
- authorId
- publishedAt
- status
- createdAt
- updatedAt

### Event
- id
- slug
- title
- description
- startAt
- endAt
- timezone
- location
- onlineUrl
- eventType
- registrationUrl
- heroMediaId
- status

### Opportunity
- id
- slug
- title
- type
- description
- eligibility
- sourceOrganizationId
- applicationUrl
- deadline
- status

### EducationalResource
- id
- slug
- title
- description
- audience
- resourceType
- resourceUrl/fileKey
- topicIds
- ageRange optional

## Taxonomy

### Tag
- id
- slug
- name
- type

Use tag join tables or a generic relation pattern only where it stays type-safe and queryable.

## Generic relationship support

A `Relationship` table may be used for cross-entity "related to" references, but core relationships should remain explicit in the schema for integrity and query performance.

## Editorial workflow

### ContentRevision
- id
- contentType
- contentId
- revisionNumber
- status
- createdBy
- reviewerId
- notes
- snapshot JSON
- createdAt

## AI output

### AIContentDraft
- id
- sourceEntityIds JSON
- outputType
- audience
- channel
- tone
- text
- provider
- model
- generatedAt
- reviewStatus
- reviewedBy
- reviewNotes

## User convenience

### SavedItem
- userId
- entityType
- entityId
- createdAt

### ViewHistory
- userId nullable
- entityType
- entityId
- viewedAt

## Audit

### AuditLog
- id
- userId
- action
- entityType
- entityId
- metadata JSON
- createdAt

## Data integrity rules

- Slugs unique per entity type.
- DOI/persistent identifiers normalized before storage.
- Dates stored in UTC; render in contextual timezone.
- Geographic coordinates validated.
- Published records must have required provenance/content fields.
- Media cannot be published without a valid title/caption/rights state where applicable.
- Reports cannot be published if file processing has failed.
- Deletion should prefer archive/soft-delete where records may be referenced by publications or historical content.
