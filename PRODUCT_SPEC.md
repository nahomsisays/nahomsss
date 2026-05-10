# PRODUCT_SPEC.md

## 1) Product Definition
**AI Infrastructure Atlas** is a public intelligence product mapping U.S. data centers with material AI relevance.

It is intended to help users understand where strategic AI compute may exist, who is involved, what resource burdens may be present, and how credible public claims are.

## 2) Target Users
Primary user groups:
- Journalists
- Policymakers and public staff
- Academic and independent researchers
- Local residents and civic groups
- Industry observers and analysts

## 3) Core User Questions
The product must help answer:
1. Where are major AI-relevant data center facilities in the U.S.?
2. Is this facility confirmed, likely, or only possibly AI-relevant?
3. Who owns, operates, finances, and/or uses this facility?
4. What are plausible power and water implications?
5. What pollution, ecological, or land-use risks are documented?
6. What permanent jobs are claimed vs evidenced?
7. What public subsidies are involved?
8. Which public claims are supported, unsupported, exaggerated, contradicted, or unclear?

## 4) Scope Boundaries
### In Scope (Tier 2 only)
- Confirmed AI-relevant data centers
- Likely AI-relevant data centers
- Possibly AI-relevant data centers
- Strategic AI infrastructure campuses

### Out of Scope
- Generic nationwide directory of all data centers
- Facilities with no meaningful AI connection
- Marketing-style rankings detached from source-backed evidence

## 5) Evidence & Truth Model
Each key claim must carry:
- Claim text
- Claim category
- Evidence status
- Confidence tier
- Sources
- Last reviewed date

### Confidence / Knowledge Labels
- `confirmed_fact`
- `strong_inference`
- `weak_inference`
- `unknown`

### Claim Assessment Labels
- `supported`
- `unsupported`
- `exaggerated`
- `contradicted`
- `unclear`

## 6) MVP Feature Set
1. **U.S. Intelligence Map**
   - Facility nodes with confidence-coded styling
   - Hover and click for summary intelligence

2. **Facility Intelligence Card**
   - AI relevance tier
   - Entity relationships (owner/operator/user/financier)
   - Power, water, emissions-risk, ecological-risk, jobs, subsidy fields
   - Claim audit panel

3. **Filtering + Search**
   - By state/region
   - By AI relevance tier
   - By confidence level
   - By impact domain (power/water/jobs/subsidy/risk)

4. **Evidence Drawer**
   - Source list with publication metadata
   - Evidence notes and unresolved unknowns

5. **Seed Dataset Loader (local JSON)**
   - Curated MVP records only

## 7) Visual/Experience Direction
Style: **Palantir × Bloomberg Terminal × Investigative Newsroom**

Design requirements:
- Dark cinematic map experience
- Serious typography
- High signal density without clutter
- Explicit uncertainty markers
- Minimal decorative copy, maximal evidence clarity

## 8) Suggested Technical Architecture (MVP)
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Mapbox GL or deck.gl
- Local JSON seed files

Post-MVP migration path:
- Supabase
- Postgres + PostGIS
- Versioned evidence pipelines

## 9) Non-Goals for MVP
- Real-time ingestion pipelines
- Full legal compliance workflow automation
- Predictive scoring that implies certainty without evidence
- International expansion

## 10) Success Criteria (MVP)
- Users can quickly identify AI relevance confidence at each facility.
- Every material claim has traceable evidence or explicit unknown status.
- Analysts can compare claim narratives against source-backed facts.
- Product is visually credible enough for investigative/public-policy contexts.
