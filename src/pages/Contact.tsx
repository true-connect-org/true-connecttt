import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2, ArrowUpRight, Phone, MapPin, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { toast } from "sonner";
import { gsap } from "@/animations/gsap.config";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { sendEnquiry } from "@/lib/enquiry";
import PageBanner from "@/components/site/PageBanner";
import { ContactVisual } from "@/components/site/BannerVisuals";
import { seo, contact, business, fullAddress, registeredOffice, whatsappHref } from "@/content/site";

const inputClass =
  "w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/20 focus:border-[#0b1f3f] transition-all";
const labelClass = "block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-1.5";

const ContactUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [doneName, setDoneName] = useState<string | null>(null);

  useSeo({
    ...seo.contact,
    jsonLd: [
      localBusinessSchema,
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  });

  useEffect(() => {
    if (isPrerender) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.1 });
      gsap.set(".ct-reveal-line", { transformPerspective: 800 });
      heroTl
        .fromTo(
          ".ct-reveal-line",
          { y: "110%", opacity: 0, rotateX: 8 },
          { y: "0%", opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.12, ease: "power4.out", clearProps: "rotateX,transformPerspective" }
        )
        .fromTo(".contact-header-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");

      gsap.utils.toArray<HTMLElement>(".contact-elem").forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("tc_hp_check")) return; // honeypot
    setSending(true);
    setFailed(false);
    try {
      await sendEnquiry({
        formType: "Contact",
        name: String(d.get("name")),
        phone: String(d.get("phone")),
        email: String(d.get("email") || ""),
        needs: d.get("service") ? [String(d.get("service"))] : [],
        message: String(d.get("message") || ""),
      });
      setDoneName(String(d.get("name") || "").trim() || "there");
      form.reset();
    } catch (err) {
      console.error("Enquiry failed", err);
      setFailed(true);
      toast.error("Could not send your enquiry. Please try again or message us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };


  return (
    <div ref={containerRef} className="bg-white min-h-screen text-gray-900 font-sans pb-0">
      {/* 1. HERO BANNER */}
      <PageBanner
        visual={<ContactVisual />}
        eyebrow="Contact"
        title={contact.headline}
        sub={contact.sub}
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      {/* 2. CONTACT FORM: one split card, navy pitch on the left, a short form on the right */}
      <section id="contact-form" className="scroll-mt-24 py-14 md:py-20 bg-white">
        <div className="container-tc">
          <div className="contact-elem mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-[1.75rem] border border-gray-100 shadow-[0_30px_60px_-30px_rgba(11,31,63,0.35)] md:rounded-[2rem] lg:grid-cols-5">
            {/* Left: pitch and quick contact */}
            <div className="relative flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] p-7 text-white sm:p-10 lg:col-span-2">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
              <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#E6E84A]/10 blur-3xl" />
              <div className="relative">
                <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight md:text-4xl">Let's make growth simple.</h2>
                <p className="mt-3 text-[13px] leading-relaxed text-white/70 sm:text-base">One form, one team, one clear plan for your business.</p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#E6E84A] px-5 py-2.5 text-sm font-semibold text-[#0b1f3f] transition-colors duration-300 hover:bg-white"
                  >
                    <FaWhatsapp size={16} /> WhatsApp
                  </a>
                  <a
                    href={`tel:${business.phoneTel}`}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-[#0b1f3f]"
                  >
                    <Phone size={15} /> Call us
                  </a>
                </div>

                <div className="mt-8 space-y-1.5 border-t border-white/15 pt-6 text-sm text-white/75">
                  <a href={`tel:${business.phoneTel}`} className="block transition-colors hover:text-[#E6E84A]">{business.phoneDisplay}</a>
                  <a href={`mailto:${business.email}`} className="block break-all transition-colors hover:text-[#E6E84A]">{business.email}</a>
                </div>
              </div>
            </div>

            {/* Right: the form */}
            <div className="bg-white p-6 sm:p-10 lg:col-span-3">
              {doneName ? (
                <div role="status" className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0b1f3f] text-white">
                    <CheckCircle2 size={28} />
                  </div>
                  <p className="mx-auto max-w-sm leading-relaxed text-gray-600">{contact.success(doneName)}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative space-y-5">
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Leave this empty
                      <input type="text" name="tc_hp_check" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore="true" defaultValue="" />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ct-name" className={labelClass}>Name *</label>
                      <input id="ct-name" required name="name" autoComplete="name" placeholder="Your name" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="ct-phone" className={labelClass}>Phone *</label>
                      <input id="ct-phone" required type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-email" className={labelClass}>Email</label>
                    <input id="ct-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="ct-service" className={labelClass}>I need help with</label>
                    <select id="ct-service" name="service" defaultValue="" className={`${inputClass} cursor-pointer text-gray-700`}>
                      <option value="">Choose a service</option>
                      {contact.needs.map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  </div>

                  <div>
                    <label htmlFor="ct-message" className={labelClass}>Message</label>
                    <textarea id="ct-message" name="message" rows={4} placeholder="Tell us about your business and what you want to achieve" className={`${inputClass} resize-none`} />
                  </div>

                  {failed && (
                    <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      Your enquiry could not be sent. Please try again, or{" "}
                      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">message us on WhatsApp</a>.
                    </p>
                  )}
                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center justify-center gap-2 self-start whitespace-nowrap rounded-full bg-[#0b1f3f] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-tc-yellow hover:text-tc-navy hover:shadow-lg disabled:opacity-60"
                    >
                      {sending ? "Sending…" : contact.button} {!sending && <Send size={15} />}
                    </button>
                    <p className="text-xs text-gray-400">
                      By sending, you agree to our <Link to="/privacy" className="underline">Privacy Policy</Link>.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCATION: office details on the left, map on the right (stacked on phones) */}
      <section className="pb-14 md:pb-20 bg-white">
        <div className="container-tc contact-elem">
          <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white shadow-[0_30px_60px_-30px_rgba(11,31,63,0.25)] md:rounded-[2rem] lg:grid-cols-5">
            <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Visit us</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-[#0b1f3f] md:text-3xl">Our Trivandrum office</h2>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <span className="leading-relaxed text-gray-600">{fullAddress}</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <a href={`tel:${business.phoneTel}`} className="font-semibold text-[#0b1f3f] hover:underline">{business.phoneDisplay}</a>
                </li>
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <a href={`mailto:${business.email}`} className="break-all font-semibold text-[#0b1f3f] hover:underline">{business.email}</a>
                </li>
                <li className="flex gap-3">
                  <Clock size={18} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  <span className="text-gray-600">{business.hoursDisplay}</span>
                </li>
              </ul>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Thejaswini+Building+Technopark+Thiruvananthapuram"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#0b1f3f] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-tc-yellow hover:text-tc-navy"
              >
                Get directions <ArrowUpRight size={15} />
              </a>
            </div>

            <div className="relative h-[300px] bg-gray-100 sm:h-[360px] lg:col-span-3 lg:h-auto lg:min-h-[420px]">
              <iframe
                title="True Connect office location at Technopark, Thiruvananthapuram"
                src={contact.mapEmbed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[40%] transition-all duration-700 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Registered office */}
          <div className="mx-auto mt-5 flex max-w-5xl flex-col gap-5 rounded-[1.5rem] border border-gray-100 bg-[#f6f7f9] p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:rounded-[1.75rem]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Registered office</p>
              <h3 className="mt-1.5 text-lg font-medium tracking-tight text-[#0b1f3f] md:text-xl">{registeredOffice.name}</h3>
              <div className="mt-3 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
                <span className="flex gap-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#0b1f3f]" />
                  {registeredOffice.address}
                </span>
                <a href={`tel:${registeredOffice.phoneTel}`} className="flex items-center gap-2 font-semibold text-[#0b1f3f] hover:underline">
                  <Phone size={16} className="shrink-0" />
                  {registeredOffice.phoneDisplay}
                </a>
              </div>
            </div>
            <a
              href={registeredOffice.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-[#0b1f3f]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1f3f] transition-colors duration-300 hover:border-[#0b1f3f] hover:bg-[#0b1f3f] hover:text-white"
            >
              Get directions <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
