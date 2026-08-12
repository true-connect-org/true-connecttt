/**
 * staggerCards.ts
 * Staggered reveal for groups of cards/items triggered by their parent entering the viewport.
 * 
 * Usage:
 *   staggerCards('.values-grid', '.value-card', { stagger: 0.1 });
 */
import { gsap, ScrollTrigger } from './gsap.config';

export interface StaggerCardsOptions {
  /** Stagger delay between cards (seconds), default 0.1 */
  stagger?: number;
  /** Animation duration (seconds), default 0.65 */
  duration?: number;
  /** Y distance to travel from (px), default 40 */
  y?: number;
  /** Start position, default 'top 85%' */
  start?: string;
  /** Initial scale, default 1 (no scale) */
  scale?: number;
  /** GSAP ease */
  ease?: string;
}

/**
 * Animate child elements with stagger when the parent scrolls into view.
 */
export function staggerCards(
  parentSelector: string,
  childSelector: string,
  options: StaggerCardsOptions = {},
  containerEl?: Element | null
): void {
  const {
    stagger = 0.1,
    duration = 0.65,
    y = 40,
    start = 'top 85%',
    scale = 1,
    ease = 'power3.out',
  } = options;

  const root = containerEl ?? document;
  const parents = root.querySelectorAll<HTMLElement>(parentSelector);

  parents.forEach((parent) => {
    const children = parent.querySelectorAll<HTMLElement>(childSelector);
    if (!children.length) return;

    const fromVars: gsap.TweenVars = { y, opacity: 0 };
    const toVars: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
    };

    if (scale !== 1) {
      fromVars.scale = scale;
      toVars.scale = 1;
    }

    gsap.fromTo(children, fromVars, {
      ...toVars,
      scrollTrigger: {
        trigger: parent,
        start,
        toggleActions: 'play none none none',
      },
    });
  });
}

/**
 * Animate a flat list of elements with stagger using a single shared trigger.
 * Useful when there's no wrapping parent to trigger off.
 */
export function staggerList(
  selector: string,
  triggerEl: Element | string,
  options: StaggerCardsOptions = {}
): void {
  const {
    stagger = 0.1,
    duration = 0.65,
    y = 40,
    start = 'top 85%',
    ease = 'power3.out',
  } = options;

  gsap.fromTo(
    selector,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: triggerEl,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}
