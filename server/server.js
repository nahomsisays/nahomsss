 'use strict';
 const http = require('http');
 const { URL } = require('url');
 const fs = require('fs');
 const path = require('path');
 const { RateOracle, StaticSource, JitterSource } = require('../src/rate_oracle/rateOracle');

 // In-memory demo state
 const state = {
   addresses: { base: '0xDEMO_BASE_ADDR', sol: 'So1anaDemo1111111111111111111111111111111' },
   balances: { USD: 10000, USDC_BASE: 6000, USDC_SOL: 4000 },
   buckets: [
     { id: 'bkt_taxes', name: 'Taxes', percent: 25 },
     { id: 'bkt_emergency', name: 'Emergency', percent: 10 },
   ],
   policy: { sweep: { enabled: true, minSpreadBps: 20, lotSizeUSD: 100 }, caps: { dailySendUSD: 2000 }, velocity: { perHourCount: 10 } },
   paylinks: {},
   ledger: [],
 };

 // Oracle
 const sources = [
   new StaticSource('Custodian_NAV', 0.0450),
   new JitterSource('MMF_Yield', 0.0465, 2),
   new JitterSource('Alt_TBill', 0.0475, 3),
 ];
 const oracle = new RateOracle(sources, { baselineApy: 0.0000, quorum: 2, maxDivergenceBps: 25 });

 function json(res, code, body) {
   res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
   res.end(JSON.stringify(body));
 }

 function notFound(res) { json(res, 404, { error: 'not_found' }); }

 function parseBody(req) {
   return new Promise((resolve) => {
     let data = '';
     req.on('data', (c) => (data += c));
     req.on('end', () => {
       try { resolve(data ? JSON.parse(data) : {}); } catch { resolve({}); }
     });
   });
 }

 function serveStatic(res, file, type) {
   const full = path.join(__dirname, '..', 'public', file);
   if (!fs.existsSync(full)) return notFound(res);
   res.writeHead(200, { 'Content-Type': type });
   fs.createReadStream(full).pipe(res);
 }

 const server = http.createServer(async (req, res) => {
   const url = new URL(req.url, 'http://localhost');
   const { pathname, searchParams } = url;

   // CORS preflight
   if (req.method === 'OPTIONS') {
     res.writeHead(204, {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type',
     });
     return res.end();
   }

   // Static demo UI
   if (req.method === 'GET' && pathname === '/') return serveStatic(res, 'index.html', 'text/html');
   if (req.method === 'GET' && pathname === '/app.js') return serveStatic(res, 'app.js', 'application/javascript');
   if (req.method === 'GET' && pathname === '/styles.css') return serveStatic(res, 'styles.css', 'text/css');

   // API
   if (req.method === 'GET' && pathname === '/v1/wallet') {
     return json(res, 200, { balances: state.balances, rates: { USDCUSD: 1.0 }, asOf: new Date().toISOString() });
   }
   if (req.method === 'GET' && pathname === '/v1/wallet/addresses') {
     return json(res, 200, state.addresses);
   }
   if (req.method === 'POST' && pathname === '/v1/wallet/send') {
     const body = await parseBody(req);
     const amt = Number(body.amount || 0);
     if (!body.to || !isFinite(amt) || amt <= 0) return json(res, 400, { error: 'invalid_request' });
     if (amt > state.policy.caps.dailySendUSD) return json(res, 403, { error: 'cap_exceeded' });
     // Deduct from Base by default for demo
     if (state.balances.USDC_BASE < amt) return json(res, 400, { error: 'insufficient_funds' });
     state.balances.USDC_BASE -= amt;
     const id = 'tx_' + Date.now();
     state.ledger.push({ id, type: 'send', chain: body.chain || 'base', to: body.to, amount: amt, ts: new Date().toISOString(), sponsored: !!body.gasless });
     return json(res, 200, { id, status: 'submitted', sponsored: !!body.gasless });
   }

   if (req.method === 'GET' && pathname === '/v1/buckets') {
     return json(res, 200, state.buckets);
   }
   if (req.method === 'POST' && pathname === '/v1/buckets') {
     const body = await parseBody(req);
     const id = 'bkt_' + Date.now();
     state.buckets.push({ id, name: String(body.name || 'Bucket'), percent: Number(body.allocationPercent || 0) });
     return json(res, 200, { id });
   }
   if (req.method === 'POST' && pathname === '/v1/buckets/allocate') {
     const body = await parseBody(req);
     const amt = Number(body.amount || 0);
     if (!isFinite(amt) || amt <= 0) return json(res, 400, { error: 'invalid_amount' });
     if (state.balances.USDC_SOL < amt) return json(res, 400, { error: 'insufficient_funds' });
     state.balances.USDC_SOL -= amt; // simple demo move
     state.balances.USDC_BASE += amt;
     return json(res, 200, { ok: true });
   }

   if (req.method === 'GET' && pathname === '/v1/policy') {
     return json(res, 200, state.policy);
   }
   if (req.method === 'POST' && pathname === '/v1/policy') {
     const body = await parseBody(req);
     state.policy = { ...state.policy, ...body, sweep: { ...state.policy.sweep, ...(body.sweep || {}) } };
     return json(res, 200, state.policy);
   }

   if (req.method === 'POST' && pathname === '/v1/paylinks') {
     const body = await parseBody(req);
     const id = 'pl_' + Date.now();
     state.paylinks[id] = { id, ...body, status: 'open' };
     return json(res, 200, { id, url: `http://localhost:3000/paylink/${id}` });
   }
   if (req.method === 'GET' && pathname.startsWith('/v1/paylinks/')) {
     const id = pathname.split('/').pop();
     return json(res, 200, state.paylinks[id] || { error: 'not_found' });
   }

   if (req.method === 'GET' && pathname === '/v1/statements') {
     const period = searchParams.get('period') || '2025-09';
     return json(res, 200, { period, urlPdf: 'https://example.com/stmt.pdf', urlCsv: 'https://example.com/stmt.csv' });
   }

   if (req.method === 'GET' && pathname === '/v1/oracle/check') {
     const out = await oracle.shouldSweep({ minSpreadBps: state.policy.sweep.minSpreadBps });
     return json(res, 200, out);
   }

   return notFound(res);
 });

 const PORT = process.env.PORT || 3000;
 if (require.main === module) {
   server.listen(PORT, () => console.log(`Vault demo server listening on http://localhost:${PORT}`));
 }

 module.exports = { server, state };
