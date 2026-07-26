import { useState, useEffect } from "react";
import { ArrowRight, ChevronDown, CheckCircle2, X } from "lucide-react";
import { gsap } from "gsap";

// The 4 case studies
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
  const [activeStudy, setActiveStudy] = useState<number | null>(null);

  useEffect(() => {
    // Initial fade in for the page elements
    gsap.fromTo(
      ".cs-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 }
    );
    gsap.fromTo(
      ".cs-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className="bg-tc-lightgray min-h-screen pb-24">
      
      {/* Impressive Animated Dark Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-tc-navy mb-20">
        
        {/* Fallback gradient while video loads */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f3f] via-[#0f2a52] to-[#0a1829] z-0 animate-pulse" />
        
        {/* Animated Video Background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          {/* Abstract particles/network loop suitable for Case Studies */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-loop-27415-large.mp4" type="video/mp4" />
        </video>

        {/* Navy Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-tc-navy/40 via-tc-navy/70 to-tc-navy z-0" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl cs-header mt-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Client Success Stories</h1>
          <p className="text-[#D9D9D9] text-lg md:text-xl font-light max-w-2xl mx-auto">
            Explore how we've helped enterprises across India and the UAE scale their operations through highly-reliable internet infrastructure and custom-built AI platforms.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {caseStudies.map((study, index) => (
            <div 
              key={study.id} 
              className="cs-card group bg-white border border-tc-softgray rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer"
              onClick={() => setActiveStudy(study.id)}
            >
              {/* Image Container with Zoom effect */}
              <div className="relative h-64 md:h-80 overflow-hidden w-full bg-tc-navy">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out" 
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-1.5 shadow-md">
                  <span className="text-xs font-bold uppercase tracking-wider text-tc-navy">{study.industry}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-tc-navy mb-4 group-hover:text-tc-navy transition-colors duration-300">
                  {study.title}
                </h2>
                <p className="text-[#666666] text-sm leading-relaxed mb-8 flex-grow">
                  {study.shortDesc}
                </p>
                <div className="flex items-center text-tc-navy font-semibold text-sm uppercase tracking-wide group-hover:text-tc-navy transition-colors">
                  Read Case Study <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal / Overlay for Full Case Study */}
      {activeStudy !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-tc-navy/90 backdrop-blur-sm cursor-pointer" 
            onClick={() => setActiveStudy(null)}
          />
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm">
            <button 
              className="absolute top-6 right-6 text-[#666666] hover:text-tc-navy transition-colors z-10 bg-white rounded-full p-1 shadow-md"
              onClick={() => setActiveStudy(null)}
            >
              <X size={24} />
            </button>

            {(() => {
              const study = caseStudies.find(s => s.id === activeStudy)!;
              return (
                <div className="flex flex-col">
                  {/* Modal Header Image */}
                  <div className="w-full h-48 md:h-72 relative bg-tc-navy">
                    <img src={study.image} alt={study.title} className="w-full h-full object-cover opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-tc-navy to-transparent" />
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                      <span className="text-tc-navy text-xs font-bold uppercase tracking-wider mb-2 block">{study.industry}</span>
                      <h2 className="text-white text-3xl md:text-4xl">{study.title}</h2>
                    </div>
                  </div>

                  {/* Modal Content */}
                  <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#999999] mb-3">The Challenge</h3>
                        <p className="text-[#333333] text-sm leading-relaxed">{study.fullContent.challenge}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#999999] mb-3">Our Solution</h3>
                        <p className="text-[#333333] text-sm leading-relaxed">{study.fullContent.solution}</p>
                      </div>
                    </div>

                    <div className="bg-tc-lightgray p-8 border border-tc-softgray">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-tc-navy mb-6">Key Impact</h3>
                      <ul className="space-y-4">
                        {study.fullContent.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 size={18} className="text-tc-navy flex-shrink-0 mt-0.5" />
                            <span className="text-[#333333] text-sm font-medium">{result}</span>
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
