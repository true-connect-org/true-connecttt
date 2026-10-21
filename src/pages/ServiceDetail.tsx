import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { gsap } from "@/animations/gsap.config";
import { ArrowUpRight, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import PageBanner from "@/components/site/PageBanner";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE_URL, services, whatsappHref } from "@/content/site";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import NotFound from "./NotFound";

const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400 mb-3 block";
const h2 = "text-2xl md:text-4xl font-medium text-[#0b1f3f] tracking-tight";

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
    <div ref={containerRef} className="bg-white min-h-screen text-[#2d2a26] font-sans overflow-x-hidden">
      {/* 1. BANNER: same navy hero as the other pages, with the service illustration */}
      <PageBanner
        title={service.title}
        sub={service.short}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: service.title }]}
        visual={
          <div className="w-full max-w-[420px] overflow-hidden rounded-[1.5rem] border border-white/15 shadow-2xl">
            <img src={image(800)} srcSet={`${image(800)} 800w, ${image(1600)} 1600w`} sizes="420px" alt={`${service.title} by True Connect`} className="h-[260px] w-full object-cover" />
          </div>
        }
      >
        <Link to="/contact#contact-form" className="inline-flex items-center gap-2 rounded-full bg-tc-yellow px-6 py-3 text-sm font-semibold text-tc-navy transition-colors hover:bg-white">
          Start a project <ArrowUpRight size={15} />
        </Link>
        <a
          href={whatsappHref(`Hi True Connect, I would like to know more about ${service.title}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-tc-navy"
        >
          <FaWhatsapp size={16} /> WhatsApp us
        </a>
      </PageBanner>

      {/* 2. OVERVIEW + WHAT'S INCLUDED */}
      <section className="py-14 md:py-20">
        <div className="container-tc grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-14">
          <div className="sd-scroll lg:col-span-7">
            <span className={eyebrow}>OVERVIEW</span>
            <h2 className={`${h2} mb-5`}>Why it matters</h2>
            <div className="space-y-4 text-[15px] leading-relaxed text-gray-600 md:text-base">
              {d.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="sd-scroll relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] to-[#153460] p-7 text-white shadow-[0_30px_60px_-30px_rgba(11,31,63,0.6)] md:p-9 lg:col-span-5">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6E84A] text-[#0b1f3f]">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">What's included</span>
              </div>
              <ul className="divide-y divide-white/10">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 text-sm text-white/90 md:text-[15px]">
                    <Check size={16} strokeWidth={2.5} className="mt-0.5 shrink-0 text-[#E6E84A]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* 3. STORY (optional) */}
      {d.story && (
        <section className="sd-scroll pb-14 md:pb-20">
          <div className="container-tc">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] p-7 text-white sm:p-10 md:rounded-[2.5rem] md:p-14">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/35 blur-3xl" />
              <div className="relative max-w-3xl">
                <span className="mb-3 block text-[11px] font-bold uppercase tracking-[0.25em] text-[#E6E84A]">{d.story.label}</span>
                <h2 className="mb-5 text-2xl font-medium leading-[1.2] tracking-tight md:text-4xl">{d.story.heading}</h2>
                <div className="space-y-4 text-sm leading-relaxed text-white/75 md:text-base">
                  {d.story.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. DELIVERABLES */}
      <section className="bg-[#f6f7f9] py-14 md:py-20">
        <div className="container-tc">
          <div className="sd-scroll mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <span className={eyebrow}>WHAT YOU GET</span>
            <h2 className={h2}>How we help</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {d.deliverables.map((item, i) => (
              <div key={item.title} className="sd-scroll group card-lift relative overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm md:p-7">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#E6E84A] transition-transform duration-500 group-hover:scale-x-100" />
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b1f3f] text-xs font-bold text-white transition-colors duration-300 group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base leading-snug text-[#0b1f3f] md:text-lg">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. APPROACH */}
      <section className="py-14 md:py-20">
        <div className="container-tc">
          <div className="sd-scroll mx-auto mb-10 max-w-2xl text-center md:mb-14">
            <span className={eyebrow}>HOW WE WORK</span>
            <h2 className={h2}>Our approach</h2>
          </div>
          <ol className="sd-scroll grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {d.approach.map((step, i) => (
              <li key={step.title} className="relative rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm">
                <span className="text-4xl font-extrabold leading-none text-[#0b1f3f]/10">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-base text-[#0b1f3f] md:text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. OTHER SERVICES: image cards, like the home page */}
      <section className="bg-[#f6f7f9] py-14 md:py-20">
        <div className="container-tc">
          <div className="sd-scroll mx-auto mb-10 max-w-2xl text-center">
            <span className={eyebrow}>MORE SERVICES</span>
            <h2 className={h2}>Explore what else we do</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {others.map((o) => {
              const v = serviceVisuals[o.id];
              return (
                <Link key={o.id} to={o.to} className="sd-scroll group card-lift-dark relative flex h-[220px] flex-col justify-end overflow-hidden rounded-[1.5rem] p-6 text-white">
                  <img src={v.image(800)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="relative flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">{o.label}</p>
                      <h3 className="mt-1 text-xl leading-tight text-white">{o.title}</h3>
                    </div>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 backdrop-blur-md transition-colors group-hover:bg-white group-hover:text-[#0b1f3f]">
                      <ArrowUpRight size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA */}
      <section className="py-14 md:py-20">
        <div className="container-tc">
          <div className="sd-scroll relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-6 py-12 text-center text-white md:rounded-[2.5rem] md:px-12 md:py-16">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/35 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-2xl font-medium leading-[1.2] tracking-tight md:text-4xl">{d.cta}</h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-base">
                Tell us where you are today and where you want to be. Our team will come back with clear next steps.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact#contact-form" className="inline-flex items-center gap-2 rounded-full bg-tc-yellow px-7 py-3.5 text-sm font-semibold text-tc-navy transition-colors hover:bg-white">
                  Start a project <ArrowUpRight size={15} />
                </Link>
                <Link to="/services" className="inline-flex items-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-tc-navy">
                  All services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
