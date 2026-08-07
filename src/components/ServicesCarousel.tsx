import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Monitor,
  Smartphone,
  Server,
  Zap,
  Target,
  Network,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Website Development",
    price: "FROM $3,000",
    description: "Custom, high-performance websites that elevate your brand and drive conversions.",
    icon: Monitor,
    bgGradient: "bg-gradient-to-br from-[#1a4a28] via-[#2d5a27] to-[#0a2e12]",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "02",
    title: "App Development",
    price: "FROM $30,000",
    description: "Mobile apps that feel right and work right for real users on real devices.",
    icon: Smartphone,
    bgGradient: "bg-gradient-to-br from-[#d95321] via-[#c92a54] to-[#7a0d3b]",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "Systems Development",
    price: "FROM $10,000",
    description: "Robust enterprise software solutions engineered for scale and seamless integration.",
    icon: Server,
    bgGradient: "bg-gradient-to-br from-[#0b1f3f] via-[#153460] to-[#040e22]",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    title: "AI & Automation",
    price: "FROM $15,000",
    description: "Intelligent systems that automate workflows and unlock new business capabilities.",
    icon: Zap,
    bgGradient: "bg-gradient-to-br from-[#4c248b] via-[#6b31c9] to-[#25104a]",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "05",
    title: "Brand Strategy",
    price: "FROM $8,000",
    description: "Comprehensive brand identity and digital marketing to dominate your market.",
    icon: Target,
    bgGradient: "bg-gradient-to-br from-[#0f5c6e] via-[#1a8a9e] to-[#083540]",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "06",
    title: "Connectivity",
    price: "CUSTOM",
    description: "Enterprise-grade networking and broadband solutions powered by industry leaders.",
    icon: Network,
    bgGradient: "bg-gradient-to-br from-[#2a2a2a] via-[#404040] to-[#111111]",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
  }
];

const ServicesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12">
        {/* Carousel Header / Navigation */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-gray-400 mb-6 block">OUR SERVICES</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#2d2a26] tracking-tight mb-8 max-w-4xl">
            Premium Digital & Infrastructure Solutions
          </h2>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed">
            End-to-end digital engineering and robust network solutions that elevate your brand and ensure your operations perform flawlessly.
          </p>
          
          <div className="hidden md:flex items-center gap-3 mt-8 md:absolute md:bottom-0 md:right-0 md:mt-0">
            <button
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
              aria-label="Previous slide"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
              aria-label="Next slide"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={service.id}
                  className="embla__slide flex-[0_0_95%] sm:flex-[0_0_75%] md:flex-[0_0_60%] lg:flex-[0_0_50%] xl:flex-[0_0_40%] min-w-0"
                >
                  <div className={`relative w-full aspect-[4/3] md:h-[380px] md:aspect-auto rounded-[2rem] overflow-hidden p-8 flex flex-col justify-between group ${service.bgGradient} transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl`}>
                    
                    {/* Background Image */}
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 pointer-events-none"
                    />

                    {/* Top Row: Icon and Badge */}
                    <div className="hidden md:flex items-start justify-between z-10 relative">
                      <div className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      
                      <div className="px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] shadow-lg">
                        {service.id} / 06
                      </div>
                    </div>

                    {/* Bottom Content */}
                    <div className="z-10 relative mt-auto">
                      <div className="mb-3 hidden md:block">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                          {service.price}
                        </span>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-semibold text-white mb-0 md:mb-4 leading-tight group-hover:-translate-y-1 transition-transform duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="hidden md:block text-white/90 text-sm md:text-base leading-relaxed pr-16 md:opacity-0 md:-translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                        {service.description}
                      </p>


                    </div>

                    {/* Subtle Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCarousel;
