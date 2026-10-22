import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Phone, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import SocialIcons from "@/components/site/SocialIcons";
import logo from "../assets/logo/nav-logo.webp";
import { nav, business } from "@/content/site";
import { isPrerender } from "@/lib/env";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    if (!isPrerender) {
      gsap.fromTo(
        ".nav-pill-container",
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }

    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 20) setVisible(true);
      else if (y > lastScrollY.current) setVisible(false);
      else setVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the drawer on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;
  const show = visible || isOpen;

  return (
    <>
      <header
        className={`fixed top-5 md:top-6 left-0 w-full z-50 flex justify-center px-6 sm:px-8 lg:px-10 pointer-events-none transition-all duration-500 ease-in-out transform ${
          show ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0"
        }`}
      >
        <div className="nav-pill-container pointer-events-auto w-full max-w-[940px] rounded-full bg-[#0b1f3f]/95 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(11,31,63,0.4)] px-3 sm:px-4 md:px-5 py-2 flex items-center justify-between">
          <Link to="/" className="flex items-center group px-1 flex-shrink-0" aria-label="True Connect home">
            <img
              src={logo}
              alt="True Connect logo"
              width={120}
              height={32}
              className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 xl:gap-2">
            {nav.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs xl:text-sm font-semibold px-3 xl:px-4 py-1.5 rounded-full transition-all duration-200 ${
                  isActive(l.to) ? "bg-white/25 text-white shadow-sm" : "text-white/80 hover:text-white hover:bg-white/15"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/contact#contact-form"
              aria-label="Start a project: go to the enquiry form"
              title="Start a project"
              className="group/cta w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#16305c] ring-1 ring-white/20 text-white hover:bg-tc-yellow hover:text-tc-navy hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200 "
            >
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover/cta:rotate-45" />
            </Link>
            <a
              href={`tel:${business.phoneTel}`}
              aria-label={`Call ${business.phoneDisplay}`}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#16305c] ring-1 ring-white/20 text-white hover:bg-tc-yellow hover:text-tc-navy hover:-translate-y-0.5 flex items-center justify-center transition-all duration-200 "
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#16305c] ring-1 ring-white/20 text-white hover:bg-tc-yellow hover:text-tc-navy hover:-translate-y-0.5 flex lg:hidden items-center justify-center transition-all duration-200"
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 bg-[#0b1f3f] z-[999] px-6 pt-28 pb-12 flex flex-col overflow-y-auto animate-in fade-in duration-300">
          <Link to="/" onClick={() => setIsOpen(false)} className="absolute left-10 top-9 flex h-10 items-center" aria-label="True Connect home">
            <img src={logo} alt="True Connect logo" width={120} height={32} className="h-8 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-9 right-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          <nav aria-label="Mobile" className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            {nav.links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xl font-bold py-3.5 px-5 rounded-2xl ${isActive(l.to) ? "bg-white/25 text-white" : "text-white/85 hover:bg-white/10"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact details and social links */}
          <div className="mx-auto mt-10 w-full max-w-sm border-t border-white/15 pt-8">
            <p className="mb-4 px-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">Get in touch</p>
            <div className="space-y-3 px-5">
              <a href={`tel:${business.phoneTel}`} className="flex items-center gap-3 text-white/90 hover:text-[#E6E84A]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16305c] ring-1 ring-white/20"><Phone className="h-4 w-4" /></span>
                <span className="text-base font-semibold">{business.phoneDisplay}</span>
              </a>
              <a href={business.emailHref} className="flex items-center gap-3 text-white/90 hover:text-[#E6E84A]">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16305c] ring-1 ring-white/20"><Mail className="h-4 w-4" /></span>
                <span className="break-all text-base font-semibold">{business.email}</span>
              </a>
            </div>
            <SocialIcons tone="dark" className="mt-6 px-5" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
