import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "@/animations/gsap.config";
import { SplitText } from "gsap/SplitText";
import { isPrerender } from "@/lib/env";

gsap.registerPlugin(SplitText);

/**
 * Site-wide heading reveal: each section heading (h2) slides up line by line from behind a mask
 * as it scrolls into view. Subtle (0.8s, once). Skipped when prerendering and for reduced-motion users,
 * so headings are always readable for search engines and accessibility.
 */
const HeadingReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isPrerender || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const splits: SplitText[] = [];
    const triggers: ScrollTrigger[] = [];
    const done = new WeakSet<Element>();

    const run = () => {
      document.querySelectorAll<HTMLElement>("main h2:not([data-no-split]):not(:has(a, button))").forEach((h) => {
        if (done.has(h) || !h.textContent?.trim()) return;
        done.add(h);
        const split = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "tc-line" });
        splits.push(split);
        gsap.set(split.lines, { yPercent: 105 });
        triggers.push(
          ScrollTrigger.create({
            trigger: h,
            start: "top 90%",
            once: true,
            onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.09 }),
          }),
        );
      });
    };

    // Wait for fonts so lines split at the right places, then pick up lazily loaded page content
    let t: number | undefined;
    document.fonts?.ready.then(() => { run(); ScrollTrigger.refresh(); });
    const mo = new MutationObserver(() => { window.clearTimeout(t); t = window.setTimeout(run, 120); });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      window.clearTimeout(t);
      triggers.forEach((tr) => tr.kill());
      splits.forEach((s) => s.revert());
    };
  }, [pathname]);

  return null;
};

export default HeadingReveal;
