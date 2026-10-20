import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Send, CheckCircle2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { gsap } from "@/animations/gsap.config";
import { isPrerender } from "@/lib/env";
import { useSeo } from "@/lib/seo";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { sendEnquiry } from "@/lib/enquiry";
import PageBanner from "@/components/site/PageBanner";
import { ContactVisual } from "@/components/site/BannerVisuals";
import { seo, contact } from "@/content/site";

const inputClass =
  "w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/20 focus:border-[#0b1f3f] transition-all";
const labelClass = "block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-1.5";

const ContactUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [needs, setNeeds] = useState<string[]>([]);
  const [sending, setSending] = useState(false);
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

  const toggleNeed = (n: string) => setNeeds((cur) => (cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n]));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    if (d.get("website")) return; // honeypot
    setSending(true);
    try {
      await sendEnquiry({
        formType: "Contact",
        name: String(d.get("name")),
        phone: String(d.get("phone")),
        email: String(d.get("email") || ""),
        company: String(d.get("company") || ""),
        needs,
        message: String(d.get("message") || ""),
      });
      setDoneName(String(d.get("name") || "").trim() || "there");
      setNeeds([]);
      form.reset();
    } catch (err) {
      console.error("Enquiry failed", err);
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

      {/* 2. CONTACT FORM: heading above, form inside the dark brand panel */}
      <section id="contact-form" className="scroll-mt-24 py-14 md:py-20 bg-white">
        <div className="container-tc">
          <div className="contact-elem mx-auto mb-8 max-w-2xl text-center md:mb-10">
            <h2 className="text-balance text-3xl font-medium leading-[1.15] tracking-tight text-[#0b1f3f] md:text-4xl">Let's make growth simple.</h2>
            <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-gray-500 sm:text-base">One form, one team, one clear plan for your business.</p>
          </div>

          <div className="contact-elem relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0a1a35] via-[#030a16] to-black border border-white/10">
            <div aria-hidden className="pointer-events-none absolute top-[-25%] left-[-10%] h-[70%] w-[55%] rounded-full bg-[#0b1f3f]/70 blur-[110px]" />

            <div className="relative z-10 mx-auto max-w-3xl px-3 py-6 sm:px-10 sm:py-12 md:py-14">
              {/* Form card */}
              <div>
                <div className="rounded-[1.5rem] bg-white p-5 shadow-2xl sm:p-6 md:rounded-[2rem] md:p-9">
                  {doneName ? (
                    <div role="status" className="py-10 text-center">
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
                          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-[#0b1f3f] md:text-2xl">Tell us about your project</h3>
                        <p className="mt-1 text-sm text-gray-500">The more we know, the sharper our first response.</p>
                      </div>

                      <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
                        <div>
                          <label htmlFor="ct-name" className={labelClass}>Name *</label>
                          <input id="ct-name" required name="name" autoComplete="name" placeholder="Your name" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="ct-phone" className={labelClass}>Phone *</label>
                          <input id="ct-phone" required type="tel" name="phone" autoComplete="tel" placeholder="Your phone number" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="ct-email" className={labelClass}>Email</label>
                          <input id="ct-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="ct-company" className={labelClass}>Company</label>
                          <input id="ct-company" name="company" autoComplete="organization" placeholder="Company name" className={inputClass} />
                        </div>
                      </div>

                      <fieldset>
                        <legend className={labelClass}>What do you need?</legend>
                        <div className="flex flex-wrap gap-2">
                          {contact.needs.map((n) => {
                            const on = needs.includes(n);
                            return (
                              <button
                                key={n}
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggleNeed(n)}
                                className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-all ${
                                  on ? "border-[#0b1f3f] bg-[#0b1f3f] text-white" : "border-gray-200 bg-gray-50 text-gray-700 hover:border-[#0b1f3f]"
                                }`}
                              >
                                {n}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>


                      <div>
                        <label htmlFor="ct-message" className={labelClass}>Message</label>
                        <textarea id="ct-message" name="message" rows={5} placeholder="Tell us about your business and what you want to achieve" className={`${inputClass} resize-none`} />
                      </div>

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
          </div>
        </div>
      </section>

      {/* 3. LOCATION: map with an address card on top */}
      <section className="pb-14 md:pb-20 bg-white">
        <div className="container-tc contact-elem">
          <div className="relative h-[420px] overflow-hidden rounded-[1.75rem] border border-gray-100 bg-gray-100 md:h-[460px] md:rounded-[2.5rem]">
            <iframe
              title="True Connect office location at Technopark, Thiruvananthapuram"
              src={contact.mapEmbed}
              className="h-full w-full border-0 grayscale-[60%] transition-all duration-700 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-5 py-4 shadow-xl sm:bottom-6 sm:left-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">Visit our office</p>
              <p className="mt-2 text-sm font-semibold text-[#0b1f3f]">Technopark, Thiruvananthapuram</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Thejaswini+Building+Technopark+Thiruvananthapuram"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0b1f3f] underline-offset-4 hover:underline"
              >
                Get directions <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
