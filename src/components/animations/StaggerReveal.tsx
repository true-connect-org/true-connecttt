/**
 * StaggerReveal.tsx
 * Wraps a list of children and staggers their entrance when the parent
 * enters the viewport.
 * 
 * Usage:
 *   <StaggerReveal stagger={0.1} childSelector=".card">
 *     <Card />
 *     <Card />
 *     <Card />
 *   </StaggerReveal>
 */
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/animations/gsap.config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface StaggerRevealProps {
  children: React.ReactNode;
  /** CSS selector for direct children to stagger. Defaults to all direct children. */
  childSelector?: string;
  /** Stagger delay between items (seconds), default 0.1 */
  stagger?: number;
  /** Y distance to travel from (px), default 40 */
  y?: number;
  /** Animation duration (seconds), default 0.65 */
  duration?: number;
  /** ScrollTrigger start position, default 'top 85%' */
  start?: string;
  /** GSAP ease, default 'power3.out' */
  ease?: string;
  /** Additional className on wrapper */
  className?: string;
  /** HTML tag to render as wrapper */
  as?: keyof JSX.IntrinsicElements;
}

const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  childSelector,
  stagger = 0.1,
  y = 40,
  duration = 0.65,
  start = 'top 85%',
  ease = 'power3.out',
  className,
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const parent = ref.current;
    const targets = childSelector
      ? parent.querySelectorAll<HTMLElement>(childSelector)
      : Array.from(parent.children) as HTMLElement[];

    if (!targets.length) return;

    const anim = gsap.fromTo(
      targets,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: parent,
          start,
          toggleActions: 'play none none none',
        },
      }
    );

    return () => {
      anim.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === parent)
        .forEach((st) => st.kill());
    };
  }, [childSelector, stagger, y, duration, start, ease, prefersReduced]);

  return React.createElement(
    Tag,
    { ref, className },
    children
  );
};

export default StaggerReveal;
