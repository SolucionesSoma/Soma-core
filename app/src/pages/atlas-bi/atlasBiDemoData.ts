export type AtlasModule = "home" | "dashboards" | "requests" | "users" | "audit" | "catalogs";
export type AtlasReport = { id: string; title: string; area: string; company: string; owner: string; status: "Disponible" | "Restringido"; description: string; updated: string };
export type AccessRequest = { id: string; report: string; requester: string; level: "Lectura" | "Edición"; status: "Pendiente" | "Aprobada" | "Rechazada"; date: string };
export type AuditEvent = { id: string; actor: string; action: string; resource: string; date: string; ip: string };

export const atlasReports: AtlasReport[] = [
  { id: "AT-001", title: "Ventas · Consolidado nacional", area: "Comercial", company: "SOMA Colombia", owner: "Daniela Rojas", status: "Disponible", description: "Indicadores de ventas, margen y comportamiento por canal.", updated: "Actualizado hoy" },
  { id: "AT-002", title: "Operaciones · Nivel de servicio", area: "Operaciones", company: "SOMA Colombia", owner: "Carlos Méndez", status: "Restringido", description: "Cumplimiento, capacidad y alertas de operación por región.", updated: "Hace 2 h" },
  { id: "AT-003", title: "Finanzas · Flujo de caja", area: "Finanzas", company: "SOMA Servicios", owner: "Ana Torres", status: "Restringido", description: "Proyección de caja, recaudo y compromisos del periodo.", updated: "Ayer" },
  { id: "AT-004", title: "Talento · Cobertura de turnos", area: "Talento", company: "SOMA Colombia", owner: "Luisa Vargas", status: "Disponible", description: "Disponibilidad, cobertura y novedades del equipo.", updated: "Hace 1 día" },
];

export const atlasRequests: AccessRequest[] = [
  { id: "SOL-128", report: "Operaciones · Nivel de servicio", requester: "Marta López", level: "Lectura", status: "Pendiente", date: "Hoy, 10:24" },
  { id: "SOL-127", report: "Finanzas · Flujo de caja", requester: "Julián Ríos", level: "Edición", status: "Pendiente", date: "Ayer, 16:08" },
  { id: "SOL-126", report: "Ventas · Consolidado nacional", requester: "Sara Díaz", level: "Lectura", status: "Aprobada", date: "12 sep" },
];

export const atlasAudit: AuditEvent[] = [
  { id: "AUD-45", actor: "Daniela Rojas", action: "Publicó dashboard", resource: "Ventas · Consolidado nacional", date: "Hoy, 09:42", ip: "10.14.8.22" },
  { id: "AUD-44", actor: "Marta López", action: "Solicitó acceso", resource: "Operaciones · Nivel de servicio", date: "Hoy, 10:24", ip: "10.14.4.18" },
  { id: "AUD-43", actor: "Ana Torres", action: "Actualizó alcance", resource: "Finanzas · Flujo de caja", date: "Ayer, 15:40", ip: "10.14.9.11" },
];
