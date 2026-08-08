import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Network,
  Monitor,
  Smartphone,
  Zap,
  Target,
  Server,
  Search,
  Palette,
  Code2,
  Rocket,
  ArrowRight,
  Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   SERVICE DATA
   ──────────────────────────────── */
const services = [
  {
    id: "01",
    title: "Enterprise Internet",
    subtitle: "CONNECTIVITY",
    description:
      "High-speed leased line & dedicated enterprise internet powered by robust tier-1 infrastructure with guaranteed 99.99% uptime.",
    highlights: [
      "Dedicated 1:1 leased line bandwidth",
      "Redundant optical fiber architecture",
      "SLA guaranteed 99.99% uptime",
      "24/7 proactive network monitoring",
    ],
    icon: Network,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "02",
    title: "Website Development",
    subtitle: "DESIGN & ENGINEERING",
    description:
      "Custom, high-performance websites engineered for speed, SEO, and conversions. Tailored digital experiences that elevate your brand on every screen.",
    highlights: [
      "Custom responsive UI/UX design",
      "High-speed Next.js / React frontend",
      "SEO & Core Web Vitals optimization",
      "Content Management Systems",
    ],
    icon: Monitor,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "03",
    title: "App Development",
    subtitle: "MOBILE & CROSS-PLATFORM",
    description:
      "Native & cross-platform mobile apps with polished UIs, smooth navigation, and real backend connectivity — designed for the people who will actually use them.",
    highlights: [
      "Native iOS and Android apps",
      "Cross-platform builds (React Native)",
      "Account management & auth flows",
      "App store submission support",
    ],
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "04",
    title: "AI & Automation",
    subtitle: "INTELLIGENT SYSTEMS",
    description:
      "Cut manual work and supercharge productivity by deploying autonomous AI agents, machine learning models, and smart automated pipelines into your existing stack.",
    highlights: [
      "Bespoke LLM & AI agent integration",
      "Predictive analytics dashboards",
      "Automated customer support bots",
      "Workflow & process automation",
    ],
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "05",
    title: "Brand Strategy",
    subtitle: "IDENTITY & MARKETING",
    description:
      "Position your brand to win. We blend strategic positioning, visual identity systems, and multi-channel digital campaigns that make your market take notice.",
    highlights: [
      "Complete visual identity & style guides",
      "Brand messaging & positioning",
      "Digital marketing campaign design",
      "Go-to-market execution plans",
    ],
    icon: Target,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=900",
  },
  {
    id: "06",
    title: "Connectivity",
    subtitle: "INFRASTRUCTURE",
    description:
      "Enterprise-grade networking and broadband solutions backed by Reliance Jio tier-1 infrastructure. Guaranteed low-latency dedicated lines for your offices.",
    highlights: [
      "Enterprise Leased Line (1:1 bandwidth)",
      "Business Broadband with static IP",
      "Managed SD-WAN networks",
      "Zero-downtime installation",
    ],
    icon: Server,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=900",
  },
];

/* ────────────────────────────────
   PROCESS STEPS
   ──────────────────────────────── */
const processSteps = [
  { step: "01", title: "Discovery", desc: "Listen, map, and define the right scope.", icon: Search },
  { step: "02", title: "Design", desc: "Wireframes, prototypes, and visual systems.", icon: Palette },
  { step: "03", title: "Build", desc: "Modern stack, clean architecture, rigorous QA.", icon: Code2 },
  { step: "04", title: "Launch", desc: "Deploy, monitor, and post-launch support.", icon: Rocket },
];

/* ────────────────────────────────
   SERVICES PAGE
   ──────────────────────────────── */
