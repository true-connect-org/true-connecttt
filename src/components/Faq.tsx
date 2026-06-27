import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
      "A leased line from True Connect provides a dedicated, high-speed, and symmetrical internet connection exclusively for your business. Unlike shared broadband, our Jio-powered leased line ensures guaranteed bandwidth, zero downtime, and consistent speed, making it ideal for enterprises that rely on stable connectivity for cloud, communication, and operations.",
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
      "No, True Connect leased lines offer unlimited data with no speed throttling or hidden caps. Since the connection is entirely dedicated to your organization, you will enjoy uninterrupted, full-speed connectivity at all times, even during high-traffic hours.",
  },
  {
    question: "Why is True Connect's Business Internet Access ideal for me?",
    answer:
      "True Connect's Business Internet Access, powered by Jio's robust nationwide network, delivers enterprise-level reliability, security, and speed. With 24/7 technical support, proactive monitoring, and guaranteed uptime, our leased line ensures your business stays online, productive, and future-ready.",
  },
  {
    question: "What is the difference between leased lines and broadband?",
    answer:
      "A leased line is a dedicated internet connection offering equal upload and download speeds, while broadband is shared among multiple users and often experiences fluctuations. True Connect leased lines deliver guaranteed bandwidth, zero congestion, and stable connectivity, making them the preferred choice for business-critical applications.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".faq-item");

    if (!items) return;

    gsap.fromTo(
      items,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-gradient-to-b from-[#e8eef9] via-white to-slate-50 py-20 pt-20 text-foreground md:py-24 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-[#0b1f3f]/10 blur-3xl" />
        <div className="absolute bottom-8 right-[-8rem] h-72 w-72 rounded-full bg-[#2d6aad]/10 blur-3xl" />
      </div>

      <div ref={containerRef} className="container relative z-10 mx-auto px-6">
        <div className="mb-12 md:mb-16">
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-8 bg-[#0b1f3f]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0b1f3f]/60">
              Support Center
            </span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
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
                Frequently Asked<br />Questions
              </span>
            </h2>

            <div className="flex gap-4 md:max-w-sm">
              <div className="w-1 flex-shrink-0 rounded-full bg-gradient-to-b from-[#0b1f3f] to-[#2d6aad]" />
              <p className="text-base leading-relaxed text-slate-500">
                Get instant answers to the most common queries about True Connect's
                dedicated Jio Leased Line services.
              </p>
            </div>
          </div>

          <div className="mt-8 h-px bg-gradient-to-r from-[#0b1f3f]/20 via-[#2d6aad]/10 to-transparent" />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="faq-item mx-auto w-full max-w-md opacity-0 lg:sticky lg:top-28">
            <svg
              className="h-auto w-full text-[#0b1f3f]"
              viewBox="0 0 520 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="96"
                y="62"
                width="328"
                height="230"
                rx="26"
                fill="white"
                stroke="currentColor"
                strokeWidth="8"
              />
              <path
                d="M153 133h136M153 181h214M153 229h158"
                stroke="#2d6aad"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <circle cx="396" cy="314" r="60" fill="#0b1f3f" />
              <path
                d="M381 298c0-17 13-29 31-29 17 0 29 10 29 25 0 14-8 21-20 28-9 6-12 10-12 19"
                stroke="white"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <circle cx="409" cy="363" r="7" fill="white" />
              <path
                d="M136 292l-34 48c-6 8 1 19 11 17l76-17"
                fill="white"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinejoin="round"
              />
              <circle cx="104" cy="106" r="16" fill="#e2c044" />
              <circle cx="430" cy="82" r="10" fill="#2d6aad" />
              <circle cx="74" cy="274" r="10" fill="#2d6aad" />
            </svg>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <div key={faq.question} className="faq-item opacity-0">
                  <button
                    type="button"
                    className={`group w-full rounded-lg border-2 bg-white px-5 py-4 text-left text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0b1f3f]/35 hover:shadow-lg ${
                      isActive
                        ? "border-[#0b1f3f]/40 shadow-lg"
                        : "border-slate-200"
                    }`}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isActive}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <dt className="flex items-start justify-between gap-4">
                      <span className="font-semibold leading-snug text-[#0b1f3f]">
                        {faq.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                          isActive
                            ? "bg-[#0b1f3f] text-white"
                            : "bg-slate-200 text-[#0b1f3f] group-hover:bg-[#0b1f3f] group-hover:text-white"
                        }`}
                      >
                        {isActive ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </span>
                    </dt>

                    <dd
                      id={`faq-answer-${index}`}
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isActive ? "mt-3 max-h-72 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </dd>
                  </button>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Faq;
