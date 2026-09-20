# Orbit Landing + Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual Orbit product landing at `/productos/orbit` with its own paper-fox identity and an integrated, frontend-only interactive demo.

**Architecture:** Keep the existing Vite single-page deployment and select `HomePage` or `OrbitPage` from `window.location.pathname`, avoiding a new routing dependency. Extract reusable SOMA chrome into shared components, keep Orbit copy and demo data in typed modules, and lazy-load the isolated demo with `React.lazy` plus an error boundary.

**Tech Stack:** React 19, TypeScript 5.9, Vite 7, CSS, Lucide React, local immutable demo data, Node acceptance scripts.

**Spec:** `docs/superpowers/specs/2026-09-20-orbit-landing-design.md`

## Global Constraints

- Route: `/productos/orbit`; English remains the same route with `?lang=en`.
- Preserve global SOMA theme, language preferences, typography, navigation, footer, cookie consent, and legal links.
- Orbit uses SOMA blues with light cyan; no orange, purple, text gradients, or Más x Menos red.
- Remove every Más x Menos, MXM, real company, real employee, internal domain, and internal service reference.
- Demo stays frontend-only: no authentication, backend calls, persistence, or forms implying real storage.
- Persistently label demo `Entorno demostrativo · Datos ficticios` or its English equivalent.
- Support Dashboard, Incidents, PQRSF, Maintenance, and Assets in desktop and compact mobile layouts.
- Keep essential value proposition in indexable HTML outside the lazy demo.
- Meet WCAG AA contrast, visible focus, keyboard operation, 44 px touch targets, and `prefers-reduced-motion`.
- Use only audited capabilities and verified integrations.
- CTA targets: `https://wa.me/573185772152` and `mailto:contacto@somacoretech.com`.
- Use responsive WebP/AVIF imagery without perceptible quality loss.

## Review Focus

- Direct load and refresh of `/productos/orbit` must render Orbit rather than a blank page or home page.
- `?lang=en` and stored preferences must produce complete English UI without changing the route.
- Empty filtered results, reset, and detail closing must always return the demo to a usable state.
- Lazy-demo failure must preserve product meaning and working contact CTAs.
- Narrow screens and keyboard-only use must expose every module and action without clipped dialogs.

---

### Task 1: Acceptance Contract and Route Shell

**Files:**
- Create: `app/scripts/validate-orbit.mjs`
- Modify: `app/package.json`
- Modify: `app/src/main.tsx`
- Create: `app/src/pages/HomePage.tsx`
- Modify: `app/src/App.tsx`

**Interfaces:**
- Produces: `App(): JSX.Element` pathname dispatcher; `HomePage(): JSX.Element` current home composition.
- Consumes: existing `src/App.tsx` home implementation and `src/preferences.ts`.

- [ ] **Step 1: Write failing route contract**

Create `app/scripts/validate-orbit.mjs` with initial structural checks:

```js
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const app = read("src/App.tsx");
const home = read("src/pages/HomePage.tsx");

assert.match(app, /location\.pathname/);
assert.match(app, /productos\/?\/orbit/);
assert.match(app, /OrbitPage/);
assert.match(home, /function HomePage|const HomePage/);
console.log("Orbit acceptance checks passed");
```

Add package script:

```json
"validate:orbit": "node scripts/validate-orbit.mjs"
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL because `src/pages/HomePage.tsx` does not exist.

- [ ] **Step 3: Extract home and add pathname dispatch**

Move the current home composition into `HomePage`. Keep `App` limited to route selection and lazy Orbit import:

```tsx
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage";

const OrbitPage = lazy(() => import("./pages/orbit/OrbitPage"));

export default function App() {
  const isOrbit = /^\/productos\/orbit\/?$/.test(window.location.pathname);
  return isOrbit ? (
    <Suspense fallback={<main className="route-loading" aria-busy="true" />}>
      <OrbitPage />
    </Suspense>
  ) : <HomePage />;
}
```

Create a minimal temporary `OrbitPage` export only to satisfy TypeScript; Task 3 replaces it.

- [ ] **Step 4: Confirm route and existing site checks pass**

Run: `npm run validate:orbit && npm run validate:site && npm run build`

Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add app/package.json app/scripts/validate-orbit.mjs app/src/App.tsx app/src/pages/HomePage.tsx app/src/pages/orbit/OrbitPage.tsx
git commit -m "refactor: add product route shell"
```

