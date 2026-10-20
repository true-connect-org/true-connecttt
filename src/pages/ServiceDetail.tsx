import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import { ArrowUpRight, ArrowRight, Check, ChevronRight } from "lucide-react";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, services, whatsappHref } from "@/content/site";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import NotFound from "./NotFound";

const eyebrow = "text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block";
const h2 = "text-3xl md:text-5xl font-medium text-[#2d2a26] tracking-tight";

const ServiceDetail = () => {
  const { slug = "" } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const service = services.find((s) => s.slug === slug);

  useSeo({
    title: service ? service.seoTitle : "Service not found | True Connect",
    description: service ? service.description : "",
    path: `/services/${slug}`,
    noindex: !service,
    jsonLd: service
      ? [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: service.to },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: "Thiruvananthapuram, Kerala",
          },
        ]
      : undefined,
  });

  useEffect(() => {
    if (isPrerender || !service) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(".sd-hero-el", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".sd-scroll").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, [service]);

  if (!service) return <NotFound />;
  // Enterprise Internet has its own, richer page
  if (service.to !== `/services/${service.slug}`) return <Navigate to={service.to} replace />;

  const { icon: Icon, image } = serviceVisuals[service.id];
  const d = service.detail;
  const others = services.filter((s) => s.id !== service.id);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#2d2a26] font-sans pt-28 md:pt-36 pb-0 overflow-x-hidden">
      {/* Hero */}
      <section className="container-tc mb-10 md:mb-14">
        <nav aria-label="Breadcrumb" className="sd-hero-el flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#0b1f3f]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/services" className="hover:text-[#0b1f3f]">Services</Link>
          <ChevronRight size={12} />
          <span className="text-gray-600">{service.title}</span>
        </nav>

        <div className="max-w-4xl">
          <div className="sd-hero-el flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-md">
              <Icon size={20} strokeWidth={1.75} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">OUR SERVICES</span>
          </div>
          <h1 className="sd-hero-el text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2d2a26] leading-[1.1] mb-6">{service.title}</h1>
          <p className="sd-hero-el text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed mb-10">{service.short}</p>
          <div className="sd-hero-el flex flex-wrap items-center gap-4">
            <Link to="/contact" className="bg-[#0b1f3f] hover:bg-[#122a52] text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
              Start a project <ArrowUpRight size={16} />
            </Link>
            <a
              href={whatsappHref(`Hi True Connect, I would like to know more about ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      {/* Image banner */}
      <section className="sd-scroll container-tc mb-12 md:mb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full h-[240px] sm:h-[340px] md:h-[440px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl relative bg-[#0b1f3f]">
            <img src={image(1600)} alt={`${service.title} in Trivandrum`} className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3f]/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Overview + includes */}
      <section className="container-tc mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="sd-scroll lg:col-span-7">
            <span className={eyebrow}>OVERVIEW</span>
            <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
              {d.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="sd-scroll lg:col-span-5 bg-[#0b1f3f] text-white rounded-[2rem] p-8 md:p-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5 block">WHAT'S INCLUDED</span>
            <ul className="space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/85">
                  <span className="mt-1 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Story */}
      {d.story && (
        <section className="sd-scroll container-tc mb-12 md:mb-16">
          <div className="max-w-[1400px] mx-auto bg-[#0b1f3f] rounded-[1.75rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-[-30%] right-[-10%] w-[50%] h-[80%] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-white/50 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-4 block">{d.story.label.toUpperCase()}</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium text-white tracking-tight leading-[1.15] mb-6 md:mb-8">{d.story.heading}</h2>
              <div className="space-y-4 text-white/75 text-sm sm:text-base md:text-lg leading-relaxed">
                {d.story.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Deliverables */}
      <section className="bg-gray-50/50 py-12 md:py-16 border-y border-gray-100 mb-12 md:mb-16">
        <div className="container-tc">
          <div className="sd-scroll max-w-3xl mb-10 md:mb-12">
            <span className={eyebrow}>WHAT YOU GET</span>
            <h2 className={h2}>How we help</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {d.deliverables.map((item, i) => (
              <div key={item.title} className="sd-scroll bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                <span className="text-xs font-bold tracking-[0.2em] text-gray-400 block mb-5">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-lg font-semibold text-[#2d2a26] mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="container-tc mb-12 md:mb-16">
        <div className="sd-scroll max-w-3xl mb-10 md:mb-14">
          <span className={eyebrow}>HOW WE WORK</span>
          <h2 className={h2}>Our approach</h2>
        </div>
        <div className="sd-scroll relative">
          <div className="lg:hidden absolute top-[28px] bottom-[28px] left-[27px] w-[2px] bg-gray-200 z-0" />
          <div className="hidden lg:block absolute top-[28px] left-[8%] right-[8%] h-[2px] bg-gray-200 z-0" />
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
            {d.approach.map((step, i) => (
              <div key={step.title} className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center gap-5 lg:gap-0">
                <div className="w-14 h-14 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center shadow-lg lg:mb-6 border-4 border-white shrink-0 z-10 font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-[#2d2a26] mb-1.5">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed lg:max-w-[220px]">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-12 md:py-16 bg-gray-50/50 border-t border-gray-100">
        <div className="container-tc">
          <div className="sd-scroll max-w-3xl mb-8 md:mb-10">
            <span className={eyebrow}>MORE SERVICES</span>
            <h2 className={h2}>Explore what else we do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {others.map((o) => {
              const OIcon = serviceVisuals[o.id].icon;
              return (
                <Link key={o.id} to={o.to} className="sd-scroll group bg-white border border-gray-200/60 hover:border-gray-300 p-6 rounded-[1.25rem] transition-all duration-300 hover:shadow-md flex flex-col">
                  <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200/80 flex items-center justify-center text-gray-700 mb-5 group-hover:scale-110 transition-transform">
                    <OIcon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-[#2d2a26] mb-2">{o.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed flex-1">{o.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0b1f3f]">
                    Learn more <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100">
        <div className="container-tc py-14 md:py-20 sd-scroll">
          <div className="max-w-3xl mx-auto text-center">
          <h2 className={`${h2} mb-6`}>{d.cta}</h2>
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            Tell us where you are today and where you want to be. Our team will come back with clear next steps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="border-2 border-tc-navy hover:border-tc-deepblue bg-white hover:bg-tc-navy text-tc-navy hover:text-white font-bold text-xs tracking-[0.2em] uppercase px-10 py-5 rounded-full shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              START A PROJECT
            </Link>
            <Link to="/services" className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-8 py-4 rounded-full transition-all duration-300">
              All services
            </Link>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
