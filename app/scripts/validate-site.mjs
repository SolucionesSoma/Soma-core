import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const index = read("index.html");
const app = read("src/App.tsx");
const i18n = fs.existsSync("src/i18n.ts") ? read("src/i18n.ts") : "";
const css = read("src/index.css");
const cookie = read("src/components/CookieConsentBanner.tsx");
const privacy = read("public/privacy.html");
const terms = read("public/terms.html");
const cookiesPolicy = read("public/cookies.html");
const privacyEn = fs.existsSync("public/privacy-en.html") ? read("public/privacy-en.html") : "";
const termsEn = fs.existsSync("public/terms-en.html") ? read("public/terms-en.html") : "";
const cookiesEn = fs.existsSync("public/cookies-en.html") ? read("public/cookies-en.html") : "";
const config = read("src/config.ts");
const legalCss = read("public/legal.css");
const legalJs = read("public/legal.js");
const sitemap = read("public/sitemap.xml");

assert.match(index, /application\/ld\+json/, "JSON-LD missing");
assert.match(index, /og-soma\.jpg/, "social image missing");
assert.match(index, /site\.webmanifest/, "web manifest missing");
assert.doesNotMatch(
  index,
  /"founder"/i,
  "founder must not appear in organization schema",
);
assert.doesNotMatch(index, /somaacoretech/, "contact email contains typo");
assert.doesNotMatch(config, /somaacoretech/, "legacy config contains email typo");
assert.match(i18n, /export type Locale/, "typed locale dictionary missing");
assert.match(i18n, /en:/, "English dictionary missing");
assert.match(app, /aria-label=.*theme|themeLabel/i, "theme control missing");
assert.match(
  app,
  /aria-label=.*language|languageLabel/i,
  "language control missing",
);
assert.match(app, /loading="lazy"/, "lazy-loaded media missing");
assert.match(css, /\[data-theme="dark"\]/, "dark theme tokens missing");
assert.match(cookie, /locale/, "cookie banner is not localized");
assert.match(
  app,
  /mailto:contacto@somacoretech\.com/,
  "company email missing from footer",
);
for (const page of ["privacy", "terms"])
  assert.match(
    app,
    new RegExp(`/${page}\\.html\\?v=20260920-4`),
    `versioned ${page} link missing from footer`,
  );
for (const page of ["cookies", "privacy"])
  assert.match(
    cookie,
    new RegExp(`/${page}\\.html\\?v=20260920-4`),
    `versioned ${page} link missing from cookie banner`,
  );
for (const network of [
  "instagram.com/somacoretech",
  "linkedin.com/company/soma-core",
  "tiktok.com/@somacoretech",
  "x.com/SomaCoreTech",
])
  assert.match(
    app,
    new RegExp(network.replaceAll(".", "\\.")),
    "corporate social link missing",
  );
