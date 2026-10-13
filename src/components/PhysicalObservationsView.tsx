import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BookOpen, 
  Check, 
  Code2, 
  Copy, 
  Download, 
  ExternalLink, 
  ShieldAlert, 
  Wrench, 
  Zap,
  Box
} from 'lucide-react';
import { ReporteObservacionesFisicasJSON } from '../types/dictamen';

interface PhysicalObservationsViewProps {
  data: ReporteObservacionesFisicasJSON;
  onOpenNomDetail: (articulo: string) => void;
}

export const PhysicalObservationsView: React.FC<PhysicalObservationsViewProps> = ({
  data,
  onOpenNomDetail
}) => {
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
    link.download = `observaciones_subestacion_tableros_nom001.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-full">
      {/* Header Summary */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                Inspección Física de Subestación
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {data.normativa_aplicada}
              </span>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 tracking-tight break-words">
              Observaciones Normativas: Subestación y Tableros
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Hallazgos prioritarios detectados en envolventes y registros del sistema de tierra
            </p>
          </div>

          <div className="flex items-center sm:flex-col sm:items-end shrink-0 gap-2 sm:gap-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-50 text-amber-900 border border-amber-200">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>{data.total_observaciones} No Conformidades</span>
            </div>
            <span className="text-[11px] text-slate-400">
              Acción correctiva obligatoria
            </span>
          </div>
        </div>

        <div className="pt-3 text-xs text-slate-600 leading-relaxed">
          Las observaciones documentadas a continuación corresponden a elementos físicos que contravienen las disposiciones de seguridad de la <strong>NOM-001-SEDE-2012</strong>, debiendo ser solventadas antes de la emisión del dictamen definitivo favorable.
        </div>
      </div>

      {/* Responsive Cards */}
      <div className="space-y-4">
        {data.detalle_observaciones.map((obs) => (
          <div
            key={obs.consecutivo}
            className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-3 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {obs.consecutivo}
                </span>
                <div className="flex items-center gap-1.5 min-w-0">
                  {obs.consecutivo === 1 ? (
                    <Box className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  <h3 className="text-sm font-bold text-slate-900 truncate">
                    {obs.elemento_afectado}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => onOpenNomDetail(obs.articulo_nom)}
                className="self-start sm:self-auto inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                title="Ver artículo normativo"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span className="break-all">{obs.articulo_nom}</span>
                <ExternalLink className="w-3 h-3 text-blue-500 shrink-0" />
              </button>
            </div>

            {/* Descripcion no conformidad */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Descripción de la No Conformidad:
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed bg-amber-50/60 p-3 rounded-lg border-l-3 border-amber-500 font-medium">
                {obs.descripcion_no_conformidad}
              </p>
            </div>

            {/* Accion correctiva */}
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                Acción Correctiva Requerida:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border-l-3 border-emerald-500">
                {obs.accion_correctiva_requerida}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table view optimized for tablet/desktop with overflow scroll for mobile */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs sm:text-sm text-slate-800 flex items-center justify-between">
          <span>Tabla Resumen del Reporte Oficial</span>
          <span className="text-[11px] font-normal text-slate-500">Desplazable horizontalmente</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider">
                <th className="p-3 w-12 text-center">#</th>
                <th className="p-3 min-w-[160px]">Elemento</th>
                <th className="p-3 min-w-[260px]">No Conformidad</th>
                <th className="p-3 min-w-[150px]">Artículo NOM</th>
                <th className="p-3 min-w-[220px]">Acción Correctiva</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {data.detalle_observaciones.map((obs) => (
                <tr key={obs.consecutivo} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-mono font-bold text-center text-slate-500">
                    {obs.consecutivo}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    {obs.elemento_afectado}
                  </td>
                  <td className="p-3 leading-relaxed">
                    {obs.descripcion_no_conformidad}
                  </td>
                  <td className="p-3 font-mono text-blue-700 font-semibold whitespace-nowrap">
                    {obs.articulo_nom}
                  </td>
                  <td className="p-3 text-emerald-800 leading-relaxed">
                    {obs.accion_correctiva_requerida}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
