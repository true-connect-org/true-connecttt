import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, Clock, MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { business, contact, home, whatsappHref } from "@/content/site";
import { sendEnquiry } from "@/lib/enquiry";

const field =
  "w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/20 focus:border-[#0b1f3f] transition-all";
const label = "block text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500 mb-1.5";

/** Home page contact section: brand-navy panel with details, and an enquiry form that sends via EmailJS. */
const HomeEnquiry = () => {
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [doneName, setDoneName] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        needs: d.get("need") ? [String(d.get("need"))] : [],
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

  const details = [
    { icon: Phone, label: "Call us", value: business.phoneDisplay, href: `tel:${business.phoneTel}` },
    { icon: Mail, label: "Email", value: business.email, href: business.emailHref },
    { icon: Clock, label: "Office hours", value: business.hoursDisplay },
  ];

  return (
    <section id="enquiry" className="py-12 md:py-20 bg-white scroll-mt-20">
      <div className="container-tc">
        <div className="home-fade relative overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#0b1f3f] via-[#0b1f3f] to-[#153460] border border-white/10">
          <div className="absolute top-[-25%] left-[-10%] w-[55%] h-[70%] bg-[#0b1f3f]/70 blur-[110px] rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-7 sm:p-10 md:p-14">
            {/* Left: message and details */}
            <div className="lg:col-span-5 text-white flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 mb-4">GET IN TOUCH</span>
              <h2 className="whitespace-nowrap text-[1.6rem] sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.15] mb-4">{home.cta.heading}</h2>
              <p className="text-white/70 text-[13px] sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">{home.cta.body}</p>

              <ul className="space-y-4 mb-8">
                {details.map((d) => (
                  <li key={d.label} className="flex items-center gap-4">
                    <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                      <d.icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="text-sm md:text-base font-medium text-white hover:text-[#E6E84A] transition-colors break-all">
                          {d.value}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base font-medium text-white">{d.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 self-start text-[13px] sm:text-sm font-semibold text-white border border-white/30 hover:bg-white hover:text-tc-navy px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle size={16} /> {home.cta.whatsappLabel}
              </a>
            </div>

            {/* Right: form card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-9 shadow-2xl">
                {doneName ? (
                  <div role="status" className="py-8 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#0b1f3f] text-white flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={28} />
                    </div>
                    <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">{contact.success(doneName)}</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-4 relative">
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label>
                        Leave this empty
                        <input type="text" name="tc_hp_check" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore="true" defaultValue="" />
                      </label>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold text-[#0b1f3f] tracking-tight">Tell us about your project</h3>
                      <p className="text-sm text-gray-500 mt-1">A few details help us prepare a sharper first response.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label htmlFor="hq-name" className={label}>Name *</label>
                        <input id="hq-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
                      </div>
                      <div>
                        <label htmlFor="hq-phone" className={label}>Phone *</label>
                        <input id="hq-phone" name="phone" type="tel" required autoComplete="tel" placeholder="Your phone number" className={field} />
                      </div>
                      <div>
                        <label htmlFor="hq-email" className={label}>Email</label>
                        <input id="hq-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" className={field} />
                      </div>
                      <div>
                        <label htmlFor="hq-need" className={label}>I need help with</label>
                        <select id="hq-need" name="need" defaultValue="" className={`${field} cursor-pointer`}>
                          <option value="">Select a service</option>
                          {contact.needs.map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="hq-message" className={label}>Message</label>
                      <textarea id="hq-message" name="message" rows={3} placeholder="Tell us about your business and goals" className={`${field} resize-none`} />
                    </div>

                    {failed && (
                      <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        Your enquiry could not be sent. Please try again, or{" "}
                        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">message us on WhatsApp</a>.
                      </p>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-1">
                      <button
                        type="submit"
                        disabled={sending}
                        className="inline-flex items-center justify-center gap-2 self-start bg-[#0b1f3f] hover:bg-tc-yellow text-white hover:text-tc-navy disabled:opacity-60 font-semibold text-[13px] sm:text-sm px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        {sending ? "Sending…" : contact.button} {!sending && <ArrowRight size={16} />}
                      </button>
                      <p className="text-xs text-gray-500">
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
  );
};

export default HomeEnquiry;
