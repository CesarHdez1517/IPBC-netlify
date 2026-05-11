interface PageHeroProps {
  title:            string;
  subtitle:         string;
  backgroundImage?: string;
  imageAlt?:        string;
}

/**
 * Reusable hero/header component.
 * - With backgroundImage: full-bleed photo with overlay and white text
 * - Without: solid primary-color banner
 */
export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  imageAlt,
}: PageHeroProps) {
  if (backgroundImage) {
    return (
      <section className="relative h-72 md:h-96 overflow-hidden" aria-label="Encabezado">
        <img
          src={backgroundImage}
          alt={imageAlt ?? title}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        {/* FIX: was .overlay-darker (undefined). Now defined in index.css */}
        <div className="overlay-darker" aria-hidden />
        <div className="relative container h-full flex flex-col justify-end pb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
          {/* FIX: was 'subtitle text-white/80' — .subtitle was undefined, duplicate/conflicting classes.
              Now uses explicit Tailwind only. */}
          <p className="text-lg text-white/85 mt-2 leading-relaxed">{subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-primary text-primary-foreground py-14" aria-labelledby="page-hero-h">
      <div className="container">
        <h1 id="page-hero-h" className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
        {/* FIX: .subtitle was undefined. Using explicit Tailwind. */}
        <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
