import { useLayoutEffect, useRef } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Globe,
  Target,
  Shield,
  Users,
  Network,
  Heart,
  Lightbulb,
  Palette,
  Code2,
  Monitor,
  Smartphone,
  Server,
  MapPin,
  Mail,
  Phone
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// 6 Values Data (Screenshot 1)
const values = [
  {
    icon: Heart,
    title: "Empathy First",
    desc: "We listen before we build. Understanding your business means delivering solutions that actually fit.",
    bgColor: "bg-rose-50 text-rose-500"
  },
  {
    icon: Lightbulb,
    title: "Creative Problem Solving",
    desc: "We blend design thinking with engineering to find elegant answers to complex challenges.",
    bgColor: "bg-amber-50 text-amber-500"
  },
  {
    icon: Palette,
    title: "Design-Led",
    desc: "Every pixel is intentional. We craft interfaces people enjoy using, not just functional, but beautiful.",
    bgColor: "bg-purple-50 text-purple-500"
  },
  {
    icon: Code2,
    title: "Modern Stack",
    desc: "React, Node, AI tools, cloud-native. We use the best tools for the job, not just what we know.",
    bgColor: "bg-blue-50 text-blue-500"
  },
  {
    icon: Sparkles,
    title: "AI-Augmented",
    desc: "We integrate AI into our workflow and yours, from brand imagery to intelligent product features.",
    bgColor: "bg-emerald-50 text-emerald-500"
  },
  {
    icon: Globe,
    title: "Global Reach & Local Heart",
    desc: "Based in India & UAE, serving clients worldwide. Local heart, global enterprise standards.",
    bgColor: "bg-indigo-50 text-indigo-500"
  }
];

// 6 What We Do Mini Cards (Screenshot 2)
const servicesList = [
  {
    icon: Monitor,
    title: "Websites",
    desc: "Landing pages to full e-commerce. Responsive, fast, and SEO-ready."
  },
  {
    icon: Smartphone,
    title: "Apps",
    desc: "Native and cross-platform mobile apps with polished UIs."
  },
  {
    icon: Server,
    title: "Platforms",
    desc: "Custom portals, dashboards, and workflow systems."
  },
  {
    icon: Sparkles,
    title: "AI Media",
    desc: "AI-generated photos, videos, and hero animations."
  },
  {
    icon: Palette,
    title: "Brand Identity",
    desc: "Logo, color, typography. Complete visual identity systems."
  },
  {
    icon: Lightbulb,
    title: "IT Consulting",
    desc: "Technology guidance, roadmaps, and architecture reviews."
  }
];

