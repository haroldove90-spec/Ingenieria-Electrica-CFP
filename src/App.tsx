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
  Gauge
} from 'lucide-react';
import { DatosLevantamiento } from './types/dictamen';
import { 
  CASO_ABARROTES_AZTECA, 
  generarDictamenJSON, 
  REPORTE_SEGURIDAD_CAMPO,
  ANALISIS_PARAMETROS_ELECTRICOS
} from './data/defaultData';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { SecurityReportView } from './components/SecurityReportView';
import { ElectricalParametersView } from './components/ElectricalParametersView';
import { JsonViewer } from './components/JsonViewer';
import { InspectionEditor } from './components/InspectionEditor';
import { NomGuideModal } from './components/NomGuideModal';

type TabType = 'parametros' | 'seguridad' | 'dictamen' | 'json' | 'editor';
type JsonViewType = 'parametros' | 'seguridad' | 'dictamen';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('parametros');
  const [datosLevantamiento, setDatosLevantamiento] = useState<DatosLevantamiento>(CASO_ABARROTES_AZTECA);
  const [selectedJsonView, setSelectedJsonView] = useState<JsonViewType>('parametros');
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [isNomModalOpen, setIsNomModalOpen] = useState(false);
  const [selectedNomArticle, setSelectedNomArticle] = useState<string | null>(null);

  // Memoize generated dictamen JSON based on current inputs
  const dictamenJSON = useMemo(() => {
    return generarDictamenJSON(datosLevantamiento);
  }, [datosLevantamiento]);

  const activeJson = useMemo(() => {
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
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 print:hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black tracking-tight text-base shadow-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                  Dictamen Eléctrico NOM-001-SEDE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  UVIE Auditor
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-md">
                Abarrotes Azteca Suc. Tijeras • Subestación 75 kVA
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedNomArticle(null);
                setIsNomModalOpen(true);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>NOM-001</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="Imprimir reporte técnico"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleCopyQuickJson}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm ${
                copiedHeader
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {copiedHeader ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>¡JSON Copiado!</span>
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

        {/* Sub Navigation Bar / Tabs */}
        <div className="bg-slate-950/70 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto">
            <nav className="flex space-x-1 sm:space-x-2 py-2 text-xs font-medium">
              <button
                onClick={() => {
                  setActiveTab('parametros');
                  setSelectedJsonView('parametros');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'parametros'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Parámetros Eléctricos</span>
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('seguridad');
                  setSelectedJsonView('seguridad');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'seguridad'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Evidencias (Seguridad)</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('dictamen');
                  setSelectedJsonView('dictamen');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'dictamen'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Dictamen UVIE</span>
              </button>

              <button
                onClick={() => setActiveTab('json')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'json'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>JSON Exportable</span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editor</span>
              </button>
            </nav>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SPT: <strong>18.5 Ω (Cumple)</strong></span>
              <span className="text-slate-600">|</span>
              <span>Carga: <strong>69.3%</strong></span>
              <span className="text-slate-600">|</span>
              <span className="text-rose-400 font-medium">Desbalance: 18%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Banner Alert */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 print:hidden">
          <div className="flex items-start gap-3">
            <Activity className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Análisis de Parámetros Eléctricos Calculado:</strong>
              <p className="text-amber-900/90 text-xs mt-0.5">
                Capacidad del transformador adecuada (69.3% de 75 kVA) y resistencia de tierra reglamentaria (18.5 Ω ≤ 25 Ω). Se detectó un <strong>desbalance entre fases del 18%</strong> (L1=140A, L2=138A vs L3=110A) que requiere rebalanceo urgente.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedJsonView('parametros');
                setActiveTab('json');
              }}
              className="text-xs font-bold text-amber-950 bg-amber-400/80 hover:bg-amber-400 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
            >
              <Code2 className="w-3.5 h-3.5" /> Ver JSON de Parámetros
            </button>
          </div>
        </div>

        {/* Tab views */}
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
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Seleccionar JSON:
                </span>
                <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white text-xs">
                  <button
                    onClick={() => setSelectedJsonView('parametros')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'parametros'
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Parámetros Eléctricos
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('seguridad')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'seguridad'
                        ? 'bg-rose-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Evidencias Seguridad (3)
                  </button>
                  <button
                    onClick={() => setSelectedJsonView('dictamen')}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                      selectedJsonView === 'dictamen'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Dictamen General
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-slate-300 max-h-[600px] overflow-y-auto">
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
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500 print:hidden mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Dictamen NOM-001-SEDE</span>
            <span>•</span>
            <span>Instalaciones Eléctricas de Utilización</span>
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
            <span>Secretaría de Energía (SENER)</span>
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
