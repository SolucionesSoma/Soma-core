import { useState } from "react";
import { Activity, AlertTriangle, Box, CalendarDays, ChevronRight, Gauge, LayoutDashboard, MessageSquareText, Plus, RotateCcw, Search, ShieldCheck, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Locale } from "../../../i18n";
import { orbitContent } from "../orbitContent";
import { orbitDemoData, type DemoModule, type Ticket } from "../orbitDemoData";
import "./orbitDemo.css";

const icon = { dashboard: LayoutDashboard, incidents: AlertTriangle, pqrsf: MessageSquareText, maintenance: CalendarDays, assets: Box };
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
  const reset = () => { setModule("dashboard"); setFilter("all"); setSelected(null); setCreating(false); setAdded([]); setNotice(""); };
  const labels: Record<DemoModule,string> = { dashboard: t.dashboard, incidents: t.incidents, pqrsf: t.pqrsf, maintenance: t.maintenance, assets: t.assets };
  const tickets = [...added, ...orbitDemoData.tickets].filter(x => x.kind === module).filter(x => filter === "all" || (filter === "critical" ? x.priority === "Crítica" : x.status !== "Cerrado"));

  return <div className="orbit-demo-shell">
    <div className="demo-topbar"><div><span className="demo-brand-mark">O</span><strong>ORBIT</strong><small>{t.demoNotice}</small></div><button onClick={reset}><RotateCcw size={15}/>{t.reset}</button></div>
    <div className="demo-layout">
      <aside><div className="demo-nav" role="tablist" aria-label="Orbit demo modules">{orbitDemoData.modules.map(name => { const Icon=icon[name]; return <button key={name} role="tab" aria-selected={module===name} onClick={() => {setModule(name);setFilter("all");setSelected(null)}}><Icon size={18}/><span>{labels[name]}</span></button> })}</div><div className="demo-user"><span>SM</span><div><b>Sofía Moreno</b><small>{locale === "es" ? "Administradora" : "Administrator"}</small></div></div></aside>
      <section className="demo-workspace">
        <div className="demo-title"><div><small>ORBIT / {labels[module].toUpperCase()}</small><h3>{labels[module]}</h3></div>{(module === "incidents" || module === "pqrsf") && <button className="demo-primary" onClick={()=>setCreating(true)}><Plus size={17}/>{t.create}</button>}</div>
        {module === "dashboard" && <Dashboard locale={locale} onOpen={()=>setModule("incidents")}/>} 
        {(module === "incidents" || module === "pqrsf") && <div><div className="demo-filters"><Search size={17}/>{[["all",t.all],["critical",t.critical],["open",t.open]].map(([value,label])=><button key={value} className={filter===value?"active":""} onClick={()=>setFilter(value)}>{label}</button>)}</div>{tickets.length ? <div className="demo-table">{tickets.map(ticket=><button key={ticket.id} onClick={()=>setSelected(ticket)}><span className={`demo-priority ${ticket.priority.toLowerCase().replace("í","i")}`}/><b>{ticket.id}</b><span className="ticket-title">{ticket.title}</span><span>{ticket.area}</span><em>{ticket.sla}</em><ChevronRight size={16}/></button>)}</div> : <div className="demo-empty"><Search/><p>{t.empty}</p><button onClick={()=>setFilter("all")}>{t.clear}</button></div>}</div>}
        {module === "maintenance" && <div className="demo-cards">{orbitDemoData.maintenance.map(item=><button key={item.id} onClick={()=>setSelected(item)}><div><small>{item.date}</small><span>{item.status}</span></div><b>{item.title}</b><p>{item.site} · {item.owner}</p><div className="progress"><i style={{width:`${item.progress}%`}}/></div><em>{item.progress}%</em></button>)}</div>}
        {module === "assets" && <div className="demo-table assets">{orbitDemoData.assets.map(item=><button key={item.id} onClick={()=>setSelected(item)}><Box size={18}/><b>{item.id}</b><span className="ticket-title">{item.name}</span><span>{item.site}</span><em>{item.status}</em><ChevronRight size={16}/></button>)}</div>}
      </section>
    </div>
    <div className="sr-only" aria-live="polite">{notice}</div>
    {(selected || creating) && <div className="demo-modal-backdrop" onMouseDown={(e)=>{if(e.currentTarget===e.target){setSelected(null);setCreating(false)}}}><div className="demo-modal" role="dialog" aria-modal="true" aria-label={creating?t.create:t.detail} onKeyDown={(e)=>{if(e.key==="Escape"){setSelected(null);setCreating(false)}}} tabIndex={-1}><button className="demo-close" autoFocus onClick={()=>{setSelected(null);setCreating(false)}} aria-label={t.close}><X/></button>{creating ? <CreateForm locale={locale} onCancel={()=>setCreating(false)} onCreate={(ticket)=>{setAdded([ticket,...added]);setCreating(false);setNotice(t.created)}}/> : selected ? <Detail item={selected} locale={locale}/> : null}</div></div>}
  </div>;
}

