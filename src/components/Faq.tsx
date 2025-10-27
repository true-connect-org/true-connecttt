import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is the advantage of a leased line network?",
    answer:
      "A leased line from True Connect provides a dedicated, high-speed, and symmetrical internet connection exclusively for your business. Unlike shared broadband, our Jio-powered leased line ensures guaranteed bandwidth, zero downtime, and consistent speed — making it ideal for enterprises that rely on stable connectivity for cloud, communication, and operations.",
  },
  {
    question: "How can I set up a dedicated leased line?",
    answer:
      "Setting up a True Connect leased line is quick and seamless. Our experts analyze your connectivity requirements and design a custom Jio internet solution for your business. After a professional site survey, we deploy a dedicated connection with enterprise-grade hardware, ensuring maximum reliability and performance from day one.",
  },
  {
    question: "What is the leased line connection price?",
    answer:
      "The price of a True Connect leased line depends on your chosen speed, required bandwidth, and business scale. We provide flexible, cost-effective plans for startups, SMEs, and large enterprises. Contact our team for a free consultation and get a personalized quote designed to fit your business needs.",
  },
  {
    question: "Is there a cap on data usage on a leased line?",
    answer:
      "No, True Connect leased lines offer unlimited data with no speed throttling or hidden caps. Since the connection is entirely dedicated to your organization, you’ll enjoy uninterrupted, full-speed connectivity at all times — even during high-traffic hours.",
  },
  {
    question: "Why is True Connect’s Business Internet Access ideal for me?",
    answer:
      "True Connect’s Business Internet Access, powered by Jio’s robust nationwide network, delivers enterprise-level reliability, security, and speed. With 24/7 technical support, proactive monitoring, and guaranteed uptime, our leased line ensures your business stays online, productive, and future-ready.",
  },
  {
    question: "What is the difference between leased lines and broadband?",
    answer:
      "A leased line is a dedicated internet connection offering equal upload and download speeds, while broadband is shared among multiple users and often experiences fluctuations. True Connect leased lines deliver guaranteed bandwidth, zero congestion, and stable connectivity — making them the preferred choice for business-critical applications.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animation
    gsap.fromTo(
      containerRef.current?.querySelectorAll(".faq-item"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 bg-gradient-to-b from-background to-muted/20 text-foreground"
    >
      <div ref={containerRef} className="container mx-auto px-6 max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently <span className="gradient-text">Asked Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get instant answers to the most common queries about True Connect’s
            dedicated Jio Leased Line services — built to keep your business
            always connected.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-border rounded-2xl shadow-sm bg-background/70 backdrop-blur-sm">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item p-6 cursor-pointer transition-all duration-300 hover:bg-muted/40"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-semibold">
                  {faq.question}
                </h3>
                <span className="text-primary">
                  {activeIndex === index ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </span>
              </div>

              {/* Animated Answer */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-96 mt-3" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
