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

export interface EvaluacionCapacidadSubestacion {
  porcentaje_utilizacion: string;
  estado_capacidad: 'Adecuado' | 'Sobrecargado' | 'Subutilizado';
  diagnostico_tecnico: string;
}

export interface EvaluacionBalanceFases {
  porcentaje_desbalance: string;
  estado_balance: 'Aceptable' | 'Fuera de límite';
  observacion_balance: string;
}

export interface EvaluacionSistemaTierraMedicion {
  valor_resistencia_ohms: number;
  limite_maximo_nom: number;
  cumplimiento: string;
  dictamen_tierra: string;
}

export interface AnalisisParametrosElectricosJSON {
  evaluacion_capacidad_subestacion: EvaluacionCapacidadSubestacion;
  evaluacion_balance_fases: EvaluacionBalanceFases;
  evaluacion_sistema_tierra: EvaluacionSistemaTierraMedicion;
  recomendaciones_operativas: string[];
}

export interface EncabezadoDictamen {
  folio: string;
  fecha: string;
  giro: string;
}

export interface DatosInstalacion {
  razon_social: string;
  nombre_comercial: string;
  rfc: string;
  domicilio: string;
  cp: string;
}

export interface CaracteristicasTecnicas {
  tipo_subestacion: string;
  capacidad_kva: number;
  tension_suministro: string;
  carga_instalada_kw: number;
  carga_operacion_kw: number;
}

export interface MedicionesElectricas {
  voltajes: {
    van: number;
    vbn: number;
    vcn: number;
    vab: number;
    vbc: number;
    vca: number;
  };
  corrientes: {
    fase_a: number;
    fase_b: number;
    fase_c: number;
    neutro: number;
  };
  sistema_tierra: {
    estado: string;
    valor_ohms: string;
  };
}

export interface PeritoResponsable {
  nombre: string;
  registro: string;
  cedula: string;
}

export interface DictamenOficialGeneralJSON {
  encabezado_dictamen: EncabezadoDictamen;
  datos_instalacion: DatosInstalacion;
  caracteristicas_tecnicas: CaracteristicasTecnicas;
  mediciones_electricas: MedicionesElectricas;
  perito_responsable: PeritoResponsable;
}

export interface DetalleObservacionFisica {
  consecutivo: number;
  elemento_afectado: string;
  descripcion_no_conformidad: string;
  articulo_nom: string;
  accion_correctiva_requerida: string;
}

export interface ReporteObservacionesFisicasJSON {
  total_observaciones: number;
  normativa_aplicada: string;
  detalle_observaciones: DetalleObservacionFisica[];
}

export interface NuevoEstudioJSON {
  encabezado_dictamen: {
    folio: string;
    fecha: string;
  };
  datos_instalacion: {
    razon_social: string;
    nombre_comercial: string;
    domicilio: string;
  };
  caracteristicas_tecnicas: {
    capacidad_kva: number;
    carga_instalada_kw: number;
  };
  analisis_y_no_conformidades: {
    resistencia_tierra_ohms: number;
    observaciones_analizadas: string;
  };
}



