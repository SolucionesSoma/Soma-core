import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import sharp from "sharp";
assert.doesNotMatch(
  readFileSync("index.html", "utf8"),
  /\bFlow\b/,
  "Flow must also be retired from structured data",
);
const translations = readFileSync("src/i18n.ts", "utf8");
assert.doesNotMatch(
  translations,
  /\bFlow\b/,
  "Flow must be retired in both languages",
);
assert.equal((translations.match(/"Hopi"/g) || []).length, 2);
assert.equal(existsSync("public/images/products/flow.webp"), false);
const image = await sharp(
  "public/images/products/hopi-hero-demo.webp",
).metadata();
assert.equal(image.width, 1600);
assert.equal(image.height, 900);
assert.ok(
  readFileSync("public/images/products/hopi-hero-demo.webp").byteLength <
    300000,
);
const rewrites = JSON.parse(readFileSync("vercel.json", "utf8")).rewrites;
for (const path of ["/productos/hopi", "/productos/hopi/"])
  assert.equal(
    rewrites.find((item) => item.source === path)?.destination,
    "/productos/hopi/index.html",
  );
const html = readFileSync("dist/productos/hopi/index.html", "utf8");
assert.ok(!/\bFlow\b/.test(html), "Flow must not appear in compiled Hopi SEO");
assert.match(html, /<title>Hopi \| Restaurantes conectados/);
assert.match(
  html,
  /rel="canonical" href="https:\/\/somacoretech.com\/productos\/hopi"/,
);
assert.match(
  html,
  /property="og:image"\s+content="https:\/\/somacoretech.com\/images\/products\/hopi-hero-demo.webp"/,
);
assert.match(
  html,
  /hreflang="en" href="https:\/\/somacoretech.com\/productos\/hopi\?lang=en"/,
);
const schemas = [
  ...html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ),
].map((match) => JSON.parse(match[1]));
assert.ok(
  schemas.some(
    (schema) =>
      schema["@type"] === "SoftwareApplication" && schema.name === "Hopi",
  ),
);
assert.match(
  readFileSync("public/sitemap.xml", "utf8"),
  /xmlns:xhtml="http:\/\/www.w3.org\/1999\/xhtml"/,
);
assert.match(readFileSync("public/sitemap.xml", "utf8"), /productos\/hopi/);
console.log(
  "Hopi catalogue, assets, deployment routes and static SEO checks passed",
);