const AboutUs = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero Header Text Stagger
      gsap.fromTo(
        ".about-hero-text",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }
      );

      // Hero Image Card Scroll Scale Animation (Grows as user scrolls)
      if (imageCardRef.current && imageContainerRef.current) {
        gsap.fromTo(
          imageCardRef.current,
          {
            scale: 0.82,
            borderRadius: "2.5rem",
          },
          {
            scale: 1,
            borderRadius: "1.5rem",
            ease: "none",
            scrollTrigger: {
              trigger: imageContainerRef.current,
              start: "top 85%",
              end: "bottom 85%",
              scrub: 1,
            }
          }
        );
      }

      // Scroll Fade-in for Content Sections
      gsap.utils.toArray<HTMLElement>(".animate-on-scroll").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#2d2a26] font-sans pt-20 md:pt-24 pb-12 overflow-x-hidden">
      {/* 1. HERO HEADER SECTION */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mb-8 md:mb-10">
          <div className="max-w-4xl">
            {/* Category Tag */}
            <span className="about-hero-text text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-6 block">
              ABOUT US
            </span>

            {/* Main Headline */}
            <h1 className="about-hero-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#2d2a26] leading-[1.1] mb-8">
              We design and engineer custom websites for ambitious brands.
            </h1>

            {/* Description Subtitle */}
            <p className="about-hero-text text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed mb-10 font-normal">
              We started with a simple belief: performance and design shouldn't be a trade-off. Today, True Connect is an enterprise design engineering studio based in Trivandrum, India & UAE. We combine premium aesthetics with blazing-fast performance, delivered from our studio to ambitious brands across Asia-Pacific and the Middle East. Every project is handled in-house, every line of code is ours, and every client gets our full attention.
            </p>

            {/* Dual Action Buttons */}
            <div className="about-hero-text flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-black hover:bg-gray-800 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Talk to the studio <ArrowUpRight size={16} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("what-we-do-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              >
                View Packages
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. HERO IMAGE CARD (SCROLL SCALE ANIMATION) */}
      <div ref={imageContainerRef} className="w-full py-2 md:py-6 flex justify-center px-4 md:px-8">
        <div 
          ref={imageCardRef}
          className="hero-image-card w-full max-w-[1400px] h-[380px] sm:h-[480px] md:h-[640px] lg:h-[720px] overflow-hidden shadow-2xl relative origin-center bg-gray-900"
        >
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80" 
            alt="Studio Design & Engineering Team"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </div>

      {/* 3. OUR VALUES SECTION ("What drives us" - Screenshot 1) */}
      <section className="py-12 md:py-16 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="animate-on-scroll max-w-3xl mb-8 md:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              OUR VALUES
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              What drives us
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
              Six principles that shape every project, every conversation, every line of code.
            </p>
          </div>

          {/* 6 Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="animate-on-scroll bg-white p-8 md:p-10 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-full ${val.bgColor} flex items-center justify-center mb-8 shadow-sm`}>
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-[#2d2a26] mb-4">
                      {val.title}
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed font-normal">
                      {val.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHAT WE DO SECTION ("Full-stack creative tech" - Screenshot 2) */}
      <section id="what-we-do-section" className="py-12 md:py-16 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="animate-on-scroll max-w-3xl mb-8 md:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              WHAT WE DO
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              Full-stack creative tech
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
              From landing pages to full platforms. Design, engineering, AI, and branding under one roof.
            </p>
          </div>

          {/* 6 Mini Service Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-10">
            {servicesList.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="animate-on-scroll bg-gray-50/70 hover:bg-white border border-gray-200/60 hover:border-gray-300 p-6 rounded-[1.25rem] transition-all duration-300 hover:shadow-md flex flex-col text-left group"
                >
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-200/80 flex items-center justify-center text-gray-700 mb-6 group-hover:scale-110 transition-transform shadow-xs">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-[#2d2a26] mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Link at Bottom */}
          <div className="text-center animate-on-scroll">
            <button
              onClick={() => navigate("/contact-us")}
              className="text-xs font-semibold text-gray-600 hover:text-black transition-colors inline-flex items-center gap-1.5"
            >
              See all packages & pricing <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. OUR SPACE SECTION ("Where the magic happens" - Screenshot 3) */}
      <section className="py-12 md:py-16 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="animate-on-scroll max-w-3xl mb-8 md:mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              OUR SPACE
            </span>
            <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
              Where the magic happens
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-normal">
              Our studio in Trivandrum & UAE, where ideas become products.
            </p>
          </div>

          {/* 2 Studio Workspace Image Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 animate-on-scroll">
            {/* Left Image: Monochrome / Sleek Architecture */}
            <div className="w-full h-[360px] md:h-[480px] rounded-[1.75rem] overflow-hidden shadow-lg border border-gray-200/80 bg-gray-900 group">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" 
                alt="Studio Workspace Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale hover:grayscale-0"
              />
            </div>

            {/* Right Image: Vibrant Colorful Studio Interior */}
            <div className="w-full h-[360px] md:h-[480px] rounded-[1.75rem] overflow-hidden shadow-lg border border-gray-200/80 bg-gray-900 group">
              <img 
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80" 
                alt="Studio Creative Lounge"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Location Address Tag */}
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 font-medium text-center animate-on-scroll">
            <MapPin size={16} className="text-gray-400 flex-shrink-0" />
            <span>Technopark Phase 3 & HQ Trivandrum, Kerala, India · UAE Partner Operations, Dubai</span>
          </div>
        </div>
      </section>

      {/* 7. READY TO START BUILDING CTA SECTION (Screenshot) */}
      <section className="py-14 md:py-20 bg-gray-50/40 text-center relative border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-medium text-[#2d2a26] tracking-tight mb-6">
            Ready to start building?
          </h2>
          
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
            Let's talk about your project. No pressure, just a conversation about what's possible.
          </p>

          {/* Bordered Pill Button */}
          <div className="mb-10 flex justify-center">
            <button
              onClick={() => navigate("/contact-us")}
              className="border-2 border-tc-navy hover:border-tc-deepblue bg-white hover:bg-tc-navy text-tc-navy hover:text-white font-bold text-xs tracking-[0.2em] uppercase px-10 py-5 rounded-full shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              TALK TO THE STUDIO
            </button>
          </div>

          {/* Contact Info Row */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs md:text-sm text-gray-600 font-medium mb-8">
            <a href="mailto:info@trueconnect.in" className="flex items-center gap-2 hover:text-tc-navy transition-colors">
              <Mail size={16} className="text-tc-navy" />
              <span>info@trueconnect.in</span>
            </a>
            <a href="tel:+919072000000" className="flex items-center gap-2 hover:text-tc-navy transition-colors">
              <Phone size={16} className="text-tc-navy" />
              <span>+91 9072 000 000</span>
            </a>
          </div>

          {/* Location Footer */}
          <div className="flex items-center justify-center gap-2 text-[11px] md:text-xs text-gray-500 font-normal">
            <MapPin size={14} className="text-tc-navy flex-shrink-0" />
            <span>Technopark Phase 3 & HQ Trivandrum, Kerala, India · UAE Partner Operations, Dubai</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
