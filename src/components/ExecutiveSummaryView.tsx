import React from 'react';
import { 
  Building2, 
  Zap, 
  AlertOctagon, 
  CheckCircle2, 
  BookOpen, 
  Wrench, 
  ShieldAlert, 
  FileCheck,
  Calendar,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { DatosLevantamiento, DictamenTecnicoJSON } from '../types/dictamen';
import { GroundingGauge } from './GroundingGauge';
import { ARTICULOS_NOM_INFO } from '../data/defaultData';

interface ExecutiveSummaryViewProps {
  datos: DatosLevantamiento;
  dictamen: DictamenTecnicoJSON;
  onOpenNomDetail: (articulo: string) => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  datos,
  dictamen,
  onOpenNomDetail
}) => {
  const isApproved = dictamen.conclusion_dictamen === 'Aprobado';

  return (
    <div className="space-y-6">
      {/* Official Audit Card Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Dictamen Técnico de Verificación
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NOM-001-SEDE
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {datos.cliente}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Sucursal Tijeras
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Visita de Inspección Técnica
              </span>
            </p>
          </div>

          {/* Dictamen Conclusion Badge */}
          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-semibold text-slate-500 mb-1">
              Dictamen Final de Cumplimiento:
            </span>
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-bold border shadow-xs ${
                isApproved
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-amber-50 text-amber-900 border-amber-300'
              }`}
            >
              {isApproved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Aprobado</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-4 h-4 text-amber-600" />
                  <span>No Aprobado con condicionantes</span>
                </>
              )}
            </div>
            <span className="text-[11px] text-slate-400 mt-1">
              {isApproved ? 'Instalación conforme' : 'Requiere solventación de no conformidades'}
            </span>
          </div>
        </div>

        {/* Technical installation specifications grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Building2 className="w-3.5 h-3.5" /> Subestación
            </div>
            <div className="font-semibold text-slate-800">{datos.subestacion}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <Zap className="w-3.5 h-3.5" /> Capacidad
            </div>
            <div className="font-semibold text-slate-800">{datos.capacidad}</div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Resistencia Tierra
            </div>
            <div className="font-semibold text-emerald-700">
              {datos.resistencia_tierra_ohms.toFixed(1)} Ω (Permisible)
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="text-slate-400 flex items-center gap-1 mb-1">
              <FileCheck className="w-3.5 h-3.5" /> Observaciones
            </div>
            <div className="font-semibold text-amber-700">
              {datos.observaciones.length} No conformidades
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileCheck className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Resumen Ejecutivo del Estado General
          </h2>
        </div>
        <div className="bg-blue-50/50 border-l-4 border-blue-600 p-4 rounded-r-lg">
          <p className="text-sm leading-relaxed text-slate-700 font-medium">
            {dictamen.resumen_ejecutivo}
          </p>
        </div>
      </div>

      {/* Evaluación del Sistema de Tierra */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              Evaluación del Sistema de Puesta a Tierra
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {dictamen.evaluacion_sistema_tierra.cumple_norma ? '✓ En Tolerancia' : '✗ Fuera de Norma'}
          </span>
        </div>

        <GroundingGauge ohms={dictamen.evaluacion_sistema_tierra.valor_medido_ohms} maxLimit={25.0} />

        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-700">
          <strong className="text-slate-900 block mb-1">Criterio Normativo de Aceptación:</strong>
          <p className="leading-relaxed">
            {dictamen.evaluacion_sistema_tierra.criterio_normativo}
          </p>
        </div>
      </div>

      {/* Observaciones Normativas & Plan de Acción */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-rose-500" />
            <h2 className="text-base font-bold text-slate-900">
              Observaciones Normativas y Acciones Correctivas
            </h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
            {dictamen.observaciones_normativas.length} hallazgos
          </span>
        </div>

        <div className="space-y-4">
          {dictamen.observaciones_normativas.map((obs, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50/50 hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                    Área: {obs.area}
                  </span>
                </div>

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

              {/* Condicion detectada */}
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-500 block mb-1 uppercase tracking-wider">
                  Condición Detectada en Sitio:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed bg-amber-50/60 p-3 rounded-lg border-l-3 border-amber-500">
                  {obs.condicion_detectada}
                </p>
              </div>

              {/* Accion correctiva */}
              <div>
                <span className="text-xs font-bold text-emerald-800 block mb-1 uppercase tracking-wider flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                  Acción Correctiva Obligatoria:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-3 rounded-lg border-l-3 border-emerald-500">
                  {obs.accion_correctiva}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
