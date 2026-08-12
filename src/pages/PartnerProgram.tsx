import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  Network,
  Handshake,
  TrendingUp,
  Users,
  Briefcase,
  ChevronDown,
  Lock,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   WHO CAN PARTNER DATA
   ──────────────────────────────── */
const partnerTypes = [
  {
    num: "01",
    title: "IT & Technology Companies",
    desc: "Technology firms and MSPs with business clients who need enterprise connectivity.",
  },
  {
    num: "02",
    title: "System Integrators",
    desc: "Networking and infrastructure professionals already working with enterprise clients.",
  },
  {
    num: "03",
    title: "Business Consultants",
    desc: "Advisors and strategy professionals with direct access to decision makers.",
  },
  {
    num: "04",
    title: "Entrepreneurs",
    desc: "Founders and business builders with strong industry networks and connections.",
  },
  {
    num: "05",
    title: "Sales Experts",
    desc: "Experienced B2B sales professionals who understand enterprise needs.",
  },
  {
    num: "06",
    title: "Content Creators & Connectors",
    desc: "Business-focused creators and connectors with access to relevant audiences.",
  },
];

/* ────────────────────────────────
   HOW IT WORKS STEPS
   ──────────────────────────────── */
const steps = [
  {
    num: "01",
    title: "APPLY",
    desc: "Submit your partner application. Our team reviews every applicant personally.",
  },
  {
    num: "02",
    title: "GET APPROVED",
    desc: "TRUE CONNECT reviews your profile and activates your partnership with full onboarding.",
  },
  {
    num: "03",
    title: "REFER",
    desc: "Introduce businesses that may need enterprise connectivity solutions.",
  },
  {
    num: "04",
    title: "WE CLOSE",
    desc: "Our team handles qualification, quotation, technical coordination and closure.",
  },
  {
    num: "05",
    title: "EARN",
    desc: "Once conditions are met, you receive your agreed partner incentive.",
  },
];

/* ────────────────────────────────
   WHY PARTNER BENEFITS
   ──────────────────────────────── */
const benefits = [
  {
    icon: TrendingUp,
    title: "Additional Revenue Opportunity",
    desc: "Create an additional income stream from business introductions within your existing network.",
  },
  {
    icon: ShieldCheck,
    title: "No Technical Infrastructure",
    desc: "TRUE CONNECT provides the full service. You never need to handle technical execution.",
  },
  {
    icon: Zap,
    title: "No Sales Operations to Build",
    desc: "Our team manages qualification, quotation and closing. Zero overhead for you.",
  },
  {
    icon: Network,
    title: "Expand Your Business Network",
    desc: "Build relationships across our partner ecosystem and create compounding opportunities.",
  },
];

/* ────────────────────────────────
   PARTNER PROGRAM PAGE
   ──────────────────────────────── */
