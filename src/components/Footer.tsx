import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Instagram, Phone, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  useEffect(() => {
    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-content",
          start: "top 90%",
        },
      }
    );
  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/919876543210?text=Hi%20True%20Connect!%20I%20want%20to%20know%20more%20about%20your%20services.",
      "_blank"
    );
  };

  const openLinkedIn = () => {
    window.open(
      "https://www.linkedin.com/in/true-connect-92679a390/",
      "_blank"
    );
  };

  const openInstagram = () => {
    window.open("https://www.instagram.com/true.connectt/", "_blank");
  };

  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="footer-content">
          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 mb-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                India's #1{" "}
                <span className="gradient-text">Internet Service Provider</span>
              </h3>
              <p className="text-muted-foreground">
                Trusted by millions across the nation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  10M+
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Users
                </div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                  500+
                </div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  99.9%
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-secondary mb-1">
                  24/7
                </div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="text-center mb-16 sm:mb-20 px-4">
            <div className="max-w-6xl mx-auto text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">
                    Quick Links
                  </h3>
                  <ul className="space-y-2">
                    {["Home", "About Us", "Plans", "Contact Us"].map((link) => (
                      <li key={link}>
                        <button
                          className="text-muted-foreground hover:text-primary transition-colors duration-300"
                          onClick={() =>
                            document
                              .getElementById(
                                link.toLowerCase().replace(" ", "-")
                              )
                              ?.scrollIntoView({ behavior: "smooth" })
                          }
                        >
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">
                    Our Services
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>High-Speed Internet</li>
                    <li>Fiber Optic Connection</li>
                    <li>Business Solutions</li>
                    <li>24/7 Technical Support</li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">
                    Contact Info
                  </h3>
                  <div className="space-y-3 text-muted-foreground">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>+91 8848817833</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>support@true-connect.in</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="leading-snug">
                        Trivandrum Technopark, Thejaswini Building, SBC 22, -2,
                        695581
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border pt-10">
            <div className="flex justify-center items-center">
              <p className="text-muted-foreground text-sm text-center">
                © 2025 True Connect. All rights reserved. Delivering India's
                fastest internet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
