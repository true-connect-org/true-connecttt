/**
 * pageReveal.ts
 * Hero page entrance timeline factory.
 * Orchestrates textReveal + subtitle fadeUp + CTA entrance.
 * 
 * Usage:
 *   const tl = pageReveal({
 *     revealLines: '.hero-reveal-line',
 *     subs: '.hero-sub-text',
 *     ctas: '.hero-btns',
 *     image: '.hero-image',
 *   });
 */
import { gsap } from './gsap.config';
import { textReveal } from './textReveal';

export interface PageRevealConfig {
  /** Selector for masked reveal text lines */
  revealLines: string;
  /** Selector(s) for subtitle/description elements */
  subs?: string;
  /** Selector for CTA buttons wrapper */
  ctas?: string;
  /** Selector for hero image/card (scale + opacity) */
  image?: string;
  /** Delay before the timeline begins, default 0.1s */
  delay?: number;
  /** Optional container to scope all selectors */
  container?: Element | null;
}

/**
 * Returns a GSAP timeline that plays the hero entrance sequence.
 * The timeline starts immediately on creation.
 */
export function pageReveal(config: PageRevealConfig): gsap.core.Timeline {
  const {
    revealLines,
    subs,
    ctas,
    image,
    delay = 0.1,
    container,
  } = config;

  const tl = gsap.timeline({ delay });

  // 1. Masked line reveal for headline
  const lineTargets = container
    ? container.querySelectorAll(revealLines)
    : document.querySelectorAll(revealLines);

  if (lineTargets.length > 0) {
    gsap.set(lineTargets, { transformPerspective: 800 });
    tl.fromTo(
      lineTargets,
      { y: '110%', opacity: 0, rotateX: 10 },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 1.0,
        stagger: 0.14,
        ease: 'power4.out',
        clearProps: 'rotateX,transformPerspective',
      }
    );
  }

  // 2. Subtitle/description fade up
  if (subs) {
    const subTargets = container
      ? container.querySelectorAll(subs)
      : document.querySelectorAll(subs);

    if (subTargets.length > 0) {
      tl.fromTo(
        subTargets,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.55'
      );
    }
  }

  // 3. CTA buttons stagger
  if (ctas) {
    const ctaTargets = container
      ? container.querySelectorAll(ctas)
      : document.querySelectorAll(ctas);

    if (ctaTargets.length > 0) {
      tl.fromTo(
        ctaTargets,
        { y: 16, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
        },
        '-=0.35'
      );
    }
  }

  // 4. Optional hero image entrance
  if (image) {
    const imgTarget = container
      ? container.querySelector(image)
      : document.querySelector(image);

    if (imgTarget) {
      tl.fromTo(
        imgTarget,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power3.out' },
        0.1 // Start slightly after timeline begins, overlapping headline
      );
    }
  }

  return tl;
}
