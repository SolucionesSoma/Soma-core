import type { Locale } from "./i18n";
export type Theme = "light" | "dark";
export const getInitialLocale = (): Locale => {
  const query = new URLSearchParams(location.search).get("lang");
  if (query === "en" || query === "es") return query;
  const stored = localStorage.getItem("soma-locale");
  return stored === "en" || stored === "es" ? stored : "es";
};
export const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("soma-theme");
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
export const applyPreferences = (locale: Locale, theme: Theme) => {
  document.documentElement.lang = locale;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem("soma-locale", locale);
  localStorage.setItem("soma-theme", theme);
};
