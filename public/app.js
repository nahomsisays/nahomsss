 const $ = (id) => document.getElementById(id);
 async function getJSON(url, opts) { const r = await fetch(url, opts); return r.json(); }
 async function load() {
   const addrs = await getJSON('/v1/wallet/addresses');
   $('addresses').textContent = JSON.stringify(addrs, null, 2);
   const wallet = await getJSON('/v1/wallet');
   $('balances').textContent = JSON.stringify(wallet, null, 2);
   const buckets = await getJSON('/v1/buckets');
   $('buckets').textContent = JSON.stringify(buckets, null, 2);
 }
 $('sendBtn').onclick = async () => {
   const to = $('to').value; const amount = $('amount').value;
   const res = await getJSON('/v1/wallet/send', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ to, amount, gasless: true }) });
   $('sendResult').textContent = JSON.stringify(res, null, 2);
   const wallet = await getJSON('/v1/wallet');
   $('balances').textContent = JSON.stringify(wallet, null, 2);
 }
 $('oracleBtn').onclick = async () => {
   const res = await getJSON('/v1/oracle/check');
   $('oracle').textContent = JSON.stringify(res, null, 2);
 }
 load();
