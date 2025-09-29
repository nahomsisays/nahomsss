 # Systems Architecture (Vault V1)

 ## Diagram
 ```mermaid
 flowchart TD
   subgraph Client
     A[Web/Mobile App]
     A --> WC[Wallet Connect (self-custody optional)]
   end

   subgraph Edge
     B[API Gateway]
     H[AuthN/Z + Policy Engine]
   end

   subgraph Core
     L[Ledger Service]
     S[Statement Generator]
     P[Paylinks & Billing]
     O[Orchestrator / Jobs]
     R[Rate Oracle]
     K[Compliance/KYC]
     X[Risk Controls (caps, velocity, anomaly)]
   end

   subgraph Chain Integrations
     PM[Circle Paymaster (Base)]
     RL[Relayer (Solana)]
     EVM[Base RPC + Indexer]
     SVM[Solana RPC + Indexer]
   end

   subgraph Finance/Custody
     CUS[MPC Wallet Provider]
     TBL[Tokenized T-Bills / Alternatives]
     OFR[On/Off-Ramp Partners]
   end

   A --> B --> H
   H --> |allow| PM
   H --> |allow| RL
   H --> |deny| A

   PM --> EVM
   RL --> SVM

   EVM --> L
   SVM --> L

   O --> R
   O --> |Auto-sweep| TBL
   O --> |Payout| OFR

   B --> P
   P --> L
   S --> L

   K --> H
   X --> H
   CUS <--> EVM
   CUS <--> SVM
 ```

 ## Key Components
 - API Gateway: REST/JSON; Fast rate limiting; JWT auth.
 - Policy Engine: evaluates KYC tier, caps, velocity, AML findings; returns allow/deny + reasons.
 - Ledger Service: double-entry ledger for all balance movements (chain, custody, fees, yields).
 - Rate Oracle: multi-source, rotating, with quorum; pauses sweeps on compressed spreads.
 - Orchestrator: CRON/queue workers for sweeps, statements, webhooks reconciliation.
 - Compliance: KYC (tiers), AML/OFAC screening, Travel Rule integration.
 - Chain Integrations: Base via Circle Paymaster; Solana via relayer; both behind simulator.
 - Custody: MPC wallets default; self-custody connection optional; T-Bill custodian via partner.

 ## Data Flow Highlights
 - Every on-chain action goes through: intent → simulator → policy → (paymaster/relayer) → broadcast → confirmations → ledger.
 - Webhooks from partners (on/off-ramp, custody) are normalized and reconciled to the ledger.
 - Statements query the ledger and enrich with rates/oracle snapshots and disclosures.
