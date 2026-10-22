import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import SocialIcons from "@/components/site/SocialIcons";
import footerLogo from "../assets/logo/nav-logo.webp";
import { business, footer, fullAddress } from "@/content/site";

const Footer = () => {
  return (
    <footer className="bg-white text-[#eae7e3] px-1.5 sm:px-2 pb-1.5 sm:pb-2 pt-4 font-sans">
      {/* Navy card: same size and shape as the landing page hero card. Content lines up with the navbar. */}
      <div className="max-w-[1560px] mx-auto bg-[#0B1F3F] rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl py-12 md:py-16">
      <div className="container-tc">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Intro */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-6" aria-label="True Connect home">
                <img src={footerLogo} alt="True Connect logo" width={160} height={43} loading="lazy" className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-white text-base font-semibold mb-2">{footer.tagline}</p>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-8">{footer.description}</p>
            </div>

            <SocialIcons tone="dark" />
          </div>

          {/* Column 2: Company */}
          <nav aria-label="Company" className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">COMPANY</h2>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              {footer.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Services */}
          <nav aria-label="Services" className="lg:col-span-3 flex flex-col gap-4">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">SERVICES</h2>
            <ul className="space-y-3 text-sm font-medium text-gray-300">
              {footer.services.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-6">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">CONTACT</h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-6">TRUE CONNECT TRIVANDRUM</p>

              <address className="not-italic space-y-4 text-xs text-gray-300 leading-relaxed">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{fullAddress.replace(/^True Connect Ltd,\s*/, "")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400 flex-shrink-0" />
                  <a href={`tel:${business.phoneTel}`} className="hover:text-white transition-colors">{business.phoneDisplay}</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400 flex-shrink-0" />
                  <a href={business.emailHref} className="hover:text-white transition-colors break-all">{business.email}</a>
                </div>
              </address>
            </div>

            <div>
              <Link
                to="/contact"
                className="inline-block bg-tc-yellow hover:bg-tc-mutedyellow text-tc-navy font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
              >
                GET QUOTE
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {footer.bottom}. All rights reserved.</p>
          <p className="text-gray-400 font-display font-medium text-center md:text-left">{footer.tagline}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
