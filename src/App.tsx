/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  SlidersHorizontal, 
  Printer, 
  Download, 
  BookOpen, 
  Activity, 
  Camera, 
  Award, 
  Box, 
  Check, 
  Sparkles,
  ShieldCheck
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
import { InspectionEditor } from './components/InspectionEditor';
import { NomGuideModal } from './components/NomGuideModal';

type TabType = 'oficial' | 'subestacion' | 'parametros' | 'seguridad' | 'dictamen' | 'editor';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('oficial');
  const [datosLevantamiento, setDatosLevantamiento] = useState<DatosLevantamiento>(CASO_ABARROTES_AZTECA);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isNomModalOpen, setIsNomModalOpen] = useState(false);
  const [selectedNomArticle, setSelectedNomArticle] = useState<string | null>(null);

  // Memoize generated dictamen JSON based on current inputs
  const dictamenJSON = useMemo(() => {
    return generarDictamenJSON(datosLevantamiento);
  }, [datosLevantamiento]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportFullReport = () => {
    const fullPackage = {
      folio: DICTAMEN_OFICIAL_COMPLETO.encabezado_dictamen.folio,
      fecha_inspeccion: DICTAMEN_OFICIAL_COMPLETO.encabezado_dictamen.fecha,
      cliente: DICTAMEN_OFICIAL_COMPLETO.datos_instalacion,
      caracteristicas_suministro: DICTAMEN_OFICIAL_COMPLETO.caracteristicas_tecnicas,
      mediciones_electricas: DICTAMEN_OFICIAL_COMPLETO.mediciones_electricas,
      parametros_electricos: ANALISIS_PARAMETROS_ELECTRICOS,
      observaciones_subestacion: OBSERVACIONES_FISICAS_SUBESTACION,
      observaciones_seguridad: REPORTE_SEGURIDAD_CAMPO,
      dictamen_ejecutivo: dictamenJSON,
      perito_responsable: DICTAMEN_OFICIAL_COMPLETO.perito_responsable
    };

    const blob = new Blob([JSON.stringify(fullPackage, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expediente_tecnico_nom001_${DICTAMEN_OFICIAL_COMPLETO.datos_instalacion.rfc}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
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
                  Dictamen Oficial NOM-001-SEDE
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                  Folio 359/2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate max-w-[170px] sm:max-w-xs md:max-w-md">
                ABARROTES AZTECA SUC. TIJERAS • Morelia, Mich.
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
              <span>Norma Oficial</span>
            </button>

            <button
              onClick={handleExportFullReport}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all ${
                downloadSuccess ? 'text-emerald-400 border-emerald-500/50' : ''
              }`}
              title="Descargar paquete de datos de respaldo"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden xs:inline">Descargado</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden xs:inline">Descargar Datos</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-sm"
              title="Imprimir dictamen técnico oficial"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Dictamen</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar / Clean Responsive Tabs */}
        <div className="bg-slate-950/80 border-t border-slate-800/80 px-2 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <nav className="flex space-x-1 py-1.5 overflow-x-auto scrollbar-none whitespace-nowrap text-xs font-medium w-full sm:w-auto -mx-1 px-1">
              <button
                onClick={() => setActiveTab('oficial')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'oficial'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Cédula Dictamen Oficial</span>
              </button>

              <button
                onClick={() => setActiveTab('subestacion')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'subestacion'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>Hallazgos Subestación (2)</span>
              </button>

              <button
                onClick={() => setActiveTab('parametros')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'parametros'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Parámetros Eléctricos</span>
              </button>

              <button
                onClick={() => setActiveTab('seguridad')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'seguridad'
                    ? 'bg-rose-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Evidencias y Riesgos</span>
              </button>

              <button
                onClick={() => setActiveTab('dictamen')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'dictamen'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resumen UVIE</span>
              </button>

              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors shrink-0 ${
                  activeTab === 'editor'
                    ? 'bg-slate-700 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Editor de Datos</span>
              </button>
            </nav>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Perito: <strong>Ing. Israel Orozco Arias</strong></span>
              <span className="text-slate-600">|</span>
              <span>Cédula: <strong>15240154</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 flex-1 w-full space-y-5">
        {/* Tab views */}
        {activeTab === 'oficial' && (
          <OfficialDictamenCard data={DICTAMEN_OFICIAL_COMPLETO} />
        )}

        {activeTab === 'subestacion' && (
          <PhysicalObservationsView
            data={OBSERVACIONES_FISICAS_SUBESTACION}
            onOpenNomDetail={handleOpenNomArticle}
          />
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
            <span className="font-bold text-slate-800">Dictamen Oficial de Instalaciones Eléctricas (NOM-001-SEDE)</span>
            <span>•</span>
            <span className="font-mono">Folio: CFP0125/PCIEMBT/IOA/0071/14XII20 - 359/2026</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedNomArticle(null);
                setIsNomModalOpen(true);
              }}
              className="hover:text-blue-600 transition-colors"
            >
              Marco Normativo SENER
            </button>
            <span>•</span>
            <span>Peritaje Eléctrico</span>
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
