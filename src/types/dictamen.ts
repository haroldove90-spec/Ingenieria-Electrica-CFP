export interface EvaluacionSistemaTierra {
  valor_medido_ohms: number;
  cumple_norma: boolean;
  criterio_normativo: string;
}

export interface ObservacionNormativa {
  area: string;
  condicion_detectada: string;
  articulo_nom_001: string;
  accion_correctiva: string;
}

export type ConclusionDictamen = 'Aprobado' | 'No Aprobado con condicionantes';

export interface DictamenTecnicoJSON {
  resumen_ejecutivo: string;
  evaluacion_sistema_tierra: EvaluacionSistemaTierra;
  observaciones_normativas: ObservacionNormativa[];
  conclusion_dictamen: ConclusionDictamen;
}

export interface DatosLevantamiento {
  cliente: string;
  subestacion: string;
  capacidad: string;
  resistencia_tierra_ohms: number;
  observaciones: {
    id: string;
    area: string;
    texto_original: string;
    condicion_detectada: string;
    articulo_nom_001: string;
    accion_correctiva: string;
    severidad: 'alta' | 'media' | 'baja';
  }[];
}

export interface ObservacionSeguridad {
  id_observacion: number;
  elemento_inspeccionado: string;
  clasificacion_riesgo: 'Alto' | 'Medio' | 'Bajo';
  descripcion_hallazgo: string;
  articulo_nom_001: string;
  medida_correctiva: string;
}

export interface ReporteObservacionesSeguridadJSON {
  total_no_conformidades: number;
  resumen_hallazgos: string;
  lista_observaciones: ObservacionSeguridad[];
}
