import { DatosLevantamiento, DictamenTecnicoJSON } from '../types/dictamen';

export const CASO_ABARROTES_AZTECA: DatosLevantamiento = {
  cliente: 'Abarrotes Azteca Suc. Tijeras',
  subestacion: 'Tipo poste / compacta',
  capacidad: '75 kVA',
  resistencia_tierra_ohms: 18.5,
  observaciones: [
    {
      id: 'obs-1',
      area: 'Tablero principal',
      texto_original: 'En el tablero principal no hay leyenda ni directorio de circuitos; el personal manipula interruptores al tanteo.',
      condicion_detectada: 'Ausencia total de leyendas y directorio de circuitos en el tablero principal, originando que el personal opere e interrumpa circuitos sin identificación previa y con riesgo operativo.',
      articulo_nom_001: 'NOM-001-SEDE-2012, Artículos 408-4(a) y 110-22',
      accion_correctiva: 'Levantar cédula de circuitos, rotular físicamente cada interruptor termomagnético y fijar un directorio impreso, legible y duradero en la contratapa del tablero principal.',
      severidad: 'alta'
    },
    {
      id: 'obs-2',
      area: 'Puesta a tierra',
      texto_original: 'El electrodo de puesta a tierra no cuenta con registro visible y el conductor de puesta a tierra está expuesto a daño mecánico en el piso del almacén.',
      condicion_detectada: 'Electrodo de puesta a tierra sin registro de inspección accesible y conductor del electrodo tendido directamente sobre el piso del almacén, expuesto a daño mecánico por maniobra de montacargas y mercancías.',
      articulo_nom_001: 'NOM-001-SEDE-2012, Artículos 250-64(b) y 250-70',
      accion_correctiva: 'Canalizar el conductor de puesta a tierra en tubería conduit metálica pesada fijada mecánicamente hasta el electrodo, y habilitar un registro de concreto con tapa para inspección y mantenimiento.',
      severidad: 'alta'
    }
  ]
};

export const ARTICULOS_NOM_INFO: Record<string, { titulo: string; descripcion: string; linkNorma?: string }> = {
  'NOM-001-SEDE-2012, Artículos 408-4(a) y 110-22': {
    titulo: 'Directorio de circuitos e Identificación de desconexión',
    descripcion: 'Art. 408-4(a): Todo circuito y modificación de circuito se debe identificar de manera legible y clara en cuanto a su propósito claro o uso específico en un directorio de circuitos en el tablero. Art. 110-22: Cada medio de desconexión debe estar marcado de modo legible para indicar su propósito.'
  },
  'NOM-001-SEDE-2012, Artículos 250-64(b) y 250-70': {
    titulo: 'Protección mecánica del conductor y Accesibilidad del electrodo',
    descripcion: 'Art. 250-64(b): Cuando estén expuestos a daño físico grave, los conductores del electrodo de puesta a tierra se deben proteger en tubo (conduit) metálico pesado, semipesado o cédula 80. Art. 250-70: La conexión a electrodos de puesta a tierra debe ser accesible para inspección y mantenimiento.'
  },
  'NOM-001-SEDE-2012, Artículo 250-56': {
    titulo: 'Resistencia de electrodos tipo varilla, tubería y placa',
    descripcion: 'Un electrodo simple consistente en una varilla, tubería o placa que no tenga una resistencia a tierra de 25 ohms o menor se debe complementar con un electrodo adicional del tipo especificado en 250-52.'
  },
  'NOM-001-SEDE-2012, Artículos 110-27(a), 110-14(a) y 300-12': {
    titulo: 'Resguardo de partes vivas, Terminales y Continuidad de canalizaciones',
    descripcion: 'Art. 110-27(a): Las partes vivas de los equipos eléctricos que funcionen a 50 volts o más deben estar resguardadas contra contacto accidental. Art. 110-14(a): La conexión de los conductores a las terminales debe asegurar una unión firme sin dañar los conductores. Art. 300-12: Las canalizaciones deben ser continuas entre cajas, gabinetes y accesorios.'
  },
  'NOM-001-SEDE-2012, Artículos 410-10(a) y 410-5': {
    titulo: 'Luminarias en lugares húmedos y Protección contra daño físico',
    descripcion: 'Art. 410-10(a): Las luminarias instaladas en lugares húmedos o mojados deben estar aprobadas para tales condiciones y evitar la entrada de agua. Art. 410-5: Las luminarias expuestas a daño físico deben estar protegidas con pantallas o resguardos adecuados.'
  },
  'NOM-001-SEDE-2012, Artículo 110-16': {
    titulo: 'Advertencia contra arco eléctrico (Arc Flash)',
    descripcion: 'Art. 110-16: Los equipos eléctricos como tableros de distribución, centros de control de motores y subestaciones deben estar marcados en campo para advertir al personal calificado sobre el peligro potencial de relámpago de arco eléctrico antes del examen, ajuste o mantenimiento.'
  }
};

