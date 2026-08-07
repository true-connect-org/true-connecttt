import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    message: "",
    agreeToTerms: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      ".contact-header",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    gsap.fromTo(
      ".contact-elem",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        message: "",
        agreeToTerms: false,
      });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 font-sans pt-28 md:pt-36 pb-24">
      {/* 1. Header Section */}
      <div className="text-center max-w-4xl mx-auto px-6 mb-16 contact-header">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-[#2d2a26] tracking-tight mb-6 leading-[1.1]">
          Let's build something amazing together.
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
          Tell us about your project. No pressure, just a conversation about what's possible.
        </p>
      </div>

      {/* 2. Workspace Image */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16 contact-elem">
        <div className="w-full h-[320px] md:h-[460px] rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
            alt="True Connect Studio"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 3. Info Row (4 Columns) */}
      <div className="max-w-5xl mx-auto px-6 mb-28 grid grid-cols-2 md:grid-cols-4 gap-8 text-center contact-elem">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mb-4">
            <Mail size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1 block">
            EMAIL
          </span>
          <a
            href="mailto:info@trueconnect.in"
            className="text-xs md:text-sm font-semibold text-gray-800 hover:text-black transition-colors"
          >
            info@trueconnect.in
          </a>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mb-4">
            <Phone size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1 block">
            PHONE
          </span>
          <a
            href="tel:+918848817833"
            className="text-xs md:text-sm font-semibold text-gray-800 hover:text-black transition-colors"
          >
            +91 88488 17833
          </a>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mb-4">
            <MapPin size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1 block">
            OFFICE
          </span>
          <span className="text-xs md:text-sm font-semibold text-gray-800">
            Technopark, Trivandrum
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 mb-4">
            <Clock size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-1 block">
            HOURS
          </span>
          <span className="text-xs md:text-sm font-semibold text-gray-800">
            Mon – Fri, 9 – 6 IST
          </span>
        </div>
      </div>

      {/* 4. Form Section */}
      <div className="max-w-4xl mx-auto px-6 mb-28 contact-elem">
        {isSubmitted ? (
          <div className="bg-gray-50 rounded-[2.5rem] p-12 text-center border border-gray-100 animate-in fade-in duration-500">
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-3">
              Inquiry Sent Successfully!
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Thank you for reaching out. We will review your project details and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  NAME *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all"
                />
              </div>

              {/* Company */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  COMPANY
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  EMAIL *
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  PHONE
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 88488 17833"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  PROJECT TYPE
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select type</option>
                  <option value="Website Development">Website Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Systems Development">Systems Development</option>
                  <option value="AI & Automation">AI & Automation</option>
                  <option value="Internet Leased Line">Internet Leased Line</option>
                </select>
              </div>

              {/* Budget Range */}
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  BUDGET RANGE
                </label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="w-full bg-gray-50/80 border border-gray-100 px-6 py-4 rounded-full text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select range</option>
                  <option value="< $5,000">&lt; $5,000</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                  <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                MESSAGE
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us about your project: goals, timeline, any specific requirements..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50/80 border border-gray-100 p-6 rounded-3xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 font-medium transition-all resize-none"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-500 cursor-pointer">
                I agree to the <span className="underline">Privacy Policy</span> and{" "}
                <span className="underline">Terms and Conditions</span>. My data will only be used to respond to this inquiry.
              </label>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-5">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-bold text-xs md:text-sm uppercase tracking-[0.2em] px-12 md:px-14 py-4 md:py-4.5 rounded-full shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-2.5"
              >
                SEND INQUIRY <Send size={15} />
              </button>
              <p className="text-xs text-gray-400 mt-4 font-medium">
                We respond within 24 hours · No spam, ever
              </p>
            </div>
          </form>
        )}
      </div>

      {/* 5. Location Map Container */}
      <div className="max-w-[1200px] mx-auto px-6 mb-24 contact-elem">
        <div className="group w-full h-[400px] rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 bg-gray-100 relative transition-all duration-500">
          <iframe
            title="Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.452678627763!2d76.8789!3d8.5565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bef19a4e8d35%3A0xa19f9f2575db55d1!2sTechnopark%20Trivandrum!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            className="w-full h-full border-0 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
            loading="lazy"
          />
        </div>
      </div>

      {/* 6. Bottom 3 Stats / Promises Row */}
      <div className="max-w-5xl mx-auto px-6 border-t border-gray-100 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center contact-elem">
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">24hr Response</h4>
          <p className="text-xs text-gray-400">Every inquiry, every time</p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">50+ Projects</h4>
          <p className="text-xs text-gray-400">Delivered across industries</p>
        </div>
        <div>
          <h4 className="text-base font-semibold text-gray-900 mb-1">India & UAE-Based</h4>
          <p className="text-xs text-gray-400">Local team, global standards</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
