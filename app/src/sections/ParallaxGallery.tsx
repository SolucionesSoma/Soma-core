import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { parallaxGalleryConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGallery = () => {
  // Null check: if config is empty, do not render
  if (parallaxGalleryConfig.parallaxImagesTop.length === 0 && parallaxGalleryConfig.galleryImages.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax effect for top row (moves left)
      if (topRowRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (topRowRef.current) {
              gsap.set(topRowRef.current, {
                x: -self.progress * 200,
              });
            }
          },
        });
        scrollTriggerRefs.current.push(st);
      }

      // Parallax effect for bottom row (moves right)
      if (bottomRowRef.current) {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (bottomRowRef.current) {
              gsap.set(bottomRowRef.current, {
                x: self.progress * 200,
              });
            }
          },
        });
        scrollTriggerRefs.current.push(st);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRefs.current.forEach((st) => st.kill());
      scrollTriggerRefs.current = [];
    };
  }, []);

  const scrollToProcess = () => {
    const processSection = document.getElementById('proceso');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="conocenos"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-transparent py-20"
    >
      {/* Section Header */}
      <div className="mx-auto mb-16 max-w-7xl px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              {parallaxGalleryConfig.sectionLabel}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-[var(--fg)] sm:text-4xl">
              {parallaxGalleryConfig.sectionTitle}
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--muted)]">
            Cada proyecto es una oportunidad para crear algo extraordinario.
            Exploramos los límites de la creatividad y la tecnología.
          </p>
        </div>
      </div>

      {/* Parallax Image Rows */}
      <div className="relative mb-20">
        {/* Top Row */}
        <div ref={topRowRef} className="mb-4 flex gap-4 will-change-transform">
          {parallaxGalleryConfig.parallaxImagesTop.map((image) => (
            <a
              key={image.id}
              href={image.href}
              target="_blank"
              rel="noreferrer"
              className="h-[200px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl md:h-[280px] md:w-[400px]"
              aria-label={image.alt}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </a>
          ))}
        </div>

        {/* Bottom Row */}
        <div
          ref={bottomRowRef}
          className="flex gap-4 will-change-transform"
          style={{ marginLeft: '-100px' }}
        >
          {parallaxGalleryConfig.parallaxImagesBottom.map((image) => (
            <a
              key={image.id}
              href={image.href}
              target="_blank"
              rel="noreferrer"
              className="h-[200px] w-[300px] flex-shrink-0 overflow-hidden rounded-2xl md:h-[280px] md:w-[400px]"
              aria-label={image.alt}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </a>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      </div>

      {/* Marquee Text */}
      <div className="mb-20 overflow-hidden border-y border-[var(--line)] py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {parallaxGalleryConfig.marqueeTexts.map((text, j) => (
                <span key={j} className="mx-8 flex items-center">
                  <span className="font-display text-2xl uppercase text-[var(--muted)]/30 md:text-4xl">
                    {text}
                  </span>
                  <span className="mx-8 h-2 w-2 rounded-full bg-neon-cyan/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mt-16">
          <div className="mb-8">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              {parallaxGalleryConfig.galleryLabel}
            </div>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--fg)] sm:text-4xl">
              {parallaxGalleryConfig.galleryTitle}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Algunos hitos que respaldan la visión, la capacidad de innovación y el
              enfoque de ejecución detrás de SOMA.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {parallaxGalleryConfig.galleryImages.map((item) => (
            <article
              key={`${item.title}-${item.date}`}
              className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--bg-card)]"
              style={{ boxShadow: 'var(--shadow)' }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--bg-card-strong)] text-sm font-medium text-[var(--muted)]">
                    Imagen pendiente
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                  {item.date}
                </p>
                <h4 className="mt-3 text-lg font-bold text-[var(--fg)]">{item.title}</h4>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-cyan-700 transition hover:text-cyan-800 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  Ver referencia
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* End CTA */}
        <div className="mt-20 text-center">
          <button
            onClick={scrollToProcess}
            className="group inline-flex items-center gap-3 rounded-full border border-neon-cyan/30 px-8 py-4 text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-void-black"
          >
            <span className="font-mono-custom text-sm uppercase tracking-wider">
              {parallaxGalleryConfig.endCtaText}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParallaxGallery;
