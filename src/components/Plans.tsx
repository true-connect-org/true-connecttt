import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Star, Crown } from 'lucide-react';

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

  const plans = [
    {
      name: 'Starter',
      speed: '100 Mbps',
      icon: Zap,
      features: [
        'Up to 100 Mbps speed',
        'Unlimited data',
        'Basic support',
        'Standard installation',
        'Wi-Fi router included'
      ],
      popular: false,
      color: 'primary'
    },
    {
      name: 'Premium',
      speed: '500 Mbps',
      icon: Star,
      features: [
        'Up to 500 Mbps speed',
        'Unlimited data',
        'Priority support',
        'Free installation',
        'Advanced Wi-Fi router',
        'Free OTT subscriptions'
      ],
      popular: true,
      color: 'secondary'
    },
    {
      name: 'Ultra',
      speed: '1 Gbps',
      icon: Crown,
      features: [
        'Up to 1 Gbps speed',
        'Unlimited data',
        '24/7 premium support',
        'Free installation & setup',
        'Mesh Wi-Fi system',
        'All OTT platforms included',
        'Static IP option'
      ],
      popular: false,
      color: 'primary'
    }
  ];

  return (
    <section id="plans" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="plans-title text-4xl md:text-5xl font-bold gradient-text mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="plans-title text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience lightning-fast internet with our flexible plans designed for every need.
            From basic browsing to enterprise solutions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="plans-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto ">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`plan-card relative glass-card p-8 hover:scale-105 transition-all duration-300 ${
                plan.popular ? 'ring-2 ring-secondary shadow-secondary' : 'hover:ring-2 ring-secondary '
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Icon */}
              <div className="text-center mb-6">
                <plan.icon className={`w-16 h-16 mx-auto mb-4 ${
                  plan.color === 'primary' ? 'text-primary' : 'text-secondary'
                }`} />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold gradient-text mb-2">{plan.speed}</div>
                <p className="text-muted-foreground">Lightning Fast</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Buy Now Button */}
              <button 
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105  ${
                  plan.popular 
                    ? 'btn-secondary' 
                    : 'btn-hero'
                }`}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include free installation, 24/7 support, and no hidden charges.
          </p>
          <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
            <span>✓ No data caps</span>
            <span>✓ Free equipment</span>
            <span>✓ Easy cancellation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;