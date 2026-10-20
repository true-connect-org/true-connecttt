import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Coins,
  ShieldCheck,
  Presentation,
  Headphones,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { PartnerForm } from "@/components/site/forms";
import { seo, partners } from "@/content/site";

const benefitIcons = [Coins, ShieldCheck, Presentation, Headphones];

const PartnerProgram = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useSeo({
    ...seo.partners,
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Partner with us", path: "/partners" },
    ]),
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 25;
    const rotateY = (x - xc) / 25;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    
    const isDark = card.classList.contains("dark-card");
    const baseBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(229,231,235,0.4)";
    card.style.background = `radial-gradient(180px circle at ${x}px ${y}px, #E6E84A 0%, ${baseBg} 100%)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    card.style.background = "";
  };

  useEffect(() => {
    if (isPrerender) return;

    const ctx = gsap.context(() => {
      // Hero text reveal — same pattern as WaveHero
      const tl = gsap.timeline({ delay: 0.1 });
      gsap.set(".pp-reveal-line", { transformPerspective: 800 });
      tl.fromTo(
        ".pp-reveal-line",
        { y: "110%", opacity: 0, rotateX: 10 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "rotateX,transformPerspective",
        }
      )
        .fromTo(
          ".pp-hero-sub",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".pp-hero-cta",
          { y: 16, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.3"
        );

      // Scroll-triggered reveals — same pattern as Careers/ContactUs
      gsap.utils.toArray<HTMLElement>(".pp-scroll-el").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Stagger for partner type cards
      gsap.utils.toArray<HTMLElement>(".pp-stagger-parent").forEach((parent) => {
        const items = parent.querySelectorAll(".pp-stagger-child");
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Process step connecting line animation
      const processLine = document.querySelector(".pp-process-line");
      if (processLine) {
        gsap.fromTo(
          processLine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#how-it-works",
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#121212] font-sans overflow-x-hidden">
      {/* ─── HERO SECTION (dark navy) ─── */}
      <section className="relative w-full bg-white p-1.5 sm:p-2.5 md:p-3 overflow-hidden">
        <div className="w-full max-w-[1560px] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center justify-center">
          {/* Subtle network grid background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {[...Array(12)].map((_, i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 8.33}%`} y1="0" x2={`${(i + 1) * 8.33}%`} y2="100%" stroke="white" strokeWidth="0.5" />
              ))}
              {[...Array(8)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="white" strokeWidth="0.5" />
              ))}
              {[[15, 25], [45, 60], [72, 18], [85, 75], [30, 80], [60, 40], [20, 55], [90, 30]].map(([cx, cy], i) => (
                <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="3" fill="#E6E84A" opacity="0.8" />
              ))}
              <line x1="15%" y1="25%" x2="45%" y2="60%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="45%" y1="60%" x2="72%" y2="18%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="72%" y1="18%" x2="85%" y2="75%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="30%" y1="80%" x2="60%" y2="40%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="20%" y1="55%" x2="45%" y2="60%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
            </svg>
          </div>
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0b1f3f] rounded-full blur-[140px] pointer-events-none opacity-80" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-[#122052] rounded-full blur-[120px] pointer-events-none opacity-60" />

          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center justify-center max-w-5xl text-center mx-auto">
            <div className="pp-hero-sub mb-5 text-center">
              <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] block text-center">PARTNER PROGRAM</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-5 text-center">
              <span className="block overflow-hidden py-1">
                <span className="pp-reveal-line block transform-gpu">Grow with</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="pp-reveal-line block transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">True Connect.</span>
              </span>
            </h1>

            <div className="overflow-hidden mb-8 w-full">
              <p className="pp-hero-sub text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-normal text-center mx-auto">{partners.sub}</p>
            </div>

            <div className="pp-hero-cta flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mx-auto">
              <a
                href="#apply"
                className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-7 py-3.5 rounded-full text-sm sm:text-base shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                {partners.button} <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                className="bg-black/40 hover:bg-black/70 text-white font-bold px-7 py-3.5 rounded-full text-sm sm:text-base border border-white/25 shadow-2xl transition-all duration-300 hover:scale-105 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                How it works <ChevronDown size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── THE IDEA — editorial split layout ─── */}
      <section className="w-full bg-[#F8F9FA] py-20 md:py-24 border-y border-gray-200/40 pp-scroll-el">
        <div className="container-tc">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 block">THE IDEA</span>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#121212] leading-[1.15] mb-6">
                You introduce. We handle everything else.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">{partners.sub}</p>
              <div className="inline-block py-3 px-6 bg-white border border-gray-200/60 rounded-lg shadow-sm">
                <p className="text-[#0b1f3f] text-sm font-semibold tracking-wide">{partners.note}</p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* What you get */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative p-[1.5px] rounded-[2rem] bg-gray-200 transition-all duration-300 ease-out"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, background 0.3s ease" }}
              >
                <div className="bg-white p-8 md:p-10 rounded-[1.95rem] h-full shadow-[0_20px_50px_rgba(0,0,0,0.03)]" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 block">What you get</span>
                  <h3 className="text-xl font-bold text-[#0b1f3f] mb-8">Rewards and support</h3>
                  <div className="space-y-4">
                    {partners.get.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-[#0b1f3f] shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What we handle */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative p-[1.5px] rounded-[2rem] bg-white/10 dark-card transition-all duration-300 ease-out"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out, background 0.3s ease" }}
              >
                <div className="bg-gradient-to-br from-[#0b1f3f] to-[#122052] p-8 md:p-10 rounded-[1.95rem] h-full shadow-[0_25px_60px_rgba(11,31,63,0.12)]" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">TRUE CONNECT handles</span>
                  <h3 className="text-xl font-bold text-white mb-8">Delivery from start to finish</h3>
                  <div className="space-y-4">
                    {["The pitch", "The proposal", "Delivery", "Support"].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-white/80 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 sm:mt-16 border-t border-gray-200/50 pt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 sm:px-8 py-3.5 sm:py-5 bg-white border border-gray-200/60 rounded-2xl sm:rounded-full text-[11px] sm:text-xs md:text-sm tracking-wider uppercase text-[#0b1f3f] shadow-sm">
              <span className="font-semibold">YOUR NETWORK</span>
              <span className="text-gray-300 font-light">+</span>
              <span className="font-semibold">TRUE CONNECT</span>
              <span className="text-gray-300 font-light">=</span>
              <span className="font-bold text-[#042d5b]">NEW BUSINESS OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHO IT IS FOR — dark navy section ─── */}
      <section className="bg-[#0b1f3f] py-16 md:py-20 border-t border-white/5">
        <div className="container-tc">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-4 block">ELIGIBILITY</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.2] max-w-2xl">Who it is for</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pp-stagger-parent">
            {partners.whoFor.map((type, i) => (
              <div
                key={type}
                className="pp-stagger-child bg-[#0b1f3f]/50 border border-white/10 hover:border-[#E6E84A]/40 rounded-2xl p-6 sm:p-8 transition-all duration-500 group cursor-default"
              >
                <span className="text-white/30 font-bold text-xs tracking-widest mb-4 block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#E6E84A] transition-colors">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS — timeline ─── */}
      <section id="how-it-works" className="py-16 md:py-20 scroll-mt-20">
        <div className="container-tc">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">THE PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#121212] leading-[1.2]">How it works</h2>
          </div>

          <div className="relative pp-stagger-parent">
            <div className="pp-process-line hidden lg:block absolute left-[2.5rem] top-0 bottom-0 w-px bg-[#0b1f3f]/20 origin-top" />
            <div className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {partners.steps.map((step, i) => (
                <div
                  key={step.title}
                  className="pp-stagger-child flex flex-col lg:flex-row lg:items-center gap-6 p-8 md:p-10 bg-white hover:bg-gray-50 transition-colors duration-300 group"
                >
                  <div className="shrink-0">
                    <span className={`w-16 h-16 rounded-full flex items-center justify-center text-base font-black border-2 transition-all duration-300 ${i === partners.steps.length - 1 ? "bg-[#0b1f3f] border-[#0b1f3f] text-white" : "bg-white border-gray-200 text-[#0b1f3f] group-hover:border-[#0b1f3f]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-2">{step.title}</h3>
                    <p className="text-gray-700 text-base font-medium leading-relaxed">{step.text.charAt(0).toUpperCase() + step.text.slice(1)}</p>
                  </div>
                  <ArrowUpRight size={20} className="shrink-0 text-gray-200 group-hover:text-[#0b1f3f] transition-colors duration-300 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHAT YOU GET — benefits grid ─── */}
      <section className="py-16 md:py-20">
        <div className="container-tc">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">WHY PARTNER</span>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#121212] leading-[1.2]">What you get</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pp-stagger-parent">
            {partners.get.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div key={b} className="pp-stagger-child group p-8 md:p-10 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0b1f3f] group-hover:border-[#0b1f3f] transition-all duration-300">
                      <Icon size={18} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-lg font-semibold text-[#121212]">{b}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PARTNER TERMS NOTE ─── */}
      <section className="bg-gray-50 py-14 md:py-16 pp-scroll-el">
        <div className="container-tc flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
            <Lock size={18} className="text-gray-500" />
          </div>
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 block mb-2">PARTNER-ONLY ACCESS</span>
            <p className="text-xl md:text-2xl font-medium text-[#121212] leading-snug">{partners.note}</p>
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM ─── */}
      <section id="apply" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="container-tc">
         <div className="max-w-4xl mx-auto pp-scroll-el">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">APPLY</span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#121212] leading-[1.2] mb-8">Apply to partner</h2>
          <div className="bg-white border border-gray-100 shadow-sm rounded-[2rem] p-6 md:p-10">
            <PartnerForm button={partners.button} />
          </div>
         </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative bg-white pb-10">
        <div className="container-tc">
          <div className="bg-[#0b1f3f] rounded-[2rem] md:rounded-[3rem] px-8 sm:px-14 py-12 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 max-w-2xl">
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] mb-4">READY TO START</p>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white leading-[1.2] mb-6">Grow with True Connect.</h2>
              <p className="text-white/60 text-base leading-relaxed">{partners.sub}</p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 shrink-0 w-full sm:w-auto">
              <a
                href="#apply"
                className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-8 sm:px-10 py-4 rounded-full text-sm sm:text-base shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto"
              >
                {partners.button} <ArrowRight size={18} />
              </a>
              <Link to="/contact" className="text-white/60 hover:text-white text-xs sm:text-sm font-medium text-center transition-colors duration-200 underline underline-offset-4 decoration-white/20">
                Questions? Contact our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerProgram;
