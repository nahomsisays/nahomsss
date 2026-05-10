import type { FacilityFilters } from "@/lib/filters";

export default function FilterPanel({ filters, setFilters, states }: { filters: FacilityFilters; setFilters: (f: FacilityFilters) => void; states: string[] }) {
  return (
    <div className="space-y-2 rounded-xl border border-slate-700 bg-slate-950/65 p-3 text-xs">
      <h2 className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Filter Controls</h2>
      <input className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Search facility or locality" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
      <select className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5" value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })}><option value="">All states</option>{states.map((s) => <option key={s} value={s}>{s}</option>)}</select>
      <select className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5" value={filters.ai_relevance} onChange={(e) => setFilters({ ...filters, ai_relevance: e.target.value })}><option value="">All AI relevance</option><option value="confirmed">Confirmed</option><option value="likely">Likely</option><option value="possible">Possible</option><option value="strategic">Strategic</option></select>
      <select className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}><option value="">All status</option><option value="active">Active</option><option value="construction">Construction</option><option value="planned">Planned</option></select>
      <input className="w-full rounded border border-slate-700 bg-slate-950 px-2 py-1.5" placeholder="Owner contains" value={filters.owner} onChange={(e) => setFilters({ ...filters, owner: e.target.value })} />
      {[['power ≥', 'min_power'],['water ≥', 'min_water_risk'],['air ≥', 'min_air_risk'],['subsidy ≥', 'min_subsidy']].map(([label,key]) => <label key={key} className="block text-[11px] text-slate-400">{label} {(filters as any)[key]}<input type="range" min={0} max={100} value={(filters as any)[key]} onChange={(e)=>setFilters({...filters,[key]:Number(e.target.value)})} className="w-full"/></label>)}
    </div>
  );
}
