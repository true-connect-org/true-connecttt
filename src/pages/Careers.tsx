import { useState, useEffect } from "react";
import { ArrowRight, Briefcase, Zap, GraduationCap, TrendingUp, HeartHandshake, ChevronDown, ChevronUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const openPositions = [
  { id: 1, title: "Senior Software Developer", experience: "4+ years", skills: "Node.js, React, Cloud architecture", team: "Enterprise Solutions" },
  { id: 2, title: "Mobile App Developer", experience: "2+ years", skills: "Native development, Firebase, API integration", team: "Digital Products" },
  { id: 3, title: "Enterprise Network Tech", experience: "2+ years", skills: "Reliance Jio trained or equivalent", team: "Infrastructure" },
  { id: 4, title: "Sales Engineer", experience: "3+ years", skills: "Enterprise sales, Technical knowledge", team: "Business Development" },
  { id: 5, title: "UI/UX Designer", experience: "2+ years", skills: "Figma, User research, Design systems", team: "Digital Products" }
];

const Careers = () => {
  const navigate = useNavigate();
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  useEffect(() => {
    gsap.fromTo(
      ".career-hero-stagger",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "expo.out", delay: 0.05 }
    );

    gsap.utils.toArray(".animate-on-scroll").forEach((element: Element) => {
      gsap.fromTo(
        element,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div className="bg-white min-h-screen text-tc-navy overflow-hidden relative">
      
      {/* Background elements */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-tc-navy/5 rounded-full blur-[150px] pointer-events-none -mr-40 -mt-40 z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-tc-navy/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mb-40 z-0" />
      
      {/* 1. HERO SECTION */}
      <section className="pt-48 pb-32 relative z-10 border-b border-gray-200 bg-[#F1F1F1]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center relative">
          
          <div className="career-hero-stagger inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-2 rounded-full mb-10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tc-navy animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-tc-navy">Join Our Team</span>
          </div>

          <h1 className="career-hero-stagger text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1] text-tc-navy">
            Build the Future of<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-tc-navy to-tc-navy/60">Enterprise Tech.</span>
          </h1>
          
          <p className="career-hero-stagger text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            High-tech company culture. Entrepreneur mentality. Kerala's next great tech team.
          </p>
          
          <div className="career-hero-stagger">
            <Button 
              onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-tc-navy text-white hover:bg-tc-navy/90 font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-xl transition-all hover:scale-105"
            >
              View Open Roles <ArrowRight size={18} className="ml-3"/>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. WHY JOIN US - PREMIUM BENTO */}
      <section className="py-32 relative z-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          
          <div className="animate-on-scroll max-w-3xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-tc-navy">Why Join True Connect?</h2>
            <p className="text-xl text-gray-600 font-light leading-relaxed">
              We're not a startup doing hype. We're not a corporation doing politics. We're a growing team that respects expertise, rewards excellence, and gives you ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="animate-on-scroll bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-300" />
              <TrendingUp className="text-tc-navy/40 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4 text-tc-navy">Growth</h3>
              <p className="text-gray-500 leading-relaxed">Work on enterprise-scale challenges that push your technical abilities to the next level.</p>
            </div>
            
            <div className="animate-on-scroll bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-xl" style={{ transitionDelay: '50ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-300" />
              <GraduationCap className="text-tc-navy/40 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4 text-tc-navy">Learning</h3>
              <p className="text-gray-500 leading-relaxed">Reliance Jio certifications and continuous upskilling programs to keep you at the bleeding edge.</p>
            </div>

            <div className="animate-on-scroll bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-xl" style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-300" />
              <Zap className="text-tc-navy/40 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4 text-tc-navy">Impact</h3>
              <p className="text-gray-500 leading-relaxed">Your code and infrastructure decisions power thousands of businesses across India and the UAE.</p>
            </div>

            <div className="animate-on-scroll lg:col-span-2 bg-tc-navy p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center" style={{ transitionDelay: '150ms' }}>
              <HeartHandshake className="text-white/40 group-hover:text-white transition-colors duration-300 w-16 h-16 flex-shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">Culture</h3>
                <p className="text-gray-300 leading-relaxed text-lg font-light">Flexible, result-driven environment. No red tape, no politics. Just good people building great things.</p>
              </div>
            </div>

            <div className="animate-on-scroll bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group relative overflow-hidden shadow-lg hover:shadow-xl" style={{ transitionDelay: '200ms' }}>
              <Briefcase className="text-tc-navy/40 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5} />
              <h3 className="text-2xl font-bold mb-4 text-tc-navy">Compensation</h3>
              <p className="text-gray-500 leading-relaxed">Competitive salary structures paired with performance bonuses that reward your actual output.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS - PREMIUM ACCORDION */}
      <section id="open-positions" className="py-32 relative z-10 border-t border-gray-200 bg-[#F1F1F1]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <div className="animate-on-scroll mb-20 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-tc-navy">Open Roles</h2>
            <div className="w-20 h-[3px] bg-tc-navy/20 mx-auto" />
          </div>

          <div className="space-y-6">
            {openPositions.map((job, index) => (
              <div 
                key={job.id} 
                className={`animate-on-scroll rounded-3xl transition-all duration-300 overflow-hidden ${
                  expandedJob === job.id 
                    ? "bg-white border-tc-navy shadow-[0_10px_40px_rgba(11,31,63,0.1)] border-2" 
                    : "bg-white border-gray-200 border hover:border-tc-navy/30 shadow-sm hover:shadow-md"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div 
                  className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex-1 mb-6 md:mb-0">
                    <div className="text-tc-navy/60 text-xs font-bold uppercase tracking-[0.2em] mb-4">{job.team}</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-tc-navy">{job.title}</h3>
                    <div className="flex flex-wrap gap-6 text-gray-500 font-medium">
                      <span className="flex items-center"><Briefcase size={16} className="mr-2 text-gray-400"/> {job.experience}</span>
                      <span className="flex items-center"><Zap size={16} className="mr-2 text-gray-400"/> {job.skills}</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full border transition-all duration-300 ${
                    expandedJob === job.id ? "bg-tc-navy text-white border-tc-navy" : "bg-transparent text-tc-navy border-gray-300 hover:border-tc-navy"
                  }`}>
                    {expandedJob === job.id ? (
                      <>Close <ChevronUp size={16} className="ml-2"/></>
                    ) : (
                      <>Apply <ChevronDown size={16} className="ml-2"/></>
                    )}
                  </div>
                </div>

                {/* Light Mode Application Form */}
                <div className={`transition-all duration-500 ease-in-out origin-top ${expandedJob === job.id ? 'max-h-[800px] opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'}`}>
                  <div className="p-8 md:p-10 bg-gray-50 border-t border-gray-200">
                    <h4 className="font-bold text-xl mb-8 text-tc-navy">Submit Application</h4>
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Application Submitted!"); setExpandedJob(null); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="text" placeholder="Full Name *" required className="w-full bg-white border border-gray-300 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm" />
                        <input type="email" placeholder="Email Address *" required className="w-full bg-white border border-gray-300 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input type="tel" placeholder="Phone Number *" required className="w-full bg-white border border-gray-300 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm" />
                        <input type="text" placeholder="Portfolio / LinkedIn URL" className="w-full bg-white border border-gray-300 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm" />
                      </div>
                      <textarea placeholder="Cover Letter (Why True Connect?)" rows={4} className="w-full bg-white border border-gray-300 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm resize-none" />
                      
                      <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                        <Button type="button" variant="outline" className="w-full sm:w-auto bg-white border-gray-300 text-tc-navy hover:bg-gray-50 hover:border-tc-navy px-8 py-6 rounded-full font-bold uppercase tracking-widest text-xs shadow-sm">
                          Upload Resume
                        </Button>
                        <Button type="submit" className="w-full sm:w-auto bg-tc-navy text-white hover:bg-tc-navy/90 hover:text-white px-10 py-6 rounded-full font-bold uppercase tracking-widest text-xs transition-colors shadow-lg">
                          Submit Application
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
