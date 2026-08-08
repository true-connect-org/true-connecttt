import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ShieldCheck,
  Wifi,
  Gauge,
  Clock,
  HeadphonesIcon,
  Server,
  ArrowRight,
  Zap,
  Globe,
  Lock,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   PROBLEM / SOLUTION DATA
   ──────────────────────────────── */
const challenges = [
  {
    problem: "Slow uploads kill productivity",
    solution:
      "Symmetric bandwidth means your team uploads files, backs up data, and collaborates in seconds — not hours.",
    icon: Gauge,
  },
  {
    problem: "Shared bandwidth = unpredictability",
    solution:
      "Your own dedicated pipe. Your speed never depends on what your neighbor is doing. Always peak performance.",
    icon: Wifi,
  },
  {
    problem: "Internet outages = revenue loss",
    solution:
      "99.9% uptime SLA with enterprise redundancy options. We keep your business running, guaranteed.",
    icon: Clock,
  },
];

/* ────────────────────────────────
   KEY FEATURES
   ──────────────────────────────── */
const keyFeatures = [
  {
    title: "Guaranteed Uptime",
    desc: "99.99% SLA-backed uptime with redundant failover architecture for mission-critical operations.",
    icon: ShieldCheck,
  },
  {
    title: "Dedicated Bandwidth",
    desc: "No sharing, no throttling. Your own symmetric pipe with guaranteed speeds at all times.",
    icon: Zap,
  },
  {
    title: "Global Reach",
    desc: "Enterprise-grade connectivity powered by Reliance Jio's nationwide tier-1 infrastructure.",
    icon: Globe,
  },
  {
    title: "Enterprise Security",
    desc: "Hardware firewall installation, static IP, MPLS routing, and advanced DDoS protection.",
    icon: Lock,
  },
  {
    title: "24/7 Support",
    desc: "Dedicated account engineering team with priority zero-downtime support around the clock.",
    icon: HeadphonesIcon,
  },
  {
    title: "Scalable Plans",
    desc: "From 10 Mbps to multi-Gbps. Bandwidth configurations designed to grow with your business.",
    icon: Server,
  },
];

/* ────────────────────────────────
   BANDWIDTH TIERS
   ──────────────────────────────── */
const bandwidthTiers = [
  { label: "10 – 100 Mbps", tag: "Starter" },
  { label: "100 – 500 Mbps", tag: "Growth" },
  { label: "500 Mbps – 1 Gbps", tag: "Enterprise" },
  { label: "Custom Multi-Gbps", tag: "Custom" },
];

/* ────────────────────────────────
   INCLUDED ITEMS
   ──────────────────────────────── */
const includedItems = [
  "Installation & Setup",
  "Network Configuration",
  "Dedicated Account Manager",
  "Priority Support",
  "Performance Monitoring",
  "Hardware Router & Firewall",
];

/* ────────────────────────────────
   INTERNET SERVICES PAGE
   ──────────────────────────────── */
