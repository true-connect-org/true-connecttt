import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import logoText from "../assets/logo-text.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar entrance animation
    gsap.from(".nav-item", {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#23587C]/90 backdrop-blur-md shadow-lg ring-1 ring-white/10"
            : "bg-[#23587C] shadow-md"
        }`}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="nav-item flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <img
                src={logoText}
                alt="True Connect Text"
                className="h-8 object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {["Home", "Plans", "FAQ", "Contact Us", "About Us"].map(
                (item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    size="sm"
                    className="nav-item relative text-white hover:text-white hover:bg-white/10 transition-colors duration-200 font-medium after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-0.5 after:w-0  after:transition-all after:duration-200 hover:after:w-8"
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                  >
                    {item}
                  </Button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden nav-item text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#23587C] border-t border-white/10">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {["Home", "Plans", "FAQ", "Contact Us", "About Us"].map(
                (item) => (
                  <Button
                    key={item}
                    variant="ghost"
                    className="block w-full justify-start text-white hover:text-white hover:bg-white/10 transition-colors duration-200 font-medium py-2"
                    onClick={() =>
                      scrollToSection(item.toLowerCase().replace(" ", "-"))
                    }
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
