/**
 * FadeUp.tsx
 * Wraps any content and applies a scroll-triggered fadeUp animation
 * when the wrapper enters the viewport.
 * 
 * Usage:
 *   <FadeUp delay={0.2} y={40}>
 *     <p>Content that fades in on scroll</p>
 *   </FadeUp>
 */
import React, { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap.config';
import { ScrollTrigger } from '@/animations/gsap.config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface FadeUpProps {
  children: React.ReactNode;
  /** Y distance to travel from (px), default 50 */
  y?: number;
  /** Animation duration (seconds), default 0.75 */
  duration?: number;
  /** Delay before animation (seconds), default 0 */
  delay?: number;
  /** ScrollTrigger start position, default 'top 82%' */
  start?: string;
  /** GSAP ease, default 'power3.out' */
  ease?: string;
  /** Additional className on wrapper div */
  className?: string;
  /** HTML tag to render as wrapper, default 'div' */
  as?: keyof JSX.IntrinsicElements;
}

const FadeUp: React.FC<FadeUpProps> = ({
  children,
  y = 50,
  duration = 0.75,
  delay = 0,
  start = 'top 82%',
  ease = 'power3.out',
  className,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const el = ref.current;

    const anim = gsap.fromTo(
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

    return () => {
      anim.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === el)
        .forEach((st) => st.kill());
    };
  }, [y, duration, delay, start, ease, prefersReduced]);

  return React.createElement(
    Tag,
    { ref, className },
    children
  );
};

export default FadeUp;
