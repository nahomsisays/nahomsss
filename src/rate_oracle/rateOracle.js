 'use strict';

 /**
  * Seed Rate Oracle
  * - Aggregates multiple mocked sources
  * - Rotates query order to avoid bias
  * - Computes median APY and spread vs baseline
  * - Pauses sweeps when spread < minSpreadBps or sources diverge > maxDivergenceBps
  *
  * No external dependencies; suitable for Node 18+.
  */

 class RateOracle {
   constructor(sources, opts = {}) {
     if (!Array.isArray(sources) || sources.length === 0) throw new Error('sources required');
     this.sources = sources;
     this.rotation = 0;
     this.baselineApy = opts.baselineApy ?? 0.0; // e.g., 0 for USDC cash, or partner yield
     this.quorum = opts.quorum ?? Math.min(3, sources.length);
     this.maxDivergenceBps = opts.maxDivergenceBps ?? 50; // max allowed disagreement across APYs
   }

   rotateSources() {
     this.rotation = (this.rotation + 1) % this.sources.length;
     const left = this.sources.slice(this.rotation);
     const right = this.sources.slice(0, this.rotation);
     return left.concat(right);
   }

   async snapshot() {
     const ordered = this.rotateSources();
     const results = [];
     for (const src of ordered) {
       try {
         const r = await src.fetch();
         if (isFinite(r.apy)) {
           results.push({ name: src.name, apy: Number(r.apy), meta: r.meta || {} });
         }
       } catch (e) {
         results.push({ name: src.name, error: e?.message || 'fetch_error' });
       }
       if (results.filter((x) => x.apy !== undefined).length >= this.quorum) break;
     }
     const valid = results.filter((r) => r.apy !== undefined);
     return { results, valid };
   }

   static median(nums) {
     const arr = [...nums].sort((a, b) => a - b);
     const mid = Math.floor(arr.length / 2);
     return arr.length % 2 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
   }

   assess(valid, { minSpreadBps }) {
     if (valid.length === 0) return { decision: 'pause', reason: 'no_data' };
     const apys = valid.map((v) => v.apy);
     const medianApy = RateOracle.median(apys);
     const minApy = Math.min(...apys);
     const maxApy = Math.max(...apys);
     const divergenceBps = Math.round((maxApy - minApy) * 10000);
     if (divergenceBps > this.maxDivergenceBps) {
       return { decision: 'pause', reason: 'divergence', medianApy, divergenceBps };
     }
     const spreadBps = Math.round((medianApy - this.baselineApy) * 10000);
     if (spreadBps < minSpreadBps) {
       return { decision: 'pause', reason: 'compressed_spread', medianApy, spreadBps };
     }
     return { decision: 'sweep', reason: 'healthy_spread', medianApy, spreadBps };
   }

   /**
    * Evaluate whether to sweep
    * @param {{minSpreadBps:number}} policy
    * @returns {Promise<{decision:string, reason:string, medianApy?:number, spreadBps?:number, divergenceBps?:number, sources:any[]}>}
    */
   async shouldSweep(policy) {
     const { results, valid } = await this.snapshot();
     const assessment = this.assess(valid, { minSpreadBps: policy.minSpreadBps });
     return { ...assessment, sources: results };
   }
 }

 // Mock sources (replace with real integrations)
 class StaticSource {
   constructor(name, apy) { this.name = name; this._apy = apy; }
   async fetch() { return { apy: this._apy, meta: { ts: new Date().toISOString() } }; }
 }

 class JitterSource {
   constructor(name, base, jitterBps = 5) { this.name = name; this.base = base; this.jitterBps = jitterBps; }
   async fetch() {
     const delta = (Math.random() * (this.jitterBps * 2) - this.jitterBps) / 10000;
     return { apy: this.base + delta, meta: { ts: new Date().toISOString() } };
   }
 }

 module.exports = { RateOracle, StaticSource, JitterSource };
