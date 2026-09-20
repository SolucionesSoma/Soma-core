import { useState } from "react";
import {
  Activity, AlertTriangle, Bell, Box, CalendarDays, ChevronDown, ChevronRight,
  FolderOpen, Gauge, Languages, LayoutDashboard, MessageSquareText, Moon, Plus,
  RotateCcw, Search, ShieldCheck, UserRound, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "../../../i18n";
import { orbitContent } from "../orbitContent";
import { orbitDemoData, type DemoModule, type Ticket } from "../orbitDemoData";
import "./orbitDemo.css";

const icons: Record<DemoModule, LucideIcon> = {
  dashboard: LayoutDashboard,
  incidents: AlertTriangle,
  pqrsf: MessageSquareText,
  maintenance: CalendarDays,
  assets: Box,
};
type Maintenance = (typeof orbitDemoData.maintenance)[number];
type Asset = (typeof orbitDemoData.assets)[number];
type DemoSelected = Ticket | Maintenance | Asset;

export default function OrbitDemo({ locale }: { locale: Locale }) {
  const t = orbitContent[locale].demo;
  const [module, setModule] = useState<DemoModule>("dashboard");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<DemoSelected | null>(null);
  const [creating, setCreating] = useState(false);
  const [added, setAdded] = useState<Ticket[]>([]);
  const [notice, setNotice] = useState("");
  const labels: Record<DemoModule, string> = {
    dashboard: t.dashboard, incidents: t.incidents, pqrsf: t.pqrsf,
    maintenance: t.maintenance, assets: t.assets,
  };
  const tickets = [...added, ...orbitDemoData.tickets]
    .filter((ticket) => ticket.kind === module)
    .filter((ticket) => filter === "all" || (filter === "critical" ? ticket.priority === "Crítica" : ticket.status !== "Cerrado"));
  const reset = () => {
    setModule("dashboard"); setFilter("all"); setSelected(null);
    setCreating(false); setAdded([]); setNotice("");
  };
  const changeModule = (next: DemoModule) => {
    setModule(next); setFilter("all"); setSelected(null);
  };

  return (
    <div className="orbit-demo-shell">
      <div className="demo-layout">
        <aside className="demo-app-sidebar">
          <div className="demo-sidebar-logo">
            <img src="/orbit-fox-hd.webp" alt="Orbit" />
            <div><strong>ORBIT</strong><small>{locale === "es" ? "Una solución de SOMA" : "A SOMA solution"}</small></div>
          </div>
          <h3 className="demo-support-title">{locale === "es" ? "Soporte" : "Support"}</h3>
          <nav className="demo-nav" aria-label="Orbit demo modules">
            {orbitDemoData.modules.map((name) => {
              const Icon = icons[name];
              return (
                <button key={name} aria-current={module === name ? "page" : undefined} onClick={() => changeModule(name)}>
                  <Icon size={20} /><span>{labels[name]}</span>
                </button>
              );
            })}
            <button><FolderOpen size={20} /><span>{locale === "es" ? "Catálogos" : "Catalogs"}</span></button>
          </nav>
          <div className="demo-sidebar-user">
            <span>SM</span><div><b>Sofía Moreno</b><small>{locale === "es" ? "Administradora" : "Administrator"}</small></div><ChevronDown size={15}/>
          </div>
        </aside>

        <div className="demo-app-body">
          <header className="demo-app-header">
            <span className="demo-breadcrumb">/ {locale === "es" ? "soporte" : "support"} / {labels[module].toLowerCase()}</span>
            <div>
              <button aria-label={locale === "es" ? "Idioma" : "Language"}><Languages size={20}/><small>{locale.toUpperCase()}</small></button>
              <button aria-label={locale === "es" ? "Tema" : "Theme"}><Moon size={20}/></button>
              <button aria-label={locale === "es" ? "Notificaciones" : "Notifications"}><Bell size={20}/><i/></button>
              <button className="demo-profile" aria-label={locale === "es" ? "Perfil" : "Profile"}><UserRound size={20}/></button>
            </div>
          </header>

          <main className="demo-workspace">
            <div className="demo-title">
              <div><h3>{labels[module]}</h3><p>{locale === "es" ? "Información operativa actualizada" : "Updated operational information"}</p></div>
              <div className="demo-title-actions">
                <span>{t.demoNotice}</span>
                <button className="demo-reset" onClick={reset}><RotateCcw size={15}/>{t.reset}</button>
                {(module === "incidents" || module === "pqrsf") && <button className="demo-primary" onClick={() => setCreating(true)}><Plus size={17}/>{t.create}</button>}
              </div>
            </div>

            <div className="demo-filter-bar">
              <label><Search size={17}/><input aria-label={locale === "es" ? "Buscar" : "Search"} placeholder={locale === "es" ? "Buscar en Orbit" : "Search Orbit"}/></label>
              <button>{locale === "es" ? "Últimos 30 días" : "Last 30 days"}<ChevronDown size={15}/></button>
              <button>{locale === "es" ? "Todas las áreas" : "All areas"}<ChevronDown size={15}/></button>
            </div>

            <div className="demo-section-tabs">
              {(["incidents", "pqrsf", "maintenance", "assets"] as DemoModule[]).map((name) => (
                <button key={name} className={module === name ? "active" : ""} onClick={() => changeModule(name)}>{labels[name]}</button>
              ))}
            </div>

            {module === "dashboard" && <Dashboard locale={locale} onOpen={() => changeModule("incidents")}/>} 
            {(module === "incidents" || module === "pqrsf") && (
              <div className="demo-list-card">
                <div className="demo-queue-bar">
                  {[["all", t.all], ["critical", t.critical], ["open", t.open]].map(([value, label]) => (
                    <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>
                  ))}
                </div>
                {tickets.length ? <div className="demo-table">
                  <div className="demo-table-head"><span>ID</span><span>{locale === "es" ? "Asunto" : "Subject"}</span><span>{locale === "es" ? "Área" : "Area"}</span><span>SLA</span><span/></div>
                  {tickets.map((ticket) => <button key={ticket.id} onClick={() => setSelected(ticket)}><b>{ticket.id}</b><span className="ticket-title"><i className={`demo-priority ${ticket.priority.toLowerCase().replace("í", "i")}`}/>{ticket.title}</span><span>{ticket.area}</span><em>{ticket.sla}</em><ChevronRight size={16}/></button>)}
                </div> : <div className="demo-empty"><Search/><p>{t.empty}</p><button onClick={() => setFilter("all")}>{t.clear}</button></div>}
              </div>
            )}
            {module === "maintenance" && <div className="demo-cards">{orbitDemoData.maintenance.map((item) => <button key={item.id} onClick={() => setSelected(item)}><div><small>{item.date}</small><span>{item.status}</span></div><b>{item.title}</b><p>{item.site} · {item.owner}</p><div className="progress"><i style={{ width: `${item.progress}%` }}/></div><em>{item.progress}%</em></button>)}</div>}
            {module === "assets" && <div className="demo-list-card"><div className="demo-table assets"><div className="demo-table-head"><span>ID</span><span>{locale === "es" ? "Activo" : "Asset"}</span><span>{locale === "es" ? "Ubicación" : "Location"}</span><span>{locale === "es" ? "Estado" : "Status"}</span><span/></div>{orbitDemoData.assets.map((item) => <button key={item.id} onClick={() => setSelected(item)}><b>{item.id}</b><span className="ticket-title"><Box size={17}/>{item.name}</span><span>{item.site}</span><em>{item.status}</em><ChevronRight size={16}/></button>)}</div></div>}
          </main>
        </div>
      </div>
      <div className="sr-only" aria-live="polite">{notice}</div>
      {(selected || creating) && <div className="demo-modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) { setSelected(null); setCreating(false); } }}><div className="demo-modal" role="dialog" aria-modal="true" aria-label={creating ? t.create : t.detail} onKeyDown={(event) => { if (event.key === "Escape") { setSelected(null); setCreating(false); } }} tabIndex={-1}><button className="demo-close" autoFocus onClick={() => { setSelected(null); setCreating(false); }} aria-label={t.close}><X/></button>{creating ? <CreateForm locale={locale} onCancel={() => setCreating(false)} onCreate={(ticket) => { setAdded([ticket, ...added]); setCreating(false); setNotice(t.created); }}/> : selected ? <Detail item={selected} locale={locale}/> : null}</div></div>}
    </div>
  );
}

function Dashboard({ locale, onOpen }: { locale: Locale; onOpen: () => void }) {
  const es = locale === "es";
  const cards: Array<[string, string, LucideIcon]> = [["96.4%", es ? "Cumplimiento SLA" : "SLA compliance", ShieldCheck], ["27", es ? "Tickets activos" : "Active tickets", Activity], ["08", es ? "Próximos a vencer" : "Near due", Gauge], ["142", es ? "Total del periodo" : "Period total", MessageSquareText]];
  return <><section className="demo-metric-grid">{cards.map(([value, label, Icon]) => <article key={label}><div><span>{label}</span><strong>{value}</strong></div><Icon/></article>)}</section><section className="demo-dashboard-grid"><article className="demo-chart"><div><b>{es ? "Cumplimiento diario" : "Daily compliance"}</b><small>{es ? "Tendencia de los últimos 7 días" : "Last 7 days trend"}</small></div><div className="line-chart"><svg viewBox="0 0 500 190" preserveAspectRatio="none"><path d="M0 145 C70 120,90 150,145 105 S230 55,285 82 S365 120,410 60 S470 45,500 25"/><path className="fill" d="M0 145 C70 120,90 150,145 105 S230 55,285 82 S365 120,410 60 S470 45,500 25 L500 190 L0 190Z"/></svg><div><span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span></div></div></article><article className="demo-queue"><div><b>{es ? "Atención prioritaria" : "Priority queue"}</b><button onClick={onOpen}>{es ? "Ver tickets" : "View tickets"}</button></div>{orbitDemoData.tickets.slice(0, 4).map((ticket) => <p key={ticket.id}><i className={`demo-priority ${ticket.priority.toLowerCase().replace("í", "i")}`}/><span><b>{ticket.id}</b><small>{ticket.title}</small></span><em>{ticket.sla}</em></p>)}</article></section><section className="demo-lower-grid"><article><b>{es ? "Distribución por estado" : "Status distribution"}</b><div className="donut"><i/><span><strong>142</strong><small>{es ? "tickets" : "tickets"}</small></span></div></article><article><b>{es ? "Tickets por prioridad" : "Tickets by priority"}</b><div className="horizontal-bars"><p><span>{es ? "Crítica" : "Critical"}</span><i><b style={{width:"28%"}}/></i><em>12</em></p><p><span>{es ? "Alta" : "High"}</span><i><b style={{width:"62%"}}/></i><em>34</em></p><p><span>{es ? "Media" : "Medium"}</span><i><b style={{width:"88%"}}/></i><em>61</em></p></div></article></section></>;
}

function CreateForm({ locale, onCancel, onCreate }: { locale: Locale; onCancel: () => void; onCreate: (ticket: Ticket) => void }) {
  const t = orbitContent[locale].demo;
  return <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); onCreate({ id: "INC-1049", title: String(data.get("title")), kind: "incidents", area: String(data.get("area")), priority: String(data.get("priority")) as Ticket["priority"], status: "Nuevo", sla: "04:00", owner: "Mesa de servicio", created: "Ahora" }); }}><small>ORBIT / {t.create.toUpperCase()}</small><h3>{t.create}</h3><label>{t.title}<input name="title" required placeholder={locale === "es" ? "Describa la situación" : "Describe the situation"}/></label><label>{t.area}<select name="area"><option>Operaciones</option><option>Infraestructura</option><option>Servicio</option></select></label><label>{t.priority}<select name="priority"><option>Media</option><option>Alta</option><option>Crítica</option></select></label><div className="form-actions"><button type="button" onClick={onCancel}>{t.cancel}</button><button className="demo-primary" type="submit">{t.save}</button></div></form>;
}

