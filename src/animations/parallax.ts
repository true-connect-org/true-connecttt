/**
 * parallax.ts
 * Subtle scroll-driven parallax for background elements and images.
 * 
 * Usage:
 *   parallax('.hero-bg-image', { speed: 0.25 });
 *   parallaxElements('.parallax-item', { speed: 0.15, triggerEl: '.section' });
 */
import { gsap, ScrollTrigger } from './gsap.config';

export interface ParallaxOptions {
  /** 
   * Parallax speed factor. 
   * 0.1 = very subtle, 0.3 = medium, 0.5 = strong. 
   * Default 0.2
   */
  speed?: number;
  /** Trigger element (defaults to the element's parent) */
  triggerEl?: Element | string | null;
  /** GSAP scrub value. true = direct link, number = smoothing. Default 0.5 */
  scrub?: boolean | number;
  /** Direction: 'y' (vertical) or 'x' (horizontal). Default 'y' */
  direction?: 'y' | 'x';
}

/**
 * Apply parallax to a single element.
 */
export function parallax(
  selector: string | Element,
  options: ParallaxOptions = {}
): void {
  const {
    speed = 0.2,
    triggerEl,
    scrub = 0.5,
    direction = 'y',
  } = options;

  const target =
    typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;

  if (!target) return;

  const trigger = triggerEl
    ? typeof triggerEl === 'string'
      ? document.querySelector(triggerEl)
      : triggerEl
    : (target as Element).parentElement;

  const percent = speed * 100;
  const tweenVars: gsap.TweenVars = {
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? target,
      start: 'top bottom',
      end: 'bottom top',
      scrub,
    },
  };

  if (direction === 'y') {
    tweenVars.yPercent = percent;
  } else {
    tweenVars.xPercent = percent;
  }

  gsap.to(target, tweenVars);
}

/**
 * Apply parallax to multiple elements at once.
 * Each element gets its own ScrollTrigger using its parent as trigger.
 */
export function parallaxElements(
  selector: string,
  options: ParallaxOptions = {},
  containerEl?: Element | null
): void {
  const {
    speed = 0.2,
    scrub = 0.5,
    direction = 'y',
  } = options;

  const root = containerEl ?? document;
  const elements = root.querySelectorAll<HTMLElement>(selector);
  const percent = speed * 100;

  elements.forEach((el) => {
    const tweenVars: gsap.TweenVars = {
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    };

    if (direction === 'y') {
      tweenVars.yPercent = percent;
    } else {
      tweenVars.xPercent = percent;
    }

    gsap.to(el, tweenVars);
  });
}