function Dashboard({locale,onOpen}:{locale:Locale;onOpen:()=>void}) { const es=locale==="es"; const cards: Array<[string,string,LucideIcon]> = [["96.4%",es?"SLA cumplido":"SLA met",ShieldCheck],["27",es?"Casos activos":"Active cases",Activity],["08",es?"Por vencer":"Near due",Gauge]]; return <><div className="demo-kpis">{cards.map(([n,l,Icon])=><article key={l}><Icon/><div><strong>{n}</strong><span>{l}</span></div></article>)}</div><div className="demo-dashboard-grid"><article className="demo-chart"><div><b>{es?"Carga semanal":"Weekly workload"}</b><small>{es?"Últimos 7 días":"Last 7 days"}</small></div><div className="bars">{[42,64,48,82,66,91,58].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div></article><article className="demo-queue"><div><b>{es?"Atención prioritaria":"Priority queue"}</b><button onClick={onOpen}>{es?"Ver todo":"View all"}</button></div>{orbitDemoData.tickets.slice(0,3).map(x=><p key={x.id}><span/><b>{x.id}</b><em>{x.sla}</em></p>)}</article></div></> }

function CreateForm({locale,onCancel,onCreate}:{locale:Locale;onCancel:()=>void;onCreate:(t:Ticket)=>void}) { const t=orbitContent[locale].demo; return <form onSubmit={e=>{e.preventDefault();const f=new FormData(e.currentTarget);onCreate({id:"INC-1049",title:String(f.get("title")),kind:"incidents",area:String(f.get("area")),priority:String(f.get("priority")) as Ticket["priority"],status:"Nuevo",sla:"04:00",owner:"Mesa de servicio",created:"Ahora"})}}><small>ORBIT / {t.create.toUpperCase()}</small><h3>{t.create}</h3><label>{t.title}<input name="title" required placeholder={locale==="es"?"Describa la situación":"Describe the situation"}/></label><label>{t.area}<select name="area"><option>Operaciones</option><option>Infraestructura</option><option>Servicio</option></select></label><label>{t.priority}<select name="priority"><option>Media</option><option>Alta</option><option>Crítica</option></select></label><div className="form-actions"><button type="button" onClick={onCancel}>{t.cancel}</button><button className="demo-primary" type="submit">{t.save}</button></div></form> }

function Detail({item,locale}:{item:DemoSelected;locale:Locale}) { const t=orbitContent[locale].demo; const isTicket=item.id.startsWith("INC")||item.id.startsWith("PQR"); const isM=item.id.startsWith("MNT"); const title="name" in item?item.name:item.title; const owner=item.owner; return <div className="demo-detail"><small>ORBIT / {item.id}</small><h3>{title}</h3><div className="detail-meta"><span><b>{locale==="es"?"Estado":"Status"}</b>{item.status}</span><span><b>{locale==="es"?"Responsable":"Owner"}</b>{owner}</span></div>{isTicket&&"sla" in item&&<><section><h4>SLA · {item.sla}</h4><div className="sla-line"><i/></div></section><section><h4>{t.timeline}</h4><p>09:04 · {locale==="es"?"Asignado al equipo responsable":"Assigned to responsible team"}</p><p>08:42 · {locale==="es"?"Clasificación asistida confirmada":"Assisted classification confirmed"}</p><p>08:21 · {locale==="es"?"Caso creado":"Case created"}</p></section><section className="detail-split"><div><h4>{t.attachments}</h4><p>evidencia-01.pdf</p></div><div><h4>{t.response}</h4><p>{locale==="es"?"Diagnóstico en curso.":"Diagnosis in progress."}</p></div></section></>}{isM&&<><section><h4>{t.checklist}</h4><p>✓ {locale==="es"?"Inspección visual":"Visual inspection"}</p><p>✓ {locale==="es"?"Prueba funcional":"Functional test"}</p><p>○ {locale==="es"?"Registro de evidencia":"Evidence record"}</p></section><section><h4>{t.signatures}</h4><p>{locale==="es"?"Responsable técnico · pendiente":"Technical owner · pending"}</p></section></>}{!isTicket&&!isM&&"site" in item&&<><section className="detail-split"><div><h4>{t.location}</h4><p>{item.site}</p></div><div><h4>{t.invoice}</h4><p>FAC-2026-0184</p></div></section><section><h4>{t.transfers}</h4><p>12 SEP · {locale==="es"?"Asignado a":"Assigned to"} {owner}</p><p>03 JUN · {locale==="es"?"Recibido en":"Received at"} {item.site}</p></section><section><h4>{t.maintenance}</h4><p>18 AGO · {locale==="es"?"Revisión preventiva completada":"Preventive inspection completed"}</p></section></>}</div> }
