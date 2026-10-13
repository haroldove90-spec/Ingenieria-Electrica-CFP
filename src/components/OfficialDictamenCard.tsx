import React, { useState } from 'react';
import { 
  Award, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Copy, 
  Download, 
  Check, 
  Code2, 
  FileCheck2, 
  MapPin, 
  UserCheck, 
  Zap, 
  ShieldCheck,
  Hash,
  Briefcase
} from 'lucide-react';
import { DictamenOficialGeneralJSON } from '../types/dictamen';

interface OfficialDictamenCardProps {
  data: DictamenOficialGeneralJSON;
}

export const OfficialDictamenCard: React.FC<OfficialDictamenCardProps> = ({ data }) => {
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
    link.download = `dictamen_oficial_${data.datos_instalacion.rfc}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Official Certificate Formatted View */}
      <div className="bg-white border-2 border-slate-300 rounded-2xl shadow-md overflow-hidden print:border-none print:shadow-none">
        {/* Certificate Top Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-4 sm:p-7 border-b-4 border-amber-500">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-amber-400 text-slate-950">
                  Dictamen Oficial de Verificación
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  NOM-001-SEDE
                </span>
              </div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white break-words">
                {data.datos_instalacion.razon_social}
              </h1>
              <p className="text-xs sm:text-sm text-amber-300 font-semibold flex flex-wrap items-center gap-2">
                <span>{data.datos_instalacion.nombre_comercial}</span>
                <span>•</span>
                <span className="font-mono text-slate-200">RFC: {data.datos_instalacion.rfc}</span>
              </p>
            </div>

            <div className="bg-slate-800/90 p-3 rounded-xl border border-slate-700 text-left sm:text-right space-y-1 shrink-0 max-w-full">
              <div className="text-[10px] sm:text-[11px] text-slate-400 font-mono">
                Folio Oficial:
              </div>
              <div className="text-xs sm:text-sm font-mono font-bold text-amber-400 break-all">
                {data.encabezado_dictamen.folio}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-start sm:justify-end gap-1">
                <Calendar className="w-3.5 h-3.5" /> {data.encabezado_dictamen.fecha}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Body Content */}
        <div className="p-4 sm:p-7 space-y-6">
          {/* Giro & Domicilio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3.5 sm:p-4 rounded-xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" /> Giro de la Actividad
              </span>
              <p className="font-semibold text-slate-800 leading-snug">
                {data.encabezado_dictamen.giro}
              </p>
            </div>

            <div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" /> Domicilio de la Instalación
              </span>
              <p className="font-semibold text-slate-800 leading-snug">
                {data.datos_instalacion.domicilio}, C.P. {data.datos_instalacion.cp}
              </p>
            </div>
          </div>

          {/* Características Técnicas */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Características Técnicas del Suministro
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 mb-0.5">Subestación</div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight">
                  {data.caracteristicas_tecnicas.tipo_subestacion}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 mb-0.5">Capacidad Transformador</div>
                <div className="font-bold text-sm sm:text-base text-slate-900 font-mono">
                  {data.caracteristicas_tecnicas.capacidad_kva} <span className="text-xs font-normal text-slate-500">kVA</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 mb-0.5">Tensión de Suministro</div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 font-mono break-all">
                  {data.caracteristicas_tecnicas.tension_suministro}
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="text-[11px] text-slate-500 mb-0.5">Carga Instalada / Operación</div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 font-mono">
                  {data.caracteristicas_tecnicas.carga_instalada_kw} kW / {data.caracteristicas_tecnicas.carga_operacion_kw} kW
                </div>
              </div>
            </div>
          </div>

          {/* Mediciones Eléctricas de Campo */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
              Registro de Mediciones Eléctricas en Baja Tensión
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Voltajes */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>Voltajes Medidos</span>
                  <span className="text-[11px] text-emerald-600 font-mono">Simétrico</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Van:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.van} V</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Vab:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.vab} V</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Vbn:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.vbn} V</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Vbc:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.vbc} V</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Vcn:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.vcn} V</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Vca:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.voltajes.vca} V</strong>
                  </div>
                </div>
              </div>

              {/* Corrientes */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                  <span>Corrientes por Fase</span>
                  <span className="text-[11px] text-amber-600 font-mono">Ia=38A, Ib=38A, Ic=35.3A</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Fase A:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.corrientes.fase_a} A</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Fase B:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.corrientes.fase_b} A</strong>
                  </div>
                  <div className="bg-white p-2 rounded border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Fase C:</span>
                    <strong className="text-slate-900">{data.mediciones_electricas.corrientes.fase_c} A</strong>
                  </div>
                  <div className="bg-amber-50 p-2 rounded border border-amber-200">
                    <span className="text-amber-700 block text-[10px] font-bold">Neutro (In):</span>
                    <strong className="text-amber-900 font-black">{data.mediciones_electricas.corrientes.neutro} A</strong>
                  </div>
                </div>
              </div>

              {/* Sistema de Tierra */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-700 border-b border-slate-200 pb-1.5 flex items-center justify-between">
                    <span>Sistema de Tierra (SPT)</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {data.mediciones_electricas.sistema_tierra.estado}
                    </span>
                  </div>
                  <div className="pt-3 space-y-1">
                    <div className="text-xs text-slate-600">
                      Electrodo de referencia:
                    </div>
                    <div className="text-lg font-bold text-emerald-700 flex items-center gap-1.5 font-mono">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      {data.mediciones_electricas.sistema_tierra.valor_ohms}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200 leading-snug">
                  Continuidad y trayectoria de electrodo conforme a la NOM-001-SEDE Art. 250.
                </div>
              </div>
            </div>
          </div>

          {/* Perito Responsable Signature Box */}
          <div className="border-t-2 border-slate-200 pt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
                  <UserCheck className="w-4 h-4" /> Perito Responsable de Verificación
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {data.perito_responsable.nombre}
                </h3>
                <div className="text-xs text-slate-600 font-mono space-y-0.5">
                  <p>Registro: <strong className="text-slate-800">{data.perito_responsable.registro}</strong></p>
                  <p>Cédula Profesional: <strong className="text-slate-800">{data.perito_responsable.cedula}</strong></p>
                </div>
              </div>

              {/* Signature Line */}
              <div className="text-center w-56 pt-6 sm:pt-0">
                <div className="border-b-2 border-slate-400 pb-1 mb-1 font-signature text-sm text-slate-700 italic">
                  Israel Orozco Arias
                </div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                  Firma y Sello del Perito
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Output Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl mt-6">
        <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-slate-200">
              JSON Oficial: Cédula y Datos del Dictamen Técnico
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
