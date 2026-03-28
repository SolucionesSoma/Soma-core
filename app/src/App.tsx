import { useEffect, useState } from 'react';
import './index.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Header from './sections/Header';
import Hero from './sections/Hero';
import AlbumCube from './sections/AlbumCube';
import ParallaxGallery from './sections/ParallaxGallery';
import TourSchedule from './sections/TourSchedule';
import Footer from './sections/Footer';

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    document.documentElement.lang = siteConfig.language || 'es';

    const ensureMetaTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    ensureMetaTag('description', siteConfig.description);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('soma-theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    localStorage.setItem('soma-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
      <ThemeVariables />
      <BackgroundDecor />
      <Header
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Hero Section - Immersive landing */}
      <Hero />

      {/* Services Cube Section - 3D showcase */}
      <AlbumCube />

      {/* Parallax Gallery Section */}
      <ParallaxGallery />

      {/* Process Section */}
      <TourSchedule />

      {/* Footer Section with Team and Contact */}
      <Footer theme={theme} />
    </main>
  );
}

function ThemeVariables() {
  return (
    <style>{`
      :root {
        --bg: #f8fafc;
        --bg-soft: rgba(255,255,255,0.72);
        --bg-card: rgba(255,255,255,0.78);
        --bg-card-strong: rgba(255,255,255,0.92);
        --fg: #0f172a;
        --muted: #475569;
        --line: rgba(15,23,42,0.08);
        --line-strong: rgba(15,23,42,0.12);
        --primary: #0891b2;
        --primary-2: #0ea5e9;
        --accent: #10b981;
        --shadow: 0 10px 40px rgba(2,6,23,0.08);
      }

      .dark {
        --bg: #020617;
        --bg-soft: rgba(15,23,42,0.62);
        --bg-card: rgba(15,23,42,0.72);
        --bg-card-strong: rgba(15,23,42,0.86);
        --fg: #f8fafc;
        --muted: #94a3b8;
        --line: rgba(255,255,255,0.08);
        --line-strong: rgba(255,255,255,0.12);
        --primary: #67e8f9;
        --primary-2: #38bdf8;
        --accent: #34d399;
        --shadow: 0 18px 60px rgba(0,0,0,0.35);
      }

      html {
        scroll-behavior: smooth;
      }
    `}</style>
  );
}

function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute left-[-120px] top-[-80px] h-[320px] w-[320px] rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-400/10" />
      <div className="absolute right-[-80px] top-[120px] h-[360px] w-[360px] rounded-full bg-sky-400/15 blur-3xl dark:bg-sky-400/10" />
      <div className="absolute bottom-[-120px] left-[8%] h-[300px] w-[300px] rounded-full bg-emerald-400/15 blur-3xl dark:bg-emerald-400/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%)]" />
    </div>
  );
}

export default App;