assert.match(
  app,
  /link\[rel=.{0,3}canonical/,
  "runtime canonical localization missing",
);
assert.doesNotMatch(
  app,
  /className="search"/,
  "non-functional search control must not render",
);
for (const [name, document] of [
  ["privacy", privacy],
  ["terms", terms],
  ["cookies", cookiesPolicy],
]) {
  assert.match(document, /902080602-8/, `${name}: company NIT missing`);
  assert.match(
    document,
    /contacto@somacoretech\.com/,
    `${name}: correct company email missing`,
  );
  assert.doesNotMatch(
    document,
    /somaacoretech/,
    `${name}: contact email contains typo`,
  );
  assert.match(document, /class="utility"/, `${name}: SOMA utility bar missing`);
  assert.match(document, /logo-light\.svg/, `${name}: SOMA logo missing`);
  assert.match(document, /class="legal-hero"/, `${name}: SOMA legal hero missing`);
  assert.match(document, /class="language-icon"/, `${name}: main-site language icon missing`);
  assert.match(document, /class="hamb"/, `${name}: responsive menu control missing`);
  assert.match(document, /class="mobile-menu"/, `${name}: responsive navigation missing`);
  assert.match(document, /#perspectivas/, `${name}: insights navigation missing`);
  assert.match(document, /class="arrow-icon"/, `${name}: CTA arrow missing`);
  assert.match(
    document,
    /legal\.css\?v=20260920-5/,
    `${name}: versioned legal styles missing`,
  );
  assert.match(
    document,
    /legal\.js\?v=20260920-5/,
    `${name}: versioned theme behavior missing`,
  );
}
for (const [name, document, counterpart] of [
  ["privacy", privacy, "privacy-en.html"],
  ["terms", terms, "terms-en.html"],
  ["cookies", cookiesPolicy, "cookies-en.html"],
]) {
  assert.match(document, new RegExp(counterpart), `${name}: English selector missing`);
  assert.match(document, /hreflang="en"/, `${name}: English hreflang missing`);
  assert.match(document, /<span>ES<\/span>/, `${name}: active Spanish locale missing`);
}
for (const [name, document, counterpart] of [
  ["privacy-en", privacyEn, "privacy.html"],
  ["terms-en", termsEn, "terms.html"],
  ["cookies-en", cookiesEn, "cookies.html"],
]) {
  assert.match(document, /<html lang="en"/, `${name}: English lang missing`);
  assert.match(document, new RegExp(counterpart), `${name}: Spanish selector missing`);
  assert.match(document, /hreflang="es"/, `${name}: Spanish hreflang missing`);
  assert.match(document, /902080602-8/, `${name}: company NIT missing`);
  assert.match(document, /contacto@somacoretech\.com/, `${name}: company email missing`);
  assert.match(document, /<span>EN<\/span>/, `${name}: active English locale missing`);
  assert.match(document, /legal\.css\?v=20260920-5/, `${name}: versioned legal styles missing`);
  assert.match(document, /legal\.js\?v=20260920-5/, `${name}: versioned theme behavior missing`);
}
assert.match(legalJs, /Enable light mode/, "legal: English theme label missing");
assert.match(legalJs, /mobile-menu/, "legal: responsive menu behavior missing");
for (const page of ["privacy-en", "terms-en", "cookies-en"])
  assert.match(sitemap, new RegExp(`${page}\\.html`), `sitemap: ${page} missing`);
assert.match(legalCss, /family=Manrope/, "legal: SOMA font import missing");
assert.match(legalCss, /--deep:\s*#05263f/, "legal: SOMA deep token missing");
assert.match(legalCss, /--blue:\s*#0878c2/, "legal: SOMA blue token missing");
assert.match(legalCss, /\[data-theme="dark"\]/, "legal: dark theme missing");
for (const section of [
  "Responsable del tratamiento",
  "Datos que tratamos",
  "Finalidades del tratamiento",
  "Derechos de los titulares",
  "Consultas y reclamos",
  "Transferencia y transmisión",
  "Conservación",
  "Seguridad",
])
  assert.match(privacy, new RegExp(section, "i"), `privacy: ${section} missing`);
assert.match(privacy, /diez \(10\) días hábiles/i, "privacy: query term missing");
assert.match(privacy, /quince \(15\) días hábiles/i, "privacy: claim term missing");
for (const section of [
  "Alcance y aceptación",
  "Contratación de servicios",
  "Usos prohibidos",
  "Propiedad intelectual",
  "Servicios de terceros",
  "Limitación de responsabilidad",
  "Ley aplicable",
])
  assert.match(terms, new RegExp(section, "i"), `terms: ${section} missing`);
const capabilityStart = app.indexOf("t.capabilities.items.map");
const capabilityMarkup = app.slice(
  capabilityStart,
  app.indexOf("</section>", capabilityStart),
);
assert.doesNotMatch(
  capabilityMarkup,
  /<ArrowRight/,
  "capability rows must not show a false navigation affordance",
);
console.log("Site acceptance checks passed");
