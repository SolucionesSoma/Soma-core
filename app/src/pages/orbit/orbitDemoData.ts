export type DemoModule = "dashboard" | "incidents" | "pqrsf" | "maintenance" | "assets";
export type Ticket = { id: string; title: string; kind: "incidents" | "pqrsf"; area: string; priority: "Crítica" | "Alta" | "Media"; status: string; sla: string; owner: string; created: string };

export const orbitDemoData = Object.freeze({
  tickets: [
    { id: "INC-1042", title: "Intermitencia en terminal de despacho", kind: "incidents", area: "Infraestructura", priority: "Crítica", status: "En atención", sla: "01:42", owner: "Laura Méndez", created: "Hoy, 08:21" },
    { id: "INC-1038", title: "Acceso bloqueado al portal interno", kind: "incidents", area: "Soporte", priority: "Alta", status: "Asignado", sla: "03:16", owner: "Tomás Ríos", created: "Hoy, 07:54" },
    { id: "PQR-0571", title: "Solicitud de actualización de datos", kind: "pqrsf", area: "Experiencia", priority: "Media", status: "En análisis", sla: "18:30", owner: "Sara León", created: "Ayer, 16:40" },
    { id: "PQR-0568", title: "Reconocimiento por atención recibida", kind: "pqrsf", area: "Servicio", priority: "Media", status: "Cerrado", sla: "Cumplido", owner: "Nicolás Peña", created: "Ayer, 11:22" }
  ] as Ticket[],
  maintenance: [
    { id: "MNT-220", title: "Revisión preventiva de climatización", site: "Sede Norte", date: "22 SEP", progress: 75, owner: "Equipo técnico", status: "En curso" },
    { id: "MNT-221", title: "Inspección de tablero eléctrico", site: "Centro logístico", date: "24 SEP", progress: 20, owner: "Mantenimiento", status: "Programado" },
    { id: "MNT-222", title: "Calibración de sensor de temperatura", site: "Sede Centro", date: "27 SEP", progress: 0, owner: "Proveedor autorizado", status: "Programado" }
  ],
  assets: [
    { id: "ACT-0841", name: "Terminal industrial TX-4", category: "Tecnología", site: "Centro logístico", status: "Operativo", owner: "Operaciones" },
    { id: "ACT-0732", name: "Unidad de climatización C-18", category: "Infraestructura", site: "Sede Norte", status: "En mantenimiento", owner: "Servicios generales" },
    { id: "ACT-0619", name: "Lector móvil LM-12", category: "Tecnología", site: "Sede Centro", status: "Operativo", owner: "Inventarios" }
  ],
  modules: ["dashboard", "incidents", "pqrsf", "maintenance", "assets"] as DemoModule[]
});
