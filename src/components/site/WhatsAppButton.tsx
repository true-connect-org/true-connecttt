import { FaWhatsapp } from "react-icons/fa6";
import { whatsappHref } from "@/content/site";

const label = "Chat with True Connect on WhatsApp";

/**
 * WhatsApp chat on every page: WhatsApp green with the white mark, floating gently inside a frosted-glass ring.
 * A glossy highlight sits on top of the green, and on hover (mouse devices) the button opens into a pill reading "Chat with us".
 */
const WhatsAppButton = () => (
  <div className="fixed bottom-10 right-8 z-[60] sm:bottom-[5.25rem] sm:right-[max(2rem,calc((100%-1200px)/2+2rem))] lg:right-[max(2.5rem,calc((100%-1200px)/2+2.5rem))]">
    <div className="animate-floaty">
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="group relative block rounded-full p-[5px] focus-visible:outline-none"
      >
        {/* frosted-glass ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-white/50 bg-white/25 shadow-[0_18px_40px_-12px_rgba(11,31,63,0.55),inset_0_1px_1px_rgba(255,255,255,0.7)] backdrop-blur-md transition-all duration-500 group-hover:bg-white/35"
        />

        {/* green button */}
        <span className="relative flex h-14 items-center overflow-hidden rounded-full bg-gradient-to-br from-[#34e27e] via-[#25d366] to-[#179a49] pl-[15px] pr-[15px] text-white shadow-[0_10px_24px_-8px_rgba(18,140,70,0.7),inset_0_-2px_6px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-visible:ring-2 group-focus-visible:ring-[#0b1f3f]">
          {/* glossy highlight */}
          <span aria-hidden className="pointer-events-none absolute inset-x-1 top-0.5 h-1/2 rounded-full bg-gradient-to-b from-white/45 to-white/0" />
          {/* light sweep on hover */}
          <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

          <FaWhatsapp className="relative h-[26px] w-[26px] shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]" />
          <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [@media(hover:hover)]:group-hover:ml-2.5 [@media(hover:hover)]:group-hover:max-w-[8rem] [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[8rem] group-focus-visible:opacity-100">
            Chat with us
          </span>
        </span>
      </a>
    </div>
  </div>
);

export default WhatsAppButton;
