import { useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import { ArrowUpRight, ArrowRight, Check, MessageSquare, ClipboardList, Hammer, Rocket, TrendingUp } from "lucide-react";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import { isPrerender } from "@/lib/env";
import PageBanner from "@/components/site/PageBanner";
import { ServicesVisual } from "@/components/site/BannerVisuals";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, seo, services, servicesPage, home, whatsappHref } from "@/content/site";

const processIcons = [MessageSquare, ClipboardList, Hammer, Rocket, TrendingUp];

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useSeo({
    ...seo.services,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
      ...services.map((s) => ({
        "@context": "https://schema.org",
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Thiruvananthapuram, Kerala",
      })),
    ],
  });

  useLayoutEffect(() => {
    if (isPrerender) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.1 });
      gsap.set(".svc-reveal-line", { transformPerspective: 800 });
      heroTl
        .fromTo(
          ".svc-reveal-line",
          { y: "110%", opacity: 0, rotateX: 8 },
          { y: "0%", opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.12, ease: "power4.out", clearProps: "rotateX,transformPerspective" }
        )
        .fromTo(".svc-hero-el", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" }, "-=0.5");

      // Left/right reveal for service rows
      gsap.utils.toArray<HTMLElement>(".svc-card-row").forEach((row) => {
        const leftEl = row.querySelector(".svc-card-left");
        const rightEl = row.querySelector(".svc-card-right");
        if (leftEl) {
          gsap.fromTo(leftEl, { x: -80, y: 24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.75, ease: "power4.out", scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" } });
        }
        if (rightEl) {
          gsap.fromTo(rightEl, { x: 80, y: 24, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.75, delay: 0.08, ease: "power4.out", scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" } });
        }
      });

      gsap.utils.toArray<HTMLElement>(".svc-scroll-in").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { packages } = servicesPage;

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#2d2a26] font-sans pb-0 overflow-x-hidden">
      {/* ─── 1. HERO BANNER ─── */}
      <PageBanner
        variant="services"
        visual={<ServicesVisual />}
        eyebrow="What we do"
        title="Built to grow"
        accent="your business."
        sub={servicesPage.hero.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services" }]}
      />

      <div className="h-10 md:h-14" />

      {/* ─── 2. SERVICES — ALTERNATING EDITORIAL ROWS ─── */}
      <section className="mb-10 md:mb-12">
        <div className="container-tc mb-10">
          <div className="svc-scroll-in flex items-center justify-between border-b border-gray-200 pb-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">OUR SERVICES · {String(services.length).padStart(2, "0")}</span>
            <span className="text-[11px] font-semibold text-gray-500 hidden sm:inline">Click any service to read more</span>
          </div>
        </div>

        {services.map((service, index) => {
          const { icon: Icon, image: getImage } = serviceVisuals[service.id];
          const image = getImage(800);
          const imageSet = `${getImage(800)} 800w, ${getImage(1600)} 1600w`;
          const isEven = index % 2 === 0;
          const num = String(index + 1).padStart(2, "0");

          return (
            <div key={service.id} id={service.id} className="svc-card-row scroll-mt-28 container-tc mb-10 md:mb-14 last:mb-0">
              <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center`}>
                {/* IMAGE SIDE */}
                <div className={`w-full lg:w-[55%] relative group ${isEven ? "svc-card-left" : "svc-card-right"}`}>
                  <Link to={service.to} aria-label={service.title} className="block relative rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                    <img
                      src={image}
                      srcSet={imageSet}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      alt={serviceVisuals[service.id].alt}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="w-full h-[220px] sm:h-[300px] md:h-[420px] object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                  </Link>

                </div>

                {/* CONTENT SIDE */}
                <div className={`w-full lg:w-[45%] relative z-10 ${isEven ? "svc-card-right" : "svc-card-left"}`}>
                  <div className="flex items-center gap-2.5 mb-3 md:mb-5">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-md">
                      <Icon size={14} className="sm:w-[16px] sm:h-[16px]" strokeWidth={2} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                      SERVICE {num}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2d2a26] tracking-tight leading-[1.15] mb-3 md:mb-5"><Link to={service.to} className="hover:text-[#0b1f3f]">{service.title}</Link></h2>
                  <p className="text-gray-500 text-xs sm:text-sm md:text-base leading-relaxed mb-4 md:mb-6">{service.description}</p>

                  <ul className="space-y-2 md:space-y-3 mb-5 md:mb-8">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0b1f3f]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={10} className="text-[#0b1f3f]" strokeWidth={3} />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={service.to} className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0b1f3f] hover:text-[#122a52] transition-colors group/btn" >
                    Learn more<span className="sr-only"> about {service.title}</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0b1f3f] group-hover/btn:bg-[#122a52] text-white flex items-center justify-center transition-all group-hover/btn:scale-110 shadow-sm">
                      <ArrowRight size={13} />
                    </div>
                  </Link>
                </div>
              </div>

              {index < services.length - 1 && <div className="mt-10 md:mt-14 border-b border-gray-100" />}
            </div>
          );
        })}
      </section>

      {/* ─── 4. PACKAGES — NAVY BANNER ─── */}
      <section id="packages" className="svc-scroll-in scroll-mt-24 container-tc mb-10 md:mb-14">
        <div className="max-w-[1400px] mx-auto bg-[#0b1f3f] rounded-[1.75rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">PACKAGES</span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.15] mb-8 md:mb-10">{packages.heading}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
              {packages.items.map((p) => (
                <div key={p.name} className="bg-white/[0.06] border border-white/15 hover:border-white/40 rounded-[1.5rem] p-6 md:p-8 transition-colors">
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">{p.name}</h3>
                  <p className="text-white/55 text-xs font-semibold uppercase tracking-[0.15em] mb-5">{p.for}</p>
                  <p className="text-white/75 text-sm leading-relaxed">{p.includes}</p>
                  {packages.startingPrice && <p className="mt-5 text-sm text-white/80">Starting from ₹{packages.startingPrice}</p>}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                to={packages.button.to}
                className="bg-white hover:bg-gray-100 text-[#0b1f3f] font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                {packages.button.label} <ArrowUpRight size={15} />
              </Link>
              <a
                href={whatsappHref("Hi True Connect, I would like a quote for a package.")}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/25 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. HOW WE WORK — TIMELINE ─── */}
      <section className="bg-[#f6f7f9] py-14 md:py-20 mb-0">
       <div className="container-tc">
        <div className="svc-scroll-in max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-4 block">HOW WE WORK</span>
          <h2 className="text-3xl md:text-5xl font-medium text-[#2d2a26] tracking-tight mb-6">{home.process.heading}</h2>
        </div>

        <div className="svc-scroll-in relative">
          <div className="lg:hidden absolute top-[28px] bottom-[28px] left-[27px] w-[2px] bg-gray-200 z-0" />
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-[2px] bg-gray-200 z-0" />

          <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 md:gap-10 relative z-10">
            {home.process.steps.map((step, i) => {
              const StepIcon = processIcons[i];
              return (
                <div key={step.title} className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0">
                  <div className="w-14 h-14 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-lg lg:mb-6 border-4 border-[#f6f7f9] shrink-0 z-10">
                    <StepIcon size={20} strokeWidth={1.75} />
                  </div>
                  <div className="flex flex-col items-start lg:items-center">
                    <span className="text-[10px] font-bold text-[#0b1f3f]/50 tracking-[0.25em] uppercase mb-1 lg:mb-2">STEP {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-lg md:text-xl font-semibold text-[#2d2a26] mb-1.5 lg:mb-2">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-full lg:max-w-[220px]">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
       </div>
      </section>

      {/* ─── 6. BOTTOM CTA ─── */}
      <section className="border-t border-gray-100">
        <div className="container-tc py-12 md:py-16 text-center">
          <div className="svc-scroll-in max-w-3xl mx-auto">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-6 block">YOUR PROJECT STARTS HERE</span>
            <h2 className="text-3xl md:text-5xl font-medium text-[#2d2a26] tracking-tight mb-6">{home.cta.heading}</h2>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">{home.cta.body}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                Start a project <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/about"
                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
              >
                About True Connect
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
