import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowDown, MapPin, CheckCircle2, Zap, Target, Lightbulb, ChevronRight } from "lucide-react";

// The 4 generated case studies with full content added
const caseStudies = [
  {
    id: 1,
    title: "AI Customer Support Agents",
    industry: "E-Commerce",
    image: "/images/case-studies/fintech.png",
    shortDesc: "How custom AI agents automated 80% of customer support queries for a top e-commerce brand.",
    fullContent: {
      challenge: "A major e-commerce retailer faced a massive backlog of routine customer queries. Support teams couldn't keep up with basic 'where is my order' requests, causing response times to slip past four hours.",
      solution: "We integrated an intelligent agent directly into their helpdesk. Instead of routing everything to humans, the system now handles returns, tracking, and basic product questions autonomously.",
      results: [
        "80% reduction in manual support ticket volume",
        "Average response time dropped from 4 hours to 2 seconds",
        "15% increase in conversion rate via AI upselling"
      ]
    }
  },
  {
    id: 2,
    title: "WhatsApp Booking Automation",
    industry: "Healthcare",
    image: "/images/case-studies/healthcare.png",
    shortDesc: "A fully automated WhatsApp bot that handles appointments, reminders, and payments for a clinic network.",
    fullContent: {
      challenge: "Front desk staff at a regional clinic network spent most of their day answering phones to handle simple appointment scheduling, taking time away from actual patient care in the waiting room.",
      solution: "We moved their entire booking system to WhatsApp. Now, patients can check availability, book slots, and pay consultation fees directly through a chat interface, completely bypassing the phone lines.",
      results: [
        "Zero wait times for patient appointment bookings",
        "45% reduction in no-show appointments via automated reminders",
        "Saved 40+ hours per week in administrative tasks"
      ]
    }
  },
  {
    id: 3,
    title: "Zero-Touch Invoice Workflow",
    industry: "Logistics",
    image: "/images/case-studies/logistics.png",
    shortDesc: "Automating the entire accounts payable workflow for a global logistics company using OCR and RPA.",
    fullContent: {
      challenge: "Processing hundreds of vendor invoices every week was a purely manual task for the finance department. The constant data entry was slow and frequently resulted in payment delays due to typos.",
      solution: "We set up a system that reads incoming invoice emails automatically. It extracts the essential data—like totals and line items—and pushes it straight into their accounting software without manual typing.",
      results: [
        "100% elimination of manual invoice data entry",
        "Invoice processing time reduced from 10 minutes to 30 seconds",
        "Zero data entry errors reported in over 6 months"
      ]
    }
  },
  {
    id: 4,
    title: "AI-Powered B2B Lead Gen",
    industry: "B2B Sales",
    image: "/images/case-studies/edutech.png",
    shortDesc: "How deploying conversational AI on WhatsApp is setting a new standard for qualifying high-ticket leads.",
    fullContent: {
      challenge: "Sales reps were wasting hours chasing cold leads. Meanwhile, highly qualified prospects were dropping off because they had to wait days to get a callback from the team.",
      solution: "We deployed an automated WhatsApp flow that messages leads the moment they fill out a form. It asks a few quick qualifying questions and immediately hands the hot leads over to a live sales rep.",
      results: [
        "3x increase in lead qualification speed",
        "50% higher engagement rate compared to traditional email sequences",
        "Sales team productivity and close rates effectively doubled"
      ]
    }
  }
];

