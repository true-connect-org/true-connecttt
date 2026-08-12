import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  Monitor,
  Smartphone,
  Server,
  Zap,
  Target,
  Network,
  ArrowUpRight,
  X,
  Check,
} from "lucide-react";

const services = [
  {
    id: "01",
    title: "Enterprise Internet",
    price: "$10,000",
    pricing: "Custom Quote",
    description:
      "High-speed leased line & dedicated enterprise internet powered by robust tier-1 infrastructure.",
    fullDesc:
      "Unrivaled enterprise connectivity engineered for maximum uptime, guaranteed symmetrical speeds, low-latency performance, and 24/7 dedicated support.",
    whatWeOffer: [
      "Dedicated 1:1 leased line bandwidth",
      "Redundant optical fiber architecture",
      "Static IP & MPLS network routing",
      "Custom high-bandwidth configurations",
      "SLA guaranteed 99.99% network uptime",
    ],
    included: [
      "24/7 proactive network monitoring",
      "Dedicated account engineering team",
      "Hardware router & firewall installation",
      "Priority zero-downtime support",
    ],
    icon: Network,
    bgGradient: "bg-gradient-to-br from-[#0b1f3f] via-[#153460] to-[#040e22]",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "02",
    title: "Website Development",
    price: "$3,000",
    pricing: "From $3,000",
    description:
      "Custom, high-performance websites that elevate your brand and drive conversions.",
    fullDesc:
      "Custom, high-performance websites engineered for speed, SEO, and conversions. Tailored digital experiences that elevate your brand and engage visitors on every screen.",
    whatWeOffer: [
      "Custom responsive UI/UX design",
      "High-speed Next.js / React frontend",
      "SEO & performance optimization",
      "Content Management Systems (CMS)",
      "Analytics & conversion tracking",
    ],
    included: [
      "Core Web Vitals optimization",
      "Domain & hosting configuration",
      "Accessibility compliance (WCAG)",
      "30 days post-launch support",
    ],
    icon: Monitor,
    bgGradient: "bg-gradient-to-br from-[#1a4a28] via-[#2d5a27] to-[#0a2e12]",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "App Development",
    price: "$30,000",
    pricing: "From $30,000",
    description:
      "Mobile apps that feel right and work right for real users on real devices.",
    fullDesc:
      "Mobile apps that feel right. Custom screens, smooth navigation, real backend connectivity. Designed for the people who will actually use them, not for a pitch deck.",
    whatWeOffer: [
      "Native iOS and Android apps",
      "Cross-platform builds (React Native)",
      "Custom screens and navigation flows",
      "Account management and authentication",
      "Forms, uploads, and transaction records",
    ],
    included: [
      "Backend API connectivity",
      "Push notifications",
      "App store submission support",
      "Post-launch bug support",
    ],
    icon: Smartphone,
    bgGradient: "bg-gradient-to-br from-[#d95321] via-[#c92a54] to-[#7a0d3b]",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    title: "AI & Automation",
    price: "$15,000",
    pricing: "From $15,000",
    description:
      "Intelligent systems that automate workflows and unlock new business capabilities.",
    fullDesc:
      "Cut manual work and supercharge team productivity by deploying autonomous AI agents, machine learning models, and smart automated data pipelines directly into your existing stack.",
    whatWeOffer: [
      "Bespoke LLM & AI agent integration",
      "Document parsing & data extraction",
      "Predictive analytics dashboards",
      "Automated customer support bots",
      "Workflow & process automation",
    ],
    included: [
      "Custom prompt engineering",
      "Vector database setup (RAG)",
      "Model fine-tuning & evaluation",
      "Team onboarding & training",
    ],
    icon: Zap,
    bgGradient: "bg-gradient-to-br from-[#4c248b] via-[#6b31c9] to-[#25104a]",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "05",
    title: "Brand Strategy",
    price: "$8,000",
    pricing: "From $8,000",
    description:
      "Comprehensive brand identity and digital marketing to dominate your market.",
    fullDesc:
      "Position your brand to win. We blend strategic positioning, visual identity system design, and multi-channel digital campaigns that make your market take notice.",
    whatWeOffer: [
      "Complete visual identity & style guides",
      "Brand messaging & positioning frameworks",
      "Digital marketing campaign design",
      "Social media asset kits",
      "Go-to-market execution plans",
    ],
    included: [
      "Logo & typography design assets",
      "Marketing copy guidelines",
      "Competitive positioning report",
      "Brand launch roadmap",
    ],
    icon: Target,
    bgGradient: "bg-gradient-to-br from-[#0f5c6e] via-[#1a8a9e] to-[#083540]",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "06",
    title: "Connectivity",
    price: "CUSTOM",
    pricing: "Custom Quote",
    description:
      "Enterprise-grade networking and broadband solutions powered by industry leaders.",
    fullDesc:
      "Uncompromising enterprise connectivity backed by Reliance Jio tier-1 infrastructure. Guaranteed low-latency dedicated leased lines and high-capacity broadband tailored for your offices.",
    whatWeOffer: [
      "Enterprise Leased Line (1:1 bandwidth)",
      "Business Broadband with static IP",
      "Redundant failover infrastructure",
      "Managed SD-WAN networks",
      "24/7 proactive network monitoring",
    ],
    included: [
      "SLA guaranteed 99.9% uptime",
      "Dedicated account engineer",
      "Zero-downtime installation",
      "Priority resolution support",
    ],
    icon: Server,
    bgGradient: "bg-gradient-to-br from-[#2a2a2a] via-[#404040] to-[#111111]",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  },
];

