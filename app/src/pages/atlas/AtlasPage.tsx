import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Languages, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import CookieConsentBanner from "../../components/CookieConsentBanner";
import { applyPreferences, getInitialLocale, getInitialTheme, type Theme } from "../../preferences";
import type { Locale } from "../../i18n";
import { atlasContent } from "./atlasContent";
import "../../index.css";
import "./atlas.css";

const AtlasDemo = lazy(() => import("./demo/AtlasDemo"));
const WA = "https://wa.me/573185772152?text=Hola%2C%20quiero%20solicitar%20una%20demostraci%C3%B3n%20de%20Nexo.";
const ids = ["modulos", "flujo", "demo", "gobierno", "preguntas"];

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) { return <div className="atlas-section-head"><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>; }

export default function AtlasPage() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menu, setMenu] = useState(false);
  const [demoReady, setDemoReady] = useState(false);
  const t = atlasContent[locale];
  useEffect(() => {
    applyPreferences(locale, theme); document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", "https://somacoretech.com/productos/nexo");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://somacoretech.com/productos/nexo");
    const url = new URL(location.href); if (locale === "en") url.searchParams.set("lang", "en"); else url.searchParams.delete("lang"); history.replaceState({}, "", url);
    let schema = document.querySelector<HTMLScriptElement>("#nexo-schema"); if (!schema) { schema = document.createElement("script"); schema.id = "nexo-schema"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Nexo", applicationCategory: "BusinessApplication", operatingSystem: "Web", description: t.meta.description, url: "https://somacoretech.com/productos/nexo", creator: { "@type": "Organization", name: "SOMA Core", taxID: "902080602-8" } });
    return () => schema?.remove();
  }, [locale, theme, t]);
  useEffect(() => { const node = document.getElementById("demo"); if (!node || !("IntersectionObserver" in window)) { queueMicrotask(() => setDemoReady(true)); return; } const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setDemoReady(true); observer.disconnect(); } }, { rootMargin: "500px" }); observer.observe(node); return () => observer.disconnect(); }, []);
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <div className="atlas-site"><Analytics />
    <header className="atlas-header"><div className="atlas-utility"><div className="container"><a href="/">{t.back}</a><span>{t.signature}</span></div></div><div className="container atlas-nav">
      <a className="atlas-brand" href="#atlas-hero" aria-label="Nexo, inicio"><img src="/nexo-bee-hd.webp" alt=""/><span><strong>NEXO</strong><small>{t.signature}</small></span></a>
      <nav aria-label={locale === "es" ? "Navegación Nexo" : "Nexo navigation"}>{t.nav.map((label, i) => <button key={label} onClick={() => scroll(ids[i])}>{label}</button>)}</nav>
      <div className="atlas-nav-actions"><button className="atlas-pref" onClick={() => setLocale(locale === "es" ? "en" : "es")} aria-label={t.language}><Languages size={18}/><span>{locale.toUpperCase()}</span></button><button className="atlas-pref icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={t.theme}>{theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}</button><a className="atlas-button compact" href={WA}>{locale === "es" ? "Solicitar demo" : "Request demo"}<ArrowRight size={17}/></a><button className="atlas-menu" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button></div>
    </div>{menu && <div className="atlas-mobile-nav">{t.nav.map((label, i) => <button key={label} onClick={() => { scroll(ids[i]); setMenu(false); }}>{label}</button>)}</div>}</header>
    <main><section id="atlas-hero" className="atlas-hero"><div className="container atlas-hero-grid"><div className="atlas-hero-copy"><span className="atlas-eyebrow">{t.hero.eyebrow}</span><h1>{t.hero.title}</h1><p>{t.hero.copy}</p><div className="atlas-actions"><a className="atlas-button" href={WA}>{t.hero.primary}<ArrowRight size={18}/></a><a className="atlas-button secondary" href="mailto:contacto@somacoretech.com"><Mail size={18}/>{t.hero.secondary}</a></div><button className="atlas-text-action" onClick={() => scroll("demo")}>{t.hero.demo}<ArrowDown size={17}/></button></div>
      <div className="atlas-hero-visual" aria-label={locale === "es" ? "Vista de Nexo" : "Nexo preview"}><div className="atlas-halo"/><img className="atlas-owl" src="/nexo-bee-hd.webp" alt={locale === "es" ? "Abeja de papel, símbolo de Nexo" : "Paper bee, Nexo symbol"} width="1200" height="1200" fetchPriority="high"/><div className="atlas-ui-card main"><span>NEXO / NETWORK</span><strong>94.8%</strong><small>{locale === "es" ? "documentos al día" : "documents current"}</small><div className="atlas-spark"><i/><i/><i/><i/><i/></div></div><div className="atlas-ui-card alert"><b>FAC-2094</b><span>{locale === "es" ? "En revisión" : "Under review"}</span><em>12:40</em></div><div className="atlas-ui-card asset"><span>PAG-0841</span><b>{locale === "es" ? "Programado" : "Scheduled"}</b></div></div></div><div className="container atlas-proof">{t.proof.map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong></div>)}</div></section>
      <section id="modulos" className="atlas-section atlas-modules"><div className="container"><SectionHead {...t.sections.modules}/><div className="atlas-module-grid">{t.modules.map(([name, copy], i) => <article key={name} className={i === 0 ? "wide" : ""}><span>0{i + 1}</span><h3>{name}</h3><p>{copy}</p><div className="module-line"/></article>)}</div></div></section>
      <section id="flujo" className="atlas-section atlas-flow"><div className="container"><SectionHead {...t.sections.flow}/><div className="atlas-flow-grid">{t.flow.map(([name, copy], i) => <article key={name}><b>{String(i + 1).padStart(2, "0")}</b><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>
      <section id="demo" className="atlas-section atlas-demo-section"><div className="container"><SectionHead {...t.sections.demo}/>{demoReady ? <Suspense fallback={<div className="atlas-demo-placeholder" aria-busy="true">NEXO</div>}><AtlasDemo locale={locale}/></Suspense> : <div className="atlas-demo-placeholder"><img src="/nexo-bee-hd.webp" alt=""/><span>NEXO</span></div>}</div></section>
      <section id="gobierno" className="atlas-section atlas-governance"><div className="container atlas-two-col"><SectionHead {...t.sections.governance}/><div className="atlas-governance-list">{t.governance.map(([name, copy], i) => <article key={name}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{name}</h3><p>{copy}</p></div></article>)}</div></div></section>
      <section id="preguntas" className="atlas-section atlas-faq"><div className="container atlas-two-col"><SectionHead {...t.sections.faq}/><div>{t.faq.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>
      <section id="contacto" className="atlas-cta"><div className="container"><img src="/nexo-bee-hd.webp" alt=""/><div><span>{t.signature}</span><h2>{t.cta.title}</h2><p>{t.cta.copy}</p></div><div className="atlas-cta-actions"><a className="atlas-button light" href={WA}>{t.cta.whatsapp}<ArrowRight size={18}/></a><a href="mailto:contacto@somacoretech.com">{t.cta.email}</a></div></div></section></main>
    <footer><div className="container footer-grid"><div className="footer-brand"><img src="/logo-dark.svg" alt="SOMA" width="170" height="65"/><p>{locale === "es" ? "Tecnología, personas y negocio para un futuro con más posibilidades." : "Technology, people and business for a future with more possibilities."}</p></div><Foot title={locale === "es" ? "Qué hacemos" : "What we do"} links={locale === "es" ? ["Estrategia y arquitectura", "Software y productos digitales", "Automatización e IA"] : ["Strategy and architecture", "Software and digital products", "Automation and AI"]}/><Foot title={locale === "es" ? "Soluciones" : "Solutions"} links={locale === "es" ? ["Comercio y servicios", "Operaciones internas", "Relación con proveedores"] : ["Commerce and services", "Internal operations", "Supplier relationships"]}/><div className="foot contact-foot"><h3>{locale === "es" ? "Contacto y redes" : "Contact and social"}</h3><a className="email-link" href="mailto:contacto@somacoretech.com"><Mail size={15}/>contacto@somacoretech.com</a><div className="social-links"><a href="https://www.instagram.com/somacoretech/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.linkedin.com/company/soma-core" target="_blank" rel="noreferrer"><Linkedin size={15}/>LinkedIn</a></div></div></div><div className="container legal"><span>SOMA · Bucaramanga, Colombia · NIT 902080602-8</span><span><a href={locale === "en" ? "/privacy-en.html" : "/privacy.html"}>{locale === "es" ? "Privacidad" : "Privacy"}</a> · <a href={locale === "en" ? "/terms-en.html" : "/terms.html"}>{locale === "es" ? "Términos" : "Terms"}</a></span></div></footer><CookieConsentBanner locale={locale}/>
  </div>;
}
function Foot({ title, links }: { title: string; links: string[] }) { return <div className="foot"><h3>{title}</h3>{links.map(link => <a href="/#capacidades" key={link}>{link}</a>)}</div>; }
