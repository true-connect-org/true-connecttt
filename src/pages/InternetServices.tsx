import { useEffect } from "react";
import { ArrowRight, ShieldCheck, Server } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const InternetServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      ".page-animate",
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power4.out" }
    );
    
    gsap.utils.toArray(".bento-card").forEach((element: Element) => {
      gsap.fromTo(
        element,
        { y: 50, opacity: 0 },
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
    <div className="bg-tc-lightgray min-h-screen text-tc-navy pt-40 pb-24 overflow-hidden relative page-animate">
      
      {/* Background ambient light */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[150px] pointer-events-none z-0" />

      {/* Premium ILL Hero */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 mb-32 relative z-10">
        <div className="bg-tc-navy p-10 md:p-20 rounded-[2.5rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row gap-16 items-center">
          
          <div className="absolute top-0 right-0 w-full h-full opacity-50 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[80%] bg-white/5 blur-[120px] rounded-full" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h2 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/60" />
              Dedicated, Symmetric, Lightning-Fast
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1.1] text-white">Enterprise Internet<br/>That Never Stops.</h3>
            <ul className="space-y-5 mb-10 text-white/80 text-lg">
              {["Guaranteed uptime with SLA backing", "Dedicated bandwidth (no sharing, no throttling)", "Symmetric speed for uploads and downloads", "Reliance Jio's nationwide infrastructure", "24/7 monitoring and support"].map((text, i) => (
                <li key={i} className="flex items-center">
                  <ShieldCheck className="text-white mr-4 flex-shrink-0" size={24}/> {text}
                </li>
              ))}
            </ul>
            <Button onClick={() => navigate('/contact-us')} className="bg-white text-tc-navy hover:bg-gray-100 font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.1)] transition-all hover:scale-105">
              Get Connected
            </Button>
          </div>
          
          <div className="relative z-10 flex-1 flex justify-center opacity-40 md:opacity-100">
            <Server size={300} className="text-white mix-blend-overlay" strokeWidth={0.5} />
          </div>
        </div>
      </div>

      {/* Premium ILL Problems & Solutions */}
      <div className="py-24 bg-white relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <h3 className="text-3xl md:text-5xl font-black text-tc-navy mb-16 text-center tracking-tight">Why Switch to Leased Line?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bento-card bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/20 transition-all duration-300 group shadow-lg hover:shadow-xl relative overflow-hidden">
              <div className="text-red-500 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> The Problem</div>
              <h4 className="text-2xl font-bold text-tc-navy mb-8">Slow uploads kill productivity</h4>
              <div className="w-full h-[1px] bg-gray-100 mb-8" />
              <div className="text-tc-navy font-bold mb-4 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tc-navy"/> The Solution</div>
              <p className="text-gray-600 leading-relaxed">Symmetric bandwidth means your team uploads files, backs up data, and collaborates in seconds—not hours.</p>
            </div>

            <div className="bento-card bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/20 transition-all duration-300 group shadow-lg hover:shadow-xl relative overflow-hidden" style={{ transitionDelay: '50ms' }}>
              <div className="text-red-500 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> The Problem</div>
              <h4 className="text-2xl font-bold text-tc-navy mb-8">Shared bandwidth = unpredictability</h4>
              <div className="w-full h-[1px] bg-gray-100 mb-8" />
              <div className="text-tc-navy font-bold mb-4 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tc-navy"/> The Solution</div>
              <p className="text-gray-600 leading-relaxed">Your own dedicated pipe. Your speed never depends on what your neighbor is doing. Always peak performance.</p>
            </div>

            <div className="bento-card bg-white p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/20 transition-all duration-300 group shadow-lg hover:shadow-xl relative overflow-hidden" style={{ transitionDelay: '100ms' }}>
              <div className="text-red-500 font-bold mb-6 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"/> The Problem</div>
              <h4 className="text-2xl font-bold text-tc-navy mb-8">Internet outages = revenue loss</h4>
              <div className="w-full h-[1px] bg-gray-100 mb-8" />
              <div className="text-tc-navy font-bold mb-4 uppercase text-xs tracking-widest flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-tc-navy"/> The Solution</div>
              <p className="text-gray-600 leading-relaxed">99.9% uptime SLA with enterprise redundancy options. We keep your business running, guaranteed.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Premium ILL Plans */}
      <div className="py-24 max-w-[1200px] mx-auto px-6 md:px-8 text-center bg-tc-lightgray relative z-10">
        <h3 className="text-4xl md:text-5xl font-black mb-6">Built For Your Bandwidth</h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 font-light">
          Bandwidth needs aren't one-size-fits-all. Let our team understand your business, traffic patterns, and growth plans—then recommend the perfect fit.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {["10 Mbps - 100 Mbps", "100 Mbps - 500 Mbps", "500 Mbps - 1 Gbps", "Custom Enterprise"].map((plan, i) => (
            <div key={i} className="bento-card bg-white shadow-md py-10 px-4 rounded-2xl border border-gray-200 font-bold text-tc-navy text-lg md:text-xl hover:bg-tc-navy hover:text-white hover:border-tc-navy transition-all duration-300 cursor-pointer">
              {plan}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {["Installation & Setup", "Network Configuration", "Dedicated Account Manager", "Priority Support", "Performance Monitoring"].map((badge, i) => (
            <span key={i} className="bg-white shadow-sm border border-gray-200 text-tc-navy text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-gray-50 transition-colors">
              + {badge}
            </span>
          ))}
        </div>

        <Button onClick={() => navigate('/contact-us')} className="bg-tc-navy text-white hover:bg-tc-deepblue font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-xl hover:scale-105 transition-all">
          Talk to Our Experts <ArrowRight size={18} className="ml-3"/>
        </Button>
      </div>

    </div>
  );
};

export default InternetServices;
