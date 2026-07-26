import { useState, useEffect } from "react";
import { Phone, Mail, MapPin, CheckCircle2, Send } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    time: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    gsap.fromTo(
      ".contact-animate",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "expo.out", delay: 0.05 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ businessName: "", name: "", email: "", phone: "", service: "", message: "", time: "" });
    }, 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#F1F1F1] min-h-screen text-tc-navy pt-40 pb-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tc-navy/5 rounded-full blur-[150px] pointer-events-none -mr-40 -mt-40 z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tc-navy/5 rounded-full blur-[120px] pointer-events-none -ml-40 -mb-40 z-0" />
      
      {/* Abstract Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: "linear-gradient(rgba(11, 31, 63, 1) 1px, transparent 1px), linear-gradient(90deg, rgba(11, 31, 63, 1) 1px, transparent 1px)", backgroundSize: "100px 100px" }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24 contact-animate max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1] text-tc-navy">
            Let's Build Something <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-tc-navy to-tc-navy/60">Great Together.</span>
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Our technical experts are ready to understand your infrastructure challenges and engineer the perfect solution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Form (Light Mode Bento) */}
          <div className="lg:col-span-7 contact-animate">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-200 relative overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-tc-navy/5 rounded-full blur-[60px] -mr-32 -mt-32 pointer-events-none" />

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] text-center animate-in fade-in duration-500">
                  <div className="w-24 h-24 bg-tc-navy/5 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={48} className="text-tc-navy" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-tc-navy">Request Received.</h3>
                  <p className="text-gray-500 text-lg">Our engineering team will contact you within the next hour.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-tc-navy">
                      <span className="w-2 h-2 rounded-full bg-tc-navy" /> Business Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Business Name *</label>
                        <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Your Name *</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Email Address *</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Phone Number *</label>
                        <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-6 border-t border-gray-100">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-tc-navy">
                      <span className="w-2 h-2 rounded-full bg-tc-navy" /> Project Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Interested Service *</label>
                        <select required name="service" value={formData.service} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm appearance-none"
                        >
                          <option value="">Select a service...</option>
                          <option value="Internet Leased Line">Internet Leased Line</option>
                          <option value="Software Development">Software Development</option>
                          <option value="Digital Growth">Digital Growth</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Time</label>
                        <input type="text" name="time" placeholder="e.g., Morning, 2 PM" value={formData.time} onChange={handleChange}
                          className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Message</label>
                      <textarea name="message" rows={4} value={formData.message} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-200 text-tc-navy placeholder-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:border-tc-navy focus:ring-1 focus:ring-tc-navy transition-shadow shadow-sm resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button type="submit" className="w-full md:w-auto bg-tc-navy text-white hover:bg-tc-navy/90 font-bold uppercase tracking-widest px-10 py-7 rounded-full shadow-lg transition-all hover:scale-105 flex items-center justify-center gap-3">
                      Submit Request <Send size={18} />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact (Keeping Navy for contrast) */}
          <div className="lg:col-span-5 space-y-6 contact-animate flex flex-col">
            
            {/* Direct Contact Card - Strong Navy Contrast */}
            <div className="bg-tc-navy border border-tc-navy p-10 rounded-[2rem] shadow-xl relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10" />
              
              <h3 className="text-2xl font-bold mb-10 text-white">Direct Line.</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A0AABF] mb-1.5">Phone</div>
                    <div className="font-semibold text-lg text-white">+91 90480 32223</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A0AABF] mb-1.5">Email</div>
                    <div className="font-semibold text-lg text-white">support@trueconnect.in</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors duration-300">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A0AABF] mb-1.5">Headquarters</div>
                    <div className="font-medium text-white leading-relaxed">Trivandrum Technopark,<br/>Thiruvananthapuram, Kerala</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts Card - Light Mode */}
            <div className="bg-white border border-gray-200 p-10 rounded-[2rem] shadow-lg">
              <h4 className="text-xs font-bold text-tc-navy uppercase tracking-[0.2em] mb-8">Our Guarantee</h4>
              <ul className="space-y-5">
                {[
                  "No commitment required",
                  "Free technical consultation",
                  "Custom solution engineering",
                  "Same-day response guarantee"
                ].map((fact, i) => (
                  <li key={i} className="flex items-start text-gray-600 font-medium">
                    <CheckCircle2 size={18} className="text-tc-navy mr-4 flex-shrink-0 mt-0.5" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
