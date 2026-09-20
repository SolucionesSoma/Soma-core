import { useEffect, useState } from 'react';
import { ArrowRight, BarChart3, Bot, Boxes, Code2, Database, Headphones, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import CookieConsentBanner from './components/CookieConsentBanner';
import './index.css';

const WA='https://wa.me/573185772152';
const projects=[
 {name:'SOMA WMS',desc:'Inventario, pedidos, trazabilidad y operación conectada.',status:'Operando',scope:'Operaciones · Logística · Analítica',img:'/images/portfolio/portfolio5.webp',cat:'Operaciones'},
 {name:'Dexter IA',desc:'Asistente para atención y conocimiento especializado.',status:'En desarrollo',scope:'IA · Documentos · Conversaciones',img:'/images/portfolio/portfolio1.webp',cat:'Automatización e IA'},
 {name:'Commerce Core',desc:'Comercio, catálogo, pedidos y pagos conectados.',status:'Operando',scope:'Comercio · Integraciones · Pagos',img:'/images/portfolio/portfolio2.webp',cat:'Comercio'},
 {name:'CareFlow',desc:'Agenda, atención y gestión de servicios.',status:'En desarrollo',scope:'Servicios · Agenda · Operación',img:'/images/portfolio/portfolio3.webp',cat:'Servicios'},
 {name:'Lead Engine',desc:'Captura, calificación y seguimiento comercial automatizado.',status:'Próximo',scope:'Ventas · Automatización · Datos',img:'/images/portfolio/portfolio4.webp',cat:'Automatización e IA'},
];
const filters=['Todos','Operaciones','Comercio','Automatización e IA','Servicios'];
const capabilities=[
 ['01','Estrategia y arquitectura','Definimos una ruta tecnológica coherente con la operación.',Boxes],
 ['02','Software y productos digitales','Construimos plataformas seguras, escalables y mantenibles.',Code2],
 ['03','Automatización e inteligencia artificial','Convertimos procesos y conocimiento en herramientas.',Bot],
 ['04','Integración, datos e infraestructura','Conectamos sistemas, información y entornos tecnológicos.',Database],
 ['05','Soporte y evolución','Acompañamos cada sistema durante su ciclo de vida.',ShieldCheck],
] as const;
const go=(id:string)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

function App(){
 const [menu,setMenu]=useState(false),[filter,setFilter]=useState('Todos');
 useEffect(()=>{document.title='SOMA | Ingeniería digital para operaciones reales';document.documentElement.lang='es'},[]);
 const visible=filter==='Todos'?projects.slice(1):projects.filter(p=>p.cat===filter&&p.name!=='SOMA WMS');
 return <div className="site"><Analytics/>
  <header><div className="utility"><div className="container"><span>Bucaramanga, Colombia</span><span>Soporte &nbsp; | &nbsp; Contacto</span></div></div>
   <div className="container nav"><button className="logo" onClick={()=>go('inicio')}><img src="/logo-light.svg" alt="SOMA"/></button>
    <nav>{[['Qué hacemos','capacidades'],['Soluciones','sectores'],['Proyectos','proyectos'],['Compañía','compania'],['Perspectivas','perspectivas']].map(([l,i])=><button key={i} onClick={()=>go(i)}>{l}</button>)}</nav>
    <div className="nav-actions"><button className="search" aria-label="Buscar"><Search size={19}/></button><a className="btn primary nav-cta" href={WA}>Conversemos <ArrowRight size={17}/></a><button className="hamb" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>
   </div>
   {menu&&<div className="mobile-menu">{[['Qué hacemos','capacidades'],['Soluciones','sectores'],['Proyectos','proyectos'],['Compañía','compania'],['Perspectivas','perspectivas']].map(([l,i])=><button key={i} onClick={()=>{go(i);setMenu(false)}}>{l}</button>)}</div>}
  </header>
  <main>
   <section id="inicio" className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow">Operaciones más fuertes</span><h1>Ingeniería digital para operaciones que no pueden detenerse.</h1><p>SOMA conecta estrategia, software, automatización e infraestructura para construir capacidades tecnológicas duraderas.</p><div className="actions"><a className="btn primary" href={WA}>Conversemos <ArrowRight size={18}/></a><button className="btn ghost" onClick={()=>go('proyectos')}>Explore proyectos <ArrowRight size={18}/></button></div></div><div className="hero-image"><img src="/images/portfolio/portfolio5.webp" alt="Producto digital desarrollado por SOMA"/><div>SISTEMAS<br/>PERSONAS<br/>OPERACIONES<br/>RESULTADOS</div></div></div></section>
   <section className="manifesto"><div className="container"><h2>Construimos sistemas, no piezas aisladas.</h2><p>Cada proyecto conecta procesos, datos y equipos para resolver una operación completa.</p></div></section>
   <section id="proyectos" className="section projects"><div className="container"><Heading n="01" label="Proyectos" title="Tecnología construida alrededor de problemas reales." copy="Productos y plataformas que nacen de una necesidad operativa y evolucionan con el negocio."/>
    <div className="filters">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div>
    {(filter==='Todos'||filter==='Operaciones')&&<article className="flagship"><div className="flag-media"><img src={projects[0].img} alt="SOMA WMS"/></div><div className="flag-copy"><Tag text="Operando"/><h3>SOMA WMS</h3><strong>Sistema de gestión para inventario, pedidos, trazabilidad y operación.</strong><dl><div><dt>Área</dt><dd>Operaciones y logística</dd></div><div><dt>Capacidades</dt><dd>Inventario · Pedidos · Despachos</dd></div></dl><p>Mayor visibilidad operativa y mejor control sobre movimientos, existencias y cumplimiento.</p><Link/></div></article>}
    <div className="subheading"><h3>{filter==='Todos'?'Más sistemas en evolución.':`Proyectos de ${filter}.`}</h3><p>Diferentes realidades operativas. Un mismo enfoque.</p></div>
    <div className="project-grid">{visible.map(p=><article className="project" key={p.name}><img src={p.img} alt={p.name}/><div><div className="project-top"><h4>{p.name}</h4><Tag text={p.status}/></div><p>{p.desc}</p><small>{p.scope}</small><Link/></div></article>)}</div>
    <div className="roadmap"><div><h3>Próximos sistemas</h3><p>Nuevas soluciones para retos operativos.</p></div><Road icon={<ShieldCheck/>} title="Gestión de activos"/><Road icon={<Headphones/>} title="PQRSF y soporte"/><Road icon={<BarChart3/>} title="Transporte y movilidad"/></div>
   </div></section>
   <section id="capacidades" className="section capabilities"><div className="container capabilities-grid"><Heading n="02" label="Capacidades" title="Capacidades que hacen posibles estos sistemas." copy="Un enfoque integral, desde la estrategia hasta la operación."/><div className="cap-list">{capabilities.map(([n,t,d,Icon])=><article key={n}><span>{n}</span><Icon/><div><h3>{t}</h3><p>{d}</p></div><ArrowRight/></article>)}</div></div></section>
   <section id="sectores" className="section sectors"><div className="container"><Heading n="03" label="Sectores" title="Tecnología aplicada al contexto." copy="Soluciones adaptadas a la realidad de cada operación."/><div className="sector-grid">{[['Retail y comercio','/images/gallery2.webp'],['Servicios profesionales','/images/gallery6.webp'],['Salud y atención','/images/gallery3.webp'],['Operaciones internas','/images/gallery4.webp']].map(([t,i])=><article key={t}><img src={i} alt=""/><div><h3>{t}</h3><p>Sistemas más ágiles, visibles y preparados para crecer.</p></div></article>)}</div></div></section>
   <section id="compania" className="section process"><div className="container"><Heading n="04" label="Cómo trabajamos" title="Un socio tecnológico para construir y evolucionar." copy="Acompañamos su operación durante todo el ciclo de la solución."/><div className="steps">{[['01','Comprender'],['02','Definir'],['03','Construir'],['04','Acompañar']].map(([n,t])=><article key={n}><span>{n}</span><h3>{t}</h3><p>Decisiones con contexto, disciplina y foco en resultados.</p></article>)}</div><p className="statement">Combinamos entendimiento operativo, ingeniería de software y acompañamiento continuo.</p></div></section>
   <section id="perspectivas" className="section insights"><div className="container"><Heading n="05" label="Perspectivas" title="Ideas para tomar mejores decisiones tecnológicas." copy="Criterios prácticos para construir tecnología útil."/><div className="insight-grid">{['Qué procesos vale la pena automatizar','Software propio frente a herramientas fragmentadas','Preparar los datos antes de adoptar IA'].map((t,i)=><article key={t}><span>0{i+1}</span><h3>{t}</h3><p>Análisis para tomar decisiones con mayor claridad.</p><Link/></article>)}</div></div></section>
   <section id="contacto" className="cta"><div className="container"><div><h2>Construyamos el próximo sistema de su operación.</h2><p>Hablemos de sus desafíos y diseñemos una solución que genere valor real.</p></div><a className="btn primary" href={WA}>Hablar con SOMA <ArrowRight/></a></div></section>
  </main>
  <footer><div className="container footer-grid"><div className="footer-brand"><img src="/logo-dark.svg" alt="SOMA"/><p>Tecnología, personas y negocio para un futuro con más posibilidades.</p></div><Foot title="Qué hacemos" links={['Estrategia y arquitectura','Software y productos','Automatización e IA','Integración e infraestructura']}/><Foot title="Soluciones" links={['Retail y comercio','Servicios profesionales','Salud y atención','Operaciones internas']}/><Foot title="Compañía" links={['Nuestro enfoque','Proyectos','Contacto']}/></div><div className="container legal"><span>SOMA · Bucaramanga, Colombia · NIT 902080602-8</span><span><a href="/privacy.html">Privacidad</a> · <a href="/terms.html">Términos</a></span></div></footer>
  <CookieConsentBanner/>
 </div>
}
function Heading({n,label,title,copy}:{n:string,label:string,title:string,copy:string}){return <div className="heading"><div><span>{n} / {label}</span><h2>{title}</h2></div><p>{copy}</p></div>}
function Tag({text}:{text:string}){return <span className="tag">{text}</span>}
function Link(){return <a className="inline-link" href={WA}>Conocer el proyecto <ArrowRight size={16}/></a>}
function Road({icon,title}:{icon:React.ReactNode,title:string}){return <div className="road">{icon}<div><strong>{title}</strong><span>Planeación, control y trazabilidad.</span></div></div>}
function Foot({title,links}:{title:string,links:string[]}){return <div className="foot"><h3>{title}</h3>{links.map(l=><a href="#inicio" key={l}>{l}</a>)}</div>}
export default App;
