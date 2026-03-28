import { parallaxGalleryConfig } from '../../config';

const TechMarqueeSection = () => {
  if (parallaxGalleryConfig.marqueeTexts.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-transparent pb-8">
      <div className="overflow-hidden border-y border-[var(--line)] py-6">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              {parallaxGalleryConfig.marqueeTexts.map((text, j) => (
                <span key={`${text}-${j}`} className="mx-8 flex items-center">
                  <span className="font-display text-2xl uppercase text-[var(--muted)]/30 md:text-4xl">{text}</span>
                  <span className="mx-8 h-2 w-2 rounded-full bg-neon-cyan/30" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarqueeSection;