const PartnerProgram = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who can become a TRUE CONNECT Partner?",
      a: "Our program is open to IT companies, system integrators, business consultants, entrepreneurs, sales professionals, content creators, and individuals with strong business networks.",
    },
    {
      q: "Do I need to be a telecom company?",
      a: "No. You need access to businesses that may benefit from enterprise connectivity solutions. Our team handles all technical and commercial aspects.",
    },
    {
      q: "Do I need technical knowledge?",
      a: "No technical knowledge is required. You create the introduction — our experts handle everything from technical assessment to solution design.",
    },
    {
      q: "How do I refer a business?",
      a: "Once approved, you receive dedicated partner onboarding and clear referral guidelines through our partner documentation.",
    },
    {
      q: "Who handles the customer?",
      a: "You make the introduction. TRUE CONNECT manages qualification, quotation, technical coordination, and customer closure.",
    },
    {
      q: "How does the partner incentive work?",
      a: "Detailed commercial structures are provided confidentially upon partner approval. We do not publish commission rates on this public page.",
    },
    {
      q: "Can I refer multiple businesses?",
      a: "Yes. Many partners have multiple relationships across their networks. A single partnership can generate multiple qualified opportunities.",
    },
    {
      q: "Is there a fee to become a partner?",
      a: "No. There are no fees associated with joining the TRUE CONNECT Partner Program.",
    },
    {
      q: "What happens after I apply?",
      a: "Our team reviews your application, then contacts you to discuss your profile and the next steps toward partner onboarding.",
    },
  ];

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
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero text reveal — same pattern as WaveHero
      const tl = gsap.timeline({ delay: 0.1 });
      gsap.set(".pp-reveal-line", { transformPerspective: 800 });
      tl.fromTo(
        ".pp-reveal-line",
        { y: "110%", opacity: 0, rotateX: 10 },
        { y: "0%", opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.14, ease: "power4.out" }
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen text-[#121212] font-sans overflow-x-hidden"
    >
      {/* ─── HERO SECTION (dark navy, matches WaveHero aesthetic) ─── */}
      <section className="relative w-full h-screen bg-white p-1.5 sm:p-2.5 md:p-3 flex items-center justify-center overflow-hidden font-satoshi">
        <div className="w-full max-w-[1560px] h-full rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] flex items-center px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 lg:py-16">
          
          {/* Subtle Network Grid Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07]">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Grid lines */}
              {[...Array(12)].map((_, i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 8.33}%`} y1="0" x2={`${(i + 1) * 8.33}%`} y2="100%" stroke="white" strokeWidth="0.5" />
              ))}
              {[...Array(8)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 12.5}%`} x2="100%" y2={`${(i + 1) * 12.5}%`} stroke="white" strokeWidth="0.5" />
              ))}
              {/* Network nodes */}
              {[[15,25],[45,60],[72,18],[85,75],[30,80],[60,40],[20,55],[90,30]].map(([cx,cy], i) => (
                <circle key={i} cx={`${cx}%`} cy={`${cy}%`} r="3" fill="#E6E84A" opacity="0.8" />
              ))}
              {/* Connection lines */}
              <line x1="15%" y1="25%" x2="45%" y2="60%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="45%" y1="60%" x2="72%" y2="18%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="72%" y1="18%" x2="85%" y2="75%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="30%" y1="80%" x2="60%" y2="40%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
              <line x1="20%" y1="55%" x2="45%" y2="60%" stroke="#E6E84A" strokeWidth="0.8" strokeDasharray="6 4" />
            </svg>
          </div>

          {/* Radial glow */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#0b1f3f] rounded-full blur-[140px] pointer-events-none opacity-80" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] bg-[#122052] rounded-full blur-[120px] pointer-events-none opacity-60" />

          {/* Hero Content */}
          <div className="relative z-10 w-full flex flex-col items-start justify-center h-full max-w-4xl text-left">
            {/* Eyebrow */}
            <div className="pp-hero-sub mb-5">
              <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em]">
                TRUE CONNECT PARTNER PROGRAM
              </span>
            </div>

            {/* Headline — masked line-by-line reveal like WaveHero */}
            <h1 className="font-satoshi text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-5">
              <span className="block overflow-hidden py-1">
                <span className="pp-reveal-line block transform-gpu">
                  Grow Your Network.
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="pp-reveal-line block transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                  Create Opportunities.
                </span>
              </span>
            </h1>

            {/* Sub text */}
            <div className="overflow-hidden mb-4">
              <p className="pp-hero-sub font-satoshi text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-lg font-normal">
                Become a TRUE CONNECT Partner and create new business opportunities through your network.
              </p>
            </div>
            <div className="overflow-hidden mb-8">
              <p className="pp-hero-sub font-satoshi text-white/55 text-xs sm:text-sm leading-relaxed max-w-lg font-normal">
                Whether you're a company, entrepreneur, sales professional, consultant, content creator or business connector — if you have access to businesses that may need enterprise connectivity, we'd like to hear from you.
              </p>
            </div>

            {/* CTAs */}
            <div className="pp-hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 font-satoshi w-auto">
              <button
                onClick={() => navigate("/apply-partner")}
                className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-7 py-3.5 rounded-full text-xs sm:text-base shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi w-auto flex items-center gap-2"
              >
                Apply as a Partner <ArrowRight size={16} />
              </button>
              <button
                onClick={() =>
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-black/40 hover:bg-black/70 text-white font-bold px-7 py-3.5 rounded-full text-xs sm:text-base border border-white/25 shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer font-satoshi w-auto flex items-center gap-2"
              >
                How It Works <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. THE IDEA — Editorial split layout ─── */}
      <section className="w-full bg-[#F8F9FA] py-24 md:py-32 border-y border-gray-200/40 pp-scroll-el">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 block">
                THE IDEA
              </span>
              <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#121212] leading-[1.15] mb-6">
                Your Network Can Create More Opportunities.
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
                Businesses already have relationships with other businesses. The TRUE CONNECT Partner Program gives those relationships a structured way to create new business opportunities.
              </p>
              <div className="inline-block py-3 px-6 bg-white border border-gray-200/60 rounded-lg shadow-sm">
                <p className="text-[#0b1f3f] text-sm font-semibold tracking-wide">
                  You introduce. We handle the rest.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Your Advantage Card */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative p-[1.5px] rounded-[2rem] bg-gray-200 transition-all duration-300 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.15s ease-out, background 0.3s ease"
                }}
              >
                <div className="bg-white p-8 md:p-10 rounded-[1.95rem] h-full flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.03)]" style={{ transform: "translateZ(20px)" }}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 block">Your Advantage</span>
                    <h3 className="text-xl font-bold text-[#0b1f3f] mb-8">Relationships & Access</h3>
                    <div className="space-y-4">
                      {[
                        "Business relationships",
                        "Customer access",
                        "Local & industry network",
                        "Trusted personal connections"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-[#0b1f3f] shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* TRUE CONNECT Advantage Card */}
              <div 
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative p-[1.5px] rounded-[2rem] bg-white/10 dark-card transition-all duration-300 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 0.15s ease-out, background 0.3s ease"
                }}
              >
                <div className="bg-gradient-to-br from-[#0b1f3f] to-[#122052] p-8 md:p-10 rounded-[1.95rem] h-full flex flex-col justify-between shadow-[0_25px_60px_rgba(11,31,63,0.12)]" style={{ transform: "translateZ(20px)" }}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-6 block">TRUE CONNECT Advantage</span>
                    <h3 className="text-xl font-bold text-white mb-8">Solutions & Execution</h3>
                    <div className="space-y-4">
                      {[
                        "Enterprise solutions portfolio",
                        "Dedicated sales team",
                        "Full technical expertise",
                        "Customer coordination",
                        "Service activation & support"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className="text-white/80 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-white/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Formula Box */}
          <div className="mt-20 border-t border-gray-200/50 pt-16 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-6 sm:px-8 py-4 sm:py-5 bg-white border border-gray-200/60 rounded-full font-satoshi text-xs sm:text-sm tracking-wider uppercase text-[#0b1f3f] shadow-sm">
              <span className="font-semibold">YOUR NETWORK</span>
              <span className="text-gray-300 font-light">+</span>
              <span className="font-semibold">TRUE CONNECT</span>
              <span className="text-gray-300 font-light">=</span>
              <span className="font-bold text-[#042d5b]">NEW BUSINESS OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. WHO CAN PARTNER — Dark navy section ─── */}
      <section className="bg-[#0b1f3f] py-16 md:py-20 px-5 sm:px-8 md:px-12 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/30 mb-4 block">
              ELIGIBILITY
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-white leading-[1.2] mb-5 max-w-2xl">
              Built for People Who Already Know Business.
            </h2>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-lg">
              You don't need to be a telecom company. You need relationships that can create relevant business opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pp-stagger-parent">
            {partnerTypes.map((type, i) => (
              <div
                key={i}
                className="pp-stagger-child bg-[#0b1f3f]/50 border border-white/5 hover:border-[#E6E84A]/30 rounded-2xl p-6 sm:p-8 transition-all duration-500 group cursor-default hover:bg-white/[0.01]"
              >
                <span className="text-white/30 font-bold text-xs tracking-widest mb-4 block">{type.num}</span>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2 group-hover:text-[#E6E84A] transition-colors">
                  {type.title}
                </h3>
                <p className="text-white/40 text-xs sm:text-sm leading-relaxed font-light">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. HOW IT WORKS — Premium timeline ─── */}
      <section id="how-it-works" className="py-16 md:py-20 px-5 sm:px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              THE PROCESS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#121212] leading-[1.2]">
              Simple for You. Powerful for Both.
            </h2>
          </div>

          <div className="relative pp-stagger-parent">
            {/* Vertical connecting line on desktop */}
            <div className="hidden lg:block absolute left-[2.5rem] top-0 bottom-0 w-px bg-gray-100" />

            <div className="space-y-0 divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="pp-stagger-child flex flex-col lg:flex-row lg:items-center gap-6 p-8 md:p-10 bg-white hover:bg-gray-50 transition-colors duration-300 group"
                >
                  <div className="shrink-0">
                    <span className={`w-16 h-16 rounded-full flex items-center justify-center text-base font-black border-2 transition-all duration-300 ${i === 4 ? "bg-[#0b1f3f] border-[#0b1f3f] text-white" : "bg-white border-gray-200 text-[#0b1f3f] group-hover:border-[#0b1f3f]"}`}>
                      {step.num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-2">{step.title}</h3>
                    <p className="text-gray-700 text-base font-medium leading-relaxed">{step.desc}</p>
                  </div>
                  <ArrowUpRight size={20} className="shrink-0 text-gray-200 group-hover:text-[#0b1f3f] transition-colors duration-300 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WHAT YOU DO vs WHAT WE DO — Two column editorial ─── */}
      <section className="bg-gray-50 py-16 md:py-20 px-5 sm:px-8 md:px-12 pp-scroll-el">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              CLEAR RESPONSIBILITIES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#121212] leading-[1.2]">
              One Partnership. Two Clear Roles.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* YOU Column */}
            <div className="bg-white p-10 md:p-14">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl md:text-4xl font-medium text-[#121212]">You</h3>
              </div>
              <p className="text-[#0b1f3f] font-semibold text-base mb-10">Create the opportunity.</p>
              <div className="space-y-5">
                {[
                  "Identify potential businesses",
                  "Make the introduction",
                  "Share basic customer information",
                  "Submit qualified opportunities",
                  "Maintain the relationship where appropriate",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-gray-50 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-gray-300 mt-0.5 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-gray-700 text-sm font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TRUE CONNECT Column */}
            <div className="bg-[#0b1f3f] p-10 md:p-14">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-3xl md:text-4xl font-medium text-white">TRUE CONNECT</h3>
              </div>
              <p className="text-white/90 font-semibold text-base mb-10">We take it forward.</p>
              <div className="space-y-5">
                {[
                  "Understand the requirement",
                  "Qualify the opportunity",
                  "Prepare the solution",
                  "Handle quotation",
                  "Coordinate technical requirements",
                  "Manage customer closure",
                  "Coordinate service activation",
                  "Process partner incentive",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-white/20 mt-0.5 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-white/75 text-sm font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. WHY PARTNER — Benefits grid, same style as Careers culture section ─── */}
      <section className="py-16 md:py-20 px-5 sm:px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="pp-scroll-el max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              WHY PARTNER
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-medium tracking-tight text-[#121212] leading-[1.2]">
              Turn Relationships Into Opportunities.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pp-stagger-parent">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="pp-stagger-child group p-8 md:p-10 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0b1f3f] group-hover:border-[#0b1f3f] transition-all duration-300">
                    <b.icon size={18} className="text-gray-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold text-[#121212] mb-3">{b.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. CONFIDENTIAL INFO ─── */}
      <section className="bg-gray-50 py-20 md:py-24 px-5 sm:px-8 md:px-12 pp-scroll-el">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Lock size={14} className="text-gray-500" />
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">Partner-Only Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#121212] leading-[1.1] mb-6">
                Commercial details are shared upon approval.
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-8">
                Approved partners receive dedicated documentation including commercial information, referral guidelines, incentive structures and partner resources — none of which are published publicly.
              </p>
              <button
                onClick={() => navigate("/apply-partner")}
                className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                Apply Now <ArrowRight size={16} />
              </button>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Public Website</h4>
                  <div className="space-y-2.5">
                    {["Partner opportunity", "How the program works", "Eligibility", "Application"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-gray-300" />
                        <span className="text-xs font-medium text-gray-500">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#0b1f3f] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-white opacity-5 rounded-full blur-xl" />
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/90 mb-4">Approved Partner</h4>
                  <div className="space-y-2.5 relative z-10">
                    {["Commercial information", "Partner guidelines", "Referral process", "Incentive structure", "Partner resources"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-white/80" />
                        <span className="text-xs font-medium text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ — Accordion, same style as other pages ─── */}
      <section className="py-20 md:py-28 px-5 sm:px-8 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 pp-scroll-el">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-5 block">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#121212] leading-[1.1]">
                Common questions.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-gray-100 pp-stagger-parent">
                {faqs.map((faq, i) => (
                  <div key={i} className="pp-stagger-child py-6">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start justify-between gap-6 text-left group"
                    >
                      <span className="text-base font-medium text-[#121212] group-hover:text-[#0b1f3f] transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-gray-400 transition-transform duration-300 mt-0.5 ${openFaq === i ? "rotate-180 text-[#0b1f3f]" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. FINAL CTA — Dark navy, same style as site ─── */}
      <section className="relative bg-white px-5 sm:px-8 md:px-12 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-[#0b1f3f] rounded-[2rem] md:rounded-[3rem] px-8 sm:px-14 py-12 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative overflow-hidden">
            {/* Subtle bg texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <svg className="w-full h-full"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                READY TO START
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.2] mb-6">
                Your Network.<br />Our Expertise.<br />More Opportunities.
              </h2>
              <p className="text-white/60 text-base leading-relaxed">
                Join the TRUE CONNECT Partner Program and build new business opportunities through a simple, professional referral model.
              </p>
            </div>

            <div className="relative z-10 flex flex-col gap-4 shrink-0">
              <button
                onClick={() => navigate("/apply-partner")}
                className="bg-white hover:bg-white/90 text-[#0b1f3f] font-bold px-10 py-5 rounded-full text-base shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 whitespace-nowrap"
              >
                Apply as a Partner <ArrowRight size={18} />
              </button>
              <a
                href="/contact-us"
                className="text-white/60 hover:text-white text-sm font-medium text-center transition-colors duration-200 underline underline-offset-4 decoration-white/20"
              >
                Questions? Contact our Partner Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnerProgram;
