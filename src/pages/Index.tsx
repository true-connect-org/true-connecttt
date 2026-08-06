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
import { useScroll, useTransform, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const [vh, setVh] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800,
  );

  useEffect(() => {
    const handleResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroScale = useTransform(scrollY, [0, vh], [1, 0.8]);
  const heroRotate = useTransform(scrollY, [0, vh], [0, -5]);
  const heroOpacity = useTransform(scrollY, [0, vh], [1, 0.3]);

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
      className="bg-[#042d5b] min-h-screen text-tc-navy font-sans overflow-x-hidden"
      ref={containerRef}
    >
      {/* 1. WAVE HERO SECTION (Sticky & Animated) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
        <motion.div
          style={{ scale: heroScale, rotate: heroRotate, opacity: heroOpacity }}
          className="w-full h-full origin-top"
        >
          <WaveHero />
        </motion.div>
      </div>

      {/* Rest of the page (Slides over Hero) */}
      <div className="relative z-10 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[2rem] md:rounded-t-[3rem] overflow-hidden">
        {/* 2. PREMIUM LIGHT BENTO GRID - TRUST SECTION */}
        <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden bg-tc-lightgray">
          {/* Subtle grid pattern background */}
          <div
            className="absolute inset-0 z-0 opacity-[0.05] parallax-bg"
            style={{
              backgroundImage:
                "linear-gradient(rgba(11, 31, 63, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 31, 63, 1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20 bento-item">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-tc-navy mb-6 tracking-tight">
                Why Enterprises
                <br className="hidden sm:block" />
                Choose Us
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-tc-navy to-tc-deepblue mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 md:auto-rows-fr">
              {/* Bento Card 1 - Tall */}
              <div className="bento-item md:row-span-2 relative group rounded-2xl overflow-hidden bg-white border border-gray-200 p-6 md:p-10 hover:border-tc-navy/30 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-tc-navy/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-500 group-hover:bg-tc-navy/10" />
                <Layers
                  className="text-tc-navy mb-6 md:mb-10 w-12 h-12 md:w-16 md:h-16"
                  strokeWidth={1.5}
                />
                <h3 className="text-2xl md:text-3xl font-bold text-tc-navy mb-4 md:mb-6 leading-tight">
                  Global UAE
                  <br />
                  Expertise
                </h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6 md:mb-10">
                  With a dedicated partner team operating out of the UAE, our
                  major clients span successful, high-growth top brands across
                  the Emirates. We bring global, premium strategies directly to
                  your business.
                </p>
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <span className="text-tc-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-tc-navy" /> Proven
                    Track Record.
                  </span>
                </div>
              </div>

              {/* Bento Card 2 */}
              <div className="bento-item relative group rounded-2xl overflow-hidden bg-white border border-gray-200 p-6 md:p-10 hover:border-tc-navy/30 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-center">
                <Zap
                  className="text-tc-navy mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl md:text-2xl font-bold text-tc-navy mb-3 md:mb-4">
                  Innovative AI Experts
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Expertise in AI tools, SEO, rebranding, and digital marketing
                  strategies tailored to solve exact business problems and make
                  operations easier.
                </p>
              </div>

              {/* Bento Card 3 */}
              <div className="bento-item relative group rounded-2xl overflow-hidden bg-white border border-gray-200 p-6 md:p-10 hover:border-tc-navy/30 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-center">
                <Shield
                  className="text-tc-navy mb-4 md:mb-6 w-10 h-10 md:w-12 md:h-12"
                  strokeWidth={1.5}
                />
                <h3 className="text-xl md:text-2xl font-bold text-tc-navy mb-3 md:mb-4">
                  Reliance Jio Partner
                </h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  Backed by Reliance Jio's #1 network infrastructure across
                  India. Reliable foundations for your scaling business.
                </p>
              </div>

              {/* Bento Card 4 - Wide spanning */}
              <div className="bento-item md:col-span-2 relative group rounded-2xl overflow-hidden bg-tc-navy p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-lg relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                    Ready to dominate your market?
                  </h3>
                  <p className="text-white/80 text-base md:text-lg font-medium">
                    Join the enterprises scaling their operations with premium
                    digital growth strategies.
                  </p>
                </div>
                <Button
                  onClick={() => navigate("/contact-us")}
                  className="relative z-10 hidden md:flex bg-tc-yellow text-tc-navy hover:bg-tc-mutedyellow rounded-full w-16 h-16 items-center justify-center shadow-2xl transition-transform hover:scale-110"
                >
                  <MoveRight size={24} />
                </Button>
                {/* Abstract decoration */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

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
