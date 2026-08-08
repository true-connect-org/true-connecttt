import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ArrowRight,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Send,
  X,
} from "lucide-react";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────
   AWWWARDS-STYLE POSITIONS DATA
   ──────────────────────────────── */
const openPositions = [
  {
    id: 1,
    title: "Senior Software Developer",
    team: "Engineering",
    location: "Trivandrum / Remote",
    experience: "4+ Years",
    type: "Full-time",
    skills: "Node.js, React, TypeScript, Cloud Native, PostgreSQL",
    description:
      "Architect and build mission-critical enterprise web platforms. You will lead backend systems, design REST/GraphQL APIs, and work directly with design engineers.",
  },
  {
    id: 2,
    title: "Mobile App Developer",
    team: "Mobile",
    location: "Trivandrum / Hybrid",
    experience: "2+ Years",
    type: "Full-time",
    skills: "React Native, Swift, Kotlin, Firebase, REST APIs",
    description:
      "Craft high-performance native and cross-platform mobile apps for iOS and Android. Focus on fluid 60fps animations, intuitive UI, and resilient offline state.",
  },
  {
    id: 3,
    title: "Enterprise Network Engineer",
    team: "Infrastructure",
    location: "Trivandrum / On-site",
    experience: "2+ Years",
    type: "Full-time",
    skills: "Enterprise Leased Line, SD-WAN, Static IP Routing, Cisco",
    description:
      "Deploy and maintain SLA-backed 99.99% uptime optical fiber networks for enterprise clients. Work with Jio tier-1 infrastructure backbones.",
  },
  {
    id: 4,
    title: "Sales Engineer",
    team: "Growth",
    location: "Dubai / Trivandrum",
    experience: "3+ Years",
    type: "Full-time",
    skills: "Enterprise B2B Sales, IT Solutions, Client Architecture",
    description:
      "Drive technical sales for enterprise software and connectivity contracts across India and UAE. Translate business bottlenecks into tailored studio proposals.",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    team: "Design Studio",
    location: "Trivandrum / Remote",
    experience: "2+ Years",
    type: "Full-time",
    skills: "Figma, Design Systems, Typography, Motion, Prototyping",
    description:
      "Design world-class digital experiences. You will create visual identity systems, interactive web components, and desktop-grade design frameworks.",
  },
];

/* ────────────────────────────────
   STUDIO CULTURE MANIFESTO
   ──────────────────────────────── */
const cultureStatements = [
  {
    number: "01",
    label: "HIGH IMPACT",
    title: "Enterprise Scale",
    desc: "Every line of code and optical route we ship powers mission-critical operations across Asia-Pacific and the Middle East.",
  },
  {
    number: "02",
    label: "UNFILTERED AUTONOMY",
    title: "Zero Bureaucracy",
    desc: "Direct access to studio founders. No red tape, no endless approval chains — just talented craftspeople given total ownership.",
  },
  {
    number: "03",
    label: "CONTINUOUS CRAFT",
    title: "upskilling & R&D",
    desc: "Subsidized certifications, dedicated exploration time, and access to modern tools to keep your engineering skills at the bleeding edge.",
  },
  {
    number: "04",
    label: "DIRECT REWARDS",
    title: "Performance Pay",
    desc: "Competitive base salary paired with transparent performance bonuses that directly reflect your output and studio impact.",
  },
];

/* ────────────────────────────────
   AWWWARDS-LEVEL CAREERS PAGE
   ──────────────────────────────── */
