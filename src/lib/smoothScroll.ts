import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap.config";

let lenis: Lenis | null = null;

/** Starts eased, smooth page scrolling, kept in sync with GSAP ScrollTrigger. Skipped for reduced-motion users. */
export function startSmoothScroll() {
  if (lenis || typeof window === "undefined") return () => {};
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  if (navigator.userAgent.includes("TCPrerender")) return () => {};
  // Phones and tablets keep their own native scrolling (smooth already, and never fights a swipe)
  if (window.matchMedia("(pointer: coarse)").matches) return () => {};

  const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  // Pages load lazily and images arrive late: keep Lenis's scroll limit in sync with the real page height
  const ro = new ResizeObserver(() => instance.resize());
  ro.observe(document.body);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    ro.disconnect();
    instance.destroy();
    lenis = null;
  };
}

/** Scroll to the top or to an element, using the smooth scroller when it is running. */
export function scrollToTarget(target: number | HTMLElement, immediate = false) {
  lenis?.resize();
  if (lenis) lenis.scrollTo(target as number | HTMLElement, { immediate, offset: typeof target === "number" ? 0 : -90 });
  else if (typeof target === "number") window.scrollTo(0, target);
  else target.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
}
