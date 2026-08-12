/**
 * textReveal.ts
 * Masked line-by-line text reveal animation.
 * 
 * Requirements for HTML:
 *   Each text line must be wrapped in:
 *   <span class="block overflow-hidden py-1">
 *     <span class="[prefix]-reveal-line block transform-gpu">Text</span>
 *   </span>
 * 
 * Usage:
 *   const tl = textReveal('.hero-reveal-line', { delay: 0.15, stagger: 0.14 });
 */
import { gsap } from './gsap.config';

export interface TextRevealOptions {
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger between each line (seconds) */
  stagger?: number;
  /** Animation duration per line (seconds) */
  duration?: number;
  /** Y start position (percentage string) */
  yFrom?: string;
  /** Optional: scope the selector to a container element */
  container?: Element | null;
}

export function textReveal(
  selector: string,
  options: TextRevealOptions = {}
): gsap.core.Tween {
  const {
    delay = 0,
    stagger = 0.14,
    duration = 1.0,
    yFrom = '110%',
    container,
  } = options;

  const targets = container
    ? container.querySelectorAll(selector)
    : document.querySelectorAll(selector);

  gsap.set(targets, { transformPerspective: 800 });

  return gsap.fromTo(
    targets,
    { y: yFrom, opacity: 0, rotateX: 10 },
    {
      y: '0%',
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power4.out',
      clearProps: 'rotateX,transformPerspective',
    }
  );
}
