import { useEffect } from "react";
import { gsap } from "gsap";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send } from "lucide-react";

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
    window.open("https://wa.link/pn0hzn", "_blank");
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center bg-gradient-mesh overflow-hidden pt-24 "
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-4 h-4 bg-secondary rounded-full network-line"></div>
        <div className="absolute bottom-32 left-12 w-3 h-3 bg-primary rounded-full network-line"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-shadow text-center">
            India's Best{" "}
            <span className="block sm:inline">
              <span className="gradient-text">"Leased Line"</span>
            </span>{" "}
            <span className="block sm:inline">Provider</span>
          </h1>

          <p className="hero-subtitle text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4 text-center">
            High-speed enterprise leased line with 100% dedicated bandwidth and
            guaranteed uptime for seamless business connectivity.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4 sm:px-0 w-full">
            {/* Primary Hero Button */}
            <Button
              variant="hero"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 font-semibold"
              onClick={() =>
                document
                  .getElementById("plans")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Level Up
            </Button>

            {/* WhatsApp Button */}
            <Button
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 font-semibold flex items-center justify-center gap-2"
              onClick={openWhatsApp}
            >
              <MessageCircle size={20} />
              Let’s Connect
            </Button>
          </div>

          {/* Speed Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20 pt-8 group/stats">
            {[
              {
                number: 10,
                suffix: "Gbps",
                label: "Up To Speed",
                tooltip:
                  "Lightning-fast internet speeds up to 10 Gigabits per second for seamless business operations",
              },
              {
                number: 100,
                suffix: "%",
                label: "SLA-Backed Uptime",
                tooltip:
                  "Guaranteed network availability with Service Level Agreement commitments and compensation for any downtime",
              },
              {
                number: 500,
                suffix: "+",
                label: "Enterprises",
                tooltip:
                  "Trusted by over 500 enterprise businesses across various industries for their critical connectivity needs",
              },
              {
                number: 24,
                suffix: "×7",
                label: "Proactive Monitoring",
                tooltip:
                  "Round-the-clock network monitoring and proactive issue resolution to prevent disruptions before they occur",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="float-icon text-center group relative transition-all duration-300 ease-out hover:scale-110 hover:z-10 group-hover/stats:scale-95 group-hover/stats:hover:scale-110"
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </div>

                {/* Separator line between stats */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
