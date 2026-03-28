import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Moon, Sun, Menu, X, ArrowRight } from 'lucide-react';
import { footerConfig } from '../config';

const NAV_ITEMS = footerConfig.quickLinks;

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function Header({ theme, setTheme, mobileOpen, setMobileOpen }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-[90] border-b border-[var(--line)] bg-[var(--bg-soft)] backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.08)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.35)]"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#inicio" onClick={() => scrollToSection('inicio')} className="flex items-center gap-3">
          <img
            src={theme === 'dark' ? '/logo-dark.svg' : '/logo-light.svg'}
            alt="SOMA Logo"
            className="h-9 w-auto"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => scrollToSection(item.sectionId)}
              className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--fg)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-card)] text-[var(--fg)] transition hover:scale-[1.03]"
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => scrollToSection('contacto')}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-500/15 dark:text-cyan-200"
          >
            Hablemos
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-card)] text-[var(--fg)]"
            aria-label="Cambiar tema"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg-card)] p-2 text-[var(--fg)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--bg-card-strong)] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollToSection(item.sectionId)}
                className="rounded-xl px-3 py-3 text-left text-sm font-medium text-[var(--muted)] transition hover:bg-black/5 hover:text-[var(--fg)] dark:hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('contacto')}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-600"
            >
              Solicitar asesoría
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
