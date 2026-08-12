/**
 * timeline.ts
 * Animated vertical timeline for process steps and history sections.
 * The connecting line grows as the user scrolls; dots and content cards
 * fade in sequentially via ScrollTrigger.
 * 
 * Usage:
 *   animateTimeline('.timeline-container', '.timeline-line', '.timeline-item');
 */
import { gsap, ScrollTrigger } from './gsap.config';

export interface TimelineAnimOptions {
  /** Selector for the vertical line element (grows via scaleY) */
  lineSelector?: string;
  /** Selector for individual step/item containers */
  itemSelector?: string;
  /** Selector for step dot/number within each item */
  dotSelector?: string;
  /** Scrub factor for line growth, default 1 */
  scrub?: number | boolean;
  /** Stagger between item reveals (seconds), default 0.12 */
  itemStagger?: number;
}

/**
 * Animate a vertical timeline:
 * 1. Line grows from top to bottom via scrubbed scaleY
 * 2. Each timeline item fades in with stagger
 */
export function animateTimeline(
  containerSelector: string,
  options: TimelineAnimOptions = {},
  containerEl?: Element | null
): void {
  const {
    lineSelector = '.timeline-line',
    itemSelector = '.timeline-item',
    dotSelector = '.timeline-dot',
    scrub = 1,
    itemStagger = 0.12,
  } = options;

  const root = containerEl ?? document;
  const containers = root.querySelectorAll<HTMLElement>(containerSelector);

  containers.forEach((container) => {
    // Animate the connecting line (scaleY growth from top)
    const line = container.querySelector<HTMLElement>(lineSelector);
    if (line) {
      gsap.set(line, { scaleY: 0, transformOrigin: 'top center' });
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub,
        },
      });
    }

    // Animate each timeline item
    const items = container.querySelectorAll<HTMLElement>(itemSelector);
    items.forEach((item, i) => {
      // Dot/number scale pulse
      const dot = item.querySelector<HTMLElement>(dotSelector);
      if (dot) {
        gsap.fromTo(
          dot,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Item content fade + slide in
      gsap.fromTo(
        item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: i * itemStagger * 0.2, // slight offset between items
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });
}

/**
 * Animate SVG stroke path to appear drawn (strokeDashoffset technique).
 * Used for connecting lines between office nodes on contact page.
 */
export function animateSvgLine(
  selector: string,
  options: { duration?: number; scrub?: boolean | number; start?: string } = {}
): void {
  const { duration = 1.5, scrub = false, start = 'top 80%' } = options;

  const lines = document.querySelectorAll<SVGPathElement | SVGLineElement>(selector);

  lines.forEach((line) => {
    const length = (line as SVGGeometryElement).getTotalLength?.() ?? 200;
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    gsap.to(line, {
      strokeDashoffset: 0,
      duration: scrub ? undefined : duration,
      ease: scrub ? 'none' : 'power2.inOut',
      scrollTrigger: {
        trigger: line,
        start,
        end: scrub ? 'bottom 20%' : undefined,
        scrub: scrub || false,
        toggleActions: scrub ? undefined : 'play none none none',
      },
    });
  });
}
