/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Code2, 
  SlidersHorizontal, 
  Printer, 
  Copy, 
  Check, 
  BookOpen, 
  Activity, 
  Camera,
  Award,
  Box,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { DatosLevantamiento } from './types/dictamen';
import { 
  CASO_ABARROTES_AZTECA, 
  generarDictamenJSON, 
  REPORTE_SEGURIDAD_CAMPO,
  ANALISIS_PARAMETROS_ELECTRICOS,
  DICTAMEN_OFICIAL_COMPLETO,
  OBSERVACIONES_FISICAS_SUBESTACION
} from './data/defaultData';
import { PhysicalObservationsView } from './components/PhysicalObservationsView';
import { OfficialDictamenCard } from './components/OfficialDictamenCard';
import { ElectricalParametersView } from './components/ElectricalParametersView';
import { SecurityReportView } from './components/SecurityReportView';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { JsonViewer } from './components/JsonViewer';
import { InspectionEditor } from './components/InspectionEditor';
import { NomGuideModal } from './components/NomGuideModal';

type TabType = 'subestacion' | 'oficial' | 'parametros' | 'seguridad' | 'dictamen' | 'json' | 'editor';
type JsonViewType = 'subestacion' | 'oficial' | 'parametros' | 'seguridad' | 'dictamen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('subestacion');
  const [datosLevantamiento, setDatosLevantamiento] = useState<DatosLevantamiento>(CASO_ABARROTES_AZTECA);
  const [selectedJsonView, setSelectedJsonView] = useState<JsonViewType>('subestacion');
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [isNomModalOpen, setIsNomModalOpen] = useState(false);
  const [selectedNomArticle, setSelectedNomArticle] = useState<string | null>(null);

  // Memoize generated dictamen JSON based on current inputs
  const dictamenJSON = useMemo(() => {
    return generarDictamenJSON(datosLevantamiento);
  }, [datosLevantamiento]);

  const activeJson = useMemo(() => {
    if (selectedJsonView === 'subestacion') return OBSERVACIONES_FISICAS_SUBESTACION;
    if (selectedJsonView === 'oficial') return DICTAMEN_OFICIAL_COMPLETO;
    if (selectedJsonView === 'parametros') return ANALISIS_PARAMETROS_ELECTRICOS;
    if (selectedJsonView === 'seguridad') return REPORTE_SEGURIDAD_CAMPO;
    return dictamenJSON;
  }, [selectedJsonView, dictamenJSON]);

  const handleCopyQuickJson = async () => {
    try {
      const jsonStr = JSON.stringify(activeJson, null, 2);
      await navigator.clipboard.writeText(jsonStr);
      setCopiedHeader(true);
      setTimeout(() => setCopiedHeader(false), 2000);
    } catch {
      setActiveTab('json');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenNomArticle = (articulo: string) => {
    setSelectedNomArticle(articulo);
    setIsNomModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans overflow-x-hidden">
      {/* Top Application Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 print:hidden shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black tracking-tight text-sm sm:text-base shrink-0 shadow-sm">
              ⚡
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-xs sm:text-sm md:text-base tracking-tight text-white truncate">
                  Dictamen NOM-001-SEDE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  Folio 359
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-xs md:max-w-md">
                Abarrotes Azteca Suc. Tijeras • Ing. Israel Orozco Arias
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedNomArticle(null);
                setIsNomModalOpen(true);
              }}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>NOM-001</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Imprimir reporte"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleCopyQuickJson}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                copiedHeader
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {copiedHeader ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span className="hidden xs:inline">¡Copiado!</span>
                  <span className="xs:hidden">OK</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar JSON</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar / Scrollable Responsive Tabs */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-2 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <nav className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none whitespace-nowrap text-xs font-medium w-full sm:w-auto -mx-1 px-1">
              <button
                onClick={() => {
                  setActiveTab('subestacion');
                  setSelectedJsonView('subestacion');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'subestacion'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Hallazgos Subestación (2)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('oficial');
                  setSelectedJsonView('oficial');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'oficial'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Cédula Dictamen</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('parametros');
                  setSelectedJsonView('parametros');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'parametros'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Parámetros Eléctricos</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('seguridad');
                  setSelectedJsonView('seguridad');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'seguridad'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Evidencias Fotos</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('dictamen');
                  setSelectedJsonView('dictamen');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'dictamen'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resumen UVIE</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'json'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>JSON</span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'editor'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
            </nav>

            <div className="hidden xl:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>2 observaciones en subestación</span>
              <span className="text-slate-600">|</span>
              <span>NOM-001-SEDE</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 flex-1 w-full space-y-5">
        {/* Responsive Mobile Jump Bar / Banner */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 print:hidden">
          <div className="flex items-start gap-2.5 min-w-0">
            <Box className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="min-w-0">
              <strong className="font-bold block sm:inline">Hallazgos de Subestación y Tableros Procesados:</strong>
              <p className="text-amber-900/90 text-xs mt-0.5 break-words">
                1) Falta de letreros preventivos de alto voltaje (Arts. 110-21/450). 2) Ausencia de registro visible para electrodo de tierra (Arts. 250-68/250-70).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedJsonView('subestacion');
                setActiveTab('json');
              }}
              className="w-full sm:w-auto justify-center text-xs font-bold text-amber-950 bg-amber-400/80 hover:bg-amber-400 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5" /> Ver JSON de Observaciones
            </button>
          </div>
        </div>

        {/* Tab views */}
        {activeTab === 'subestacion' && (
          <PhysicalObservationsView
            data={OBSERVACIONES_FISICAS_SUBESTACION}
            onOpenNomDetail={handleOpenNomArticle}
          />
        )}

        {activeTab === 'oficial' && (
          <OfficialDictamenCard data={DICTAMEN_OFICIAL_COMPLETO} />
        )}

        {activeTab === 'parametros' && (
          <ElectricalParametersView data={ANALISIS_PARAMETROS_ELECTRICOS} />
        )}

        {activeTab === 'seguridad' && (
          <SecurityReportView
            reporte={REPORTE_SEGURIDAD_CAMPO}
            onOpenNomDetail={handleOpenNomArticle}
          />
        )}

        {activeTab === 'dictamen' && (
          <ExecutiveSummaryView
            datos={datosLevantamiento}
            dictamen={dictamenJSON}
            onOpenNomDetail={handleOpenNomArticle}
          />
        )}

        {activeTab === 'json' && (
          <div className="space-y-4 max-w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Seleccionar JSON:
                </span>
                <div className="flex flex-wrap gap-1 p-1 rounded-lg border border-slate-300 bg-white text-xs">
                  <button
                    onClick={() => setSelectedJsonView('subestacion')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'subestacion'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Hallazgos Subestación (2)
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('oficial')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'oficial'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Cédula Oficial
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('parametros')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'parametros'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Parámetros Eléctricos
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('seguridad')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'seguridad'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Evidencias Fotos (3)
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('dictamen')}
                    className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'dictamen'
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Resumen UVIE
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="p-3.5 sm:p-5 overflow-x-auto text-[11px] sm:text-xs md:text-sm font-mono leading-relaxed bg-[#0d1117] text-slate-300 max-h-[600px] overflow-y-auto">
                <pre>
                  <code>{JSON.stringify(activeJson, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'editor' && (
          <InspectionEditor
            datos={datosLevantamiento}
            onChange={setDatosLevantamiento}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-5 text-xs text-slate-500 print:hidden mt-8">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
            <span className="font-bold text-slate-800">Dictamen Oficial NOM-001-SEDE</span>
            <span>•</span>
            <span className="font-mono">Folio: 359/2026</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedNomArticle(null);
                setIsNomModalOpen(true);
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Marco Normativo
            </button>
            <span>•</span>
            <span>SENER / UVIE</span>
          </div>
        </div>
      </footer>

      {/* NOM Reference Modal */}
      <NomGuideModal
        isOpen={isNomModalOpen}
        onClose={() => setIsNomModalOpen(false)}
        selectedArticle={selectedNomArticle}
      />
    </div>
  );
}
