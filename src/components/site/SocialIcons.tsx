import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { business } from "@/content/site";

const items = [
  { key: "facebook", label: "Facebook", Icon: FaFacebookF },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedinIn },
  { key: "youtube", label: "YouTube", Icon: FaYoutube },
  { key: "x", label: "X", Icon: FaXTwitter },
  { key: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
] as const;

/**
 * True Connect brand social icons: round navy buttons with white symbols,
 * and the WhatsApp mark in brand yellow. An icon shows only when its link is set
 * in src/content/site.ts (business.social).
 * tone="dark" is for navy backgrounds (adds a light ring so the circle stays visible).
 */
const SocialIcons = ({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) => (
  <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
    {items.map(({ key, label, Icon }) => {
      const href = business.social[key];
      if (!href) return null;
      const isWhatsApp = key === "whatsapp";
      return (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`True Connect on ${label}`}
            title={label}
            className={`group flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:bg-tc-yellow hover:text-tc-navy ${
              tone === "dark" ? "bg-[#16305c] ring-1 ring-white/20 text-white" : "bg-[#0b1f3f] text-white"
            }`}
          >
            <Icon className={`h-[18px] w-[18px] transition-colors ${isWhatsApp ? "text-[#E6E84A] group-hover:text-tc-navy" : ""}`} />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialIcons;
