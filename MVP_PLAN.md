# MVP_PLAN.md

## Goal
Ship a visually credible, evidence-first MVP of AI Infrastructure Atlas using curated local JSON data and a high-trust intelligence-style UI.

## Phase 0 — Foundation (Current)
- [x] Create foundational product/research/specification docs
- [ ] Define initial JSON schema files and sample records
- [ ] Initialize Next.js + TypeScript project shell
- [ ] Set baseline design tokens (dark cinematic theme)

## Phase 1 — Data Backbone
1. Implement local seed data files per `DATA_SCHEMA.md`.
2. Add lightweight schema validation utilities.
3. Build data access layer for facilities, claims, and sources.
4. Create confidence and claim-assessment badge system.

Deliverable: deterministic local dataset load with typed models.

## Phase 2 — Core Interface
1. Build layout shell:
   - Map panel
   - Sidebar/card panel
   - Top filter/search controls
2. Integrate Mapbox GL or deck.gl base map.
3. Render facility nodes with tier/confidence visual encoding.
4. Implement facility intelligence card.

Deliverable: browseable map with clickable facility intelligence summaries.

## Phase 3 — Evidence Experience
1. Implement claim audit table per facility.
2. Add evidence drawer with source metadata.
3. Add “unknowns” and “conflicts” indicators.
4. Add compact narrative summary generated from structured fields (no speculative text).

Deliverable: users can inspect evidence quality and uncertainty directly.

## Phase 4 — Filtering & Analytical Utility
1. Filters:
   - State/region
   - AI relevance tier
   - Knowledge status
   - Impact domains (power, water, jobs, subsidy, risk)
2. Sorting options by estimated magnitude or confidence.
3. Quick comparison mode for 2–4 facilities.

Deliverable: practical analysis workflow for journalists and policy users.

## Phase 5 — Polish + Release Candidate
1. Improve typography, spacing, contrast hierarchy.
2. Add loading/skeleton states and empty states.
3. Add documentation for scoring/assessment logic.
4. Conduct editorial QA pass for tone neutrality.

Deliverable: MVP candidate suitable for limited public demonstration.

## MVP Acceptance Criteria
- Facility inclusion remains strictly Tier 2 AI-relevant.
- Material claims are source-linked or explicitly unknown.
- UI visibly differentiates fact vs inference.
- Users can answer: where, who, how much, and how certain.

## Post-MVP Path
- Migrate data to Supabase/Postgres/PostGIS.
- Add source ingestion workflow and revision history.
- Add geospatial analytics layers (grid, water stress overlays, air quality overlays).
