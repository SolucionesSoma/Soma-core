import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");
const page = read("src/pages/orbit/OrbitPage.tsx");
const content = read("src/pages/orbit/orbitContent.ts");
const data = read("src/pages/orbit/orbitDemoData.ts");
const fox = read("src/pages/orbit/OrbitFoxMark.tsx");
const demo = read("src/pages/orbit/demo/OrbitDemo.tsx");
const styles = read("src/pages/orbit/orbit.css") + read("src/pages/orbit/demo/orbitDemo.css");
const sitemap = read("public/sitemap.xml");
const vercel = read("vercel.json");
const vite = read("vite.config.ts");

assert.match(app, /location\.pathname/);
assert.match(app, /productos\\\/orbit/);
assert.match(app, /OrbitPage/);
assert.match(home, /function HomePage|const HomePage/);
for (const id of ["orbit-hero", "modulos", "flujo", "demo", "gobierno", "integraciones", "preguntas", "contacto"])
  assert.match(page, new RegExp(`id=\\"${id}\\"`));
for (const text of ["La operación completa, bajo control", "Operations under control", "Una solución de SOMA", "A SOMA solution"])
  assert.match(content, new RegExp(text));
for (const name of ["dashboard", "incidents", "pqrsf", "maintenance", "assets"])
  assert.match(data + demo, new RegExp(name, "i"));
assert.match(fox, /<svg/);
assert.match(page, /lazy\(/);
assert.match(demo, /Demo con datos ficticios/);
assert.match(demo, /aria-live/);
assert.match(page, /mailto:contacto@somacoretech\.com/);
assert.match(page, /wa\.me\/573185772152/);
assert.match(page, /SoftwareApplication/);
assert.match(sitemap, /productos\/orbit/);
assert.match(vercel, /productos\/orbit/);
assert.match(vercel, /index\.html/);
assert.match(vite, /base:\s*["']\/["']/);
assert.doesNotMatch(home, /images\/products\/orbit\.webp/);
assert.match(home, /orbit-fox-hd\.webp/);
assert.match(page, /orbit-fox-hd\.webp/);
for (const structure of ["demo-sidebar-logo", "demo-app-header", "demo-breadcrumb", "demo-filter-bar", "demo-support-title"])
  assert.match(demo, new RegExp(structure));
for (const originalStructure of ["Programación de mantenimientos cíclicos", "Gestión de activos fijos", "Añadir registro", "Generar Excel", "Planificación", "Historial", "Actas de entrega", "Proveedores"])
  assert.match(demo, new RegExp(originalStructure));
assert.match(demo, /demo-calendar-grid/);
assert.match(demo, /demo-asset-tabs/);
assert.match(demo, /demo-ticket-filters/);
for (const behavior of ["assetTab", "maintenanceView", "dashboardTab", "ticketTab", "AssetDetail", "MaintenanceForm", "CatalogWorkspace", "OtherServicesWorkspace"])
  assert.match(demo, new RegExp(behavior));
for (const modalTab of ["Información", "Factura", "Mantenimientos", "Traslados", "Detalle del caso", "Conversación", "Trazabilidad"])
  assert.match(demo, new RegExp(modalTab));
for (const workflow of ["Escalar ticket", "Pausar ticket", "Finalizar ticket", "Ejecutar mantenimiento", "Firma del responsable", "Firma de sede"])
  assert.match(demo, new RegExp(workflow));
for (const missingView of ["Formulario de solicitud", "Notificaciones", "Configuración de perfil", "Respuesta masiva", "Pendientes acumulados", "Reporte de mantenimiento"])
  assert.match(demo, new RegExp(missingView));
assert.doesNotMatch(demo, /Portal público|Public portal/);
assert.doesNotMatch(demo, /module === "intake"|intake: UserRound/);
assert.match(demo, /creating \? <RequestForm/);
assert.doesNotMatch(demo, /function CreateForm/);
for (const responseComposer of ["composer-send-chooser", "composer-action-menu", "Más opciones", "Pública", "Interna", "+ CC/CCO", "Finalizar ticket al enviar", "Salir"])
  assert.ok(demo.includes(responseComposer), `Missing response composer detail: ${responseComposer}`);
for (const faithfulModal of ["demo-ticket-response-layout", "demo-ticket-case-panel", "demo-ticket-composer-panel", "Información PQRSF", "Registrar traslado", "Nueva acta de entrega", "Crear Factura Completa"])
  assert.match(demo, new RegExp(faithfulModal));
for (const mobileStructure of ["demo-mobile-menu", "demo-mobile-sidebar-backdrop", "demo-mobile-ticket-list", "demo-mobile-asset-list"])
  assert.match(demo, new RegExp(mobileStructure));
assert.match(styles, /\.demo-app-sidebar\.open/);
assert.match(styles, /\.demo-mobile-ticket-list/);
assert.doesNotMatch(styles, /max-height:\s*100dvh/);
assert.match(styles, /contain:\s*layout paint/);
assert.match(styles, /\.orbit-demo-shell \.demo-modal-backdrop\{position:absolute/);
assert.match(styles, /\.orbit-demo-shell \.demo-mobile-sidebar-backdrop\{position:absolute/);
assert.doesNotMatch(styles, /\.composer-action-menu\{position:fixed/);
assert.match(styles, /\.composer-settings input\[type=checkbox\]\{width:14px;height:14px/);
assert.match(styles, /\.orbit-demo-shell \.ticket-response-modal\{[^}]*calc\(100%/);
assert.match(styles, /--demo-surface:/);
for (const darkSurface of ["demo-metric-grid article", "demo-nav button", "demo-calendar-grid>button", "public-portal", "header-popover"])
  assert.match(styles, new RegExp(`demo-dark[^}]*${darkSurface.replace(/[>.]/g, "\\$&")}|demo-dark \\.${darkSurface.replace(/[>.]/g, "\\$&")}`));
for (const faithfulCyclic of ["Formulario del cíclico", "Programación", "Contexto de la visita", "Pendientes bloqueantes", "Informe visual del cíclico", "Información general", "Checklist técnico"])
  assert.match(demo, new RegExp(faithfulCyclic));
for (const faithfulTicketCreate of ["Formulario de solicitud", "Información de contacto", "Identificación", "Punto de venta", "Información del caso", "Adjuntar archivo"])
  assert.match(demo, new RegExp(faithfulTicketCreate));
assert.match(styles, /grid-template-columns:\s*256px 1fr/);
assert.match(styles, /min-height:\s*900px/);
assert.match(page, /footer-grid/);
assert.match(page, /instagram\.com\/somacoretech/);
assert.match(page, /linkedin\.com\/company\/soma-core/);
assert.match(styles, /\.orbit-fox\{[^}]*height:\s*auto/);
assert.match(home, /href=\{`\/productos\/orbit/);
assert.match(styles, /prefers-reduced-motion/);
assert.match(styles, /min-height:\s*44px/);
for (const forbidden of ["Más x Menos", "Mas x Menos", "MXM", "mxm.com.co", "SIESA"])
  assert.doesNotMatch(`${page}\n${content}\n${data}\n${demo}`, new RegExp(forbidden, "i"));

console.log("Orbit acceptance checks passed");
