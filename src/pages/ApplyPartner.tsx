import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import { ScrollTrigger } from "@/animations/gsap.config";
import { CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react";

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
  const [step, setStep] = useState<1 | 2>(1);

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.city.trim()) {
      const form = document.querySelector("form");
      if (form) form.reportValidity();
      return;
    }
    setStep(2);
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

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
      // Hero text entrance — masked line reveal
      const tl = gsap.timeline({ delay: 0.1 });
      gsap.set(".ap-reveal-line", { transformPerspective: 800 });
      tl.fromTo(
        ".ap-reveal-line",
        { y: "110%", opacity: 0, rotateX: 10 },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "rotateX,transformPerspective",
        }
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

  // Step transition animation — slides between form steps
  useEffect(() => {
    const stepContent = document.querySelector(".ap-step-content");
    if (!stepContent) return;

    gsap.fromTo(
      stepContent,
      { x: step === 1 ? -30 : 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [step]);

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
    "w-full bg-gray-50/80 border border-gray-100 px-4 sm:px-5 py-3 sm:py-3.5 text-base sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/10 focus:border-gray-300 font-medium transition-all rounded-lg";
  const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block";

  return (
    <div
      ref={containerRef}
      className="bg-white min-h-screen text-[#121212] font-sans overflow-x-hidden"
    >
      {/* ─── HERO / HEADER ─── */}
      <section className="relative w-full bg-white p-1.5 sm:p-2.5 md:p-3 overflow-hidden font-satoshi">
        <div className="w-full max-w-[1560px] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden relative bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126] border border-white/15 shadow-[0_25px_60px_rgba(4,45,91,0.35)] min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center justify-center">

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

          {/* Content */}
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
            <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
              <span className="ap-hero-sub text-white/60 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] block mb-3 sm:mb-5 text-center">
                PARTNER APPLICATION
              </span>
              <h1 className="font-satoshi text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.15] mb-4 sm:mb-5 text-center">
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
              <p className="ap-hero-sub font-satoshi text-white/75 text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl lg:max-w-3xl font-normal text-center mx-auto">
                Tell us about yourself and your network. Our team will review your application and contact you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-12 py-10 sm:py-16 md:py-20">
        {isSubmitted ? (
          /* ─── SUCCESS STATE ─── */
          <div className="ap-scroll-el max-w-2xl mx-auto text-center py-12 sm:py-20 animate-in fade-in zoom-in-95 duration-500 px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0b1f3f] text-white rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
              <CheckCircle2 size={32} className="sm:w-[38px] sm:h-[38px]" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-3 sm:mb-4 block">
              APPLICATION RECEIVED
            </span>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-[#121212] mb-4 sm:mb-6 leading-[1.1]">
              Thanks for Applying.
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 sm:mb-12 max-w-md mx-auto">
              Your application has been received. Our team will review your information and contact you regarding the next steps.
            </p>
            <button
              onClick={() => navigate("/")}
              className="w-full sm:w-auto bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 sm:px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Back to TRUE CONNECT
            </button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* ─── STEP PROGRESS BAR ─── */}
            <div className="mb-6 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                <span className={`flex items-center gap-2 ${step === 1 ? "text-[#0b1f3f]" : "text-emerald-600"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 1 ? "bg-[#0b1f3f] text-white" : "bg-emerald-500 text-white"}`}>
                    {step === 1 ? "1" : "✓"}
                  </span>
                  Step 1: Your Details
                </span>
                <span className="text-gray-300 font-light">/</span>
                <span className={`flex items-center gap-2 ${step === 2 ? "text-[#0b1f3f]" : "text-gray-400"}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 2 ? "bg-[#0b1f3f] text-white" : "bg-gray-200 text-gray-500"}`}>
                    2
                  </span>
                  Step 2: About You
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200/80 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0b1f3f] transition-all duration-500 ease-out rounded-full"
                  style={{ width: step === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="ap-form-wrapper">
              <div className="bg-gray-50/80 border border-gray-100/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm transition-all duration-300">
                {step === 1 ? (
                  /* ─── STEP 1: YOUR DETAILS ─── */
                  <div className="ap-step-content">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-2 block">
                      SECTION 01 OF 02
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-medium text-[#121212] tracking-tight mb-2">
                      Your Details
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      Basic contact information so our team can reach out to you.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                    {/* Next Button */}
                    <div className="pt-6">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-[#0b1f3f] hover:bg-[#122a52] text-white font-bold uppercase tracking-[0.15em] py-4 rounded-lg text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Next: About You <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ─── STEP 2: ABOUT YOU ─── */
                  <div className="ap-step-content">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-2 block">
                      SECTION 02 OF 02
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-medium text-[#121212] tracking-tight mb-2">
                      About You
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-8">
                      Help us understand your background and how you can create opportunities.
                    </p>

                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                            placeholder="e.g. Technology, Real Estate, Finance..."
                            value={formData.industryType}
                            onChange={handleChange}
                            className={inputClass}
                          />
                        </div>
                      </div>

                      {/* How can you create opportunities */}
                      <div>
                        <label className={labelClass}>How can you create opportunities for TRUE CONNECT? *</label>
                        <textarea
                          required
                          name="howCreate"
                          rows={4}
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

                      {/* Action Buttons */}
                      <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            window.scrollTo({ top: 350, behavior: "smooth" });
                          }}
                          className="w-full sm:w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold uppercase tracking-wider py-4 rounded-lg text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full sm:w-2/3 bg-[#0b1f3f] hover:bg-[#122a52] disabled:opacity-60 text-white font-bold uppercase tracking-[0.15em] py-4 rounded-lg text-sm shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
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
                      </div>
                      <p className="text-center text-[11px] text-gray-400 mt-3">
                        No fees. No obligations. Application review takes 1–3 business days.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default ApplyPartner;
