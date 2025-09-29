 # Frontend Screens (React/Next pseudo-code)

 Tech: Next.js (App Router), Tailwind, Wagmi/WalletConnect (self-custody optional)

 ## Receive Screen
 ```tsx
 function Receive() {
   const { data: addrs } = useSWR('/v1/wallet/addresses');
   return (
     <div>
       <h1>Receive USDC</h1>
       <ChainCard chain="Base" address={addrs?.base} />
       <ChainCard chain="Solana" address={addrs?.sol} />
       <EducationCard id="receive_risk" />
     </div>
   );
 }
 ```

 ## Buckets Screen
 ```tsx
 function Buckets() {
   const { data: buckets } = useSWR('/v1/buckets');
   const [draft, setDraft] = useState({ name:'Taxes', percent: 25 });
   return (
     <div>
       <h1>Buckets</h1>
       <BucketList items={buckets} />
       <form onSubmit={saveBucket(draft)}>
         <input value={draft.name} />
         <input type="number" value={draft.percent} />
         <button>Create</button>
       </form>
     </div>
   );
 }
 ```

 ## Sweep Settings
 ```tsx
 function SweepSettings() {
   const { data: policy } = useSWR('/v1/policy');
   return (
     <div>
       <Toggle name="enabled" checked={policy.sweep.enabled} />
       <Input name="minSpreadBps" value={policy.sweep.minSpreadBps} />
       <Input name="lotSizeUSD" value={policy.sweep.lotSizeUSD} />
       <Notice text="Not FDIC insured. Yield varies. Sweeps pause when spreads compress." />
     </div>
   );
 }
 ```

 ## Bill Pay
 ```tsx
 function BillPay() {
   const [form, setForm] = useState({ to:'', amount:'', memo:'' });
   const submit = async () => await api.post('/v1/wallet/send', { ...form, gasless: true });
   return (
     <div>
       <h1>Bill Pay</h1>
       <AddressBook onSelect={(a)=>setForm(f=>({...f,to:a}))} />
       <AmountInput value={form.amount} />
       <button onClick={submit}>Pay</button>
     </div>
   );
 }
 ```

 ## Statements
 ```tsx
 function Statements() {
   const { data: stmt } = useSWR('/v1/statements?period=2025-09');
   return (
     <div>
       <h1>Statements</h1>
       <a href={stmt.urlPdf}>Download PDF</a>
       <a href={stmt.urlCsv}>Download CSV</a>
     </div>
   );
 }
 ```
