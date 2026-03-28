import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers3, Building2, Rocket, BarChart3 } from 'lucide-react';
import { tourScheduleConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const PROCESS_ICONS = [Layers3, Building2, Rocket, BarChart3];

const TourSchedule = () => {
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.process-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const PROCESS_STEPS = tourScheduleConfig.tourDates;

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-transparent py-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-neon-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-96 w-96 rounded-full bg-neon-blue/5 blur-3xl" />
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div ref={contentRef} className="relative z-20 mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-2">
            <span className="text-xs font-mono-custom uppercase tracking-wider text-neon-cyan">
              {tourScheduleConfig.sectionLabel}
            </span>
          </div>
          <h2 className="mb-4 font-display text-5xl text-[var(--fg)] md:text-7xl">
            {tourScheduleConfig.sectionTitle}
          </h2>
          <p className="mx-auto max-w-xl font-mono-custom text-sm text-[var(--muted)]">
            Cada proyecto es único y merece una solución a la medida.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => {
            const StepIcon = PROCESS_ICONS[index] || Layers3;
            const isActive = activeStep === index;

            return (
              <div
                key={step.id}
                className={`process-item group relative cursor-pointer rounded-2xl border p-6 transition-all duration-500 ${
                  isActive
                    ? 'border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-500/15'
                    : 'border-[var(--line)] bg-[var(--bg-card)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-card-strong)]'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="absolute -right-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full bg-neon-cyan/20">
                  <span className="text-xs font-mono-custom font-bold text-neon-cyan">0{index + 1}</span>
                </div>

                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${
                    isActive ? 'bg-neon-cyan/20' : 'bg-[var(--bg-card-strong)]'
                  }`}
                >
                  <StepIcon
                    className={`h-6 w-6 transition-colors ${
                      isActive ? 'text-neon-cyan' : 'text-[var(--muted)]'
                    }`}
                  />
                </div>

                <h3 className="mb-2 font-display text-xl text-[var(--fg)]">{step.city}</h3>
                <p className="mb-4 font-mono-custom text-sm leading-relaxed text-[var(--muted)]">
                  {step.venue}
                </p>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-[var(--line-strong)] to-transparent lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
    </section>
  );
};

export default TourSchedule;
