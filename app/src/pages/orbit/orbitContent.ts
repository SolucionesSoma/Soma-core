import type { Locale } from "../../i18n";

export type OrbitCopy = {
  meta: { title: string; description: string };
  nav: string[]; back: string; language: string; theme: string; dark: string; light: string;
  signature: string; hero: { eyebrow: string; title: string; copy: string; primary: string; secondary: string; demo: string };
  proof: string[]; sections: Record<string, { eyebrow: string; title: string; copy: string }>;
  modules: Array<[string, string]>; flow: Array<[string, string]>; governance: Array<[string, string]>;
  integrations: Array<[string, string]>; faq: Array<[string, string]>;
  cta: { title: string; copy: string; whatsapp: string; email: string };
  demo: Record<string, string>;
};

export const orbitContent: Record<Locale, OrbitCopy> = {
  es: {
    meta: { title: "Orbit | Gestión inteligente de servicios empresariales", description: "Orbit integra incidencias, PQRSF, activos, mantenimientos, SLA e IA en una plataforma empresarial de SOMA." },
    nav: ["Módulos", "Flujo", "Demo", "Gobierno", "Preguntas"], back: "Volver a SOMA", language: "Cambiar idioma", theme: "Cambiar tema", dark: "Modo oscuro", light: "Modo claro",
    signature: "Una solución de SOMA",
    hero: { eyebrow: "OPERACIONES CONECTADAS", title: "La operación completa, bajo control.", copy: "Orbit reúne servicio, activos y mantenimiento en un sistema trazable que ayuda a cada equipo a responder, decidir y mejorar.", primary: "Solicitar demostración", secondary: "Escribir por correo", demo: "Explorar demo" },
    proof: ["Servicio y PQRSF", "Activos e inventario", "Mantenimiento", "IA y automatización"],
    sections: {
      modules: { eyebrow: "UNA PLATAFORMA", title: "Cada frente operativo, conectado.", copy: "Información compartida, responsabilidades claras y trazabilidad desde la solicitud hasta el cierre." },
      flow: { eyebrow: "FLUJO DE SERVICIO", title: "Del reporte a la solución, sin perder contexto.", copy: "Orbit coordina clasificación, responsables, tiempos, evidencias y comunicación en un solo recorrido." },
      demo: { eyebrow: "PRODUCTO EN ACCIÓN", title: "Explore cómo trabaja Orbit.", copy: "Demo frontend basada en las vistas y funciones reales del aplicativo. Todos los datos son ficticios." },
      governance: { eyebrow: "CONTROL Y CONFIANZA", title: "Gobierno operativo incorporado.", copy: "Permisos, evidencias y registros para operar con responsabilidad en múltiples áreas y sedes." },
      integrations: { eyebrow: "CONECTIVIDAD", title: "Orbit se integra al ecosistema de trabajo.", copy: "Canales y servicios verificados para mantener la operación conectada." },
      faq: { eyebrow: "PREGUNTAS FRECUENTES", title: "Lo esencial antes de implementar.", copy: "Orbit se adapta al proceso, estructura y alcance de cada organización." }
    },
    modules: [["Incidencias", "Prioridad, SLA, asignación, adjuntos, respuestas y trazabilidad."], ["PQRSF", "Recepción, clasificación y atención por áreas con consulta pública."], ["Activos", "Inventario, proveedores, facturas, traslados y actas de entrega."], ["Mantenimientos", "Calendario, checklist, equipos, evidencias, firmas y alertas."], ["Analítica", "Indicadores de servicio, activos, cargas y cumplimiento."], ["IA y configuración", "Clasificación asistida, roles, áreas, estados y catálogos."]],
    flow: [["Crear", "Captura estructurada desde equipos, público o WhatsApp."], ["Clasificar", "IA asistida con alternativa manual y reglas del negocio."], ["Asignar", "Responsable, área, prioridad y SLA visibles."], ["Colaborar", "Comentarios internos, escalamiento o transferencia."], ["Resolver", "Respuesta, evidencias, cierre y trazabilidad completa."]],
    governance: [["Permisos por área", "Cada perfil accede a la información necesaria."], ["Estados configurables", "El flujo refleja la operación real de la organización."], ["Evidencias y firmas", "Adjuntos, checklist y aprobaciones respaldan el trabajo."], ["Historial auditable", "Cambios, responsables y tiempos permanecen visibles."]],
    integrations: [["WhatsApp", "Creación y seguimiento de tickets desde un canal familiar."], ["Correo", "Comunicación y notificaciones dentro del ciclo de atención."], ["APIs", "Conexión con servicios empresariales según el alcance acordado."], ["Servicios embebidos", "Acceso contextual a herramientas autorizadas desde Orbit."]],
    faq: [["¿Orbit se entrega como producto estándar?", "Se configura por módulos, áreas, roles, estados, catálogos y reglas de cada operación."], ["¿Podemos iniciar con un solo módulo?", "Sí. La implantación puede comenzar con servicio, activos o mantenimiento y crecer por etapas."], ["¿Cómo protege el acceso?", "Usa perfiles, permisos por área y trazabilidad. La arquitectura final se define según políticas del cliente."], ["¿La IA decide sola?", "No. La clasificación asistida mantiene alternativa manual y supervisión del equipo."], ["¿Esta demo guarda información?", "No. Funciona solo en el navegador con datos ficticios y se reinicia al recargar."], ["¿Cómo solicito una demostración privada?", "Escríbanos por WhatsApp o correo para revisar su caso y preparar un recorrido enfocado."]],
    cta: { title: "Convierta su operación en un sistema conectado.", copy: "Cuéntenos qué necesita controlar. Diseñaremos una demostración de Orbit alrededor de sus procesos.", whatsapp: "Solicitar por WhatsApp", email: "contacto@somacoretech.com" },
    demo: { demoNotice: "Entorno demostrativo · Datos ficticios", reset: "Reiniciar", dashboard: "Dashboard", incidents: "Incidencias", pqrsf: "PQRSF", maintenance: "Mantenimientos", assets: "Activos", all: "Todos", critical: "Críticos", open: "Abiertos", empty: "No hay resultados para este filtro.", clear: "Limpiar filtro", create: "Simular incidencia", close: "Cerrar", title: "Título", area: "Área", priority: "Prioridad", save: "Crear en demo", cancel: "Cancelar", created: "Incidencia simulada creada.", detail: "Detalle", timeline: "Trazabilidad", attachments: "Adjuntos", response: "Respuesta", location: "Ubicación", invoice: "Factura", transfers: "Traslados", checklist: "Checklist", signatures: "Firmas" }
  },
  en: {
    meta: { title: "Orbit | Intelligent enterprise service management", description: "Orbit connects incidents, requests, assets, maintenance, SLA and AI in a SOMA enterprise platform." },
    nav: ["Modules", "Workflow", "Demo", "Governance", "Questions"], back: "Back to SOMA", language: "Change language", theme: "Change theme", dark: "Dark mode", light: "Light mode",
    signature: "A SOMA solution",
    hero: { eyebrow: "CONNECTED OPERATIONS", title: "Operations under control.", copy: "Orbit brings service, assets and maintenance into one traceable system that helps every team respond, decide and improve.", primary: "Request a demo", secondary: "Email us", demo: "Explore demo" },
    proof: ["Service and requests", "Assets and inventory", "Maintenance", "AI and automation"],
    sections: {
      modules: { eyebrow: "ONE PLATFORM", title: "Every operational front, connected.", copy: "Shared information, clear ownership and traceability from request to closure." },
      flow: { eyebrow: "SERVICE WORKFLOW", title: "From report to resolution, without lost context.", copy: "Orbit coordinates classification, ownership, timing, evidence and communication in one path." },
      demo: { eyebrow: "PRODUCT IN ACTION", title: "Explore how Orbit works.", copy: "Frontend demo based on real audited views and capabilities. All data is fictitious." },
      governance: { eyebrow: "CONTROL AND TRUST", title: "Operational governance built in.", copy: "Permissions, evidence and records for responsible work across areas and locations." },
      integrations: { eyebrow: "CONNECTIVITY", title: "Orbit connects to the work ecosystem.", copy: "Verified channels and services keep operations connected." },
      faq: { eyebrow: "FREQUENTLY ASKED QUESTIONS", title: "What matters before implementation.", copy: "Orbit adapts to each organization’s process, structure and scope." }
    },
    modules: [["Incidents", "Priority, SLA, assignment, attachments, responses and traceability."], ["Requests", "Intake, classification and area-based service with public tracking."], ["Assets", "Inventory, suppliers, invoices, transfers and delivery records."], ["Maintenance", "Calendar, checklists, equipment, evidence, signatures and alerts."], ["Analytics", "Service, asset, workload and compliance indicators."], ["AI and configuration", "Assisted classification, roles, areas, states and catalogs."]],
    flow: [["Create", "Structured intake from teams, public users or WhatsApp."], ["Classify", "AI assistance with manual fallback and business rules."], ["Assign", "Visible owner, area, priority and SLA."], ["Collaborate", "Internal comments, escalation or transfer."], ["Resolve", "Response, evidence, closure and complete traceability."]],
    governance: [["Area permissions", "Each profile accesses only the information it needs."], ["Configurable states", "Workflow reflects the organization’s real operation."], ["Evidence and signatures", "Attachments, checklists and approvals support the work."], ["Auditable history", "Changes, owners and timing remain visible."]],
    integrations: [["WhatsApp", "Create and track tickets through a familiar channel."], ["Email", "Communication and notifications throughout the service cycle."], ["APIs", "Connect enterprise services according to the agreed scope."], ["Embedded services", "Contextual access to authorized tools from Orbit."]],
    faq: [["Is Orbit delivered as a standard product?", "It is configured by modules, areas, roles, states, catalogs and operational rules."], ["Can we start with one module?", "Yes. Implementation can begin with service, assets or maintenance and grow in stages."], ["How does Orbit protect access?", "It uses profiles, area permissions and traceability. Final architecture follows client policies."], ["Does AI decide by itself?", "No. Assisted classification preserves manual fallback and team oversight."], ["Does this demo save information?", "No. It runs only in the browser with fictitious data and resets on reload."], ["How do I request a private demo?", "Contact us by WhatsApp or email to review your case and prepare a focused walkthrough."]],
    cta: { title: "Turn your operation into a connected system.", copy: "Tell us what you need to control. We will shape an Orbit demo around your processes.", whatsapp: "Request via WhatsApp", email: "contacto@somacoretech.com" },
    demo: { demoNotice: "Demo environment · Fictitious data", reset: "Reset", dashboard: "Dashboard", incidents: "Incidents", pqrsf: "Requests", maintenance: "Maintenance", assets: "Assets", all: "All", critical: "Critical", open: "Open", empty: "No results match this filter.", clear: "Clear filter", create: "Simulate incident", close: "Close", title: "Title", area: "Area", priority: "Priority", save: "Create in demo", cancel: "Cancel", created: "Simulated incident created.", detail: "Detail", timeline: "Timeline", attachments: "Attachments", response: "Response", location: "Location", invoice: "Invoice", transfers: "Transfers", checklist: "Checklist", signatures: "Signatures" }
  }
};
