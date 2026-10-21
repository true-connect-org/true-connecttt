import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Layers,
  BadgeCheck,
  Code2,
  Eye,
  Target,
} from "lucide-react";
import { gsap } from "@/animations/gsap.config";
import PageBanner from "@/components/site/PageBanner";
import { AboutVisual } from "@/components/site/BannerVisuals";
import ServicesShowcase from "@/components/ServicesShowcase";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { seo, about, whatsappHref } from "@/content/site";
import { FaWhatsapp } from "react-icons/fa6";

const strengthIcons = [Layers, BadgeCheck, Code2];

const eyebrow = "text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 mb-4 block";
const h2 = "text-3xl md:text-5xl font-medium text-[#2d2a26] tracking-tight";
const wrap = "container-tc";

const AboutUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useSeo({
    ...seo.about,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });

  useLayoutEffect(() => {
    if (isPrerender) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".animate-on-scroll").forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white min-h-screen text-[#2d2a26] font-sans pb-0 overflow-x-hidden">
      {/* 1. HERO BANNER */}
      <PageBanner
        variant="about"
        visual={<AboutVisual />}
        eyebrow="About True Connect"
        title={about.hero.headline[0]}
        accent={about.hero.headline[1]}
        sub={about.hero.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      {/* 2. WHO WE ARE */}
      <section className="py-14 md:py-20 bg-[#f6f7f9]">
        <div className={`${wrap} text-left md:text-center`}>
          <div className="animate-on-scroll max-w-3xl md:mx-auto">
            <span className={eyebrow}>{about.overview.label.toUpperCase()}</span>
            <h2 className="whitespace-nowrap text-[clamp(1rem,5.6vw,1.875rem)] md:text-5xl font-medium text-[#2d2a26] tracking-tight">{about.overview.heading}</h2>
            <div className="mt-4 space-y-5 text-gray-600 text-sm md:mt-6 md:text-lg leading-relaxed">
              {about.overview.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION AND MISSION */}
      <section id="vision-mission" className="py-12 md:py-20 scroll-mt-24">
        <div className={`${wrap} grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8`}>
          <div className="animate-on-scroll relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] bg-[#0b1f3f] text-white p-7 md:p-10">
            <div className="absolute top-[-30%] right-[-20%] w-[70%] h-[80%] bg-white/5 blur-[110px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Eye size={18} strokeWidth={1.6} />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">{about.vision.label}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-medium tracking-tight leading-[1.25] mb-3">{about.vision.heading}</h2>
              <p className="text-white/75 text-sm md:text-base leading-relaxed">{about.vision.text}</p>
            </div>
          </div>

          <div className="animate-on-scroll rounded-[1.75rem] md:rounded-[2rem] border border-gray-200 bg-white p-7 md:p-10 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f3f] text-white shadow-md">
                <Target size={18} strokeWidth={1.6} />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0b1f3f]">{about.mission.label}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-medium tracking-tight leading-[1.25] text-[#0b1f3f] mb-3">{about.mission.heading}</h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">{about.mission.text}</p>
          </div>
        </div>
      </section>

      {/* 4. OUR STRENGTHS */}
      <section className="py-14 md:py-20 bg-[#f6f7f9]">
        <div className={wrap}>
          <div className="animate-on-scroll max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <span className={eyebrow}>{about.strengths.label.toUpperCase()}</span>
            <h2 className={`${h2} mb-5`}>{about.strengths.heading}</h2>
            <p className="text-gray-500 text-[13px] sm:text-base md:text-lg leading-relaxed">{about.strengths.intro}</p>
          </div>

          {/* One panel, three rows (stacked on phones, side by side on larger screens) */}
          <div className="animate-on-scroll mx-auto grid max-w-5xl grid-cols-1 divide-y divide-gray-100 overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0 md:rounded-[1.75rem]">
            {about.strengths.items.map((item, i) => {
              const Icon = strengthIcons[i];
              return (
                <div key={item.title} className="group p-5 transition-colors duration-300 hover:bg-[#f9fafb] md:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b1f3f] text-white transition-colors duration-300 group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f]">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-base leading-snug text-[#0b1f3f] md:text-lg">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-gray-500 md:text-sm">{item.text}</p>
                  <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0b1f3f]/60 md:mt-4">{item.highlight}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. OUR STORY: dark band with a connected timeline */}
      <section className="py-14 md:py-20 bg-white">
        <div className={wrap}>
          <div className="animate-on-scroll relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-6 py-12 text-white sm:px-10 md:px-16 md:py-20">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/30 blur-3xl" />
            <div className="relative mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.25em] text-white/55">OUR JOURNEY</span>
              <h2 className="text-3xl tracking-tight md:text-5xl">{about.story.heading}</h2>
            </div>

            <ol className="relative grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              <span aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-white/20 md:left-0 md:right-0 md:top-[7px] md:bottom-auto md:h-px md:w-auto" />
              {about.story.chapters.map((ch, i) => (
                <li key={ch.title} className="relative pl-9 md:pl-0 md:pt-10">
                  <span aria-hidden className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-white bg-[#030a16] md:top-0" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{String(i + 1).padStart(2, "0")} · {ch.when}</span>
                  <h3 className="mt-3 text-xl text-white md:text-2xl">{ch.title}</h3>
                  <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/65 md:text-sm">{ch.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK */}
      <section className="py-14 md:py-20 bg-[#f6f7f9]">
        <div className={wrap}>
          <div className="animate-on-scroll max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <span className={eyebrow}>{about.process.label.toUpperCase()}</span>
            <h2 className={`${h2} mb-5`}>{about.process.heading}</h2>
            <p className="text-gray-500 text-sm md:text-lg leading-relaxed">{about.process.intro}</p>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:gap-5">
            {about.process.steps.map((step, i) => (
              <li key={step.title} className="animate-on-scroll card-lift flex flex-col rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm last:sm:col-span-2 last:lg:col-span-1">
                <span className="text-3xl font-extrabold leading-none text-[#0b1f3f]/15">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-base leading-snug text-[#0b1f3f]">{step.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-gray-500">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="animate-on-scroll relative mt-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-6 py-10 text-center text-white md:mt-8 md:rounded-[2.5rem] md:px-12 md:py-14">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#1a4480]/30 blur-3xl" />
            <h3 className="relative mx-auto max-w-2xl text-xl leading-snug md:text-3xl">{about.process.closing.heading}</h3>
            <p className="relative mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-white/70 md:text-base">{about.process.closing.text}</p>
          </div>
        </div>
      </section>

      {/* 7. SERVICES: the same cards as the home page */}
      <ServicesShowcase
        id="about-services"
        className="bg-white"
        eyebrow="What we do"
        headline="Six services. One accountable team."
        sub="Marketing, software, automation and enterprise internet, planned together and delivered by one team in Technopark."
      />

      {/* 8. CLOSING CONTACT */}
      <section className="pb-14 md:pb-20 bg-white">
        <div className="container-tc">
          <div className="animate-on-scroll relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-6 py-12 text-center text-white md:rounded-[2.5rem] md:px-12 md:py-16">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/35 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#1a4480]/25 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <span className="mb-4 block text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">Start a project</span>
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">Your vision deserves execution.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-base md:text-lg">
                Bring us the goal. Our team brings the strategy, the systems and the people to deliver it.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/contact#contact-form" className="inline-flex items-center gap-2 rounded-full bg-tc-yellow px-7 py-3.5 text-sm font-semibold text-tc-navy transition-colors duration-300 hover:bg-white">
                  Start a project <ArrowUpRight size={15} />
                </Link>
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-tc-navy">
                  <FaWhatsapp size={16} /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
