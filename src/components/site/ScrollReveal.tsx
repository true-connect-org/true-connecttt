import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPrerender } from "@/lib/env";

/**
 * Site-wide scroll reveal. On every page, the content blocks inside each section fade and rise
 * into place as they scroll into view, with a short stagger between siblings.
 * Blocks that a page already animates itself (GSAP classes below) are left alone, so nothing animates twice.
 * Skipped when prerendering and for visitors who prefer reduced motion, so content is never hidden for them.
 */
const OWN_ANIMATION =
  ".home-fade, .animate-on-scroll, .contact-elem, .svc-card-row, .svc-scroll-in, .svc-card-left, .svc-card-right, .pb-el, [data-stagger], .bento-header, [data-no-reveal]";
const TARGETS = "main section .container-tc > *, main section .container-tc > div > *, footer .container-tc > *";

const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isPrerender || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const seen = new WeakSet<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("reveal-in");
          io.unobserve(e.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(TARGETS).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        // leave alone anything a page animates itself, or that wraps / sits inside such a block
        if (el.matches(OWN_ANIMATION) || el.closest(OWN_ANIMATION) || el.querySelector(OWN_ANIMATION)) return;
        // only the outermost matched block animates
        const parentTarget = el.parentElement?.closest(".reveal");
        if (parentTarget) return;
        const index = Array.prototype.indexOf.call(el.parentElement?.children ?? [], el);
        el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
        el.classList.add("reveal");
        io.observe(el);
      });
    };

    // pages load lazily, so scan now and whenever new content appears
    scan();
    let t: number | undefined;
    const mo = new MutationObserver(() => {
      window.clearTimeout(t);
      t = window.setTimeout(scan, 60);
    });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
};

export default ScrollReveal;
