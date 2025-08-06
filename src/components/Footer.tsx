import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import logo from '@/assets/logo.png';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    gsap.fromTo('.footer-content', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.footer-content',
          start: 'top 90%',
        }
      }
    );
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hi%20True%20Connect!%20I%20want%20to%20know%20more%20about%20your%20services.', '_blank');
  };

  const openLinkedIn = () => {
    window.open('https://linkedin.com/company/trueconnect', '_blank');
  };

  const openInstagram = () => {
    window.open('https://instagram.com/trueconnectindia', '_blank');
  };

  return (
    <footer className="bg-gradient-to-t from-muted/30 to-background border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img src={logo} alt="True Connect" className="w-10 h-10 object-contain" />
                <div>
                  <h1 className="text-xl font-bold gradient-text">True Connect</h1>
                  <p className="text-xs text-muted-foreground">Boost Your Speed</p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                India's fastest growing internet service provider, delivering high-speed 
                connectivity to millions of homes and businesses across the nation.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={openLinkedIn}
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={openInstagram}
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={openWhatsApp}
                  className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About Us', 'Plans', 'Contact Us'].map((link) => (
                  <li key={link}>
                    <button 
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                      onClick={() => document.getElementById(link.toLowerCase().replace(' ', '-'))?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>High-Speed Internet</li>
                <li>Fiber Optic Connection</li>
                <li>Business Solutions</li>
                <li>24/7 Technical Support</li>
                <li>Network Security</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">support@trueconnect.in</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-primary mt-1" />
                  <span className="text-muted-foreground">
                    True Connect Tower,<br />
                    Mumbai, Maharashtra 400001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                India's #1 Internet Service Provider
              </h3>
              <p className="text-muted-foreground">
                Trusted by millions across the nation
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">10M+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                © 2024 True Connect. All rights reserved. Delivering India's fastest internet.
              </p>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <button className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="hover:text-primary transition-colors duration-300">
                  Terms of Service
                </button>
                <button className="hover:text-primary transition-colors duration-300">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;