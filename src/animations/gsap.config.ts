/**
 * gsap.config.ts
 * Central plugin registration for GSAP.
 * Import and call registerGsapPlugins() once at the application root.
 * This prevents duplicate registrations when multiple pages import ScrollTrigger.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

let registered = false;
let touching = false;
let lastInput = 0;
let refreshTimer: number | undefined;

/**
 * Recalculates scroll animations, but never while the visitor is touching or scrolling.
 * A recalculation in the middle of a swipe briefly moves the page, which on phones cancels
 * the swipe (the "first swipe doesn't scroll" bug). It waits until scrolling has stopped.
 */
export function safeRefresh(delay = 150) {
  if (typeof window === "undefined") return;
  window.clearTimeout(refreshTimer);
  const tryNow = () => {
    if (touching || performance.now() - lastInput < 250) {
      refreshTimer = window.setTimeout(tryNow, 200);
      return;
    }
    ScrollTrigger.refresh();
  };
  refreshTimer = window.setTimeout(tryNow, delay);
}

export function registerGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;

  // Phones: the address bar showing/hiding changes the window height on every swipe; don't recalculate for that.
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Keep scroll-triggered reveals in sync when the page height changes after load
  // (fonts, images, carousels, or switching device size), so content never stays hidden.
  if (typeof window !== "undefined" && "ResizeObserver" in window) {
    let lastH = 0;
    new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      safeRefresh();
    }).observe(document.body);
    window.addEventListener("load", () => safeRefresh());
    const busy = () => { lastInput = performance.now(); };
    window.addEventListener("touchstart", () => { touching = true; busy(); }, { passive: true });
    window.addEventListener("touchend", () => { touching = false; busy(); }, { passive: true });
    window.addEventListener("scroll", busy, { passive: true });
    window.addEventListener("wheel", busy, { passive: true });
  }
}

// Default GSAP configuration — enterprise-grade defaults
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, Flip };
