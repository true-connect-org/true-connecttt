import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "plans", label: "Services" },
  { id: "faq", label: "FAQ" },
  { id: "contact-us", label: "Contact" },
  { id: "about-us", label: "About" },
];

const SectionIndicators = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section in view
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      let currentSection = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
      {/* Frosted Glass Capsule */}
      <div className="flex flex-col gap-4 py-5 px-3 rounded-full backdrop-blur-xl bg-white/40 border border-white/50 shadow-2xl">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <div key={section.id} className="relative group flex items-center justify-center">
              {/* Premium Tooltip */}
              <div className="absolute right-10 bg-white/95 backdrop-blur-md text-[#0b1f3f] border border-white/60 text-[10px] uppercase font-bold tracking-widest px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
                {section.label}
              </div>
              
              {/* Stretching Pill Indicator */}
              <button
                onClick={() => scrollTo(section.id)}
                aria-label={`Scroll to ${section.label}`}
                className={`w-1.5 transition-all duration-500 rounded-full relative focus:outline-none ${
                  isActive
                    ? "h-8 bg-gradient-to-b from-[#0b1f3f] to-[#2d6aad] shadow-[0_0_12px_rgba(11,31,63,0.5)]"
                    : "h-1.5 bg-[#0b1f3f]/30 hover:bg-[#0b1f3f]/60 hover:h-3"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SectionIndicators;
