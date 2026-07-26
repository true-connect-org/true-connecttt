import { useEffect } from "react";
import { ArrowRight, Globe, Target, Shield, Users, Network, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import aboutHeroImg from "../assets/images/about-hero.png";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      ".about-hero-stagger",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "expo.out", delay: 0.05 }
    );

    gsap.utils.toArray(".animate-on-scroll").forEach((element: Element) => {
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
    <div className="bg-white min-h-screen text-tc-navy overflow-hidden relative">
      
      {/* Abstract Grid Background - Light Mode */}
      <div className="fixed inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(rgba(11, 31, 63, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 31, 63, 1) 1px, transparent 1px)", backgroundSize: "100px 100px" }}
      />
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 md:pt-40 pb-20 relative z-10 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tc-navy/5 rounded-full blur-[150px] pointer-events-none -mr-[200px] -mt-[200px]" />
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-left">
              <div className="about-hero-stagger flex items-center gap-4 mb-10">
                <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-tc-navy/60">Trivandrum HQ • Global Partner in UAE</span>
                <div className="h-[1px] flex-1 bg-tc-navy/20" />
              </div>
              
              <h1 className="about-hero-stagger text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-[1.1] text-tc-navy">
                Making Business <br className="hidden sm:block"/> <span className="text-tc-navy drop-shadow-sm">Easier with AI.</span>
              </h1>
              
              <p className="about-hero-stagger text-base sm:text-lg md:text-xl text-gray-500 font-light max-w-xl leading-relaxed mb-8 md:mb-10">
                We solve the complex marketing and operational friction that keeps ambitious business owners awake at night.
              </p>
              
              <div className="about-hero-stagger">
                <Button onClick={() => navigate('/contact-us')} className="bg-tc-navy text-white hover:bg-tc-deepblue font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-xl transition-all hover:scale-105">
                  Start Your Journey <ArrowRight size={18} className="ml-3"/>
                </Button>
              </div>
            </div>

            <div className="relative about-hero-stagger mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-tc-navy/10 to-transparent rounded-[3rem] transform rotate-3 scale-105" />
              <img src={aboutHeroImg} alt="AI Business Growth" className="relative z-10 w-full h-auto rounded-[3rem] shadow-2xl object-cover border border-white/20" />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-4 md:-left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 z-20 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 rounded-full bg-tc-lightgray flex items-center justify-center">
                  <Shield className="text-tc-navy" size={24} />
                </div>
                <div>
                  <div className="text-sm font-bold text-tc-navy uppercase tracking-widest">Premium Quality</div>
                  <div className="text-gray-500 text-xs">Enterprise Standards</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section className="py-16 md:py-24 relative z-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="animate-on-scroll bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group shadow-lg hover:shadow-xl">
            <div className="w-14 md:w-16 h-14 md:h-16 bg-tc-navy/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-tc-navy transition-colors duration-300">
              <Target className="text-tc-navy group-hover:text-white transition-colors duration-300" size={28} />
            </div>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 text-gray-400">Our Mission</h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-tc-navy">
              To solve the exact problems faced by business owners and make running a business easier by integrating advanced AI and next-gen digital strategies.
            </p>
          </div>
          
          <div className="animate-on-scroll bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:border-tc-navy/30 transition-all duration-300 group shadow-lg hover:shadow-xl" style={{ transitionDelay: '50ms' }}>
            <div className="w-14 md:w-16 h-14 md:h-16 bg-tc-navy/5 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-tc-navy transition-colors duration-300">
              <Globe className="text-tc-navy group-hover:text-white transition-colors duration-300" size={28} />
            </div>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 text-gray-400">Our Vision</h2>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-tc-navy">
              Over the next 5 years, our aim is to empower all of Kerala's MSMEs to grow bigger and scale globally by leveraging our premium UAE-standard expertise.
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHO WE ARE & CORE DIFFERENTIATORS */}
      <section className="py-16 md:py-24 relative z-10 bg-tc-lightgray">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8">
          
          <div className="animate-on-scroll max-w-4xl mb-16 md:mb-32 relative">
            <Quote className="absolute -top-10 md:-top-16 -left-6 md:-left-10 text-gray-300 w-24 md:w-40 h-24 md:h-40 opacity-50 md:opacity-100" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-tc-navy mb-8 md:mb-10 relative z-10">We didn't build this to be just another agency. We built it for business owners who grind every day.</h2>
            <div className="text-lg md:text-xl text-gray-600 font-light space-y-6 leading-relaxed relative z-10">
              <p>
                True Connect was born from a simple truth: entrepreneurs understand entrepreneurs. You need a dedicated growth partner, not just a vendor.
              </p>
              <p className="text-tc-navy font-medium">
                We value your time and your vision. By leveraging AI, digital marketing, and software automation, we solve real business friction.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="animate-on-scroll bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden shadow-md">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-tc-navy scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <Network className="text-tc-navy/30 group-hover:text-tc-navy transition-colors duration-300 mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
              <h3 className="text-xl md:text-2xl font-bold text-tc-navy mb-3 md:mb-4">Global UAE Presence</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                With a partnering team and major clients from top brands in the UAE, we bring elite, premium-level global strategies directly to you.
              </p>
            </div>

            <div className="animate-on-scroll bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden shadow-md" style={{ transitionDelay: '50ms' }}>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-tc-navy scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <Users className="text-tc-navy/30 group-hover:text-tc-navy transition-colors duration-300 mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
              <h3 className="text-xl md:text-2xl font-bold text-tc-navy mb-3 md:mb-4">Innovative Experts</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                A highly dedicated squad of AI integrators, digital marketers, and developers who understand modern market dynamics and value speed.
              </p>
            </div>

            <div className="animate-on-scroll bg-white p-8 md:p-10 rounded-3xl border border-gray-200 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden shadow-md" style={{ transitionDelay: '100ms' }}>
              <div className="absolute top-0 left-0 w-full h-[3px] bg-tc-navy scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <Shield className="text-tc-navy/30 group-hover:text-tc-navy transition-colors duration-300 mb-6 md:mb-8 w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
              <h3 className="text-xl md:text-2xl font-bold text-tc-navy mb-3 md:mb-4">Reliance Jio Partner</h3>
              <p className="text-base text-gray-500 leading-relaxed">
                We also maintain a powerful enterprise connectivity wing, partnered with Reliance Jio, to ensure the core infrastructure of your business never fails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM TEAM SECTION */}
      <section className="py-16 md:py-24 bg-tc-navy text-white relative z-10 overflow-hidden shadow-inner">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 animate-on-scroll">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight">Dedicated To Your Growth.</h2>
            <p className="text-lg md:text-xl font-medium opacity-80">
              We're not scattered across departments or outsourced to the cheapest bidder. We're here, we're dedicated, and we're invested in your success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-on-scroll">
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center hover:bg-white hover:text-tc-navy hover:border-white transition-all duration-300 group">
              <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">MINS</div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">Avg Response Time</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center hover:bg-white hover:text-tc-navy hover:border-white transition-all duration-300 group">
              <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">DAY 1</div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">Onboarding Support</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center hover:bg-white hover:text-tc-navy hover:border-white transition-all duration-300 group">
              <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">UAE</div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">Global Partners</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col items-center text-center hover:bg-white hover:text-tc-navy hover:border-white transition-all duration-300 group">
              <div className="text-5xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">AI</div>
              <p className="text-sm font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">Driven Strategies</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PARTNERSHIP & GLOBAL REACH */}
      <section className="py-16 md:py-24 bg-white relative z-10 border-t border-gray-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 animate-on-scroll order-2 lg:order-1">
            <div className="text-tc-navy text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">Global Expansion</div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-tc-navy mb-6 md:mb-8 tracking-tight">Powering Growth<br className="hidden md:block"/>Across Borders.</h2>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-8 md:mb-10">
              True Connect's team is embedded with enterprise clients across the UAE, driving successful growth for several top brands. Our partnership model brings this massive premium advantage directly to businesses everywhere.
            </p>
            <ul className="space-y-4 md:space-y-6 mb-10 md:mb-12">
              {["International best practices", "Regional market expertise", "Proven scaling strategies"].map((item, i) => (
                <li key={i} className="flex items-center text-base md:text-lg text-tc-navy font-bold">
                  <div className="w-6 h-6 rounded-full bg-tc-navy/10 flex items-center justify-center mr-4">
                    <div className="w-2 h-2 rounded-full bg-tc-navy" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button onClick={() => navigate('/contact-us')} className="bg-tc-navy text-white hover:bg-tc-deepblue font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-xl transition-all hover:scale-105">
              Talk to Our Experts <ArrowRight size={18} className="ml-3"/>
            </Button>
          </div>
          
          <div className="flex-1 w-full h-[500px] relative animate-on-scroll">
             <div className="absolute inset-0 bg-gray-50 rounded-[3rem] border border-gray-200 shadow-inner overflow-hidden flex items-center justify-center">
                <Globe className="absolute text-tc-navy/5" size={500} strokeWidth={0.5} />
                <div className="relative z-10 text-center p-12">
                  <div className="text-tc-navy text-3xl font-black tracking-[0.3em] uppercase mb-6 drop-shadow-sm">INDIA • UAE</div>
                  <div className="w-24 h-[3px] bg-tc-navy/10 mx-auto mb-8" />
                  <p className="text-tc-navy text-xl font-light italic">"Building the digital infrastructure for tomorrow's global enterprises."</p>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
