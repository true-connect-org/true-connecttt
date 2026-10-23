import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import {
  BadgeCheck,
  MapPin,
  SatelliteDish,
  Building2,
  ArrowUpRight,
  Lightbulb,
  Search,
  MessagesSquare,
  Scale,
} from "lucide-react";
import { gsap } from "@/animations/gsap.config";
import WaveHero from "@/components/WaveHero";
import ServicesShowcase from "@/components/ServicesShowcase";
import Faq from "@/components/Faq";
import HomeEnquiry from "@/components/site/HomeEnquiry";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { localBusinessSchema, faqSchema } from "@/lib/schema";
import { home, seo, homeServiceCards } from "@/content/site";
import hubLogo from "@/assets/logo/true-connect-mark.svg";
import { serviceVisuals } from "@/components/site/serviceVisuals";

const whyVideos = ["/videos/FASTER.mp4", "/videos/SEARCH.mp4", "/videos/SCALE.mp4", "/videos/SECURITY.mp4"];
const whyIcons = [Lightbulb, Search, MessagesSquare, Scale];

/**
 * Decorative looping video. It loads only when it scrolls near the screen (saves mobile data),
 * plays muted and inline so it autoplays on iPhone and Android, and pauses when out of view.
 */
const AutoVideo = ({ src }: { src: string }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear((n) => n || entry.isIntersecting);
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "250px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.play().catch(() => {});
  }, [near]);

  return (
    <div ref={wrapRef} className="w-full h-full">
      {near && (
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out `}
        />
      )}
    </div>
  );
};

// Same width and side padding as the navbar, so every section lines up with it
const wrap = "container-tc";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);

  useSeo({
    ...seo.home,
    jsonLd: [localBusinessSchema, faqSchema(home.faq.items)],
  });

  useLayoutEffect(() => {
    if (isPrerender) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bento-header, .home-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 96%", toggleActions: "play none none none" } }
        );
      });

      // Children of [data-stagger] containers appear one after another as the container scrolls into view
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((box) => {
        gsap.fromTo(
          Array.from(box.children),
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "transform", scrollTrigger: { trigger: box, start: "top 88%", toggleActions: "play none none none" } }
        );
      });

      gsap.utils.toArray<HTMLElement>(".bento-left").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -60, y: 20, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.8, ease: "power4.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });

      gsap.utils.toArray<HTMLElement>(".bento-right").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 60, y: 20, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.8, delay: 0.08, ease: "power4.out", clearProps: "transform", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  // "From 0 to 100": a yellow dot runs along the timeline as you scroll down, and back again as you scroll up
  useEffect(() => {
    const track = journeyRef.current;
    if (isPrerender || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const stops = Array.from(track.querySelectorAll<HTMLElement>(".z-stop"));
    const setActive = (progress: number) => {
      stops.forEach((el, i) => {
        const on = progress >= i / (stops.length - 1) - 0.001;
        el.style.backgroundColor = on ? "#E6E84A" : "";
        el.style.transform = on ? "scale(1.08)" : "";
      });
    };

    const mm = gsap.matchMedia();
    const trigger = { trigger: track, start: "top 75%", end: "bottom 45%", scrub: 0.8 };

    // Desktop: horizontal, along the line between the first and last step
    mm.add("(min-width: 1024px)", () => {
      gsap.set(".z-dot", { opacity: 1, left: "10%", top: 28 });
      gsap.set(".z-fill", { width: 0 });
      gsap.to(".z-dot", { left: "90%", ease: "none", scrollTrigger: { ...trigger, onUpdate: (self) => setActive(self.progress) } });
      gsap.to(".z-fill", { width: "80%", ease: "none", scrollTrigger: trigger });
    });

    // Phones and tablets: vertical, from the first step circle to the last
    mm.add("(max-width: 1023px)", () => {
      // Measured on every refresh (fonts, images or resizing can move the steps), so the line always ends at "100"
      const centre = (el: HTMLElement) => {
        const box = track.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        return r.top - box.top + r.height / 2;
      };
      const first = () => centre(stops[0]);
      const last = () => centre(stops[stops.length - 1]);
      const t = { ...trigger, invalidateOnRefresh: true };
      gsap.fromTo(".z-dot", { opacity: 1, left: 28, top: first }, { top: last, ease: "none", scrollTrigger: { ...t, onUpdate: (self) => setActive(self.progress) } });
      gsap.fromTo(".z-fill", { top: first, height: 0 }, { top: first, height: () => last() - first(), ease: "none", scrollTrigger: t });
    });

    return () => {
      mm.revert();
      setActive(-1);
    };
  }, []);

  const { zeroToHundred: z, why } = home;
  const navyCards = why.cardStyle === "navy";

  return (
    <div className="bg-white min-h-screen text-tc-navy font-sans overflow-x-clip" ref={containerRef}>
      {/* 1. HERO */}
      <div className="w-full relative z-0">
        <WaveHero />
      </div>

      <div className="relative z-10 bg-white overflow-hidden">
        {/* 2. ABOUT US: centred statement, connected service ring, slim vision band */}
        <section className="py-14 md:py-20 bg-white">
          <div className={`${wrap} home-fade`}>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-lg text-left">
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden className="h-px w-8 bg-[#E6E84A]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">{home.intro.label}</span>
              </div>
              <h2 className="text-balance text-[1.6rem] font-semibold leading-[1.18] tracking-tight text-[#0b1f3f] sm:text-4xl lg:text-[2.25rem]">{home.intro.heading}</h2>
              <p className="mt-4 text-pretty text-[14px] leading-relaxed text-gray-500 sm:mt-5 sm:text-base">{home.intro.body}</p>

              <Link
                to="/services"
                className="group mx-auto mt-7 flex w-fit items-center gap-2 rounded-full bg-[#0b1f3f] lg:mx-0 px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#E6E84A] hover:text-[#0b1f3f]"
              >
                Explore our services <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              {/* Proof points */}
              <ul className="mt-7 grid grid-cols-2 gap-3 border-t border-gray-100 pt-6 text-[12px] leading-snug text-gray-500 sm:text-[13px]">
                <li className="flex items-start gap-2.5">
                  <BadgeCheck size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <span><span className="block font-semibold text-[#0b1f3f]">Authorized</span>Reliance Jio partner</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <span><span className="block font-semibold text-[#0b1f3f]">Technopark</span>Trivandrum, Kerala</span>
                </li>
              </ul>
            </div>

            {/* Ring: six services around the True Connect hub. Labels sit outside the ring so nothing overlaps. */}
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-0 py-12 shadow-[0_30px_60px_-30px_rgba(11,31,63,0.7)] sm:px-6 sm:py-14 md:rounded-[2.5rem]">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#1a4480]/35 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#1a4480]/25 blur-3xl" />
            <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[340px] lg:max-w-[360px]">
              <svg aria-hidden viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
                {/* inner ring */}
                <defs>
                  <filter id="tc-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.2" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <circle cx="200" cy="200" r="108" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.4" strokeDasharray="2 7" strokeLinecap="round" />
                {/* spokes with pulses running out from the logo */}
                {homeServiceCards.map((_, i) => {
                  const a = ((-90 + i * 60) * Math.PI) / 180;
                  const x = 200 + 108 * Math.cos(a);
                  const y = 200 + 108 * Math.sin(a);
                  return (
                    <g key={i}>
                      <line x1="200" y1="200" x2={x} y2={y} stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.2" />
                      <line x1="200" y1="200" x2={x} y2={y} stroke="#E6E84A" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="14 94" filter="url(#tc-glow)">
                        <animate attributeName="stroke-dashoffset" from="0" to="-108" dur="3.2s" repeatCount="indefinite" />
                      </line>
                    </g>
                  );
                })}
              </svg>

              {/* hub: the True Connect mark, with a yellow point running round its border */}
              <div className="absolute left-1/2 top-1/2 z-10 h-[4.5rem] w-[4.5rem] -translate-x-1/2 -translate-y-1/2 md:h-20 md:w-20 lg:h-[5.5rem] lg:w-[5.5rem]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0b1f3f] shadow-[0_0_0_5px_rgba(255,255,255,0.12),0_0_0_6px_rgba(255,255,255,0.22),0_0_40px_rgba(26,68,128,0.6)]">
                  <img src={hubLogo} alt="True Connect logo" className="h-full w-full scale-[1.12] object-cover" />
                </div>
                <div aria-hidden className="pointer-events-none absolute -inset-[7px] animate-spin rounded-full [animation-duration:3.5s] motion-reduce:animate-none">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 0deg, transparent 0 70%, rgba(230,232,74,0.9) 100%)",
                      WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
                      mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px))",
                    }}
                  />
                  <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-[3px] rounded-full bg-[#E6E84A] shadow-[0_0_10px_rgba(230,232,74,0.95)]" />
                </div>
              </div>

              {/* service nodes */}
              {homeServiceCards.map((sv, i) => {
                const a = ((-90 + i * 60) * Math.PI) / 180;
                const Icon = serviceVisuals[sv.id].icon;
                const side = ["top", "right", "right", "bottom", "left", "left"][i];
                const shortName: Record<string, string> = {
                  "social-media-marketing": "Social Media",
                  "web-app-development": "Web & Apps",
                  branding: "Branding",
                  "custom-software": "Software",
                  "ai-automation": "AI Automation",
                  "enterprise-internet": "Enterprise Internet",
                };
                const labelPos = {
                  top: "bottom-full mb-2.5 left-1/2 -translate-x-1/2 text-center whitespace-nowrap",
                  bottom: "top-full mt-2.5 left-1/2 -translate-x-1/2 text-center whitespace-nowrap",
                  right: "left-full ml-3 top-1/2 -translate-y-1/2 text-left w-14 sm:w-20",
                  left: "right-full mr-3 top-1/2 -translate-y-1/2 text-right w-14 sm:w-20",
                }[side];
                return (
                  <Link
                    key={sv.id}
                    to={sv.to}
                    aria-label={sv.title}
                    className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${50 + 27 * Math.cos(a)}%`, top: `${50 + 27 * Math.sin(a)}%` }}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#16305c] text-white shadow-[0_10px_24px_-8px_rgba(0,0,0,0.6)] ring-1 ring-white/25 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f] sm:h-12 sm:w-12 lg:h-14 lg:w-14">
                      <Icon strokeWidth={1.6} className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
                    </span>
                    <span className={`absolute text-[10px] font-semibold leading-tight tracking-tight text-white/90 sm:text-xs lg:text-[13px] ${labelPos}`}>{shortName[sv.id] ?? sv.title}</span>
                  </Link>
                );
              })}
            </div>
            </div>

            </div>
          </div>
        </section>

        {/* 3. SERVICES */}
        <ServicesShowcase />

        {/* 4. FROM 0 TO 100 — navy feature banner */}
        <section className="container-tc my-10 md:my-14 home-fade">
          <div className="bg-[#0b1f3f] rounded-[1.75rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">OUR APPROACH</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.15] mb-10 md:mb-14 max-w-3xl">{z.heading}</h2>

              <div ref={journeyRef} className="relative">
                {/* Track */}
                <div className="lg:hidden absolute top-[28px] bottom-[28px] left-[27px] w-[2px] bg-white/15 z-0" />
                <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-white/15 z-0" />
                {/* Yellow progress line and the running dot (animated on scroll) */}
                <div className="z-fill absolute z-[1] bg-[#E6E84A] left-[27px] top-[28px] w-[2px] h-0 lg:left-[10%] lg:h-[2px] lg:w-0" />
                <div className="z-dot absolute z-[5] w-4 h-4 rounded-full bg-[#E6E84A] shadow-[0_0_18px_rgba(230,232,74,0.9)] opacity-0 -translate-x-1/2 -translate-y-1/2" />

                <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 md:gap-10 relative z-10">
                  {z.stops.map((s) => (
                    <div key={s.value} className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0">
                      <div className="z-stop w-14 h-14 rounded-full bg-white text-[#0b1f3f] flex items-center justify-center shadow-lg lg:mb-6 border-4 border-[#0b1f3f] shrink-0 z-10 text-base font-bold transition-all duration-300">
                        {s.value}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5">{s.title}</h3>
                        <p className="text-white/60 text-sm leading-relaxed lg:max-w-[200px]">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-10 md:mt-14 text-white/80 text-base md:text-lg max-w-2xl">{z.line}</p>
            </div>
          </div>
        </section>

        {/* 6. WHY TRUE CONNECT — video bento */}
        <section className="py-12 md:py-16 relative bg-white">
          <div className={`${wrap} relative z-10`}>
            <div className="mb-12 md:mb-14 text-center max-w-3xl mx-auto bento-header">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#121212] leading-[1.1]">{why.heading}</h2>
              <p className="mt-3 text-gray-500 text-[13px] sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{why.sub}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {why.items.map((item, i) => {
                const Icon = whyIcons[i];
                return (
                  <div
                    key={item.title}
                    className={`${i % 2 === 0 ? "bento-left" : "bento-right"} group card-lift-dark relative isolate h-[340px] sm:h-[380px] md:h-[430px] rounded-[2rem] overflow-hidden text-white shadow-2xl border border-white/10 ${
                      navyCards ? "bg-gradient-to-b from-[#0b1f3f] via-[#0b1f3f] to-[#153460]" : "bg-black"
                    }`}
                  >
                    {/* The rotating video fills the card, so the object stays in the centre. Decorative; loads when near the screen. */}
                    <div className={`absolute inset-0 -translate-y-6 md:-translate-y-10 ${navyCards ? "mix-blend-screen opacity-90 [filter:brightness(0.95)_contrast(1.18)_saturate(0.8)]" : ""}`}>
                      <AutoVideo src={whyVideos[i]} />
                    </div>

                    {/* Dark vignette: keeps the corners black and the highlights subtle */}
                    {navyCards && <div aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,transparent_35%,rgba(0,0,0,0.6)_100%)]" />}

                    {/* Soft shade at the bottom so the text stays readable */}
                    <div className={`absolute inset-x-0 bottom-0 h-3/5 pointer-events-none bg-gradient-to-t ${navyCards ? "from-black via-black/80" : "from-black via-black/70"} to-transparent`} />

                    {/* Title and description sit at the bottom; the description appears on hover (or tap on phones) */}
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                      <div className="flex items-center gap-3 text-white/90">
                        <Icon className="w-5 h-5 text-white shrink-0" />
                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-white">{item.title}</h3>
                      </div>
                      <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-gray-300 text-[13px] sm:text-sm leading-relaxed font-normal md:whitespace-nowrap">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10. CONNECTIVITY STRIP: the whole card opens the Enterprise Internet page */}
        <section className="py-8 md:py-10 bg-white">
          <div className={`${wrap} home-fade`}>
            <Link
              to={home.connectivityStrip.link.to}
              aria-label={`${home.connectivityStrip.link.label}: open the page`}
              className="group relative block overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] p-5 text-white sm:p-6 md:p-9"
            >
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/30 blur-3xl" />
              <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="text-center lg:col-span-7 lg:text-left">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">Enterprise internet</p>
                  <h3 className="mt-3 text-[clamp(1.15rem,5.6vw,1.4rem)] font-extrabold leading-[1.1] tracking-tight sm:text-3xl md:text-[2.6rem]">True Connect Internet</h3>
                  <p className="mx-auto mt-3 max-w-xl text-[12.5px] leading-relaxed text-white/70 sm:mt-4 sm:text-base lg:mx-0 lg:max-w-2xl">{home.connectivityStrip.text}</p>
                  <span className="mt-5 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold sm:px-6 sm:py-3 sm:text-sm text-[#0b1f3f] transition-colors duration-300 group-hover:bg-[#E6E84A]">
                    {home.connectivityStrip.link.label}
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <div className="text-center lg:col-span-5">
                  {/* Dedicated line: office to Jio network, with a signal running along it */}
                  <div className="relative mb-5 flex items-center justify-between sm:mb-6">
<span className="group/sat relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-all duration-300 hover:scale-110 hover:border-[#E6E84A]/60 hover:bg-white/20 hover:shadow-[0_0_24px_rgba(255,255,255,0.35)]">
                      <span className="absolute inset-0 rounded-full border border-white/40 opacity-0 group-hover/sat:animate-ping group-hover/sat:opacity-100" />
                      <SatelliteDish size={21} strokeWidth={1.6} className="transition-all duration-500 group-hover/sat:-rotate-12 group-hover/sat:text-[#E6E84A]" />
                    </span>
                    <span className="relative mx-1 h-px flex-1 overflow-hidden bg-white/20">
                      <span className="absolute inset-y-0 w-1/3 animate-[tc-line_2.4s_linear_infinite] bg-gradient-to-r from-transparent via-[#E6E84A] to-transparent" />
                    </span>
                    <span className="group/ent relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#E6E84A] text-[#0b1f3f] shadow-[0_0_20px_rgba(230,232,74,0.55)] transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)]">
                      <span className="absolute inset-0 rounded-full border border-[#E6E84A] opacity-0 group-hover/ent:animate-ping group-hover/ent:opacity-100" />
                      <Building2 size={21} strokeWidth={1.8} className="transition-transform duration-500 group-hover/ent:-translate-y-0.5 group-hover/ent:scale-110" />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 sm:p-5">
                      <p className="text-[clamp(1.35rem,7vw,1.875rem)] font-extrabold leading-none">99%</p>
                      <p className="mt-2 text-xs text-white/60">Uptime SLA</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 sm:p-5">
                      <p className="whitespace-nowrap text-[clamp(1.35rem,7vw,1.875rem)] font-extrabold leading-none">60 min</p>
                      <p className="mt-2 text-xs text-white/60">Site visit</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] text-white/50 sm:text-xs">Authorized Reliance Jio channel partner</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* 11. FAQ */}
        <Faq />

        {/* 12. CONTACT */}
        <HomeEnquiry />
      </div>
    </div>
  );
};

export default Index;
