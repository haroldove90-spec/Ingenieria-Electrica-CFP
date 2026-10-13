import { GoogleGenAI } from '@google/genai';

export interface GeneratedStudyResult {
  folio: string;
  razon_social: string;
  capacidad: string;
  resumen_hallazgos: string;
  rawJson?: string;
  analisis_normativo?: string;
}

/**
 * Procesa los datos del formulario HTML con los IDs requeridos:
 * input-folio, input-razon, input-capacidad, input-observaciones
 * y envía el prompt dinámico a la API de AI Studio (Gemini).
 */
export async function ejecutarCrearNuevoEstudio(): Promise<GeneratedStudyResult> {
  // 1. Capturar los valores que el usuario escribió en el formulario HTML
  const folioEl = document.getElementById("input-folio") as HTMLInputElement | null;
  const razonSocialEl = document.getElementById("input-razon") as HTMLInputElement | null;
  const capacidadEl = document.getElementById("input-capacidad") as HTMLInputElement | null;
  const observacionesEl = document.getElementById("input-observaciones") as HTMLTextAreaElement | HTMLInputElement | null;

  const folioInput = folioEl?.value.trim() || '360/2026';
  const razonSocialInput = razonSocialEl?.value.trim() || 'ABARROTES AZTECA SUC. TIJERAS';
  const capacidadInput = capacidadEl?.value.trim() || '75';
  const observacionesInput = observacionesEl?.value.trim() || 'Inspección de subestación y tableros.';

  // 2. Construir el prompt dinámicamente con esos valores
  const promptDinamico = `
Procesa los datos de la nueva visita técnica para generar el dictamen normativo NOM-001-SEDE:
- Folio: ${folioInput}
- Razón Social: ${razonSocialInput}
- Capacidad de Subestación: ${capacidadInput} kVA
- Observaciones de Campo: ${observacionesInput}

Genera un JSON con la estructura exacta:
{
  "folio": "${folioInput}",
  "razon_social": "${razonSocialInput}",
  "capacidad": "${capacidadInput}",
  "resumen_hallazgos": "${observacionesInput}"
}
`;

  // 3. Enviar este 'promptDinamico' a la API de AI Studio
  const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptDinamico,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.2
        }
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        return {
          folio: parsed.folio || folioInput,
          razon_social: parsed.razon_social || razonSocialInput,
          capacidad: parsed.capacidad || capacidadInput,
          resumen_hallazgos: parsed.resumen_hallazgos || observacionesInput,
          rawJson: JSON.stringify(parsed, null, 2)
        };
      } catch {
        // Fallback if parsing model output fails
      }
    } catch (apiError) {
      console.warn("Llamada a Gemini API falló o no tiene créditos, usando procesador normativo local:", apiError);
    }
  }

  // Respuesta estructurada exacta cuando no hay API key o en modo local
  const jsonLocal = {
    folio: folioInput,
    razon_social: razonSocialInput,
    capacidad: capacidadInput,
    resumen_hallazgos: observacionesInput
  };

  return {
    ...jsonLocal,
    rawJson: JSON.stringify(jsonLocal, null, 2)
  };
}
