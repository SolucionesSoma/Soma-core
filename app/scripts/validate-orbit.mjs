import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");
const page = read("src/pages/orbit/OrbitPage.tsx");
const content = read("src/pages/orbit/orbitContent.ts");
const data = read("src/pages/orbit/orbitDemoData.ts");
const fox = read("src/pages/orbit/OrbitFoxMark.tsx");
const demo = read("src/pages/orbit/demo/OrbitDemo.tsx");
const styles = read("src/pages/orbit/orbit.css") + read("src/pages/orbit/demo/orbitDemo.css");
const sitemap = read("public/sitemap.xml");
const vercel = read("vercel.json");
const vite = read("vite.config.ts");

assert.match(app, /location\.pathname/);
assert.match(app, /productos\\\/orbit/);
assert.match(app, /OrbitPage/);
assert.match(home, /function HomePage|const HomePage/);
for (const id of ["orbit-hero", "modulos", "flujo", "demo", "gobierno", "integraciones", "preguntas", "contacto"])
  assert.match(page, new RegExp(`id=\\"${id}\\"`));
for (const text of ["La operación completa, bajo control", "Operations under control", "Una solución de SOMA", "A SOMA solution"])
  assert.match(content, new RegExp(text));
for (const name of ["dashboard", "incidents", "pqrsf", "maintenance", "assets"])
  assert.match(data + demo, new RegExp(name, "i"));
assert.match(fox, /<svg/);
assert.match(page, /lazy\(/);
assert.match(demo, /demoNotice/);
assert.match(demo, /aria-live/);
assert.match(page, /mailto:contacto@somacoretech\.com/);
assert.match(page, /wa\.me\/573185772152/);
assert.match(page, /SoftwareApplication/);
assert.match(sitemap, /productos\/orbit/);
assert.match(vercel, /productos\/orbit/);
assert.match(vercel, /index\.html/);
assert.match(vite, /base:\s*["']\/["']/);
assert.doesNotMatch(home, /images\/products\/orbit\.webp/);
assert.match(home, /orbit-fox-hd\.webp/);
assert.match(page, /orbit-fox-hd\.webp/);
for (const structure of ["demo-sidebar-logo", "demo-app-header", "demo-breadcrumb", "demo-filter-bar", "demo-support-title"])
  assert.match(demo, new RegExp(structure));
assert.match(home, /href=\{`\/productos\/orbit/);
assert.match(styles, /prefers-reduced-motion/);
assert.match(styles, /min-height:\s*44px/);
for (const forbidden of ["Más x Menos", "Mas x Menos", "MXM", "mxm.com.co", "SIESA"])
  assert.doesNotMatch(`${page}\n${content}\n${data}\n${demo}`, new RegExp(forbidden, "i"));

console.log("Orbit acceptance checks passed");