const ServicesCarousel = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<
    (typeof services)[0] | null
  >(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactServiceTitle, setContactServiceTitle] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      emailjs.init("XR7hy2NvuKPVARIUd");
      await emailjs.send("service_ojf96cm", "template_wa9gvmt", {
        from_name: contactForm.name,
        from_email: contactForm.email,
        company: contactForm.company,
        mobile: contactForm.phone,
        project_type: contactForm.projectType || contactServiceTitle,
        budget_range: contactForm.budgetRange,
        message: `${contactForm.message} (Service: ${contactServiceTitle || contactForm.projectType})`,
      });

      toast.success("Message sent successfully! We'll contact you soon.");
      setIsContactModalOpen(false);
      setContactForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        projectType: "",
        budgetRange: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <section className="py-20 md:py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-[1560px] mx-auto px-6 md:px-12">
        {/* Carousel Header / Navigation */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="uppercase tracking-[0.3em] text-xs font-semibold text-gray-400 mb-6 block"
          >
            OUR SERVICES
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#2d2a26] tracking-tight mb-8 max-w-4xl"
          >
            Premium Digital & Infrastructure Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed"
          >
            End-to-end digital engineering and robust network solutions that
            elevate your brand and ensure your operations perform flawlessly.
          </motion.p>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-6 md:gap-8 cursor-grab active:cursor-grabbing">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className="embla__slide flex-[0_0_95%] sm:flex-[0_0_75%] md:flex-[0_0_60%] lg:flex-[0_0_50%] xl:flex-[0_0_40%] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -140 : 140, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.85,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onClick={() => setSelectedService(service)}
                    className={`relative w-full aspect-[4/3] md:h-[380px] md:aspect-auto rounded-[2rem] overflow-hidden p-8 flex flex-col justify-between group ${service.bgGradient} transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer`}
                  >
                    {/* Background Image */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 pointer-events-none"
                    />

                    {/* Top Row: Icon and Badge */}
                    <div className="hidden md:flex items-start justify-between z-10 relative">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.2,
                          ease: "backOut",
                        }}
                        className="w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white shadow-lg"
                      >
                        <Icon size={24} strokeWidth={1.5} />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1 + 0.25,
                          ease: "easeOut",
                        }}
                        className="px-5 py-2.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-bold tracking-[0.2em] shadow-lg"
                      >
                        {service.id} / 06
                      </motion.div>
                    </div>

                    {/* Bottom Content */}
                    <div className="z-10 relative mt-auto flex flex-col justify-end">
                      {/* Title with entrance animation */}
                      <motion.h3
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1 + 0.25,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="text-3xl md:text-4xl font-semibold text-white leading-tight tracking-tight mb-0 group-hover:mb-3 transition-all duration-300"
                      >
                        {service.title}
                      </motion.h3>

                      {/* Revealed Description & Arrow Button on Hover */}
                      <div className="flex items-end justify-between gap-4 overflow-hidden max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-out">
                        <motion.p
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: index * 0.1 + 0.35,
                          }}
                          className="text-white/80 text-xs md:text-sm leading-relaxed max-w-[80%] font-normal"
                        >
                          {service.description}
                        </motion.p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService(service);
                          }}
                          className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white flex-shrink-0 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 shadow-lg cursor-pointer"
                          aria-label={`View details for ${service.title}`}
                        >
                          <ArrowUpRight size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Subtle Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Detail Modal Popup */}
      {selectedService !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
          {/* Dark Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedService(null)}
          />

          {/* Modal Card Container (Fixed height, no overflow scroll needed) */}
          <div className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2 h-auto md:h-[540px]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gray-100/90 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Left Column: Image */}
            <div className="relative h-48 md:h-full w-full overflow-hidden bg-gray-900">
              <img
                src={selectedService.image}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Column: Detailed Content (No Scroll) */}
            <div className="p-6 md:p-8 flex flex-col justify-between h-full overflow-hidden">
              <div>
                {/* Title Row with Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-[#0b1f3f]">
                    {React.createElement(selectedService.icon, {
                      size: 22,
                      strokeWidth: 2,
                    })}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    {selectedService.title}
                  </h3>
                </div>

                {/* Main Paragraph */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5 font-normal">
                  {selectedService.fullDesc}
                </p>

                {/* WHAT WE OFFER */}
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                    WHAT WE OFFER
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedService.whatWeOffer.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <Check
                          size={15}
                          className="text-[#0b1f3f] flex-shrink-0 mt-0.5"
                          strokeWidth={2.5}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* INCLUDED */}
                <div className="mb-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
                    INCLUDED
                  </h4>
                  <ul className="space-y-1">
                    {selectedService.included.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-700"
                      >
                        <span className="text-[#0b1f3f] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Bar (No Price, Direct Action Button) */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                <button
                  onClick={() => {
                    const currentTitle = selectedService?.title || "";
                    setContactServiceTitle(currentTitle);
                    setContactForm((prev) => ({
                      ...prev,
                      message: currentTitle
                        ? `Hi, I am interested in ${currentTitle}.`
                        : "",
                    }));
                    setSelectedService(null);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full sm:w-auto bg-[#0b1f3f] hover:bg-[#122a52] text-white text-xs md:text-sm font-semibold px-7 py-3 rounded-full transition-colors shadow-md text-center"
                >
                  Talk to the studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Form Modal Popup */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
          {/* Dark Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={() => setIsContactModalOpen(false)}
          />

          {/* Contact Form Modal Container */}
          <div className="relative w-full max-w-xl bg-white rounded-[2rem] p-6 md:p-8 shadow-2xl z-10 border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsContactModalOpen(false)}
              className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors shadow-sm"
              aria-label="Close contact modal"
            >
              <X size={18} />
            </button>

            {/* Modal Title */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0b1f3f] block mb-1">
                DIRECT INQUIRY
              </span>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                Talk to the Studio
              </h3>
              {contactServiceTitle && (
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Service interested in:{" "}
                  <span className="text-[#0b1f3f] font-semibold">
                    {contactServiceTitle}
                  </span>
                </p>
              )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    COMPANY
                  </label>
                  <input
                    type="text"
                    value={contactForm.company}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        company: e.target.value,
                      })
                    }
                    placeholder="Company name"
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    PHONE
                  </label>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    placeholder="+91 88488 17833"
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Project Type & Budget Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    PROJECT TYPE
                  </label>
                  <select
                    value={contactForm.projectType || contactServiceTitle}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        projectType: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all cursor-pointer"
                  >
                    <option value="">Select type</option>
                    <option value="Website Development">
                      Website Development
                    </option>
                    <option value="App Development">App Development</option>
                    <option value="Systems Development">
                      Systems Development
                    </option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Internet Leased Line">
                      Internet Leased Line
                    </option>
                    <option value="Enterprise Internet">
                      Enterprise Internet
                    </option>
                    <option value="Brand Strategy">Brand Strategy</option>
                    <option value="Connectivity">Connectivity</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                    BUDGET RANGE
                  </label>
                  <select
                    value={contactForm.budgetRange}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        budgetRange: e.target.value,
                      })
                    }
                    className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all cursor-pointer"
                  >
                    <option value="">Select range</option>
                    <option value="< $5,000">&lt; $5,000</option>
                    <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                    <option value="$15,000 - $50,000">$15,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Tell us about your project requirements..."
                  className="w-full bg-gray-50/80 border border-gray-200 px-4 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0b1f3f] focus:ring-1 focus:ring-[#0b1f3f] font-medium transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#0b1f3f] hover:bg-[#122a52] text-white text-sm font-semibold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesCarousel;
