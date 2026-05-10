import { toRiskLabel } from "@/lib/scoring";

export default function RiskScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs text-slate-400"><span>{label}</span><span>{toRiskLabel(score)} ({score})</span></div>
      <div className="h-2 w-full rounded-full bg-slate-800"><div className="h-2 rounded-full bg-cyan-400" style={{ width: `${score}%` }} /></div>
    </div>
  );
}
