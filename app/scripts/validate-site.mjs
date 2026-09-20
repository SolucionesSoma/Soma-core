import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const index = read("index.html");
const app = read("src/App.tsx");
const i18n = fs.existsSync("src/i18n.ts") ? read("src/i18n.ts") : "";
const css = read("src/index.css");
const cookie = read("src/components/CookieConsentBanner.tsx");

assert.match(index, /application\/ld\+json/, "JSON-LD missing");
assert.match(index, /og-soma\.jpg/, "social image missing");
assert.match(index, /site\.webmanifest/, "web manifest missing");
assert.doesNotMatch(
  index,
  /"founder"/i,
  "founder must not appear in organization schema",
);
assert.doesNotMatch(index, /somaacoretech/, "contact email contains typo");
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
console.log("Site acceptance checks passed");
