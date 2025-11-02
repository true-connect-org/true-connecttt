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
    captchaNum1: Math.floor(Math.random() * 10) + 1,
    captchaNum2: Math.floor(Math.random() * 10) + 1,
    captchaAnswer: "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify CAPTCHA
    const correctAnswer = formData.captchaNum1 + formData.captchaNum2;
    if (parseInt(formData.captchaAnswer) !== correctAnswer) {
      toast.error("Please solve the math problem correctly!");
      return;
    }

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

      // Reset form with new CAPTCHA numbers
      setFormData({
        name: "",
        email: "",
        mobile: "",
        message: "",
        captchaNum1: Math.floor(Math.random() * 10) + 1,
        captchaNum2: Math.floor(Math.random() * 10) + 1,
        captchaAnswer: "",
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
      className="py-20 pt-40 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16 sm:mb-20 px-4">
          <div className="max-w-3xl mx-auto text-left">
            <h2 className="contact-title text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-center">
              Get Connected <span className="gradient-text">Today</span>
            </h2>

            <p className="contact-title text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Ready to experience India's fastest leased line internet? Contact
              us now and our team will help you choose the perfect plan with
              high-speed connectivity and reliable internet for your needs.
            </p>
          </div>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="contact-item">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              {/* WhatsApp */}
              <div
                className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl cursor-pointer hover:bg-green-500/20 transition-all duration-300 mb-3"
                onClick={openWhatsApp}
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-500">Connect Now</h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant support
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="flex items-center space-x-4 p-4 bg-primary/10 border border-primary/20 rounded-xl cursor-pointer hover:bg-primary/20 transition-all duration-300 mb-3"
                onClick={dialNow}
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-primary">Talk to Expert</h4>
                  <p className="text-sm text-muted-foreground">
                    +91 8848817833
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center space-x-4 p-4 bg-secondary/10 border border-secondary/20 rounded-xl cursor-pointer hover:bg-secondary/20 transition-all duration-300 mb-6">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary">Write to Us</h4>
                  <p className="text-sm text-muted-foreground">
                    {" "}
                    support@true-connect.in{" "}
                  </p>
                </div>
              </div>

              {/* Why Choose Us - Compact */}

              <div className="pt-6 border-t border-border">
                <h4 className="text-lg font-semibold text-center mb-4">
                  What Makes True Connect Different?
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  {/* Column 1 */}
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      End-to-end fiber solutions built for enterprises
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Seamless installation — zero disruption or downtime
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      24/7 proactive monitoring & priority business support
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Powered by Jio — trusted nationwide connectivity
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Tailored plans that scale with your business growth
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Dedicated account management for enterprise clients
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      High SLA uptime guarantees backed by robust infrastructure
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Next-gen solutions optimized for hybrid and remote teams
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Enterprise-grade security for seamless data protection
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Smart scalability — upgrade anytime as your needs grow
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-item">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Get Your Connection</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
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
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={1000}
                    rows={2}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300 resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                {/* CAPTCHA Section */}
                <div className="border border-border rounded-xl p-4 bg-background/50">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                      <span className="px-3 py-2 bg-white/10 rounded border border-border">
                        {formData.captchaNum1}
                      </span>
                      <span>+</span>
                      <span className="px-3 py-2 bg-white/10 rounded border border-border">
                        {formData.captchaNum2}
                      </span>
                      <span>=</span>
                      <input
                        type="number"
                        name="captchaAnswer"
                        value={formData.captchaAnswer}
                        onChange={handleChange}
                        required
                        className="w-20 px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-300"
                        placeholder="?"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      (Are you human, or spambot?)
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col items-center justify-center gap-4 w-full mt-4 sm:mt-6">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base px-6 py-3 font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Request</span>
                      </>
                    )}
                  </Button>

                  {/* WhatsApp Button */}
                  <Button
                    onClick={openWhatsApp}
                    variant="whatsapp"
                    size="lg"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base px-6 py-3 font-semibold"
                  >
                    <MessageCircle size={20} />
                    Let’s Connect
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
