export default function Header() {
  return (
    <header className="mb-4 rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-3 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-300">AI Infrastructure Atlas // U.S. Infrastructure Ledger</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-slate-100">AI Data Center Intelligence Map</h1>
          <p className="mt-1 text-xs text-slate-400">Evidence-first records. Unknowns remain visible. Placeholder records are explicitly labeled.</p>
        </div>
        <div className="text-right text-[11px] text-amber-300">Confidence markers and verification status shown on all records.</div>
      </div>
    </header>
  );
}
