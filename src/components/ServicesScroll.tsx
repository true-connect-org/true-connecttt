import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    title: "Internet Services",
    desc: "Experience unparalleled connectivity with our premium enterprise internet solutions. We provide dedicated leased lines, high-speed business broadband, and custom bandwidth configurations powered by robust, redundant infrastructure. Whether you need seamless global communication or secure local networking, our resilient architecture guarantees 99.9% uptime to keep your business running effortlessly.",
    btnColor: "#D5FF37",
    bgColor: "#EDF9FF",
    img: "/images/services/connectivity.png"
  },
  {
    title: "Enterprise Solutions",
    desc: "Transform your operations with end-to-end IT infrastructure designed for modern scalability. We specialize in seamless cloud migrations, advanced cybersecurity frameworks, and unified communications. Our expert architects will modernize your legacy systems, ensuring your data is strictly protected and your team is empowered with the latest enterprise technologies.",
    btnColor: "#7DD6FF",
    bgColor: "#FFECF2",
    img: "/images/services/growth.png"
  },
  {
    title: "AI Integration",
    desc: "Stay ahead of the curve by integrating cutting-edge Artificial Intelligence into your daily workflows. We build bespoke machine learning models, automate repetitive data tasks, and optimize your digital presence for maximum SEO impact. Leverage our AI expertise to unlock deep insights, accelerate digital growth, and make data-driven decisions faster.",
    btnColor: "#FFA0B0",
    bgColor: "#FFE8DB",
    img: "/images/services/software.png"
  },
  {
    title: "Software & Apps",
    desc: "Bring your vision to life with custom-built software tailored precisely to your operational needs. Our elite engineering team develops responsive web platforms, native iOS and Android applications, and deep system integrations. From initial wireframing to final deployment, we prioritize intuitive user experiences, robust performance, and highly scalable architecture.",
    btnColor: "#FFA17B",
    bgColor: "#f9ffe7",
    img: "/images/services/mobile.png"
  }
];

const ServicesScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const imgs = gsap.utils.toArray<HTMLElement>(".img-wrapper img");
      const bgColors = servicesData.map(s => s.bgColor);

      if (!isMobile) {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".arch",
            start: "top top",
            end: "bottom bottom",
            pin: ".arch__right",
            scrub: true
          }
        });

        gsap.set(imgs, {
          clipPath: "inset(0)",
          objectPosition: "0px 0%"
        });

        imgs.forEach((currentImage, index) => {
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;
          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                currentImage,
                {
                  clipPath: "inset(0px 0px 100%)",
                  objectPosition: "0px 60%",
                  duration: 1.5,
                  ease: "none"
                },
                0
              )
              .to(
                nextImage,
                {
                  objectPosition: "0px 40%",
                  duration: 1.5,
                  ease: "none"
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      } else {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: "0px 60%"
        });

        imgs.forEach((image, index) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: "top-=70% top+=50%",
              end: "bottom+=200% bottom",
              scrub: true
            }
          });

          innerTimeline
            .to(image, {
              objectPosition: "0px 30%",
              duration: 5,
              ease: "none"
            });

          mbTimeline.add(innerTimeline);
        });
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full relative z-20">
      <div 
        ref={containerRef} 
        className="w-full px-4 pt-8 pb-0 lg:px-8 bg-gray-50 transition-colors duration-500 ease-in-out" 
        style={{ minHeight: '100vh' }}
      >
        <div className="w-full h-8 md:h-16"></div>

        <div className="arch flex flex-col md:flex-row gap-8 md:gap-[60px] justify-between max-w-[1100px] mx-auto">
          
          <div className="arch__left contents md:flex md:flex-col min-w-[300px]">
            {servicesData.map((service, index) => (
              <div 
                key={`info-${index}`} 
                className="arch__info w-full max-w-full md:max-w-[356px] h-auto md:h-screen flex flex-col justify-center py-6 md:py-0"
                style={{ order: index * 2 }}
              >
                <div className="content">
                  <h2 className="header font-outfit text-4xl lg:text-[42px] font-extrabold tracking-[-0.84px] text-[#121212] mb-2">{service.title}</h2>
                  <p className="desc text-[#121212]/80 text-lg tracking-[-0.54px] my-[6px] mb-[28px] leading-normal">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="arch__right contents md:flex flex-shrink h-auto md:h-screen w-full max-w-[540px] relative md:flex-col">
            {servicesData.map((service, index) => (
              <div 
                key={`img-${index}`} 
                className="img-wrapper relative md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2 h-[280px] md:h-[400px] w-full max-w-full md:max-w-[540px] rounded-[16px] overflow-hidden mb-8 md:mb-0 shadow-2xl" 
                style={{ 
                  zIndex: servicesData.length - index,
                  order: index * 2 + 1 
                }}
              >
                <img src={service.img} alt={service.title} className="w-full h-full object-cover object-center" />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ServicesScroll;
