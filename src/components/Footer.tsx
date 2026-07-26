import { Facebook, Instagram, Linkedin, ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import footerLogo from "../assets/logo/w-bg submark.svg";
import { Button } from "./ui/button";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="mb-6 cursor-pointer">
              <img
                src={footerLogo}
                alt="True Connect"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-6">
              Empowering businesses with enterprise-grade IT solutions and ultra-fast, reliable leased line connectivity. Backed by Reliance Jio.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-tc-lightgray border border-gray-200 flex items-center justify-center text-tc-navy hover:bg-tc-deepblue hover:text-white transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-tc-lightgray border border-gray-200 flex items-center justify-center text-tc-navy hover:bg-tc-deepblue hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-tc-lightgray border border-gray-200 flex items-center justify-center text-tc-navy hover:bg-tc-deepblue hover:text-white transition-all duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-bold text-tc-navy uppercase tracking-widest text-xs mb-4">Company</h4>
            <Link to="/" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Home</Link>
            <Link to="/about-us" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">About Us</Link>
            <Link to="/careers" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Careers</Link>
            <Link to="/contact-us" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Contact</Link>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold text-tc-navy uppercase tracking-widest text-xs mb-4">Services</h4>
            <Link to="/internet-services" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Internet Leased Line</Link>
            <Link to="/enterprise-services" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Software Development</Link>
            <Link to="/enterprise-services" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Digital Growth</Link>
            <Link to="/case-studies" className="text-gray-500 hover:text-tc-navy font-medium transition-colors w-fit">Case Studies</Link>
          </div>

          {/* Contact & Newsletter */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-bold text-tc-navy uppercase tracking-widest text-xs mb-4">Get in Touch</h4>
            <div className="flex items-start gap-3 text-gray-500 mb-2">
              <MapPin size={18} className="text-tc-navy flex-shrink-0 mt-1" />
              <span className="text-sm">Trivandrum Technopark, Kerala</span>
            </div>
            <div className="flex items-center gap-3 text-gray-500 mb-2">
              <Phone size={18} className="text-tc-navy flex-shrink-0" />
              <a href="tel:+919048032223" className="text-sm hover:text-tc-navy transition-colors">+91 90480 32223</a>
            </div>
            <div className="flex items-center gap-3 text-gray-500 mb-6">
              <Mail size={18} className="text-tc-navy flex-shrink-0" />
              <a href="mailto:support@trueconnect.in" className="text-sm hover:text-tc-navy transition-colors">support@trueconnect.in</a>
            </div>

            <div className="w-full relative flex items-center bg-tc-lightgray rounded-xl border border-gray-200 overflow-hidden group focus-within:border-tc-navy transition-colors">
              <input
                type="email"
                placeholder="Newsletter Signup"
                className="w-full py-3.5 px-4 outline-none text-sm text-tc-navy bg-transparent placeholder-gray-400"
              />
              <button className="pr-4 pl-2 text-tc-navy hover:scale-110 transition-transform">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} True Connect IT Solutions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-xs text-gray-400 hover:text-tc-navy font-medium transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-tc-navy font-medium transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
