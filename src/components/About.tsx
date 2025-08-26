import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Clock, Users, Award, Globe, Star, Cloud, CheckCircle, ArrowRight } from 'lucide-react';
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
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
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
          <h1 className="about-title text-4xl md:text-5xl font-bold mb-6">
          Why True Connect  <span className="gradient-text">Stands Out</span> 
          </h1>
          <p className="about-title text-l text-muted-foreground max-w-3xl mx-auto">
          We deliver dedicated 1:1 leased line internet with guaranteed speed, reliability, and 24/7 support. From startups to enterprises, True Connect ensures secure, scalable, and high-performance connectivity across India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-cards overflow-x-auto pb-4 mb-20">
          <div className="flex space-x-8 min-w-max">
            {[
              {
                icon: Globe,
                title: 'Dedicated Bandwidth',
                description: '1:1 uplink and downlink ratio bandwidth to support data intensive applications'
              },
              {
                icon: Star,
                title: 'Reliable',
                description: 'Unmatched peering and caching locally to give better internet experience'
              },
              {
                icon: Cloud,
                title: 'Scalable',
                description: 'Upgrade up to 100 Gbps bandwidth as per business needs'
              },
              {
                icon: Shield,
                title: 'Secure',
                description: 'Built-in security with auto-mitigation against cyber threats'
              },
              {
                icon: CheckCircle,
                title: 'Dual Stack Support',
                description: 'IPv4 and IPv6 dual stack connectivity for hosting applications'
              },
              {
                icon: ArrowRight,
                title: 'Service Assurance',
                description: 'Enterprise-grade Service Level Agreement for higher uptime and reliability'
              },
              {
                icon: Cloud,
                title: 'Burstable Bandwidth',
                description: 'Flexible bandwidth allocation that adapts to your business peak requirements'
              },
              {
                icon: Clock,
                title: '24x7 Assisted Care',
                description: 'Round-the-clock technical support and monitoring for uninterrupted service'
              }
            ].map((feature, index) => (
              <div key={index} className="about-card glass-card p-6 text-center hover:scale-105 transition-transform duration-300 w-80 flex-shrink-0">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-s">{feature.description}</p>
              </div>
            ))}
          </div>
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