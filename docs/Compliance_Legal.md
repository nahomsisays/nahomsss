 # Compliance Plan & Legal Copy (V1)

 ## KYC Tiers
 - Tier 0: email + device fingerprint. Receive only; per-transaction <= $200; monthly <= $1,000. No off-ramp.
 - Tier 1: government ID + selfie + sanctions screening. Send/off-ramp up to $10k/mo; no T-Bills.
 - Tier 2: enhanced due diligence (proof of address, source of funds). Access T-Bills/alternatives; higher limits per jurisdiction.

 ## AML/OFAC Monitoring
 - Real-time screening on beneficiaries and origins; continuous screening on user base.
 - Chain analytics risk score gating; anomalous destination detection; velocity rules.
 - SAR/STR workflow for escalations; audit logs immutable.

 ## Travel Rule
 - When thresholds met, collect originator/beneficiary info and exchange via TR protocol provider.
 - Store reference ID, payload, and confirmation in ledger metadata.

 ## Jurisdictional Feature Matrix (summary)
 - US: Off-ramp ACH/cards allowed; T-Bills at Tier 2 via registered partner. Disclosures: not FDIC insured; may lose value; fees disclosed.
 - LatAm: Off-ramp via local partners; where T-Bills not permitted, use regulated cash equivalents. FX controls, withholding taxes disclosed.
 - EU (MiCA): Treat USDC as EMT; emphasize issuer risk, redemption terms, and complaint channels; provide KID where applicable.

 ## Disclosure Copy (User-Facing)

 ### General Risk Disclosure (All Regions)
 “Vault provides access to digital assets and regulated financial products via partners. Digital assets carry risk, including market, liquidity, and operational risk. Balances held in USDC or tokenized instruments are NOT bank deposits and are NOT insured by FDIC/NCUA, and may lose value. Past performance is not indicative of future results. Fees and partner terms apply.”

 ### US‑Specific
 “Tokenized T‑Bills are offered via regulated partners to eligible Tier 2 users. These products are not bank accounts. Holdings are subject to the creditworthiness and operations of the issuer and custodians. ACH transfers may be reversed (e.g., NACHA return codes). Tax reporting may include Forms 1099‑INT/1099‑B. Vault does not provide tax or investment advice.”

 ### EU (MiCA‑Aligned)
 “USDC is an e‑money token (EMT) issued by a third party. Users have a claim on the issuer per its terms. Redemption rights and fees are governed by the issuer’s documentation. Complaints can be filed via our support channel; we will acknowledge within 24 hours and provide a resolution path in accordance with applicable regulations.”

 ### LatAm
 “Certain products (e.g., T‑Bills) may not be available. Alternatives may include regulated cash equivalents via local partners. FX controls and taxes may apply. Vault is not a bank and does not guarantee profits. Card and off‑ramp services are provided by licensed partners.”

 ## Policy Notices in Product
 - Before enabling auto‑sweep, show: expected yield range, lock‑ups (if any), partner risk, and pause conditions.
 - Prior to gasless actions, disclose sponsorship policy and when user may bear fees.
 - Show caps/limits by tier; provide path to upgrade tier.
