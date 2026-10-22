import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/animations/gsap.config";
import { isPrerender } from "@/lib/env";
import BannerDecor, { type BannerVariant } from "@/components/site/BannerDecor";

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
  /** Words shown after the title in brand yellow, e.g. title "Your Vision." accent "Our Execution." Keeps the heading on one line. */
  accent?: string;
  /** Which poster-style decoration to use. */
  variant?: BannerVariant;
  /** Smaller heading and subheading, for article pages. */
  compact?: boolean;
}

/**
 * Navy hero banner used at the top of every inner page. It has the same card size, corners
 * and gradient as the home page hero, with centred text that lines up with the navbar.
 */
const PageBanner = ({ title, accent, sub, children, visual, compact = false, variant }: PageBannerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isPrerender || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".pb-el", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.1, clearProps: "transform" });
    }, ref);
    return () => ctx.revert();
  }, [title]);

  return (
    <section ref={ref} className="bg-white p-1.5 sm:p-2">
      <div className="relative max-w-[1560px] mx-auto overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl border border-white/15 bg-[#06132e]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,80,170,0.55),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(30,80,170,0.35),transparent_50%)]" />
        <BannerDecor variant={variant} />

        <div className="container-tc relative grid min-h-[344px] items-center gap-10 pb-10 pt-28 sm:min-h-[392px] lg:min-h-[440px] md:pt-32 md:pb-12 lg:grid-cols-12">
          <div className={visual ? "text-center lg:col-span-7 lg:text-left" : "text-center lg:col-span-12"}>
            <h1
              className={`pb-el tracking-tight leading-[1.12] text-white ${
                accent
                  ? "whitespace-nowrap text-[clamp(1.05rem,5.2vw,1.6rem)] sm:text-3xl lg:text-[2.35rem]"
                  : compact
                    ? "text-balance text-[1.5rem] sm:text-3xl lg:text-[2.1rem]"
                    : "text-balance text-[1.7rem] sm:text-4xl lg:text-[2.6rem]"
              } ${visual ? "mx-auto max-w-2xl lg:mx-0" : "mx-auto max-w-4xl"}`}
            >
              {title}
              {accent && <span className="text-[#E6E84A]"> {accent}</span>}
            </h1>
            {sub && (
              <p className={`pb-el mt-4 flex max-w-xl items-center gap-3 leading-relaxed tracking-wide ${compact ? "text-[13px] sm:text-sm lg:text-[15px]" : "text-[13px] sm:text-base lg:text-lg"} text-white/80 ${visual ? "mx-auto justify-center lg:mx-0 lg:justify-start" : "mx-auto justify-center"}`}>
                <span aria-hidden className="hidden h-px w-8 shrink-0 bg-[#E6E84A] sm:block" />
                <span>{sub}</span>
              </p>
            )}
            {children && <div className={`pb-el mt-7 flex flex-wrap items-center gap-3 ${visual ? "justify-center lg:justify-start" : "justify-center"}`}>{children}</div>}
          </div>
          {visual && <div className="pb-el hidden justify-center lg:col-span-5 lg:flex lg:justify-end">{visual}</div>}
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