### Task 2: Orbit Content, Demo Data, and Paper-Fox Mark

**Files:**
- Create: `app/src/pages/orbit/orbitContent.ts`
- Create: `app/src/pages/orbit/orbitDemoData.ts`
- Create: `app/src/pages/orbit/OrbitFoxMark.tsx`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: `orbitContent: Record<Locale, OrbitContent>`; `orbitDemoData: OrbitDemoData`; `OrbitFoxMark({ className?, title? })`.
- Consumes: `Locale` from `src/i18n.ts`.

- [ ] **Step 1: Extend failing content contract**

Add checks before creating modules:

```js
const content = read("src/pages/orbit/orbitContent.ts");
const data = read("src/pages/orbit/orbitDemoData.ts");
const fox = read("src/pages/orbit/OrbitFoxMark.tsx");

for (const term of ["La operación completa, bajo control", "Operations under control", "Una solución de SOMA", "A SOMA solution"])
  assert.match(content, new RegExp(term));
for (const moduleName of ["dashboard", "incidents", "pqrsf", "maintenance", "assets"])
  assert.match(data, new RegExp(moduleName, "i"));
assert.match(fox, /<svg/);
assert.match(fox, /currentColor/);
for (const forbidden of ["Más x Menos", "Mas x Menos", "MXM", "mxm.com.co"])
  assert.doesNotMatch(`${content}\n${data}\n${fox}`, new RegExp(forbidden, "i"));
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL because content, data, and mark modules do not exist.

- [ ] **Step 3: Implement typed copy and immutable fictitious dataset**

Define explicit types for hero, modules, flow, governance, integrations, FAQ, CTA, navigation, filters, empty states, detail labels, and accessible names. Export `Object.freeze` demo records using invented people, areas, sites, ticket IDs, assets, maintenance tasks, timestamps, SLA values, attachments, transfers, invoices, and signatures.

Implement the fox as a clean inline geometric SVG. Use `<title>` only when supplied and `aria-hidden` otherwise. Use blue/cyan facets through CSS classes and `currentColor`; do not embed raster artwork.

- [ ] **Step 4: Pass contract and TypeScript build**

Run: `npm run validate:orbit && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit/orbitContent.ts app/src/pages/orbit/orbitDemoData.ts app/src/pages/orbit/OrbitFoxMark.tsx app/scripts/validate-orbit.mjs
git commit -m "feat: define Orbit identity and content"
```

### Task 3: Commercial Landing and Shared SOMA Preferences

**Files:**
- Create: `app/src/pages/orbit/OrbitPage.tsx`
- Create: `app/src/pages/orbit/OrbitChrome.tsx`
- Create: `app/src/pages/orbit/orbit.css`
- Modify: `app/src/pages/HomePage.tsx`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: `OrbitPage(): JSX.Element`; `OrbitChromeProps { locale, theme, onLocaleChange, onThemeChange, children }`.
- Consumes: `orbitContent`, `OrbitFoxMark`, `getInitialLocale`, `getInitialTheme`, `applyPreferences`, `CookieConsentBanner`.

- [ ] **Step 1: Add failing landing checks**

```js
const page = read("src/pages/orbit/OrbitPage.tsx");
const css = read("src/pages/orbit/orbit.css");
for (const id of ["orbit-hero", "modulos", "flujo", "demo", "gobierno", "integraciones", "preguntas", "contacto"])
  assert.match(page, new RegExp(`id=[{\"']${id}`));
assert.match(page, /getInitialLocale/);
assert.match(page, /getInitialTheme/);
assert.match(page, /mailto:contacto@somacoretech\.com/);
assert.match(page, /wa\.me\/573185772152/);
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /min-height:\s*44px/);
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL on missing landing sections.