function Detail({ item, locale }: { item: DemoSelected; locale: Locale }) {
  const t = orbitContent[locale].demo;
  const isTicket = item.id.startsWith("INC") || item.id.startsWith("PQR");
  const isMaintenance = item.id.startsWith("MNT");
  const title = "name" in item ? item.name : item.title;
  return <div className="demo-detail"><small>ORBIT / {item.id}</small><h3>{title}</h3><div className="detail-meta"><span><b>{locale === "es" ? "Estado" : "Status"}</b>{item.status}</span><span><b>{locale === "es" ? "Responsable" : "Owner"}</b>{item.owner}</span></div>{isTicket && "sla" in item && <><section><h4>SLA · {item.sla}</h4><div className="sla-line"><i/></div></section><section><h4>{t.timeline}</h4><p>09:04 · {locale === "es" ? "Asignado al equipo responsable" : "Assigned to responsible team"}</p><p>08:42 · {locale === "es" ? "Clasificación asistida confirmada" : "Assisted classification confirmed"}</p><p>08:21 · {locale === "es" ? "Caso creado" : "Case created"}</p></section><section className="detail-split"><div><h4>{t.attachments}</h4><p>evidencia-01.pdf</p></div><div><h4>{t.response}</h4><p>{locale === "es" ? "Diagnóstico en curso." : "Diagnosis in progress."}</p></div></section></>}{isMaintenance && <><section><h4>{t.checklist}</h4><p>✓ {locale === "es" ? "Inspección visual" : "Visual inspection"}</p><p>✓ {locale === "es" ? "Prueba funcional" : "Functional test"}</p><p>○ {locale === "es" ? "Registro de evidencia" : "Evidence record"}</p></section><section><h4>{t.signatures}</h4><p>{locale === "es" ? "Responsable técnico · pendiente" : "Technical owner · pending"}</p></section></>}{!isTicket && !isMaintenance && "site" in item && <><section className="detail-split"><div><h4>{t.location}</h4><p>{item.site}</p></div><div><h4>{t.invoice}</h4><p>FAC-2026-0184</p></div></section><section><h4>{t.transfers}</h4><p>12 SEP · {locale === "es" ? "Asignado a" : "Assigned to"} {item.owner}</p><p>03 JUN · {locale === "es" ? "Recibido en" : "Received at"} {item.site}</p></section><section><h4>{t.maintenance}</h4><p>18 AGO · {locale === "es" ? "Revisión preventiva completada" : "Preventive inspection completed"}</p></section></>}</div>;
}
