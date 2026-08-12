/**
 * counter.ts
 * Animated number counter that runs once when its element enters the viewport.
 * 
 * Usage:
 *   animateCounter(el, 99.99, '%', 2);   // "99.99%"
 *   animateCounter(el, 120, '+');          // "120+"
 */
import { gsap, ScrollTrigger } from './gsap.config';

export interface CounterOptions {
  /** Suffix string appended after the number (e.g. '%', '+', 'ms') */
  suffix?: string;
  /** Number of decimal places, default 0 */
  decimals?: number;
  /** Duration of the count animation in seconds, default 2 */
  duration?: number;
  /** ScrollTrigger start position, default 'top 80%' */
  start?: string;
  /** Prefix string prepended before the number */
  prefix?: string;
}

/**
 * Animate a DOM element's text content from 0 to targetValue when it enters the viewport.
 */
export function animateCounter(
  el: HTMLElement,
  targetValue: number,
  options: CounterOptions = {}
): void {
  const {
    suffix = '',
    prefix = '',
    decimals = 0,
    duration = 2,
    start = 'top 80%',
  } = options;

  const proxy = { value: 0 };

  ScrollTrigger.create({
    trigger: el,
    start,
    once: true,
    onEnter: () => {
      gsap.to(proxy, {
        value: targetValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent =
            prefix + proxy.value.toFixed(decimals) + suffix;
        },
        onComplete: () => {
          // Ensure final value is exact
          el.textContent = prefix + targetValue.toFixed(decimals) + suffix;
        },
      });
    },
  });
}

/**
 * Initialize all counter elements in a container.
 * Reads target value, suffix, and decimals from data attributes:
 *   data-counter-value="99.99"
 *   data-counter-suffix="%"
 *   data-counter-decimals="2"
 *   data-counter-prefix=""
 */
export function initCounters(
  selector: string,
  containerEl?: Element | null
): void {
  const root = containerEl ?? document;
  const elements = root.querySelectorAll<HTMLElement>(selector);

  elements.forEach((el) => {
    const value = parseFloat(el.dataset.counterValue ?? '0');
    const suffix = el.dataset.counterSuffix ?? '';
    const prefix = el.dataset.counterPrefix ?? '';
    const decimals = parseInt(el.dataset.counterDecimals ?? '0', 10);

    animateCounter(el, value, { suffix, prefix, decimals });
  });
}
