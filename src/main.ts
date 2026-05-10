import facilities from '../data/facilities.json';
import claims from '../data/claims.json';
import stateCoverage from '../data/state_coverage.json';

const el = document.getElementById('app')!;
const counts = facilities.reduce((a,f)=>{a[f.ai_relevance.category]=(a[f.ai_relevance.category]||0)+1;return a;},{} as Record<string,number>);
const shown = facilities.filter(f=>f.ai_relevance.category!== 'weak_or_unknown');
el.innerHTML = `
<style>
body{font-family:Inter,system-ui;background:#06090f;color:#d7e0ea} .wrap{padding:20px;max-width:1200px;margin:auto}
.hero{height:58vh;border:1px solid #223; background:radial-gradient(circle at 50% 50%,#0f1a2a,#05070d);position:relative;border-radius:12px;overflow:hidden}
.node{position:absolute;width:10px;height:10px;border-radius:50%;background:#58a6ff;box-shadow:0 0 12px #58a6ff;cursor:pointer}
.node.possible{background:#6c757d;box-shadow:0 0 8px #6c757d}.bar{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin:12px 0}
.card{background:#0d1420;padding:10px;border:1px solid #1f2f45;border-radius:8px}.modes{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
input{width:100%;padding:10px;background:#0d1420;color:#fff;border:1px solid #24374f}.list{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
small{color:#8ea3bd}
</style>
<div class='wrap'>
<h1>AI Infrastructure Atlas</h1>
<p>Public intelligence map for the known public universe of U.S. AI-related data center infrastructure.</p>
<div class='bar'>
<div class='card'>Known Facilities<br><b>${facilities.length}</b></div>
<div class='card'>Confirmed<br><b>${counts.confirmed||0}</b></div>
<div class='card'>Likely<br><b>${counts.likely||0}</b></div>
<div class='card'>Possible<br><b>${counts.possible||0}</b></div>
<div class='card'>States Covered<br><b>${Object.keys(stateCoverage).length}</b></div>
<div class='card'>Needs Verification<br><b>${facilities.filter(f=>f.metadata.verification_status!=='verified').length}</b></div>
</div>
<input id='q' placeholder='Search company, state, facility, claim...'/>
<div class='modes'><div class='card'>Power & Grid</div><div class='card'>Water</div><div class='card'>Public Subsidies & Jobs</div><div class='card'>Claims & Fact Checks</div></div>
<div class='hero' id='map'></div>
<div class='list' id='list'></div>
</div>`;
const map=document.getElementById('map')!; const list=document.getElementById('list')!;
function render(q=''){const f=shown.filter(x=>JSON.stringify(x).toLowerCase().includes(q.toLowerCase())||claims.some(c=>c.facility_id===x.identity.id && c.normalized_claim.includes(q.toLowerCase())));
map.innerHTML=''; list.innerHTML='';
f.forEach((x,i)=>{const n=document.createElement('div');n.className='node '+(x.ai_relevance.category==='possible'?'possible':'');n.style.left=`${5+((x.location.longitude+130)/70)*90}%`;n.style.top=`${10+((50-x.location.latitude)/25)*80}%`;n.title=x.identity.name; n.onclick=()=>alert(`${x.identity.name}\nAI relevance: ${x.ai_relevance.category}\nKnown: ${x.ai_relevance.evidence_summary}\nUnknowns: ${x.metadata.open_questions.join('; ')}\nSources: ${x.ai_relevance.source_ids.join(', ')}`);map.appendChild(n);
});
f.slice(0,10).forEach(x=>{const c=document.createElement('div');c.className='card';c.innerHTML=`<b>${x.identity.name}</b><br><small>${x.location.city}, ${x.location.state} • ${x.ai_relevance.category} • ${x.metadata.verification_status}</small><br>${x.ai_relevance.explanation}<br><small>Sources: ${x.ai_relevance.source_ids.join(', ')}</small>`;list.appendChild(c)});
}
(document.getElementById('q') as HTMLInputElement).oninput=(e)=>render((e.target as HTMLInputElement).value);
render();
