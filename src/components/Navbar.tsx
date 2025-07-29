import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/true-connect-logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Navbar entrance animation
    gsap.from('.nav-item', {
      y: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 2.5 // After splash screen
    });

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-elegant ' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item flex items-center space-x-3 cursor-pointer" 
                 onClick={() => scrollToSection('home')}>
              <img src="/lovable-uploads/8fccdabb-a2fc-4157-b8a8-3e46ded07d7f.png" alt="True Connect" className="w-10 h-10 object-contain" />
              <h1 className="text-xl font-bold font-space-grotesk gradient-text tracking-tight">TRUE CONNECT</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'About Us', 'Plans', 'Contact Us'].map((item, index) => (
                <button
                  key={item}
                  className="nav-item text-foreground hover:text-primary transition-colors duration-300 font-medium"
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden nav-item text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border">
            <div className="container mx-auto px-6 py-4 space-y-4">
              {['Home', 'About Us', 'Plans', 'Contact Us'].map((item) => (
                <button
                  key={item}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Divider */}
      {/* <div className="fixed top-[88px] w-full z-30 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div> */}
    </>
  );
};

export default Navbar;