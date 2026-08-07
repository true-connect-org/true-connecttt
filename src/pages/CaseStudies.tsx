import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, CheckCircle2, X, Star } from "lucide-react";
import { gsap } from "gsap";

// 4 Case Studies with tags & Unsplash images matching the reference screenshot aesthetic
const caseStudies = [
  {
    id: 1,
    title: "Lexis",
    category: "EDUCATION PLATFORM",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "High-stakes exam preparation, turned into a clear path forward for thousands of ambitious students.",
    tags: ["Product strategy", "UX/UI design", "Full-stack engineering"],
    fullContent: {
      challenge: "A major educational provider faced low engagement rates and complex exam workflows that confused students during critical prep windows.",
      solution: "We re-engineered their entire learning environment with real-time feedback loops, adaptive practice tests, and a ultra-clean UI.",
      results: [
        "80% reduction in prep setup time",
        "3x increase in daily active study sessions",
        "94% student pass rate across all modules"
      ]
    }
  },
  {
    id: 2,
    title: "TrueHR",
    category: "HR TECHNOLOGY",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Payroll, people, and attendance, engineered for the high-growth enterprise workforce.",
    tags: ["Product strategy", "SaaS design", "Multi-tenant architecture"],
    fullContent: {
      challenge: "Managing thousands of employees across remote locations resulted in delayed payroll processing and frequent data sync bottlenecks.",
      solution: "We built an automated cloud-native HR platform with biometric sync, automated tax calculations, and self-service portals.",
      results: [
        "Zero manual payroll errors reported",
        "90% faster monthly attendance processing",
        "Saved 50+ HR administrative hours per week"
      ]
    }
  },
  {
    id: 3,
    title: "Aegis AI",
    category: "AI & AUTOMATION",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Autonomous customer intelligence and instant inquiry automation for global enterprise brands.",
    tags: ["AI Engineering", "Workflow Automation", "NLP Design"],
    fullContent: {
      challenge: "Customer support backlogs caused response times to stretch over 6 hours, hurting customer satisfaction and retention.",
      solution: "We deployed intelligent AI agents that resolve routine queries, track orders, and route complex cases instantly.",
      results: [
        "85% instant ticket resolution rate",
        "Response time dropped from 6 hours to 2 seconds",
        "40% cost savings on support operations"
      ]
    }
  },
  {
    id: 4,
    title: "OmniConnect",
    category: "INFRASTRUCTURE & NETWORKING",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    shortDesc: "Ultra-fast leased line connectivity & zero-downtime network infrastructure for UAE & Indian markets.",
    tags: ["Enterprise Network", "Cloud Integration", "Jio Partner Network"],
    fullContent: {
      challenge: "High-frequency trading and data operations required guaranteed 99.999% uptime with ultra-low latency connection lines.",
      solution: "We established dedicated Jio leased lines with redundant failovers and enterprise-grade security protocols.",
      results: [
        "100% uptime maintained across 12 consecutive months",
        "Sub-10ms network latency achieved",
        "Seamless scale across 15 regional office branches"
      ]
    }
  }
];

const CaseStudies = () => {
  const navigate = useNavigate();
  const [activeStudy, setActiveStudy] = useState<number | null>(null);

  useEffect(() => {
    // Initial GSAP animation matching Lorolabs style
    gsap.fromTo(
      ".cs-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".cs-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <div className="bg-white min-h-screen pt-28 md:pt-36 pb-28 text-gray-900 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header Section (Left Aligned) */}
        <div className="text-left max-w-4xl mb-20 cs-header">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            SELECTED WORK · IN DEPTH
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[#2d2a26] tracking-tight mb-8 leading-[1.1]">
            Four products. Four very different kinds of ambition.
          </h1>
          
          <p className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed">
            The surface matters. So does everything underneath it. Explore the strategy, design, engineering, and operating systems behind work built to earn attention and keep it.
          </p>
        </div>

        {/* 2-Column Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => setActiveStudy(study.id)}
              className="cs-card group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative w-full h-[300px] md:h-[360px] overflow-hidden bg-gray-100">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Card Body */}
              <div className="p-8 md:p-10 flex flex-col flex-grow justify-between">
                <div>
                  {/* Category */}
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-3 block">
                    {study.category}
                  </span>

                  {/* Title + Arrow Button Row */}
                  <div className="flex items-center justify-between mb-4 gap-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-[#2d2a26] group-hover:text-black transition-colors">
                      {study.title}
                    </h2>
                    
                    <div className="w-11 h-11 rounded-full bg-black group-hover:bg-[#e11d48] text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md flex-shrink-0">
                      <ArrowUpRight size={20} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-8">
                    {study.shortDesc}
                  </p>
                </div>

                {/* Pill Badges / Tags */}
                <div className="flex flex-wrap gap-2.5 pt-4 mt-auto">
                  {study.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full border border-gray-200/80 bg-gray-50/60 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section (Matching Reference Screenshot) */}
        <div className="mt-32 pt-16 pb-12 text-center max-w-4xl mx-auto border-t border-gray-100/80">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
            YOUR CASE STUDY STARTS HERE
          </span>
          
          <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
            Bring us the difficult brief.
          </h2>
          
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            We design the customer-facing experience and the operational system behind it, so the result is persuasive on day one and useful long after launch.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate("/contact-us")}
              className="bg-black hover:bg-gray-800 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Talk to the studio <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
            >
              Explore the visual portfolio
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Detail View for Selected Case Study */}
      {activeStudy !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={() => setActiveStudy(null)}
          />

          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-[2.5rem] overflow-hidden z-10 border border-gray-100">
            <button
              className="absolute top-6 right-6 text-gray-600 hover:text-black transition-colors z-20 bg-white/90 backdrop-blur-md rounded-full p-2.5 shadow-md border border-gray-200"
              onClick={() => setActiveStudy(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {(() => {
              const study = caseStudies.find((s) => s.id === activeStudy)!;
              return (
                <div className="flex flex-col">
                  {/* Modal Header Image */}
                  <div className="w-full h-64 md:h-80 relative bg-gray-900">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 right-8">
                      <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                        {study.category}
                      </span>
                      <h2 className="text-white text-3xl md:text-5xl font-bold">
                        {study.title}
                      </h2>
                    </div>
                  </div>

                  {/* Modal Body Content */}
                  <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                          THE CHALLENGE
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {study.fullContent.challenge}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                          OUR SOLUTION
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {study.fullContent.solution}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200/80">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900 mb-6">
                        KEY IMPACT & RESULTS
                      </h3>
                      <ul className="space-y-4">
                        {study.fullContent.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2
                              size={18}
                              className="text-gray-900 flex-shrink-0 mt-0.5"
                            />
                            <span className="text-gray-800 text-sm font-medium">
                              {result}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;
