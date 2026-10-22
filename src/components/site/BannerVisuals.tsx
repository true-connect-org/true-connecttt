import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { business, homeServiceCards, whatsappHref } from "@/content/site";
import { serviceVisuals } from "@/components/site/serviceVisuals";
import { posts } from "@/lib/insights";
import hubLogo from "@/assets/logo/true-connect-mark.svg";

const glass = "rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur-md";

/** About: the TC mark with the six service icons slowly orbiting it. */
export const AboutVisual = () => (
  <div className="relative mx-auto aspect-square w-[220px] lg:w-[250px]" aria-hidden>
    <div className="absolute inset-[8%] rounded-full border border-dashed border-white/20" />
    <div className="absolute inset-0 animate-spin [animation-duration:40s] motion-reduce:animate-none">
      {homeServiceCards.map((sv, i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180;
        const Icon = serviceVisuals[sv.id].icon;
        return (
          <span
            key={sv.id}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#16305c] text-white ring-1 ring-white/25"
            style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }}
          >
            <span className="animate-spin [animation-direction:reverse] [animation-duration:40s] motion-reduce:animate-none">
              <Icon size={17} strokeWidth={1.6} />
            </span>
          </span>
        );
      })}
    </div>
    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full shadow-[0_0_0_6px_rgba(255,255,255,0.08),0_0_40px_rgba(230,232,74,0.25)]">
      <img src={hubLogo} alt="" className="h-full w-full scale-[1.12] object-cover" />
    </div>
  </div>
);

/** Services: six glass tiles, one per service, each linking to its page. */
export const ServicesVisual = () => {
  const short: Record<string, string> = {
    "social-media-marketing": "Social Media",
    "web-app-development": "Web & Apps",
    branding: "Branding",
    "custom-software": "Software",
    "ai-automation": "AI Automation",
    "enterprise-internet": "Enterprise Internet",
  };
  return (
    <div className="grid w-full max-w-[380px] grid-cols-3 gap-2.5">
      {homeServiceCards.map((sv) => {
        const Icon = serviceVisuals[sv.id].icon;
        return (
          <Link key={sv.id} to={sv.to} className={`group flex flex-col items-center gap-2 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E6E84A]/60 hover:bg-white/10 ${glass}`}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16305c] text-white ring-1 ring-white/20 transition-colors group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f]">
              <Icon size={16} strokeWidth={1.7} />
            </span>
            <span className="text-[11px] font-semibold leading-tight text-white/85">{short[sv.id]}</span>
          </Link>
        );
      })}
    </div>
  );
};

/** Insights: the latest article as a glass card. */
export const InsightsVisual = () => {
  const p = posts[0];
  if (!p) return null;
  return (
    <Link to={`/insights/${p.slug}`} className={`group block w-full max-w-[380px] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E6E84A]/60 ${glass}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E6E84A]">Latest breakdown</p>
      <p className="mt-3 text-3xl font-extrabold leading-none text-white">{p.brand}</p>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/75">{p.title}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
        Read the story <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
};

/** Contact: quick ways to reach the team. */
export const ContactVisual = () => {
  const rows = [
    { Icon: Mail, label: "Email", value: business.email, href: business.emailHref, external: false },
    { Icon: FaWhatsapp, label: "WhatsApp", value: "Chat with our team", href: whatsappHref(), external: true },
    { Icon: Phone, label: "Call us", value: business.phoneDisplay, href: `tel:${business.phoneTel}`, external: false },
  ];
  return (
    <div className={`w-full max-w-[380px] divide-y divide-white/10 ${glass}`}>
      {rows.map(({ Icon, label, value, href, external }) => (
        <a
          key={label}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-white/5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#16305c] text-white ring-1 ring-white/20 transition-colors group-hover:bg-[#E6E84A] group-hover:text-[#0b1f3f]">
            <Icon size={17} />
          </span>
          <span className="min-w-0 text-left">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{label}</span>
            <span className="block truncate text-sm font-semibold text-white">{value}</span>
          </span>
          <ArrowUpRight size={15} className="ml-auto shrink-0 text-white/40 transition-colors group-hover:text-[#E6E84A]" />
        </a>
      ))}
    </div>
  );
};
