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

export function registerGsapPlugins(): void {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  registered = true;

  // Keep scroll-triggered reveals in sync when the page height changes after load
  // (fonts, images, carousels, or switching device size), so content never stays hidden.
  if (typeof window !== "undefined" && "ResizeObserver" in window) {
    let t: number | undefined;
    let lastH = 0;
    new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      window.clearTimeout(t);
      t = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    }).observe(document.body);
    window.addEventListener("load", () => ScrollTrigger.refresh());
  }
}

// Default GSAP configuration — enterprise-grade defaults
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, Flip };