const Services = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".svc-hero-el",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );

      // Cinematic Left/Right Reveal Animations for Service Cards
      gsap.utils.toArray<HTMLElement>(".svc-card-row").forEach((row) => {
        const leftEl = row.querySelector(".svc-card-left");
        const rightEl = row.querySelector(".svc-card-right");

        if (leftEl) {
          gsap.fromTo(
            leftEl,
            { x: -100, y: 30, opacity: 0, scale: 0.95 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power4.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (rightEl) {
          gsap.fromTo(
            rightEl,
            { x: 100, y: 30, opacity: 0, scale: 0.95 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.7,
              delay: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: row,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });

      // Cinematic Scale & Slide Fade-in for sections
      gsap.utils.toArray<HTMLElement>(".svc-scroll-in").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Force recalculate scroll trigger positions
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen text-[#2d2a26] font-sans pt-28 md:pt-36 pb-0 overflow-x-hidden"
    >
      {/* ─── 1. HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-14">
        <div className="max-w-4xl">
          <span className="svc-hero-el text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            WHAT WE BUILD
          </span>
          <h1 className="svc-hero-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#2d2a26] leading-[1.1] mb-8">
            Enterprise services designed for ambitious growth.
          </h1>
          <p className="svc-hero-el text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
            From dedicated connectivity to custom software and AI — we deliver
            the full stack of technology services that power modern businesses.
          </p>
          <div className="svc-hero-el flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Talk to the studio <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => navigate("/case-studies")}
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
            >
              View case studies
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. SERVICES — ALTERNATING EDITORIAL ROWS ─── */}
      <section className="mb-10 md:mb-12">
        {/* Section divider line */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
          <div className="svc-scroll-in flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              OUR SERVICES · 06
            </span>
            <span className="text-[11px] font-semibold text-gray-400 hidden sm:inline">
              Full-stack enterprise technology
            </span>
          </div>
        </div>

        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;

          return (
            <div
              key={service.id}
              className="svc-card-row max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-14 last:mb-0"
            >
              <div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-10 lg:gap-16 items-center`}
              >
                {/* IMAGE SIDE */}
                <div className={`w-full lg:w-[55%] relative group ${isEven ? "svc-card-left" : "svc-card-right"}`}>
                  <div className="relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[220px] sm:h-[300px] md:h-[420px] object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating oversized number */}
                  <div
                    className={`absolute -bottom-6 ${
                      isEven ? "-right-3 md:-right-6" : "-left-3 md:-left-6"
                    } text-[120px] md:text-[180px] font-bold text-[#0b1f3f]/[0.06] leading-none select-none pointer-events-none z-0`}
                  >
                    {service.id}
                  </div>
                </div>

                {/* CONTENT SIDE — Compact mobile height */}
                <div className={`w-full lg:w-[45%] relative z-10 ${isEven ? "svc-card-right" : "svc-card-left"}`}>
                  {/* Service category tag */}
                  <div className="flex items-center gap-2.5 mb-3 md:mb-5">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-md">
                      <Icon size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                      {service.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-semibold text-[#2d2a26] tracking-tight leading-[1.15] mb-3 md:mb-5">
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-8">
                    {service.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 md:space-y-3 mb-5 md:mb-8">
                    {service.highlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700"
                      >
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0b1f3f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} className="text-[#0b1f3f]" strokeWidth={3} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => navigate("/contact-us")}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b1f3f] hover:text-[#122a52] transition-colors group/btn"
                  >
                    Get started
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b1f3f] group-hover/btn:bg-[#122a52] text-white flex items-center justify-center transition-all group-hover/btn:scale-110 shadow-sm">
                      <ArrowRight size={13} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Row divider (except last) */}
              {index < services.length - 1 && (
                <div className="mt-10 md:mt-14 border-b border-gray-100" />
              )}
            </div>
          );
        })}
      </section>

      {/* ─── 3. NAVY FEATURE BANNER ─── */}
      <section className="svc-scroll-in mx-3 sm:mx-6 md:mx-8 mb-10 md:mb-14">
        <div className="max-w-[1400px] mx-auto bg-[#0b1f3f] rounded-[1.75rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 lg:p-20 relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-5%] w-[30%] h-[60%] bg-white/3 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 sm:mb-6 block">
              NOT SURE WHERE TO START?
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.15] mb-4 sm:mb-6">
              Tell us the problem.{" "}
              <span className="text-white/60">We'll design the solution.</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-10 max-w-xl">
              Every project starts with a conversation. Share your goals, your
              constraints, and your ambitions — our team will map the fastest
              route from idea to launch.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-white hover:bg-gray-100 text-[#0b1f3f] font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Talk to the studio <ArrowUpRight size={15} />
              </button>
              <button
                onClick={() =>
                  window.open(
                    "https://wa.me/918848817833?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20services.",
                    "_blank"
                  )
                }
                className="border border-white/25 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300"
              >
                WhatsApp us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. OUR PROCESS — HORIZONTAL TIMELINE ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-16">
        <div className="svc-scroll-in max-w-3xl mb-10 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
            HOW WE WORK
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
            Four steps. Zero guesswork.
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            A proven process refined across dozens of enterprise projects.
          </p>
        </div>

        {/* Timeline */}
        <div className="svc-scroll-in relative">
          {/* Vertical Connecting Line (Mobile) */}
          <div className="lg:hidden absolute top-[28px] bottom-[28px] left-[27px] w-[2px] bg-gray-200 z-0" />
          
          {/* Horizontal Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gray-200 z-0" />

          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
            {processSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.step}
                  className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0"
                >
                  {/* Circle with icon */}
                  <div className="w-14 h-14 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-lg lg:mb-6 border-4 border-white shrink-0 z-10">
                    <StepIcon size={20} strokeWidth={1.75} />
                  </div>

                  <div className="flex flex-col items-start lg:items-center">
                    {/* Step label */}
                    <span className="text-[10px] font-bold text-[#0b1f3f]/50 tracking-[0.25em] uppercase mb-1 lg:mb-2">
                      STEP {step.step}
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2d2a26] mb-1.5 lg:mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-full lg:max-w-[220px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. BOTTOM CTA ─── */}
      <section className="border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-16 text-center">
          <div className="svc-scroll-in max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
              YOUR PROJECT STARTS HERE
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              Let's build something ambitious.
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
              We design the customer-facing experience and the operational system
              behind it — so the result is persuasive on day one and useful long
              after launch.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Talk to the studio <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => navigate("/case-studies")}
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              >
                Explore our work
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
