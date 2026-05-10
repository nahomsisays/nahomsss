import type { ClaimVerdict } from "@/lib/types";
export default function ClaimVerdictBadge({ verdict }: { verdict: ClaimVerdict }) {
  const classes: Record<ClaimVerdict, string> = {
    supported: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    mostly_supported: "bg-teal-500/20 text-teal-300 border-teal-500/30",
    partly_supported: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    unsupported: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    contradicted: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    unclear: "bg-slate-500/30 text-slate-200 border-slate-500/40"
  };
  return <span className={`rounded-full border px-2 py-1 text-[10px] uppercase tracking-wide ${classes[verdict]}`}>{verdict.replaceAll("_", " ")}</span>;
}
