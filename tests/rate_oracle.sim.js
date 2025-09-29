 'use strict';
 const { RateOracle, StaticSource, JitterSource } = require('../src/rate_oracle/rateOracle');

 async function main() {
   const sources = [
     new StaticSource('Custodian_NAV', 0.0450), // 4.50%
     new JitterSource('MMF_Yield', 0.0465, 2), // 4.65% ±2 bps
     new JitterSource('Alt_TBill', 0.0475, 3)  // 4.75% ±3 bps
   ];
   const oracle = new RateOracle(sources, { baselineApy: 0.0000, quorum: 2, maxDivergenceBps: 25 });

   for (let i = 0; i < 5; i++) {
     const res = await oracle.shouldSweep({ minSpreadBps: 20 }); // require ≥ 20 bps
     console.log(`[${i}] decision=${res.decision} reason=${res.reason} medianApy=${(res.medianApy*100).toFixed(2)}%`,
       res.spreadBps !== undefined ? `spread=${res.spreadBps}bps` : '',
       res.divergenceBps !== undefined ? `div=${res.divergenceBps}bps` : '');
   }

   // Compressed spread scenario
   const tight = new RateOracle([
     new StaticSource('Custodian_NAV', 0.0010), // 10 bps
     new StaticSource('MMF_Yield', 0.0012),     // 12 bps
     new StaticSource('Alt_TBill', 0.0011)      // 11 bps
   ], { baselineApy: 0.0000, quorum: 2, maxDivergenceBps: 25 });
   const res2 = await tight.shouldSweep({ minSpreadBps: 20 });
   console.log(`compressed decision=${res2.decision} reason=${res2.reason}`);
 }

 main().catch((e) => { console.error(e); process.exit(1); });
