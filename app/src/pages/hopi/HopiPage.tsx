import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Languages,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import CookieConsentBanner from "../../components/CookieConsentBanner";
import {
  applyPreferences,
  getInitialLocale,
  getInitialTheme,
  type Theme,
} from "../../preferences";
import type { Locale } from "../../i18n";
import { hopiContent } from "./hopiContent";
import "../../index.css";
import "./hopi.css";

const HopiDemo = lazy(() => import("./demo/HopiDemo"));
const ids = ["modulos", "recorrido", "demo", "marca", "preguntas"];
const baseURL = "https://somacoretech.com/productos/hopi";
const appURL = "https://hopi.somacoretech.com";
function SectionHead({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="hopi-section-head">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}
export default function HopiPage() {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menu, setMenu] = useState(false);
  const [demoReady, setDemoReady] = useState(false);
  const t = hopiContent[locale];
  const contact = `https://wa.me/573184153180?text=${encodeURIComponent(locale === "es" ? "Hola, quiero conocer Hopi para mi restaurante." : "Hello, I would like to learn about Hopi for my restaurant.")}`;
  useEffect(() => {
    applyPreferences(locale, theme);
    document.title = t.meta.title;
    const meta = (selector: string, value: string) =>
      document.querySelector(selector)?.setAttribute("content", value);
    const canonical = baseURL + (locale === "en" ? "?lang=en" : "");
    meta('meta[name="description"]', t.meta.description);
    for (const key of ["og:title", "twitter:title"])
      meta(`meta[property="${key}"],meta[name="${key}"]`, t.meta.title);
    for (const key of ["og:description", "twitter:description"])
      meta(`meta[property="${key}"],meta[name="${key}"]`, t.meta.description);
    for (const key of ["og:image", "og:image:secure_url", "twitter:image"])
      meta(
        `meta[property="${key}"],meta[name="${key}"]`,
        "https://somacoretech.com/images/products/hopi-hero-demo.webp",
      );
    meta('meta[property="og:url"]', canonical);
    meta('meta[property="og:locale"]', locale === "es" ? "es_CO" : "en_US");
    meta('meta[name="theme-color"]', theme === "dark" ? "#041f35" : "#ffffff");
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", canonical);
    for (const [lang, suffix] of [
      ["es-CO", ""],
      ["en", "?lang=en"],
      ["x-default", ""],
    ])
      document
        .querySelector(`link[hreflang="${lang}"]`)
        ?.setAttribute("href", baseURL + suffix);
    const url = new URL(location.href);
    if (locale === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState({}, "", url);
    const schema =
      document.querySelector<HTMLScriptElement>("#hopi-schema") ??
      document.createElement("script");
    schema.id = "hopi-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Hopi",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: t.meta.description,
      url: baseURL,
      creator: { "@type": "Organization", name: "SOMA Core" },
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [locale, theme, t]);
  useEffect(() => {
    // The lazy route mounts after the browser's initial fragment navigation.
    document.getElementById(location.hash.slice(1))?.scrollIntoView();
    const node = document.getElementById("demo");
    if (!node || !("IntersectionObserver" in window)) {
      queueMicrotask(() => setDemoReady(true));
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDemoReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menu) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  return (
    <div className="hopi-site">
      <Analytics />
      <a className="hopi-skip" href="#hopi-main">
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <header className="hopi-header">
        <div className="hopi-utility">
          <div className="container">
            <a href={`/${locale === "en" ? "?lang=en" : ""}`}>{t.back}</a>
            <span>{t.signature}</span>
          </div>
        </div>
        <div className="container hopi-nav">
          <a className="hopi-brand" href="#hopi-hero" aria-label="Hopi">
            <img src="/hopi-rabbit.webp" width="46" height="46" alt="" />
            <span>
              <strong>HOPI</strong>
              <small>{t.signature}</small>
            </span>
          </a>
          <nav
            aria-label={locale === "es" ? "Navegación Hopi" : "Hopi navigation"}
          >
            {t.nav.map((label, i) => (
              <a key={ids[i]} href={`#${ids[i]}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hopi-nav-actions">
            <button
              className="hopi-pref"
              onClick={() => setLocale(locale === "es" ? "en" : "es")}
              aria-label={t.language}
            >
              <Languages size={18} />
              <span>{locale.toUpperCase()}</span>
            </button>
            <button
              className="hopi-pref icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              aria-label={t.theme}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a className="hopi-button compact" href={appURL}>
              {t.hero.app}
              <ArrowRight size={17} />
            </a>
            <button
              className="hopi-menu"
              onClick={() => setMenu(!menu)}
              aria-label={menu ? t.close : t.menu}
              aria-expanded={menu}
              aria-controls="hopi-mobile-nav"
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav
            id="hopi-mobile-nav"
            className="hopi-mobile-nav"
            aria-label={t.menu}
          >
            {t.nav.map((label, i) => (
              <a
                key={ids[i]}
                href={`#${ids[i]}`}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
            <a href={appURL}>
              {t.hero.app}
              <ArrowRight size={16} />
            </a>
            <a href={`/${locale === "en" ? "?lang=en" : ""}`}>{t.back}</a>
          </nav>
        )}
      </header>
      <main id="hopi-main">
        <section id="hopi-hero" className="hopi-hero">
          <div className="container hopi-hero-grid">
            <div className="hopi-hero-copy">
              <span className="hopi-eyebrow">{t.hero.eyebrow}</span>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.copy}</p>
              <div className="hopi-actions">
                <a className="hopi-button" href="#demo">
                  {t.hero.primary}
                  <ArrowDown size={18} />
                </a>
                <a className="hopi-button secondary" href={contact}>
                  {t.hero.secondary}
                  <ArrowRight size={18} />
                </a>
              </div>
              <a className="hopi-text-action" href={appURL}>
                {t.hero.app}
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="hopi-hero-visual">
              <div className="hopi-halo" />
              <img
                className="hopi-owl"
                src="/hopi-rabbit-hd.webp"
                alt={t.hero.alt}
                width="768"
                height="768"
                fetchPriority="high"
              />
              <div className="hopi-ui-card main">
                <span>HOPI / {locale === "es" ? "COCINA" : "KITCHEN"}</span>
                <strong>{t.order}</strong>
                <small>{t.preparing}</small>
                <div className="hopi-spark">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className="hopi-ui-card alert">
                <b>H-104</b>
                <span>{t.ready}</span>
                <em>12:40</em>
              </div>
              <div className="hopi-ui-card asset">
                <span>{t.whiteLabel}</span>
                <b>
                  {locale === "es"
                    ? "Su marca, conectada"
                    : "Your brand, connected"}
                </b>
              </div>
              <small className="hopi-sample">{t.sample}</small>
            </div>
          </div>
          <div className="container hopi-proof">
            {t.proof.map((item, i) => (
              <div key={item}>
                <span>0{i + 1}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </section>
        <section id="modulos" className="hopi-section hopi-modules">
          <div className="container">
            <SectionHead {...t.sections.modules} />
            <div className="hopi-module-grid">
              {t.modules.map(([name, copy], i) => (
                <article key={name} className={i === 0 ? "wide" : ""}>
                  <span>0{i + 1}</span>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                  <div className="hopi-module-line" />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="recorrido" className="hopi-section hopi-flow">
          <div className="container">
            <SectionHead {...t.sections.flow} />
            <div className="hopi-flow-grid">
              {t.flow.map(([name, copy], i) => (
                <article key={name}>
                  <b>0{i + 1}</b>
                  <h3>{name}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="demo" className="hopi-section hopi-demo-section">
          <div className="container">
            <SectionHead {...t.sections.demo} />
            {demoReady ? (
              <Suspense
                fallback={
                  <div className="hopi-demo-placeholder" aria-busy="true">
                    HOPI
                  </div>
                }
              >
                <HopiDemo locale={locale} />
              </Suspense>
            ) : (
              <div className="hopi-demo-placeholder">
                <img src="/hopi-rabbit.webp" width="192" height="192" alt="" />
                <span>HOPI</span>
              </div>
            )}
          </div>
        </section>
        <section id="marca" className="hopi-section hopi-governance">
          <div className="container hopi-two-col">
            <SectionHead {...t.sections.brand} />
            <div className="hopi-governance-list">
              {t.brand.map(([name, copy], i) => (
                <article key={name}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="preguntas" className="hopi-section hopi-faq">
          <div className="container hopi-two-col">
            <SectionHead {...t.sections.faq} />
            <div>
              {t.faq.map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contacto" className="hopi-cta">
          <div className="container">
            <img
              src="/hopi-rabbit.webp"
              width="192"
              height="192"
              alt=""
              loading="lazy"
            />
            <div>
              <span>{t.signature}</span>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.copy}</p>
            </div>
            <div className="hopi-cta-actions">
              <a className="hopi-button light" href={contact}>
                {t.cta.action}
                <ArrowRight size={18} />
              </a>
              <a href="mailto:contacto@somacoretech.com">
                contacto@somacoretech.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="/">
              <img
                src="/logo-dark.svg"
                alt="SOMA Core"
                width="170"
                height="65"
              />
            </a>
            <p>{t.footer.copy}</p>
          </div>
          <div className="foot">
            <h3>{t.footer.product}</h3>
            <a href="#modulos">{t.nav[0]}</a>
            <a href="#demo">{t.nav[2]}</a>
            <a href={appURL}>{t.hero.app}</a>
          </div>
          <div className="foot">
            <h3>{t.footer.company}</h3>
            <a href={`/${locale === "en" ? "?lang=en" : ""}`}>{t.back}</a>
            <a href="#marca">{t.nav[3]}</a>
          </div>
          <div className="foot contact-foot">
            <h3>{t.footer.contact}</h3>
            <a className="email-link" href="mailto:contacto@somacoretech.com">
              <Mail size={15} />
              contacto@somacoretech.com
            </a>
          </div>
        </div>
        <div className="container legal">
          <span>SOMA · Bucaramanga, Colombia · NIT 902080602-8</span>
          <span>
            <a href={locale === "en" ? "/privacy-en.html" : "/privacy.html"}>
              {t.footer.privacy}
            </a>{" "}
            ·{" "}
            <a href={locale === "en" ? "/terms-en.html" : "/terms.html"}>
              {t.footer.terms}
            </a>
          </span>
        </div>
      </footer>
      <CookieConsentBanner locale={locale} />
    </div>
  );
}
