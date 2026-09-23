export type Invoice = { id: string; supplier: string; issued: string; due: string; amount: string; status: "En revisión" | "Aprobada" | "Con novedad" };
export type Payment = { id: string; supplier: string; date: string; amount: string; status: "Programado" | "Procesado" | "Pendiente" };
export type ReturnRecord = { id: string; supplier: string; reason: string; amount: string; status: "Abierta" | "En análisis" | "Resuelta" };
export type Certificate = { title: string; period: string; status: string };
export type ComplianceDocument = { title: string; expires: string; status: "Vigente" | "Por vencer" | "Requiere actualización" };

export const invoices: Invoice[] = [
  { id: "FAC-2094", supplier: "Nexo Suministros", issued: "12 sep 2026", due: "30 sep 2026", amount: "$ 8.460.000", status: "En revisión" },
  { id: "FAC-2087", supplier: "Aurea Servicios", issued: "08 sep 2026", due: "25 sep 2026", amount: "$ 3.180.000", status: "Aprobada" },
  { id: "FAC-2071", supplier: "Horizonte Comercial", issued: "29 ago 2026", due: "18 sep 2026", amount: "$ 1.920.000", status: "Con novedad" }
];
export const payments: Payment[] = [
  { id: "PAG-0841", supplier: "Nexo Suministros", date: "26 sep 2026", amount: "$ 8.460.000", status: "Programado" },
  { id: "PAG-0836", supplier: "Aurea Servicios", date: "17 sep 2026", amount: "$ 3.180.000", status: "Procesado" },
  { id: "PAG-0829", supplier: "Horizonte Comercial", date: "20 sep 2026", amount: "$ 1.920.000", status: "Pendiente" }
];
export const returns: ReturnRecord[] = [
  { id: "DEV-0318", supplier: "Nexo Suministros", reason: "Diferencia de cantidades", amount: "$ 640.000", status: "En análisis" },
  { id: "DEV-0311", supplier: "Aurea Servicios", reason: "Servicio no ejecutado", amount: "$ 280.000", status: "Resuelta" },
  { id: "DEV-0305", supplier: "Horizonte Comercial", reason: "Documento incompleto", amount: "$ 130.000", status: "Abierta" }
];
export const certificates: Certificate[] = [
  { title: "Certificado de retenciones", period: "Año gravable 2025", status: "Disponible" },
  { title: "Certificado de pagos", period: "Enero — agosto 2026", status: "Disponible" },
  { title: "Estado de cuenta", period: "Corte septiembre 2026", status: "Actualizado hoy" }
];
export const complianceDocuments: ComplianceDocument[] = [
  { title: "Registro tributario", expires: "Vigente hasta dic 2026", status: "Vigente" },
  { title: "Certificación bancaria", expires: "Actualizada en ago 2026", status: "Vigente" },
  { title: "Declaración de cumplimiento", expires: "Vence en 12 días", status: "Por vencer" }
];
