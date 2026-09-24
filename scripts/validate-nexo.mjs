import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");
const page = read("src/pages/atlas/AtlasPage.tsx");
const copy = read("src/pages/atlas/atlasContent.ts");
const data = read("src/pages/atlas/atlasDemoData.ts");
const demo = read("src/pages/atlas/demo/AtlasDemo.tsx");
const styles = read("src/pages/atlas/atlas.css") + read("src/pages/atlas/demo/atlasDemo.css");
const sitemap = read("public/sitemap.xml");
const vercel = read("vercel.json");

assert.match(app, /productos\\\/nexo/);
assert.match(home, /href=\{`\/productos\/nexo/);
for (const id of ["atlas-hero", "modulos", "flujo", "demo", "gobierno", "preguntas", "contacto"])
  assert.match(page, new RegExp(`id=\\"${id}\\"`));
for (const module of ["dashboard", "invoices", "payments", "returns", "certificates", "profile", "compliance"])
  assert.match(data + demo, new RegExp(module, "i"));
assert.match(page, /nexo-bee-hd\.webp/);
assert.match(sitemap, /productos\/nexo/);
assert.match(vercel, /productos\/nexo/);
assert.match(styles, /safe-area-inset-bottom/);
assert.match(styles, /color-scheme:dark/);
for (const forbidden of ["Más x Menos", "MasxMenos", "MXM", "mxm\.com\.co"])
  assert.doesNotMatch(`${page}\n${copy}\n${data}\n${demo}`, new RegExp(forbidden, "i"));

console.log("Nexo acceptance checks passed");