export const REPORTE_SEGURIDAD_CAMPO = {
  total_no_conformidades: 3,
  resumen_hallazgos: "Riesgo general Alto debido a partes vivas no aisladas en tablero general, ausencia de señalización de arco eléctrico en subestación y uso de luminarias inadecuadas en área de maniobras.",
  lista_observaciones: [
    {
      id_observacion: 1,
      elemento_inspeccionado: "Tablero general de distribución (Acometida a interruptor principal)",
      clasificacion_riesgo: "Alto" as const,
      descripcion_hallazgo: "Conductores de alimentación principal expuestos sin canalización continua ni conector apropiado en la entrada al gabinete, y carencia de terminales de compresión certificadas en la llegada a las zapatas del interruptor principal, exponiendo partes vivas con riesgo inminente de contacto accidental y arqueo.",
      articulo_nom_001: "NOM-001-SEDE-2012, Artículos 110-27(a), 110-14(a) y 300-12",
      medida_correctiva: "Instalar canalización cerrada (tubería conduit metálica con monitor y contratuerca) hasta el gabinete del tablero, peinar conductores y prensar terminales de compresión calibradas al calibre del cable para garantizar hermeticidad y resguardo de partes energizadas."
    },
    {
      id_observacion: 2,
      elemento_inspeccionado: "Área de carga/descarga (Almacén)",
      clasificacion_riesgo: "Medio" as const,
      descripcion_hallazgo: "Luminarias de tipo y manufactura residencial instaladas en área de maniobra logística, desprovistas de envolvente hermética contra humedad y carentes de pantalla de protección mecánica contra impactos producidos por montacargas o estiba de mercancías.",
      articulo_nom_001: "NOM-001-SEDE-2012, Artículos 410-10(a) y 410-5",
      medida_correctiva: "Sustituir las luminarias residenciales por luminarias industriales tipo estancas (grado de protección IP65 / Wet Locations) equipadas con difusor de policarbonato de alto impacto o guarda metálica de protección."
    },
    {
      id_observacion: 3,
      elemento_inspeccionado: "Subestación compacta",
      clasificacion_riesgo: "Alto" as const,
      descripcion_hallazgo: "Ausencia de etiqueta de advertencia de peligro de relámpago de arco eléctrico (Arc Flash) y riesgo de choque eléctrico en el frente del gabinete de la subestación compacta, omitiendo el nivel de equipo de protección personal (EPP) y distancia de seguridad requeridos para su operación.",
      articulo_nom_001: "NOM-001-SEDE-2012, Artículo 110-16",
      medida_correctiva: "Elaborar y colocar una placa permanente y legible en el exterior del gabinete frontal que advierta el peligro de arco eléctrico conforme a la NOM-001-SEDE Art. 110-16 y NFPA 70E, especificando tensión nominal, frontera de relámpago de arco y categoría de EPP obligatoria."
    }
  ]
};

export const ANALISIS_PARAMETROS_ELECTRICOS = {
  evaluacion_capacidad_subestacion: {
    porcentaje_utilizacion: "69.3%",
    estado_capacidad: "Adecuado" as const,
    diagnostico_tecnico: "El transformador de 75 kVA opera en una zona de carga adecuada (69.3%), manteniendo una reserva de potencia de aproximadamente 23.0 kVA (30.7%) para absorber picos de demanda y futuras ampliaciones sin sobrecalentamiento."
  },
  evaluacion_balance_fases: {
    porcentaje_desbalance: "18%",
    estado_balance: "Fuera de límite" as const,
    observacion_balance: "El desbalance de corrientes (L1=140A, L2=138A vs L3=110A) excede el umbral máximo recomendado del 5% al 10%, provocando circulación innecesaria de corriente por el neutro y calentamiento asimétrico en devanados del transformador."
  },
  evaluacion_sistema_tierra: {
    valor_resistencia_ohms: 18.5,
    limite_maximo_nom: 25,
    cumplimiento: "Cumple",
    dictamen_tierra: "La resistencia de 18.5 Ω cumple con el valor permisible menor o igual a 25 Ω establecido en la NOM-001-SEDE Art. 250-56, garantizando una trayectoria de baja impedancia para la disipación de corrientes de falla."
  },
  recomendaciones_operativas: [
    "Efectuar el rebalanceo de cargas monofásicas en el tablero general de distribución, reubicando circuitos de las fases L1 y L2 hacia la fase L3 para reducir el desequilibrio a valores inferiores al 5%.",
    "Realizar una inspección termográfica en bornes de media y baja tensión del transformador y zapatas del interruptor principal para descartar puntos calientes provocados por el desbalance de carga."
  ]
};

