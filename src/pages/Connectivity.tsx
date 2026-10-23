import { Phone, ShieldCheck, Timer, BadgeCheck, RadioTower, Wifi, Cable, Cpu } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import PageBanner from "@/components/site/PageBanner";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import { SITE_URL, seo, business, connectivity as c, whatsappHref } from "@/content/site";

const availabilityMsg = "Hi True Connect, I'd like a free consultation for business internet at my location.";

/** Enterprise Internet: a short page that leads visitors to a WhatsApp conversation. */
const Connectivity = () => {
  useSeo({
    ...seo.connectivity,
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "Enterprise Internet", path: "/connectivity" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Leased line and business broadband",
        serviceType: "Enterprise connectivity",
        description: c.hero.sub,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Kerala",
      },
    ],
  });

  const image = serviceVisuals["enterprise-internet"].image(800);
  const [leased, broadband] = c.solutions.items;
  const plans = [
    { ...leased, msg: "Hi True Connect, I would like to know more about a dedicated leased line for my business." },
    { ...broadband, msg: "Hi True Connect, I would like to know more about business broadband." },
  ];
  const k = c.keyFigures;
  const proof = [
    k.uptime && { Icon: ShieldCheck, value: `${k.uptime}%`, label: "Uptime SLA" },
    k.siteVisitMinutes && { Icon: Timer, value: `${k.siteVisitMinutes} min`, label: "On-site support" },
    { Icon: BadgeCheck, value: "Jio", label: "Authorized partner" },
  ].filter(Boolean) as { Icon: typeof ShieldCheck; value: string; label: string }[];

  return (
    <div className="bg-white min-h-screen text-[#2d2a26] font-sans overflow-x-clip">
      {/* 1. BANNER with the Enterprise Internet image */}
      <PageBanner
        eyebrow="Enterprise Internet"
        title={c.hero.headline}
        sub={c.hero.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Enterprise Internet" }]}
        visual={
          <div className="w-full max-w-[400px] overflow-hidden rounded-[1.5rem] border border-white/15 shadow-2xl">
            <img src={image} alt={serviceVisuals["enterprise-internet"].alt} className="h-[260px] w-full object-cover" />
          </div>
        }
      />

      {/* 2. TWO CONNECTIONS */}
      <section className="py-12 md:py-16">
        <div className="container-tc">
          <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <h2 className="text-balance text-3xl font-medium tracking-tight text-[#0b1f3f] md:text-4xl">{c.compare.heading}</h2>
            <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-gray-500 sm:text-base">{c.compare.note}</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {plans.map((p, i) => (
              <div
                key={p.title}
                className={`flex flex-col rounded-[1.75rem] p-7 md:p-9 ${
                  i === 0 ? "card-lift-dark bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] text-white" : "card-lift border border-gray-200 bg-white hover:border-[#0b1f3f]/30"
                }`}
              >
                <p className={`text-[11px] font-bold uppercase tracking-[0.2em] ${i === 0 ? "text-[#E6E84A]" : "text-gray-500"}`}>Best for {p.best}</p>
                <h3 className={`mt-3 text-2xl font-semibold tracking-tight ${i === 0 ? "text-white" : "text-[#0b1f3f]"}`}>{p.title}</h3>
                <p className={`mt-3 flex-1 text-sm leading-relaxed md:text-base ${i === 0 ? "text-white/70" : "text-gray-500"}`}>{p.get}.</p>
                <a
                  href={whatsappHref(p.msg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-7 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                    i === 0 ? "bg-white text-[#0b1f3f] hover:bg-[#E6E84A]" : "bg-[#0b1f3f] text-white hover:bg-[#E6E84A] hover:text-[#0b1f3f]"
                  }`}
                >
                  <FaWhatsapp size={16} /> Ask on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROOF: one compact strip */}
      <section className="pb-4">
        <div className="container-tc">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-[#0b1f3f] px-4 py-7 text-white md:rounded-[2.5rem] md:px-10 md:py-9">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
            <div className="relative grid grid-cols-3 divide-x divide-white/10">
              {proof.map(({ Icon, value, label }) => (
                <div key={label} className="group flex flex-col items-center px-2 text-center md:flex-row md:gap-4 md:px-6 md:text-left">
                  <span className="mb-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16305c] ring-1 ring-white/20 transition-colors duration-300 group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f] md:mb-0 md:h-11 md:w-11">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-xl font-extrabold leading-none md:text-2xl">{value}</span>
                    <span className="mt-1 block text-[11px] leading-snug text-white/60 md:text-sm">{label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. JIO IN THE AI ERA: general, publicly known capabilities only (no figures) */}
      <section className="py-14 md:py-20">
        <div className="container-tc">
          <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
            <h2 className="text-balance text-3xl font-medium tracking-tight text-[#0b1f3f] md:text-4xl">Built on Jio. Ready for the AI era.</h2>
            <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-gray-500 sm:text-base">Next-generation network technology from Jio, installed and supported by our own team.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
            {[
              { Icon: RadioTower, title: "Jio True 5G", text: "Jio's standalone 5G network, built for high speed and low latency." },
              { Icon: Wifi, title: "JioAirFiber", text: "Wireless 5G broadband for offices where laying cable is hard." },
              { Icon: Cable, title: "Dedicated fibre", text: "Leased lines on Jio's fibre network, with bandwidth reserved for you." },
              { Icon: Cpu, title: "AI-ready connectivity", text: "The fast, stable uplink that cloud tools, CCTV and AI workloads need." },
            ].map(({ Icon, title, text }) => (
              <div key={title} className="group card-lift relative overflow-hidden rounded-[1.5rem] border border-gray-100 bg-white p-6 shadow-sm">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[#E6E84A] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0b1f3f] text-white transition-colors duration-300 group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f]">
                  <Icon size={19} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base text-[#0b1f3f] md:text-lg">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLOSING: chat first */}
      <section className="py-14 md:py-20">
        <div className="container-tc">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] px-6 py-12 text-center text-white md:rounded-[2.5rem] md:px-12 md:py-16">
            <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#1a4480]/35 blur-3xl" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">Tell us what you need. We'll design the exact solution.</h2>
              <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-white/70 sm:text-base md:text-lg">
                Send us a message for a free consultation. We'll check feasibility at your location and recommend the right connection.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={whatsappHref(availabilityMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-tc-yellow px-5 py-3.5 text-[13px] font-semibold text-tc-navy transition-colors duration-300 hover:bg-white sm:px-7 sm:text-sm"
                >
                  <FaWhatsapp size={17} /> Get a free consultation
                </a>
                <a
                  href={`tel:${business.phoneTel}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-tc-navy"
                >
                  <Phone size={16} /> Call us
                </a>
              </div>
              <p className="mt-6 text-xs text-white/50">Authorized Reliance Jio channel partner</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Connectivity;
