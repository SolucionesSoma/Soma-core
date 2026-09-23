import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, ArrowRight, Languages, Linkedin, Mail, Menu, Moon, Sun, X } from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import CookieConsentBanner from "../../components/CookieConsentBanner";
import { applyPreferences, getInitialLocale, getInitialTheme, type Theme } from "../../preferences";
import type { Locale } from "../../i18n";
import { orbitContent } from "./orbitContent";
import "../../index.css";
import "./orbit.css";

const OrbitDemo = lazy(() => import("./demo/OrbitDemo"));
const WA = "https://wa.me/573185772152?text=Hola%2C%20quiero%20solicitar%20una%20demostraci%C3%B3n%20de%20Orbit.";
const ids = ["modulos", "flujo", "demo", "gobierno", "preguntas"];

function SectionHead({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="orbit-section-head"><span>{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div>;
}

export default function OrbitPage() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menu, setMenu] = useState(false);
  const [demoReady, setDemoReady] = useState(false);
  const t = orbitContent[locale];

  useEffect(() => {
    applyPreferences(locale, theme);
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", "https://somacoretech.com/productos/orbit");
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://somacoretech.com/productos/orbit");
    const url = new URL(location.href);
    if (locale === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState({}, "", url);
    let schema = document.querySelector<HTMLScriptElement>("#orbit-schema");
    if (!schema) { schema = document.createElement("script"); schema.id = "orbit-schema"; schema.type = "application/ld+json"; document.head.appendChild(schema); }
    schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Orbit", applicationCategory: "BusinessApplication", operatingSystem: "Web", description: t.meta.description, url: "https://somacoretech.com/productos/orbit", creator: { "@type": "Organization", name: "SOMA Core", taxID: "902080602-8" } });
    return () => schema?.remove();
  }, [locale, theme, t]);

  useEffect(() => {
    const node = document.getElementById("demo");
    if (!node || !("IntersectionObserver" in window)) { queueMicrotask(() => setDemoReady(true)); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setDemoReady(true); observer.disconnect(); } }, { rootMargin: "500px" });
    observer.observe(node); return () => observer.disconnect();
  }, []);

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <div className="orbit-site">
    <Analytics />
    <header className="orbit-header">
      <div className="orbit-utility"><div className="container"><a href="/">{t.back}</a><span>{t.signature}</span></div></div>
      <div className="container orbit-nav">
        <a className="orbit-brand" href="#orbit-hero" aria-label="Orbit, inicio"><img src="/orbit-fox-hd.webp" alt=""/><span><strong>ORBIT</strong><small>{t.signature}</small></span></a>
        <nav aria-label={locale === "es" ? "Navegación Orbit" : "Orbit navigation"}>{t.nav.map((label, index) => <button key={label} onClick={() => scroll(ids[index])}>{label}</button>)}</nav>
        <div className="orbit-nav-actions">
          <button className="orbit-pref" onClick={() => setLocale(locale === "es" ? "en" : "es")} aria-label={t.language}><Languages size={18}/><span>{locale.toUpperCase()}</span></button>
          <button className="orbit-pref icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")} aria-label={`${t.theme}: ${theme === "light" ? t.dark : t.light}`}>{theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}</button>
          <a className="orbit-button compact" href={WA}>{locale === "es" ? "Solicitar demo" : "Request demo"}<ArrowRight size={17}/></a>
          <button className="orbit-menu" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
        </div>
      </div>
      {menu && <div className="orbit-mobile-nav">{t.nav.map((label, index) => <button key={label} onClick={() => { scroll(ids[index]); setMenu(false); }}>{label}</button>)}</div>}
    </header>

    <main>
      <section id="orbit-hero" className="orbit-hero">
        <div className="container orbit-hero-grid">
          <div className="orbit-hero-copy"><span className="orbit-eyebrow">{t.hero.eyebrow}</span><h1>{t.hero.title}</h1><p>{t.hero.copy}</p><div className="orbit-actions"><a className="orbit-button" href={WA}>{t.hero.primary}<ArrowRight size={18}/></a><a className="orbit-button secondary" href="mailto:contacto@somacoretech.com"><Mail size={18}/>{t.hero.secondary}</a></div><button className="orbit-text-action" onClick={() => scroll("demo")}>{t.hero.demo}<ArrowDown size={17}/></button></div>
          <div className="orbit-hero-visual" aria-label={locale === "es" ? "Vista de Orbit" : "Orbit preview"}>
            <div className="orbit-halo"/><img className="orbit-fox" src="/orbit-fox-hd.webp" alt={locale === "es" ? "Zorro de papel, símbolo de Orbit" : "Paper fox, Orbit symbol"} width="1200" height="1287" fetchPriority="high"/>
            <div className="orbit-ui-card main"><span>ORBIT / CONTROL</span><strong>96.4%</strong><small>SLA {locale === "es" ? "cumplido" : "met"}</small><div className="spark"><i/><i/><i/><i/><i/></div></div>
            <div className="orbit-ui-card alert"><b>INC-1042</b><span>{locale === "es" ? "En atención" : "In progress"}</span><em>01:42</em></div>
            <div className="orbit-ui-card asset"><span>ACT-0732</span><b>{locale === "es" ? "Mantenimiento" : "Maintenance"}</b></div>
          </div>
        </div>
        <div className="container orbit-proof">{t.proof.map((item, i) => <div key={item}><span>0{i+1}</span><strong>{item}</strong></div>)}</div>
      </section>

      <section id="modulos" className="orbit-section orbit-modules"><div className="container"><SectionHead {...t.sections.modules}/><div className="orbit-module-grid">{t.modules.map(([name, copy], i) => <article key={name} className={i === 0 ? "wide" : ""}><span>0{i+1}</span><h3>{name}</h3><p>{copy}</p><div className="module-line"/></article>)}</div></div></section>

      <section id="flujo" className="orbit-section orbit-flow"><div className="container"><SectionHead {...t.sections.flow}/><div className="orbit-flow-grid">{t.flow.map(([name, copy], i) => <article key={name}><b>{String(i+1).padStart(2,"0")}</b><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>

      <section id="demo" className="orbit-section orbit-demo-section"><div className="container"><SectionHead {...t.sections.demo}/>{demoReady ? <Suspense fallback={<div className="orbit-demo-placeholder" aria-busy="true">ORBIT</div>}><OrbitDemo locale={locale}/></Suspense> : <div className="orbit-demo-placeholder" aria-hidden="true"><img src="/orbit-fox-hd.webp" alt=""/><span>ORBIT</span></div>}</div></section>

      <section id="gobierno" className="orbit-section orbit-governance"><div className="container orbit-two-col"><SectionHead {...t.sections.governance}/><div className="orbit-governance-list">{t.governance.map(([name, copy], i) => <article key={name}><span>{String(i+1).padStart(2,"0")}</span><div><h3>{name}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section id="integraciones" className="orbit-section orbit-integrations"><div className="container"><SectionHead {...t.sections.integrations}/><div className="orbit-integration-grid">{t.integrations.map(([name, copy]) => <article key={name}><div className="orbit-node"/><h3>{name}</h3><p>{copy}</p></article>)}</div></div></section>

      <section id="preguntas" className="orbit-section orbit-faq"><div className="container orbit-two-col"><SectionHead {...t.sections.faq}/><div>{t.faq.map(([q,a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section id="contacto" className="orbit-cta"><div className="container"><img src="/orbit-fox-hd.webp" alt=""/><div><span>{t.signature}</span><h2>{t.cta.title}</h2><p>{t.cta.copy}</p></div><div className="orbit-cta-actions"><a className="orbit-button light" href={WA}>{t.cta.whatsapp}<ArrowRight size={18}/></a><a href="mailto:contacto@somacoretech.com">{t.cta.email}</a></div></div></section>
    </main>

    <footer>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/logo-dark.svg" alt="SOMA" width="170" height="65" loading="lazy" decoding="async"/>
          <p>{locale === "es" ? "Tecnología, personas y negocio para un futuro con más posibilidades." : "Technology, people and business for a future with more possibilities."}</p>
        </div>
        <OrbitFoot title={locale === "es" ? "Qué hacemos" : "What we do"} links={locale === "es" ? ["Estrategia y arquitectura", "Software y productos digitales", "Automatización e IA", "Soporte y evolución"] : ["Strategy and architecture", "Software and digital products", "Automation and AI", "Support and evolution"]} href="/#capacidades"/>
        <OrbitFoot title={locale === "es" ? "Soluciones" : "Solutions"} links={locale === "es" ? ["Retail y comercio", "Servicios profesionales", "Salud y atención", "Operaciones internas"] : ["Retail and commerce", "Professional services", "Health and care", "Internal operations"]} href="/#sectores"/>
        <div className="foot contact-foot">
          <h3>{locale === "es" ? "Contacto y redes" : "Contact and social"}</h3>
          <a className="email-link" href="mailto:contacto@somacoretech.com"><Mail size={15}/>contacto@somacoretech.com</a>
          <div className="social-links">
            <a href="https://www.instagram.com/somacoretech/" target="_blank" rel="noreferrer"><OrbitSocialIcon kind="instagram"/>Instagram</a>
            <a href="https://www.linkedin.com/company/soma-core" target="_blank" rel="noreferrer"><Linkedin size={15}/>LinkedIn</a>
            <a href="https://www.tiktok.com/@somacoretech" target="_blank" rel="noreferrer"><OrbitSocialIcon kind="tiktok"/>TikTok</a>
            <a href="https://x.com/SomaCoreTech" target="_blank" rel="noreferrer"><OrbitSocialIcon kind="x"/>X</a>
          </div>
        </div>
      </div>
      <div className="container legal">
        <span>SOMA · Bucaramanga, Colombia · NIT 902080602-8</span>
        <span><a href={locale === "en" ? "/privacy-en.html?v=20260920-4" : "/privacy.html?v=20260920-4"}>{locale === "es" ? "Privacidad" : "Privacy"}</a> · <a href={locale === "en" ? "/terms-en.html?v=20260920-4" : "/terms.html?v=20260920-4"}>{locale === "es" ? "Términos" : "Terms"}</a></span>
      </div>
    </footer>
    <CookieConsentBanner locale={locale}/>
  </div>;
}

function OrbitFoot({ title, links, href }: { title: string; links: string[]; href: string }) {
  return <div className="foot"><h3>{title}</h3>{links.map((link) => <a href={href} key={link}>{link}</a>)}</div>;
}

function OrbitSocialIcon({ kind }: { kind: "instagram" | "tiktok" | "x" }) {
  if (kind === "instagram") return <svg className="brand-icon" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>;
  if (kind === "tiktok") return <svg className="brand-icon" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 3c.4 2.4 1.8 3.9 4.5 4.2v3.2a9.3 9.3 0 0 1-4.4-1.3v6.4a6.5 6.5 0 1 1-5.7-6.4v3.3a3.2 3.2 0 1 0 2.4 3.1V3h3.2Z" fill="currentColor"/></svg>;
  return <svg className="brand-icon" width="15" height="15" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l12.2 16H20L7.8 4H4Zm1.9 1.5h1.2l11 13h-1.2l-11-13ZM18.2 4 13 10l1 1.3L20 4h-1.8ZM4 20h1.8l5.4-6.3-1-1.3L4 20Z" fill="currentColor"/></svg>;
}
