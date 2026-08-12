/**
 * fadeUp.ts
 * Standard scroll-driven opacity + y-axis reveal via ScrollTrigger.
 * 
 * Usage:
 *   // Single element
 *   fadeUp('.section-header', { start: 'top 80%', duration: 0.8 });
 *   
 *   // Multiple elements (separate triggers)
 *   fadeUpBatch('.card-item', { stagger: 0.1 });
 */
import { gsap, ScrollTrigger } from './gsap.config';

export interface FadeUpOptions {
  /** ScrollTrigger start string, default 'top 82%' */
  start?: string;
  /** Animation duration in seconds, default 0.75 */
  duration?: number;
  /** Y distance to travel from (px), default 50 */
  y?: number;
  /** Stagger between batch elements, default 0 */
  stagger?: number;
  /** Delay before animation starts, default 0 */
  delay?: number;
  /** GSAP ease string */
  ease?: string;
  /** Optional container to scope the selector */
  container?: Element | null;
}

/**
 * Animate a single selector or NodeList as a single fadeUp.
 */
export function fadeUp(
  selector: string | Element | NodeListOf<Element>,
  options: FadeUpOptions = {}
): void {
  const {
    start = 'top 82%',
    duration = 0.75,
    y = 50,
    stagger = 0,
    delay = 0,
    ease = 'power3.out',
    container,
  } = options;

  const targets =
    typeof selector === 'string'
      ? container
        ? container.querySelectorAll(selector)
        : document.querySelectorAll(selector)
      : selector;

  if (!targets || (targets instanceof NodeList && targets.length === 0)) return;

  gsap.fromTo(
    targets,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger: {
        trigger: typeof selector === 'string' ? targets[0] as Element : targets as Element,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Animate each matching element with its own independent ScrollTrigger.
 * Ideal for lists of cards or paragraphs in different sections.
 */
export function fadeUpEach(
  selector: string,
  options: FadeUpOptions = {},
  containerEl?: Element | null
): void {
  const {
    start = 'top 82%',
    duration = 0.75,
    y = 50,
    delay = 0,
    ease = 'power3.out',
  } = options;

  const root = containerEl ?? document;
  const elements = root.querySelectorAll<HTMLElement>(selector);

  elements.forEach((el) => {
    gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none none',
        },
      }
    );
  });
}
