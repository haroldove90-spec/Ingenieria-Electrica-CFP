import React, { useState } from 'react';
import { RotateCcw, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { DatosLevantamiento } from '../types/dictamen';
import { CASO_ABARROTES_AZTECA } from '../data/defaultData';

interface InspectionEditorProps {
  datos: DatosLevantamiento;
  onChange: (nuevosDatos: DatosLevantamiento) => void;
}

export const InspectionEditor: React.FC<InspectionEditorProps> = ({ datos, onChange }) => {
  const [showSuccessBadge, setShowSuccessBadge] = useState(false);

  const handleReset = () => {
    onChange(JSON.parse(JSON.stringify(CASO_ABARROTES_AZTECA)));
    setShowSuccessBadge(true);
    setTimeout(() => setShowSuccessBadge(false), 2000);
  };

  const handleFieldChange = (field: keyof DatosLevantamiento, value: string | number) => {
    onChange({
      ...datos,
      [field]: value
    });
  };

  const handleObservationChange = (index: number, field: string, value: string) => {
    const updated = [...datos.observaciones];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange({
      ...datos,
      observaciones: updated
    });
  };

  const handleAddObservation = () => {
    const newObs = {
      id: `obs-${Date.now()}`,
      area: 'Canalizaciones / Cableado',
      texto_original: 'Nueva observación detectada en levantamiento',
      condicion_detectada: 'Conductor sin identificación de fases y terminales con sobrecalentamiento visible.',
      articulo_nom_001: 'NOM-001-SEDE-2012, Artículos 200-6 y 110-14',
      accion_correctiva: 'Identificar conductores con código de colores normativo y reapretar conexiones con torquímetro.',
      severidad: 'media' as const
    };
    onChange({
      ...datos,
      observaciones: [...datos.observaciones, newObs]
    });
  };

  const handleRemoveObservation = (index: number) => {
    const updated = datos.observaciones.filter((_, i) => i !== index);
    onChange({
      ...datos,
      observaciones: updated
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Parámetros del Levantamiento Técnico
          </h2>
          <p className="text-xs text-slate-500">
            Modifica datos de campo para recalcular el dictamen y JSON en tiempo real.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {showSuccessBadge && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-3.5 h-3.5" /> Valores originales restaurados
            </span>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restaurar Caso Original
          </button>
        </div>
      </div>

      {/* Main attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Cliente / Razón Social
          </label>
          <input
            type="text"
            value={datos.cliente}
            onChange={(e) => handleFieldChange('cliente', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Tipo de Subestación
          </label>
          <input
            type="text"
            value={datos.subestacion}
            onChange={(e) => handleFieldChange('subestacion', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Capacidad del Transformador
          </label>
          <input
            type="text"
            value={datos.capacidad}
            onChange={(e) => handleFieldChange('capacidad', e.target.value)}
            className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Resistencia de Tierra (Ohms)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="0"
              value={datos.resistencia_tierra_ohms}
              onChange={(e) => handleFieldChange('resistencia_tierra_ohms', parseFloat(e.target.value) || 0)}
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white font-mono font-bold"
            />
            <span className="absolute right-3 top-2 text-xs font-mono text-slate-400">Ω</span>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            {datos.resistencia_tierra_ohms <= 25 ? '✓ Cumple NOM (≤ 25Ω)' : '✗ Excede límite NOM (> 25Ω)'}
          </span>
        </div>
      </div>

      {/* Observations section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">
            Observaciones Normativas Levantadas ({datos.observaciones.length})
          </h3>
          <button
            onClick={handleAddObservation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Agregar Observación
          </button>
        </div>

        <div className="space-y-4">
          {datos.observaciones.map((obs, idx) => (
            <div key={obs.id || idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Hallazgo #{idx + 1}
                </span>
                <button
                  onClick={() => handleRemoveObservation(idx)}
                  className="text-xs text-rose-600 hover:text-rose-800 p-1 rounded hover:bg-rose-50"
                  title="Eliminar observación"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Área
                  </label>
                  <input
                    type="text"
                    value={obs.area}
                    onChange={(e) => handleObservationChange(idx, 'area', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                    Artículo NOM-001 Aplicable
                  </label>
                  <input
                    type="text"
                    value={obs.articulo_nom_001}
                    onChange={(e) => handleObservationChange(idx, 'articulo_nom_001', e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                  Condición Detectada
                </label>
                <textarea
                  rows={2}
                  value={obs.condicion_detectada}
                  onChange={(e) => handleObservationChange(idx, 'condicion_detectada', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-emerald-800 uppercase mb-1">
                  Acción Correctiva
                </label>
                <textarea
                  rows={2}
                  value={obs.accion_correctiva}
                  onChange={(e) => handleObservationChange(idx, 'accion_correctiva', e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 rounded border border-slate-300 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