const InternetServices = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero entrance stagger
      gsap.fromTo(
        ".ill-hero-el",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
      );

      // Scroll fade-in
      gsap.utils.toArray<HTMLElement>(".ill-scroll-in").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
      className="bg-white min-h-screen text-[#2d2a26] font-sans pt-28 md:pt-36 pb-0 overflow-x-hidden"
    >
      {/* ─── 1. HERO HEADER ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="max-w-4xl">
          <span className="ill-hero-el text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            ENTERPRISE CONNECTIVITY
          </span>

          <h1 className="ill-hero-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#2d2a26] leading-[1.1] mb-8">
            Enterprise Internet That Never Stops.
          </h1>

          <p className="ill-hero-el text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">
            Dedicated, symmetric, lightning-fast. Experience unparalleled
            connectivity with our premium enterprise internet solutions powered
            by Reliance Jio's nationwide tier-1 infrastructure.
          </p>

          <div className="ill-hero-el flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Get Connected <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/918848817833?text=Hi!%20I%20want%20to%20know%20about%20your%20enterprise%20internet%20services.",
                  "_blank"
                )
              }
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
            >
              WhatsApp us
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. HERO IMAGE BANNER ─── */}
      <section className="ill-scroll-in w-full px-4 md:px-8 mb-10 md:mb-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full h-[320px] sm:h-[400px] md:h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-[#0b1f3f]">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80"
              alt="Enterprise Network Infrastructure"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3f]/90 via-[#0b1f3f]/30 to-transparent" />

            {/* Overlay Stats */}
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12 flex flex-wrap gap-8 md:gap-16">
              {[
                { value: "99.99%", label: "Uptime SLA" },
                { value: "< 10ms", label: "Latency" },
                { value: "24/7", label: "Monitoring" },
                { value: "1:1", label: "Dedicated Pipe" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-white text-2xl md:text-4xl font-bold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs md:text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CHALLENGES & SOLUTIONS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="ill-scroll-in max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
            WHY LEASED LINE
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
            Why switch to a leased line?
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Traditional broadband wasn't designed for enterprise workloads.
            Here's why dedicated infrastructure changes everything.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {challenges.map((item, idx) => {
            const ChallengeIcon = item.icon;
            return (
              <div
                key={idx}
                className="ill-scroll-in bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-8">
                  <ChallengeIcon size={22} strokeWidth={1.75} />
                </div>

                {/* Problem */}
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                  THE PROBLEM
                </div>
                <h3 className="text-xl font-semibold text-[#2d2a26] mb-6">
                  {item.problem}
                </h3>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gray-100 mb-6" />

                {/* Solution */}
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b1f3f] mb-2">
                  THE SOLUTION
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.solution}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 4. KEY FEATURES GRID ─── */}
      <section className="bg-gray-50/50 py-10 md:py-14 mb-10 md:mb-14">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="ill-scroll-in max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              WHAT YOU GET
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              Enterprise-grade, end to end.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {keyFeatures.map((feature, idx) => {
              const FeatureIcon = feature.icon;
              return (
                <div
                  key={idx}
                  className="ill-scroll-in bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-md">
                    <FeatureIcon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2d2a26] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. BANDWIDTH PLANS ─── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="ill-scroll-in max-w-3xl mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
            BANDWIDTH OPTIONS
          </span>
          <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
            Built for your bandwidth.
          </h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Bandwidth needs aren't one-size-fits-all. Let our team understand
            your business, traffic patterns, and growth plans — then recommend
            the perfect fit.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
          {bandwidthTiers.map((tier, i) => (
            <div
              key={i}
              className="ill-scroll-in bg-white border border-gray-200 hover:border-[#0b1f3f]/30 p-6 md:p-8 rounded-[1.5rem] transition-all duration-300 hover:shadow-lg cursor-pointer group text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b1f3f]/50 mb-3 block">
                {tier.tag}
              </span>
              <span className="text-lg md:text-xl font-semibold text-[#2d2a26] group-hover:text-[#0b1f3f] transition-colors">
                {tier.label}
              </span>
            </div>
          ))}
        </div>

        {/* Included Badges */}
        <div className="ill-scroll-in flex flex-wrap justify-center gap-3">
          {includedItems.map((item, i) => (
            <span
              key={i}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-medium px-5 py-2.5 rounded-full hover:bg-white hover:shadow-sm transition-all"
            >
              + {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── 6. BOTTOM CTA ─── */}
      <section className="border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16 text-center">
          <div className="ill-scroll-in max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
              READY TO CONNECT
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              Talk to our experts.
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
              Share your bandwidth needs, office locations, and growth plans. Our
              team will recommend the perfect connectivity solution.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Talk to the studio <ArrowUpRight size={16} />
              </button>
              <button
                onClick={() => navigate("/services")}
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              >
                View all services
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternetServices;
