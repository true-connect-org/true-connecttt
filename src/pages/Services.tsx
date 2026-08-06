import React, { useEffect } from "react";
import ServicesScroll from "@/components/ServicesScroll";

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-tc-navy font-sans">
      {/* Page Header */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-tc-navy text-white text-center rounded-b-[3rem]">
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
          Our Enterprise Services
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          Explore our suite of enterprise-grade connectivity, software, and AI
          solutions designed to scale your business.
        </p>
      </section>

      {/* Dynamic Scroll Section */}
      <ServicesScroll />
    </div>
  );
};

export default Services;
