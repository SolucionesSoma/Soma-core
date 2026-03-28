import { ArrowRight } from 'lucide-react';
import { parallaxGalleryConfig } from '../../config';

const AchievementsSection = () => {
  if (parallaxGalleryConfig.galleryImages.length === 0) {
    return null;
  }

  const scrollToProcess = () => {
    const processSection = document.getElementById('proceso');
    if (processSection) {
      processSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent pb-14">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mt-10">
          <div className="mb-8">
            <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-200">
              {parallaxGalleryConfig.galleryLabel}
            </div>
            <h3 className="mt-4 text-3xl font-black tracking-tight text-[var(--fg)] sm:text-4xl">
              {parallaxGalleryConfig.galleryTitle}
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Algunos hitos que respaldan la vision, la capacidad de innovacion y el enfoque de ejecucion detras de
              SOMA.
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
                    className="h-full w-full object-cover transition duration-500 md:hover:scale-105"
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
                  className="mt-4 inline-flex text-sm font-semibold text-cyan-700 transition md:hover:text-cyan-800 dark:text-cyan-300 dark:md:hover:text-cyan-200"
                >
                  Ver referencia
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={scrollToProcess}
            className="group inline-flex items-center gap-3 rounded-full border border-neon-cyan/30 px-8 py-4 text-neon-cyan transition-all duration-300 md:hover:bg-neon-cyan md:hover:text-void-black"
          >
            <span className="font-mono-custom text-sm uppercase tracking-wider">{parallaxGalleryConfig.endCtaText}</span>
            <ArrowRight className="h-4 w-4 transition-transform md:group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
