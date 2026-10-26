import { test, expect, type Page } from "@playwright/test";
async function openDemo(page: Page, locale = "es") {
  await page.goto(`/productos/hopi?lang=${locale}#demo`);
  const demo = page.getByTestId("hopi-demo");
  await expect(demo).toBeVisible();
  return demo;
}
async function go(page: Page, name: string) {
  const demo = page.getByTestId("hopi-demo");
  const button = demo.locator("nav").getByRole("button", { name, exact: true });
  if (!(await button.isVisible()))
    await demo
      .getByRole("button", { name: /Abrir módulos|Open modules/ })
      .click();
  await button.click();
}
test("home replaces Flow, keeps the right assets and links to Hopi", async ({
  page,
}) => {
  await page.goto("/?lang=es");
  await expect(
    page.getByRole("heading", { name: "Flow", exact: true }),
  ).toHaveCount(0);
  const hopi = page
    .locator(".suite-product")
    .filter({ has: page.getByRole("heading", { name: "Hopi", exact: true }) });
  await expect(hopi.locator("img")).toHaveAttribute(
    "src",
    "/images/products/hopi-hero-demo.webp",
  );
  for (const name of ["Sonora", "Relay"])
    await expect(
      page
        .locator(".suite-product")
        .filter({ has: page.getByRole("heading", { name, exact: true }) })
        .locator("img"),
    ).toHaveAttribute("src", `/images/products/${name.toLowerCase()}.webp`);
  await hopi.getByRole("link", { name: "Conocer Hopi" }).click();
  await expect(page).toHaveURL(/\/productos\/hopi/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "De la primera mesa al último pedido.",
  );
});
test("order, staff approval, kitchen, split payment and full reset", async ({
  page,
}) => {
  const demo = await openDemo(page);
  await go(page, "Carta y pedidos");
  await demo
    .getByRole("button", { name: "Añadir Hamburguesa de la casa", exact: true })
    .click();
  await demo
    .getByRole("button", { name: "Confirmar pedido", exact: true })
    .click();
  const pending = demo.locator(".hd-ticket").filter({ hasText: "H-104" });
  await expect(pending).toContainText("Por aprobar");
  await pending.getByRole("button", { name: "Aprobar pedido" }).click();
  await go(page, "Cocina");
  await demo
    .locator(".hd-ticket")
    .filter({ hasText: "H-104" })
    .getByRole("button", { name: "Marcar listo" })
    .click();
  await go(page, "Caja");
  await demo.getByLabel("Dividir entre").selectOption("3");
  const bill = demo.locator(".hd-ticket").filter({ hasText: "H-104" });
  await expect(bill.locator(".hd-shares>span")).toHaveCount(3);
  await bill.getByRole("button", { name: "Registrar cobro externo" }).click();
  await expect(demo.locator(".hd-receipt")).toContainText("H-104");
  await go(page, "Resumen");
  await expect(
    demo
      .locator(".hd-metrics article")
      .filter({ hasText: "Cobros registrados" }),
  ).toContainText(/28[.,]000/);
  await demo.getByRole("button", { name: "Reiniciar demo" }).click();
  await expect(
    demo
      .locator(".hd-metrics article")
      .filter({ hasText: "Cobros registrados" })
      .locator("strong"),
  ).toContainText("0");
  await go(page, "Inventario");
  await expect(
    demo
      .locator(".hd-stock")
      .filter({ hasText: "Hamburguesa de la casa" })
      .locator("strong"),
  ).toHaveText("12");
});
test("strict inventory blocks, flexible allows negative stock and adjustment", async ({
  page,
}) => {
  const demo = await openDemo(page);
  await go(page, "Inventario");
  const stock = demo
    .locator(".hd-stock")
    .filter({ hasText: "Hamburguesa de la casa" });
  await stock.getByRole("button", { name: "Vaciar", exact: true }).click();
  await demo.getByLabel("Inventario estricto").check();
  await go(page, "Carta y pedidos");
  await demo
    .locator(".hd-ticket")
    .filter({ hasText: "H-103" })
    .getByRole("button", { name: "Aprobar pedido" })
    .click();
  await expect(demo.getByRole("status")).toContainText(
    "No hay existencias suficientes",
  );
  await expect(
    demo.locator(".hd-ticket").filter({ hasText: "H-103" }),
  ).toContainText("Por aprobar");
  await go(page, "Inventario");
  await demo.getByLabel("Inventario estricto").uncheck();
  await go(page, "Carta y pedidos");
  await demo
    .locator(".hd-ticket")
    .filter({ hasText: "H-103" })
    .getByRole("button", { name: "Aprobar pedido" })
    .click();
  await go(page, "Inventario");
  await expect(stock.locator("strong")).toHaveText("-2");
  await stock
    .getByRole("button", { name: "Aplicar ajuste", exact: true })
    .click();
  await expect(stock.locator("strong")).toHaveText("3");
});
test("white label changes menu identity and reset restores Hopi", async ({
  page,
}) => {
  const demo = await openDemo(page);
  await go(page, "Marca blanca");
  await demo.getByRole("button", { name: "Casa Cobre · Terracota" }).click();
  await expect(demo.locator(".hd-logo strong")).toHaveText("CASA COBRE");
  await expect(demo.locator(".hd-brand-preview img")).toHaveCount(0);
  await expect(demo).toHaveClass(/hd-copper/);
  await demo.getByRole("button", { name: "La carta de hoy" }).click();
  await expect(demo.locator(".hd-topbar")).toContainText("Casa Cobre");
  await demo.getByRole("button", { name: "Reiniciar demo" }).click();
  await expect(demo.locator(".hd-logo strong")).toHaveText("HOPI");
});
test("guided assistant shares orders without reaching the real application", async ({
  page,
}) => {
  const realRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().startsWith("https://hopi.somacoretech.com"))
      realRequests.push(request.url());
  });
  const demo = await openDemo(page);
  await go(page, "WhatsApp");
  await expect(demo).toContainText("No usa IA ni conecta con WhatsApp");
  await demo.getByRole("button", { name: "Ver carta de ejemplo" }).click();
  await demo.getByRole("button", { name: "Añadir ese pedido" }).click();
  await demo
    .getByRole("button", { name: "Confirmar domicilio de demo" })
    .click();
  await expect(
    demo.locator(".hd-ticket").filter({ hasText: "H-104" }),
  ).toContainText("Domicilio");
  expect(realRequests).toEqual([]);
});
for (const width of [320, 375, 768, 1440]) {
  test(`responsive ${width}px, dark theme and English`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const demo = await openDemo(page, "en");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(/Hopi/);
    await page
      .getByRole("button", { name: "Change theme", exact: true })
      .click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    for (const name of [
      "Menu and orders",
      "Kitchen",
      "Checkout",
      "Inventory",
      "Your brand",
      "WhatsApp",
      "Overview",
    ]) {
      await go(page, name);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      expect(
        await demo.evaluate((el) => el.scrollWidth <= el.clientWidth + 1),
      ).toBe(true);
    }
    await go(page, "Menu and orders");
    await demo.getByLabel("Search products").fill("zzzzzz");
    await expect(demo).toContainText("No products found");
    await demo.getByRole("button", { name: "Reset demo" }).click();
    await page.screenshot({
      path: `test-results/hopi-${width}-en-dark.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}

test("Hopi page and interactive demo meet automated accessibility checks", async ({
  page,
}) => {
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  await openDemo(page);
  const results = await new AxeBuilder({ page })
    .include(".hopi-site")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
  await page.getByRole("button", { name: "Cambiar tema", exact: true }).click();
  const dark = await new AxeBuilder({ page })
    .include(".hopi-site")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    dark.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      nodes: item.nodes.map((node) => node.target),
    })),
  ).toEqual([]);
});

test("demo modules retain accessible contrast in both themes", async ({
  page,
}) => {
  test.setTimeout(60000);
  const { default: AxeBuilder } = await import("@axe-core/playwright");
  await openDemo(page);
  for (const theme of ["light", "dark"]) {
    if (theme === "dark")
      await page
        .getByRole("button", { name: "Cambiar tema", exact: true })
        .click();
    for (const name of [
      "Carta y pedidos",
      "Cocina",
      "Caja",
      "Inventario",
      "Marca blanca",
      "WhatsApp",
    ]) {
      await go(page, name);
      if (name === "Marca blanca")
        await page
          .getByTestId("hopi-demo")
          .getByRole("button", { name: "Casa Cobre · Terracota" })
          .click();
      const audit = await new AxeBuilder({ page })
        .include(".hopi-demo")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        audit.violations.map((item) => ({
          id: item.id,
          nodes: item.nodes.map((node) => node.target),
        })),
        `${theme} / ${name}`,
      ).toEqual([]);
    }
  }
});
