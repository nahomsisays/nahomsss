import type { Facility } from "@/lib/types";
export interface FacilityFilters { search: string; state: string; ai_relevance: string; status: string; owner: string; min_power: number; min_water_risk: number; min_air_risk: number; min_subsidy: number; }
export const filterFacilities = (facilities: Facility[], filters: FacilityFilters) => facilities.filter((f) =>
  (!filters.search || `${f.identity.name} ${f.location.city ?? ""}`.toLowerCase().includes(filters.search.toLowerCase())) &&
  (!filters.state || f.location.state === filters.state) &&
  (!filters.ai_relevance || f.ai_relevance.category === filters.ai_relevance) &&
  (!filters.status || f.status === filters.status) &&
  (!filters.owner || (f.identity.owner ?? "").toLowerCase().includes(filters.owner.toLowerCase())) &&
  (f.scale.estimated_total_load_mw ?? 0) >= filters.min_power &&
  f.water.water_stress_score.score >= filters.min_water_risk &&
  f.air.diesel_emissions_risk.score >= filters.min_air_risk &&
  ((f.economics.tax_abatement_value ?? 0) / 10000000) >= filters.min_subsidy
);
