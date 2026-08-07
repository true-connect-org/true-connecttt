import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Users,
  Clock,
  Quote,
  MoveRight,
  Layers,
  Zap,
  Network,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import WaveHero from "@/components/WaveHero";
import ServicesCarousel from "@/components/ServicesCarousel";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Snappy Hero Animations
    gsap.fromTo(
      ".hero-stagger",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" },
    );

    // Snappy Scroll Animations for Bento Grid
    gsap.utils.toArray(".bento-item").forEach((element: Element) => {
      gsap.fromTo(
        element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    // Parallax background elements
    gsap.utils.toArray(".parallax-bg").forEach((element: Element) => {
      gsap.to(element, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: element.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });
  }, []);

  return (
    <div
      className="bg-white min-h-screen text-tc-navy font-sans overflow-x-hidden"
      ref={containerRef}
    >
      {/* 1. HERO SECTION */}
      <div className="w-full relative z-0">
        <WaveHero />
      </div>

      {/* Rest of the page */}
      <div className="relative z-10 bg-white overflow-hidden">
        {/* 2. SERVICES CAROUSEL SECTION */}
        <ServicesCarousel />

        {/* 3. PREMIUM EXPERTISE SECTION */}
        <section className="py-16 md:py-24 lg:py-32 relative bg-white">
          <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
            <div className="mb-20 bento-item flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-tc-navy mb-6 tracking-tight">
                  Complete Digital
                  <br className="hidden sm:block" />
                  Ecosystem.
                </h2>
                <p className="text-lg md:text-xl text-gray-600 font-light">
                  Connectivity meets digital transformation.
                </p>
              </div>
              <div className="w-24 h-[1px] bg-gray-300 mb-4 hidden md:block" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Expertise Card 1 */}
              <div className="bento-item group bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-8 hover:border-tc-navy/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-tc-navy/40 via-tc-navy to-tc-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <MoveRight
                  className="text-tc-navy/40 group-hover:text-tc-navy w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg md:text-xl font-bold text-tc-navy mb-4 md:mb-6">
                  AI & Marketing
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "AI Business Tools",
                    "Marketing Strategy",
                    "SEO Optimization",
                    "Social Media Campaigns",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm md:text-base text-gray-600 group-hover:text-tc-navy transition-colors"
                    >
                      <span className="text-tc-navy mr-2 md:mr-3 mt-1 text-base md:text-lg leading-none">
                        •
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise Card 2 */}
              <div className="bento-item group bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-8 hover:border-tc-navy/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-tc-navy/40 via-tc-navy to-tc-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <Layers
                  className="text-tc-navy/40 group-hover:text-tc-navy w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg md:text-xl font-bold text-tc-navy mb-4 md:mb-6">
                  Software & Apps
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Custom Web Platforms",
                    "iOS & Android Native",
                    "Process Automation",
                    "System Integration",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm md:text-base text-gray-600 group-hover:text-tc-navy transition-colors"
                    >
                      <span className="text-tc-navy mr-2 md:mr-3 mt-1 text-base md:text-lg leading-none">
                        •
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise Card 3 */}
              <div className="bento-item group bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-8 hover:border-tc-navy/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-tc-navy/40 via-tc-navy to-tc-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <Zap
                  className="text-tc-navy/40 group-hover:text-tc-navy w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg md:text-xl font-bold text-tc-navy mb-4 md:mb-6">
                  Brand Strategy
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Complete Rebranding",
                    "Content Marketing",
                    "CRM Implementation",
                    "ERP Solutions",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm md:text-base text-gray-600 group-hover:text-tc-navy transition-colors"
                    >
                      <span className="text-tc-navy mr-2 md:mr-3 mt-1 text-base md:text-lg leading-none">
                        •
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expertise Card 4 */}
              <div className="bento-item group bg-white border border-gray-200 shadow-lg hover:shadow-xl rounded-2xl p-6 md:p-8 hover:border-tc-navy/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-tc-navy/40 via-tc-navy to-tc-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <Network
                  className="text-tc-navy/40 group-hover:text-tc-navy w-8 h-8 md:w-10 md:h-10 mb-6 md:mb-8 transition-colors duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg md:text-xl font-bold text-tc-navy mb-4 md:mb-6">
                  Connectivity
                </h3>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    "Enterprise Leased Line",
                    "Business Broadband",
                    "Custom bandwidth",
                    "Reliance Jio Backend",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start text-sm md:text-base text-gray-600 group-hover:text-tc-navy transition-colors"
                    >
                      <span className="text-tc-navy mr-2 md:mr-3 mt-1 text-base md:text-lg leading-none">
                        •
                      </span>{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
