import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Plans = () => {
  useEffect(() => {
    gsap.fromTo('.plans-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.plans-title',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.plan-card', 
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.plans-grid',
          start: 'top 85%',
        }
      }
    );
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
  };

  // const plans = [
  //   {
  //     name: '2501 plan',
  //     speed: '500 Mbps',
  //     icon: Zap,
  //     features: [
  //       'Up to 100 Mbps speed',
  //       'Unlimited data',
  //       'Basic support',
  //       'Standard installation',
  //       'Wi-Fi router included'
  //     ],
  //     popular: false,
  //     color: 'primary'
  //   },
  //   {
  //     name: 'Premium',
  //     speed: '500 Mbps',
  //     icon: Star,
  //     features: [
  //       'Up to 500 Mbps speed',
  //       'Unlimited data',
  //       'Priority support',
  //       'Free installation',
  //       'Advanced Wi-Fi router',
  //       'Free OTT subscriptions'
  //     ],
  //     popular: true,
  //     color: 'secondary'
  //   },
  //   {
  //     name: 'Ultra',
  //     speed: '1 Gbps',
  //     icon: Crown,
  //     features: [
  //       'Up to 1 Gbps speed',
  //       'Unlimited data',
  //       '24/7 premium support',
  //       'Free installation & setup',
  //       'Mesh Wi-Fi system',
  //       'All OTT platforms included',
  //       'Static IP option'
  //     ],
  //     popular: false,
  //     color: 'primary'
  //   }
  // ];
  

  const plans = [
    {
      name: 'TRU 50',
      speed: '50',
      unit: 'Mbps',
      subtitle: '/50 Mbps',
      featured: false
    },
    {
      name: 'TRU 100',
      speed: '100',
      unit: 'Mbps',
      subtitle: '/100 Mbps',
      featured: false
    },
    {
      name: 'TRU 200',
      speed: '200',
      unit: 'Mbps',
      subtitle: '/200 Mbps',
      featured: true
    },
    {
      name: 'TRU 500',
      speed: '500',
      unit: 'Mbps',
      subtitle: '/500 Mbps',
      featured: false
    },
    {
      name: 'TRU 1024',
      speed: '1',
      unit: 'Gbps',
      subtitle: '/1 Gbps',
      featured: false
    }
  ];
  
  

  return (
    <section id="plans" className="py-20 pt-40 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="plans-title text-4xl md:text-5xl font-bold mb-5">
            <span className="text-white">Plans</span>{" "}
            <span className="gradient-text">& Pricing</span>
          </h2>
          <p className="plans-title text-l text-muted-foreground max-w-[700px] mx-auto leading-relaxed mb-10 text-center">
            Choose the right internet plan for your business.<strong>True Connect offers dedicated 1:1 leased line internet with guaranteed speed, reliability, and 24/7 support. </strong>  <br /> Whether you need 50 Mbps, 100 Mbps, 200 Mbps, 500 Mbps, or 1 Gbps.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto group/plans mt-15">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`plan-card relative glass-card p-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer group ${
                plan.featured ? 'ring-2 ring-orange-500 shadow-lg group-hover/plans:ring-0 group-hover/plans:group-hover:ring-2 group-hover/plans:group-hover:ring-orange-500' : ''
              } hover:scale-110 hover:z-10 group-hover/plans:scale-95 group-hover/plans:hover:scale-110 hover:ring-2 hover:ring-primary`}
            >
              {/* Plan Title */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold gradient-text mb-1">{plan.speed}</div>
                <div className="text-sm font-bold text-muted-foreground mb-2">{plan.unit}</div>
                <div className="text-xs text-muted-foreground">{plan.subtitle}</div>
              </div>

              {/* Feature Line */}
              <div className="text-center mb-6">
                <p className="text-sm font-medium text-foreground">1:1 LEASED LINE</p>
              </div>

              {/* Buy Now Button - Shows on hover for all cards, but Connect 200 hides when others are hovered */}
              <div className={`transition-opacity duration-300 ${
                plan.featured 
                  ? 'opacity-100 group-hover/plans:opacity-0 group-hover/plans:group-hover:opacity-100' 
                  : 'opacity-0 group-hover:opacity-100'
              }`}>
                <button 
                  onClick={scrollToContact}
                  className="w-full bg-[#F8BD29] hover:bg-[#E5A91A] text-gray-800 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300"
                >
                  BUY NOW →
                </button>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Plans;