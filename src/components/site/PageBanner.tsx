import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/animations/gsap.config";
import { isPrerender } from "@/lib/env";

interface PageBannerProps {
  /** Not displayed (kept so existing pages compile). */
  eyebrow?: string;
  title: string;
  sub?: string;
  /** Not displayed. Pages still output BreadcrumbList schema for search engines. */
  crumbs?: { label: string; to?: string }[];
  children?: ReactNode;
  /** Optional visual shown on the right (desktop and tablet). When set, the text aligns left. */
  visual?: ReactNode;
}

/**
 * Navy hero banner used at the top of every inner page. It has the same card size, corners
 * and gradient as the home page hero, with centred text that lines up with the navbar.
 */
const PageBanner = ({ title, sub, children, visual }: PageBannerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isPrerender || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pb-el", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1, clearProps: "transform" });
    }, ref);
    return () => ctx.revert();
  }, [title]);

  return (
    <section ref={ref} className="bg-white p-1.5 sm:p-2.5 md:p-3 pt-1.5">
      <div className="relative max-w-[1560px] mx-auto overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/15 bg-gradient-to-br from-[#042d5b] via-[#0b1f3f] to-[#031126]">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#1a4480]/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#1a4480]/20 blur-3xl" />

        <div className="container-tc relative grid min-h-[344px] items-center gap-10 pb-10 pt-28 sm:min-h-[392px] lg:min-h-[440px] md:pt-32 md:pb-12 lg:grid-cols-12">
          <div className={visual ? "text-center lg:col-span-7 lg:text-left" : "text-center lg:col-span-12"}>
            <h1 className={`pb-el text-balance text-[1.7rem] sm:text-4xl lg:text-[2.6rem] tracking-tight leading-[1.12] text-white ${visual ? "mx-auto max-w-2xl lg:mx-0" : "mx-auto max-w-4xl"}`}>{title}</h1>
            {sub && <p className={`pb-el mt-4 max-w-xl text-[13px] sm:text-[15px] lg:text-base leading-relaxed text-white/75 ${visual ? "mx-auto lg:mx-0" : "mx-auto"}`}>{sub}</p>}
            {children && <div className={`pb-el mt-7 flex flex-wrap items-center gap-3 ${visual ? "justify-center lg:justify-start" : "justify-center"}`}>{children}</div>}
          </div>
          {visual && <div className="pb-el hidden justify-center lg:col-span-5 lg:flex lg:justify-end">{visual}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
