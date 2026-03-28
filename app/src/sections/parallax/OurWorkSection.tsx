import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parallaxGalleryConfig } from '../../config';

gsap.registerPlugin(ScrollTrigger);

const OurWorkSection = () => {
  if (parallaxGalleryConfig.parallaxImagesTop.length === 0 && parallaxGalleryConfig.parallaxImagesBottom.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

  return (
    <section id="conocenos" ref={sectionRef} className="relative w-full overflow-hidden bg-transparent py-12">
      <div className="mx-auto mb-10 max-w-7xl px-6 md:px-12">
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
            Cada proyecto es una oportunidad para crear algo extraordinario. Exploramos los limites de la creatividad
            y la tecnologia.
          </p>
        </div>
      </div>

      <div className="relative mb-8">
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
                className="h-full w-full object-cover transition-transform duration-500 md:hover:scale-110"
              />
            </a>
          ))}
        </div>

        <div ref={bottomRowRef} className="flex gap-4 will-change-transform" style={{ marginLeft: '-100px' }}>
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
                className="h-full w-full object-cover transition-transform duration-500 md:hover:scale-110"
              />
            </a>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      </div>
    </section>
  );
};

export default OurWorkSection;
