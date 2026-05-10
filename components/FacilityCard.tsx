import type { Facility } from "@/lib/types";
import RiskScoreBar from "@/components/RiskScoreBar";
export default function FacilityCard({ facility }: { facility: Facility }) {
  return <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4"><h3 className="text-sm font-semibold text-slate-100">{facility.identity.name}</h3><p className="text-xs text-slate-400">{facility.location.city}, {facility.location.state}</p><div className="space-y-2 mt-2"><RiskScoreBar label="Grid strain risk" score={facility.power.grid_strain_risk.score} /><RiskScoreBar label="Water stress" score={facility.water.water_stress_score.score} /><RiskScoreBar label="Air risk" score={facility.air.diesel_emissions_risk.score} /></div></div>;
}
