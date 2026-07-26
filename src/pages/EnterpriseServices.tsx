import { useEffect } from "react";
import { Monitor, Smartphone, Workflow, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const EnterpriseServices = () => {
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

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 text-center mb-24 relative z-10">
        <h2 className="text-4xl md:text-6xl font-black mb-8 text-tc-navy">AI & Digital Growth Strategies.</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
          Premium, data-driven solutions tailored for enterprises and entrepreneurs. We integrate AI and strategic marketing to solve your biggest operational challenges.
        </p>
      </div>

      {/* 4-Column Grid - Ultra Premium */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 relative z-10">
        
        <div className="bento-card bg-white p-10 rounded-[2rem] border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[30px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-500" />
          <Monitor className="text-tc-navy/60 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5}/>
          <h3 className="text-2xl font-bold mb-6 text-tc-navy">AI &<br/>Automation</h3>
          <ul className="space-y-4 text-gray-600 relative z-10">
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> AI Tool Integration</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Process Automation</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Smart Workflows</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Data Analytics</li>
          </ul>
        </div>

        <div className="bento-card bg-white p-10 rounded-[2rem] border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" style={{ transitionDelay: '50ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[30px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-500" />
          <Smartphone className="text-tc-navy/60 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5}/>
          <h3 className="text-2xl font-bold mb-6 text-tc-navy">Digital<br/>Marketing</h3>
          <ul className="space-y-4 text-gray-600 relative z-10">
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Social Media Campaigns</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Targeted Advertising</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Content Strategy</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Email Marketing</li>
          </ul>
        </div>

        <div className="bento-card bg-white p-10 rounded-[2rem] border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" style={{ transitionDelay: '100ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[30px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-500" />
          <TrendingUp className="text-tc-navy/60 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5}/>
          <h3 className="text-2xl font-bold mb-6 text-tc-navy">Brand &<br/>SEO Strategy</h3>
          <ul className="space-y-4 text-gray-600 relative z-10">
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Complete Rebranding</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> SEO Optimization</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Market Positioning</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Lead Generation</li>
          </ul>
        </div>

        <div className="bento-card bg-white p-10 rounded-[2rem] border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden" style={{ transitionDelay: '150ms' }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-full blur-[30px] -mr-16 -mt-16 group-hover:bg-tc-navy/5 transition-all duration-500" />
          <Workflow className="text-tc-navy/60 group-hover:text-tc-navy transition-colors duration-300 mb-8 w-12 h-12" strokeWidth={1.5}/>
          <h3 className="text-2xl font-bold mb-6 text-tc-navy">Software<br/>& Apps</h3>
          <ul className="space-y-4 text-gray-600 relative z-10">
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Custom Web Platforms</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> iOS & Android Apps</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> CRM Implementations</li>
            <li className="flex items-start"><span className="text-tc-navy mr-3">•</span> Cloud Infrastructure</li>
          </ul>
        </div>

      </div>

      {/* 4 Phases Process - Clean Light Mode */}
      <div className="py-24 bg-white border-y border-gray-200 relative z-10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          <h2 className="text-3xl md:text-5xl font-black mb-20 text-center text-tc-navy">From Concept to Launch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-gray-100 z-0">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            <div className="bento-card relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 group-hover:border-tc-navy group-hover:bg-tc-navy text-tc-navy group-hover:text-white font-bold flex items-center justify-center mb-8 shadow-md transition-all duration-300 text-xl">1</div>
              <h3 className="text-xl font-bold mb-4 text-tc-navy">Analysis</h3>
              <p className="text-gray-500 leading-relaxed">Understanding your business friction, market, and data points</p>
            </div>

            <div className="bento-card relative z-10 flex flex-col items-center text-center group" style={{ transitionDelay: '50ms' }}>
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 group-hover:border-tc-navy group-hover:bg-tc-navy text-tc-navy group-hover:text-white font-bold flex items-center justify-center mb-8 shadow-md transition-all duration-300 text-xl">2</div>
              <h3 className="text-xl font-bold mb-4 text-tc-navy">Roadmap</h3>
              <p className="text-gray-500 leading-relaxed">Crafting the AI and digital marketing strategy</p>
            </div>

            <div className="bento-card relative z-10 flex flex-col items-center text-center group" style={{ transitionDelay: '100ms' }}>
              <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 group-hover:border-tc-navy group-hover:bg-tc-navy text-tc-navy group-hover:text-white font-bold flex items-center justify-center mb-8 shadow-md transition-all duration-300 text-xl">3</div>
              <h3 className="text-xl font-bold mb-4 text-tc-navy">Execution</h3>
              <p className="text-gray-500 leading-relaxed">Agile development and campaign rollouts</p>
            </div>

            <div className="bento-card relative z-10 flex flex-col items-center text-center group" style={{ transitionDelay: '150ms' }}>
              <div className="w-16 h-16 rounded-full bg-tc-navy border-2 border-tc-navy text-white font-bold flex items-center justify-center mb-8 shadow-xl transition-all duration-300 text-xl scale-110">4</div>
              <h3 className="text-xl font-bold mb-4 text-tc-navy">Growth</h3>
              <p className="text-gray-500 leading-relaxed">Continuous SEO, marketing scaling, and AI optimization</p>
            </div>
          </div>

          <div className="text-center mt-24">
            <Button onClick={() => navigate('/contact-us')} className="bg-tc-navy text-white hover:bg-tc-deepblue font-bold uppercase tracking-widest px-10 py-7 rounded-full transition-all duration-300 shadow-xl hover:scale-105">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EnterpriseServices;
