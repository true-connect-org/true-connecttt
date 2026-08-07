import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowUpRight, Phone, Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo/nav-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setServicesOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isNavbarVisible = visible || isOpen;

  const isLinkActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-4 md:top-6 left-0 w-full z-50 flex justify-center px-4 pointer-events-none transition-all duration-500 ease-in-out transform ${
        isNavbarVisible
          ? "translate-y-0 opacity-100"
          : "-translate-y-24 opacity-0"
      }`}
    >
      <div className="nav-pill-container pointer-events-auto w-full max-w-4xl lg:max-w-5xl rounded-full bg-[#0b1f3f]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(11,31,63,0.4)] px-3 md:px-5 py-2 flex items-center justify-between transition-all duration-300">
        {/* Left Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center group px-1"
        >
          <img
            src={logo}
            alt="True Connect"
            className="h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => handleNavClick("/")}
            className={`text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
              isLinkActive("/")
                ? "bg-white/20 text-white font-semibold shadow-inner"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick("/about-us")}
            className={`text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
              isLinkActive("/about-us")
                ? "bg-white/20 text-white font-semibold shadow-inner"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            About
          </button>

          {/* Services Dropdown */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                location.pathname.includes("services")
                  ? "bg-white/20 text-white font-semibold shadow-inner"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              Services <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
              <div className="bg-[#0B1F3F]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2 flex flex-col w-56 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <button
                  onClick={() => handleNavClick("/internet-services")}
                  className="text-left text-xs font-medium px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/15 hover:text-white transition-all"
                >
                  Internet Services
                </button>
                <button
                  onClick={() => handleNavClick("/enterprise-services")}
                  className="text-left text-xs font-medium px-4 py-2.5 rounded-xl text-white/90 hover:bg-white/15 hover:text-white transition-all"
                >
                  Enterprise Services
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleNavClick("/case-studies")}
            className={`text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
              isLinkActive("/case-studies")
                ? "bg-white/20 text-white font-semibold shadow-inner"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Case Studies
          </button>

          <button
            onClick={() => handleNavClick("/contact-us")}
            className={`text-xs lg:text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
              isLinkActive("/contact-us")
                ? "bg-white/20 text-white font-semibold shadow-inner"
                : "text-white/70 hover:text-white hover:bg-white/10"
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons (3 circular pill buttons as reference) */}
        <div className="flex items-center gap-2">
          {/* Action 1: Arrow link */}
          <button
            onClick={() => handleNavClick("/careers")}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
            title="Careers & Opportunities"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>

          {/* Action 2: Direct Call */}
          <a
            href="tel:+918848817833"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
            title="Call Us Now"
          >
            <Phone className="w-4 h-4" />
          </a>

          {/* Action 3: Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md cursor-pointer"
            title="Toggle Menu"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="pointer-events-auto fixed inset-0 top-20 bg-slate-950/90 backdrop-blur-3xl z-40 p-6 flex flex-col items-center justify-center gap-6 animate-in fade-in zoom-in duration-300">
          <button
            onClick={() => handleNavClick("/")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("/about-us")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick("/internet-services")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            Internet Services
          </button>
          <button
            onClick={() => handleNavClick("/enterprise-services")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            Enterprise Services
          </button>
          <button
            onClick={() => handleNavClick("/case-studies")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            Case Studies
          </button>
          <button
            onClick={() => handleNavClick("/contact-us")}
            className="text-2xl font-bold text-white hover:text-rose-400 transition-colors"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick("/careers")}
            className="mt-4 px-8 py-3 bg-white text-slate-950 font-bold rounded-full text-base shadow-xl"
          >
            Careers
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;

