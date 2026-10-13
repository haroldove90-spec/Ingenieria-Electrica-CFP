import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { ARTICULOS_NOM_INFO } from '../data/defaultData';

interface NomGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedArticle?: string | null;
}

export const NomGuideModal: React.FC<NomGuideModalProps> = ({ isOpen, onClose, selectedArticle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div 
        className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Guía Normativa NOM-001-SEDE
              </h3>
              <p className="text-xs text-slate-500">
                Norma Oficial Mexicana para Instalaciones Eléctricas (Utilización)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              Marco Legal y Cumplimiento
            </div>
            La NOM-001-SEDE establece las especificaciones técnicas obligatorias para garantizar la seguridad de las personas y sus propiedades contra los peligros del uso de la energía eléctrica en territorio nacional.
          </div>

          <div className="space-y-3">
            {Object.entries(ARTICULOS_NOM_INFO).map(([artKey, info]) => {
              const isHighlighted = selectedArticle && selectedArticle.includes(artKey.split(',')[0]);
              return (
                <div
                  key={artKey}
                  className={`p-4 rounded-xl border transition-all ${
                    isHighlighted
                      ? 'border-blue-400 bg-blue-50/40 ring-2 ring-blue-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-100">
                      {artKey}
                    </span>
                    {isHighlighted && (
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Artículo en Consulta
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">{info.titulo}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{info.descripcion}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Secretaría de Energía (SENER) • UVIE</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
