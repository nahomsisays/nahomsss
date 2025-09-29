 # API Interface Definitions (V1) + Mock Payloads

 Base URL: `https://api.vault.example.com/v1`

 ## Auth
 - Scheme: JWT (Bearer); scopes: `wallet:read`, `wallet:write`, `payout:write`, `policy:write`, `statement:read`

 ## Wallet
 - GET `/wallet` → consolidated balances
 - GET `/wallet/addresses` → per-chain addresses
 - POST `/wallet/send` → send USDC (gasless when allowed)

 Example: GET `/wallet`
 ```json
 {
   "balances": {
     "USD": 12450.32,
     "USDC_BASE": 7000.00,
     "USDC_SOL": 5450.32
   },
   "rates": { "USDCUSD": 1.0000 },
   "asOf": "2025-09-29T12:00:00Z"
 }
 ```

 Example: POST `/wallet/send`
 ```json
 {
   "chain": "base",
   "to": "0xabc...",
   "amount": "150.00",
   "memo": "Invoice 123",
   "gasless": true
 }
 ```
 Response
 ```json
 { "id": "tx_01H..", "status": "submitted", "sponsored": true }
 ```

 ## Paylinks / Billing
 - POST `/paylinks` → create paylink
 - GET `/paylinks/{id}`
 - Webhook: `POST /webhooks/paylink` (payer events)

 Create Paylink
 ```json
 {"amount":"500.00","currency":"USD","dueDate":"2025-10-15","payerEmail":"client@ex.com","memo":"Design work"}
 ```

 ## Buckets
 - GET `/buckets`
 - POST `/buckets` {name, allocationPercent|fixed}
 - POST `/buckets/allocate` → manual move

 ## Policy Engine
 - GET `/policy`
 - POST `/policy` → update caps/velocity/sweep settings

 Sweep Policy Example
 ```json
 {
   "sweep": {"enabled": true, "minSpreadBps": 20, "lotSizeUSD": 100},
   "caps": {"dailySendUSD": 2000},
   "velocity": {"perHourCount": 10}
 }
 ```

 ## Statements
 - GET `/statements?period=2025-09`
 Response
 ```json
 {
   "period": "2025-09",
   "urlPdf": "https://.../stmt-2025-09.pdf",
   "urlCsv": "https://.../stmt-2025-09.csv"
 }
 ```

 ## Compliance
 - POST `/kyc/start`
 - GET `/kyc/status`
 - POST `/travel-rule/transfer-intent` → returns TR payload and reference ID

 Travel Rule Intent (mock)
 ```json
 {
   "txRef": "tr_01H...",
   "originator": {"name": "Alice", "dob": "1991-01-01"},
   "beneficiary": {"name": "Bob", "address": "..."},
   "asset": "USDC", "amount": "100.00", "chain": "base"
 }
 ```

 ---
 # Partner Stubs

 ## Circle
 - Accounts: `GET /v1/businessAccount/balances`
 - Payouts: `POST /v1/payouts`
 - Paymaster: Sponsor tx endpoint (abstracted via SDK)

 Payout (mock)
 ```json
 {
   "source": {"type": "wallet", "id": "wal_123"},
   "destination": {"type": "ach", "id": "ba_456"},
   "amount": {"currency": "USD", "amount": "250.00"},
   "metadata": {"memo": "Off-ramp"}
 }
 ```

 ## Fireblocks (custody/MPC)
 - Create address: `POST /v1/asset_accounts/{USDC}/addresses`
 - Transfer: `POST /v1/transactions`

 ## Marqeta/Lithic
 - Card provisioning: `POST /cards`
 - Authorization webhooks: `POST /webhooks/card-auth`

 ## ACH Provider
 - Link bank: `POST /link/token/create`
 - Create transfer: `POST /transfers`

 ## Tax Forms
 - 1099 generator: `POST /tax/1099` → returns PDF URL
