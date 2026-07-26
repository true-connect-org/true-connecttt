import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X, Briefcase, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/logo/nav-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      ".notch-container",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    );

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
    setMobileServicesOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isNavbarVisible = visible || isOpen;

  const getNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${
      isActive 
        ? "text-tc-navy bg-white shadow-sm" 
        : "text-white/70 hover:text-white hover:bg-white/10"
    }`;
  };

  const isServicesActive = location.pathname.includes('/internet-services') || location.pathname.includes('/enterprise-services');

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500 ease-in-out transform ${
        isNavbarVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`notch-container bg-tc-navy/95 backdrop-blur-md text-white shadow-2xl border-x border-b border-white/10 transition-all duration-500 ease-in-out ${
          isOpen
            ? "w-full max-w-lg rounded-b-[32px] py-4 px-6"
            : "w-[96%] md:w-[1200px] rounded-b-[32px] py-1 px-8"
        }`}
      >
        <div className="flex flex-col">
          {/* Main Bar */}
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center h-full cursor-pointer group"
            >
              <img
                src={logo}
                alt="True Connect IT Solutions"
                className="h-8 md:h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              <button className={getNavClass("/")} onClick={() => handleNavClick("/")}>
                Home
              </button>
              <button className={getNavClass("/about-us")} onClick={() => handleNavClick("/about-us")}>
                About Us
              </button>
              
              {/* Desktop Services Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-300 ${
                    isServicesActive
                      ? "text-tc-navy bg-white shadow-sm"
                      : "text-white/70 group-hover:text-white group-hover:bg-white/10"
                  }`}
                >
                  Services <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-tc-navy/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-2 flex flex-col w-64 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <button 
                      onClick={() => handleNavClick("/internet-services")} 
                      className={`text-left text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-all relative overflow-hidden group/item ${
                        location.pathname === '/internet-services' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">Internet Services</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-tc-yellow/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    </button>
                    <button 
                      onClick={() => handleNavClick("/enterprise-services")} 
                      className={`text-left text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl transition-all relative overflow-hidden group/item ${
                        location.pathname === '/enterprise-services' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">Enterprise Services</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-tc-yellow/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>
                </div>
              </div>

              <button className={getNavClass("/case-studies")} onClick={() => handleNavClick("/case-studies")}>
                Case Studies
              </button>
              <button className={getNavClass("/contact-us")} onClick={() => handleNavClick("/contact-us")}>
                Contact
              </button>
            </div>

            {/* Right Action Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => handleNavClick("/careers")}
                className="bg-white hover:bg-tc-lightgray text-tc-navy text-xs font-bold uppercase tracking-widest px-6 py-5 rounded-full flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Briefcase size={14} /> Careers
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white hover:text-gray-300 p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Collapsible Navigation */}
          {isOpen && (
            <div className="mt-6 md:hidden border-t border-white/10 pt-6 pb-4 max-h-[70vh] overflow-y-auto flex flex-col gap-4">
              <button
                className="block w-full text-center text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                onClick={() => handleNavClick("/")}
              >
                Home
              </button>
              <button
                className="block w-full text-center text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                onClick={() => handleNavClick("/about-us")}
              >
                About Us
              </button>
              
              {/* Mobile Services Accordion */}
              <div className="w-full">
                <button
                  className="w-full flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="flex flex-col gap-2 mt-2 bg-black/20 rounded-xl p-2 animate-in fade-in zoom-in duration-200">
                    <button
                      className={`block w-full text-center text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all ${
                        location.pathname === '/internet-services' ? 'bg-white text-tc-navy' : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => handleNavClick("/internet-services")}
                    >
                      Internet Services
                    </button>
                    <button
                      className={`block w-full text-center text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all ${
                        location.pathname === '/enterprise-services' ? 'bg-white text-tc-navy' : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={() => handleNavClick("/enterprise-services")}
                    >
                      Enterprise Services
                    </button>
                  </div>
                )}
              </div>

              <button
                className="block w-full text-center text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                onClick={() => handleNavClick("/case-studies")}
              >
                Case Studies
              </button>
              <button
                className="block w-full text-center text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white py-3 rounded-xl hover:bg-white/10 transition-all"
                onClick={() => handleNavClick("/contact-us")}
              >
                Contact Us
              </button>
              <div className="pt-4 mt-2 border-t border-white/10">
                <Button
                  className="w-full bg-white hover:bg-tc-lightgray text-tc-navy text-sm font-bold uppercase tracking-widest py-6 rounded-full flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
                  onClick={() => handleNavClick("/careers")}
                >
                  <Briefcase size={16} /> Careers
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
