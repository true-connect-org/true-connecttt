import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="absolute top-0 w-full z-50">
        <Navbar />
      </div>

      {/* SERVICE 1: Connectivity & Telecom (Light Blue Band) */}
      <section className="relative bg-blue-50 pt-32 pb-24 px-6 md:px-12 text-slate-800 overflow-visible">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-serif tracking-widest mb-16 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0b1f3f] to-[#2d6aad]">
            Connectivity & Telecom
          </h2>

          {/* Decorative Divider */}
          <div className="flex justify-center items-center mb-16 gap-4 opacity-50">
            <div className="w-1/4 h-px bg-blue-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <div className="w-1/4 h-px bg-blue-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center relative">
            <div className="md:text-right text-slate-600 font-light leading-loose text-sm md:text-base">
              <p className="mb-6">
                We deliver ultra-reliable, high-bandwidth leased lines and
                robust SD-WAN architectures. Designed for businesses that cannot
                afford a single millisecond of downtime.
              </p>
              <p>
                Our infrastructure forms the unshakeable backbone of modern
                enterprise operations.
              </p>
            </div>

            {/* Central Graphic */}
            <div className="hidden md:flex flex-col items-center justify-center h-full opacity-80 gap-6">
              <div className="w-8 h-32 border-x-2 border-t-2 border-blue-200 rounded-t-full flex flex-col items-center justify-start pt-2">
                <div className="w-4 h-4 rounded-full bg-blue-400 mb-2 shadow-[0_0_12px_rgba(96,165,250,0.5)]" />
                <div className="w-px h-16 bg-blue-200" />
              </div>
              <div className="w-4 h-32 border-x border-b border-blue-200 rounded-b-full flex flex-col items-center justify-end pb-2">
                <div className="w-px h-20 bg-blue-200 mb-2" />
                <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]" />
              </div>
            </div>

            <div className="text-slate-600 font-light leading-loose text-sm md:text-base">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span>99.999% guaranteed uptime SLA across all nodes.</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <span>
                    Sub-millisecond execution times for critical financial data.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 2: Software & SaaS (White Band) */}
      <section className="relative bg-white py-32 px-6 md:px-12 text-slate-800 border-t-4 border-blue-900/10">
        {/* Overlapping Image (Left Edge) */}
        <div className="absolute -top-20 md:-top-40 -left-16 md:-left-24 lg:-left-20 w-56 h-56 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-[8px] md:border-[16px] border-white shadow-2xl z-20 transform -rotate-3 hover:scale-105 transition-transform duration-500">
          <img
            src="/images/services/software.png"
            alt="Software Dashboard"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[600px] mx-auto lg:mx-0 lg:ml-auto lg:mr-24 text-center lg:text-left relative z-10 pt-32 md:pt-10 pb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-10 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0b1f3f] to-[#2d6aad]">
            Software & SaaS
          </h2>

          <p className="text-slate-600 leading-loose text-sm md:text-base mb-12">
            Custom-built software architectures and scalable SaaS platforms
            designed to accelerate business. We build intelligent software
            utilizing modern tech stacks to deliver platforms that solve complex
            business logic seamlessly.
          </p>

          <button className="px-10 py-3 border-2 border-[#0b1f3f] text-[#0b1f3f] hover:bg-[#0b1f3f] hover:text-white transition-all font-semibold tracking-widest uppercase text-sm rounded-md shadow-md">
            Explore Engineering
          </button>
        </div>
      </section>

      {/* SERVICE 3: Mobile & Web Dev (Light Blue Band) */}
      <section className="relative bg-blue-50 py-32 px-6 md:px-12 text-slate-800 border-t border-blue-100">
        {/* Overlapping Image (Right Edge) */}
        <div className="absolute -top-20 md:-top-40 -right-16 md:-right-24 lg:-right-20 w-56 h-56 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-[8px] md:border-[16px] border-blue-50 shadow-2xl z-20 transform rotate-6 hover:scale-105 transition-transform duration-500">
          <img
            src="/images/services/mobile.png"
            alt="Mobile Apps"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-[600px] mx-auto lg:mx-0 lg:mr-auto lg:ml-24 text-center lg:text-right relative z-10 pt-32 md:pt-10 pb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-widest mb-10 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0b1f3f] to-[#2d6aad]">
            Mobile & Web Dev
          </h2>

          <p className="text-slate-600 leading-loose text-sm md:text-base mb-12">
            Stunning, high-performance web applications and native mobile
            experiences. Whether it's a sleek progressive web app or a
            high-performance native iOS/Android application, we prioritize
            flawless UI/UX and rapid execution.
          </p>
        </div>
      </section>

      {/* SERVICE 4: Digital Growth (Textured / Camera Band) */}
      <section className="relative bg-[#f8fafc] py-32 px-6 md:px-12 pb-48 pt-48 border-t border-gray-200">
        <h2 className="absolute top-16 left-0 right-0 text-4xl md:text-5xl lg:text-6xl text-center font-serif tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#0b1f3f] to-[#2d6aad] z-10">
          Digital Growth
        </h2>

        {/* Left Floating Polaroids */}
        <div className="absolute left-4 md:left-32 top-48 flex flex-col gap-2 transform -rotate-3 z-20 w-36 md:w-56">
          <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-xl border border-gray-200 rounded-sm transform rotate-6 hover:-translate-y-2 transition-transform">
            <img
              src="/images/services/growth.png"
              className="w-full h-24 md:h-40 object-cover border border-gray-100"
            />
          </div>
          <div className="bg-white p-2 md:p-3 pb-8 md:pb-12 shadow-xl border border-gray-200 rounded-sm transform -rotate-6 -mt-12 md:-mt-20 hover:-translate-y-2 transition-transform relative z-10">
            <img
              src="/images/services/software.png"
              className="w-full h-24 md:h-40 object-cover border border-gray-100"
            />
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center pl-0 md:pl-72 pt-20">
          <div className="text-center mb-12">
            <h3 className="font-serif tracking-widest text-blue-900 uppercase mb-3 text-sm font-bold">
              Marketing & SEO
            </h3>
            <p className="text-3xl md:text-4xl font-serif text-blue-600 italic">
              Omnichannel
            </p>
          </div>

          {/* Central Graphic (The "Camera") */}
          <div className="w-56 md:w-72 h-36 md:h-48 bg-white rounded-xl relative shadow-[0_10px_40px_rgba(11,31,63,0.1)] flex items-center justify-center mb-12 border border-gray-200 overflow-hidden group cursor-pointer">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-60 transition-all duration-700 mix-blend-luminosity"
              style={{ backgroundImage: "url('/images/services/growth.png')" }}
            />

            {/* Abstract Camera Lens / Node */}
            <div className="w-20 md:w-28 h-20 md:h-28 border-[4px] border-white rounded-full bg-blue-50 shadow-[0_5px_15px_rgba(0,0,0,0.1)] z-10 flex items-center justify-center relative">
              <div className="w-12 md:w-16 h-12 md:h-16 border border-blue-200 rounded-full bg-white shadow-inner relative overflow-hidden flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" />
              </div>
            </div>

            <div className="absolute top-4 right-4 md:right-6 w-5 h-3 md:w-6 md:h-4 bg-gray-100 rounded-sm border border-gray-300" />
            <div className="absolute top-4 left-4 md:left-6 w-8 h-4 md:w-12 md:h-6 bg-gray-100 rounded-sm border border-gray-300" />
          </div>

          <div className="text-center space-y-12">
            <div>
              <h3 className="font-serif tracking-widest text-blue-900 uppercase mb-3 text-sm font-bold">
                Automation Leads
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-blue-600">
                5,254
              </p>
            </div>
            <div>
              <h3 className="font-serif tracking-widest text-blue-900 uppercase mb-3 text-sm font-bold">
                ROI Tracked
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-blue-600">
                +314%
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
