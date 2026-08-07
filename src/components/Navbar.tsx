import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowUpRight, Phone, Menu, X, ChevronDown } from "lucide-react";
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
      ".nav-pill-container",
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isNavbarVisible = visible || isOpen;
  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-3 md:top-6 left-0 w-full z-50 flex justify-center px-3 sm:px-4 pointer-events-none transition-all duration-500 ease-in-out transform ${
          isNavbarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0"
        }`}
      >
        <div className="nav-pill-container pointer-events-auto w-full max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-5xl rounded-full bg-[#0b1f3f]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(11,31,63,0.4)] px-3 sm:px-4 md:px-5 py-2 flex items-center justify-between transition-all duration-300">
          {/* Left Logo */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center group px-1 flex-shrink-0"
          >
            <img
              src={logo}
              alt="True Connect"
              className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Center Desktop Navigation Links (Visible on Large screens 1024px+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick("/")}
              className={`text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                isLinkActive("/")
                  ? "bg-white/25 text-white shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick("/about-us")}
              className={`text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                isLinkActive("/about-us")
                  ? "bg-white/25 text-white shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              About
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                  location.pathname.includes("services")
                    ? "bg-white/25 text-white shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                Services <ChevronDown className="w-3.5 h-3.5 opacity-80 group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
                <div className="bg-[#0B1F3F] backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/20 p-2 flex flex-col w-56 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={() => handleNavClick("/internet-services")}
                    className="text-left text-xs font-semibold px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  >
                    Internet Services
                  </button>
                  <button
                    onClick={() => handleNavClick("/enterprise-services")}
                    className="text-left text-xs font-semibold px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/20 hover:text-white transition-all"
                  >
                    Enterprise Services
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavClick("/case-studies")}
              className={`text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                isLinkActive("/case-studies")
                  ? "bg-white/25 text-white shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={() => handleNavClick("/contact-us")}
              className={`text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                isLinkActive("/contact-us")
                  ? "bg-white/25 text-white shadow-sm"
                  : "text-white/80 hover:text-white hover:bg-white/15"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Action 1: Careers Arrow link (Desktop) */}
            <button
              onClick={() => handleNavClick("/careers")}
              className="hidden sm:flex w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              title="Careers & Opportunities"
            >
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Action 2: Direct Call */}
            <a
              href="tel:+918848817833"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              title="Call Us Now"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            {/* Action 3: Menu Toggle Button (Visible on Mobile & Tablet < 1024px) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex lg:hidden items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
              title="Toggle Menu"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Fullscreen Drawer Overlay */}
      {isOpen && (
        <div className="pointer-events-auto fixed inset-0 bg-[#0b1f3f] z-[999] px-6 pt-24 pb-12 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-300">
          {/* Top Close Button inside overlay */}
          <div className="absolute top-5 right-6 flex items-center gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center shadow-lg border border-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            <button
              onClick={() => handleNavClick("/")}
              className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all ${
                isLinkActive("/") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick("/about-us")}
              className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all ${
                isLinkActive("/about-us") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              About Us
            </button>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all flex items-center justify-between ${
                  location.pathname.includes("services") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>

              {mobileServicesOpen && (
                <div className="pl-6 pt-2 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => handleNavClick("/internet-services")}
                    className="text-left text-base font-semibold py-2.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Internet Services
                  </button>
                  <button
                    onClick={() => handleNavClick("/enterprise-services")}
                    className="text-left text-base font-semibold py-2.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
                  >
                    Enterprise Services
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick("/case-studies")}
              className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all ${
                isLinkActive("/case-studies") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              Case Studies
            </button>

            <button
              onClick={() => handleNavClick("/contact-us")}
              className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all ${
                isLinkActive("/contact-us") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              Contact Us
            </button>

            <button
              onClick={() => handleNavClick("/careers")}
              className={`text-left text-xl font-bold py-3.5 px-5 rounded-2xl transition-all ${
                isLinkActive("/careers") ? "bg-white/25 text-white shadow-md" : "text-white/85 hover:text-white hover:bg-white/10"
              }`}
            >
              Careers
            </button>
          </div>

          <div className="max-w-sm mx-auto w-full pt-8 border-t border-white/20 flex flex-col items-center gap-4">
            <button
              onClick={() => handleNavClick("/contact-us")}
              className="w-full py-4 bg-white text-[#0b1f3f] font-bold rounded-full text-base shadow-xl hover:bg-gray-100 transition-colors text-center"
            >
              Talk to the Studio
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

