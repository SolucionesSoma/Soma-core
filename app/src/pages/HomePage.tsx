import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  Boxes,
  Car,
  Code2,
  Database,
  HardHat,
  Languages,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Scale,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import { Analytics } from "@vercel/analytics/react";
import CookieConsentBanner from "../components/CookieConsentBanner";
import { translations, type Locale } from "../i18n";
import {
  applyPreferences,
  getInitialLocale,
  getInitialTheme,
  type Theme,
} from "../preferences";
import "../index.css";

const WA = "https://wa.me/573185772152";
const productImages = [
  "/images/products/atlas.webp",
  "",
  "/images/products/sonora.webp",
  "/images/products/flow.webp",
  "/images/products/relay.webp",
];
const developmentIcons = [Car, Scale, HardHat];
const capabilityIcons = [Boxes, Code2, Bot, Database, ShieldCheck];
const sectorImages = [
  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85",
];
const sectionIds = [
  "capacidades",
  "sectores",
  "proyectos",
  "compania",
  "perspectivas",
];
const go = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const setMeta = (selector: string, value: string) =>
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", value);

function HomePage() {
  const [menu, setMenu] = useState(false),
    [tab, setTab] = useState<"suite" | "landing">("suite"),
    [locale, setLocale] = useState<Locale>(getInitialLocale),
    [theme, setTheme] = useState<Theme>(getInitialTheme);
  const t = translations[locale];
  useEffect(() => {
    applyPreferences(locale, theme);
    document.title = t.meta.title;
    setMeta('meta[name="description"]', t.meta.description);
    setMeta('meta[property="og:title"]', t.meta.title);
    setMeta('meta[property="og:description"]', t.meta.description);
    setMeta('meta[property="og:locale"]', locale === "es" ? "es_CO" : "en_US");
    setMeta('meta[name="twitter:title"]', t.meta.title);
    setMeta('meta[name="twitter:description"]', t.meta.description);
    setMeta(
      'meta[name="theme-color"]',
      theme === "dark" ? "#041f35" : "#ffffff",
    );
    const url = new URL(location.href);
    if (locale === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    history.replaceState({}, "", url);
    const canonical =
      locale === "en"
        ? "https://somacoretech.com/?lang=en"
        : "https://somacoretech.com/";
    document
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", canonical);
    setMeta('meta[property="og:url"]', canonical);
  }, [locale, theme, t]);
  const toggleTheme = () =>
    setTheme((value) => (value === "light" ? "dark" : "light"));
  const toggleLocale = () =>
    setLocale((value) => (value === "es" ? "en" : "es"));
  return (
    <div className="site">
      <Analytics />
      <header>
        <div className="utility">
          <div className="container">
            <span>{t.utility[0]}</span>
            <span className="utility-links">
              <a href="mailto:contacto@somacoretech.com">{t.utility[1]}</a>
              <span aria-hidden="true">|</span>
              <button type="button" onClick={() => go("contacto")}>
                {t.utility[2]}
              </button>
            </span>
          </div>
        </div>
        <div className="container nav">
          <button
            type="button"
            className="logo"
            onClick={() => go("inicio")}
            aria-label="SOMA"
          >
            <img
              src={theme === "light" ? "/logo-light.svg" : "/logo-dark.svg"}
              alt="SOMA"
              width="166"
              height="55"
              decoding="async"
            />
          </button>
          <nav aria-label={locale === "es" ? "Principal" : "Main"}>
            {t.nav.map((label, i) => (
              <button
                type="button"
                key={sectionIds[i]}
                onClick={() => go(sectionIds[i])}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              className="pref-control"
              onClick={toggleLocale}
              aria-label={`${t.language}: ${locale === "es" ? "English" : "Español"}`}
              title={t.language}
            >
              <Languages size={18} />
              <span>{locale.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="pref-control icon-only"
              onClick={toggleTheme}
              aria-label={`${t.theme}: ${theme === "light" ? t.dark : t.light}`}
              title={theme === "light" ? t.dark : t.light}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a className="btn primary nav-cta" href={WA}>
              {t.talk}
              <ArrowRight size={17} />
            </a>
            <button
              type="button"
              className="hamb"
              aria-label={t.menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="mobile-menu">
            {t.nav.map((label, i) => (
              <button
                type="button"
                key={sectionIds[i]}
                onClick={() => {
                  go(sectionIds[i]);
                  setMenu(false);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>
      <main>
        <section id="inicio" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{t.hero.label}</span>
              <h1>{t.hero.title}</h1>
              <p>{t.hero.copy}</p>
              <div className="actions">
                <a className="btn primary" href={WA}>
                  {t.hero.primary}
                  <ArrowRight size={18} />
                </a>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => go("proyectos")}
                >
                  {t.hero.secondary}
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            <div className="hero-mark">
              <div className="mark-orbit" />
              <img
                src="/soma-bird-hd.webp"
                alt={t.hero.alt}
                width="1453"
                height="1083"
                decoding="async"
                fetchPriority="high"
              />
              <span>{t.hero.mark}</span>
            </div>
          </div>
        </section>
        <section className="manifesto">
          <div className="container">
            <h2>{t.manifesto.title}</h2>
            <p>{t.manifesto.copy}</p>
          </div>
        </section>
        <section id="proyectos" className="section projects">
          <div className="container">
            <Heading
              n="01"
              label={t.projects.label}
              title={t.projects.title}
              copy={t.projects.copy}
            />
            <div
              className="suite-tabs"
              role="tablist"
              aria-label={t.projects.label}
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "suite"}
                className={tab === "suite" ? "active" : ""}
                onClick={() => setTab("suite")}
              >
                {t.projects.suite}
                <span>05</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "landing"}
                className={tab === "landing" ? "active" : ""}
                onClick={() => setTab("landing")}
              >
                {t.projects.landings}
                <span>04</span>
              </button>
            </div>
            {tab === "suite" ? (
              <div className="suite-grid">
                {t.products.map(([name, desc, meta], i) => (
                  <article
                    className={`suite-product ${i === 0 ? "featured" : ""}`}
                    key={name}
                  >
                    {name === "Orbit" ? (
                      <div className="orbit-product-art" role="img" aria-label={locale === "es" ? "Zorro geométrico, símbolo de Orbit" : "Geometric fox, Orbit symbol"}>
                        <span>ORBIT</span>
                        <img src="/orbit-fox-hd.webp" alt="" width="1200" height="1287" loading="lazy" decoding="async" />
                        <small>{locale === "es" ? "Una solución de SOMA" : "A SOMA solution"}</small>
                      </div>
                    ) : (
                      <img
                        src={productImages[i]}
                        alt={`${name}: ${desc}`}
                        width="1586"
                        height="992"
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    )}
                    <div>
                      <div className="project-top">
                        <h3>{name}</h3>
                        <Tag text={t.projects.functional} />
                      </div>
                      <p>{desc}</p>
                      <small>{meta}</small>
                      {name === "Orbit" ? (
                        <a className="inline-link" href={`/productos/orbit${locale === "en" ? "?lang=en" : ""}`}>
                          {locale === "es" ? "Conocer Orbit" : "Explore Orbit"}
                          <ArrowRight size={16} />
                        </a>
                      ) : (
                        <ProjectLink text={t.projects.more} subject={name} locale={locale} />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <article className="landing-card">
                <div className="landing-mosaic">
                  {[1, 2, 3, 4].map((n) => (
                    <img
                      key={n}
                      src={`/images/portfolio/portfolio${n}.webp`}
                      alt={`${t.projects.landings} ${n}`}
                      width="1340"
                      height="620"
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
                <div>
                  <Tag text={t.projects.web} />
                  <h3>{t.projects.landingTitle}</h3>
                  <p>{t.projects.landingCopy}</p>
                  <ProjectLink
                    text={t.projects.more}
                    subject={t.projects.landings}
                    locale={locale}
                  />
                </div>
              </article>
            )}
            <div className="development-strip">
              <div>
                <strong>{t.projects.development}</strong>
                <span>{t.projects.next}</span>
              </div>
              {t.development.map(([name, desc], i) => {
                const Icon = developmentIcons[i];
                return (
                  <article key={name}>
                    <Icon />
                    <div>
                      <strong>{name}</strong>
                      <span>{desc}</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section id="capacidades" className="section capabilities">
          <div className="container capabilities-grid">
            <Heading
              n="02"
              label={t.capabilities.label}
              title={t.capabilities.title}
              copy={t.capabilities.copy}
            />
            <div className="cap-list">
              {t.capabilities.items.map(([title, desc], i) => {
                const Icon = capabilityIcons[i];
                return (
                  <article key={title}>
                    <span>0{i + 1}</span>
                    <Icon />
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section id="sectores" className="section sectors">
          <div className="container">
            <Heading
              n="03"
              label={t.sectors.label}
              title={t.sectors.title}
              copy={t.sectors.copy}
            />
            <div className="sector-grid">
              {t.sectors.items.map(([title, desc], i) => (
                <article key={title}>
                  <img
                    src={sectorImages[i]}
                    alt={title}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="compania" className="section process">
          <div className="container">
            <Heading
              n="04"
              label={t.process.label}
              title={t.process.title}
              copy={t.process.copy}
            />
            <div className="steps">
              {t.process.steps.map((title, i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{t.process.stepCopy[i]}</p>
                </article>
              ))}
            </div>
            <p className="statement">{t.process.statement}</p>
          </div>
        </section>
        <section id="perspectivas" className="section insights">
          <div className="container">
            <Heading
              n="05"
              label={t.insights.label}
              title={t.insights.title}
              copy={t.insights.copy}
            />
            <div className="insight-grid">
              {t.insights.items.map((title, i) => (
                <article key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{t.insights.itemCopy}</p>
                  <ProjectLink
                    text={t.projects.more}
                    subject={title}
                    locale={locale}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="contacto" className="cta">
          <div className="container">
            <div>
              <h2>{t.cta.title}</h2>
              <p>{t.cta.copy}</p>
            </div>
            <a className="btn primary" href={WA}>
              {t.cta.button}
              <ArrowRight />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="/logo-dark.svg"
              alt="SOMA"
              width="170"
              height="65"
              loading="lazy"
              decoding="async"
            />
            <p>{t.footer.tagline}</p>
          </div>
          <Foot
            title={t.footer.what}
            links={t.capabilities.items.slice(0, 4).map((item) => item[0])}
            href="#capacidades"
          />
          <Foot
            title={t.footer.solutions}
            links={t.sectors.items.map((item) => item[0])}
            href="#sectores"
          />
          <div className="foot contact-foot">
            <h3>{t.footer.contact}</h3>
            <a className="email-link" href="mailto:contacto@somacoretech.com">
              <Mail size={15} />
              contacto@somacoretech.com
            </a>
            <div className="social-links">
              <a
                href="https://www.instagram.com/somacoretech/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/company/soma-core"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="https://www.tiktok.com/@somacoretech"
                target="_blank"
                rel="noreferrer"
              >
                <TikTokIcon />
                TikTok
              </a>
              <a
                href="https://x.com/SomaCoreTech"
                target="_blank"
                rel="noreferrer"
              >
                <XBrandIcon />X
              </a>
            </div>
          </div>
        </div>
        <div className="container legal">
          <span>SOMA · Bucaramanga, Colombia · NIT 902080602-8</span>
          <span>
            <a href={locale === "en" ? "/privacy-en.html?v=20260920-4" : "/privacy.html?v=20260920-4"}>{t.footer.privacy}</a> ·{" "}
            <a href={locale === "en" ? "/terms-en.html?v=20260920-4" : "/terms.html?v=20260920-4"}>{t.footer.terms}</a>
          </span>
        </div>
      </footer>
      <CookieConsentBanner locale={locale} />
    </div>
  );
}
function Heading({
  n,
  label,
  title,
  copy,
}: {
  n: string;
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="heading">
      <div>
        <span>
          {n} / {label}
        </span>
        <h2>{title}</h2>
      </div>
      <p>{copy}</p>
    </div>
  );
}
function Tag({ text }: { text: string }) {
  return <span className="tag">{text}</span>;
}
function ProjectLink({
  text,
  subject,
  locale,
}: {
  text: string;
  subject: string;
  locale: Locale;
}) {
  const message =
    locale === "es"
      ? `Hola, quiero conocer más sobre ${subject}.`
      : `Hello, I would like to learn more about ${subject}.`;
  return (
    <a
      className="inline-link"
      href={`${WA}?text=${encodeURIComponent(message)}`}
    >
      {text}
      <ArrowRight size={16} />
    </a>
  );
}
function Foot({
  title,
  links,
  href,
}: {
  title: string;
  links: readonly string[];
  href: string;
}) {
  return (
    <div className="foot">
      <h3>{title}</h3>
      {links.map((link) => (
        <a href={href} key={link}>
          {link}
        </a>
      ))}
    </div>
  );
}
function InstagramIcon() {
  return (
    <svg
      className="brand-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg
      className="brand-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M15.5 3c.4 2.4 1.8 3.9 4.5 4.2v3.2a9.3 9.3 0 0 1-4.4-1.3v6.4a6.5 6.5 0 1 1-5.7-6.4v3.3a3.2 3.2 0 1 0 2.4 3.1V3h3.2Z"
        fill="currentColor"
      />
    </svg>
  );
}
function XBrandIcon() {
  return (
    <svg
      className="brand-icon"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M4 4l12.2 16H20L7.8 4H4Zm1.9 1.5h1.2l11 13h-1.2l-11-13ZM18.2 4 13 10l1 1.3L20 4h-1.8ZM4 20h1.8l5.4-6.3-1-1.3L4 20Z"
        fill="currentColor"
      />
    </svg>
  );
}
export default HomePage;
