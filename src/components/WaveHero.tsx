import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const WaveHero: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Entrance animation
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('.hero-title-text', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('.hero-sub-text', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      .from('.hero-tag-text', { opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.hero-btns', { y: 15, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .from('.hero-vr-image', { scale: 1.05, opacity: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
  }, []);

  return (
    <section className="relative w-full h-screen bg-white p-1.5 sm:p-2.5 md:p-3 flex items-center justify-center overflow-hidden font-satoshi">
      {/* Single Unified Hero Container Div */}
      <div className="w-full max-w-[1560px] h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] flex items-center">
        
        {/* Full Section Background Image inside single div */}
        <img
          src="/images/vr-hero-new.png"
          alt="True Connect Blue VR Model"
          className="hero-vr-image absolute inset-y-0 right-0 w-full lg:w-[85%] h-full object-cover object-center lg:object-right-top scale-150 lg:scale-[1.65] origin-right transition-transform duration-700 hover:scale-[1.75] pointer-events-none"
        />

        {/* Content Overlaid inside single div */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-24 pb-10 lg:py-16 flex flex-col justify-center h-full max-w-4xl">

          {/* Headline Text */}
          <h1 className="hero-title-text font-satoshi text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1] mb-5">
            Design engineering <br className="hidden sm:block" /> for ambitious brands.
          </h1>

          {/* Description Paragraph */}
          <p className="hero-sub-text font-satoshi text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mb-6 font-normal">
            We design and build custom websites, portals, and apps with uncompromised performance. High-speed connectivity & IT solutions tailored for your growth.
          </p>

          {/* Subtitle Tagline */}
          <div className="hero-tag-text font-satoshi text-[11px] sm:text-xs font-medium tracking-[0.2em] text-white/60 uppercase mb-6 sm:mb-8">
            TECH CRAFTED WITH EMPATHY · PURPOSE IN EVERY PIXEL
          </div>

          {/* CTA Buttons */}
          <div className="hero-btns flex flex-wrap items-center gap-4 font-satoshi">
            <button
              onClick={() => navigate('/services')}
              className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-8 py-4 rounded-full text-sm sm:text-base shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi"
            >
              View Packages
            </button>
            <button
              onClick={() => navigate('/case-studies')}
              className="bg-black/40 hover:bg-black/70 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base border border-white/25 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi"
            >
              See Our Work
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WaveHero;


