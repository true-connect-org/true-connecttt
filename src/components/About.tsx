import { Target, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section
      id="about-us"
      className="py-20 bg-gradient-to-b from-background to-muted/20"
    >
      {/* Mission & Vision Desktop Monitor */}
      <div className="max-w-[1200px] w-full mx-auto px-6 md:px-12 relative z-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
                paddingBottom: "0.1em",
                paddingRight: "0.1em",
              }}
            >
              Our Mission & Vision
            </span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#0b1f3f] to-blue-800 mx-auto mt-6 mb-6 rounded-full" />
          <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
            Discover the driving forces behind True Connect's commitment to
            delivering enterprise-grade connectivity.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="mx-auto w-full max-w-4xl relative">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 py-12 md:py-8">
            {/* Card 1: Mission */}
            <div className="relative group w-full max-w-[340px]">
              {/* Colored Holder Background */}
              <div className="absolute inset-0 z-0 drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                {/* Main colored base */}
                <div className="absolute top-[45%] -bottom-6 -left-5 -right-5 bg-[#0b1f3f] rounded-b-2xl rounded-t-[4px]" />
                {/* Left Horn */}
                <div
                  className="absolute bottom-[55%] -left-5 w-6 h-12 bg-[#0b1f3f]"
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                />
                {/* Right Horn */}
                <div
                  className="absolute bottom-[55%] -right-5 w-6 h-12 bg-[#0b1f3f]"
                  style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
                />

                {/* Bottom Tab */}
                <div
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-32 h-9 bg-gradient-to-b from-[#0b1f3f] to-[#07152b] flex items-center justify-center"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
                  }}
                >
                  <span className="text-white font-bold text-lg leading-none mt-0.5">
                    01
                  </span>
                </div>
              </div>

              {/* White Content Card */}
              <div className="relative z-10 bg-white rounded-2xl shadow-sm p-6 md:p-8 aspect-square text-center flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <Target
                  className="w-14 h-14 text-gray-800 mb-6"
                  strokeWidth={1}
                />
                <h3 className="text-xl font-bold tracking-widest text-gray-900 mb-5 relative">
                  Mission
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed px-2">
                  To empower businesses across India with ultra-fast, secure,
                  and reliable enterprise-grade connectivity solutions that
                  drive innovation and growth.
                </p>
              </div>
            </div>

            {/* Card 2: Vision */}
            <div className="relative group w-full max-w-[340px] mt-12 md:mt-0">
              {/* Colored Holder Background */}
              <div className="absolute inset-0 z-0 drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-1">
                {/* Main colored base */}
                <div className="absolute top-[45%] -bottom-6 -left-5 -right-5 bg-[#e6e84a] rounded-b-2xl rounded-t-[4px]" />
                {/* Left Horn */}
                <div
                  className="absolute bottom-[55%] -left-5 w-6 h-12 bg-[#e6e84a]"
                  style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
                />
                {/* Right Horn */}
                <div
                  className="absolute bottom-[55%] -right-5 w-6 h-12 bg-[#e6e84a]"
                  style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
                />

                {/* Bottom Tab */}
                <div
                  className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-32 h-9 bg-gradient-to-b from-[#e6e84a] to-[#cdd138] flex items-center justify-center"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 85% 100%, 15% 100%)",
                  }}
                >
                  <span className="text-gray-900 font-bold text-lg leading-none mt-0.5">
                    02
                  </span>
                </div>
              </div>

              {/* White Content Card */}
              <div className="relative z-10 bg-white rounded-2xl shadow-sm p-6 md:p-8 aspect-square text-center flex flex-col items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                <Lightbulb
                  className="w-14 h-14 text-gray-800 mb-6"
                  strokeWidth={1}
                />
                <h3 className="text-xl font-bold tracking-widest text-gray-900 mb-5 relative">
                  Vision
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed px-2">
                  To be the leading provider of digital infrastructure,
                  redefining industry standards and connecting every enterprise
                  to a limitless digital future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
