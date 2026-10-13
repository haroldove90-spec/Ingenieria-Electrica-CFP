import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface GroundingGaugeProps {
  ohms: number;
  maxLimit?: number;
}

export const GroundingGauge: React.FC<GroundingGaugeProps> = ({ ohms, maxLimit = 25.0 }) => {
  const complies = ohms <= maxLimit;
  // Percentage in a 0 to 50 ohm scale
  const percentage = Math.min(Math.max((ohms / 50) * 100, 0), 100);
  const limitPercentage = (maxLimit / 50) * 100;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
            Resistencia de Puesta a Tierra
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
            NOM-001 Art. 250-56
          </span>
        </div>
        {complies ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" /> Cumple Límite (≤ 25 Ω)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> No Cumple (&gt; 25 Ω)
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white">
          {ohms.toFixed(1)} <span className="text-xl sm:text-2xl text-slate-400">Ω</span>
        </span>
        <span className="text-xs text-slate-400">
          Límite máximo normativo: <strong className="text-slate-200">25.0 Ω</strong>
        </span>
      </div>

      {/* Visual meter bar */}
      <div className="relative pt-2 pb-1">
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex relative">
          {/* Permissible area 0 - 25 ohms (50% of bar) */}
          <div className="w-1/2 h-full bg-emerald-950/80 border-r border-dashed border-emerald-500/60" />
          {/* Non-compliant area 25 - 50 ohms (50% of bar) */}
          <div className="w-1/2 h-full bg-rose-950/40" />

          {/* Current reading marker */}
          <div
            className={`absolute top-0 bottom-0 w-2.5 -ml-1.25 rounded-full shadow-lg transition-all duration-500 ${
              complies ? 'bg-emerald-400 ring-2 ring-emerald-300/40' : 'bg-rose-400 ring-2 ring-rose-300/40'
            }`}
            style={{ left: `${percentage}%` }}
          />
        </div>

        {/* Legend labels */}
        <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
          <span>0 Ω (Ideal)</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            ▲ Límite NOM 25 Ω
          </span>
          <span>50+ Ω (Crítico)</span>
        </div>
      </div>
    </div>
  );
};
