import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import LandingPageTC from '@/assets/images/LandingPageTC.png';

const WaveHero: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP Entrance Text Reveal animation
    const tl = gsap.timeline({ delay: 0.15 });

    // Enable 3D transform perspective for smooth text rotation reveal
    gsap.set('.hero-reveal-line', { transformPerspective: 800 });

    tl.fromTo(
      '.hero-reveal-line',
      { y: '115%', opacity: 0, rotateX: 12 },
      { y: '0%', opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.16, ease: 'power4.out' }
    )
      .fromTo(
        '.hero-sub-text',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        '.hero-btns',
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
        '-=0.4'
      )
      .fromTo(
        '.hero-vr-image',
        { scale: 1.4, opacity: 0 },
        { scale: 1.25, opacity: 1, duration: 1.4, ease: 'power3.out' },
        '-=1.2'
      );
  }, []);

  return (
    <section className="relative w-full h-screen bg-white p-1.5 sm:p-2.5 md:p-3 flex items-center justify-center overflow-hidden font-satoshi">
      {/* Single Unified Hero Container Div */}
      <div className="w-full max-w-[1560px] h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] flex items-center">
        
        {/* Full Section Background Image — 70% 15% mobile focal point, 82% width on desktop */}
        <img
          src={LandingPageTC}
          alt="True Connect Blue VR Model"
          className="hero-vr-image absolute inset-0 w-full h-full lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[82%] lg:h-full object-cover object-[70%_15%] sm:object-[78%_center] lg:object-[85%_top] origin-center lg:origin-right transition-transform duration-700 pointer-events-none"
        />

        {/* Dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3f]/95 via-[#0b1f3f]/45 to-[#0b1f3f]/10 lg:bg-none pointer-events-none" />

        {/* Content Overlaid — vertically centered and left-aligned matching reference image */}
        <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 lg:py-16 flex flex-col items-start justify-center h-full max-w-4xl text-left">

          {/* Headline Text Reveal (Masked Line-by-Line) */}
          <h1 className="hero-title-text font-satoshi text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-5">
            <span className="block overflow-hidden py-1">
              <span className="hero-reveal-line block transform-gpu">
                Design engineering
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="hero-reveal-line block transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                for ambitious brands.
              </span>
            </span>
          </h1>

          {/* Description Paragraph Reveal */}
          <div className="overflow-hidden mb-8">
            <p className="hero-sub-text font-satoshi text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-lg font-normal">
              We design and build custom websites, portals, and apps with uncompromised performance. High-speed connectivity & IT solutions tailored for your growth.
            </p>
          </div>

          {/* CTA Buttons — Left aligned compact pills */}
          <div className="hero-btns flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 font-satoshi w-auto">
            <button
              onClick={() => navigate('/services')}
              className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-7 py-3.5 rounded-full text-xs sm:text-base shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi w-auto"
            >
              View Packages
            </button>
            <button
              onClick={() => navigate('/case-studies')}
              className="bg-black/40 hover:bg-black/70 text-white font-bold px-7 py-3.5 rounded-full text-xs sm:text-base border border-white/25 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi w-auto"
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



