import React, { useState } from 'react';
import { Check, Copy, Download, Code2, Sparkles } from 'lucide-react';
import { DictamenTecnicoJSON } from '../types/dictamen';

interface JsonViewerProps {
  data: DictamenTecnicoJSON;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
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
    link.download = `dictamen_tecnico_nom001.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
      {/* Header toolbar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold text-slate-200">
            Estructura JSON Oficial Generada
          </span>
          <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
            schema exacto solicitado
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Copiar JSON al portapapeles"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                ¡Copiado con éxito!
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
            title="Descargar archivo .json"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar .json
          </button>
        </div>
      </div>

      {/* Code viewer with custom styling */}
      <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0d1117] text-slate-300 max-h-[600px] overflow-y-auto">
        <pre className="selection:bg-amber-500/30">
          <code>
            {formatJsonWithHighlight(jsonString)}
          </code>
        </pre>
      </div>

      {/* Footer info */}
      <div className="bg-slate-950/60 px-4 py-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Formato validado conforme a estructura JSON requerida</span>
        </div>
        <span className="font-mono text-slate-500">UTF-8 • application/json</span>
      </div>
    </div>
  );
};

// Helper to colorize JSON for clear readability
function formatJsonWithHighlight(json: string) {
  // Simple token regex highlighting for json keys, strings, numbers, booleans
  const parts = json.split('\n');
  return parts.map((line, idx) => {
    // Check if line contains a key
    const keyMatch = line.match(/^(\s*)(".*?")(\s*:\s*)(.*)$/);
    if (keyMatch) {
      const [, indent, key, colon, value] = keyMatch;
      return (
        <div key={idx} className="hover:bg-slate-800/30 px-1 rounded">
          <span>{indent}</span>
          <span className="text-cyan-300">{key}</span>
          <span className="text-slate-400">{colon}</span>
          <span className={getValueClass(value)}>{value}</span>
        </div>
      );
    }
    return (
      <div key={idx} className="hover:bg-slate-800/30 px-1 rounded text-slate-400">
        {line}
      </div>
    );
  });
}

function getValueClass(val: string): string {
  const trimmed = val.trim();
  if (trimmed.startsWith('"')) return 'text-amber-200';
  if (trimmed === 'true' || trimmed === 'false') return 'text-emerald-400 font-bold';
  if (!isNaN(Number(trimmed.replace(',', '')))) return 'text-purple-300 font-bold';
  return 'text-slate-300';
}
