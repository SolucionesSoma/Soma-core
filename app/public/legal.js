(() => {
  const root = document.documentElement;
  const isEnglish = root.lang === "en";
  const stored = localStorage.getItem("soma-theme");
  const initial = stored === "dark" || stored === "light"
    ? stored
    : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const apply = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem("soma-theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      theme === "dark" ? "#041f35" : "#ffffff",
    );
    document.querySelector("#theme-toggle")?.setAttribute(
      "aria-label",
      theme === "dark"
        ? (isEnglish ? "Enable light mode" : "Activar modo claro")
        : (isEnglish ? "Enable dark mode" : "Activar modo oscuro"),
    );
  };

  apply(initial);
  addEventListener("DOMContentLoaded", () => {
    document.querySelector("#theme-toggle")?.addEventListener("click", () => {
      apply(root.dataset.theme === "dark" ? "light" : "dark");
    });
    const menuButton = document.querySelector("#menu-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");
    menuButton?.addEventListener("click", () => {
      const open = mobileMenu?.classList.toggle("is-open") ?? false;
      menuButton.setAttribute("aria-expanded", String(open));
    });
  });
})();
