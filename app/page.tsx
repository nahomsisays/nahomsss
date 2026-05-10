"use client";
import { useMemo, useState } from "react";
import facilitiesData from "@/data/facilities.json";
import claimsData from "@/data/claims.json";
import type { Claim, Facility } from "@/lib/types";
import { filterFacilities, type FacilityFilters } from "@/lib/filters";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import MapView from "@/components/MapView";
import FacilityDrawer from "@/components/FacilityDrawer";

export default function HomePage() {
  const facilities = facilitiesData as Facility[];
  const claims = claimsData as Claim[];
  const [filters, setFilters] = useState<FacilityFilters>({ search: "", state: "", ai_relevance: "", status: "", owner: "", min_power: 0, min_water_risk: 0, min_air_risk: 0, min_subsidy: 0 });
  const [selectedId, setSelectedId] = useState<string>(facilities[0]?.identity.id ?? "");

  const filtered = useMemo(() => filterFacilities(facilities, filters), [facilities, filters]);
  const selected = filtered.find((f) => f.identity.id === selectedId) ?? filtered[0];
  const selectedClaims = claims.filter((c) => c.facility_id === selected?.identity.id);
  const states = Array.from(new Set(facilities.map((f) => f.location.state))).sort();

  return <main className="min-h-screen p-5"><Header /><section className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr_420px]"><FilterPanel filters={filters} setFilters={setFilters} states={states} /><MapView facilities={filtered} onSelect={setSelectedId} /><FacilityDrawer facility={selected} claims={selectedClaims} /></section></main>;
}
