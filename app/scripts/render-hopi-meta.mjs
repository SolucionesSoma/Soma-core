import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { build } from "esbuild";
const compiled = await build({
  entryPoints: ["src/pages/hopi/hopiContent.ts"],
  bundle: true,
  write: false,
  format: "esm",
  platform: "node",
});
const { hopiContent } = await import(
  "data:text/javascript;base64," +
    Buffer.from(compiled.outputFiles[0].text).toString("base64")
);
const { title, description } = hopiContent.es.meta;
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;");
let html = readFileSync("dist/index.html", "utf8").replace(
  /<title>[^<]*<\/title>/,
  `<title>${escape(title)}</title>`,
);
const values = {
  description,
  "og:title": title,
  "twitter:title": title,
  "og:description": description,
  "twitter:description": description,
  "og:url": "https://somacoretech.com/productos/hopi",
  "og:image": "https://somacoretech.com/images/products/hopi-hero-demo.webp",
  "og:image:secure_url":
    "https://somacoretech.com/images/products/hopi-hero-demo.webp",
  "twitter:image":
    "https://somacoretech.com/images/products/hopi-hero-demo.webp",
  "og:image:alt": title,
  "twitter:image:alt": title,
  "og:image:width": "1600",
  "og:image:height": "900",
  "og:image:type": "image/webp",
};
html = html.replace(/<meta\b[^>]*>/g, (tag) => {
  const key = tag.match(/(?:name|property)="([^"]+)"/)?.[1];
  return key && values[key]
    ? tag.replace(/content="[^"]*"/, `content="${escape(values[key])}"`)
    : tag;
});
html = html.replace(
  /<link\b[^>]*rel="canonical"[^>]*>/,
  '<link rel="canonical" href="https://somacoretech.com/productos/hopi" />',
);
html = html.replace(/<link\b[^>]*rel="alternate"[^>]*>/g, "");
html = html.replace(
  "</head>",
  `${[
    ["es-CO", ""],
    ["en", "?lang=en"],
    ["x-default", ""],
  ]
    .map(
      ([lang, suffix]) =>
        `<link rel="alternate" hreflang="${lang}" href="https://somacoretech.com/productos/hopi${suffix}" />`,
    )
    .join(
      "\n",
    )}\n<script id="hopi-schema" type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Hopi", applicationCategory: "BusinessApplication", operatingSystem: "Web", description, url: "https://somacoretech.com/productos/hopi", creator: { "@type": "Organization", name: "SOMA Core" } })}</script>\n</head>`,
);
html = html.replace(
  /(<link\b[^>]*rel="preload"[^>]*href=")\/soma-bird-hd.webp/,
  "$1/hopi-rabbit-hd.webp",
);
mkdirSync("dist/productos/hopi", { recursive: true });
writeFileSync("dist/productos/hopi/index.html", html);
console.log("Hopi static SEO entry generated");
