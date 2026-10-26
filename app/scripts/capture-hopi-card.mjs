import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import sharp from "sharp";
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
  });
  await page.goto(
    (process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:18111") +
      "/productos/hopi?lang=es#demo",
  );
  const demo = page.getByTestId("hopi-demo");
  await demo.waitFor();
  const reject = page.getByRole("button", { name: "Rechazar", exact: true });
  if (await reject.isVisible()) await reject.click();
  await page.evaluate(() => {
    localStorage.setItem("soma-theme", "light");
    document.documentElement.dataset.theme = "light";
  });
  await page.screenshot({
    path: "/tmp/hopi-product-desktop.png",
    fullPage: true,
  });
  const screenshot = await demo.screenshot();
  const rabbit = readFileSync("public/hopi-rabbit-hd.webp").toString("base64");
  await page.setViewportSize({ width: 1600, height: 900 });
  await page.setContent(`<!doctype html><html><head><style>
  *{box-sizing:border-box}body{margin:0;width:1600px;height:900px;overflow:hidden;background:radial-gradient(ellipse at 55% 40%,#dbf4ff,transparent 58%),#fafdff;color:#05263f;font-family:Arial,sans-serif}.ribbon{position:absolute;width:1750px;height:320px;left:-100px;top:300px;transform:rotate(-20deg);border-radius:50%;border:48px solid #55d0f021;box-shadow:0 0 0 32px #0878c20b}.rabbit{position:absolute;width:590px;height:690px;object-fit:contain;left:-30px;top:100px;filter:drop-shadow(0 24px 20px #05263f20)}.screen{position:absolute;left:525px;top:125px;width:1035px;border:1px solid #cfe1ea;border-radius:14px;overflow:hidden;box-shadow:0 24px 70px #0878c222;background:white}.screen img{display:block;width:100%}.word{position:absolute;left:75px;top:75px;font-size:42px;letter-spacing:.18em;font-weight:800}.word small{display:block;font-size:12px;font-weight:500;letter-spacing:.13em;margin-top:12px;color:#50687c}.caption{position:absolute;left:75px;bottom:60px;font-size:12px;letter-spacing:.12em;color:#50687c}.caption b{display:block;font-size:25px;letter-spacing:-.03em;color:#05263f;margin-bottom:12px}.note{position:absolute;right:55px;bottom:48px;font-size:10px;letter-spacing:.08em;color:#50687c}
  </style></head><body><div class="ribbon"></div><div class="word">HOPI<small>UNA SOLUCIÓN DE SOMA</small></div><img class="rabbit" src="data:image/webp;base64,${rabbit}" alt=""><div class="screen"><img src="data:image/png;base64,${screenshot.toString("base64")}" alt=""></div><div class="caption"><b>Su restaurante, conectado.</b>PEDIDOS · COCINA · CAJA</div><div class="note">VISTA DEMOSTRATIVA · DATOS FICTICIOS</div></body></html>`);
  await page
    .locator("img")
    .evaluateAll((images) =>
      Promise.all(images.map((image) => image.decode())),
    );
  const card = await page.screenshot();
  await sharp(card)
    .webp({ quality: 87 })
    .toFile("public/images/products/hopi-hero-demo.webp");
  console.log("Hopi product card captured from the working demo (1600 × 900)");
} finally {
  await browser.close();
}