- [ ] **Step 3: Implement full static landing**

Build semantic sections from the approved spec. Use one editorial hero, UI composition, connected-capability band, module grid, numbered workflow, governance evidence, verified integration list, accessible native `<details>` FAQ, and final two-channel CTA. Reuse SOMA logos, controls, footer information, social links, NIT, cookie banner, and stored preferences. Add a contextual back link to `/` and suite link to `/#proyectos`.

Use a disciplined visual system: deep blue surfaces, cyan accents, thin rules, large whitespace, no pill overload, no generic stock software image, no decorative controls. Ensure `:focus-visible`, responsive type, mobile navigation, dark tokens, and reduced motion.

- [ ] **Step 4: Pass structural, existing, and build checks**

Run: `npm run validate:orbit && npm run validate:site && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit/OrbitPage.tsx app/src/pages/orbit/OrbitChrome.tsx app/src/pages/orbit/orbit.css app/src/pages/HomePage.tsx app/scripts/validate-orbit.mjs
git commit -m "feat: build Orbit product landing"
```

### Task 4: Demo Shell, Dashboard, Navigation, and Filtering

**Files:**
- Create: `app/src/pages/orbit/demo/OrbitDemo.tsx`
- Create: `app/src/pages/orbit/demo/OrbitDemoSidebar.tsx`
- Create: `app/src/pages/orbit/demo/OrbitDashboard.tsx`
- Create: `app/src/pages/orbit/demo/OrbitTickets.tsx`
- Create: `app/src/pages/orbit/demo/orbitDemo.css`
- Modify: `app/src/pages/orbit/OrbitPage.tsx`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: `DemoModule = "dashboard" | "incidents" | "pqrsf" | "maintenance" | "assets"`; `OrbitDemo({ locale })`; `OrbitTickets({ kind, filter, onSelect })`.
- Consumes: immutable records and localized labels from Tasks 2–3.

- [ ] **Step 1: Add failing demo-shell checks**

```js
const demo = read("src/pages/orbit/demo/OrbitDemo.tsx");
const sidebar = read("src/pages/orbit/demo/OrbitDemoSidebar.tsx");
const tickets = read("src/pages/orbit/demo/OrbitTickets.tsx");
assert.match(page, /lazy\(.*OrbitDemo/);
assert.match(demo, /Entorno demostrativo|Datos ficticios/);
assert.match(demo, /reset/i);
for (const name of ["dashboard", "incidents", "pqrsf", "maintenance", "assets"])
  assert.match(sidebar, new RegExp(name));
assert.match(tickets, /filter/i);
assert.match(tickets, /empty/i);
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL because demo components do not exist.

- [ ] **Step 3: Implement isolated lazy demo**

Use local state for module, filter, selected record, and one simulated ticket. Render navigation as keyboard-operable tabs with 44 px targets. Show dashboard KPIs and workload/SLA summaries. Render incidents and PQRSF from shared ticket view with preset filters, visible zero-results state, and clear-filter action. Keep persistent demo label and reset action.

Mount through `React.lazy`. Start loading near viewport with an `IntersectionObserver`; show a static product-shell placeholder before load.

- [ ] **Step 4: Pass demo contract and build**

Run: `npm run validate:orbit && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit/demo app/src/pages/orbit/OrbitPage.tsx app/scripts/validate-orbit.mjs
git commit -m "feat: add Orbit demo shell and service views"
```

### Task 5: Ticket Detail and Simulated Incident Creation

**Files:**
- Create: `app/src/pages/orbit/demo/OrbitTicketDetail.tsx`
- Create: `app/src/pages/orbit/demo/OrbitCreateIncident.tsx`
- Modify: `app/src/pages/orbit/demo/OrbitTickets.tsx`
- Modify: `app/src/pages/orbit/demo/OrbitDemo.tsx`
- Modify: `app/src/pages/orbit/demo/orbitDemo.css`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: `OrbitTicketDetail({ ticket, locale, onClose })`; `OrbitCreateIncident({ locale, onCreate, onCancel })`.
- Consumes: `DemoTicket` type and demo-local state.

- [ ] **Step 1: Add failing interaction checks**

```js
const detail = read("src/pages/orbit/demo/OrbitTicketDetail.tsx");
const create = read("src/pages/orbit/demo/OrbitCreateIncident.tsx");
for (const field of ["timeline", "SLA", "assignment", "attachments", "response"])
  assert.match(detail, new RegExp(field, "i"));
