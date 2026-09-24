import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");
const page = read("src/pages/atlas-bi/AtlasBiPage.tsx");
const copy = read("src/pages/atlas-bi/atlasBiContent.ts");
const demo = read("src/pages/atlas-bi/demo/AtlasBiDemo.tsx");
const sitemap = read("public/sitemap.xml");
const vercel = read("vercel.json");

assert.match(app, /productos\\\/atlas/);
assert.match(home, /name === "Atlas"/);
assert.match(home, /images\/products\/atlas-hero-demo\.webp/);
assert.ok(fs.existsSync("public/atlas-owl-hd.webp"), "Atlas owl asset must exist");
assert.ok(fs.existsSync("public/images/products/atlas-hero-demo.webp"), "Atlas card asset must exist");
assert.match(sitemap, /productos\/atlas/);
assert.match(vercel, /productos\/atlas/);
for (const id of ["atlas-hero", "modulos", "flujo", "demo", "gobierno", "preguntas", "contacto"])
  assert.match(page, new RegExp(`id=\\"${id}\\"`));
assert.match(copy, /dashboards/i);
for (const forbidden of ["Más x Menos", "MasxMenos", "MXM", "mxm\.com\.co"])
  assert.doesNotMatch(`${page}\n${copy}\n${demo}`, new RegExp(forbidden, "i"));
for (const module of ["home", "dashboards", "requests", "users", "audit", "catalogs"])
  assert.match(demo, new RegExp(module, "i"));
assert.match(demo, /restringido|restricted/i);
assert.match(demo, /Solicitar acceso|Request access/);
assert.match(demo, /createAccessRequest/);
assert.match(demo, /No hay resultados|No results/);
assert.match(demo, /approveRequest/);
assert.match(demo, /rejectRequest/);
assert.match(demo, /items\.map\(item => item\.id === id/);
assert.match(demo, /Usuarios y roles/);
assert.match(demo, /Auditoría/);
assert.match(demo, /Catálogos/);
assert.match(demo, /atlas-bi-side \$\{mobileOpen \? "open"/);
assert.match(read("src/pages/atlas-bi/demo/atlasBiDemo.css"), /color-scheme:\s*dark/);

console.log("Atlas route and card checks passed");
