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
  TrendingUp,
  ShieldCheck,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import WaveHero from "@/components/WaveHero";
import ServicesCarousel from "@/components/ServicesCarousel";
import Faq from "@/components/Faq";

import fasterVideo from "@/assets/videos/FASTER.mp4";
import scaleVideo from "@/assets/videos/SCALE.mp4";
import searchVideo from "@/assets/videos/SEARCH.mp4";
import securityVideo from "@/assets/videos/SECURITY.mp4";

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

        {/* 3. BENTO VIDEO FEATURE SECTION */}
        <section className="py-10 md:py-14 relative bg-white">
          <div className="max-w-[1300px] mx-auto px-5 sm:px-8 md:px-12 relative z-10">
            {/* Title & Description Header */}
            <div className="mb-14 md:mb-16 text-center max-w-3xl mx-auto bento-item space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b1f3f] bg-blue-50 px-3.5 py-1.5 rounded-full inline-block">
                OUR ENGINEERING PHILOSOPHY
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#121212] leading-[1.1]">
                The difference between a site that works and one that wins.
              </h2>
              <p className="text-gray-500 text-base md:text-lg font-normal leading-relaxed max-w-2xl mx-auto pt-2">
                We combine deep technical discovery, high-speed infrastructure, and direct transparent engineering — giving your enterprise a unfair digital advantage.
              </p>
            </div>

            {/* 4-Card Symmetric Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {/* CARD 1: FASTER */}
              <div className="bento-item bg-[#0a0a0a] text-white rounded-[2rem] overflow-hidden shadow-2xl group border border-white/10 flex flex-col justify-between">
                {/* Top Video Media */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={fasterVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Text Content */}
                <div className="p-7 sm:p-8 md:p-9 space-y-3 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-white/90">
                    <Zap className="w-5 h-5 text-white shrink-0" />
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                      We Learn Your Business First
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-normal">
                    Before we write a line of code, we sit with you. We ask the questions most agencies skip. We figure out what actually matters to your operations, not just what looks good on a homepage.
                  </p>
                </div>
              </div>

              {/* CARD 2: SEARCH */}
              <div className="bento-item bg-[#0a0a0a] text-white rounded-[2rem] overflow-hidden shadow-2xl group border border-white/10 flex flex-col justify-between">
                {/* Top Video Media */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={searchVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Text Content */}
                <div className="p-7 sm:p-8 md:p-9 space-y-3 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-white/90">
                    <Search className="w-5 h-5 text-white shrink-0" />
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                      Search & Discovery Driven
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-normal">
                    We index your business requirements and query patterns deeply, giving your clients lightning-fast search performance and intelligent discovery across every digital touchpoint.
                  </p>
                </div>
              </div>

              {/* CARD 3: SCALE */}
              <div className="bento-item bg-[#0a0a0a] text-white rounded-[2rem] overflow-hidden shadow-2xl group border border-white/10 flex flex-col justify-between">
                {/* Top Video Media */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={scaleVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Text Content */}
                <div className="p-7 sm:p-8 md:p-9 space-y-3 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-white/90">
                    <TrendingUp className="w-5 h-5 text-white shrink-0" />
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                      One Team, One Conversation.
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-normal">
                    No account managers relaying messages. No ticket systems. No waiting three days for a reply. You talk directly to the people building your project. Every time.
                  </p>
                </div>
              </div>

              {/* CARD 4: SECURITY */}
              <div className="bento-item bg-[#0a0a0a] text-white rounded-[2rem] overflow-hidden shadow-2xl group border border-white/10 flex flex-col justify-between">
                {/* Top Video Media */}
                <div className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] bg-black overflow-hidden flex items-center justify-center">
                  <video
                    src={securityVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Bottom Text Content */}
                <div className="p-7 sm:p-8 md:p-9 space-y-3 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-white/90">
                    <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">
                      Honest Scoping. Not Upselling.
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-normal">
                    Sometimes the answer is a simple website. Sometimes it is a custom application. We tell you what you actually need, not what makes us the most money.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FAQ SECTION (Hover Expandable Design in Primary Blue) */}
        <Faq />
      </div>
    </div>
  );
};

export default Index;