assert.match(detail, /Escape/);
assert.match(detail, /aria-modal/);
assert.match(create, /onCreate/);
assert.match(create, /preventDefault/);
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL because detail and create components do not exist.

- [ ] **Step 3: Implement accessible detail and simulation**

Open detail in a labelled dialog/panel with focus placement, Escape close, backdrop close, and focus restoration. Show timeline, SLA, area, assignee, attachments, public/internal responses, classification source, and escalation/transfer history. Implement compact incident form with required title, area, and priority; add created record only to component state and announce success through `aria-live`.

- [ ] **Step 4: Pass contract and build**

Run: `npm run validate:orbit && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit/demo app/scripts/validate-orbit.mjs
git commit -m "feat: add Orbit ticket interactions"
```

### Task 6: Maintenance and Asset Workflows

**Files:**
- Create: `app/src/pages/orbit/demo/OrbitMaintenance.tsx`
- Create: `app/src/pages/orbit/demo/OrbitMaintenanceDetail.tsx`
- Create: `app/src/pages/orbit/demo/OrbitAssets.tsx`
- Create: `app/src/pages/orbit/demo/OrbitAssetDetail.tsx`
- Modify: `app/src/pages/orbit/demo/OrbitDemo.tsx`
- Modify: `app/src/pages/orbit/demo/orbitDemo.css`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: list/calendar views and detail panels using `DemoMaintenance` and `DemoAsset`.
- Consumes: `orbitDemoData`, locale, and the accessible panel behavior established in Task 5.

- [ ] **Step 1: Add failing workflow checks**

