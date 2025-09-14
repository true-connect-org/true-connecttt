import { useEffect } from "react";
import { gsap } from "gsap";
import { Wifi, Zap, Globe, MessageCircle } from "lucide-react";
import networkBg from "@/assets/network-bg.jpg";
import floatingTech from "@/assets/hero-icon.png";

const Hero = () => {
  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-buttons",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".floating-icon",
        {
          scale: 0,
          // rotation: 360,

          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.8"
      );

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.9,
    });
  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%20True%20Connect!%20I%20want%20to%20know%20more%20about%20your%20internet%20plans.",
      "_blank"
    );
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center bg-gradient-mesh overflow-hidden pt-24 "
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        // style={{ backgroundImage: `url(${networkBg})` }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full network-line"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full network-line"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full network-line"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-secondary rounded-full network-line"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 text-shadow">
            Internet That Never Says{" "}
            <span className="gradient-tex">"Try Again."</span>
          </h1>

          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Enterprise leased lines for leaders — unbreakable, unstoppable, and
            built to power your business 24×7.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4 sm:px-0">
            <button
              className="btn-hero"
              onClick={() =>
                document
                  .getElementById("plans")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <span>Level Up</span>
            </button>
            <button className="btn-whatsapp" onClick={openWhatsApp}>
              <MessageCircle size={20} />
              Connect Now
            </button>
          </div>

          {/* Floating Tech Icons */}
          <div className="relative mb-16">
            <div className="floating-icon absolute -top-20 -left-10 md:-left-20">
              <Wifi className="w-12 h-12 text-primary" />
            </div>
            <div className="floating-icon absolute -top-16 -right-10 md:-right-20">
              <Zap className="w-10 h-10 text-secondary" />
            </div>
            <div className="floating-icon absolute -top-12 left-0 md:left-10">
              <Globe className="w-8 h-8 text-primary" />
            </div>

            {/* Floating Tech Image */}
            {/* <div className="floating-icon mx-auto w-64 h-58 overflow-hidden rounded-2xl bg-black/20">
              <img 
                src={floatingTech} 
                alt="Internet Technology" 
                className="w-full h-full object-cover float-animation"
              />
            </div> */}
          </div>
        </div>

        {/* Speed Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20 pt-8 group/stats">
          {[
            { 
              number: "10Gbps", 
              label: "Up To Speed", 
              tooltip: "Lightning-fast internet speeds up to 10 Gigabits per second for seamless business operations"
            },
            { 
              number: "100%", 
              label: "SLA-Backed Uptime", 
              tooltip: "Guaranteed network availability with Service Level Agreement commitments and compensation for any downtime"
            },
            { 
              number: "500+", 
              label: "Enterprises", 
              tooltip: "Trusted by over 500 enterprise businesses across various industries for their critical connectivity needs"
            },
            { 
              number: "24×7", 
              label: "Proactive Monitoring", 
              tooltip: "Round-the-clock network monitoring and proactive issue resolution to prevent disruptions before they occur"
            },
          ].map((stat, index) => (
            <div key={index} className="float-icon text-center group relative transition-all duration-300 ease-out hover:scale-110 hover:z-10 group-hover/stats:scale-95 group-hover/stats:hover:scale-110">
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                {stat.number}
              </div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              
              {/* Separator line between stats */}
              {index < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
