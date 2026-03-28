import { useEffect, useState } from 'react';

const CONSENT_KEY = 'soma-cookie-consent';

type ConsentValue = 'accepted' | 'rejected' | null;

export default function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'rejected') {
      setConsent(stored);
    }
    setReady(true);
  }, []);

  const saveConsent = (value: Exclude<ConsentValue, null>) => {
    localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  if (!ready || consent !== null) {
    return null;
  }

  return (
    <aside className="fixed bottom-4 left-4 right-4 z-[95] mx-auto max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--bg-card-strong)] p-4 shadow-[var(--shadow)] backdrop-blur md:p-5">
      <p className="text-sm leading-6 text-[var(--muted)]">
        Usamos cookies técnicas y analítica de Vercel para entender el rendimiento del sitio.
        Puedes aceptar o rechazar cookies analíticas. Más información en
        {' '}
        <a href="/cookies.html" className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300">Política de cookies</a>
        {' '}
        y
        {' '}
        <a href="/privacy.html" className="font-semibold text-cyan-700 hover:underline dark:text-cyan-300">Privacidad</a>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => saveConsent('accepted')}
          className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => saveConsent('rejected')}
          className="rounded-xl border border-[var(--line)] px-4 py-2 text-sm font-semibold text-[var(--fg)] transition hover:bg-[var(--bg-card)]"
        >
          Rechazar
        </button>
      </div>
    </aside>
  );
}
