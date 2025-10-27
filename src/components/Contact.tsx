import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

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
    emailjs.init("XR7hy2NvuKPVARIUd"); // You'll need to add your public key

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
      }
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
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      await emailjs.send(
        "service_ojf96cm", // Your service ID
        "template_wa9gvmt", // You'll need to create a template
        {
          from_name: formData.name,
          from_email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        }
      );

      toast.success("Message sent successfully! We'll contact you soon.");
      setFormData({ name: "", email: "", mobile: "", message: "" });
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
      className="py-20 pt-40 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-5xl font-bold mb-6">
            Get Connected <span className="gradient-text">Today</span>
          </h2>
          <p className="contact-title text-l text-muted-foreground max-w-3xl mx-auto">
            Ready to experience India's fastest leased line internet? Contact us
            now and our team will help you choose the perfect plan with
            high-speed connectivity and reliable internet for your needs.
          </p>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="contact-item">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              {/* WhatsApp */}
              <div
                className="flex items-center space-x-4 p-4 glass-card cursor-pointer hover:scale-105 transition-transform duration-300 mb-4"
                onClick={openWhatsApp}
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-500">
                    Chat on WhatsApp
                  </h4>
                  <p className="text-muted-foreground">Get instant support</p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex items-center space-x-4 p-4 glass-card cursor-pointer hover:scale-105 transition-transform duration-300 mb-4"
                onClick={dialNow}
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Dial Now</h4>
                  <p className="text-muted-foreground">+91 8848817833</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 glass-card cursor-pointer hover:scale-105 transition-transform duration-300 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Email Us</h4>
                  <p className="text-muted-foreground">
                    trueeconnectt@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="contact-item">
              <h4 className="text-lg font-semibold mb-4">
                What Makes True Connect Different?
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Easy installation — no wires, no damage</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Quick setup without drilling or mess</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Clean and office-friendly installation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Powered by Jio — trusted connectivity</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-item">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Get Your Connection</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium mb-2"
                  >
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    title="Please enter a valid mobile number"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message *
                  </label>
                  <input
                    type="text"
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    className="w-full h-20 px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                    placeholder="Enter your message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={openWhatsApp}
                  className="btn-whatsapp w-full justify-center"
                >
                  <MessageCircle size={20} />
                  Or Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
