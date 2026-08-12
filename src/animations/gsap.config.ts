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
}

// Default GSAP configuration — enterprise-grade defaults
gsap.config({
  autoSleep: 60,
  nullTargetWarn: false,
});

export { gsap, ScrollTrigger, Flip };
