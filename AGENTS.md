# AGENTS.md

## Mission Context
You are contributing to **AI Infrastructure Atlas**, a public intelligence map of U.S. data centers that are confirmed, likely, or possibly connected to AI training, frontier labs, hyperscale GPU compute, or major AI inference workloads.

This is **not** a generic data center directory.

## Non-Negotiable Editorial Standards
1. **Preserve a neutral tone.**
   - Do not write advocacy copy for industry or activism.
   - Do not frame data centers as inherently good or inherently harmful.

2. **Never present speculation as fact.**
   - If evidence is incomplete, state that clearly.
   - Use explicit uncertainty labels.

3. **Always distinguish evidence tiers.**
   Every factual unit should be classifiable as:
   - `confirmed_fact`
   - `strong_inference`
   - `weak_inference`
   - `unknown`

4. **Avoid generic AI-sounding copy.**
   - Prefer concrete, plain-language intelligence writing.
   - Avoid fluff terms and trend-jargon unless directly quoted.

## Data & Modeling Standards
5. **Prefer clean, modular data models.**
   - Keep entities normalized where practical.
   - Avoid overloading single objects with mixed concerns.

6. **Attach source fields and citations in data objects.**
   - Material claims should have one or more sources.
   - Include source type, publisher, date, and URL where available.
   - Track confidence and verification state separately from source count.

7. **Represent unknowns explicitly.**
   - Use nulls/unknown states, not invented placeholder certainty.
   - Do not infer sensitive metrics (power, water, jobs, subsidies) without basis.

## Product & UX Standards
8. **Prioritize visual polish and information density.**
   - Interface should feel serious, high-trust, and investigative.
   - Dense data is acceptable if hierarchy and readability are strong.

9. **Keep code modular.**
   - Small composable components.
   - Clear separation between map, cards, filters, and evidence panel logic.

10. **Scope discipline for facility inclusion.**
   Include only Tier 2 AI infrastructure records:
   - Confirmed AI-relevant data centers
   - Likely AI-relevant data centers
   - Possibly AI-relevant data centers
   - Strategic AI infrastructure campuses

   Do not add ordinary legacy/enterprise facilities without clear AI relevance.

## Working Norms for Future Agents
- When uncertain, leave TODO notes and mark confidence conservatively.
- Prefer adding structured fields over long prose blobs.
- Keep naming consistent with `DATA_SCHEMA.md`.
- If tradeoffs arise, optimize for epistemic clarity over feature velocity.
