# Vault V1 PRD (v0.1)

Owner: Lead Product + Eng (Droid)  
Scope: US + LatAm beta (12 weeks)  
Core loop: get paid in USDC → auto‑sweep to safety (tokenized T‑Bills or regulated alternatives by region) → pay bills / debit (gasless UX)

## Non‑Functional Requirements
- 99.95% uptime (≤ 21.6 min/mo downtime)
- All transactions dry‑run in a simulator before broadcast
- Permissions‑by‑default: explicit user consent for policies; toggles/logs
- P0 incident runbooks; kill‑switch available to ops

## Environments
- Chains: Base (EVM) + Solana (SVM)
- Custody: MPC wallet infra (default) + optional self‑custody (external wallet connect)
- Regions: US, LatAm (e.g., MX, AR, BR); EU (MiCA alignment for disclosure copy)

## V1 Feature Requirements & Acceptance Criteria

| # | Feature | Requirement | Acceptance Criteria |
|---|---------|-------------|---------------------|
| 1 | Multi‑chain USDC wallet (Base + Solana) | Users receive, hold, and send USDC on Base and Solana under unified identity. Display consolidated balance and per‑chain balances. | 1) Create MPC wallet addresses on Base and Solana on signup. 2) Show QR + address, copy, and share. 3) Incoming transfer recognized after required confirmations (Base: 1 block; Solana: finalized). 4) Consolidated USD balance at live rate with source breakdown. |
| 2 | Gasless via Paymaster | Sponsor gas for allow‑listed operations (receive, sweep, internal transfers, bill pay) on Base; abstract fees on Solana via relayer. | 1) User signs only intent; Paymaster covers gas if policy allows. 2) Fallback: prompt user when policy blocks. 3) Ledger records sponsor vs user‑paid fees. |
| 3 | Auto‑Sweep to safety | Configurable policy to sweep USDC to tokenized T‑Bills (US) or regulated alternatives per region/KYC tier; pause when spreads compress below threshold. | 1) Sweep daemon checks balances hourly and on receipt events. 2) Executes only if rate oracle spread >= threshold and user consent is active. 3) Settlement recorded to ledger with instrument and NAV. 4) Pauses automatically when signals negative. |
| 4 | Buckets (Taxes/Emergency/Goals) | Users define buckets with target % or fixed amounts; inflows auto‑allocate before sweep. | 1) Create/edit/delete buckets. 2) Allocation happens on receipt with preview. 3) Transfers between buckets logged. |
| 5 | Bill Pay + Paylinks | Generate paylinks (invoice URLs) to receive USDC; pay bills to saved beneficiaries; optional memo and attachments. | 1) Create paylink with amount/currency, due date, payer info. 2) Payer can pay via wallet connect or network QR. 3) Bill pay supports address book + compliance checks. |
| 6 | Instant Off‑ramp (ACH/debit) | US: ACH to linked bank; LatAm: local rails via partners; cards via Marqeta/Lithic. | 1) Link bank/card via partner SDK. 2) Off‑ramp quotes shown with fees/ETA. 3) Payout status updates webhooks → ledger. |
| 7 | Compliance tiering | KYC tiers unlock limits and products. | 1) Tier 0: email + device; receive only small limits. 2) Tier 1: KYC light (ID + selfie) → send/off‑ramp limits. 3) Tier 2: enhanced due diligence → higher limits + T‑Bill access. Enforcement at policy engine. |
| 8 | Portfolio/Statements | Show positions, PnL, yield, statements (monthly PDF/CSV). | 1) Balance/time‑series charts. 2) Statement generation job with line items and disclosures. 3) Export CSV/PDF. |
| 9 | Kill‑Switch & spend caps | Admin kill‑switch; user spend caps & velocity rules. | 1) Admin flip blocks on‑chain actions. 2) User can set daily send limit; attempts blocked exceed → surfaced in UI. |
| 10 | In‑app education cards | Contextual cards explaining risks, yields, custody. | 1) Shown on first use and near actions; localized EN/ES/pt‑BR. 2) Track dismissals/events. |

## Detailed Flows and Edge Cases

### Receive USDC
- Trigger: Paylink payment or on‑chain transfer to user address
- Steps: detect event → simulator dry‑run policy → post to ledger → allocate to buckets → possible sweep
- Edge cases: under‑min amounts; memos with PII; chain reorg on Base; Solana fork slot; stuck relays
- Acceptance: event appears within SLA (Base: <15s; Solana: <5s) and ledger matches chain state

### Gasless Send/Bill Pay
- Pre‑checks: policy engine (caps, velocity, AML flags) → Paymaster decision
- Dry‑run: simulator replicates call data and fee; only broadcast on pass
- Edge cases: Paymaster budget exceeded; nonce conflicts; relayer outage → fallback prompt

### Auto‑Sweep
- Inputs: user policy (on/off, thresholds), rate oracle (yield vs spread), ledger balances, KYC tier
- Decision: if spread >= min and bucket residual >= min lot size
- Edge cases: oracle disagreement; partner custody maintenance; partial fills; NAV staleness

### Off‑ramp
- Flow: quote → confirm → partner API payout → webhooks → ledger updates → statements
- Edge cases: bank micro‑deposits pending; name mismatch; ACH returns (R01–R11) → reversal flow

## Regional Policies and Legal Notices (summary)
- US: Tokenized T‑Bills accessible only at Tier 2; disclose not FDIC insured; market risk; tax implications (1099‑INT/1099‑B as applicable). ACH via sponsor bank; card via program manager.
- LatAm: Where T‑Bills not permitted, use regulated cash equivalents (e.g., MMF feeder, bank time deposit via partner). Currency controls disclosed. Not investment advice.
- EU (MiCA alignment for disclosure): classify as ART/EMT service interactions; emphasize issuer risk; rights/claims; complaints process; key information document link.

## Success Metrics (Beta)
- D1 activation > 40% (first receipt + bucket setup)
- 30‑day retention > 25%
- Take rate: blended 45–90 bps across sweep spread and off‑ramp fees
- <0.5% failed transactions; <0.1% false positives on AML blocks

## P0 Incident Runbooks (high‑level)
- Paymaster outage: auto‑switch to user‑paid with warning; priority incident; cap MTTD < 1 min via healthchecks
- Oracle divergence: auto‑pause sweeps; alert oncall; require 3‑of‑N majority before resume
- Custody provider incident: rotate to standby provider; freeze sends; communicate in‑app banner
