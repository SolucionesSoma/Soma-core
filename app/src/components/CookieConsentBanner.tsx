import { useState } from "react";
import { translations, type Locale } from "../i18n";
const KEY = "soma-cookie-consent";
type Consent = "accepted" | "rejected" | null;
export default function CookieConsentBanner({ locale }: { locale: Locale }) {
  const [consent, setConsent] = useState<Consent>(() => {
    if (typeof window === "undefined") return null;
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  });
  const save = (v: Exclude<Consent, null>) => {
    localStorage.setItem(KEY, v);
    setConsent(v);
  };
  const t = translations[locale].cookies;
  if (consent !== null) return null;
  return (
    <aside className="cookie-banner" aria-label={t.label}>
      <div className="cookie-copy">
        <strong>{t.title}</strong>
        <p>
          {t.copy} <a href="/cookies.html">{t.policy}</a> ·{" "}
          <a href="/privacy.html">{t.privacy}</a>
        </p>
      </div>
      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-reject"
          onClick={() => save("rejected")}
        >
          {t.reject}
        </button>
        <button
          type="button"
          className="cookie-accept"
          onClick={() => save("accepted")}
        >
          {t.accept}
        </button>
      </div>
    </aside>
  );
}
