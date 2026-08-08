import { useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Cpu } from "lucide-react";

const Hero = () => {
  useEffect(() => {
    // Hero Entrance Text Reveal animation
    const tl = gsap.timeline({ delay: 0.15 });
    gsap.set(".hero-reveal-line", { transformPerspective: 800 });

    tl.fromTo(
      ".hero-tag",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        ".hero-reveal-line",
        { y: "115%", opacity: 0, rotateX: 12 },
        { y: "0%", opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.16, ease: "power4.out" },
        "-=0.3"
      )
      .fromTo(
        ".hero-desc",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-ctas",
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
        "-=0.3"
      );
  }, []);

  const openWhatsApp = () => {
    window.open("https://wa.me/918848817833?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20IT%20solutions.", "_blank");
  };

  return (
    <section id="home" className="relative flex flex-col lg:flex-row items-center min-h-[100dvh] lg:min-h-screen justify-center bg-gradient-mesh overflow-hidden">
      
      {/* Image Section (Top on mobile, Right on desktop) */}
      <div className="relative w-full h-[50vh] min-h-[350px] lg:absolute lg:inset-y-0 lg:right-0 lg:w-7/12 lg:h-full z-0 overflow-hidden lg:overflow-visible">
        {/* Desktop Diagonal Cut */}
        <svg 
          className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block z-10" 
          viewBox="0 0 100 100" 
          fill="currentColor" 
          preserveAspectRatio="none slice"
        >
          <path d="M50 0H100L50 100H0L50 0Z"></path>
        </svg>
        
        {/* Mobile Diagonal Cut (Bottom) */}
        <svg 
          className="absolute bottom-[-1px] left-0 w-full h-16 text-white lg:hidden z-10" 
          viewBox="0 0 100 100" 
          fill="currentColor" 
          preserveAspectRatio="none"
        >
          <polygon points="0,100 100,0 100,100" />
        </svg>

        <img 
          className="object-cover w-full h-full object-center lg:shadow-none transition-transform duration-700 hover:scale-105" 
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
          alt="IT Solutions Team Working" 
        />
      </div>

      {/* Text Content (Bottom on mobile, Left on desktop) */}
      <div className="relative flex flex-col items-start w-full max-w-xl px-6 mx-auto md:px-12 lg:max-w-[1200px] z-20 pt-6 pb-6 lg:py-40">
        <div className="w-full lg:max-w-lg lg:pr-5 mt-2 lg:mt-0">
          {/* Main Title */}
          <h1 className="hero-title mb-3 font-satoshi text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight sm:leading-tight">
            <span className="block overflow-hidden py-0.5">
              <span
                className="hero-reveal-line inline-block transform-gpu"
                style={{
                  background: "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.1em",
                }}
              >
                Design engineering
              </span>
            </span>
            <span className="block overflow-hidden py-0.5">
              <span
                className="hero-reveal-line inline-block transform-gpu"
                style={{
                  background: "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  paddingBottom: "0.2em",
                  paddingRight: "0.15em",
                }}
              >
                for ambitious brands.
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-desc pr-2 lg:pr-5 mb-5 lg:mb-7 text-xs sm:text-base text-muted-foreground leading-relaxed font-satoshi font-normal">
            We design and build custom websites, portals, and apps with uncompromised performance. High-speed connectivity & IT solutions tailored for your growth.
          </p>

          {/* Buttons */}
          <div className="hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              className="bg-[#0b1f3f] hover:bg-[#0f2d5a] text-white px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-[13px] sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all"
              onClick={() =>
                document
                  .getElementById("plans")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get Started <ArrowRight size={16} />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-border hover:bg-muted text-foreground px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-[13px] sm:text-base flex items-center justify-center gap-2"
              onClick={openWhatsApp}
            >
              <MessageCircle size={18} className="text-[#1EA952]" />
              Let's Connect
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