export const DICTAMEN_OFICIAL_COMPLETO = {
  encabezado_dictamen: {
    folio: "CFP0125/PCIEMBT/IOA/0071/14XII20 - 359/2026",
    fecha: "02-oct-26",
    giro: "Comercio al por menor de abarrotes, alimentos, bebidas, hielo y tabaco"
  },
  datos_instalacion: {
    razon_social: "ABARROTES AZTECA TIJERAS S.A DE C.V",
    nombre_comercial: "ABARROTES AZTECA SUC. TIJERAS",
    rfc: "AAT170629U46",
    domicilio: "JUAN DE BAEZA #600, COL. DIECIOCHO DE MAYO, MORELIA, MICHOACÁN",
    cp: "58258"
  },
  caracteristicas_tecnicas: {
    tipo_subestacion: "TRANSFORMADOR TIPO PEDESTAL",
    capacidad_kva: 75,
    tension_suministro: "13200V - 220/127V 3F-4H",
    carga_instalada_kw: 27.25,
    carga_operacion_kw: 13.62
  },
  mediciones_electricas: {
    voltajes: {
      van: 127,
      vbn: 127,
      vcn: 127,
      vab: 220,
      vbc: 220,
      vca: 220
    },
    corrientes: {
      fase_a: 38,
      fase_b: 38,
      fase_c: 35.3,
      neutro: 89
    },
    sistema_tierra: {
      estado: "CUMPLE",
      valor_ohms: "Adecuado"
    }
  },
  perito_responsable: {
    nombre: "ING. ISRAEL OROZCO ARIAS",
    registro: "CFP0125/PCIEMBT/IOA/0071/14XII20",
    cedula: "15240154"
  }
};

export const OBSERVACIONES_FISICAS_SUBESTACION = {
  total_observaciones: 2,
  normativa_aplicada: "NOM-001-SEDE",
  detalle_observaciones: [
    {
      consecutivo: 1,
      elemento_afectado: "Subestación compacta / Envolvente",
      descripcion_no_conformidad: "Ausencia de letreros preventivos y señales de advertencia de peligro por alta tensión y riesgo eléctrico en las puertas de acceso al envolvente de la subestación compacta, contraviniendo las disposiciones de seguridad para locales y equipos de transformación.",
      articulo_nom: "NOM-001-SEDE-2012, Artículos 110-21, 110-34(c) y 450-14",
      accion_correctiva_requerida: "Suministrar y fijar en el exterior de las puertas letreros permanentes y legibles con la leyenda de advertencia 'PELIGRO - ALTA TENSIÓN' y pictograma de riesgo eléctrico normalizado."
    },
    {
      consecutivo: 2,
      elemento_afectado: "Sistema de Puesta a Tierra",
      descripcion_no_conformidad: "El conductor del electrodo de puesta a tierra principal carece de un registro visible, pozo de visita o punto de prueba accesible que permita la inspección física y desconexión para medición periódica de resistencia.",
      articulo_nom: "NOM-001-SEDE-2012, Artículos 250-68(a) y 250-70",
      accion_correctiva_requerida: "Construir o instalar una caja de registro de concreto o PVC reforzado con tapa accesible para alojar el electrodo y el conector, habilitando un punto de prueba normativo para mantenimiento."
    }
  ]
};

export function generarDictamenJSON(datos: DatosLevantamiento): DictamenTecnicoJSON {
  const cumpleTierra = datos.resistencia_tierra_ohms <= 25.0;
  
  // Resumen ejecutivo formal de 2 o 3 renglones
  const resumen_ejecutivo = `La instalación eléctrica de la sucursal de ${datos.capacidad} presenta un sistema de puesta a tierra con resistencia permisible (${datos.resistencia_tierra_ohms.toFixed(1)} Ω ≤ 25 Ω); sin embargo, se detectaron no conformidades que comprometen la seguridad operativa, destacando la falta de directorio de circuitos en el tablero principal y la vulnerabilidad física del conductor y electrodo de puesta a tierra en el almacén.`;

  const criterio_normativo = cumpleTierra
    ? `Cumple con el límite máximo de 25 Ohms establecido en el Artículo 250-56 de la NOM-001-SEDE para sistemas de electrodos de puesta a tierra.`
    : `No cumple: El valor medido (${datos.resistencia_tierra_ohms.toFixed(1)} Ω) excede el límite máximo de 25 Ohms especificado en el Artículo 250-56 de la NOM-001-SEDE, requiriendo electrodo complementario o mejoramiento de suelo.`;

  const observaciones_normativas = datos.observaciones.map(obs => ({
    area: obs.area,
    condicion_detectada: obs.condicion_detectada,
    articulo_nom_001: obs.articulo_nom_001,
    accion_correctiva: obs.accion_correctiva
  }));

  // Conclusion dictamen: "Aprobado" o "No Aprobado con condicionantes"
  const tieneCondicionantes = !cumpleTierra || datos.observaciones.length > 0;
  const conclusion_dictamen = tieneCondicionantes
    ? 'No Aprobado con condicionantes'
    : 'Aprobado';

  return {
    resumen_ejecutivo,
    evaluacion_sistema_tierra: {
      valor_medido_ohms: Number(datos.resistencia_tierra_ohms.toFixed(1)),
      cumple_norma: cumpleTierra,
      criterio_normativo
    },
    observaciones_normativas,
    conclusion_dictamen
  };
}
