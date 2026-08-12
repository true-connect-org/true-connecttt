import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ArrowLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ArrowDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

interface FormData {
  partnerType: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  website: string;
  industryType: string;
  howCreate: string;
  howHeard: string;
  consent: boolean;
}

const ApplyPartner = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    partnerType: "",
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    city: "",
    website: "",
    industryType: "",
    howCreate: "",
    howHeard: "",
    consent: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero text entrance — matches site-wide pattern
      const tl = gsap.timeline({ delay: 0.1 });
      gsap.set(".ap-reveal-line", { transformPerspective: 800 });
      tl.fromTo(
        ".ap-reveal-line",
        { y: "110%", opacity: 0, rotateX: 10 },
        { y: "0%", opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.14, ease: "power4.out" }
      )
        .fromTo(
          ".ap-hero-sub",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          ".ap-form-wrapper",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" },
          "-=0.2"
        );

      // Scroll elements
      gsap.utils.toArray<HTMLElement>(".ap-scroll-el").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFormData({ ...formData, [target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const inputClass =
    "w-full bg-gray-50/80 border border-gray-100 px-5 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/10 focus:border-gray-300 font-medium transition-all rounded-lg";
  const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block";

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen text-[#121212] font-sans overflow-x-hidden"
    >
      {/* ─── HERO / HEADER ─── */}
      <section className="relative w-full bg-white p-1.5 sm:p-2.5 md:p-3 overflow-hidden font-satoshi">
        <div className="w-full max-w-[1560px] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 lg:py-16">

          {/* Subtle network SVG background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
            <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {[...Array(10)].map((_, i) => (
                <line key={`v${i}`} x1={`${(i + 1) * 9.09}%`} y1="0" x2={`${(i + 1) * 9.09}%`} y2="100%" stroke="white" strokeWidth="0.5" />
              ))}
              {[...Array(6)].map((_, i) => (
                <line key={`h${i}`} x1="0" y1={`${(i + 1) * 16.67}%`} x2="100%" y2={`${(i + 1) * 16.67}%`} stroke="white" strokeWidth="0.5" />
              ))}
            </svg>
          </div>

          {/* Back link */}
          <div className="relative z-10 w-full">
            <button
              onClick={() => navigate("/partner-program")}
              className="ap-hero-sub flex items-center gap-2 text-white/50 hover:text-white text-xs font-semibold uppercase tracking-widest transition-colors mb-10"
            >
              <ArrowLeft size={14} /> Back to Partner Program
            </button>

            <div className="max-w-3xl">
              <span className="ap-hero-sub text-white/60 text-xs font-bold uppercase tracking-[0.25em] block mb-5">
                PARTNER APPLICATION
              </span>
              <h1 className="font-satoshi text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-5">
                <span className="block overflow-hidden py-0.5">
                  <span className="ap-reveal-line block transform-gpu">
                    Become a TRUE CONNECT
                  </span>
                </span>
                <span className="block overflow-hidden py-0.5">
                  <span className="ap-reveal-line block transform-gpu text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
                    Partner.
                  </span>
                </span>
              </h1>
              <p className="ap-hero-sub font-satoshi text-white/75 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md lg:max-w-lg font-normal">
                Tell us about yourself and your network. Our team will review your application and contact you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 py-16 md:py-20">
        {isSubmitted ? (
          /* ─── SUCCESS STATE ─── */
          <div className="ap-scroll-el max-w-2xl mx-auto text-center py-20 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-[#0b1f3f] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle2 size={38} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-4 block">
              APPLICATION RECEIVED
            </span>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-[#121212] mb-6 leading-[1.1]">
              Thanks for Applying.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-12 max-w-md mx-auto">
              Your application has been received. Our team will review your information and contact you regarding the next steps.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Back to TRUE CONNECT
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="ap-form-wrapper">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
              
              {/* ─── LEFT COLUMN: SECTION 01 — YOUR DETAILS ─── */}
              <div className="xl:col-span-5">
                <div className="sticky top-28">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-3 block">
                    SECTION 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#121212] tracking-tight mb-2">
                    Your Details
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">
                    Basic information so our team can reach out to you.
                  </p>

                  <div className="space-y-5">
                    {/* Full Name */}
                    <div>
                      <label className={labelClass}>Full Name *</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className={labelClass}>
                        Company Name <span className="normal-case font-normal text-gray-300">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Your company or business name"
                        value={formData.companyName}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className={labelClass}>Phone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className={labelClass}>City / Location *</label>
                      <input
                        required
                        type="text"
                        name="city"
                        placeholder="City, State"
                        value={formData.city}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* Website / LinkedIn */}
                    <div>
                      <label className={labelClass}>
                        Website / LinkedIn <span className="normal-case font-normal text-gray-300">(optional)</span>
                      </label>
                      <input
                        type="url"
                        name="website"
                        placeholder="https://"
                        value={formData.website}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── RIGHT COLUMN: SECTION 02 — ABOUT YOU ─── */}
              <div className="xl:col-span-7">
                <div className="bg-gray-50/70 border border-gray-100 rounded-2xl p-8 md:p-10">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-3 block">
                    SECTION 02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-[#121212] tracking-tight mb-2">
                    About You
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-10">
                    Help us understand your background and how you can create opportunities.
                  </p>

                  <div className="space-y-6">
                    {/* Partner Type */}
                    <div>
                      <label className={labelClass}>Partner Type *</label>
                      <select
                        required
                        name="partnerType"
                        value={formData.partnerType}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="">Select your type</option>
                        <option value="Company">Company</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Sales Professional">Sales Professional</option>
                        <option value="Business Consultant">Business Consultant</option>
                        <option value="Content Creator">Content Creator</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Business Connector">Business Connector</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Industry */}
                    <div>
                      <label className={labelClass}>Industry / Business Type</label>
                      <input
                        type="text"
                        name="industryType"
                        placeholder="e.g. Technology, Real Estate, Finance, Healthcare..."
                        value={formData.industryType}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    {/* How can you create opportunities */}
                    <div>
                      <label className={labelClass}>How can you create opportunities for TRUE CONNECT? *</label>
                      <textarea
                        required
                        name="howCreate"
                        rows={5}
                        placeholder="Tell us briefly about your business network, customers or the type of businesses you work with."
                        value={formData.howCreate}
                        onChange={handleChange}
                        className={`${inputClass} resize-none rounded-lg`}
                      />
                    </div>

                    {/* How did you hear */}
                    <div>
                      <label className={labelClass}>How did you hear about TRUE CONNECT?</label>
                      <select
                        name="howHeard"
                        value={formData.howHeard}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer appearance-none`}
                      >
                        <option value="">Select</option>
                        <option value="Website">Website</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Existing Partner">Existing Partner</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Consent */}
                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5 shrink-0">
                          <input
                            required
                            type="checkbox"
                            name="consent"
                            checked={formData.consent}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${formData.consent ? "bg-[#0b1f3f] border-[#0b1f3f]" : "bg-white border-gray-200 group-hover:border-gray-400"}`}>
                            {formData.consent && (
                              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                                <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-500 leading-relaxed">
                          I agree to TRUE CONNECT contacting me regarding the Partner Program and accept the applicable terms and privacy policy.
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#0b1f3f] hover:bg-[#122a52] disabled:opacity-60 text-white font-bold uppercase tracking-[0.15em] py-4 rounded-lg text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                      <p className="text-center text-[11px] text-gray-400 mt-3">
                        No fees. No obligations. Application review takes 1–3 business days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default ApplyPartner;
