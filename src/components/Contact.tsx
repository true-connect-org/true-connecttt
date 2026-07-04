import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init("XR7hy2NvuKPVARIUd");

    gsap.fromTo(
      ".contact-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
        },
      },
    );

    gsap.fromTo(
      ".contact-item",
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 85%",
        },
      },
    );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Send only necessary fields to EmailJS
      await emailjs.send("service_ojf96cm", "template_wa9gvmt", {
        from_name: formData.name,
        from_email: formData.email,
        mobile: formData.mobile,
        message: formData.message,
      });

      toast.success("Message sent successfully! We'll contact you soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    window.open("https://wa.link/pn0hzn", "_blank");
  };

  const dialNow = () => {
    window.location.href = "tel:+91 8848817833";
  };

  return (
    <section
      id="contact-us"
      className="py-16 md:py-24 bg-gray-50 flex items-center justify-center px-6 md:px-12 min-h-screen"
    >
      <div className="contact-grid w-full max-w-[1200px] mx-auto bg-white rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-100 relative z-10 md:h-[80vh]">
        {/* Left Side (Image/Text) */}
        <div className="contact-item w-full md:w-[45%] relative min-h-[350px] md:min-h-0 bg-white p-8 md:p-10 lg:p-12 flex flex-col justify-end overflow-hidden">
          {/* Temporary Background Image */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1650&q=80"
            alt="Collaboration"
            className="absolute inset-0 w-full h-full object-cover opacity-100 blur-[2px] pointer-events-none"
          />
          {/* White foggy gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>

          <div className="relative z-10 contact-title mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #0b1f3f 0%, #1a4480 45%, #2d6aad 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                  paddingBottom: "0.1em",
                  paddingRight: "0.1em",
                }}
              >
                Build better products <br />
                with True Connect
              </span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[90%]">
              Connect your data sources, build insights, and share them with
              your team. Experience seamless and high-speed internet.
            </p>
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="contact-item w-full md:w-[55%] bg-white p-6 md:p-8 lg:p-10 flex flex-col justify-start md:justify-center md:min-h-0">
          <div className="max-w-[400px] w-full mx-auto">
            <h3 className="text-2xl text-gray-900 font-medium mb-1">
              Welcome back
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Contact us to experience India's fastest internet.
            </p>

            {/* Social / Direct Contact Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                onClick={openWhatsApp}
                type="button"
                className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-medium py-2 rounded-lg border border-gray-200 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={dialNow}
                type="button"
                className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-medium py-2 rounded-lg border border-gray-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us
              </button>
            </div>
            <button
              type="button"
              onClick={() =>
                (window.location.href = "mailto:support@true-connect.in")
              }
              className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-900 text-sm font-medium py-2 rounded-lg border border-gray-200 transition-colors mb-4"
            >
              <Mail className="w-4 h-4" />
              Email
            </button>

            <div className="relative flex items-center py-3">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">
                Or
              </span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 text-xs font-medium mb-2"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 text-gray-900 border border-transparent focus:border-blue-400 focus:bg-white rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-400"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-xs font-medium mb-2"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-100 text-gray-900 border border-transparent focus:border-blue-400 focus:bg-white rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-400"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="mobile"
                  className="block text-gray-700 text-xs font-medium mb-2"
                >
                  Mobile Number*
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full bg-gray-100 text-gray-900 border border-transparent focus:border-blue-400 focus:bg-white rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-xs font-medium mb-2"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full bg-gray-100 text-gray-900 border border-transparent focus:border-blue-400 focus:bg-white rounded-lg px-3 py-2 text-sm outline-none transition-all placeholder:text-gray-400 resize-none"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0b1f3f] text-white hover:bg-[#1a4480] font-medium py-2.5 rounded-lg text-sm transition-colors mt-3 flex items-center justify-center shadow-lg"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Submit Request"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
