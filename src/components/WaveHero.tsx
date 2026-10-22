import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import heroImage from "@/assets/images/LandingPageTC.webp";
import heroImageMobile from "@/assets/images/LandingPageTC-mobile.webp";
import { home, services } from "@/content/site";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import { isPrerender } from "@/lib/env";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Short labels for the services strip (full names are on each service page)
const stripLabel: Record<string, string> = {
  "social-media-marketing": "Social Media",
  "web-app-development": "Web & Apps",
  branding: "Branding",
  "custom-software": "Custom Software",
  "ai-automation": "AI & Automation",
  "enterprise-internet": "Enterprise Internet",
};

const WaveHero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPrerender || reduceMotion) return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    const ctx = gsap.context(() => {
      gsap.set(".hero-reveal-line", { transformPerspective: 800 });
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        ".hero-eyebrow",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      )
        .fromTo(
          ".hero-reveal-line",
          { y: "115%", opacity: 0, rotateX: 12 },
          {
            y: "0%",
            opacity: 1,
            rotateX: 0,
            duration: 1.0,
            stagger: 0.14,
            ease: "power4.out",
            clearProps: "rotateX,transformPerspective",
          },
          "-=0.3",
        )
        .fromTo(
          ".hero-sub-text",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          ".hero-btns",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4",
        );

      // Scroll parallax is desktop-only to keep phones fast
      if (isDesktop) {
        gsap.to(".hero-vr-image", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  const { hero } = home;

  return (
    <section
      ref={sectionRef}
      data-no-reveal
      className="relative w-full min-h-[100svh] bg-white p-1.5 sm:p-2 flex items-center justify-center overflow-hidden font-satoshi"
    >
      <div className="w-full max-w-[1560px] min-h-[calc(100svh-1.5rem)] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] flex flex-col">
        <picture>
          <source media="(min-width: 768px)" srcSet={heroImage} />
          <img
            src={heroImageMobile}
            alt="True Connect, digital marketing, software and enterprise internet company in Trivandrum, Kerala"
            width={1800}
            height={1200}
            {...({ fetchpriority: "high" } as Record<string, string>)}
            decoding="async"
            className="hero-vr-image absolute inset-0 w-full h-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[82%] object-cover object-[70%_15%] sm:object-[78%_center] lg:object-[85%_top] pointer-events-none lg:scale-110"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3f] via-[#0b1f3f]/85 via-45% to-transparent lg:bg-gradient-to-r lg:from-[#0b1f3f]/90 lg:via-[#0b1f3f]/30 lg:to-transparent pointer-events-none" />
        <div className="relative z-10 flex-1 flex flex-col justify-end lg:justify-center pt-24 sm:pt-32 pb-28 sm:pb-10">
          {/* Text starts from the left of the hero card (not the centred content column), like an editorial hero */}
          <div className="w-full px-[1.6rem] sm:px-10 md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-xl pr-2 sm:pr-0 lg:max-w-3xl">
              <p className="hero-eyebrow text-xs sm:text-sm font-medium tracking-[0.18em] text-white/70 mb-4">
                {hero.eyebrow}
              </p>

              <h1 className="h1-tc hero-h1 text-white mb-5">
                {hero.headline.map((line) => (
                  <span key={line} className="block overflow-hidden py-1">
                    <span className="hero-reveal-line block transform-gpu">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>

              <p className="hero-sub-text text-white/80 text-[13px] sm:text-base lg:text-lg leading-relaxed max-w-lg lg:max-w-[46rem] mb-6 sm:mb-8">
                {hero.sub}
              </p>

              <div className="hero-btns flex flex-row flex-wrap items-center gap-2.5 sm:gap-3">
                <Link
                  to={hero.primary.to}
                  className="inline-flex items-center justify-center whitespace-nowrap bg-tc-yellow hover:bg-white text-tc-navy font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(230,232,74,0.6)]"
                >
                  {hero.primary.label}
                </Link>
                <Link
                  to={hero.secondary.to}
                  className="inline-flex items-center justify-center whitespace-nowrap bg-transparent hover:bg-white hover:text-tc-navy text-white font-semibold px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[13px] sm:text-sm tracking-wide border border-white/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  {hero.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Services strip: the six services, each opens its page */}
        {/* Hidden on phones; shown from tablet width up */}
        <nav
          aria-label="Our services"
          className="relative z-10 hidden border-t border-white/15 bg-black/25 backdrop-blur-sm sm:block"
        >
          <ul className="container-tc !px-3 sm:!px-5 lg:!px-10 flex items-center gap-1 overflow-x-auto xl:overflow-visible xl:justify-between py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map((svc) => {
              const Icon = serviceVisuals[svc.id].icon;
              return (
                <li key={svc.id} className="shrink-0">
                  <Link
                    to={svc.to}
                    className="group relative inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-white/65 transition-all duration-300 hover:bg-white/10 hover:text-white hover:-translate-y-0.5"
                  >
                    <Icon
                      size={14}
                      strokeWidth={1.75}
                      className="text-white/40 transition-colors duration-300 group-hover:text-[#E6E84A]"
                    />
                    <span className="whitespace-nowrap">
                      {stripLabel[svc.id] ?? svc.title}
                    </span>
                    <span
                      aria-hidden
                      className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-[#E6E84A] transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default WaveHero;
