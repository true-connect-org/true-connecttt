import { Link, useNavigate } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Globe,
  Star,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import footerLogo from "../assets/logo/nav-logo.png";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-[#eae7e3] pt-8 pb-8 px-4 md:px-8 font-sans">
      {/* Main Navy Card Container */}
      <div className="max-w-[1440px] mx-auto bg-[#0B1F3F] rounded-[2.5rem] p-8 md:p-16 border border-white/10 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Intro */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              {/* Logo */}
              <Link to="/" className="inline-block mb-6">
                <img
                  src={footerLogo}
                  alt="True Connect"
                  className="h-10 w-auto object-contain"
                />
              </Link>

              {/* Tagline */}
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">
                We build websites that convert, apps that scale, and connections people remember.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-gray-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Rating"
              >
                <Star size={18} />
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors"
                aria-label="Global"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              QUICK LINKS
            </h4>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
              SERVICES
            </h4>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              <li>
                <Link to="/enterprise-services" className="hover:text-white transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link to="/enterprise-services" className="hover:text-white transition-colors">
                  App Development
                </Link>
              </li>
              <li>
                <Link to="/enterprise-services" className="hover:text-white transition-colors">
                  Systems & Platforms
                </Link>
              </li>
              <li>
                <Link to="/enterprise-services" className="hover:text-white transition-colors">
                  AI Media & Content
                </Link>
              </li>
              <li>
                <Link to="/internet-services" className="hover:text-white transition-colors">
                  Internet Leased Line
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Studio & Contact */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
                STUDIO & CONTACT
              </h4>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-6">
                TRUE CONNECT TECHNOLOGIES
              </p>

              <div className="space-y-4 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Technopark Campus, Trivandrum, Kerala 695581, India
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400 flex-shrink-0" />
                  <a
                    href="tel:+918848817833"
                    className="hover:text-white transition-colors"
                  >
                    +91 88488 17833
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400 flex-shrink-0" />
                  <a
                    href="mailto:info@trueconnect.in"
                    className="hover:text-white transition-colors"
                  >
                    info@trueconnect.in
                  </a>
                </div>
              </div>
            </div>

            {/* GET QUOTE Button */}
            <div>
              <button
                onClick={() => navigate("/contact-us")}
                className="bg-tc-yellow hover:bg-tc-mutedyellow text-tc-navy font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                GET QUOTE
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} True Connect. All rights reserved.</p>

          <p className="italic text-gray-400 font-serif text-center md:text-left">
            "We build with empathy, creativity, and purpose."
          </p>

          <div className="flex items-center gap-6">
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-gray-300 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
