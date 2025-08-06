import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Wifi, Zap, Globe, MessageCircle } from 'lucide-react';
import networkBg from '@/assets/network-bg.jpg';
import floatingTech from '@/assets/hero-icon.png';

const Hero = () => {
  useEffect(() => {
    // Hero animations
    const tl = gsap.timeline({ delay: 3 });

    tl.from('.hero-title', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.hero-buttons', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.3')
    .from('.floating-icon', {
      scale: 0,
      // rotation: 360,

      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.8');

    // Floating animation for icons
    gsap.to('.floating-icon', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
      stagger: 0.5
    });

  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hi%20True%20Connect!%20I%20want%20to%20know%20more%20about%20your%20internet%20plans.', '_blank');
  };

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-center bg-gradient-mesh overflow-hidden pt-24 ">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${networkBg})` }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full network-line"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full network-line"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-primary rounded-full network-line"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-secondary rounded-full network-line"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto mt-20">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 text-shadow">
            India's <span className="gradient-text">Fastest</span><br />
            Internet Experience
          </h1>
          
          <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience lightning-fast speeds with True Connect. 
            Join millions of satisfied customers across India.
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-hero" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
              View Plans
            </button>
            <button className="btn-whatsapp" onClick={openWhatsApp}>
              <MessageCircle size={20} />
              Chat on WhatsApp
            </button>
          </div>

          {/* Floating Tech Icons */}
          <div className="relative">
            <div className="floating-icon absolute -top-10 -left-10 md:-left-20">
              <Wifi className="w-12 h-12 text-primary" />
            </div>
            <div className="floating-icon absolute -top-8 -right-10 md:-right-20">
              <Zap className="w-10 h-10 text-secondary" />
            </div>
            <div className="floating-icon absolute top-10 left-0 md:left-10">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            
            {/* Floating Tech Image */}
            {/* <div className="floating-icon mx-auto w-64 h-58 overflow-hidden rounded-2xl bg-black/20">
              <img 
                src={floatingTech} 
                alt="Internet Technology" 
                className="w-full h-full object-cover float-animation"
              />
            </div> */}
          </div>
        </div>

        {/* Speed Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20">
          {[
            { number: '1Gbps', label: 'Max Speed' },
            { number: '99.9%', label: 'Uptime' },
            { number: '10M+', label: 'Happy Users' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="float-icon text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;