const CaseStudies = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'challenge' | 'solution' | 'impact'>('challenge');
  const [bgImage, setBgImage] = useState(caseStudies[0].image);

  // Preload images
  useEffect(() => {
    caseStudies.forEach((study) => {
      const img = new Image();
      img.src = study.image;
    });
  }, []);

  // Handle smooth transition
  const handleStudyChange = (index: number) => {
    setActiveIndex(index);
    setActiveTab('challenge');
  };

  const activeStudy = caseStudies[activeIndex];

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden selection:bg-blue-500/30">
      {/* We need to ensure Navbar is visible against dark background. */}
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>
      
      {/* Hero Carousel Section */}
      <main className="relative flex-shrink-0 flex items-center justify-center h-screen pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
        >
          {caseStudies.map((study, index) => (
             <div
               key={study.id}
               className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
               style={{
                 backgroundImage: `url(${study.image})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
               }}
             />
          ))}
          {/* Gradient Overlays for readability and mood */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center h-full gap-8 md:gap-12 mt-10 md:mt-0">
          
          {/* Left Content: Active Case Study */}
          <div className="flex-1 max-w-2xl text-white mt-12 md:mt-0 self-start md:self-auto pt-10 md:pt-0">
            <h1 
                key={`title-${activeStudy.id}`}
                className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700"
              >
                {activeStudy.title}
              </h1>
              
              <div 
                key={`content-${activeStudy.id}`}
                className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 font-light max-w-xl pb-10"
              >
                <p className="text-lg text-gray-300 italic mb-4">
                  "{activeStudy.shortDesc}"
                </p>
                
                {/* Minimalist Content Panel (All Visible) */}
                <div className="flex flex-col gap-8 mt-4">
                  {/* Challenge */}
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 pl-5 border-l-2 border-red-500/60">
                    <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">The Challenge</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light tracking-wide">{activeStudy.fullContent.challenge}</p>
                  </div>
                  
                  {/* Solution */}
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-150 pl-5 border-l-2 border-blue-500/60">
                    <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Our Solution</h4>
                    <p className="text-gray-300 leading-relaxed text-sm md:text-base font-light tracking-wide">{activeStudy.fullContent.solution}</p>
                  </div>
                  
                  {/* Impact */}
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500 delay-300 pl-5 border-l-2 border-green-500/60">
                    <h4 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Key Impact</h4>
                    <ul className="space-y-3">
                      {activeStudy.fullContent.results.map((r, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300 text-sm md:text-base font-light group">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          </div>

          {/* Right Content: Circular Thumbnails */}
          <div className="hidden md:flex flex-col gap-8 items-end justify-center py-12 pr-4 relative">
            {/* Subtle connecting arc (simulated with border) */}
            <div className="absolute right-[46px] top-1/2 -translate-y-1/2 w-[200px] h-[80%] border-r-2 border-white/10 rounded-full z-0 opacity-50 pointer-events-none" />

            {caseStudies.map((study, index) => {
              const isActive = index === activeIndex;
              // Calculate horizontal offset to create a curved effect
              const distFromCenter = Math.abs(index - 1.5);
              const translateX = distFromCenter * 15; // pixels to shift left

              return (
                <button
                  key={study.id}
                  onClick={() => handleStudyChange(index)}
                  className={`group relative flex items-center justify-end gap-6 transition-all duration-500 z-10 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{
                     transform: `translateX(-${isActive ? translateX - 10 : translateX}px)`,
                  }}
                >
                  {/* Thumbnail Label */}
                  <div className={`transition-all duration-500 text-right drop-shadow-md ${
                    isActive ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}>
                    <p className="text-white font-bold text-base whitespace-nowrap tracking-wide">{study.title}</p>
                    <p className="text-gray-300 text-xs tracking-wider uppercase mt-1">{study.industry}</p>
                  </div>

                  {/* Circular Image */}
                  <div className={`relative rounded-full overflow-hidden transition-all duration-500 ease-out flex-shrink-0 ${
                    isActive 
                      ? "w-28 h-28 ring-[6px] ring-white/90 ring-offset-[6px] ring-offset-transparent shadow-[0_0_40px_rgba(255,255,255,0.4)]" 
                      : "w-20 h-20 ring-2 ring-white/30 hover:ring-white/70"
                  }`}>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    />
                    {!isActive && <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-300" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden w-full flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide mt-auto px-6">
            {caseStudies.map((study, index) => (
              <button
                key={study.id}
                onClick={() => handleStudyChange(index)}
                className={`flex-shrink-0 snap-center rounded-2xl overflow-hidden relative transition-all duration-500 ${
                  index === activeIndex ? "w-[70vw] h-40 ring-2 ring-white shadow-xl" : "w-32 h-32 opacity-60 mt-4"
                }`}
              >
                <img src={study.image} alt={study.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {index === activeIndex && (
                  <div className="absolute bottom-4 left-4 text-left pr-4">
                    <p className="text-white text-sm font-bold truncate tracking-wide">{study.title}</p>
                    <p className="text-gray-300 text-xs truncate mt-1">{study.industry}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="relative z-50 bg-white">
        <Footer />
      </div>
    </div>
  );
};

export default CaseStudies;
