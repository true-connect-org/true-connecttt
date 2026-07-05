import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logo/nav-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  
  const lastScrollY = useRef(0);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(".notch-container", {
      y: -100,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isNavbarVisible = visible || isOpen;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out transform ${
        isNavbarVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`notch-container bg-[#0b1f3f]/95 backdrop-blur-md text-white shadow-2xl border-x border-b border-white/20 transition-all duration-500 ease-in-out ${
          isOpen
            ? "w-full max-w-lg rounded-b-[24px] py-3 px-6"
            : "w-[92%] md:w-[1200px] rounded-b-[24px] py-0 px-6 md:px-8"
        }`}
      >
        <div className="flex flex-col">
          {/* Main Bar */}
          <div className="flex items-center justify-between h-14">

            {/* Logo — sized to fill navbar height exactly */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center h-full cursor-pointer"
            >
              <img
                src={logo}
                alt="True Connect IT Solutions"
                className="h-[32px] w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                className="text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all"
                onClick={() => handleNavClick("/")}
              >
                Home
              </button>

              <button
                className="text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all"
                onClick={() => handleNavClick("/about-us")}
              >
                About Us
              </button>

              <button
                className="text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all"
                onClick={() => handleNavClick("/services")}
              >
                Services
              </button>

              <button
                className="text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 px-3.5 py-2 rounded-lg transition-all"
                onClick={() => handleNavClick("/case-studies")}
              >
                Case Studies
              </button>
            </div>

            {/* Right Action Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => handleNavClick("/contact-us")}
                size="sm"
                className="bg-white hover:bg-[#0b1f3f] text-[#0b1f3f] hover:text-white border border-[#0b1f3f] text-xs font-bold px-6 py-2 rounded-full flex items-center gap-1 shadow-lg transition-all duration-300"
              >
                <Phone size={12} />
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/85 hover:text-white p-0.5"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Mobile Collapsible Navigation */}
          {isOpen && (
            <div className="mt-3 space-y-3.5 md:hidden border-t border-white/10 pt-4 pb-3 max-h-[70vh] overflow-y-auto">
              <button
                className="block w-full text-left text-xs text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all"
                onClick={() => handleNavClick("/")}
              >
                Home
              </button>

              <button
                className="block w-full text-left text-xs text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all"
                onClick={() => handleNavClick("/about-us")}
              >
                About Us
              </button>

              <button
                className="block w-full text-left text-xs text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all"
                onClick={() => handleNavClick("/services")}
              >
                Services
              </button>

              <button
                className="block w-full text-left text-xs text-white/80 hover:text-white py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all"
                onClick={() => handleNavClick("/case-studies")}
              >
                Case Studies
              </button>


              <button
                className="w-full bg-white hover:bg-[#0b1f3f] text-[#0b1f3f] hover:text-white border border-[#0b1f3f] text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1 shadow-lg transition-all duration-300"
                onClick={() => handleNavClick("/contact-us")}
              >
                <Phone size={12} />
                Contact Us
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
