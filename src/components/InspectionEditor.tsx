import React, { useState } from 'react';
import { 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Loader2,
  FileCheck,
  Bot
} from 'lucide-react';
import { DatosLevantamiento } from '../types/dictamen';
import { CASO_ABARROTES_AZTECA } from '../data/defaultData';
import { ejecutarCrearNuevoEstudio, GeneratedStudyResult } from '../services/aiStudioService';

interface InspectionEditorProps {
  datos: DatosLevantamiento;
  onChange: (nuevosDatos: DatosLevantamiento) => void;
  onStudyCreated?: (result: GeneratedStudyResult) => void;
}

export const InspectionEditor: React.FC<InspectionEditorProps> = ({ 
  datos, 
  onChange,
  onStudyCreated 
}) => {
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);
  const [isProcessingAI, setIsProcessingAI] = useState(false);
  const [aiResult, setAiResult] = useState<GeneratedStudyResult | null>(null);

  // Form values state with default field values
  const [nuevoEstudio, setNuevoEstudio] = useState({
    folio: '360/2026',
    fecha: '13-oct-2026',
    razonSocial: 'ABARROTES AZTECA TIJERAS S.A DE C.V',
    nombreComercial: 'Abarrotes Azteca Suc. Tijeras',
    rfc: 'AAT170629U46',
    domicilio: 'Juan de Baeza #600, Col. Dieciocho de Mayo, Morelia, Michoacán',
    capacidadKva: 75,
    cargaInstalada: 27.25,
    observaciones: 'Falta de letreros preventivos de alto voltaje en subestación y electrodo de tierra sin registro de inspección.',
    resistenciaTierra: 18.5
  });

  const handleReset = () => {
    onChange(JSON.parse(JSON.stringify(CASO_ABARROTES_AZTECA)));
    setAiResult(null);
    setShowSuccessBadge(true);
    setTimeout(() => setShowSuccessBadge(false), 2000);
  };

  /**
   * Ejecuta el código solicitado por el usuario:
   * 1. Capturar los valores que el usuario escribió en el formulario HTML (input-folio, input-razon, input-capacidad, input-observaciones)
   * 2. Construir el prompt dinámicamente con esos valores
   * 3. Enviar este 'promptDinamico' a la API de AI Studio
   */
  const handleCrearNuevoEstudioConAI = async () => {
    setIsProcessingAI(true);
    setAiResult(null);

    try {
      // Llamada al servicio que ejecuta la captura y llamada a Gemini API
      const resultado = await ejecutarCrearNuevoEstudio();
      setAiResult(resultado);

      // Actualizar el estado del levantamiento en la plataforma
      const capacidadNum = parseFloat(resultado.capacidad) || 75;
      onChange({
        cliente: resultado.razon_social,
        subestacion: 'Subestación tipo pedestal',
        capacidad: `${capacidadNum} kVA`,
        resistencia_tierra_ohms: nuevoEstudio.resistenciaTierra || 18.5,
        observaciones: [
          {
            id: `obs-${Date.now()}`,
            area: 'Subestación / Seguridad Eléctrica',
            texto_original: resultado.resumen_hallazgos,
            condicion_detectada: resultado.resumen_hallazgos,
            articulo_nom_001: 'NOM-001-SEDE-2012, Artículos 110-21 y 250-68',
            accion_correctiva: 'Subsanar no conformidades señaladas e instalar señalización preventiva obligatoria.',
            severidad: 'alta'
          }
        ]
      });

      if (onStudyCreated) {
        onStudyCreated(resultado);
      }

      setShowSuccessBadge(true);
      setTimeout(() => setShowSuccessBadge(false), 3000);
    } catch (err) {
      console.error("Error al procesar con AI Studio:", err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleLoadPresetBodega = () => {
    setNuevoEstudio({
      folio: '361/2026',
      fecha: '13-oct-2026',
      razonSocial: 'DISTRIBUIDORA DE ABARROTES DEL BAJÍO S.A. DE C.V.',
      nombreComercial: 'Bodega Central de Abastos',
      rfc: 'DAB190812K89',
      domicilio: 'Av. Periférico Paseo de la República #4500, Morelia, Michoacán',
      capacidadKva: 112.5,
      cargaInstalada: 45.0,
      observaciones: 'Llegada de acometida con holgura de conductores y barra de tierra con conexiones sin terminales ponchadas.',
      resistenciaTierra: 14.2
    });
  };

  return (
    <div className="space-y-6">
      {/* Formulario de Levantamiento con IDs exactos */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                Formulario de Levantamiento
              </span>
              <span className="text-xs text-slate-400 font-mono">
                NOM-001-SEDE
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
              Crear Nuevo Estudio de Visita Técnica
            </h2>
            <p className="text-xs text-slate-500">
              Captura los datos y pulsa el botón para generar el dictamen técnico mediante AI Studio.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleLoadPresetBodega}
              className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              Cargar Ejemplo 112.5 kVA
            </button>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restaurar
            </button>
          </div>
        </div>

        {/* Inputs con los IDs exactos solicitados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
          {/* 1. id="input-folio" */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Folio del Dictamen <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-folio"
              type="text"
              value={nuevoEstudio.folio}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, folio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-mono"
              placeholder="ej. 359/2026"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Fecha de la Inspección
            </label>
            <input
              type="text"
              value={nuevoEstudio.fecha}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, fecha: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="ej. 02-oct-2026"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              RFC del Cliente
            </label>
            <input
              type="text"
              value={nuevoEstudio.rfc}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, rfc: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-mono uppercase"
              placeholder="ej. AAT170629U46"
            />
          </div>

          {/* 2. id="input-razon" */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Razón Social <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-razon"
              type="text"
              value={nuevoEstudio.razonSocial}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, razonSocial: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
              placeholder="ej. ABARROTES AZTECA TIJERAS S.A DE C.V"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Nombre Comercial
            </label>
            <input
              type="text"
              value={nuevoEstudio.nombreComercial}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, nombreComercial: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Domicilio de la Instalación
            </label>
            <input
              type="text"
              value={nuevoEstudio.domicilio}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, domicilio: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          {/* 3. id="input-capacidad" */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Capacidad de Subestación (kVA) <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-capacidad"
              type="number"
              value={nuevoEstudio.capacidadKva}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, capacidadKva: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-mono font-bold"
              placeholder="75"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Carga Instalada (kW)
            </label>
            <input
              type="number"
              step="0.01"
              value={nuevoEstudio.cargaInstalada}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, cargaInstalada: parseFloat(e.target.value) || 0 })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Resistencia de Tierra (Ohms)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={nuevoEstudio.resistenciaTierra}
                onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, resistenciaTierra: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white font-mono font-bold"
              />
              <span className="absolute right-3 top-2 text-slate-400 font-mono">Ω</span>
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              {nuevoEstudio.resistenciaTierra <= 25 ? '✓ Cumple Límite NOM (≤ 25Ω)' : '✗ Excede límite NOM (> 25Ω)'}
            </span>
          </div>

          {/* 4. id="input-observaciones" */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Observaciones de Campo <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="input-observaciones"
              rows={3}
              value={nuevoEstudio.observaciones}
              onChange={(e) => setNuevoEstudio({ ...nuevoEstudio, observaciones: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white leading-relaxed"
              placeholder="Describe los hallazgos observados durante la visita..."
            />
          </div>
        </div>

        {/* Action Button: Botón para crear nuevo estudio con AI Studio */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            {showSuccessBadge && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ¡Estudio generado con éxito y aplicado al dictamen oficial!
              </span>
            )}
          </div>

          <button
            id="btn-crear-estudio"
            onClick={handleCrearNuevoEstudioConAI}
            disabled={isProcessingAI}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 transition-all shadow-sm flex items-center justify-center gap-2"
          >
            {isProcessingAI ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Procesando con AI Studio...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Crear Nuevo Estudio con AI Studio</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Resultado del estudio generado por AI Studio */}
      {aiResult && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 sm:p-5 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between border-b border-emerald-200 pb-2">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-700" />
              <h3 className="text-sm font-bold text-emerald-950">
                Respuesta Procesada por AI Studio
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-200/60 text-emerald-900 font-bold">
              Folio: {aiResult.folio}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Razón Social</span>
              <strong className="text-slate-900">{aiResult.razon_social}</strong>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Capacidad</span>
              <strong className="text-slate-900">{aiResult.capacidad} kVA</strong>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-100">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Estado Dictamen</span>
              <strong className="text-emerald-700">Actualizado en la plataforma</strong>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Resumen de Hallazgos</span>
            <p className="text-slate-700 leading-relaxed">{aiResult.resumen_hallazgos}</p>
          </div>
        </div>
      )}
    </div>
  );
};
