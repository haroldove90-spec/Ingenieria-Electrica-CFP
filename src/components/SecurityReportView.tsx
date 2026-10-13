import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Check, 
  Copy, 
  Download, 
  Code2, 
  BookOpen, 
  ExternalLink,
  Flame,
  Lightbulb,
  Cpu
} from 'lucide-react';
import { ReporteObservacionesSeguridadJSON } from '../types/dictamen';

interface SecurityReportViewProps {
  reporte: ReporteObservacionesSeguridadJSON;
  onOpenNomDetail: (articulo: string) => void;
}

export const SecurityReportView: React.FC<SecurityReportViewProps> = ({ reporte, onOpenNomDetail }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(reporte, null, 2);

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
    link.download = `reporte_seguridad_evidencias_nom001.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getElementIcon = (id: number) => {
    if (id === 1) return <Cpu className="w-5 h-5 text-rose-500" />;
    if (id === 2) return <Lightbulb className="w-5 h-5 text-amber-500" />;
    return <Flame className="w-5 h-5 text-orange-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Evidencias Fotográficas de Campo
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NOM-001-SEDE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Reporte de Observaciones de Seguridad e Instalación
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Evaluación técnica de riesgos y no conformidades identificadas en recorrido físico
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-semibold text-slate-500 mb-1">
              No Conformidades Detectadas:
            </span>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold bg-rose-50 text-rose-800 border border-rose-200 shadow-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{reporte.total_no_conformidades} Hallazgos Críticos</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              Requieren atención inmediata
            </span>
          </div>
        </div>

        {/* Resumen de hallazgos */}
        <div className="pt-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Resumen de Hallazgos y Nivel de Riesgo General:
          </span>
          <div className="bg-rose-50/50 border-l-4 border-rose-600 p-3.5 rounded-r-lg text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
            {reporte.resumen_hallazgos}
          </div>
        </div>
      </div>

      {/* Observaciones Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Desglose Técnico de Evidencias ({reporte.lista_observaciones.length})
        </h2>

        {reporte.lista_observaciones.map((obs) => {
          const isHigh = obs.clasificacion_riesgo === 'Alto';
          return (
            <div
              key={obs.id_observacion}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-100">
                    {getElementIcon(obs.id_observacion)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Obs #{obs.id_observacion}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {obs.elemento_inspeccionado}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      isHigh
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    Riesgo {obs.clasificacion_riesgo}
                  </span>

                  <button
                    onClick={() => onOpenNomDetail(obs.articulo_nom_001)}
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                    title="Consultar artículo normativo"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{obs.articulo_nom_001}</span>
                    <ExternalLink className="w-3 h-3 text-blue-500" />
                  </button>
                </div>
              </div>

              {/* Descripcion hallazgo */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Descripción Técnica del Hallazgo:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {obs.descripcion_hallazgo}
                </p>
              </div>

              {/* Medida correctiva */}
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  Medida Correctiva Reglamentaria:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/60 p-3 rounded-lg border-l-3 border-emerald-500">
                  {obs.medida_correctiva}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* JSON Output Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mt-6">
        <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-slate-200">
              JSON Oficial: Reporte de Observaciones de Seguridad e Instalación
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                copied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copiar JSON
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar .json
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-slate-300 max-h-[500px] overflow-y-auto">
          <pre>
            <code>{jsonString}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
