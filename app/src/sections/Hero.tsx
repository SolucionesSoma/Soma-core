import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Cpu } from 'lucide-react';
import { heroConfig } from '../config';

const Hero = () => {
  // Null check: if config is empty, do not render
  if (!heroConfig.decodeText && !heroConfig.brandName && heroConfig.navItems.length === 0) {
    return null;
  }

  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const TARGET_TEXT = heroConfig.decodeText;
  const CHARS = heroConfig.decodeChars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      // CTA buttons fade in
      gsap.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.8 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroConfig.backgroundImage})`,
          backgroundSize: '45%' // más pequeño
        }}
      />
        {/* Theme-aware overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/85 via-white/60 to-slate-100/85 dark:from-slate-950/70 dark:via-slate-950/50 dark:to-slate-950/80" />
        {/* Animated glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-cyan/10 via-transparent to-transparent" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Main content centered */}
        <div className="flex flex-col items-center text-center max-w-5xl">
          {/* Tagline */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2">
            <Cpu className="w-4 h-4 text-neon-cyan" />
            <span className="text-xs font-mono-custom uppercase tracking-wider text-neon-cyan">
              Soluciones digitales con visión estratégica
            </span>
          </div>

          {/* Main title with decode effect */}
          <h1
            ref={titleRef}
            className="decode-text mb-6 text-[15vw] font-bold leading-none tracking-tighter text-[var(--fg)] dark:text-white md:text-[12vw] lg:text-[10vw]"
          >
            <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
              {displayText}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="mb-10 max-w-2xl font-mono-custom text-sm leading-relaxed text-[var(--muted)] md:text-lg"
          >
            {heroConfig.subtitle}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToSection(heroConfig.ctaPrimaryTarget)}
              className="group px-8 py-4 bg-neon-cyan text-void-black font-display text-sm uppercase tracking-wider rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2"
            >
              {heroConfig.ctaPrimary}
              <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection(heroConfig.ctaSecondaryTarget)}
              className="rounded-full border border-[var(--line-strong)] bg-[var(--bg-card)] px-8 py-4 font-display text-sm uppercase tracking-wider text-[var(--fg)] transition-all duration-300 hover:border-neon-cyan hover:text-neon-cyan"
            >
              {heroConfig.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-mono-custom uppercase tracking-wider text-[var(--muted)]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-neon-cyan/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
