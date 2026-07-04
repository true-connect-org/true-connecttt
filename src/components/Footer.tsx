import { Facebook, Instagram, Linkedin, ArrowRight } from "lucide-react";
import footerLogo from "../assets/logo/w-bg submark.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-50 h-auto md:h-[50vh] flex flex-col justify-between">
      <div className="max-w-[1200px] w-full mx-auto flex-1 flex flex-col justify-center items-center text-center px-6 md:px-12 py-8 md:py-0">
        <p className="text-gray-700 mb-6 max-w-lg mx-auto text-sm md:text-base">
          Empowering businesses with enterprise-grade IT solutions and
          ultra-fast, reliable leased line connectivity.
        </p>

        <div className="w-full max-w-2xl relative flex items-center bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="pl-4 pr-2 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-700 inline-block"></span>
          </div>
          <input
            type="email"
            placeholder="Subscribe to our newsletter"
            className="w-full py-4 px-3 outline-none text-sm text-gray-900 placeholder-gray-500"
          />
          <button className="pr-4 pl-2 text-gray-600 hover:text-black transition-colors">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
        {/* Left Side */}
        <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 p-6 md:p-12 min-h-[150px] relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-6 md:left-8 pointer-events-none">
            <img
              src={footerLogo}
              alt="True Connect"
              className="h-[40px] md:h-[60px] w-auto object-contain"
            />
          </div>
          <p className="text-xs text-gray-500 font-medium mt-auto relative z-10">
            ©2026 True Connect, Inc. All Rights Reserved.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-between p-6 md:p-12 min-h-[150px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <a
                href="#home"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Home
              </a>
              <a
                href="#plans"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Services
              </a>
              <a
                href="#faq"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                FAQ
              </a>
              <a
                href="#contact-us"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                Contact
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Instagram size={16} /> Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                <Facebook size={16} /> Facebook
              </a>
            </div>
          </div>
          <p className="text-xs text-gray-500 font-medium mt-auto">
            Privacy Notice
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
