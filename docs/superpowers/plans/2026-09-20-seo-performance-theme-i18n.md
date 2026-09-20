# SOMA SEO, Performance, Theme and i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver production-grade SEO, smaller page payloads without visible degradation, full light/dark themes, and complete Spanish/English localization.

**Architecture:** Keep the React/Vite single-page architecture. Add typed translation dictionaries and persisted UI preferences, update document metadata at runtime, strengthen static crawl metadata, and restrict deployed assets to files used by the current surface. Theme uses semantic CSS tokens instead of duplicated markup.

**Tech Stack:** React 19, TypeScript, Vite 7, CSS custom properties, Sharp, Schema.org JSON-LD.

**Spec:** User request in current conversation.

## Global Constraints

- Preserve current SOMA brand, layout, logo, product names and content meaning.
- No visible image-quality loss.
- Spanish remains default; English covers every visible interface string.
- Theme and language persist across visits and respect system preference on first visit.
- SEO must not identify a founder; company NIT remains visible.
- Avoid adding runtime dependencies.

## Review Focus

- First visit with no stored preferences uses system theme and Spanish.
- Invalid stored theme/language falls back safely.
- Language changes visible copy, `lang`, title, description, Open Graph and URL query.
- Dark theme preserves contrast and brand identity across every section.
- Production output excludes legacy PNG/JPG assets not referenced by the active page.

---

### Task 1: Automated acceptance checks

**Files:**
- Create: `app/scripts/validate-site.mjs`
- Modify: `app/package.json`

**Interfaces:**
- Consumes: built files in `app/dist` and source files.
- Produces: `npm run validate:site` with a non-zero exit when requirements fail.

- [ ] Write checks for metadata, schemas, language dictionaries, theme controls, image attributes and forbidden founder data.
- [ ] Run checks and verify failure before implementation.
- [ ] Add implementation in Tasks 2–4.
- [ ] Run checks and verify success.

### Task 2: SEO pass

**Files:**
- Modify: `app/index.html`
- Modify: `app/public/robots.txt`
- Modify: `app/public/sitemap.xml`
- Create: `app/public/site.webmanifest`
- Create: `app/public/og-soma.jpg`
- Modify: `app/src/App.tsx`

**Interfaces:**
- Consumes: active locale.
- Produces: static crawl metadata plus runtime locale-specific metadata.

- [ ] Correct title, descriptions, canonical, hreflang, Open Graph, Twitter and theme metadata.
- [ ] Replace founder-person schema with company, website, service and software-suite graphs.
- [ ] Add semantic landmarks, descriptive image alternatives and accessible controls.
- [ ] Generate a 1200×630 social preview image from existing brand assets.

### Task 3: Payload and rendering pass

**Files:**
- Modify: `app/src/App.tsx`
- Modify: `app/index.html`
- Modify: `app/scripts/optimize-images.mjs`
- Delete: unused raster assets under `app/public/images` and obsolete hero duplicates.

**Interfaces:**
- Consumes: current WebP assets.
- Produces: smaller deploy directory, lazy decoding, explicit dimensions and priority for hero media.

- [ ] Inventory referenced assets and record baseline sizes.
- [ ] Remove source PNG/JPG duplicates and unused founder/news/gallery assets from deploy output.
- [ ] Preserve current WebP visual files; add correct lazy/eager loading, decoding and dimensions.
- [ ] Remove obsolete heavyweight SVG hero and unused HD PNG.
- [ ] Compare production sizes against baseline.

### Task 4: Theme and localization pass

**Files:**
- Create: `app/src/i18n.ts`
- Create: `app/src/preferences.ts`
- Modify: `app/src/App.tsx`
- Modify: `app/src/components/CookieConsentBanner.tsx`
- Modify: `app/src/index.css`
- Modify: `app/index.html`

**Interfaces:**
- Produces: `Locale`, `Theme`, `copy`, `readPreferences`, `applyTheme`.
- Consumes: browser language query, localStorage and `prefers-color-scheme`.

- [ ] Add typed ES/EN dictionaries covering all visible copy.
- [ ] Add persisted language selector with runtime metadata synchronization.
- [ ] Add persisted light/dark selector with system-default initialization.
- [ ] Convert hard-coded colors to semantic theme tokens and verify all sections.
- [ ] Localize cookie consent and accessibility labels.

### Task 5: Final verification and publication

**Files:** all changed files.

**Interfaces:** production output and GitHub `main`.

- [ ] Run `npm run validate:site`, targeted ESLint, production build and Impeccable detector.
- [ ] Inspect production asset inventory and sizes.
- [ ] Publish text and binary changes to GitHub `main`.
- [ ] Fetch remote files and confirm final commit.
