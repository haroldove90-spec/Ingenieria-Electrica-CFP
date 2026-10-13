import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  AlertTriangle, 
  ShieldCheck, 
  Check, 
  Copy, 
  Download, 
  Code2, 
  CheckCircle2, 
  Gauge, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';
import { AnalisisParametrosElectricosJSON } from '../types/dictamen';
import { GroundingGauge } from './GroundingGauge';

interface ElectricalParametersViewProps {
  data: AnalisisParametrosElectricosJSON;
}

export const ElectricalParametersView: React.FC<ElectricalParametersViewProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = jsonString;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `analisis_parametros_electricos_nom001.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Overview Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Cuadro de Cargas y Calidad de Energía
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NOM-001-SEDE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Análisis de Parámetros Eléctricos y Sistema de Tierras
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Evaluación de factor de carga, desequilibrio entre fases y resistencia de puesta a tierra
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-semibold text-slate-500 mb-1">
              Estado General de Operación:
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-amber-50 text-amber-900 border border-amber-200 shadow-xs">
              <Activity className="w-4 h-4 text-amber-600" />
              <span>Operativo con Desbalance</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Desequilibrio de fases a corregir
            </span>
          </div>
        </div>

        {/* 3 Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {/* Capacidad Subestacion */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span>Capacidad Subestación</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {data.evaluacion_capacidad_subestacion.estado_capacidad}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">
                {data.evaluacion_capacidad_subestacion.porcentaje_utilizacion}
              </span>
              <span className="text-xs text-slate-500 font-medium">de 75 kVA</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: '69.3%' }}
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {data.evaluacion_capacidad_subestacion.diagnostico_tecnico}
            </p>
          </div>

          {/* Balance de Fases */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Balance de Fases</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                {data.evaluacion_balance_fases.estado_balance}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-rose-600 font-mono">
                {data.evaluacion_balance_fases.porcentaje_desbalance}
              </span>
              <span className="text-xs text-slate-500 font-medium">desequilibrio (máx rec. 5%)</span>
            </div>
            {/* Visual phase bars */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>L1: 140A</span>
                <span>L2: 138A</span>
                <span className="text-rose-600 font-bold">L3: 110A (-21%)</span>
              </div>
              <div className="grid grid-cols-3 gap-1 h-2">
                <div className="bg-blue-600 rounded-xs" style={{ width: '100%' }} />
                <div className="bg-blue-500 rounded-xs" style={{ width: '98%' }} />
                <div className="bg-rose-400 rounded-xs" style={{ width: '78%' }} />
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {data.evaluacion_balance_fases.observacion_balance}
            </p>
          </div>

          {/* Sistema de Tierras */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sistema de Tierras (SPT)</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {data.evaluacion_sistema_tierra.cumplimiento}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-mono">
                {data.evaluacion_sistema_tierra.valor_resistencia_ohms} <span className="text-lg text-slate-500">Ω</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">límite: 25.0 Ω</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-500 h-2 rounded-full transition-all"
                style={{ width: `${(18.5 / 25) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {data.evaluacion_sistema_tierra.dictamen_tierra}
            </p>
          </div>
        </div>
      </div>

      {/* Grounding Meter visual */}
      <GroundingGauge ohms={data.evaluacion_sistema_tierra.valor_resistencia_ohms} maxLimit={data.evaluacion_sistema_tierra.limite_maximo_nom} />

      {/* Recomendaciones Operativas */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Recomendaciones Operativas y Plan de Acción
          </h2>
        </div>

        <div className="space-y-3">
          {data.recomendaciones_operativas.map((rec, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs sm:text-sm text-slate-800"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">
                {idx + 1}
              </div>
              <p className="leading-relaxed font-medium">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
