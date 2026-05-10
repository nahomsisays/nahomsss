# AI Infrastructure Atlas

## Overview
AI Infrastructure Atlas is a public intelligence map of **U.S. data centers with meaningful AI relevance**.

This project is **not** a generic data center directory. It focuses on facilities that are confirmed, likely, or possibly connected to:
- AI training
- Frontier labs
- Hyperscale GPU compute
- Major AI inference workloads
- Strategic AI infrastructure campuses

The goal is to provide a neutral, evidence-first view of where AI-relevant infrastructure exists, who is involved, and what real-world impacts and uncertainties surround each site.

## Product Thesis
AI compute infrastructure is now economically and politically significant, but public understanding is fragmented and often distorted by marketing claims, speculation, or incomplete local reporting.

AI Infrastructure Atlas exists to make this landscape legible for journalists, policymakers, researchers, local residents, and industry observers by:
- Mapping where major AI data centers are
- Distinguishing AI-relevant facilities from ordinary enterprise/legacy sites
- Tracking ownership, operations, finance, and likely usage patterns
- Quantifying power demand, potential water use, and ecological/land-use risks
- Surfacing public subsidies and permanent job claims
- Evaluating whether claims are supported, unsupported, exaggerated, contradicted, or unclear

## Core Principles
- **Neutrality:** No assumption that data centers are inherently good or bad.
- **Evidence-first:** All material claims should be traceable to sources.
- **Epistemic clarity:** Separate confirmed facts from inference and unknowns.
- **Public utility:** Prioritize interpretability and trust over hype.
- **Tiered scope discipline:** Include only Tier 2 AI-relevant facilities.

## MVP Scope
The MVP covers only Tier 2 facilities:
- Confirmed AI-relevant data centers
- Likely AI-relevant data centers
- Possibly AI-relevant data centers
- Strategic AI infrastructure campuses

Out of scope for MVP:
- Comprehensive listing of all U.S. data centers
- Commodity enterprise colocation catalogs without clear AI links

## Design Direction
Visual and interaction style: **Palantir × Bloomberg Terminal × investigative newsroom**.

Target attributes:
- Dark, cinematic, high-trust UI
- Hyperreal U.S. map with glowing intelligence nodes
- Serious typography and dense-but-usable information cards
- Explicit confidence/status indicators on every claim

## Technical Direction (MVP)
- **Framework:** Next.js + TypeScript
- **UI:** Tailwind + shadcn/ui
- **Map layer:** Mapbox GL or deck.gl
- **Data source:** Local JSON seed data
- **Later:** Supabase + Postgres/PostGIS

See detailed planning in:
- `PRODUCT_SPEC.md`
- `DATA_SCHEMA.md`
- `RESEARCH_METHOD.md`
- `MVP_PLAN.md`
- `AGENTS.md`

## Repository Status
This repository currently contains the foundational product and research documents for MVP planning.

No full application implementation has been started yet by design.
