import { RiWhatsappFill } from "react-icons/ri";
import { whatsappHref } from "@/content/site";

const label = "Chat with True Connect on WhatsApp";

/**
 * WhatsApp chat on every page: a compact WhatsApp mark in a slightly deeper, calmer green that sits
 * well with the navy brand. "Chat with us" appears on hover in a navy pill.
 */
const WhatsAppButton = () => (
  <div className="fixed bottom-10 right-8 z-[60] sm:bottom-[5.25rem] sm:right-[max(2rem,calc((100%-1200px)/2+2rem))] lg:right-[max(2.5rem,calc((100%-1200px)/2+2.5rem))]">
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group relative flex items-center justify-end focus-visible:outline-none"
    >
      <span className="pointer-events-none absolute right-full mr-2 hidden whitespace-nowrap rounded-full bg-[#0b1f3f] px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg ring-1 ring-white/15 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:hover)]:block">
        Chat with us
      </span>
      {/* white fill behind the phone cut-out so the handset always reads white */}
      <span className="animate-floaty">
        <span className="relative flex h-11 w-11 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
        <span aria-hidden className="absolute h-[55%] w-[55%] rounded-full bg-white" />
        <RiWhatsappFill className="relative h-full w-full text-[#1c9e4e] drop-shadow-[0_4px_10px_rgba(11,31,63,0.35)] transition-colors duration-300 group-hover:text-[#22b85b]" />
        </span>
      </span>
    </a>
  </div>
);

export default WhatsAppButton;
