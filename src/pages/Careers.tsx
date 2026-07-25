import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Users, Zap, Rocket, ChevronRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-12">
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-[1200px] mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Join the{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              True Connect
            </span>{" "}
            Team
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">
            We are always looking for passionate, driven individuals to help us build the future of enterprise connectivity. Discover your next career opportunity with us.
          </p>
          <Button 
            className="bg-[#0b1f3f] hover:bg-blue-800 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-xl transition-all"
            onClick={() => {
              document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Open Positions
          </Button>
        </section>

        {/* Why Join Us */}
        <section className="bg-muted/30 py-20 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#0b1f3f] mb-4">Why Work With Us?</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0b1f3f] to-blue-500 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Rocket,
                  title: "Fast-Paced Growth",
                  desc: "Be part of a rapidly expanding company where your ideas make an immediate impact.",
                  color: "bg-blue-100 text-blue-600"
                },
                {
                  icon: Users,
                  title: "Collaborative Culture",
                  desc: "Work alongside industry experts in a supportive and inclusive environment.",
                  color: "bg-green-100 text-green-600"
                },
                {
                  icon: Zap,
                  title: "Innovation First",
                  desc: "We leverage cutting-edge technology to solve complex connectivity challenges.",
                  color: "bg-amber-100 text-amber-600"
                }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${feature.color}`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-20 px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0b1f3f] mb-4">Open Positions</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#0b1f3f] to-blue-500 rounded-full mb-4 md:mb-0" />
              <p className="text-gray-500 mt-4 max-w-lg">
                Explore our current openings and find a role that matches your skills and ambitions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { title: "Senior Network Engineer", dept: "Engineering", type: "Full-time", loc: "Mumbai / Remote" },
              { title: "B2B Sales Executive", dept: "Sales", type: "Full-time", loc: "Bangalore" },
              { title: "Customer Success Manager", dept: "Support", type: "Full-time", loc: "Delhi" },
            ].map((job, i) => (
              <div key={i} className="group bg-white border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:border-[#0b1f3f] transition-colors cursor-pointer shadow-sm hover:shadow-md">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#0b1f3f] transition-colors mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                      <Briefcase size={14} /> {job.dept}
                    </span>
                    <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full">
                      {job.loc}
                    </span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button variant="outline" className="rounded-full group-hover:bg-[#0b1f3f] group-hover:text-white transition-all">
                    Apply Now <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* General Application */}
          <div className="mt-16 bg-[#0b1f3f] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <Mail className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Don't see a perfect fit?</h3>
              <p className="text-blue-100 mb-8 text-lg">
                We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
              </p>
              <a href="mailto:careers@trueconnect.in">
                <Button className="bg-white text-[#0b1f3f] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-bold shadow-xl transition-all">
                  Submit Resume
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
