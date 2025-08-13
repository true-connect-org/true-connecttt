import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Users, Award } from 'lucide-react';
import speedChart from '@/assets/speed-chart.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger animations
    gsap.fromTo('.about-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.about-card', 
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-cards',
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.about-chart', 
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-chart',
          start: 'top 80%',
        }
      }
    );

  }, []);

  return (
    <section id="about-us" ref={sectionRef} className="py-20 pt-40 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="about-title text-4xl md:text-5xl font-bold gradient-text mb-6">
            Why Choose True Connect?
          </h2>
          <p className="about-title text-xl text-muted-foreground max-w-3xl mx-auto">
            As India's leading internet service provider, we're committed to delivering 
            unmatched speed, reliability, and customer satisfaction nationwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: Shield,
              title: 'Secure Network',
              description: 'Advanced encryption and security protocols protect your data 24/7.'
            },
            {
              icon: Clock,
              title: '99.9% Uptime',
              description: 'Reliable connection with minimal downtime and instant support.'
            },
            {
              icon: Users,
              title: '10M+ Users',
              description: 'Trusted by millions of customers across India.'
            },
            {
              icon: Award,
              title: 'Award Winning',
              description: 'Recognized as India\'s top ISP for three consecutive years.'
            }
          ].map((feature, index) => (
            <div key={index} className="about-card glass-card p-6 text-center hover:scale-105 transition-transform duration-300">
              <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Growth Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="about-chart">
            <img 
              src={speedChart} 
              alt="India's Internet Growth" 
              className="w-full h-64 object-cover rounded-2xl shadow-elegant"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Leading India's <span className="gradient-text">Digital Revolution</span>
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              True Connect has been at the forefront of India's internet transformation, 
              providing high-speed connectivity to urban and rural areas alike. Our 
              cutting-edge infrastructure ensures you stay connected to what matters most.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Cities Covered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">50K+</div>
                <div className="text-sm text-muted-foreground">Network Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;