const Careers = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [expandedRole, setExpandedRole] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetter: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Big Hero Text Entrance
      gsap.fromTo(
        ".aww-hero-el",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power4.out" }
      );

      // Section Scroll Trigger
      gsap.utils.toArray<HTMLElement>(".aww-scroll-el").forEach((el) => {
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
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = ["All", "Engineering", "Mobile", "Infrastructure", "Growth", "Design Studio"];

  const filteredRoles = activeTab === "All"
    ? openPositions
    : openPositions.filter((job) => job.team === activeTab);

  const handleApply = (e: React.FormEvent, roleTitle: string) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success(`Application submitted for ${roleTitle}!`);
      setSubmitting(false);
      setExpandedRole(null);
      setForm({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen text-[#121212] font-sans pt-28 md:pt-36 pb-0 overflow-x-hidden"
    >
      {/* ─── 1. AWWWARDS HERO (Oversized Typography & Editorial Layout) ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-14">
        {/* Top Meta Header Bar */}
        <div className="aww-hero-el flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-12">
          <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
            <span>05 ROLES OPEN</span>
            <span>·</span>
            <span>TRIVANDRUM & DUBAI</span>
          </div>
        </div>

        {/* Main Display Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8">
            <h1 className="aww-hero-el text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#121212] leading-[1.1]">
              Join the minds engineering digital infrastructure.
            </h1>
          </div>

          <div className="lg:col-span-4 aww-hero-el">
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal mb-8">
              We're a design engineering studio built for craftspeople. No red tape, no corporate noise — just meaningful enterprise products shipped from Trivandrum & Dubai.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("positions-directory")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              Explore positions <ArrowDownIcon size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── 2. STUDIO ATMOSPHERE (Asymmetric Editorial Layout) ─── */}
      <section className="aww-scroll-el max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-10 md:mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Stat Badge */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#121212] leading-[1.1]">
              Engineered in Trivandrum & Dubai.
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              We operate from Technopark Phase 3 and Dubai Business Bay — bringing together software engineers, network architects, and UI/UX designers in an open, creative environment.
            </p>          </div>

          {/* Right Unique Arched Photo Card */}
          <div className="lg:col-span-7 relative group">
            <div className="relative h-[320px] sm:h-[400px] md:h-[460px] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-200/80 bg-gray-900">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="True Connect Studio Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. CULTURE MANIFESTO — EDITORIAL ROWS (Not Bento Cards) ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-12 md:mb-16">
        <div className="aww-scroll-el max-w-3xl mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
            HOW WE WORK · THE MANIFESTO
          </span>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#121212]">
            What defines our studio culture.
          </h2>
        </div>

        {/* Editorial Rows */}
        <div className="divide-y divide-gray-200 border-y border-gray-200">
          {cultureStatements.map((item) => (
            <div
              key={item.number}
              className="aww-scroll-el py-10 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start group hover:bg-gray-50/80 px-4 md:px-6 rounded-2xl transition-colors duration-300"
            >
              {/* Left Number & Label */}
              <div className="lg:col-span-3">
                <span className="text-2xl font-bold text-[#0b1f3f] block mb-1">
                  {item.number}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {item.label}
                </span>
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-[#121212] group-hover:text-[#0b1f3f] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-5">
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 4. OPEN POSITIONS DIRECTORY ─── */}
      <section id="positions-directory" className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 mb-12 md:mb-16">
        {/* Header + Category Tabs */}
        <div className="aww-scroll-el flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-gray-200 pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-3 block">
              AVAILABLE ROLES · 05 POSITIONS
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#121212]">
              Open Directory
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                  activeTab === cat
                    ? "bg-[#0b1f3f] text-white shadow-sm"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Directory List */}
        <div className="divide-y divide-gray-200 border-b border-gray-200">
          {filteredRoles.map((role) => {
            const isExpanded = expandedRole === role.id;

            return (
              <div key={role.id} className="aww-scroll-el group">
                {/* Main Row */}
                <div
                  onClick={() => setExpandedRole(isExpanded ? null : role.id)}
                  className={`py-8 px-4 md:px-6 rounded-2xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                    isExpanded
                      ? "bg-[#0b1f3f] text-white my-2 shadow-xl"
                      : "hover:bg-gray-50/90 text-[#121212]"
                  }`}
                >
                  {/* Left Title & Department */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-0.5 rounded-full ${
                          isExpanded
                            ? "bg-white/15 text-white"
                            : "bg-blue-50 text-[#0b1f3f]"
                        }`}
                      >
                        {role.team}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isExpanded ? "text-white/70" : "text-gray-400"
                        }`}
                      >
                        {role.type}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl md:text-3xl font-semibold tracking-tight ${
                        isExpanded ? "text-white" : "text-[#121212]"
                      }`}
                    >
                      {role.title}
                    </h3>
                  </div>

                  {/* Right Meta Info & Arrow */}
                  <div className="flex items-center gap-6 md:gap-10">
                    <div className="hidden sm:block text-right">
                      <div
                        className={`text-xs font-semibold ${
                          isExpanded ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {role.location}
                      </div>
                      <div
                        className={`text-xs ${
                          isExpanded ? "text-white/60" : "text-gray-400"
                        }`}
                      >
                        {role.experience}
                      </div>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                        isExpanded
                          ? "bg-white text-[#0b1f3f]"
                          : "bg-[#0b1f3f] text-white group-hover:scale-110"
                      }`}
                    >
                      {isExpanded ? (
                        <X size={18} />
                      ) : (
                        <ArrowUpRight size={18} strokeWidth={2} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details & Form Drawer */}
                {isExpanded && (
                  <div className="my-2 p-6 sm:p-8 md:p-10 bg-gray-50 border border-gray-200 rounded-2xl animate-in fade-in duration-300">
                    <div className="max-w-4xl mx-auto space-y-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 block mb-2">
                          REQUIRED SKILLS & STACK
                        </span>
                        <p className="text-sm font-semibold text-gray-800 mb-3">
                          {role.skills}
                        </p>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {role.description}
                        </p>
                      </div>

                      {/* Application Box */}
                      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
                        <h4 className="text-lg font-semibold text-[#121212] mb-6">
                          Apply for {role.title}
                        </h4>

                        <form
                          onSubmit={(e) => handleApply(e, role.title)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                                FULL NAME *
                              </label>
                              <input
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) =>
                                  setForm({ ...form, name: e.target.value })
                                }
                                placeholder="Your name"
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                                EMAIL ADDRESS *
                              </label>
                              <input
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) =>
                                  setForm({ ...form, email: e.target.value })
                                }
                                placeholder="you@company.com"
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] transition-all"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                                PHONE NUMBER *
                              </label>
                              <input
                                type="tel"
                                required
                                value={form.phone}
                                onChange={(e) =>
                                  setForm({ ...form, phone: e.target.value })
                                }
                                placeholder="+91 98765 43210"
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] transition-all"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                                LINKEDIN / PORTFOLIO URL
                              </label>
                              <input
                                type="url"
                                value={form.portfolio}
                                onChange={(e) =>
                                  setForm({ ...form, portfolio: e.target.value })
                                }
                                placeholder="https://linkedin.com/in/username"
                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] transition-all"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                              WHY TRUE CONNECT?
                            </label>
                            <textarea
                              rows={3}
                              value={form.coverLetter}
                              onChange={(e) =>
                                setForm({ ...form, coverLetter: e.target.value })
                              }
                              placeholder="Briefly tell us about your experience..."
                              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] transition-all resize-none"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#0b1f3f] hover:bg-[#122a52] text-white text-xs font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                          >
                            {submitting ? "Submitting..." : "Submit Application"}{" "}
                            <Send size={14} />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. AWWWARDS BOTTOM CTA ─── */}
      <section className="border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-24 text-center">
          <div className="aww-scroll-el max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
              SPONTANEOUS INQUIRY
            </span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-[#121212] mb-6 leading-[1.1]">
              Don't see your discipline? Reach out anyway.
            </h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10 font-normal">
              We're always looking for world-class engineers, designers, and network architects. Drop us your portfolio and start a conversation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Talk to the studio <ArrowUpRight size={16} />
              </button>
              <a
                href="mailto:careers@trueconnect.in"
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300 inline-block"
              >
                Email careers@trueconnect.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Simple Arrow Down Icon Helper
const ArrowDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

export default Careers;
