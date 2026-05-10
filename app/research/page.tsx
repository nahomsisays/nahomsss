import facilitiesData from "@/data/facilities.json";
import claimsData from "@/data/claims.json";
import type { Claim, Facility } from "@/lib/types";

function missingFields(f: Facility) {
  const missing: string[] = [];
  if (!f.identity.owner) missing.push("identity.owner");
  if (!f.location.county) missing.push("location.county");
  if (!f.scale.estimated_total_load_mw) missing.push("scale.estimated_total_load_mw");
  if (!f.power.utility_provider) missing.push("power.utility_provider");
  if (!f.water.estimated_water_use) missing.push("water.estimated_water_use");
  return missing;
}

export default function ResearchPage() {
  const facilities = facilitiesData as Facility[];
  const claims = claimsData as Claim[];

  const needingVerification = facilities.filter((f) => f.metadata.verification_status === "needs_verification");
  const lowConfidenceAI = facilities.filter((f) => f.ai_relevance.confidence === "low" || f.ai_relevance.score <= 2);
  const missingSourceLinks = claims.filter((c) => !c.source || c.source.trim() === "");
  const highPriority = facilities.filter((f) => f.metadata.confidence === "low" && (f.scale.estimated_total_load_mw ?? 0) >= 200);

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <h1 className="text-xl font-semibold">Research Operations Board</h1>
      <p className="mt-1 text-sm text-slate-400">Admin view for verification workflow. Demo indicators remain active.</p>

      <section className="mt-4 grid gap-3 md:grid-cols-2">
        <Panel title="Facilities needing verification" items={needingVerification.map((f) => `${f.identity.id} — ${f.identity.name}`)} />
        <Panel title="Low-confidence AI relevance records" items={lowConfidenceAI.map((f) => `${f.identity.id} — ${f.ai_relevance.category} (${f.ai_relevance.confidence})`)} />
        <Panel title="Missing source links (claims)" items={missingSourceLinks.map((c) => `${c.id} — ${c.exact_claim}`)} emptyLabel="No missing links detected." />
        <Panel title="High-priority records" items={highPriority.map((f) => `${f.identity.id} — high load + low confidence`)} />
      </section>

      <section className="mt-4 rounded border border-slate-800 p-4">
        <h2 className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">Missing fields</h2>
        {facilities.map((f) => {
          const missing = missingFields(f);
          return (
            <div key={f.identity.id} className="mb-2 text-sm">
              <span className="font-medium">{f.identity.id}</span>: {missing.length ? missing.join(", ") : "none"}
            </div>
          );
        })}
      </section>

      <section className="mt-4 rounded border border-slate-800 p-4">
        <h2 className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">Open questions</h2>
        {facilities.map((f) => (
          <div key={f.identity.id} className="mb-2 text-sm">
            <span className="font-medium">{f.identity.id}</span>: {f.metadata.open_questions.join(" | ")}
          </div>
        ))}
      </section>
    </main>
  );
}

function Panel({ title, items, emptyLabel = "No records." }: { title: string; items: string[]; emptyLabel?: string }) {
  return (
    <div className="rounded border border-slate-800 p-4">
      <h2 className="mb-2 text-sm uppercase tracking-[0.2em] text-slate-300">{title}</h2>
      {items.length ? <ul className="space-y-1 text-sm text-slate-200">{items.map((i) => <li key={i}>{i}</li>)}</ul> : <p className="text-sm text-slate-500">{emptyLabel}</p>}
    </div>
  );
}