```js
const maintenance = read("src/pages/orbit/demo/OrbitMaintenanceDetail.tsx");
const assets = read("src/pages/orbit/demo/OrbitAssetDetail.tsx");
for (const field of ["checklist", "evidence", "signature", "equipment"])
  assert.match(maintenance, new RegExp(field, "i"));
for (const field of ["location", "invoice", "transfer", "maintenance"])
  assert.match(assets, new RegExp(field, "i"));
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL because workflow components do not exist.

- [ ] **Step 3: Implement maintenance and asset views**

Render a usable mobile list and wider calendar composition for maintenance. Detail shows status, responsible party, checklist progress, equipment, evidence, and fictitious signatures. Render searchable asset inventory with category, state, owner area, and location. Detail shows supplier, invoice reference, delivery record, transfer history, and maintenance history. Reuse dialog accessibility rules.

- [ ] **Step 4: Pass contract and build**

Run: `npm run validate:orbit && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit/demo app/scripts/validate-orbit.mjs
git commit -m "feat: add Orbit maintenance and asset demo"
```

### Task 7: SEO, Home Link, Sitemap, and Failure Fallback

**Files:**
- Create: `app/src/pages/orbit/OrbitSeo.tsx`
- Create: `app/src/pages/orbit/OrbitDemoBoundary.tsx`
- Modify: `app/src/pages/orbit/OrbitPage.tsx`
- Modify: `app/src/pages/HomePage.tsx`
- Modify: `app/public/sitemap.xml`
- Create: `app/public/orbit-social.webp`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: `OrbitSeo({ locale })`; `OrbitDemoBoundary` static fallback with contact CTAs.
- Consumes: localized metadata and existing `<head>` tags.

- [ ] **Step 1: Add failing SEO and fallback checks**

```js
const seo = read("src/pages/orbit/OrbitSeo.tsx");
const boundary = read("src/pages/orbit/OrbitDemoBoundary.tsx");
const sitemap = read("public/sitemap.xml");
assert.match(seo, /SoftwareApplication/);
assert.match(seo, /https:\/\/somacoretech\.com\/productos\/orbit/);
assert.match(seo, /application\/ld\+json/);
assert.match(sitemap, /productos\/orbit/);
assert.match(home, /href=[{\"']\/productos\/orbit/);
assert.match(boundary, /mailto:contacto@somacoretech\.com/);
```

- [ ] **Step 2: Confirm test fails**

Run: `npm run validate:orbit`

Expected: FAIL on missing SEO module, route link, sitemap entry, and fallback.

- [ ] **Step 3: Implement metadata, indexability, linking, and fallback**

Set localized title, description, canonical, OG, Twitter, locale, and image metadata in an effect. Inject one keyed JSON-LD `SoftwareApplication` script and remove it on unmount. Add Orbit URL to sitemap and make the home Orbit card link directly to the route while retaining its consultation CTA. Generate social art from actual Orbit UI and fox mark at 1200×630 WebP. Wrap lazy demo with a class error boundary whose static fallback summarizes modules and preserves WhatsApp/email actions.

- [ ] **Step 4: Pass SEO and site checks**

Run: `npm run validate:orbit && npm run validate:site && npm run build`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/src/pages/orbit app/src/pages/HomePage.tsx app/public/sitemap.xml app/public/orbit-social.webp app/scripts/validate-orbit.mjs
git commit -m "feat: add Orbit SEO and resilient loading"
```

### Task 8: Visual, Responsive, Accessibility, and Publication Verification

**Files:**
- Modify: `app/src/pages/orbit/orbit.css`
- Modify: `app/src/pages/orbit/demo/orbitDemo.css`
- Modify: `app/scripts/validate-orbit.mjs`

**Interfaces:**
- Produces: verified production build and published main branch.
- Consumes: completed landing and demo.

- [ ] **Step 1: Add final regression checks**

```js
const orbitSources = [
  "src/pages/orbit/OrbitPage.tsx",
  "src/pages/orbit/orbitContent.ts",
  "src/pages/orbit/orbitDemoData.ts",
  ...fs.readdirSync("src/pages/orbit/demo").map((name) => `src/pages/orbit/demo/${name}`),
].filter((path) => fs.statSync(path).isFile()).map(read).join("\n");

for (const forbidden of ["Más x Menos", "Mas x Menos", "MXM", "mxm.com.co", "SIESA"])
  assert.doesNotMatch(orbitSources, new RegExp(forbidden, "i"));
assert.match(orbitSources, /aria-live/);
assert.match(orbitSources, /aria-label/);
assert.match(css, /@media\s*\(max-width:/);
```

- [ ] **Step 2: Run automated verification**

Run: `npm run lint && npm run validate:site && npm run validate:orbit && npm run build`

Expected: all PASS with no TypeScript, ESLint, acceptance, or build error.

- [ ] **Step 3: Verify in browser**

Start: `npm run dev -- --host 0.0.0.0`

Check at 390×844, 768×1024, 1440×900, and 1920×1080:

```text
/productos/orbit
/productos/orbit?lang=en
```

Verify theme and locale survive reload; every demo module works; filters can reach and recover from empty state; ticket, maintenance, and asset details open and close by keyboard; incident simulation resets; mobile navigation remains readable; fallback can be forced by temporarily rejecting the demo import; no horizontal overflow appears.

- [ ] **Step 4: Inspect performance assets**

Run: `du -ah dist | sort -h | tail -20`

Confirm demo is a separate lazy chunk, social art is optimized, no source image is shipped accidentally, and initial home bundle has no material regression.

- [ ] **Step 5: Commit final polish**

```bash
git add app/src/pages/orbit app/scripts/validate-orbit.mjs
git commit -m "fix: polish Orbit accessibility and responsive UI"
```

- [ ] **Step 6: Publish and verify public route**

Push commits to `main`. Wait for deployment. Open both localized URLs and repeat hero, demo navigation, theme, language, WhatsApp, email, home link, canonical, JSON-LD, and mobile smoke checks against production.

