import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { home, homeServiceCards } from "@/content/site";
import { serviceVisuals } from "@/components/site/serviceVisuals";

// Card colours from the original service cards
const gradients = [
  "bg-gradient-to-br from-[#0b1f3f] via-[#153460] to-[#040e22]",
  "bg-gradient-to-br from-[#1a4a28] via-[#2d5a27] to-[#0a2e12]",
  "bg-gradient-to-br from-[#d95321] via-[#c92a54] to-[#7a0d3b]",
  "bg-gradient-to-br from-[#4c248b] via-[#6b31c9] to-[#25104a]",
  "bg-gradient-to-br from-[#0f5c6e] via-[#1a8a9e] to-[#083540]",
  "bg-gradient-to-br from-[#2a2a2a] via-[#404040] to-[#111111]",
];

/**
 * Home "Our services": a horizontal row of large cards.
 * Only the title shows by default. On hover the photo blurs and the subheading appears
 * (on touch screens, where there is no hover, the subheading is always visible).
 * Each card opens the service's own page.
 */
interface ServicesShowcaseProps {
  eyebrow?: string;
  headline?: string;
  sub?: string;
  id?: string;
  className?: string;
}

const ServicesShowcase = ({ eyebrow, headline, sub, id = "services", className = "bg-[#f8f9fa]" }: ServicesShowcaseProps = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", dragFree: true, containScroll: "trimSnaps" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const sec = home.servicesSection;
  const total = String(homeServiceCards.length).padStart(2, "0");

  const update = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    update();
    emblaApi.on("select", update).on("reInit", update).on("scroll", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update).off("scroll", update);
    };
  }, [emblaApi, update]);

  const arrow =
    "w-11 h-11 rounded-full border border-gray-300 bg-white text-[#0b1f3f] flex items-center justify-center transition-all duration-300 hover:bg-[#0b1f3f] hover:text-white hover:border-[#0b1f3f] disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#0b1f3f] disabled:hover:border-gray-300 disabled:cursor-not-allowed";

  return (
    <section id={id} className={`py-16 md:py-24 overflow-hidden ${className}`}>
      <div className="container-tc">
        {/* Centered header, as in the original section */}
        <div className="home-fade flex flex-col items-center text-center mb-12 md:mb-16">
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gray-400 mb-5 block">{eyebrow ?? sec.eyebrow}</span>
          <h2 className="text-balance text-3xl md:text-5xl font-medium text-[#2d2a26] tracking-tight mb-5 max-w-4xl">{headline ?? sec.headline}</h2>
          <p className="text-balance text-[13px] sm:text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed">{sub ?? sec.sub}</p>
        </div>
      </div>

      {/* Arrow controls above the row, on the right (tablet and larger; on phones the row is swiped) */}
      <div className="mb-5 hidden items-center justify-end gap-3 md:flex md:pr-16 lg:pr-20 xl:pr-24">
        <button type="button" aria-label="Previous services" onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} className={arrow}>
          <ArrowLeft size={18} />
        </button>
        <button type="button" aria-label="Next services" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} className={arrow}>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Row: first card lines up with the hero heading (hero card edge + hero text padding) and runs on to the screen edge */}
      <div className="pl-[1.975rem] sm:pl-[3.125rem] md:pl-16 lg:pl-20 xl:pl-24">
        <div className="embla overflow-visible" ref={emblaRef}>
          <div className="embla__container flex gap-3 md:gap-5 cursor-grab active:cursor-grabbing select-none">
            {homeServiceCards.map((s, i) => {
              const { icon: Icon, image, natural } = serviceVisuals[s.id];
              return (
                <div key={s.id} className="embla__slide flex-[0_0_88%] sm:flex-[0_0_62%] md:flex-[0_0_52%] lg:flex-[0_0_43%] min-w-0">
                  <Link
                    to={s.to}
                    draggable={false}
                    aria-label={`${s.title}: open the service page`}
                    className={`group relative w-full aspect-[4/3] md:aspect-auto md:h-[440px] lg:h-[460px] rounded-[1.5rem] md:rounded-[1.75rem] overflow-hidden p-5 sm:p-8 md:p-10 flex flex-col justify-between ${gradients[i % gradients.length]} text-white card-lift-dark`}
                  >
                    {/* Photo: blurs on hover */}
                    <img
                      src={image(800)}
                      srcSet={`${image(800)} 800w, ${image(1600)} 1600w`}
                      sizes="(min-width: 1024px) 43vw, (min-width: 768px) 52vw, 88vw"
                      alt={`${s.title} in Trivandrum`}
                      loading="lazy"
                      draggable={false}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:blur-[2px] pointer-events-none ${natural ? "opacity-100" : "mix-blend-overlay opacity-60 group-hover:opacity-70"}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 group-hover:from-black/80 group-hover:via-black/30 transition-colors duration-500 pointer-events-none" />

                    {/* Top: icon and counter */}
                    <div className="relative z-10 flex items-start justify-between">
                      <span className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/25 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                      </span>
                      <span className="px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-md text-[11px] md:text-xs font-semibold tracking-[0.28em] shadow-lg">
                        {String(i + 1).padStart(2, "0")} / {total}
                      </span>
                    </div>

                    {/* Bottom: label and title; the subtitle appears on hover (tablet and larger) */}
                    <div className="relative z-10 mt-auto flex flex-col justify-end">
                      <p className="mb-1.5 md:mb-3 truncate whitespace-nowrap text-[9px] md:text-[11px] font-semibold uppercase tracking-[0.14em] md:tracking-[0.32em] text-white/75">{s.label}</p>

                      <div className="relative pr-11 sm:pr-0">
                        <h3 className="whitespace-nowrap text-[1.05rem] sm:text-xl lg:text-[1.75rem] font-medium text-white leading-[1.1] tracking-tight transition-all duration-300">
                          {s.title}
                        </h3>
                        {/* phones: small arrow beside the title, as in the reference */}
                        <span className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center justify-between gap-3 overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-out group-hover:max-h-16 group-hover:opacity-100 group-hover:pt-3 [@media(hover:none)]:max-h-16 [@media(hover:none)]:opacity-100 [@media(hover:none)]:pt-3">
                        <p className="min-w-0 flex-1 truncate whitespace-nowrap text-xs md:text-sm text-white/90 font-normal">{s.tagline}</p>
                        <span className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 transition-all duration-300 group-hover:bg-white group-hover:text-black shadow-lg">
                          <ArrowUpRight size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesShowcase;
