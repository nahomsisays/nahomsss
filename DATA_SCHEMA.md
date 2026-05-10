# DATA_SCHEMA.md

## Overview
This schema defines MVP data structures for AI Infrastructure Atlas.

Primary goals:
- Preserve evidentiary rigor
- Distinguish fact from inference
- Keep facilities and claims queryable
- Support future migration to relational/PostGIS models

---

## 1) Enumerations

### `ai_relevance_tier`
- `confirmed_ai_relevant`
- `likely_ai_relevant`
- `possibly_ai_relevant`
- `strategic_ai_infrastructure_campus`

### `knowledge_status`
- `confirmed_fact`
- `strong_inference`
- `weak_inference`
- `unknown`

### `claim_assessment`
- `supported`
- `unsupported`
- `exaggerated`
- `contradicted`
- `unclear`

### `source_type`
- `company_statement`
- `regulatory_filing`
- `government_record`
- `utility_document`
- `environmental_permit`
- `planning_document`
- `news_report`
- `investigative_report`
- `satellite_or_geospatial`
- `academic_research`
- `other`

---

## 2) Core Entities

### A) `facility`
Represents a single site/campus with potential AI relevance.

Suggested fields:
- `facility_id: string` (stable unique ID)
- `name: string`
- `state: string`
- `county: string | null`
- `city_or_locality: string | null`
- `lat: number`
- `lng: number`
- `ai_relevance_tier: ai_relevance_tier`
- `knowledge_status: knowledge_status` (overall confidence)
- `status_note: string` (brief rationale)
- `operational_status: string | null` (planned, under_construction, active, expansion, unknown)
- `summary: string`
- `created_at: string (ISO timestamp)`
- `updated_at: string (ISO timestamp)`

### B) `entity`
Represents organizations connected to facilities.

Fields:
- `entity_id: string`
- `name: string`
- `entity_type: string` (owner, operator, tenant, financier, utility, contractor, regulator, etc.)
- `hq_country: string | null`
- `notes: string | null`

### C) `facility_entity_link`
Many-to-many relation between facilities and entities.

Fields:
- `facility_entity_link_id: string`
- `facility_id: string`
- `entity_id: string`
- `relationship_type: string` (owner, operator, customer, lender, investor, utility_partner, etc.)
- `knowledge_status: knowledge_status`
- `start_date: string | null`
- `end_date: string | null`
- `notes: string | null`

### D) `impact_metrics`
Potential impacts and scale indicators.

Fields:
- `impact_metrics_id: string`
- `facility_id: string`
- `power_mw_estimate: number | null`
- `power_mw_min: number | null`
- `power_mw_max: number | null`
- `water_mgd_estimate: number | null`
- `water_mgd_min: number | null`
- `water_mgd_max: number | null`
- `air_pollution_risk_note: string | null`
- `ecological_land_use_risk_note: string | null`
- `permanent_jobs_estimate: number | null`
- `public_subsidy_usd_estimate: number | null`
- `knowledge_status: knowledge_status`
- `method_note: string | null`

### E) `claim`
Tracks auditable claims tied to facilities.

Fields:
- `claim_id: string`
- `facility_id: string`
- `claim_text: string`
- `claim_topic: string` (ai_use, jobs, water, power, subsidy, pollution, timeline, etc.)
- `claimant: string | null` (who made the claim)
- `claim_date: string | null`
- `claim_assessment: claim_assessment`
- `knowledge_status: knowledge_status`
- `assessment_note: string`
- `last_reviewed_at: string (ISO timestamp)`

### F) `source`
Canonical source registry.

Fields:
- `source_id: string`
- `title: string`
- `publisher: string | null`
- `source_type: source_type`
- `published_at: string | null`
- `url: string | null`
- `accessed_at: string (ISO timestamp)`
- `reliability_note: string | null`

### G) `claim_source_link`
Links claims to one or more sources.

Fields:
- `claim_source_link_id: string`
- `claim_id: string`
- `source_id: string`
- `supports_level: string` (direct_support, partial_support, contradictory, context_only)
- `excerpt_note: string | null`

---

## 3) JSON Seed Layout (MVP)
Recommended folder structure:

- `data/facilities.json`
- `data/entities.json`
- `data/facility_entity_links.json`
- `data/impact_metrics.json`
- `data/claims.json`
- `data/sources.json`
- `data/claim_source_links.json`

---

## 4) Validation Rules
- Never allow facility inclusion without explicit AI relevance rationale.
- Reject claims lacking at least one source link unless claim status is explicitly `unknown` and marked as pending verification.
- Do not coerce unknown numeric values to zero.
- Preserve min/max ranges where exact values are unavailable.
- Record timestamps on all review-sensitive entities.

---

## 5) Migration Notes (Post-MVP)
- Move to Postgres with relational constraints and indexes.
- Add PostGIS geometry columns for spatial queries.
- Add revision history tables for claim assessment changes.
- Add provenance table for parser/manual-entry workflow metadata.
